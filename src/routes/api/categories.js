var express = require('express');
var router = express.Router();

const { list } = require('../../controllers/api/categoriesController');


/* endpoints: /api/products */
router 
    .get('/',list)

module.exports = router;
