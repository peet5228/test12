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
        const [rows] = await db.query(`select * from tb_topic order by id_topic desc`)
        if(rows.length === 0) return res.status(403).json({messsage:'ไม่พบข้อมูลจากไอดีนี้'})
        res.json(rows)
    }catch(err){
        console.error('Error get',err)
        res.status(500).json({messsage:'error get'})
    }
})

// API สำหรับ get ข้อมูล where params
router.get('/:id_topic',async (req,res) => {
    try{
        const {id_topic} = req.params
        const [rows] = await db.query(`select * from tb_topic where id_topic='${id_topic}' order by id_topic desc`)
        if(rows.length === 0) return res.status(403).json({messsage:'ไม่พบข้อมูลจากไอดีนี้'})
        res.json(rows)
    }catch(err){
        console.error('Error get',err)
        res.status(500).json({messsage:'error get'})
    }
})

// API สำหรับ insert ข้อมูล
router.post('/',async (req,res) => {
    try{
        const {name_topic} = req.body
        const [rows] = await db.query(`insert into tb_topic (name_topic) values (?)`,[name_topic])
        res.json({rows,messsage:'Insert Success'})
    }catch(err){
        console.error('Error Insert',err)
        res.status(500).json({messsage:'error Insert'})
    }
})

// API สำหรับ update ข้อมูล
router.put('/:id_topic',async (req,res) => {
    try{
        const {id_topic} = req.params
        const {name_topic} = req.body
        const [rows] = await db.query(`update tb_topic set name_topic=? where id_topic='${id_topic}'`,[name_topic])
        res.json({rows,messsage:'Update Success'})
    }catch(err){
        console.error('Error Update',err)
        res.status(500).json({messsage:'error Update'})
    }
})

// API สำหรับ delete ข้อมูล
router.delete('/:id_topic',async (req,res) => {
    try{
        const {id_topic} = req.params
        const [rows] = await db.query(`delete from tb_topic where id_topic='${id_topic}'`)
        res.json({rows,messsage:'delete Success'})
    }catch(err){
        console.error('Error Update',err)
        res.status(500).json({messsage:'error Update'})
    }
})

module.exports = router