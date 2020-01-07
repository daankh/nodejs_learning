// console.log(process.argv.slice(2, 3));
const parseArgs = require("minimist");
const colors = require("colors");

const command = parseArgs(process.argv.slice(2, 3));
delete command._;
// console.log(command);

const handleCommand = ({ add, remove, list }) => {
  // console.log(add, remove, list);
  if (add) {
    // console.log("bede dodawac");
    if (typeof add !== "string") {
      return console.log("Wpisz nazwę dodawanego zadania (tekst!)".red);
    } else if (add.length < 7) {
      return console.log("Nazwa zadania musi mieć więcej niż 6 znaków".red);
    }
    handleData();
  } else if (remove) {
    // console.log("bede usuwac");
    if (typeof remove !== "string" || remove.length < 7) {
      return console.log(
        "Wpisz nazwę usuwanego zadania. To musi być tekst i musi mieć więcej niż 6 znaków"
          .red
      );
    }
    handleData();
  } else if (list || list === "") {
    // console.log("pokazuje liste");
    handleData();
  } else {
    console.log(
      'Nie rozumiem polecenia. Użyj --add="nazwa_zadania", --remove="nazwa_zadania" lub --list'
        .red
    );
  }
};

const handleData = () => {};

handleCommand(command);
