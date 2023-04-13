const router = require("express").Router()
const CategoryList = require("../SchemaSamples/AllCategories")
const ProductsList = require("../SchemaSamples/AllProducts")

const { User } = require('../models/User')
const { Category } = require('../models/Category')
const { Artwork } = require('../models/Artwork')

// POST new category
// WIP
router.post("/", (req, res) => {
    try{
        const newCategory = {
            _id: req.body._id,
            name: req.body.name,
            products_id: req.body.products_id,
        }
        res.status(200).json(newCategory)
    } catch (err){
        res.status(500).json(err)
    }
})


// GET all categories + artworks 
// WIP
router.get("/", (req, res) => {
    try{
        const categories = CategoryList
        res.status(200).json(categories)
    } catch (err){
        res.status(500).json(err)
    }
})

// GET category by ID
// WIP
router.get("/:id", (req, res) => {
    try{
        const categories = CategoryList.find(category => category._id == req.params.id)
        res.status(200).json(categories)
    } catch (err){
        res.status(500).json(err)
    }
})

// GET category by product ID
// WIP
router.get("/product/:id", (req, res) => {
    try{
        const thisProduct = ProductsList.find(product => product._id == req.params.id)
        const productCategory = CategoryList.filter(category => thisProduct.categories_id.includes(category._id))
        res.status(200).json(productCategory)
    } catch (err){
        res.status(500).json(err)
    }
})

module.exports = router

