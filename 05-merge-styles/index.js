const fs = require('fs');
const path = require('path');

const pathStyles = path.join(__dirname, 'styles');
const pathProject = path.join(__dirname, 'project-dist');
const pathBundle = path.join(pathProject, 'bundle.css');

const writeStream = fs.createWriteStream(pathBundle, { flags: 'w' });

fs.readdir(pathStyles, (err, files) => {
  if (err) {
    console.log(err);
  } else {
    files.forEach((file) => {
      if (path.extname(file) === '.css') {
        const filePath = path.join(pathStyles, file);
        const readStream = fs.createReadStream(filePath);

        readStream.on('data', (chunk) => {
          writeStream.write(chunk + '\n', 'utf8');
        });
      }
    });
  }
});
