const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/blog')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: String,
    password: String
})

const UserModel = mongoose.model('User', UserSchema)

const ArticleSchema = new Schema({
    title: String,
    content: String,
    time: Number,
    tags: Array
})

const ArticleModel = mongoose.model('Article', ArticleSchema)

exports.UserModel = UserModel
exports.ArticleModel = ArticleModel