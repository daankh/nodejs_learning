const path = require('path');

// const pathToFile = path.join(__dirname, 'index.js');
// const pathToFile = __dirname + '\\' + 'index.js';
// console.log(pathToFile);

// const anotherPath = path.join('/users/pl', 'active', 'users.json');
// console.log(anotherPath);

// const parse = path.parse(__filename);
// console.log(parse);

// const parse2 = path.parse(path.join(__dirname, 'index.js'));
// console.log(parse2);

// console.log(path.extname('dsadsadsa.js'));

// console.log(path.isAbsolute('./file.js'));
// console.log(path.isAbsolute('/file.js'));
// console.log(path.isAbsolute('file.js'));

const os = require('os');

const uptime = os.uptime();
console.log(uptime);

console.log(os.homedir());
