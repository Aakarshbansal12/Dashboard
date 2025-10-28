const db = require('../models');
const hlper = require('../helper/helper');
const { where } = require('sequelize');


module.exports = {
    addCategory: async (req, res) => {
        try {
            const { name, company_name, status } = req.body;
            let image = "";
            if (req.files && req.files.image) {
                image = await hlper.fileUpload(req.files.image)
            }
            const data = await db.category.create({
                name: name,
                company_name: company_name,
                status: status,
                image: image
            });
            return res.json(data);

        } catch (error) {
            console.log(error, 'error in add Category');
        }
    },

    updateCategory: async (req, res) => {
        try {
            const { name, company_name } = req.body;
            const { id } = req.params;
            const user = await db.category.findOne({
                where: { id: id }
            })
            if (!user) {
                return res.json({
                    message: 'User not Found'
                })
            }
            let image = user.image;
            if (req.files && req.files.image) {
                image = await hlper.fileUpload(req.files.image)
            }
            const data = await db.category.update({
                name: name,
                company_name: company_name,
                image: image

            }, {

                where: { id: user.id }
            })

            return res.json({
                message: 'user Updated Successfully'
            })

        } catch (error) {
            console.log(error, "error in update Categories")
        }
    },

    categoryStatus: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await db.category.findOne({
                where: { id: id },
            });

            if (!user) {
                return res.status(404).json({ message: "Category not found" });
            }

            const newStatus = user.status == '0' ? '1' : '0';

            await db.category.update({ status: newStatus }, { where: { id: id } });

            return res.json({
                message: 'Status updated successfully',
                status: newStatus,
            });
        } catch (error) {
            console.log(error, 'error in status update');
            return res.status(500).json({ message: 'Internal server error' });
        }
    },


    deleteCategory: async (req, res) => {
        try {
            const { id } = req.params;

            const category = await db.category.findOne({
                where: { id: id }
            });
            if (!category) {
                return res.status(404).json({ success: false, message: "Category not found" });
            }

            const product = await db.product.findAll({
                where: { category_id: id }
            });

            const productIds = product.map((product) => product.id);

            if (productIds.length > 0) {
                const bookings = await db.bookings.destroy({
                    where: { product_id: productIds }
                });

                await db.product.destroy({
                    where: { category_id: id }
                })
            }

            const cate = await db.category.destroy({ where: { id: id } })
            return res.status(200).json({ success: true, message: "deleted" })
        } catch (error) {
            console.log(error, "error in deleting category");
        }
    },

    getCategory: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await db.category.findOne({
                where: { id: id }
            })

            if (!user) {
                return res.json({
                    message: 'user not found'
                })
            }

            const data = await db.category.findOne({
                where: {
                    id: user.id
                }
            })

            return res.json(data);

        } catch (error) {
            console.log(error, "error in getting category")
        }
    },

    getAllCategory: async (req, res) => {
        try {
            const data = await db.category.findAll({
                order: [['id', "DESC"]]
            });
            return res.json(data)
        } catch (error) {
            console.log(error, 'error in getting all categories')
        }
    },
    getCategoryCount: async (req, res) => {
        try {
            const total = await db.category.count();
            res.json(total);

        } catch (error) {
            console.log(error, "error in cvountrfew");
        }
    }
}