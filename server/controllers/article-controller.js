const Article = require('../models/article-model')

class ArticleController {
    static showAll(req,res) {
        // console.log('masuk');
        Article.find()
            .populate('userId')
            .then((data)=> {
                res.status(200).json(data)
            })
            .catch((err)=> {
                res.status(500).json(err.message)
            })
    }

    static add(req, res) {

        let gcsUrl = ''
        if (!req.file) {
            gcsUrl = 'https://upload.wikimedia.org/wikipedia/en/d/d1/Image_not_available.png'
        } else {
            gcsUrl = req.file.gcsUrl
        }

        Article.create({
            title : req.body.title,
            content : req.body.content,
            createdAt : new Date,
            userId : req.authenticatedUser.id,
            image : gcsUrl
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
        .populate('userId')
        .then((articles)=> {
            res.status(200).json(articles)
        })
        .catch((err)=> {
            res.status(500).json(err.message)
        })
    }

    static edit(req, res) {
        
        console.log(req.body,'ini req body');
        console.log(req.file,'ini req file');
        let gcsUrl = ''

        if (req.file) {
            gcsUrl = req.file.gcsUrl
        } else {
            gcsUrl = req.body.image
        }

        Article
            .findOneAndUpdate({ _id : req.params.articleId}, {
                title : req.body.title,
                content : req.body.content,
                createdAt : new Date,
                userId : req.authenticatedUser.id,
                image : gcsUrl
            })
            .then(()=> {
                res.status(200).json({msg: `data successfully updated`})
            })
            .catch((err)=> {
                res.status(500).json(err.message)
            })
    }

    static delete(req, res) {
            
        Article.deleteOne({ _id: req.params.articleId})
        .then((data)=> {
                res.status(200).json({data, msg: `data has been deleted`})
            })
            .catch((err)=> {
                res.status(500).json(err.message)
            })
    }

    static showOne(req, res) {
        Article
            .findOne({
                _id : req.params.articleId,
            })
            .populate('userId')
            .then((data)=> {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

  
}

module.exports = ArticleController