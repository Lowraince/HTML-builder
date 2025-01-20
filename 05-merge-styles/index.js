const fs = require('fs');
const path = require('path');

const pathToStyles = path.join(__dirname, 'styles');
const pathToProject = path.join(__dirname, 'project-dist');

const pathToOutputFile = path.join(pathToProject, 'bundle.css');

const streamWS = fs.createWriteStream(pathToOutputFile);

fs.readdir(pathToStyles, { withFileTypes: true }, (err, files) => {
  if (err) throw err;

  files.forEach((file) => {
    const fileStylePath = path.join(pathToStyles, file.name);
    const fileExt = path.extname(file.name);

    const streamRS = fs.createReadStream(fileStylePath, 'utf-8');

    if (file.isFile() && fileExt === '.css') {
      streamRS.pipe(streamWS, { end: false });

      streamRS.on('error', (err) => console.error('Error:', err.message));
    }
  });
});

streamWS.on('error', (err) => console.error('Error:', err.message));
