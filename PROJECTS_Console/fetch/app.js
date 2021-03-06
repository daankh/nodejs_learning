// http://numbersapi.com/random/year?json

//---------------------------------------------------------------
// // ZADANIE 1
// const fetch = require("node-fetch");
// //JAK USTALIĆ CO WPISALIŚMY?
// // console.log(process.argv);

// const year = process.argv[2] || Math.floor(Math.random() * 2020);
// // console.log(year);
// const url = `http://numbersapi.com/${year}/year?json`;

// //ZAPYTANIE O DANE DO SERWERA API
// // wywołanie node app.js 2000 lub inny number
// fetch(url)
//   .then(response => {
//     // console.log(response.status);
//     // console.log(response.ok);
//     if (response.ok) {
//       return response.json();
//     } else {
//       throw new Error();
//     }
//   })
//   .then(data => console.log(data.text))
//   .catch(err => console.log("Errorrrrrr: ", err));

//---------------------------------------------------------------
//ZADANIE 2
// `http://numbersapi.com/${number}/${type}?json`
// const fetch = require("node-fetch");
// console.log(process.argv);

// const arg = process.argv[2];
// let type = "";

// if (arg.indexOf("--year") === 0) {
//   console.log("szukamy informacji o roku...");
//   type = "year";
// } else if (arg.indexOf("--math") === 0) {
//   console.log("szukamy informacji o liczbie...");
//   type = "math";
// } else if (arg.indexOf("--trivia") === 0) {
//   console.log("szukamy ciekawoski o liczbie...");
//   type = "trivia";
// }

// const equalSign = arg.indexOf("=");
// // console.log(equalSign);
// if (equalSign === -1) console.log("nie wpisałeś liczby");

// const number = arg.slice(equalSign + 1);
// // console.log(number);

// if (number === "" || isNaN(Number(number))) {
//   console.log("To nie jest liczba");
//   process.exit();
// }

// fetch(`http://numbersapi.com/${number}/${type}?json`)
//   .then(response => {
//     if (response.ok) {
//       return response.json();
//     } else {
//       throw new Error();
//     }
//   })
//   .then(data => console.log(data.text))
//   .catch(err => console.log(err));

//------------------------------------------------------------------------
// ZADANIE 3 - NBP API - REQUEST
//`http://api.nbp.pl/api/exchangerates/rates/a/${code}/`
const request = require("request");
const fs = require("fs");

const validCodes = ["usd", "eur", "gbp", "chf"];
const code = process.argv[2];
const isValid = validCodes.find(currency => currency === code) ? true : false;
// console.log(isValid);

!isValid && process.exit();

const url = `http://api.nbp.pl/api/exchangerates/rates/a/${code}/?format=json`;
// console.log(url);
request(url, { json: true }, (err, res, body) => {
  // console.log(body);
  if (err) {
    return console.log("Błąd:", err);
  }
  if (res.statusCode !== 200) {
    return console.log("Błąd:", res.statusCode);
  }
  const { currency, rates } = body;
  const { effectiveDate, mid } = rates[0];
  const message = `Średnia cena ${currency} w dniu ${effectiveDate} wynosi ${mid} złotych.`;

  fs.appendFile("currencies.txt", message + "\n", err => {
    if (err) {
      return console.log("Błąd zapisu do plikuL", err);
    }
    return console.log("Zapisano do pliku.");
  });

  console.log(message);
});
