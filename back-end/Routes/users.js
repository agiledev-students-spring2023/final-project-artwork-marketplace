const router = require("express").Router()
const UsersList = require("../SchemaSamples/AllUsers")
const bcrypt = require("bcrypt")

// Register
router.post("/register", async (req, res) => {
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const newUser = {
            _id: req.body._id,
            user: req.body.user,
            name: {
                first: req.body.name.first,
                last: req.body.name.last,
                full: req.body.name.first + " " + req.body.name.last
            },
            email: req.body.email,
            password: hashedPassword,
            products_uploaded: req.body.products_uploaded,
            cart: req.body.cart,
            saved: req.body.saved, 
            following: req.body.following,
            followers: req.body.followers
        }
        // Will need to be saved for next sprint but for now just send the user as a json
        res.status(200).json(newUser)
    } catch (err){
        res.status(500).json(err)
    }
})

// Login 
router.post("/login", async (req, res) => {
    try{
        const user = UsersList.find(user => user.email === req.body.email)
        if (!user){
            return res.status(400).json("You Have Not Registered with us yet!")
        }
        const validatePassword = await bcrypt.compare(req.body.password, user.password)
        if (!validatePassword){
            return res.status(400).json("Wrong Username and/or Password!")
        }
        const newUser = {
            _id: user._id,
            email: user.email,
            name: {
                first: user.name.first,
                last: user.name.last,
                full: user.name.full
            },
            products_uploaded: user.products_uploaded,
            cart: user.cart,
            saved: user.saved,
            following: user.following,
            followers: user.followers
        }
        return res.status(200).json(newUser)
    } catch (err){
        res.status(500).json(err)
    }
})

// get user info by user id
router.get("/:id", async (req, res) => {
    try{
        const userFind = UsersList.find(user => user._id == req.params.id)
        // EXCLUDE PASSWORD
        const user = {
            _id: userFind._id,
            email: userFind.email,
            name: {
                first: userFind.name.first,
                last: userFind.name.last,
                full: userFind.name.full
            },
            products_uploaded: userFind.products_uploaded,
            cart: userFind.cart,
            saved: userFind.saved,
            following: userFind.following,
            followers: userFind.followers
        }
        res.status(200).json(user)
    } catch (err){
        console.log(err)
        res.status(500).json(err)
    }
})

// get a list of rising artists
router.get("/risingArtists", async(req, res) => {
    try{
        
    } catch (err){

    }
})

// get cart by userID
router.get("/:userID/cart", async(req, res) => {
    try{

    } catch (err){

    }
})

// add product by id to user cart
router.put("/:userID/cart/:productID", async(req, res) => {
    try{

    } catch (err){

    }
})

// remove product by id from user cart
router.delete("/:userID/cart/:productID", async(req, res) => {
    try{

    } catch (err){

    }
})

// get saved list by userID
router.get("/:userID/saved", async(req, res) => {
    try{

    } catch (err){

    }
})

// add product by id to user saved list
router.put("/:userID/saved/:productID", async(req, res) => {
    try{

    } catch (err){

    }
})

// remove product by id from user saved list
router.delete("/:userID/saved/:productID", async(req, res) => {
    try{

    } catch (err){

    }
})

// get followers list of userID
router.get("/:userID/followers", async(req, res) => {
    try{

    } catch (err){

    }
})

// get following list of userID
router.get("/:userID/following", async(req, res) => {
    try{

    } catch (err){

    }
})

// user1 follows user2
router.put("/:user1/follow/:user2", async(req, res) => {
    try{

    } catch (err){

    }
})

// user1 unfollows user2
router.delete("/:user1/unfollow/:user2", async(req, res) => {
    try{

    } catch (err){

    }
})
module.exports = router