const express = require("express");
const mongodb = require("mongodb");
const uri =
  "mongodb+srv://000333soundwin:TbIIFBvpYqsdJGW8@cluster0.kof3g.mongodb.net/";
const mongoOptions = { useUnifiedTopology: true };
const client = new mongodb.MongoClient(uri, mongoOptions);

const app = express();
app.use(express.json());

client.connect(function () {
  const db = client.db("mongo-week3");
  const collection = db.collection("movies");

  app.get("/films", function (request, response) {
    collection.find({}).toArray((error, movie) => {
      if (error) {
        response.status(500).send("there is a error here mate");
      } else {
        response.status(200).send(movie);
      }
    });
  });

  app.get("/films/:id", function (request, response) {
    const id = new mongodb.ObjectID(request.params.id);
    if (!mongodb.ObjectID.isValid()) {
      return response.status(404).send("your id is not correct");
    }

    const queryObject = { _id: id };

    collection.findOne(queryObject, (error, movie) => {
      if (error) {
        return response.status(500).send("this id doesn't exist");
      }
      if (!result) {
        return response.setStatus(404);
      }
      return response.status(200).send(movie);
    });
  });

  app.post("/films", function (request, response) {
    let data = request.body;
    console.log("body", data);
    collection.insertOne(data, (error, result) => {
      if (error) {
        response.status(500).send("error");
      }
      if (!result) {
        return response.sendStatus(404);
      }
      // ops means options : [{_id:"something1234", title:"batman"}]
      // in post we can have more than one thing here so we will use .ops[0] to make sure we are receiving just one thing.
      return response.send(result.ops[0]);
    });
  });

  app.put("/films/:id", function (request, response) {
    response.send("Update one film");
  });

  app.delete("/films/:id", function (request, response) {
    response.send("Delete one film");
  });

  app.listen(3000);
});
