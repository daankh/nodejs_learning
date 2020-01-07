const handleData = require("./handleData");
const colors = require("colors");

const handleCommand = ({ add, remove, list }) => {
  // console.log(add, remove, list);
  if (add) {
    // console.log("bede dodawac");
    if (typeof add !== "string") {
      return console.log("Wpisz nazwę dodawanego zadania (tekst!)".red);
    } else if (add.length < 7) {
      return console.log("Nazwa zadania musi mieć więcej niż 6 znaków".red);
    }
    handleData(1, add);
  } else if (remove) {
    // console.log("bede usuwac");
    if (typeof remove !== "string" || remove.length < 7) {
      return console.log(
        "Wpisz nazwę usuwanego zadania. To musi być tekst i musi mieć więcej niż 6 znaków"
          .red
      );
    }
    handleData(2, remove);
  } else if (list || list === "") {
    // console.log("pokazuje liste");
    handleData(3, null);
  } else {
    console.log(
      'Nie rozumiem polecenia. Użyj --add="nazwa_zadania", --remove="nazwa_zadania" lub --list'
        .red
    );
  }
};

module.exports = handleCommand;
