const path = require('path');
const fs = require('fs');

const pathToFolder = path.join(__dirname, 'secret-folder');

fs.readdir(pathToFolder, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.error(err);
  } else {
    files.forEach((file) => {
      if (file.isFile()) {
        const fileName = file.name.split('.')[0];
        const fileExt = path.extname(file.name).slice(1);
        const fileStatsPath = path.join(pathToFolder, file.name);

        fs.stat(fileStatsPath, (err, stats) => {
          if (err) {
            console.error(err);
          } else {
            console.log(`${fileName} - ${fileExt} - ${stats.size}b`);
          }
        });
      }
    });
  }
});
