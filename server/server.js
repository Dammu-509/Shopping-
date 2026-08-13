var mongoClient = require("mongodb").MongoClient;
var express = require("express");
var cors = require("cors");

var connectionstring = "mongodb://127.0.0.1:27017";

var app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Test API
app.get("/", (req, res) => {
    res.send("Server is running");
});


// GET USERS
app.get("/users", async (req, res) => {

    console.log("GET /users called");

    try {

        const client = new mongoClient(connectionstring);

        await client.connect();

        console.log("MongoDB connected");

        const database = client.db("shopper");

        const documents = await database
            .collection("users")
            .find({})
            .toArray();

        console.log("Users:", documents);

        res.json(documents);

        await client.close();

    } catch (error) {

        console.log("MongoDB error:", error);

        res.status(500).json({
            message: "Error connecting to MongoDB",
            error: error.message
        });

    }

});


// POST REGISTER USER
app.post("/registeruser", async (req, res) => {

    console.log("POST /registeruser called");

    console.log("Received data:", req.body);

    try {

        // Data coming from React/Postman
        var user = {
            UserId: req.body.UserId,
            UserName: req.body.UserName,
            PassWord: req.body.PassWord,
            Email: req.body.Email,
            Age: parseInt(req.body.Age)
        };

        console.log("User to insert:", user);


        // Connect MongoDB
        const client = new mongoClient(connectionstring);

        await client.connect();

        console.log("MongoDB connected");


        // Select database
        const database = client.db("shopper");


        // Select collection
        const collection = database.collection("users");


        // Insert user
        const result = await collection.insertOne(user);


        console.log("Inserted:", result);


        // Send response
        res.status(201).json({
            message: "User Registered Successfully",
            insertedId: result.insertedId,
            user: user
        });


        await client.close();

    } catch (error) {

        console.log("Insert error:", error);

        res.status(500).json({
            message: "User registration failed",
            error: error.message
        });

    }

});


// Start server
app.listen(5000, () => {

    console.log(
        "Server is running on http://127.0.0.1:5000"
    );

});