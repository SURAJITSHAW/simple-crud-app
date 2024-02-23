const express = require("express")
const mongoose = require("mongoose");
const Product = require("./models/product.model")
require("dotenv").config();
const app = express()

// * middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false}))


// ! GET ALL PRODUCTS
app.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json({ data: products });
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// ! GET SPECIFIED PRODUCT BY ID
app.get("/api/products/:id", async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findById(id)
        res.status(200).json({ data: product });
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// ! UPDATE A PRODUCT
app.put("/api/products/:id", async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findByIdAndUpdate(id, req.body)

        if(!product){
            res.status(404).json({message: `Product doesn't exist`})
        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json({ data: updatedProduct });
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// ! DELETE A PRODUCT BY ID
app.delete("/api/products/:id", async (req, res) => {
    try {
        const { id } = req.params
        const deletedProduct = await Product.findByIdAndDelete(id)

        if(!deletedProduct){
            res.status(404).json({message: "Product don't exist."})
        }
        res.status(200).json({message: "Product deleted successfully."})

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// ! ADD A PRODUCT
app.post("/api/product", async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// ! DB connection and server initialization
mongoose.connect(
    process.env.DB_URL
).then(() => {
    console.log("Database connection is successfull.");
    app.listen(process.env.PORT, () => {
        console.log("Server is running on port 3000");
    });
}).catch(() => {
    console.log("Database connection failed!");
})







