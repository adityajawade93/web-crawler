const { model, Schema } = require('mongoose')

const urlSchema = new Schema({
    link: String,
    referenceCount: Number,
    queryParameters: [String]
})

module.exports = model('Url', urlSchema)