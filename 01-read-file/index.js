const fs = require('fs');
const path = require('path');

const pathToFile = path.join(__dirname, 'text.txt');
const streamRS = fs.createReadStream(pathToFile, 'utf-8');

streamRS.on('data', (chunk) => console.log(chunk));
streamRS.on('end', () => console.log('End stream'));
streamRS.on('error', (err) => console.error('Error:', err.message));
