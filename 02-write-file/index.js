const fs = require('fs');
const path = require('path');
const readline = require('readline');

const pathName = path.join(__dirname, 'text.txt');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const writeText = (text) => {
  fs.appendFile(pathName, text + '\n', (error) => {
    if (error) {
      throw error;
    }
  });
};

rl.question('Add text: ', (text) => {
  writeText(text);

  rl.setPrompt('Add another text (or write "exit" to exit): ');
  rl.prompt();

  rl.on('line', (input) => {
    if (input.toLowerCase().trim() === 'exit') {
      console.log('Goodbye!');
      rl.close();
    } else {
      writeText(input);
      rl.prompt();
    }
  });
});
