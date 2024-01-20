const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.log(err);
  } else {
    files.forEach((dirElem) => {
      if (dirElem.isFile()) {
        const filePath = path.join(folderPath, dirElem.name);
        const fileExtension = path.extname(filePath);
        fs.readFile(filePath, (err, data) => {
          if (err) {
            console.log(err);
          } else {
            const dirNameSplit = dirElem.name.split('.')[0];
            const fileExSplit = fileExtension.split('.')[1];
            const dataLenght = data.length;

            console.log(`${dirNameSplit} - ${fileExSplit} - ${dataLenght}b`);
          }
        });
      }
    });
  }
});
