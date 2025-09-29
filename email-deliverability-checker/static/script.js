document.getElementById('checkButton').addEventListener('click', function() {
    const domain = document.getElementById('domainInput').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = 'Loading...';

    fetch('/email-deliverability-checker/check_deliverability', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ domain: domain }),
    })
    .then(response => response.json())
    .then(data => {
        resultsDiv.innerHTML = '';
        if (data.error) {
            resultsDiv.innerHTML = `<p class="status-error">Error: ${data.error}</p>`;
            return;
        }

        resultsDiv.innerHTML += `<h2>Results for ${data.domain}</h2>`;

        function displayRecord(name, record) {
            let statusClass = '';
            let message = '';
            if (record.status === 'found') {
                statusClass = 'status-found';
                message = `Record: ${record.record}`;
            } else if (record.status === 'not_found') {
                statusClass = 'status-not_found';
                message = `Message: ${record.message}`;
            } else if (record.status === 'invalid_domain' || record.status === 'no_mx') {
                statusClass = 'status-invalid_domain';
                message = `Message: ${record.message}`;
            } else {
                statusClass = 'status-error';
                message = `Error: ${record.message}`;
            }
            resultsDiv.innerHTML += `
                <div class="result-item">
                    <strong>${name} Status:</strong> <span class="${statusClass}">${record.status.replace('_', ' ').toUpperCase()}</span><br>
                    ${message}
                </div>
            `;
        }

        displayRecord('SPF', data.spf);
        displayRecord('DKIM', data.dkim);
        displayRecord('DMARC', data.dmarc);

        // Display Blacklist results
        resultsDiv.innerHTML += `<h3>Blacklist Check</h3>`;
        if (data.blacklists.status === 'clean') {
            resultsDiv.innerHTML += `<div class="result-item">
                <strong>Status:</strong> <span class="status-found">CLEAN</span><br>
                ${data.blacklists.message}
            </div>`;
        } else if (data.blacklists.status === 'blacklisted') {
            resultsDiv.innerHTML += `<div class="result-item">
                <strong>Status:</strong> <span class="status-not_found">BLACKLISTED</span><br>
                <p>The following IPs are listed on blacklists:</p>
                <ul>`;
            data.blacklists.details.forEach(item => {
                resultsDiv.innerHTML += `<li>IP: ${item.ip}, Blacklist: ${item.dnsbl}</li>`;
            });
            resultsDiv.innerHTML += `</ul></div>`;
        } else {
            resultsDiv.innerHTML += `<div class="result-item">
                <strong>Status:</strong> <span class="status-error">${data.blacklists.status.replace('_', ' ').toUpperCase()}</span><br>
                Message: ${data.blacklists.message}
            </div>`;
        }

    })
    .catch((error) => {
        console.error('Error:', error);
        resultsDiv.innerHTML = `<p class="status-error">An unexpected error occurred.</p>`;
    });
});