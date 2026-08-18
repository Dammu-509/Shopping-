var mongoClient=require("mongodb").MongoClient;
var express=require("express");
var cors=require("cors");

var connectionString="mongodb://127.0.0.1:27017";
 var app=express();
 app.use(cors());
 app.use(express.urlencoded({
    extended:true
 }));
 app.use(express.json());
 app.get("/products",(req,res)=>{
    mongoClient.connect(connectionString).then(ClientObject=>{
     var database=ClientObject.db("shopper");
     database.collection("products").find({}).toArray().then (documents=>{
        res.send(documents);
        res.end();
     })
    })
 });
 app.get("/details/:id",(req,res)=>{
      var id=parseInt(req.params.id);
    mongoClient.connect(connectionString).then(ClientObject=>{
      
     var database=ClientObject.db("shopper");
     database.collection("products").find({productId:id}).toArray().then (documents=>{
        res.send(documents);
        res.end();
 })
    })
 });
 app.post("/addproduct",(req,res)=>{
     mongoClient.connect(connectionString).then(ClientObject=>{
      var database=ClientObject.db("shopper");
     var product={
        "productId":parseInt(req.body.productId),
        "Name":req.body.Name,
        "price":parseFloat(req.body.price),
        "stock":(req.body.stock=="true")?true:false

     };
     database.collection("products").insertOne(product).then(result=>{
        console.log("record Inserted");
        res.redirect("/products");
        res.end(); 
     })
 })
});
app.put("/updateproduct",(req,res)=>{
     mongoClient.connect(connectionString).then(ClientObject=>{
      var database=ClientObject.db("shopper");
      var findQuery={productId:parseInt(req.body.productId)};
      var updateQuery={$set:{Name:req.body.Name,price:parseFloat(req.body.price),stock:(req.body.stock=="true")?true:false}};
      database.collection("products").updateOne(findQuery,updateQuery).then(result=>{
        console.log("record updated");
      res.send("Product Updated");
        res.end();

      })
})
});app.delete("/deleteproduct/:id",(req,res)=>{

    mongoClient.connect(connectionString).then(ClientObject=>{

        var id=parseInt(req.params.id);

        var database=ClientObject.db("shopper");

        database.collection("products").deleteOne({productId:id}).then(result=>{

            console.log("record deleted");

            res.send("Product Deleted");

        })

    })

});
    
// GET USERS
app.get("/users", async (req, res) => {

    console.log("GET /users called");

    try {

        const client = new mongoClient(connectionString);

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
        const client = new mongoClient(connectionString);

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


 app.listen(8080);
 console.log(`Server started: http://127.0.0.1:8080`);