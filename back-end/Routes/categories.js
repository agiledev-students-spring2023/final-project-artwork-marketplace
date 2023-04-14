const router = require("express").Router()
const CategoryList = require("../SchemaSamples/AllCategories")
const ProductsList = require("../SchemaSamples/AllProducts")

const { User } = require('../models/User')
const { Category } = require('../models/Category')
const { Artwork } = require('../models/Artwork')

// POST new category
router.post("/addCategory", async (req, res) => {
    const newCategory = new Category(req.body)
    try{
        const savedCategory = await newCategory.save()
        res.status(200).json(savedCategory)  
    } catch (err){
        console.log(err)
        res.status(500).json(err)
    }
})

// GET all categories + artworks 
router.get("/", async (req, res) => {
    try{
        const categories = await Category.find({})
        res.status(200).json(categories)
    } catch (err){
        res.status(500).json(err)
    }
})

// GET category by ID
router.get("/:id", async (req, res) => {
    try{
        const categories = await Category.find({_id: req.params.id})
        res.status(200).json(categories)
    } catch (err){
        res.status(500).json(err)
    }
})

// GET category by product ID
router.get("/product/:id", async(req, res) => {
    try{
        const artworkCategories = await Category.find({products_id: req.params.id})
        res.status(200).json(artworkCategories)
    } catch (err){
        res.status(500).json(err)
    }
})

module.exports = router

