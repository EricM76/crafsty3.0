const db = require('../../database/models');
const getURL = req => `${req.protocol}://${req.get('host')}${req.originalUrl}`;

const productVerify = (carrito,id) => {
    let index = -1;
    for (let i = 0; i < carrito.length; i++) {
        
        if(carrito[i].id == id){ 
            index = i;
            break
        }
    }
    return index
}

module.exports = {
    show: async (req, res) => {

        let response = {
            meta: {
                link: getURL(req)
            },
            data: req.session.cart
        }
        return res.status(200).json(response)

    },
    add: async (req, res) => {

        try {
            
            let product = await db.Product.findByPk(req.params.id,{
                include : ['category','images']
            });
            let item = {
                id: product.id,
                nombre: product.name,
                image: product.images[0].file,
                precio: product.price,
                categoria: product.category.name,
                cantidad: 1,
                total: product.price,
            }
            if (req.session.cart.length == 0) {
              
                let order = await db.Order.findOne({
                    where : { 
                        userId : req.session.userLogin.id,
                        status : 'pending'
                    }
                })
                if(!order){
                    order = await db.Order.create({
                        userId: req.session.userLogin.id,
                        status: "pending"
                    })
                }
            
                item = {
                    ...item,
                    orderId: order.id
                }
                req.session.cart.push(item)

                /* guarda los productos en la tabla carrito */
                await db.Cart.create({
                    orderId : order.id,
                    productId : item.id,
                    userId : req.session.userLogin.id,
                    quantity : 1
                })

            } else {

                let index = productVerify(req.session.cart,req.params.id)
                let order = await db.Order.findOne({
                    where : {
                        userId : req.session.userLogin.id,
                        status : 'pending'
                    }
                })

                if(index === -1){
                    item = {
                        ...item,
                        orderId: order.id
                    }
                    req.session.cart.push(item)

                     /* guarda los productos en la tabla carrito */
                    await db.Cart.create({
                        orderId : order.id,
                        productId : item.id,
                        userId : order.userId,
                        quantity : 1
                    })

                }else{
                    let product = req.session.cart[index]
                    product.cantidad++
                    product.total = product.cantidad * product.precio
                    req.session.cart[index] = product

                    /* actualiza la cantidad del producto en la tabla carrito */

                    await db.Cart.update(
                        {
                            quantity : product.cantidad
                        },
                        {
                            where : {
                                orderId : product.orderId,
                                productId : product.id
                            }
                        }
                    )
                }
            }

            let response = {
                meta: {
                    link: getURL(req)
                },
                data: req.session.cart
            }
            return res.status(200).json(response)

        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }

    },
    remove : async (req,res) => {

        try {
            let index = productVerify(req.session.cart,req.params.id)
            let product = req.session.cart[index]

            if(product.cantidad > 1){
                product.cantidad--
                product.total = product.cantidad * product.precio
                req.session.cart[index] = product   

                /* disminuye la cantidad del producto seleccinado */
                await db.Cart.update(
                    {
                        quantity : product.cantidad
                    },
                    {
                        where : {
                            orderId : product.orderId,
                            productId : product.id
                        }
                    }
                )

            }else{
                req.session.cart.splice(index,1);

                /* elimina el producto de la tabla carrito */
                await db.Cart.destroy({
                    where : {
                        productId : product.id,
                        orderId : product.orderId
                    }
                })
            }

            let response = {
                meta: {
                    link: getURL(req)
                },
                data: req.session.cart
            }
            return res.status(200).json(response)

        } catch (error) {
            console.log(error)
            return res.status(500).json(error)

        }
    },
    empty : async (req,res) => {

        try {
            await db.Order.destroy({
                where : { 
                    userId : req.session.userLogin.id,
                    status : 'pending'
                }
            })

            req.session.cart = [];
            let response = {
                meta: {
                    link: getURL(req)
                },
                data: req.session.cart
            }
            return res.status(200).json(response)
        } catch (error) {
            console.error(error)
            return res.status(500).json(error)

        }
      

    }
}