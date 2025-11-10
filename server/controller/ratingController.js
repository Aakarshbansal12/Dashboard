const db = require('../models');

module.exports = {
    getAllRating: async (req, res) => {
        try {
            const data = await db.rating.findAll({

                include: [
                    { model: db.users, as: "userss" },
                    { model: db.product, as: "products" }
                ]
            })
            return res.json(data);
        } catch (error) {
            console.log(error, 'error in adding query')
        }
    },
    getRating: async (req, res) => {
        try {
            const { id } = req.params;
            const ratings = await db.rating.findOne({
                where: { id: id },
                include: [
                    { model: db.users, as: "userss" },
                    { model: db.product, as: "products" }
                ]
            })
            if (!ratings) {
                return res.status(404).json({
                    message: 'rating not found'
                });
            }

            return res.status(200).json(ratings);
        } catch (error) {
            console.log(error, "erro in getting the rating");
        }
    },
    getAvgRating: async (req, res) => {
        try {
            const avgRatings = await db.rating.findAll({
                attributes: [
                    'product_id',
                    [db.Sequelize.fn('AVG', db.Sequelize.col('rating')), 'avg_rating']
                ],
                include: [
                    { model: db.product, as: 'products', attributes: ['id', 'name'] } 
                ],
                group: ['product_id', 'products.id', 'products.name'] 
            });

            return res.json(avgRatings);
        } catch (error) {
            console.log(error, 'error in calculating average rating');
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

}