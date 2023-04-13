const mongoose = require('mongoose')
const Schema = mongoose.Schema

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

const User = mongoose.model('User', userSchema)

module.exports = {
    User,
}