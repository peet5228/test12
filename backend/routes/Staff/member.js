const express = require('express')
const db = require('../../db')
const router = express.Router()

// API สำหรับ get ข้อมูล
router.get('/eva',async (req,res) => {
    try{
        const [rows] = await db.query(`select * from tb_member where role='ผู้รับการประเมินผล' order by id_member desc`)
        if(rows.length === 0) return res.status(403).json({messsage:'ไม่พบข้อมูลจากไอดีนี้'})
        res.json(rows)
    }catch(err){
        console.error('Error get',err)
        res.status(500).json({messsage:'error get'})
    }
})

// API สำหรับ get ข้อมูล
router.get('/commit',async (req,res) => {
    try{
        const [rows] = await db.query(`select * from tb_member where role='กรรมการประเมิน' order by id_member desc`)
        if(rows.length === 0) return res.status(403).json({messsage:'ไม่พบข้อมูลจากไอดีนี้'})
        res.json(rows)
    }catch(err){
        console.error('Error get',err)
        res.status(500).json({messsage:'error get'})
    }
})

// API สำหรับ get ข้อมูล
router.get('/all',async (req,res) => {
    try{
        const [rows] = await db.query(`select * from tb_member order by id_member desc`)
        if(rows.length === 0) return res.status(403).json({messsage:'ไม่พบข้อมูลจากไอดีนี้'})
        res.json(rows)
    }catch(err){
        console.error('Error get',err)
        res.status(500).json({messsage:'error get'})
    }
})

// API สำหรับ get ข้อมูล where params
router.get('/:id_member',async (req,res) => {
    try{
        const {id_member} = req.params
        const [rows] = await db.query(`select * from tb_member where id_member='${id_member}' order by id_member desc`)
        if(rows.length === 0) return res.status(403).json({messsage:'ไม่พบข้อมูลจากไอดีนี้'})
        res.json(rows)
    }catch(err){
        console.error('Error get',err)
        res.status(500).json({messsage:'error get'})
    }
})

// API สำหรับ update ข้อมูล
router.put('/:id_member',async (req,res) => {
    try{
        const {id_member} = req.params
        const {first_name,last_name,email,username,password,role} = req.body
        const [rows] = await db.query(`update tb_member set first_name=?,last_name=?,email=?,username=?,password=?,role=? where id_member='${id_member}'`,[first_name,last_name,email,username,password,role])
        res.json({rows,message:'Update Success'})
    }catch(err){
        console.error('Error Update',err)
        res.status(500).json({messsage:'error Update'})
    }
})

// API สำหรับ delete ข้อมูล
router.delete('/:id_member',async (req,res) => {
    try{
        const {id_member} = req.params
        const [rows] = await db.query(`delete from tb_member where id_member='${id_member}'`)
        if(rows.affectedRows === 0) return res.status(403).json({message:'ไม่พบข้อมูลจากไอดีนี้'})
        res.json({rows,message:'delete Success'})
    }catch(err){
        console.error('Error delete',err)
        res.status(500).json({messsage:'error delete'})
    }
})

module.exports = router