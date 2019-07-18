var express = require('express')
var router = express.Router()
const filter = {
    password: 0,
    __v: 0
}

const {UserModel, ArticleModel} = require('../models/users')
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'})
})
// 注册路由
router.post('/register', (req, res) => {
    const {username, password} = req.body
    UserModel.findOne({username: username}, (err, user) => {
        if (user) {
            return res.send({code: 1, msg: '用户已存在！'})
        }
        new UserModel({username, password}).save((err, user) => {
            res.send({code: 0, data: {username, _id: user._id}})
        })
    })
})
// 登录路由
router.post('/login', (req, res) => {
    const {username, password} = req.body
    UserModel.findOne({username, password}, filter, (err, user) => {
        if (user) {
            return res.send({code: 0, data: user})
        }
        res.send({code: 1, msg: '账号/密码错误！'})
    })
})

router.get('/articles', (req, res) => {
    ArticleModel.find((err, articles) => {
        if (!err) {
            return res.send({code: 0, data: articles})
        }
        res.send({code: 1, msg: '网络出错啦~'})
    })
})

router.get('/getarticle/:id', (req, res) => {
    const id = req.params.id
    if (id) {
        ArticleModel.findOne({_id: id} ,(err, article) => {
            if (!err) {
                return res.send({code: 0, data: article})
            }
            res.send({code: 1, msg: '网络出错啦~'})
        })
    }
})

module.exports = router
