const router = require("express").Router()
const UsersList = require("../SchemaSamples/AllUsers")
const bcrypt = require("bcrypt")

const { User } = require('../models/User')
const { Category } = require('../models/Category')
const { Artwork } = require('../models/Artwork')

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
            profilePicture_Path: "/static/Images/DefaultProfilePicture.jpg",
            products_uploaded: [],
            cart: [],
            saved: [], 
            following: [],
            followers: []
        }

        const saveUser = new User(newUser)
        const user = await saveUser.save()
        res.status(200).json(user._id)
    } catch (err){
        res.status(500).json(err)
    }
})

// Login 
router.post("/login", async (req, res) => {
    try{
        const user = await User.findOne({email: req.body.email})
            .populate([
                {path: 'products_uploaded'},
                {path: 'cart'},
                {path: 'saved'},
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
        if (!user){
            return res.status(400).json({success: false, message: `${req.body.email} is not registered with us yet!`})
        }
        const validatePassword = await bcrypt.compare(req.body.password, user.password)
        if (!validatePassword){
            return res.status(400).json({success: false, message: "Wrong Username and/or Password!"})
        }
        else{
            const newUser = {
                success: true,
                message: "Successful Login!",
                _id: user._id,
                user: user.user,
                email: user.email,
                name: {
                    first: user.name.first,
                    last: user.name.last,
                    full: user.name.full
                },
                profilePicture_Path: user.profilePicture_Path,
                products_uploaded: user.products_uploaded,
                cart: user.cart,
                saved: user.saved,
                following: user.following,
                followers: user.followers
            }
            return res.status(200).json(newUser)
        }
    } catch (err){
        res.status(500).json(err)
    }
})

// get user info by user id
router.get("/user/:id", async (req, res) => {
    try{
        const userFind = await User.findOne({_id: req.params.id})
            .populate([
                {path: 'products_uploaded'},
                {path: 'cart'},
                {path: 'saved'},
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
            following: userFind.following,
            followers: userFind.followers
        }
        return res.status(200).json(user)
    } catch (err){
        console.log(err)
        res.status(500).json(err)
    }
})

// get a list of rising artists
router.get("/risingArtists", async(req, res) => {
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

// add product by id to user cart
router.put("/user/:userID/cart/:productID", async(req, res) => {
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
router.delete("/user/:userID/cart/:productID", async(req, res) => {
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
router.put("/user/:userID/saved/:productID", async(req, res) => {
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
router.delete("/user/:userID/saved/:productID", async(req, res) => {
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
router.put("/:user1/follow/:user2", async(req, res) => {
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
router.delete("/:user1/unfollow/:user2", async(req, res) => {
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


module.exports = router