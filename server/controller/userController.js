const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
var SECRET_KEY = process.env.SECRET_KEY;
const hlper = require('../helper/helper');
const admin = require('../middleware/token');
const Sequelize = require('sequelize');


module.exports = {
    addUser: async (req, res) => {
        try {
            const { name, email, country_code, number, password, status, location } = req.body;

            let image = "";
            if (req.files && req.files.image) {
                image = await hlper.fileUpload(req.files.image);
            }

            const hash = await bcrypt.hash(password, 10);

            const data = await db.users.create({
                name,
                email,
                password: hash,
                country_code,
                number,
                status,
                location,
                image
            });

            return res.json(data);

        } catch (error) {
            console.error(error, "error in addUser");
            res.status(500).json({ error: "Something went wrong" });
        }
    },


    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            // const  password = req.body;            

            const user = await db.users.findOne({
                where: { email: email, role: '0' }
            })

            const data = await bcrypt.compare(password, user.password);
            if (!data) {
                return res.json({
                    message: 'email or password is incorrect'
                });
            }
            const token = jwt.sign({ id: user.id }, SECRET_KEY);

            return res.json({
                message: 'login Successfully', token
            });
        } catch (error) {
            console.log(error, "error in loginUser");
        }
    },

    getUser: async (req, res) => {
        try {
            userId = req.params.id;
            const data = await db.users.findByPk(userId);
            return res.json(data);
        } catch (error) {
            console.log(error, "error in get User");
        }
    },
    // updateStatus: async (req, res) => {
    //     try {
    //         const { id } = req.params;
    //         const user = await db.users.findOne({
    //             where: { id: id }
    //         })
    //         const status = user.status;

    //         if (status == 0) {
    //             await db.users.update({
    //                 status: '1'
    //             }, {
    //                 where: {
    //                     id: user.id
    //                 }
    //             })
    //         } else {
    //             await db.users.update({
    //                 status: '0'
    //             }, {
    //                 where: {
    //                     id: user.id
    //                 }
    //             })
    //         }
    //         return res.json({
    //             message: 'status updated Successfully'
    //         })

    //     } catch (error) {
    //         console.log(error, "eeeeeeeeeeeeeeeeee");
    //     }
    // },

    updateStatus: async (req, res) => {
        try {
            const { id } = req.params;

            const user = await db.users.findOne({ where: { id } });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const newStatus = user.status === '1' ? '0' : '1';
            await db.users.update(
                { status: newStatus },
                { where: { id } }
            );
            return res.json({
                message: 'Status updated successfully',
                status: newStatus,
            });

        } catch (error) {
            console.error('Error in updateStatus:', error);
            res.status(500).json({ message: 'Server error' });
        }
    },

    updateUser: async (req, res) => {
        try {
            userId = req.params.id;
            const { name, number, email, location, country_code } = req.body;
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
                location: location,
                country_code: country_code
            }, {
                where: { id: userId }
            })


            return res.json({
                message: 'updated Successfully'
            })

        } catch (error) {
            console.log(error, "error in update User")
        }
    },

    updatePassword: async (req, res) => {
        try {
            const { password, newPassword, confPassword } = req.body;
            const token = req.headers.authorization.split(" ")[1];
            const decode = jwt.verify(token, SECRET_KEY)
            const userId = decode.id
            let user = await db.users.findByPk(userId)

            const oldPass = await bcrypt.compare(password, user.password);
            if (!oldPass) {
                return res.json({
                    message: 'old password is not correct'
                })
            }
            const oldNew = await bcrypt.compare(newPassword, user.password);
            if (oldNew) {
                return res.json({
                    message: 'old and new password should not be same'
                })
            }

            if (newPassword != confPassword) {
                return res.json({
                    message: 'new and confirm are not same'
                })
            }
            const hash = await bcrypt.hash(newPassword, 10);
            const data = await db.users.update({
                password: hash
            }, {
                where: { id: userId }
            })

            return res.json({
                message: 'password updated successfully'
            })

        } catch (error) {
            console.log(error, "error in update Password");
        }
    },

    deleteUser: async (req, res) => {
        try {
            userId = req.params.id;
            const data = await db.users.destroy({
                where: { id: userId }
            })


            return res.json({
                message: 'deleted Successfully'
            })
        } catch (error) {
            console.log(error, "error in delete");
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const data = await db.users.findAll({
                where: {
                    role: '1'
                }
            })

            return res.json(data);

        } catch (error) {
            console.log(error, "error in getting All users")

        }
    },

    getUserCount: async(req,res)=>{
        try {
            const total = await db.users.count({where:{
                role:'1'
            }});
            res.json(total);
            
        } catch (error) {
            console.log(error,"error in cvountrfew");
        }
    }




}