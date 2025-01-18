const fs = require('fs');
const path = require('path');

const pathToFolder = path.join(__dirname, 'files-copy');
const pathToOrigin = path.join(__dirname, 'files');

fs.mkdir(pathToFolder, { recursive: true }, (err) => {
  if (err) {
    throw err;
  }
});

fs.readdir(pathToFolder, (err, files) => {
  if (err) {
    throw err;
  }
  files.forEach((file) => {
    const pathToFolderFiles = path.join(pathToFolder, file);
    fs.unlink(pathToFolderFiles, (err) => {
      if (err) console.error(err);
    });
  });
});

fs.readdir(pathToOrigin, { withFileTypes: true }, (err, files) => {
  if (err) throw err;

  files.forEach((file) => {
    if (file.isFile()) {
      const fileOriginPath = path.join(pathToOrigin, file.name);
      const fileCopyPath = path.join(pathToFolder, file.name);

      const streamRS = fs.createReadStream(fileOriginPath, 'utf-8');
      const streamWS = fs.createWriteStream(fileCopyPath);

      streamRS.on('data', (chunk) => {
        streamWS.write(chunk);
      });

      streamRS.on('end', () => {
        streamWS.end();
        console.log('End stream for:', file.name);
      });

      streamRS.on('error', (err) => console.error('Error:', err.message));
      streamWS.on('error', (err) => console.error('Error:', err.message));
    }
  });
});
