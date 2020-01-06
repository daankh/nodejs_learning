const users = [
  { id: 0, name: "Zbychu" },
  { id: 1, name: "Adam" },
  { id: 2, name: "Marysia" },
  { id: 3, name: "Jaga" }
];

module.exports = {
  showUsers() {
    const names = users.map(user => user.name);
    names.forEach(name => console.log(name));
  },
  showUser(id) {
    const user = users.filter(user => user.id === id);
    if (user[0]) {
      console.log(`Username: ${user[0].name}`);
    } else {
      console.log("User not found");
    }
  }
};
