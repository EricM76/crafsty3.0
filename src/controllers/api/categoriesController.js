const db = require("../../database/models")

module.exports = {
    list : (req,res) => {
        db.Category.findAll({
            include : ['products'],
        }).then(categories => {
            let response = {
                meta : {
                    status : 200,
                    total : categories.length
                },
                data : categories
            }
            return res.status(200).json(response)
        }).catch(error => res.status(error.status || 500).json({
            status : error.status || 500,
            errors : error
        }))
    },
   
}