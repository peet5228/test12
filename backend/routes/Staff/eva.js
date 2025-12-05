const express = require('express')
const db = require('../../db')
const router = express.Router()
const {verifyToken,requireRole} = require('../../middleware/authMiddleware')

// =============== demo =================
// API สำหรับ get ข้อมูล
// router.get('/',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
//     try{
//         const [rows] = await db.query(``)
//         res.json(rows)
//     }catch(err){
//         console.error('Error get',err)
//         res.status(500).json({messsage:'error get'})
//     }
// })
// =============== demo =================

// API สำหรับ get ข้อมูล
router.get('/round',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const [rows] = await db.query(`select * from tb_system where status_sys='y' order by id_sys desc`)
        res.json(rows)
    }catch(err){
        console.error('Error get',err)
        res.status(500).json({messsage:'error get'})
    }
})

// API สำหรับ get ข้อมูล
router.get('/eva',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const [rows] = await db.query(`select * from tb_eva,tb_system,tb_member where tb_eva.id_sys=tb_system.id_sys and tb_eva.id_member=tb_member.id_member and status_eva=1 order by id_eva desc`)
        res.json(rows)
    }catch(err){
        console.error('Error get',err)
        res.status(500).json({messsage:'error get'})
    }
})

// API สำหรับ get ข้อมูล
router.get('/all',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const [rows] = await db.query(`select * from tb_eva,tb_system,tb_member where tb_eva.id_sys=tb_system.id_sys and tb_eva.id_member=tb_member.id_member order by id_eva desc`)
        res.json(rows)
    }catch(err){
        console.error('Error get',err)
        res.status(500).json({messsage:'error get'})
    }
})


// API สำหรับ Insert ข้อมูล
router.post('/',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const {id_member,id_sys,day_eva} = req.body
        const [rows] = await db.query(`insert into tb_eva (id_member,id_sys,day_eva,status_eva) values (?,?,?,?)`,[id_member,id_sys,day_eva,1])
        res.json(rows)
    }catch(err){
        console.error('Error insert',err)
        res.status(500).json({messsage:'error insert'})
    }
})

// API สำหรับ update ข้อมูล
router.put('/:id_eva',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const {id_eva} = req.params
        const {id_member,id_sys,day_eva} = req.body
        const [rows] = await db.query(`update tb_eva set id_member=?,id_sys=?,day_eva=? where id_eva='${id_eva}'`,[id_member,id_sys,day_eva])
        res.json(rows)
    }catch(err){
        console.error('Error update',err)
        res.status(500).json({messsage:'error update'})
    }
})

// API สำหรับ delete ข้อมูล
router.delete('/:id_eva',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const {id_eva} = req.params
        const [rows] = await db.query(`delete from tb_eva where id_eva='${id_eva}'`)
        res.json(rows)
    }catch(err){
        console.error('Error delete',err)
        res.status(500).json({messsage:'error delete'})
    }
})

module.exports = router