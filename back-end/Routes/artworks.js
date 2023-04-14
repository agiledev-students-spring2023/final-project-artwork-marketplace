const router = require("express").Router()
const ProductsList = require("../SchemaSamples/AllProducts")

const { User } = require('../models/User')
const { Category } = require('../models/Category')
const { Artwork } = require('../models/Artwork')

// creating && saving a new artwork
// routing: done! 
router.post("/AddArt", async (req, res) => {
    try{
        const newArtwork = {
            artist_id: req.body.artist_id,
            name: req.body.name,
            shortDescription: req.body.shortDescription,
            price: req.body.price,
            status: "Available",
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

// getting a list of all artworks
// routing: done! 
router.get("/", async (req, res) => {
    try{
        const artworks = await Artwork.find({})
        res.status(200).json(artworks)
    } catch (err){
        res.status(500).json(err)
    }
})

// getting a list of all artworks sorted by price ASC (ascending/ low->high)
// routing: done! 
router.get("/sortedASC", async (req, res) => {
    try{
        const ascPriceArtworks = await Artwork.find({}).sort({price: 1})
        res.status(200).json(ascPriceArtworks)
    } catch (err){
        res.status(500).json(err)
    }
})

// getting a list of all artworks sorted by price DES (descending/ high->low)
// routing: done! 
router.get("/sortedDES", async (req, res) => {
    try{
        const desPriceArtworks = await Artwork.find({}).sort({price: -1})
        res.status(200).json(desPriceArtworks)
    } catch (err){
        res.status(500).json(err)
    }
})

// getting artwork by id
// routing: done! 
router.get("/:id", async (req, res) => {
    try{
        const artwork = await Artwork.find({_id: req.params.id})
        console.log(artwork)
        res.status(200).json(artwork)
    } catch (err){
        res.status(500).json(err)
    }
})

// get artworks by artist_id
// routing: done! 
router.get("/artist/:id", async (req, res) => {
    try{
        const artworksByArtist = await Artwork.find({artist_id: req.params.id})
        res.status(200).json(artworksByArtist)
    } catch (err){
        res.status(500).json(err)
    }
})

// get artworks by category_id
// routing: done! 
router.get("/category/:id", async (req, res) => {
    try{
        const artworksByCategory = await Artwork.find({categories_id: req.params.id})
        res.status(200).json(artworksByCategory)
    } catch (err){
        res.status(500).json(err)
    }
})

// get artworks in price range
// routing: done! 
router.get("/priceRange/:lower/:higher", async (req, res) => {
    try{
        const artworksInPriceRange = await Artwork.find({price: {$lte: req.params.higher, $gte: req.params.lower}})
        res.status(200).json(artworksInPriceRange)
        if (req.params.lower > req.params.higher){
            return res.status(400).json("Minimum Price is larger than Maximum Price! Correct it!")
        }
    } catch (err){
        res.status(500).json(err)
    }
})

// get artworks by status
// routing: done! 
router.get("/activeStatus/:status", async (req, res) => {
    try{
        const artworksByStatus = await Artwork.find({status: req.params.status})
        res.status(200).json(artworksByStatus)
    } catch (err){
        res.status(500).json(err)
    }
})

module.exports = router