var express = require('express');
var router = express.Router();

const { list,detail, create, deleteImage, addImage, search } = require('../../controllers/api/productsController');

const upload = require('../../middlewares/upImagesProduct')

/* endpoints: /api/products */
router 
    .get('/',list)
    .get('/search',search)
    .get('/:id',detail)
    .post('/',create)
    .get('/delete-image/:id',deleteImage)
    .post('/add-images/:id',upload.any(), addImage)

module.exports = router;
