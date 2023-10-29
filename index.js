// Importing necessary modules and functions from the "sequelize" package
const { Sequelize, Model, DataTypes } = require("sequelize");

// Configuration object for the SQLite database
const conf = {
  host: "localhost", // Database host
  dialect: "sqlite", // Specifying the type of database as SQLite
  storage: "./database.sqlite", // Path where the SQLite database file will be stored
};

// Initializing a new Sequelize instance with the specified configuration
const sequelize = new Sequelize("database", "", "", conf);

// Defining a new "User" model with two fields: firstname and lastname
const User = sequelize.define(
  "User",
  {
    firstname: DataTypes.STRING, // String type field for the first name
    lastname: DataTypes.STRING, // String type field for the last name
  },
  {
    timestamps: false, // Not including timestamp fields (createdAt, updatedAt) in the model
  }
);

// Importing the express module to create a web server
const express = require("express");
const app = express(); // Initializing the express application
const port = 3000; // Setting the port number for the server

// Middleware to parse JSON request bodies
app.use(express.json());

// GET endpoint to fetch all customers from the database
app.get("/customers", async (req, res) => {
  const users = await User.findAll(); // Fetching all User records
  res.send(users); // Sending the fetched users as the response
});

// POST endpoint to create a new customer in the database
app.post("/customers", async (req, res) => {
  let result = await User.create(req.body); // Creating a new User record from the request body
  res.status(201).json(result.dataValues);
});

// Starting the express server and initializing the database connection
app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);

  await sequelize.authenticate(); // Authenticating the database connection
  console.log("Connection success");

  await sequelize.sync({ force: false }); // Synchronizing the models with the database (not forcing table recreation)
  console.log("Created the tables");

  // Creating a sample User record with the name "jack smith"
  await User.create({
    firstname: "jack",
    lastname: "smith",
  });
});
