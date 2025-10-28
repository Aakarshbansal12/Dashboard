const db = require('../models');
db.bookings.belongsTo(db.product, { foreignKey: "product_id", as: "prod" });
db.bookings.belongsTo(db.users, { foreignKey: "users_id", as: "user" });
db.product.belongsTo(db.category, { foreignKey: "category_id", as: "cate" });


module.exports = {
    addBookings: async (req, res) => {
        try {
            const { product_id, users_id, booking_date, booking_time, booking_code, price, status } = req.body;
            const data = await db.bookings.create({
                product_id: product_id,
                users_id: users_id,
                booking_date: booking_date,
                booking_time: booking_time,
                booking_code: booking_code,
                price: price,
                status: status
            })

            return res.json(data);

        } catch (error) {
            console.log('error in add Bookings');
        }
    },

    updateBooking: async (req, res) => {
        try {
            const { booking_date, booking_time, booking_code, price } = req.body;
            const {id}=req.params;
            const booking = await db.bookings.findOne({
                where: { id },
            });

            if (!booking) {
                return res.status(404).json({ message: "Booking not found" });
            }
            const data=await db.bookings.update({
                booking_date:booking_date,
                booking_time:booking_time,
                booking_code:booking_code,
                price:price
            },{
                where:{id:booking.id}
            })

            return res.json({
                message: 'user Updated Successfully'
            })

        } catch (error) {
            console.log(error, "error in update booking");
        }
    },

    bookingsList: async (req, res) => {
        try {
            const data = await db.bookings.findAll({
                include: [

                    {
                        model: db.product, as: "prod",
                        include: [
                            { model: db.category, as: "cate" },
                        ]
                    },

                    { model: db.users, as: "user" }
                ],
            })
            res.json(data);

        } catch (error) {
            console.log(error, "error in booking list");
        }
    },
    deleteBookings: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await db.bookings.findOne({
                where: { id: id }
            })

            const data = await db.bookings.destroy({
                where: { id: user.id }
            })

            return res.json({
                message: 'bookings deleted Successfully'
            })
        } catch (error) {
            console.log(error, 'error in delete bookings');
        }
    },

    countBooking: async (req, res) => {
        try {
            const total = await db.bookings.count();
            return res.status(200).json({ total });

        } catch (error) {
            console.error("Error in countProduct:", error);
            return res.status(500).json({ message: "Error counting products" });
        }
    },

    getBooking: async (req, res) => {
        try {
            const { id } = req.params;

            const booking = await db.bookings.findOne({
                where: { id: id },
                include: [

                    {
                        model: db.product, as: "prod",
                        include: [
                            { model: db.category, as: "cate" },
                        ]
                    },

                    { model: db.users, as: "user" }
                ]
            });

            if (!booking) {
                return res.status(404).json({
                    message: 'booking not found'
                });
            }

            return res.status(200).json(booking);

        } catch (error) {
            console.log(error, "error in getiing booking");
        }
    }


}