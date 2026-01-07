#!/bin/bash

if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <blog_title> <content_file>"
    exit 1
fi

BLOG_TITLE="$1"
CONTENT_FILE="$2"
OUTPUT_DIR="/home/akhilnairmk/akhilhavingfun/public"
TEMPLATE_FILE="$OUTPUT_DIR/blog-template.html"
INDEX_FILE="$OUTPUT_DIR/index.html"

# Generate slug from title (simplified)
SLUG=$(echo "$BLOG_TITLE" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9 ]/-/g' | sed -E 's/ +/-/g' | sed -E 's/^-+|-+$//g')
OUTPUT_FILE="$OUTPUT_DIR/$SLUG.html"

# Get current date in "Month Year" format
BLOG_DATE=$(date +"%B %Y")

# Read content from file
BLOG_CONTENT=$(cat "$CONTENT_FILE")

# Escape special characters in BLOG_TITLE for sed
ESCAPED_BLOG_TITLE=$(echo "$BLOG_TITLE" | sed -e 's/[\/&]/\\&/g')

# Populate the template
sed -e "s|<!-- BLOG_TITLE_HERE -->|$ESCAPED_BLOG_TITLE|g" \
    -e "s|<!-- BLOG_SLUG_HERE -->|$SLUG.html|g" \
    -e "s|<!-- BLOG_DESCRIPTION_HERE -->|$ESCAPED_BLOG_TITLE|g" \
    -e "s|<!-- BLOG_DATE_HERE -->|$BLOG_DATE|g" \
    -e "/<!-- BLOG_CONTENT_HERE -->/r $CONTENT_FILE" \
    -e "/<!-- BLOG_CONTENT_HERE -->/d" \
    "$TEMPLATE_FILE" > "$OUTPUT_FILE"

# Add link to index.html
# First, create the new link HTML
NEW_LINK_HTML="                    <a href=\"$SLUG.html\" class=\"thought-link\">$BLOG_TITLE</a>"

# Check if the new link already exists to prevent duplicates
if ! grep -q "$SLUG.html" "$INDEX_FILE"; then
    # Insert the new link after the <h2>Thoughts</h2> line
    # Use printf %q to properly quote the new_link for awk
    printf '%s\n' "$NEW_LINK_HTML" | awk -v new_link="$NEW_LINK_HTML" '/<h2 class="section-title">Thoughts<\/h2>/ { print; print new_link; next } { print }' "$INDEX_FILE" > "${INDEX_FILE}.tmp" && mv "${INDEX_FILE}.tmp" "$INDEX_FILE"
    echo "Added link to $BLOG_TITLE in $INDEX_FILE"
else
    echo "Link for $BLOG_TITLE already exists in $INDEX_FILE. Skipping update."
fi

echo "Successfully created new blog post: $OUTPUT_FILE"