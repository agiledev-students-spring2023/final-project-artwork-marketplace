const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const jwtStrategy = require("../config/jwt-config.js")

const userSchema = new Schema(
    {
        // user Type (customer or artist)
        user: {
            type: String,
            require: true,
            min: 6,
            max: 8,
            trim: true,
            lowercase: true
        },
        /* first, last, full */
        name: {
            first: {
                type: String,
                required: true,
                trim: true,
                lowercase: true,
                min: 1
            },
            last: {
                type: String,
                required: true,
                trim: true,
                lowercase: true,
                min: 1
            },
            full: {
                type: String,
                required: true,
                trim: true,
                lowercase: true,
                min: 3 
            }
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            min: 8
        },
        profilePicture_Path: {
            type: String,
            required: true
        },
        products_uploaded: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Artwork'
        }],
        cart: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Artwork'
        }],
        saved: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Artwork'
        }],
        following: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        followers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    {
        timestamps: true
    }
)

// return a JWT token for the user
userSchema.methods.generateJWT = function () {
    const today = new Date()
    const exp = new Date(today)
    exp.setDate(today.getDate() + process.env.JWT_EXP_DAYS) // assuming an environment variable with num days in it
  
    return jwt.sign(
      {
        id: this._id,
        username: this.email,
        exp: parseInt(exp.getTime() / 1000),
      },
      process.env.JWT_SECRET
    )
}
  
// return the user information without sensitive data
userSchema.methods.toAuthJSON = function () {
    return {
      username: this.email,
      token: this.generateJWT(),
    }
}

const User = mongoose.model('User', userSchema)

module.exports = {
    User,
}