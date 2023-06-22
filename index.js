const express = require("express");
const cors = require("cors");
const port = 5000;
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
require("dotenv").config();

app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello from fooderium server");
});



const uri = `mongodb+srv://${process.env.db_user}:${process.env.db_password}@cluster0.nmwbvvs.mongodb.net/?retryWrites=true&w=majority`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();


        const mealsCategoryCollection = client.db("fooderiumDb").collection("mealsCategory");
        const drinksCategoryCollection = client.db("fooderiumDb").collection("drinksCategory");


        app.get("/meals-collection", async (req, res) => {
            const query = {};
            const mealsCategory = await mealsCategoryCollection.find(query).toArray();
            res.send(mealsCategory);


        });

        app.get("/drinks-collection", async (req, res) => {
            const query = { type: req.query.type };
            const drinksCategory = await drinksCategoryCollection.find(query).toArray();
            res.send(drinksCategory);
        });


    } finally {

    }
}
run().catch((err) => console.error(err));


app.listen(port, () => {
    console.log("Server is running on port:", port);
}); 