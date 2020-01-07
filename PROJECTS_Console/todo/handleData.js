const fs = require("fs");
const colors = require("colors");

const handleData = (type, title) => {
  // type - number, title - string
  //type 1 - add
  //type 2 - remove
  //type 3 - list

  // const data = fs.readFileSync("./datadb.json", "utf8");
  // let data = fs.readFileSync("./datadb.json");
  // data = data.toString();

  const data = fs.readFileSync("./datadb.json");
  const tasks = JSON.parse(data);
  console.log(tasks);

  if (type === 1 || type === 2) {
    const isExisted = tasks.find(task => task.title === title) ? true : false;
    if (type === 1 && isExisted) {
      return console.log("Takie zadanie już istnieje!".red);
    } else if (type === 2 && !isExisted) {
      return console.log("Nie magę usunąć zadania, które nie istnieje!".red);
    }
  }

  let dataJSON = "";

  switch (type) {
    case 1:
      // const id = tasks.length + 1;
      const id = tasks[tasks.length - 1].id + 1;
      tasks.push({
        id,
        title
      });
      dataJSON = JSON.stringify(tasks);
      fs.writeFileSync("./datadb.json", dataJSON);
      console.log(`Dodaję zadanie: ${title}`.white.bgGreen);
      break;
    case 2:
      const index = tasks.findIndex(task => task.title === title);
      tasks.splice(index, 1);
      dataJSON = JSON.stringify(tasks);
      fs.writeFile("./datadb.json", dataJSON, "utf8", err => {
        if (err) throw err;
        console.log(`Usunięto zadnie: ${title}`.white.bgRed);
      });
      break;
    case 3:
      console.log(
        `Lista zadań do zrobienia obejmuje ${tasks.length} pozycji. Do zrobienia masz:`
      );
      if (tasks.length) {
        tasks.forEach((task, index) => {
          if (index % 2)
            return console.log(`${index + 1}. ${task.title}`.green);
          return console.log(`${index + 1}. ${task.title}`.yellow);
        });
      }
      break;
  }
};

module.exports = handleData;
