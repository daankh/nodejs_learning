const mongo = require("mongodb");

const client = new mongo.MongoClient("mongodb://localhost:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

client.connect(err => {
  if (err) {
    console.log("Błąd połączenia z MongoDB");
  } else {
    console.log("Pomyślnie połączono z MongoDB");
    const db = client.db("test");
    const clients = db.collection("clients");
    clients.find({}).toArray((err, clientsList) => {
      if (err) {
        console.log("Błędne zabytanie!");
      } else {
        console.log(clientsList);
      }
    });
    // clients.insertOne({
    //   brand: "Seat",
    //   model: "Ibiza"
    // });
    // clients.deleteOne({ _id: mongo.ObjectID("5e1f908dff514e4dd0982148") });
    // client.close();
  }
});
