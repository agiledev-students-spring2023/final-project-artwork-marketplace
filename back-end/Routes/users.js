const router = require("express").Router()
const bcrypt = require("bcrypt")
const multer = require("multer") 
const path = require("path")
const jwt = require("jsonwebtoken")
const { auth } = require('../middleware/auth')

const { User } = require('../models/User')
const { Artwork } = require('../models/Artwork')

// multer settings
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "Public/Images/DisplayPictures")
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
const uploadd = multer({ storage, fileFilter })

// Register
router.post("/register", async (req, res) => {
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const newUser = {
            user: req.body.user,
            name: {
                first: req.body.name.first,
                last: req.body.name.last,
                full: req.body.name.first + " " + req.body.name.last
            },
            email: req.body.email,
            password: hashedPassword,
            profilePicture_Path: "/static/Images/DisplayPictures/DefaultProfilePicture.jpg",
            products_uploaded: [],
            purchased: [],
            cart: [],
            saved: [], 
            following: [],
            followers: []
        }

        const saveUser = new User(newUser)
        const user = await saveUser.save()

        res.status(200).json({ 
            success: true,
            message: "User saved successfully",
            id: user._id
        })
    } catch (err){
        res.status(500).json({
            success: false,
            message: "Error saving user to database.",
            error: err,
        })
    }
})

