const Article = require('../models/article-model')

class ArticleController {
    static showAll(req,res) {
        // console.log('masuk');
        Article.find()
            .then((data)=> {
                res.status(200).json(data)
            })
            .catch((err)=> {
                res.status(500).json(err.message)
            })
    }

    static add(req, res) {
        console.log(req.body, 'ini body');
        
        Article.create({
            title : req.body.title,
            content : req.body.content,
            createdAt : new Date,
            userId : req.body.id
        })
        .then((data)=> {
            res.status(201).json({msg : 'article created', data})
        })
        .catch((err)=> {
            res.status(500).json(err.message)
        })
    }

    static showMine(req,res) {
        
        Article.find({
            userId : req.params.id
        })
        .then((articles)=> {
            res.status(200).json(articles)
        })
        .catch((err)=> {
            res.status(500).json(err.message)
        })
    }

    static edit(req, res) {
        // console.log(req.params,'ini params ya?')
        Article
            .findByIdAndUpdate(req.params.id)
            .then()
            .catch()
    }

    static delete(req, res) {
        Article.deleteOne({ _id: req.params.id})
        .then((data)=> {
                console.log(data)
                res.status(200).json({data, msg: `data has been deleted`})
            })
            .catch((err)=> {
                res.status(500).json(err.message)
            })
    }
}

module.exports = ArticleController