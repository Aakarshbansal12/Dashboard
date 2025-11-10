const db=require('../models')

module.exports={
    getPrivacy:async(req,res)=>{
        try {
            const data=await db.cms.findOne({
                where:{type:'0'}
            })

            return res.json(data);
        } catch (error) {
            console.log(error,"erro in privacy");
        }
    },
    updatePrivacy: async(req,res)=>{
        try {
            const{content}=req.body;
            const data=await db.cms.update({
                content:content
            },{
                where:{type:'0'}
            }
        )
        return res.json(data);
            
        } catch (error) {
            console.log(error,'error in update privacy')
        }
    },
    getAboutUs: async (req,res)=>{
        try {
             const data=await db.cms.findOne({

                where:{type:'1'}
                
             })
             return res.json(data);
        } catch (error) {
            console.log(error,"eroroo in getting about us")
        }
    },
    updateAboutUs: async(req,res)=>{
        try {
            const{content}=req.body;
            const data=await db.cms.update({
                content:content
            },{
                where:{type:'1'}
            }
        )
        return res.json(data);
            
        } catch (error) {
            console.log(error,'error in update privacy')
        }
    },
    getTerms: async (req,res)=>{
        try {
             const data=await db.cms.findOne({

                where:{type:'2'}
                
             })
             return res.json(data);
        } catch (error) {
            console.log(error,"eroroo in getting  Terms")
        }
    },
    updateTerms: async(req,res)=>{
        try {
            const{content}=req.body;
            const data=await db.cms.update({
                content:content
            },{
                where:{type:'2'}
            }
        )
        return res.json(data);
            
        } catch (error) {
            console.log(error,'error in update Terms')
        }
    },
}