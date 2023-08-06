import express from 'express';
import fetch from 'node-fetch';
import fs from 'fs';
const app = express();



// Load the list of sites from the JSON file
const sites = JSON.parse(fs.readFileSync('./sites.json'));

// Store status records for each site
const statusRecords = {};

// Function to check site status
async function checkSiteStatus(site) {
  try {
    const response = await fetch(site.url);
    return response.ok ? 'Online' : 'Offline';
  } catch (error) {
    return 'Offline';
  }
}

// Function to update status records
function updateStatusRecords() {
  for (const site of sites) {
    if (!statusRecords[site.name]) {
      statusRecords[site.name] = [];
    }

    const status = checkSiteStatus(site);
    statusRecords[site.name].push({
      status,
      timestamp: new Date().toISOString(),
    });

    // Ensure a maximum of 10 records per site
    if (statusRecords[site.name].length > 10) {
      statusRecords[site.name].shift();
    }
  }
}

// Schedule status updates every minute
setInterval(updateStatusRecords, 60000);

// Define a route to get the site status records
app.get('/sites', (req, res) => {
  res.json(statusRecords);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
