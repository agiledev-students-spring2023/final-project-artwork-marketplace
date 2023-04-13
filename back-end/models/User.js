const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
    {
        _id: {
            type: Number,
            required: true,
        },
        user: {
            type: String,
            require: true,
        },
        /* first, last, full */
        name: [{
            type: String,
            required: true
        }],
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        products_uploaded: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Artwork',
        }],
        cart: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Artwork',
        }],
        saved: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Artwork',
        }],
        following: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
        followers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }]
    },
    {
        timestamps: true,
    }
)

const User = mongoose.model('User', userSchema)

module.exports = {
    User,
}