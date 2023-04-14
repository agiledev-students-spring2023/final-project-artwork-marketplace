const mongoose = require('mongoose')
const Schema = mongoose.Schema

const artworkSchema = new Schema(
    {
        /* connect with user */
        artist_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        name: {
            type: String,
            required: true,
            trim: true,
            min: 1
        },
        shortDescription: {
            type: String,
            required: true,
            trim: true,
            min: 1
        },
        price: {
            type: Number,
            required: true,
            min: 1
        },
        status: {
            type: String,
            required: true,
            trim: true,
            min: 4,
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