// Login 
router.post("/login", async (req, res) => {
    try{
        const user = await User.findOne({email: req.body.email})
        if (!user){
            return res.status(400).json({success: false, message: `${req.body.email} is not registered with us yet!`})
        }
        const validatePassword = await bcrypt.compare(req.body.password, user.password)
        if (!validatePassword){
            return res.status(400).json({success: false, message: "Wrong Username and/or Password!"})
        }
        else{
            const payload = {
                id: user._id,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1d"})
            const foundUser = {
                success: true,
                message: "User logged in successfully",
                _id: user._id
            }
            return res.status(200).cookie('access_token', token, {httpOnly:true, path: "/"}).json(foundUser)
        }
    } catch (err){
        res.status(500).json({
            success: false,
            message: "Error looking up user in database.",
            error: err
        })
    }
})

router.get("/logout", async (req, res) => {
    try{
        res.clearCookie("access_token")
        res.status(200).json({ success: true, message: "Logged out successfully"})
    } catch (err){
        res.status(500).json({
            success: false,
            message: "Error logging out.",
            error: err
        })
    }
})

// get user info by user id
router.get("/user/:id", auth, async (req, res) => {
    try{
        const userFind = await User.findOne({_id: req.params.id})
            .populate([
                {path: 'products_uploaded'},
                {path: 'cart'},
                {path: 'saved'},
                {path: 'purchased'},
                // EXCLUDE PASSWORD, CART, SAVED
                {
                    path: 'following',
                    select: '-password -cart -saved'
                },
                {
                    path: 'followers',
                    select: '-password -cart -saved'
                }
            ])
        if (!userFind){
            return res.status(400).json({success: false, message: `User ID: ${req.params.id} is not valid!`})
        }
        // EXCLUDE PASSWORD
        const user = {
            _id: userFind._id,
            user: userFind.user,
            email: userFind.email,
            name: {
                first: userFind.name.first,
                last: userFind.name.last,
                full: userFind.name.full
            },
            profilePicture_Path: userFind.profilePicture_Path,
            products_uploaded: userFind.products_uploaded,
            cart: userFind.cart,
            saved: userFind.saved,
            purchased: userFind.purchased,
            following: userFind.following,
            followers: userFind.followers,
            createdAt: userFind.createdAt
        }
        return res.status(200).json(user)
    } catch (err){
        res.status(500).json(err)
    }
})

// change profile picture
router.post("/user/:id/changeProfilePicture", auth, uploadd.single('user_profilePicture'), async (req, res, next) => {
    // console.log("in backend test:", req.file)
    try {
        if (!req.file){
            return res.status(400).json({success: false, message: "Please upload a profile picture!"})
        }
        else{
            // console.log(req.file.filename)
            const user = await User.findByIdAndUpdate({_id: req.params.id}, {$set: { profilePicture_Path : "/static/Images/DisplayPictures/" + req.file.filename}}, {returnOriginal: false})
            // return new profile pic path
            const newProfilePicPath = user.profilePicture_Path
            return res.status(200).json(newProfilePicPath)
        }
    } catch (err){
        res.status(500).json(err)
    }
})

// get a list of rising artists
router.get("/risingArtists", auth, async(req, res) => {
    try{
        // find user with at least one product uploaded
        const users = await User.find({ $nor: [{products_uploaded: {$exists: false}}, {products_uploaded: {$size: 0}}]}).select('-password -cart -saved')
        // sort these users by number of followers
        const sortedUsers = users.sort((user1, user2) => (user1.followers.length > user2.followers.length) ? 1 : ((user1.followers.length < user2.followers.length) ? -1 : 0))
        // get 4 with the least followers
        const risingArtists = sortedUsers.slice(0, 4)
        res.status(200).json(risingArtists)
    } catch (err){
        res.status(500).json(err)
    }
})

// change user type
router.put("/user/:userID/changeToType/:type", auth, async(req, res) => {
    try{
        // find user by ID and then add to their cart
        const findUserAndUpdateType = await User
            .findByIdAndUpdate({_id: req.params.userID}, {$set: { user: req.params.type }}, {returnOriginal: false})
        const updatedType = findUserAndUpdateType.user
        // return cart
        res.status(200).json(updatedType)
    } catch (err){
        res.status(500).json(err)
    }
})

// add product by id to user cart
router.put("/user/:userID/addToCart/:productID", auth, async(req, res) => {
    try{
        // find user by ID and then add to their cart
        const findUserAndUpdateCart = await User
            .findByIdAndUpdate({_id: req.params.userID}, {$addToSet: { cart: req.params.productID }}, {returnOriginal: false})
            .populate({path: 'cart', model: 'Artwork'})
        const updatedCart = findUserAndUpdateCart.cart
        // return cart
        res.status(200).json(updatedCart)
    } catch (err){
        res.status(500).json(err)
    }
})

// remove product by id from user cart
router.put("/user/:userID/removeFromCart/:productID", auth, async(req, res) => {
    try{
        // find user by ID and then remove from their cart
        const findUserAndUpdateCart = await User
            .findByIdAndUpdate({_id: req.params.userID}, {$pull: { cart: req.params.productID }}, {returnOriginal: false})
            .populate({path: 'cart', model: 'Artwork'})
        const updatedCart = findUserAndUpdateCart.cart
        // return new Cart
        res.status(200).json(updatedCart)
    } catch (err){
        res.status(500).json(err)
    }
})

// add product by id to user saved list
router.put("/user/:userID/addToSaved/:productID", auth, async(req, res) => {
    try{
        // find user by ID and then add to their saved list
        const findUserAndUpdateSaved = await User
            .findByIdAndUpdate({_id: req.params.userID}, {$addToSet: { saved: req.params.productID }}, {returnOriginal: false})
            .populate({path: 'saved', model: 'Artwork'})
        const updatedSavedList = findUserAndUpdateSaved.saved
        // return new Saved List
        res.status(200).json(updatedSavedList)
    } catch (err){
        res.status(500).json(err)
    }
})

// remove product by id from user saved list
router.put("/user/:userID/removeFromSaved/:productID", auth, async(req, res) => {
    try{
        // find user by ID and then remove from their saved list
        const findUserAndUpdateSaved = await User
            .findByIdAndUpdate({_id: req.params.userID}, {$pull: { saved: req.params.productID }}, {returnOriginal: false})
            .populate({path: 'saved', model: 'Artwork'})
        const updatedSavedList = findUserAndUpdateSaved.saved
        // return new Saved List
        res.status(200).json(updatedSavedList)
    } catch (err){
        res.status(500).json(err)
    }
})

// user1 follows user2
router.put("/:user1/follow/:user2", auth, async(req, res) => {
    try{
        const findUser1AndUpdateFollowing = await User
            .findByIdAndUpdate({_id: req.params.user1}, {$addToSet: { following: req.params.user2 }}, {returnOriginal: false})
            .populate({path: 'following', model: 'User', select: '-password -cart -saved'})
        
        const findUser2AndUpdateFollowers = await User
            .findByIdAndUpdate({_id: req.params.user2}, {$addToSet: { followers: req.params.user1 }}, {returnOriginal: false})
        
        const updatedFollowingList = findUser1AndUpdateFollowing.following
        // return new Following List
        res.status(200).json(updatedFollowingList)
    } catch (err){
        res.status(500).json(err)
    }
})

// user1 unfollows user2
router.put("/:user1/unfollow/:user2", auth, async(req, res) => {
    try{
        // find user by ID and then remove from their saved list
        const findUser1AndUpdateFollowing = await User
            .findByIdAndUpdate({_id: req.params.user1}, {$pull: { following: req.params.user2 }}, {returnOriginal: false})
            .populate({path: 'following', model: 'User', select: '-password -cart -saved'})
        
        const findUser2AndUpdateFollowers = await User
            .findByIdAndUpdate({_id: req.params.user2}, {$pull: { followers: req.params.user1 }}, {returnOriginal: false})

        const updatedFollowingList = findUser1AndUpdateFollowing.following
        // return new Saved List
        res.status(200).json(updatedFollowingList)
    } catch (err){
        res.status(500).json(err)
    }
})

// user checkout 
router.put("/checkout/user/:userID", auth, async(req, res) => {
    try{
        // find user by ID 
        const findUser = await User
            .findOne({_id: req.params.userID})
            .populate({path: 'cart', model: 'Artwork'})
        
        // get user cart
        const userCart = findUser.cart
        // update items in user cart as sold, add to user's purchased list, remove from user's cart
        userCart.forEach(async (artwork) => {
            await Artwork.findByIdAndUpdate({_id: artwork._id}, {$set: { status: "Sold" }}, {returnOriginal: false})
            await User.findByIdAndUpdate({_id: req.params.userID}, {$addToSet: { purchased: artwork._id }, $pull: {cart: artwork._id}}, {returnOriginal: false})
        })
        // find updated user by ID 
        const findUpdatedUser = await User
            .findOne({_id: req.params.userID})
            .populate([{path: 'cart', model: 'Artwork'}, {path: 'purchased', model: 'Artwork'}])
        console.log(findUpdatedUser)
        const updatedCartAndPurchased = {
            cart: findUpdatedUser.cart,
            purchased: findUpdatedUser.purchased
        }
        // return new Saved List
        res.status(200).json(updatedCartAndPurchased)
    } catch (err){
        res.status(500).json(err)
    }
})

module.exports = router