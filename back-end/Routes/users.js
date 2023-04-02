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
        return res.status(200).json(user)
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

module.exports = router