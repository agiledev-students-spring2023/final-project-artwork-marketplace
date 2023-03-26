const router = require("express").Router()
const ProductsList = require("../SchemaSamples/AllProducts") 

// creating && saving a new artwork
router.post("/", async (req, res) => {
    try{
        const newArtwork = {
            _id: req.body._id,
            // for now, just id but later, we'll populate with an ARTIST schema
            artist_id: req.body.artist_id,
            name: req.body.name,
            shortDescription: req.body.shortDescription,
            price: req.body.price,
            status: req.body.status,
            thumbnailURL: req.body.thumbnailURL,
            // for now, just id but later, we'll populate with an CATEGORIES schema
            categories_id: req.body.categories_id,
            imagesURL: req.body.imagesURL
        }
        res.status(200).json(newArtwork)
    } catch (err){
        res.status(500).json(err)
    }
})

// getting a list of all artworks
router.get("/", async (req, res) => {
    try{
        const artworks = ProductsList
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
        const artwork = ProductsList.find(product => product._id == req.params.id)
        res.status(200).json(artwork)
    } catch (err){
        res.status(500).json(err)
    }
})

module.exports = router