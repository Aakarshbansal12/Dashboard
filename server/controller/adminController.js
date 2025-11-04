const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
var SECRET_KEY = process.env.SECRET_KEY;
const hlper = require('../helper/helper');
const admin = require('../middleware/token');
const Sequelize = require('sequelize');

module.exports = {
    getAdmin: async (req, res) => {
        try {
            const data = await db.users.findOne({
                where: {
                    role: '0'
                }
            })

            res.json(data);
        } catch (error) {
            console.log(error, "error in admin profile")
        }
    },
    dashboard: async (req, res) => {
        try {
            let user = await db.users.count({
                where: { role: '1' }
            });
            let booking = await db.bookings.count();
            let category = await db.category.count();
            let product = await db.product.count();
            return res.status(200).json({ message: "Data fetched successfully", user, booking, category, product });

        } catch (error) {
            console.log(error, "error in count dashboard");
        }
    },

    updateAdminPassword: async (req, res) => {
        try {
            const { password, newPassword, confPassword } = req.body;

            const authHeader = req.headers.authorization;
            if (!authHeader)
                return res.status(401).json({ message: "No token provided" });

            const token = authHeader.split(" ")[1];
            const decode = jwt.verify(token, SECRET_KEY);
            const userId = decode.id;

            const user = await db.users.findByPk(userId);

            const oldPass = await bcrypt.compare(password, user.password);
            if (!oldPass)
                return res.status(400).json({ message: "Old password is incorrect" });

            const oldNew = await bcrypt.compare(newPassword, user.password);
            if (oldNew)
                return res.status(400).json({ message: "Old and new password should not be the same" });

            if (newPassword !== confPassword)
                return res.status(400).json({ message: "New and confirm password do not match" });

            const hash = await bcrypt.hash(newPassword, 10);
            await db.users.update({
                password: hash
            },
                {
                    where: { id: userId }
                });

            return res.status(200).json({ message: "Password updated successfully" });

        } catch (error) {
            console.error(error, "Error in update Password");
            return res.status(500).json({ message: "Internal server error" });
        }
    },
    updateAdmin:async (req, res) => {
            try {
                userId = req.admin.id;
                const { name, number, email, country_code } = req.body;
                const existingUser = await db.users.findByPk(userId);
                if (!existingUser) {
                    return res.status(404).json({ message: "User not found" });
                }
    
                let image = existingUser.image;
                if (req.files && req.files.image) {
                    image = await hlper.fileUpload(req.files.image);
                }
                const data1 = await db.users.update({
                    name: name,
                    number: number,
                    email: email,
                    image: image,
                    country_code: country_code
                }, {
                    where: { id: userId }
                })
    
    
                return res.json({
                    message: 'updated Successfully'
                })
    
            } catch (error) {
                console.log(error, "error in update Admin")
            }
        }

}