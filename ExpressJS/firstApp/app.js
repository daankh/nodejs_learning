const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
app.listen(port, () => {
  console.log(`Server is listening at localhost:${port}`);
});

// app.get("/", req => {
//   console.log("Hello world");
//   // console.log(req.hostname);
//   // console.log(req.ip);
//   // console.log(req.ips);
//   // console.log(req.method);
//   // console.log(req.url);
//   // console.log(req.orginalUrl);
//   // console.log(req.path);
// });

app.get("/hi", () => {
  console.log("Hi wordl!");
});

app.all("/", req => {
  // Metody request
  // console.log("Hello world");
  console.log(req.hostname);
  console.log(req.ip);
  console.log(req.ips);
  console.log(req.method);
  console.log(req.url);
  console.log(req.orginalUrl);
  console.log(req.path);
  console.log(req.protocol);
  console.log(req.secure);
});
