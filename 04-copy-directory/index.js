const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'files');

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.log(err);
  } else {
    fs.stat(path.join(__dirname, 'files-copy'), (err, stats) => {
      if (err) {
        fs.mkdir(path.join(__dirname, 'files-copy'), (err) => {
          if (err) {
            console.log(err);
          } else {
            files.forEach((file) => {
              fs.copyFile(
                path.join(folderPath, file),
                path.join(__dirname, 'files-copy', file),
                (err) => {
                  if (err) {
                    console.log(err);
                  }
                },
              );
            });
          }
        });
      } else {
        if (stats.isDirectory()) {
          fs.rm(
            path.join(__dirname, 'files-copy'),
            { recursive: true },
            (err) => {
              if (err) {
                console.log(err);
              } else {
                fs.mkdir(path.join(__dirname, 'files-copy'), (err) => {
                  if (err) {
                    console.log(err);
                  } else {
                    files.forEach((file) => {
                      fs.copyFile(
                        path.join(folderPath, file),
                        path.join(__dirname, 'files-copy', file),
                        (err) => {
                          if (err) {
                            console.log(err);
                          }
                        },
                      );
                    });
                  }
                });
              }
            },
          );
        }
      }
    });
  }
});
