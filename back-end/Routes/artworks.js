const router = require("express").Router()
const multer = require("multer") 
const path = require("path")
const { auth } = require('../middleware/auth')

const { User } = require('../models/User')
const { Category } = require('../models/Category')
const { Artwork } = require('../models/Artwork')

// multer settings
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "Public/ProductImages")
    },
    filename: function (req, file, cb) {
      // take apart the uploaded file's name so we can create a new one based on it
      const extension = path.extname(file.originalname)
      const basenameWithoutExtension = path.basename(file.originalname, extension)
      // create a new filename with a timestamp in the middle
      const newName = `${basenameWithoutExtension}-${Date.now()}${extension}`
      // tell multer to use this new filename for the uploaded file
      cb(null, newName)
    },
})
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']
    if(allowedTypes.includes(file.mimetype)){
        cb(null, true)
    }
    else{
        cb(null, false)
    }
}
const upload = multer({ storage, fileFilter })

// public featuredArtwork route
router.get("/featuredArtwork", async (req, res) => {
    try{
        // get most recent uploaded artwork and populate with artist name
        const featuredArtworkInArray = await Artwork.find({}).sort({ _id: -1}).limit(1).populate({path: 'artist_id', select: 'name'})
        const featuredArtwork = featuredArtworkInArray[0]
        return res.status(200).json(featuredArtwork)
    } catch (err){
        res.status(500).json(err)
    }
})

// creating && saving a new artwork
router.post("/AddArt", auth, upload.array("user_uploads", 3), async (req, res, next) => {
    try{
        if (!req.files || req.files.length == 0) {
            return res.status(400).json({success: false, message: "Please upload some photos!"})
        } 
        else if (req.files.length > 3) {
            return res.status(400).json({success: false, message: "rejected your files... try harder" })
        }
        else{
            const thumbnailPath = "/static/ProductImages/" + req.files[0].filename
            const imagePaths = []
            await req.files.forEach(file => imagePaths.push("/static/ProductImages/" + file.filename))
            const newArtwork = {
                artist_id: req.body.artist_id,
                name: req.body.name,
                shortDescription: req.body.shortDescription,
                price: req.body.price,
                status: "Available",
                thumbnailURL: thumbnailPath,
                categories_id: req.body.categories_id,
                imagesURL: imagePaths
            }
            const saveArtwork = new Artwork(newArtwork)
            const artwork = await saveArtwork.save({returnOriginal: false})

            /* update each category */
            const categories = await Category.updateMany({_id: req.body.categories_id}, {$addToSet: { products_id: artwork._id }}, {returnOriginal: false})
            // update artist products_uploaded list
            const userUpdate = await User.findByIdAndUpdate({_id: req.body.artist_id}, {$addToSet: { products_uploaded: artwork._id }}, {returnOriginal: false})
                
            const updatedUser = await User.findOne({_id: req.body.artist_id}).populate({path: 'products_uploaded'})
            const updatedProductsList = updatedUser.products_uploaded
            return res.status(200).json(updatedProductsList)
        }
    } catch (err){
        res.status(500).json(err)
    }
})

// getting a list of all artworks
// routing: done! 
router.get("/", auth, async (req, res) => {
    try{
        const artworks = await Artwork.find({})
        res.status(200).json(artworks)
    } catch (err){
        res.status(500).json(err)
    }
})

// getting a list of all artworks sorted by price ASC (ascending/ low->high)
// routing: done! 
router.get("/sortedASC", auth, async (req, res) => {
    try{
        const ascPriceArtworks = await Artwork.find({}).sort({price: 1})
        res.status(200).json(ascPriceArtworks)
    } catch (err){
        res.status(500).json(err)
    }
})

// getting a list of all artworks sorted by price DES (descending/ high->low)
// routing: done! 
router.get("/sortedDES", auth, async (req, res) => {
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
        res.status(200).json(artwork)
    } catch (err){
        res.status(500).json(err)
    }
})

// get artworks by artist_id
// routing: done! 
router.get("/artist/:id", auth, async (req, res) => {
    try{
        const artworksByArtist = await Artwork.find({artist_id: req.params.id})
        res.status(200).json(artworksByArtist)
    } catch (err){
        res.status(500).json(err)
    }
})

// get artworks by category_id
// routing: done! 
router.get("/category/:id", auth, async (req, res) => {
    try{
        const artworksByCategory = await Artwork.find({categories_id: req.params.id})
        res.status(200).json(artworksByCategory)
    } catch (err){
        res.status(500).json(err)
    }
})

// get artworks in price range
// routing: done! 
router.get("/priceRange/:lower/:higher", auth, async (req, res) => {
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
router.get("/activeStatus/:status", auth, async (req, res) => {
    try{
        const artworksByStatus = await Artwork.find({status: req.params.status})
        res.status(200).json(artworksByStatus)
    } catch (err){
        res.status(500).json(err)
    }
})

// update status of an artwork
router.put("/artwork/:id/changeStatus/:newStatus", auth, async (req, res) => {
    try{
        const newStatusString = req.params.newStatus.trim().toLowerCase()
        const artworkWithUpdatedStatus = await Artwork.findByIdAndUpdate({_id: req.params.id}, {$set: { "status": newStatusString}}, {returnOriginal: false})
        res.status(200).json(artworkWithUpdatedStatus.status)
    } catch (err){
        res.status(500).json(err)
    }
})

module.exports = router