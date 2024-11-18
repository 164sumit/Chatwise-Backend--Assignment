const fs = require('fs');
const path = require('path');

// Path to the JSON file
const jsonFilePath = path.join(__dirname, 'readme.json');

// Path to the output README.md file
const outputFilePath = path.join(__dirname, 'README.md');

// Read the JSON file
fs.readFile(jsonFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the JSON file:', err);
    return;
  }

  // Parse the JSON data
  const jsonData = JSON.parse(data);

  // Extract the content
  const readmeContent = jsonData.content;

  // Write the content to README.md
  fs.writeFile(outputFilePath, readmeContent, 'utf8', (err) => {
    if (err) {
      console.error('Error writing the README.md file:', err);
      return;
    }

    console.log('README.md file has been created successfully!');
  });
});
