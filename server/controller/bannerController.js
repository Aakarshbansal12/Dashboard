const db = require('../models')
const hlper = require('../helper/helper');
module.exports = {
    addBanner: async (req, res) => {
        try {
            const { title } = req.body;
            let image = "";
            if (req.files && req.files.image) {
                image = await hlper.fileUpload(req.files.image)
            }
            const data = await db.banner.create({
                title: title,
                image: image
            })

            return res.json(data);

        } catch (error) {
            console.log(error, "error in adding banner");
        }
    },
    getAllBanner: async (req, res) => {
        try {
            const data = await db.banner.findAll({
                order: [['id', "DESC"]]
            })
            return res.json(data)

        } catch (error) {
            console.log(error, 'error in getting the banner')
        }
    },
    countBanner: async (req, res) => {
        try {
            const total = await db.banner.count();
            return res.status(200).json({ total });

        } catch (error) {
            console.error("Error in banner count:", error);
            return res.status(500).json({ message: "Error counting Bnaner" });
        }
    },
    getBanner: async (req, res) => {
        try {
            const { id } = req.params;
            const banner = await db.banner.findOne({
                where: { id: id }
            })
            if (!banner) {
                return res.status(404).json({
                    message: 'banner not found'
                });
            }

            return res.status(200).json(banner);
        } catch (error) {
            console.log(error, 'erro in get banner')
        }
    },
    deleteBanner: async (req, res) => {
        try {
            const { id } = req.params;

            await db.banner.destroy({
                where: { id: id }
            });

            return res.status(200).json({ success: true, message: "deleted" })
        } catch (error) {
            console.log(error, "eror in delete banner")
        }
    },
    updateBanner: async (req, res) => {
        try {
            const { title } = req.body;
            const { id } = req.params;
            const user = await db.banner.findOne({
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
            const data = await db.banner.update({
                title: title,
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
}