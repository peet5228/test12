const express = require('express')
const db = require('../../db')
const router = express.Router()
const {verifyToken,requireRole} = require('../../middleware/authMiddleware')
router.get('/',verifyToken,requireRole('ผู้รับการประเมินผล'),async (req,res) => {
    try{
        const id_member = req.user.id_member
        const [rows] = await db.query(`select * from tb_member where id_member=?`,[id_member])
        res.json(rows[0])
    }catch(err){
        console.error('Error GET Me',err)
        res.status(500).json({message:'Error GET Me'})
    }
})

router.put('/',verifyToken,requireRole('ผู้รับการประเมินผล'),async (req,res) => {
    try{
        const id_member = req.user.id_member
        const {first_name,last_name,email,username,password} = req.body
        const [rows] = await db.query(`update tb_member set first_name=?,last_name=?,email=?,username=?,password=?`,[first_name,last_name,email,username,password,id_member])
        res.json({message:'แก้ไขสำเร็จ'})
    }catch(err){
        console.error('Error PUT Me',err)
        res.status(500).json({message:'Error PUT Me'})
    }
})

module.exports = router