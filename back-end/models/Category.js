const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema(
    {
        _id: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        products_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Artwork'
        }
    },
    {
        timestamps: true
    }
)

const Category = mongoose.model('Category', categorySchema)

module.exports = {
    Category,
}