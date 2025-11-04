const db = require('../models')

module.exports = {
    addQuery: async (req, res) => {
        try {
            const data = await db.contact.findAll()
            return res.json(data);
        } catch (error) {
            console.log(error, 'error in adding query')
        }
    },
    deleteQuery:async (req,res)=>{
        try {
            userId = req.params.id;
            const data=await db.contact.destroy({
                where: { id: userId }
            })
            return res.json({
                message: 'deleted Successfully'
            })
        } catch (error) {
            console.log(error,'error in delete contact');
        }
    },
    getContact:async (req,res)=>{
        try {
            const { id } = req.params;
            const data=await db.contact.findOne({
                where:{id:id}
            })
            return res.status(200).json(data);
        } catch (error) {
            console.log(error,'error in get contact');
        }
    }
}