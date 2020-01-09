const http = require("http");
const fs = require("fs");
const path = require("path");

const port = process.env.PORT || 3000;

const users = [
  { id: 1, name: "Adam" },
  { id: 2, name: "Ewa" }
];

http
  .createServer((req, res) => {
    switch (req.url) {
      case "/favicon.ico":
        res.end();
        return;
      case "/":
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        fs.readFile(path.join(__dirname, "index.html"), (err, page) => {
          console.log(page);
          if (err) {
            res.end(`<h1>Nie udało się pobrać pliku</h1>`);
          } else {
            res.end(page);
          }
        });
        // res.end(`<h1>Strona główna</h1>`);
        break;
      case "/users":
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        fs.readFile(path.join(__dirname, "users.html"), (err, page) => {
          // console.log(page);
          if (err) {
            res.end(`<h1>Nie udało się pobrać pliku</h1>`);
          } else {
            res.end(page);
          }
        });
        // res.end(`<h1>Strona użytkowników</h1>`);
        break;
      case "/api":
        res.writeHead(200, {
          "Content-Type": "application/json; charset=utf-8"
        });
        const usersJSON = JSON.stringify(users);
        res.end(usersJSON);
        break;
      case "/code.js":
        res.writeHead(200, {
          "Content-Type": "application/javascript; charset=utf-8"
        });
        fs.readFile(path.join(__dirname, "script.js"), (err, script) => {
          // console.log(script);
          if (err) {
            res.end(`<h1>Nie udało się pobrać pliku</h1>`);
          } else {
            res.end(script);
          }
        });
        // res.end('console.log("przekazany JS")');
        break;
      default:
        res.end("<h1>Strona nie istnieje</h1>");
        break;
    }

    // res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    // res.end(`<h1>Strona</h1>`);
  })
  .listen(port, "127.0.0.1", () => {
    console.log(`Nasz serwer nasłuchuje na porcie ${port}`);
  });
