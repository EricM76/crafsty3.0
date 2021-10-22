const express = require('express');
const router = express.Router();
const {add,detail, search,save,edit,update,remove, removed} = require('../controllers/productsController');


/* validaciones */
const addProductValidator = require('../validations/addProductValidator');


/* middlewares */
const adminUserCheck = require('../middlewares/adminUserCheck');

/* subida de archivos */
const upload = require('../middlewares/upImagesProduct')

/* /products */
router.get('/add', add);
router.post('/add', upload.array('images'), addProductValidator,save);
router.get('/detail/:id',detail);
router.get('/search',search);
router.get('/edit/:id', edit);
router.put('/edit/:id',update);
router.delete('/delete/:id',remove);
router.get('/removed',removed)

module.exports = router;