const express = require("express")
const mongoose = require("mongoose");
const ProductRoutes = require("./routes/products.routes")
require("dotenv").config();
const app = express()

// * middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false}))

// * routes
app.use("/api/products", ProductRoutes)


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







