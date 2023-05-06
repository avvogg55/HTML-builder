const fs = require('fs');
const rl = require('readline');
const path = require('path');

const filePath = path.join(__dirname, 'text.txt');

const writeStream = fs.createWriteStream(filePath);

readLine = rl.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

console.log("Введите текст для записи(Для завершения ввода напишите 'exit' или нажмите ctrl + c):");

readLine.on('line', (input) => {

    if (input === 'exit') {
        console.log('Ввод завершен');
        process.exit;
    } else {
        writeStream.write(input + '\n');
    }
});

process.on('SIGINT', () => {
    console.log('Ввод завершен')
    process.exit;
})