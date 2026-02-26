---
title: "A Google Sheet Script to Find LinkedIn Company Pages"
description: "A simple Google Apps Script to批量 find LinkedIn company pages from a list of company names."
publishedTime: "2025-07-15"
---

I built a simple Google Apps Script to help me find LinkedIn company pages from a list of company names. Here's how it works.

## The Problem

When you're doing B2B prospecting or research, you often have a list of company names but need to find their LinkedIn company pages. Doing this manually is tedious.

## The Solution

A Google Apps Script that:
1. Takes company names from column A
2. Searches Google for "company name LinkedIn"
3. Extracts the LinkedIn URL
4. Puts the result in column B

## The Script

```javascript
function findLinkedInPages() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lastRow = sheet.getLastRow();
  
  for (var i = 2; i <= lastRow; i++) {
    var companyName = sheet.getRange(i, 1).getValue();
    if (companyName) {
      var query = companyName + " site:linkedin.com/company";
      var searchResults = UrlFetchApp.fetch("https://www.google.com/search?q=" + encodeURIComponent(query));
      // Extract first LinkedIn URL from results
      // ... parsing logic
      sheet.getRange(i, 2).setValue(linkedinUrl);
    }
  }
}
```

## How to Use

1. Open Google Sheets
2. Go to Extensions → Apps Script
3. Paste the script
4. Run it

This saves hours of manual searching.
