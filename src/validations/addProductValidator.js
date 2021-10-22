const {check, body} = require('express-validator');

module.exports = [
    check('name')
    .notEmpty().withMessage('El nombre es obligatorio'),

    check('description')
    .notEmpty().withMessage('Debes añadir una descripción'),

    check('price')
    .notEmpty().withMessage('Se precisa el precio'),

    check('categoryId')
    .notEmpty().withMessage('Indica la categoría'),

    body('images')
    .custom((value,{req}) => {
      
        if(req.files[0]){
            return true
        }else{
            return false
        }
    })
    .withMessage('No ha subido ningun archivo!')
]