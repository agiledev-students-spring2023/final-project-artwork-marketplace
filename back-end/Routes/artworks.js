const router = require("express").Router()
const ProductsList = require("../SchemaSamples/AllProducts")

const { User } = require('../models/User')
const { Category } = require('../models/Category')
const { Artwork } = require('../models/Artwork')

// creating && saving a new artwork
router.post("/AddArt", async (req, res) => {
    try{
        const newArtwork = {
            artist_id: req.body.artist_id,
            name: req.body.name,
            shortDescription: req.body.shortDescription,
            price: req.body.price,
            status: req.body.status,
            thumbnailURL: req.body.thumbnailURL,
            categories_id: req.body.categories_id,
            imagesURL: req.body.imagesURL
        }
        if(newArtwork.artist_id === "" || newArtwork.name === "" || newArtwork.shortDescription === "" || newArtwork.price === ""  
            || (newArtwork.status !== "Available") || newArtwork.thumbnailURL === "" || (newArtwork.categories_id.length === 0) 
            || (newArtwork.imagesURL.length === 0)){
                console.log(req.body)
                return res.status(400).json("Artwork does not meet requirement!")
        }
        const saveArtwork = new Artwork(newArtwork)
        const artwork = await saveArtwork.save()
        return res.status(200).json(artwork._id)
    } catch (err){
        res.status(500).json(err)
    }
})

// getting a list of all artworks (find all of them)
router.get("/", async (req, res) => {
    try{
        const artworks = await Artwork.find({})
        res.status(200).json(artworks)
    } catch (err){
        res.status(500).json(err)
    }
})

// getting a list of all artworks sorted by price ASC (ascending/ low->high)
router.get("/sortedASC", async (req, res) => {
    try{
        const ascPriceArtworks = ProductsList.sort((artwork1, artwork2) => (artwork1.price > artwork2.price) ? 1 : ((artwork1.price < artwork2.price) 
        ? -1 : 0)) 
        res.status(200).json(ascPriceArtworks)
    } catch (err){
        res.status(500).json(err)
    }
})

// getting a list of all artworks sorted by price DES (descending/ high->low)
router.get("/sortedDES", async (req, res) => {
    try{
        const desPriceArtworks = ProductsList.sort((artwork1, artwork2) => (artwork1.price < artwork2.price) ? 1 : ((artwork1.price > artwork2.price) 
        ? -1 : 0)) 
        res.status(200).json(desPriceArtworks)
    } catch (err){
        res.status(500).json(err)
    }
})

// getting artwork by id
router.get("/:id", async (req, res) => {
    try{
        // will be changed with different function once connected to mongoose
        // const artwork = ProductsList.find(product => product._id == req.params.id)
        const artwork = await Artwork.find({_id: req.params.id})
        console.log(artwork)
        res.status(200).json(artwork)
    } catch (err){
        res.status(500).json(err)
    }
})

// get artworks by artist_id
router.get("/artist/:id", async (req, res) => {
    try{
        const artworksByArtist = ProductsList.filter(product => product.artist_id == req.params.id)
        res.status(200).json(artworksByArtist)
    } catch (err){
        res.status(500).json(err)
    }
})

// get artworks by category_id
router.get("/category/:id", async (req, res) => {
    try{
        const artworksByCategory = ProductsList.filter(product => product.categories_id.includes(req.params.id))
        res.status(200).json(artworksByCategory)
    } catch (err){
        res.status(500).json(err)
    }
})

// get artworks in price range
router.get("/priceRange/:lower/:higher", async (req, res) => {
    try{
        const artworksInPriceRange = ProductsList.filter(product => (product.price <= req.params.higher && product.price >= req.params.lower))
        res.status(200).json(artworksInPriceRange)
    } catch (err){
        res.status(500).json(err)
    }
})

// get artworks by status
router.get("/activeStatus/:status", async (req, res) => {
    try{
        const artworksByStatus = ProductsList.filter(product => product.status.toLowerCase() === req.params.status.toLowerCase())
        res.status(200).json(artworksByStatus)
    } catch (err){
        res.status(500).json(err)
    }
})

module.exports = router