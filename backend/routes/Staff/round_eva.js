const express = require('express')
const db = require('../../db')
const router = express.Router()

// =============== demo =================
// API สำหรับ get ข้อมูล
// router.get('/',async (req,res) => {
//     try{
//         const [rows] = await db.query(``)
//         if(rows.length === 0) return res.status(403).json({messsage:'ไม่พบข้อมูลจากไอดีนี้'})
//         res.json(rows)
//     }catch(err){
//         console.error('Error get',err)
//         res.status(500).json({messsage:'error get'})
//     }
// })
// =============== demo =================

// API สำหรับ get ข้อมูล
router.get('/',async (req,res) => {
    try{
        const [rows] = await db.query(`select * from tb_sys order by id_sys desc`)
        if(rows.length === 0) return res.status(403).json({messsage:'ไม่พบข้อมูลจากไอดีนี้'})
        res.json(rows)
    }catch(err){
        console.error('Error get',err)
        res.status(500).json({messsage:'error get'})
    }
})

// API สำหรับ get ข้อมูล
router.get('/',async (req,res) => {
    try{
        const [rows] = await db.query(`select * from tb_sys order by id_sys desc`)
        if(rows.length === 0) return res.status(403).json({messsage:'ไม่พบข้อมูลจากไอดีนี้'})
        res.json(rows)
    }catch(err){
        console.error('Error get',err)
        res.status(500).json({messsage:'error get'})
    }
})

module.exports = router