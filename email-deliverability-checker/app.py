from flask import Flask, request, jsonify, render_template
import dns.resolver
import re

app = Flask(__name__, template_folder='templates', static_folder='static')

# List of common DNSBLs to check against
DNSBLS = [
    "zen.spamhaus.org",
    "bl.spamcop.net",
    "cbl.abuseat.org",
    # Add more as needed
]

def check_spf(domain):
    try:
        txt_records = dns.resolver.resolve(domain, 'TXT')
        spf_record = None
        for rdata in txt_records:
            if "v=spf1" in rdata.to_text():
                spf_record = rdata.to_text()
                break
        if spf_record:
            return {"status": "found", "record": spf_record}
        else:
            return {"status": "not_found", "message": "No SPF record found."}
    except dns.resolver.NoAnswer:
        return {"status": "not_found", "message": "No TXT records found for SPF."}
    except dns.resolver.NXDOMAIN:
        return {"status": "invalid_domain", "message": "Domain does not exist."}
    except Exception as e:
        return {"status": "error", "message": str(e)}

def check_dkim(domain):
    # This is a simplified check. Real DKIM requires selector lookup.
    # We'll check for a common selector like 'default._domainkey'
    try:
        dkim_record = dns.resolver.resolve(f"default._domainkey.{domain}", 'TXT')
        if dkim_record:
            return {"status": "found", "record": dkim_record[0].to_text()}
        else:
            return {"status": "not_found", "message": "No DKIM record found for default selector."}
    except dns.resolver.NoAnswer:
        return {"status": "not_found", "message": "No DKIM record found for default selector."}
    except dns.resolver.NXDOMAIN:
        return {"status": "not_found", "message": "DKIM selector domain does not exist."}
    except Exception as e:
        return {"status": "error", "message": str(e)}

def check_dmarc(domain):
    try:
        dmarc_record = dns.resolver.resolve(f"_dmarc.{domain}", 'TXT')
        if dmarc_record:
            return {"status": "found", "record": dmarc_record[0].to_text()}
        else:
            return {"status": "not_found", "message": "No DMARC record found."}
    except dns.resolver.NoAnswer:
        return {"status": "not_found", "message": "No DMARC record found."}
    except dns.resolver.NXDOMAIN:
        return {"status": "invalid_domain", "message": "DMARC domain does not exist."}
    except Exception as e:
        return {"status": "error", "message": str(e)}

def check_blacklists(domain):
    blacklisted_ips = []
    try:
        # Get MX records for the domain
        mx_records = dns.resolver.resolve(domain, 'MX')
        mail_servers = [str(rdata.exchange) for rdata in mx_records]

        for server in mail_servers:
            try:
                # Resolve IP addresses for each mail server
                a_records = dns.resolver.resolve(server, 'A')
                ips = [str(rdata) for rdata in a_records]

                for ip in ips:
                    # Reverse the IP for DNSBL query
                    reverse_ip = '.'.join(ip.split('.')[::-1])
                    for dnsbl in DNSBLS:
                        try:
                            dns.resolver.resolve(f"{reverse_ip}.{dnsbl}", 'A')
                            blacklisted_ips.append({"ip": ip, "dnsbl": dnsbl})
                        except dns.resolver.NXDOMAIN:
                            # Not found on this blacklist, which is good
                            pass
                        except Exception as e:
                            # Handle other errors during blacklist lookup
                            print(f"Error checking {ip} on {dnsbl}: {e}")
            except dns.resolver.NXDOMAIN:
                # Mail server domain does not exist
                pass
            except Exception as e:
                print(f"Error resolving IP for {server}: {e}")

        if blacklisted_ips:
            return {"status": "blacklisted", "details": blacklisted_ips}
        else:
            return {"status": "clean", "message": "No mail servers found on common blacklists."}

    except dns.resolver.NoAnswer:
        return {"status": "no_mx", "message": "No MX records found for the domain."}
    except dns.resolver.NXDOMAIN:
        return {"status": "invalid_domain", "message": "Domain does not exist."}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/check_deliverability', methods=['POST'])
def check_deliverability():
    data = request.get_json()
    domain = data.get('domain')

    if not domain:
        return jsonify({"error": "Domain is required."}), 400

    # Basic domain validation
    if not re.match(r"^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$", domain):
        return jsonify({"error": "Invalid domain format."}), 400

    spf_result = check_spf(domain)
    dkim_result = check_dkim(domain)
    dmarc_result = check_dmarc(domain)
    blacklist_result = check_blacklists(domain)

    return jsonify({
        "domain": domain,
        "spf": spf_result,
        "dkim": dkim_result,
        "dmarc": dmarc_result,
        "blacklists": blacklist_result
    })

