// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const day = date(); // Use const instead of var

// Sample initial items for "Personal" and "Work" lists
const Personalitems = []; // Use const instead of var
const workitems = []; // Use const instead of var

// Create an Express application
const app = express();

// Middleware to parse request body
app.use(bodyParser.urlencoded({ extended: true }));

// Set the view engine to EJS
app.set("view engine", "ejs");
app.use(express.static("public"));

// Define a route for the root URL
app.get("/", function (req, res) {
    // Render the "list" view with data for "Personal" list
    res.render("list", { listtitle: "Personal", typeOfDay: day, items: Personalitems });
});

// Define a route for handling POST requests
app.post("/", function (req, res) {
    // Get the new item and the selected list from the request body
    const newItem = req.body.item; // Use const instead of var

    if (req.body.list === "Work") {
        // Add the new item to the "Work" list
        workitems.push(newItem);
        // Redirect to the "Work" list
        res.redirect("/work");
    } else {
        // Add the new item to the "Personal" list
        Personalitems.push(newItem);
        // Redirect back to the "Personal" list
        res.redirect("/");
    }
});

app.post("/delete", function (req, res) {
    var listtitle = req.body.listtitle;
    var item = req.body.item;
    if (listtitle === "Personal") {
      var i = Personalitems.findIndex((element) => element === item.toString());
      if (i !== -1) {
        Personalitems.splice(i, 1); // Remove the element at index i
        res.redirect("/")
      }
    }
    if (listtitle === "Work") {
        var i =workitems.findIndex((element) => element === item.toString());
        if (i !== -1) {
          workitems.splice(i, 1); // Remove the element at index i
          res.redirect("/work")
        }
      }
  });
  
// Define a route for the "Work" list
app.get("/work", function (req, res) {
    // Render the "list" view with data for the "Work" list
    res.render("list", { listtitle: "Work", typeOfDay: day, items: workitems });
});

// Start the Express server on port 3000
app.listen(3000, function () {
    console.log("Server is running on port 3000...");
});
