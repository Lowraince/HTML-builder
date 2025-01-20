const fs = require('fs');
const path = require('path');

const pathToFolder = path.join(__dirname, 'files-copy');
const pathToOrigin = path.join(__dirname, 'files');

async function checkFolder() {
  try {
    await fs.promises.stat(pathToFolder);

    await fs.promises.rm(pathToFolder, { recursive: true });
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('Директории нет.');
    } else {
      console.error('Check folder failed:', err);
    }
  }
}

async function createCopy() {
  try {
    await fs.promises.mkdir(pathToFolder, { recursive: true });

    const readOrigin = await fs.promises.readdir(pathToOrigin, {
      withFileTypes: true,
    });

    for (const file of readOrigin) {
      const fileOriginPath = path.join(pathToOrigin, file.name);
      const fileCopyPath = path.join(pathToFolder, file.name);

      const streamRS = fs.createReadStream(fileOriginPath, 'utf-8');
      const streamWS = fs.createWriteStream(fileCopyPath);

      if (file.isFile()) {
        streamRS.pipe(streamWS);

        streamRS.on('error', (err) => console.error('Error:', err.message));
      }
    }
  } catch (err) {
    console.error('Create copy failed:', err);
  }
}

async function main() {
  await checkFolder();
  await createCopy();
}

main();
