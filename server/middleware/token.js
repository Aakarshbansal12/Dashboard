const jwt = require('jsonwebtoken');
require('dotenv').config();
var SECRET_KEY = process.env.SECRET_KEY;
const db = require('../models');

module.exports = {
    token: async (req, res, next) => {
        try {
            const token = req.headers.authorization.split(" ")[1];
            if (!token) {
                return res.json('invalid token');
            }
            const decode = jwt.verify(token, SECRET_KEY);

            const data = await db.users.findByPk(decode.id, {
                attributes: { exclude: ['password'] }
            })

            req.admin = data;
            next();

        } catch (error) {
            console.error(error, '/////////////');
        }
    }
}