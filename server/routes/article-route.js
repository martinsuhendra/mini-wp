const router = require('express').Router()
const articleController = require('../controllers/article-controller')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const Multer = require('multer')

const gcsMiddlewares = require('../middlewares/googleCloudStorage')

const multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
      fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
    },
  });

router.get('/', articleController.showAll)
router.post('/',multer.single('image'),authentication, gcsMiddlewares.sendUploadToGCS,articleController.add)
router.get('/:userId/:articleId', articleController.showOne)
router.get('/:id', articleController.showMine)
router.put('/:articleId', multer.single('image'), authentication, gcsMiddlewares.sendUploadToGCS, authorization, articleController.edit)
router.delete('/:articleId', authorization, articleController.delete)

module.exports = router

