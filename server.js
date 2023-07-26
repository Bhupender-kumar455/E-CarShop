const express = require("express");
const mongoose = require("mongoose");
const Car = require("./schema");
const app = express();
app.use(express.urlencoded({ extended: true }));

app.use("/Assets", express.static("Assets"));
app.use("/public", express.static("public"));
app.set("view engine", "ejs");
// const Post = require("./schema");

const dbURL =
  "mongodb+srv://kbhupender455:carshop@cluster0.c8y2qxg.mongodb.net/?retryWrites=true&w=majority";
app.set("view engine", "ejs");
mongoose
  .connect(dbURL)
  .then(() => {
    app.listen(3000);

    console.log("Everything is alright . keep going");
  })
  .catch((err) => {
    console.log(err);
  });

// Implementing the schema and saving the data in database
// app.get("/add", (req, res) => {
//   const car = new Car({
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfs21VqSgMdaQ_oQQpYTEX3JO-rZoyY1VvxEWB_Fjqyd4zeQY2",
//     name: "Honda NSX",
//     about:
//       "The Honda NSX, marketed in North America as the Acura NSX, is a two-seater, mid-engined coupe sports car manufactured by Honda. The origins of the NSX trace back to 1984, with the HP-X concept, which was a mid-engine 3.0 L V6 engine rear wheel drive sports car",
//   });
//   car
//     .save()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// Requesting to the database for list of all the document
// app.get("/all", (req, res) => {
//   Car.find()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// This is how we can find the document by the id
// app.get("/single", (req, res) => {
//   Car.findById("ex-id")
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// rendering the data from the database on index
app.get("/cars", (req, res) => {
  Car.find()
    .then((result) => {
      res.render("index", { title: "Homepage", cars: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/cars", (req, res) => {
  const car = new Car(req.body);
  car
    .save()
    .then((result) => {
      res.redirect("/cars");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/", (req, res) => {
  res.redirect("/cars");
});
app.get("/features", (req, res) => {
  res.render("features", { title: "features" });
});
app.get("/addNew", (req, res) => {
  res.render("addNew", { title: "Add-New" });
});
app.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact" });
});
app.use((req, res) => {
  res.render("404", { title: "Not Found" });
});
