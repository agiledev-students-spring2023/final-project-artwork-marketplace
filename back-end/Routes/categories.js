const router = require("express").Router()
const { auth } = require('../middleware/auth')

const { User } = require('../models/User')
const { Category } = require('../models/Category')
const { Artwork } = require('../models/Artwork')

// POST new category
router.post("/addCategory", auth, async (req, res) => {
    const newCategory = new Category(req.body)
    try{
        const savedCategory = await newCategory.save()
        res.status(200).json(savedCategory)  
    } catch (err){
        res.status(500).json(err)
    }
})

// GET all categories + artworks 
router.get("/", auth, async (req, res) => {
    try{
        const categories = await Category.find({}).populate({path: "products_id"})
        res.status(200).json(categories)
    } catch (err){
        res.status(500).json(err)
    }
})

// GET category by ID
router.get("/category/:id", auth, async (req, res) => {
    try{
        const category = await Category.findOne({_id: req.params.id}).populate({path: "products_id"})
        res.status(200).json(category)
    } catch (err){
        res.status(500).json(err)
    }
})

// GET categories by product ID
router.get("/product/:id", auth, async(req, res) => {
    try{
        const artworkCategories = await Category.find({products_id: req.params.id}).populate({path: "products_id"})
        res.status(200).json(artworkCategories)
    } catch (err){
        res.status(500).json(err)
    }
})

module.exports = router