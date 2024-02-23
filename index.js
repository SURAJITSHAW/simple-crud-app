const express = require("express")
const mongoose = require("mongoose");
const Product = require("./models/product.model")
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send("Hello from Node API.")
})

app.post("/api/products", async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

mongoose.connect(
    "mongodb+srv://admin:admin@cluster0.4y6a4cs.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0"
).then(() => {
    console.log("Database connection is successfull.");
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
}).catch(() => {
    console.log("Database connection failed!");
})







