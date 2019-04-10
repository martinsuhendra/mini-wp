const mongoose = require('mongoose')
const Schema = mongoose.Schema

articleSchema = new Schema({
    title : {
        type : String,
        required : [true, 'please input title']
    },
    content : {
        type : String,
        required : [true, 'please input content']
    },
    createdAt : {
        type : Date
    },
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    }
})

const Article = mongoose.model('Articles', articleSchema)

module.exports = Article