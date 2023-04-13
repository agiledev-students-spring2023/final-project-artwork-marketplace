const mongoose = require('mongoose')
const Schema = mongoose.Schema

const artworkSchema = new Schema(
    {
        _id: {
            type: Number,
            required: true
        },
        /* connect with user */
        artist_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        name: {
            type: String,
            required: true
        },
        shortDescription: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        thumbnailURL: {
            type: String,
            required: true
        },
        /* connect with category */
        categories_id: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true
        }],
        imagesURL: [{
            type: String,
            required: true
        }]
    },
    {
        timestamps: true
    }
)

const Artwork = mongoose.model('Artwork', artworkSchema)

module.exports = {
    Artwork,
}