const http = require("http");

const server = http.createServer((request, response) => {
  console.log(request.url);
  response.writeHead(200, { "Content-Type": "text/html" });
  response.end("<h1>Hello world</h1>");
});

server.listen(5500, "127.0.0.1", () => console.log("serwer wystartowal..."));
