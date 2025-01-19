const fs = require('fs');
const path = require('path');

const pathToDist = path.join(__dirname, 'project-dist');

async function createIndexFileDist() {
  try {
    const pathToComponent = path.join(__dirname, 'components');

    await fs.promises.mkdir(pathToDist, { recursive: true });

    let temp = await fs.promises.readFile('template.html', 'utf-8');

    const fileDist = path.join(pathToDist, 'index.html');

    const filesComponent = await fs.promises.readdir(pathToComponent);

    for (const file of filesComponent) {
      const fileComp = path.join(pathToComponent, file);
      const pathName = path.basename(fileComp, path.extname(fileComp));

      const readStream = fs.createReadStream(fileComp, 'utf-8');

      await new Promise((res, rej) => {
        readStream.on('data', (chunk) => {
          if (pathName === 'articles') {
            temp = temp.replace('{{articles}}', chunk);
          } else if (pathName === 'footer') {
            temp = temp.replace('{{footer}}', chunk);
          } else if (pathName === 'header') {
            temp = temp.replace('{{header}}', chunk);
          }
        });

        readStream.on('end', () => {
          res();
        });

        readStream.on('error', rej);
      });

      await fs.promises.writeFile(fileDist, temp, 'utf-8');

      console.log(`Complite create: ${pathName}`);
    }
  } catch (err) {
    console.error('Create index failed:', err);
  }
}

async function createStylefile() {
  try {
    const pathToStyles = path.join(__dirname, 'styles');
    const fileStyleDist = path.join(pathToDist, 'style.css');
    const dirStyle = await fs.promises.readdir(pathToStyles);

    const array = [];

    for (const file of dirStyle) {
      const pathToFileStyles = path.join(pathToStyles, file);

      const readStream = fs.createReadStream(pathToFileStyles, 'utf-8');

      await new Promise((res, rej) => {
        readStream.on('data', (chunk) => {
          array.push(chunk);
        });

        readStream.on('end', () => {
          res();
        });

        readStream.on('error', rej);
      });
    }

    await fs.promises.writeFile(fileStyleDist, array.join('\n'), 'utf-8');
    console.log('Complite create: styles');
  } catch (err) {
    console.error('Create style failed:', err);
  }
}

async function createAssets() {
  const pathToAssets = path.join(__dirname, 'assets');
  const pathToAssetsDist = path.join(pathToDist, 'assets');

  await fs.promises.mkdir(pathToAssetsDist, { recursive: true });

  const dirAssets = await fs.promises.readdir(pathToAssets, {
    withFileTypes: true,
  });

  for (const file of dirAssets) {
    const pathToFileAssets = path.join(pathToAssets, file.name);
    const pathToFileAssetsDist = path.join(pathToAssetsDist, file.name);

    if (file.isDirectory()) {
      await recursion(pathToFileAssets, pathToFileAssetsDist);
    } else if (file.isFile()) {
      await fs.promises.copyFile(pathToFileAssets, pathToFileAssetsDist);
    }
  }
}

async function recursion(orig, dist) {
  await fs.promises.mkdir(dist, { recursive: true });

  const dirRec = await fs.promises.readdir(orig, { withFileTypes: true });

  for (const file of dirRec) {
    const pathToFileAssets = path.join(orig, file.name);
    const pathToFileAssetsDist = path.join(dist, file.name);

    if (file.isDirectory()) {
      await recursion(pathToFileAssets, pathToFileAssetsDist);
    } else if (file.isFile()) {
      await fs.promises.copyFile(pathToFileAssets, pathToFileAssetsDist);
    }
  }
}

async function main() {
  await createIndexFileDist();
  await createStylefile();
  await createAssets();
}

main();
