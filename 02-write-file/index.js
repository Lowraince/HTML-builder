const fs = require('fs');
const path = require('path');

const pathToText = path.join(__dirname, 'text.txt');

const streamWS = fs.createWriteStream(pathToText, { flags: 'a' });

const { stdin, stdout } = process;

stdout.write('Enter your message(use "exit" or ctrl + c to quit):\n');
stdin.on('data', (data) => {
  const dataToStr = data.toString().trim().toLowerCase();

  if (dataToStr === 'exit') {
    stdout.write('\nGoodbye');
    process.exit();
  } else {
    streamWS.write(data, (err) => {
      if (err) {
        console.error('Error', err.message);
      }
    });
  }
});

process.on('SIGINT', () => {
  console.log('Goodbye');
  process.exit();
});
