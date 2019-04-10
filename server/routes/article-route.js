const router = require('express').Router()
const articleController = require('../controllers/article-controller')
const authentication = require('../middlewares/authentication')

router.get('/', articleController.showAll)
router.post('/',authentication, articleController.add)
router.get('/:id', articleController.showMine)
router.put('/edit/:id', articleController.edit)
router.delete('/delete/:id', articleController.delete)

module.exports = router