const fs = require('fs');

// 1. ACCESS
// fs.access('./names.txt', fs.constants.F_OK, (err) => {
//   console.log(err ? "plik nie istnieje" : "plik istniej");
// })

// fs.access('./zablokowany.txt', fs.constants.W_OK, (err) => {
//   console.log(err ? "pliku nie można zapisywać" : "plik można zapisywać");
// })

// 2. RENAME

// try {
//   fs.renameSync('imona.txt', 'names.txt')
// } catch (err) {
//   console.log(err);
// }

// fs.rename('imiona.txt', 'names.txt', (err) => {
//   if (err) console.log(err);
//   else console.log("nazwa zmieniona");
// })

// console.log("ok");

// 3. READDIR

// console.log(fs.readdirSync('./'));

// fs.readdir('./', (err, files) => {
//   if (err) return console.log("Błąd: ", err);
//   console.log("Zawartość: ", files);
// })


//  4. READFILE

// fs.readFile('namesss.txt', 'utf8', (err, data) => {
//   if (err) throw Error(err)
//   console.log(data);
// })

// let names = "";
// try {
//   names = fs.readFileSync('namfdses.txt', 'utf8');
// } catch (err) {
//   // console.log(err);
//   names = false
// }
// console.log(names);


// 5. WRITEFILE | APPENDFILE

// fs.readFile('namess.txt', 'utf8', (err, data) => {
//   if (err) return console.log("nie udało się");
//   fs.writeFile('users.txt', data, (err) => {
//     if (err) console.log(err);
//     else console.log("udało się zapisać w pliku");
//   })
// })

// const names = "Jan, Jerzy"
// fs.readFile('names.txt', (err, data) => {
//   console.log(data);
//   fs.appendFile('users.txt', data, (err) => {
//     if (err) console.log(err);
//     else console.log("udało się zapisać w pliku");
//   })
// })
