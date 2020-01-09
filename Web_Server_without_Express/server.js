const http = require("http");

http
  .createServer((req, res) => {
    res.writeHead(200, {
      "Content-Type": 'text/html; charset="utf-8"'
    });
    //---1---
    // res.write("<h1>Cześć</h1>");
    // res.end();

    //---2---
    // res.end(`
    //   <h1>Dzień dobry</h1>
    //   <script src="./code.js"></script>
    // `);

    //---3---
    res.write(`
      <h1>Dzień dobry</h1>
      <script src="./code.js"></script>
    `);
    res.end(`
    <div>Lala</div>
    `);
  })
  .listen(3000, "127.0.0.1");
