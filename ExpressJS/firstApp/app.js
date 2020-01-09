const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
app.listen(port, "127.0.0.1", () => {
  console.log(`Server is listening at localhost:${port}`);
});

app.get("/", () => {
  console.log("Hello wordl!");
});

app.get("/hi", () => {
  console.log("Hi wordl!");
});
