const Article = require('../models/article-model')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const decoded = jwt.verify(req.headers.token, process.env.JWT)
    console.log(decoded);
    
    Article
        .findOne({
            _id : req.params.articleId
        })
        .populate('userId')
        .then((article)=> {
            if (article.userId.username == decoded.username) {
                next()
            } else {
                res.status(401).json({
                    type : 'AUTHORIZATION ERROR',
                    message: 'You do not have access to this page!'
                })
            }
        })
}