const router = require('express').Router()
const articleController = require('../controllers/article-controller')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.get('/', articleController.showAll)
router.post('/',authentication, articleController.add)
router.get('/:userId/:articleId', articleController.showOne)
router.get('/:id', articleController.showMine)
router.put('/:articleId', authorization, articleController.edit)
router.delete('/:id', authorization, articleController.delete)

module.exports = router

