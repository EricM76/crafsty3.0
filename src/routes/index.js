var router = require('express').Router();

const {index,admin,searchAdmin} = require('../controllers/indexController');

/* middlewares */
const adminCheck = require('../middlewares/adminUserCheck')

/* GET home page. */
router.get('/', index);
router.get('/admin',admin);
router.get('/admin/search',searchAdmin)
module.exports = router;
