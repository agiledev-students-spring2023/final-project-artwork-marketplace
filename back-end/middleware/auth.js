const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
    const token = req.cookies.access_token
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized" })
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, userID) => {
        if (err) {
            return res.status(403).json({ success: false, message: "Please Log In Again" })
        }
        req.user = {
            id: userID
        }
        next()
    })
}


module.exports = {auth}