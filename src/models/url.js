const { model, Schema } = require('mongoose')

const urlSchema = new Schema({
    link: { type: String, unique: true, required: true },
    referenceCount: Number,
    queryParameters: [String]
})

module.exports = model('Url', urlSchema)