const db = require('../models');
const hlper = require('../helper/helper');

db.product.belongsTo(db.category, { foreignKey: "category_id", as: "cat" });

module.exports = {
    addProducts: async (req, res) => {
        try {
            const { name, prize, color, model, date, status, category_id } = req.body;
            let image = "";
            if (req.files && req.files.image) {
                image = await hlper.fileUpload(req.files.image)
            }
            const data = await db.product.create({
                name: name,
                prize: prize,
                status: status,
                image: image,
                color: color,
                model: model,
                date: date,
                category_id: category_id
            });
            return res.json(data);

        } catch (error) {
            console.log(error, 'error in adding products')
        }
    },

    productlist: async (req, res) => {
        try {
            const data = await db.product.findAll({
                include: [
                    { model: db.category, as: "cat" }
                ],
                order: [['id', "DESC"]]
            });
            return res.json(data)
        } catch (error) {
            console.log(error, '//////////////////')
        }
    },

    updateProduct: async (req, res) => {
        try {
            const { name, prize, color, model, date, category_id } = req.body;
            const { id } = req.params;
            const user = await db.product.findOne({
                where: { id: id }
            })

            if (!user) {
                return res.json({
                    message: 'Product not Found'
                })
            }
            let image = user.image;
            if (req.files && req.files.image) {
                image = await hlper.fileUpload(req.files.image)
            }
            const data = await db.product.update({
                name: name,
                prize: prize,
                image: image,
                color: color,
                model: model,
                date: date,
                category_id: category_id

            }, {

                where: { id: user.id }
            })

            return res.json({
                message: 'Product Updated Successfully'
            })

        } catch (error) {
            console.log(error, 'error in update category');
        }

    },

    deleteProduct: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await db.product.findOne({
                where: { id: id }
            })

            const data = await db.product.destroy({
                where: { id: user.id }
            })

            return res.json({
                message: 'product deleted Successfully'
            })

        } catch (error) {
            console.log("error in deleting the porduct")
        }
    },

    countProduct: async (req, res) => {
        try {
            const total = await db.product.count();
            return res.status(200).json({ total });

        } catch (error) {
            console.error("Error in countProduct:", error);
            return res.status(500).json({ message: "Error counting products" });
        }
    },

    updateProductStatus: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await db.product.findOne({
                where: { id: id },
            });

            if (!user) {
                return res.status(404).json({ message: "Category not found" });
            }

            const newStatus = user.status == '0' ? '1' : '0';

            await db.product.update({ status: newStatus }, { where: { id: id } });

            return res.json({
                message: 'Status updated successfully',
                status: newStatus,
            });

        } catch (error) {
            console.log(error, "error in updating status");
        }
    },

    getProduct: async (req, res) => {
        try {
            const { id } = req.params;

            const product = await db.product.findOne({
                where: { id: id },
                include: [
                    { model: db.category, as: "cat" }
                ]
            });

            if (!product) {
                return res.status(404).json({
                    message: 'Product not found'
                });
            }

            return res.status(200).json(product);

        } catch (error) {
            console.log(error, "error in getiing product");
        }
    }
}