const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true,
            min: 1
        },
        products_id: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Artwork',
            required: false
        }]
    },
    {
        timestamps: true
    }
)

const Category = mongoose.model('Category', categorySchema)

module.exports = {
    Category,
}