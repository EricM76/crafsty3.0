const tutoriales = require('../data/tutorials_db');
const banner = require('../data/banner.json');
const db = require('../database/models');
const {Op, Sequelize} = require('sequelize');

module.exports = {
    index : (req,res) => {
        let productos = db.Product.findAll();
        let nuevos = db.Category.findOne({
            where : {
                name : 'nuevo'
            },
            include : [
                {
                    association : 'products',
                    order : Sequelize.literal('rand()'),
                    include : [
                        {association : 'images'}
                    ],
                    limit : 9
                }
            ],
            
        });
        let refact = db.Category.findOne({
            where : {
                name : 'refaccionado'
            },
            include : [
                {
                    association : 'products',
                    order : Sequelize.literal('rand()'),
                    include : [
                        {association : 'images'}
                    ]
                }
            ]
        });
        let usados = db.Category.findOne({
            where : {
                name : 'usado'
            },
            include : [
                {
                    association : 'products',
                    order : Sequelize.literal('rand()'),
                    include : [
                        {association : 'images'}
                    ]
                }
            ]
        })
        Promise.all([productos,nuevos,usados,refact])
        .then(([productos,nuevos,usados,refact]) => {
            return res.render('index',{
                title : "Craftsy 3.0",
                productos,
                nuevos : nuevos.products,
                refact : refact.products,
                usados : usados.products,
                banner,
                tutoriales
            })
        }).catch(error => console.log(error))
      
    },
    admin : (req,res) => {
        db.Product.findAll({
            include : [
                {association : 'category'}
            ]
        }).then(productos => res.render('admin/index',{
            productos
        }))
    },
    searchAdmin : (req,res) => {
        db.Product.findAll({
            include : ['category'],
            where : {
                name : {[Op.substring] : req.query.search}
            }
        }).then(productos => res.render('admin/index',{
            productos
        }))
    }
}