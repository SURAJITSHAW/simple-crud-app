const express = require("express");
const {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
} = require("../controllers/products.controller");
const router = express()

// ! Get all products
router.get("/", getAllProducts);

// ! Get product
router.get("/:id", getProductById);

// ! Add product
router.post("/", addProduct)

// ! Update product
router.put("/:id", updateProduct)

// ! Delete product
router.delete("/:id", deleteProduct)


module.exports = router