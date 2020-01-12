const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 3000;
const app = express();
app.listen(port, () => {
  console.log(`Server is listening at localhost:${port}`);
});

//MIDDLEWARE
app.use(express.json()); //dodaje dodatkową zmienną do requesta -> req.body, wymagana do rozkodowania na serwerze json'a przesłanego przez front
express.static(path.join(__dirname, "static")); // umożliwia podanie ścieżki (folderu), gdzie są pliki statyczne, dzięki czemu nie trzeba każdego pliku html, css itd. podawać osobno
app.use(cookieParser()); // zwraca do req obiekty req.cookies i req.singedCookies, złuży do pobrania ciasteczek od użytkownika

app.post("/hello", (req, res) => {
  //----------------------------
  // Zapytanie na forontendzie
  // fetch("hello", {
  //   method: "POST",
  //   body: JSON.stringify({
  //     name: "Anna",
  //     surname: "Kowalska"
  //   }),
  //   headers: {
  //     "Content-Type": "Application/json"
  //   }
  // });
  //-----------------------------

  const { name, surname } = req.body;
  res.send(`Witaj ${name} ${surname}`);
});

// app.all("/", req => {
//   console.log(req.query);
//   const { name, surname } = req.query;
//   console.log(`Hello ${name} ${surname}`);

//   console.log(req.get("Referer"));
// });

// Podstawowa struktura dla RestAPI
app.get("/", (req, res) => {
  // console.log("Spis ludzi");
  // res.send("Strona głowna");

  //NAGŁÓWKI
  // res.set({
  //   "Content-Type": "text.plain"
  // });

  //Odpowiedź od serwera
  // Metoda 1
  // res.write("hello world");
  // res.end();
  //Metoda 2
  // const str = "Zażółć gęślą jaźń";
  // const arr = str.split(" ");
  // res.send(arr);

  // res.send({
  //   text: "Hello",
  //   isGood: true,
  //   arr: arr
  // });

  //Przeniesienie użytkownika
  // res.location("/another/path");
  // res.sendStatus(302);
  //lub
  // res.redirect(302, "/redirected/page");

  //Wysyłanie pliku
  // res.sendFile(fileName);
  // res.sendFile("plik.png", {
  //   root: path.join(__dirname, "static"),
  //   lastModified: false, // lub true (by default)
  //   headers: "",
  //   dotfiles: "ignore" //allow/deny/ignore (domyślnie)
  // });

  // res.attach() + składnia j.w. - wymusza na przeglądarce pobranie pliku, lecz trzeba zakonczyć przez res.end()
  //res.download() podobny do powyższej, sprawdź w dokumentacji

  // cookieParser
  // console.log(req.cookies);
  const { visitor_name } = req.cookies;
  console.log(visitor_name);
  if (visitor_name) {
    res.send(`witaj, ${visitor_name}`);
  } else {
    res.send("Czy my się znamy?");
  }
  // res.end();
});

app.get("/hi/:name", (req, res) => {
  const { name } = req.params;
  const dt = new Date();
  dt.setDate(dt.getDate() + 7);
  res.cookie("visitor_name", name, {
    expires: dt
  });
  //Opcje ciastek (podstawowe)
  // domain, expires, maxAge, httpOnly,
  res.send("Imię zapisano.");
});

app.get("/logout", (req, res) => {
  res.clearCookie("visitor_name");
  // res.send("Wylogowano");
  res.redirect(302, "/");
});

app.get("/:id", (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  console.log(`Informacja szczegółowa na temat osoby o ID ${id}`);

  res.send(`<h2>Informacja szczegółowa na temat osoby o ID ${id}<h2>`);
});

app.post("/", req => {
  console.log("Dodawanie osoby");

  res.end();
});

app.patch("/:id", req => {
  const { id } = req.params;
  console.log(`Aktualizacja osoby o ID ${id}`);

  res.end();
});

app.delete("/:id", req => {
  const { id } = req.params;
  console.log(`Usuwanie osoby o ID ${id}`);

  res.end();
});
