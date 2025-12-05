const express = require('express')
const db = require('../../db')
const router = express.Router()

// API สำหรับ get ข้อมูล
router.get('/',async (req,res) => {
    try{
        const [rows] = await db.query(`select * from tb_topic,tb_indicate where tb_topic.id_topic=tb_indicate.id_topic order by id_indicate desc`)
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
        const [rows] = await db.query(`select * from tb_indicate order by id_indicate desc`)
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
        const {id_topic,name_indicate,detail_indicate,point_indicate,check_indicate} = req.body
        const [rows] = await db.query(`insert into tb_indicate (id_topic,name_indicate,detail_indicate,point_indicate,check_indicate) values (?,?,?,?,?)`,[id_topic,name_indicate,detail_indicate,point_indicate,check_indicate])
        res.json({rows,message:'Insert Success'})
    }catch(err){
        console.error('Error Insert',err)
        res.status(500).json({messsage:'error Insert'})
    }
})

// API สำหรับ update ข้อมูล
router.put('/:id_indicate',async (req,res) => {
    try{
        const {id_indicate} = req.params
        const {id_topic,name_indicate,detail_indicate,point_indicate,check_indicate} = req.body
        const [rows] = await db.query(`update tb_indicate set id_topic=?,name_indicate=?,detail_indicate=?,point_indicate=?,check_indicate=? where id_indicate='${id_indicate}'`,[id_topic,name_indicate,detail_indicate,point_indicate,check_indicate])
        res.json({rows,message:'Update Success'})
    }catch(err){
        console.error('Error Update',err)
        res.status(500).json({messsage:'error Update'})
    }
})

// API สำหรับ delete ข้อมูล
router.delete('/:id_indicate',async (req,res) => {
    try{
        const {id_indicate} = req.params
        const [rows] = await db.query(`delete from tb_indicate where id_indicate='${id_indicate}'`)
        res.json({rows,message:'delete Success'})
    }catch(err){
        console.error('Error delete',err)
        res.status(500).json({messsage:'error delete'})
    }
})

module.exports = router