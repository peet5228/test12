const express = require('express')
const db = require('../../db')
const router = express.Router()
const {verifyToken,requireRole} = require('../../middleware/authMiddleware')

// API สำหรับ get ข้อมูล
router.get('/',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const [rows] = await db.query(`select * from tb_system order by id_sys desc`)
        res.json(rows)
    }catch(err){
        console.error('Error get',err)
        res.status(500).json({messsage:'error get'})
    }
})

// API สำหรับ get ข้อมูล
router.get('/:id_sys',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const {id_sys} = req.params
        const [rows] = await db.query(`select * from tb_system where id_sys='${id_sys}' order by id_sys desc`)
        if(rows.length === 0) return res.status(403).json({messsage:'Invalid Params'})
        res.json(rows)
    }catch(err){
        console.error('Error get',err)
        res.status(500).json({messsage:'error get'})
    }
})

// API สำหรับ Insert ข้อมูล
router.post('/',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const {day_open,day_out,round_sys,year_sys,status_sys} = req.body
        const [rows] = await db.query(`insert into tb_system (day_open,day_out,round_sys,year_sys,status_sys) values (?,?,?,?,?)`,[day_open,day_out,round_sys,year_sys,status_sys])
        res.json(rows)
    }catch(err){
        console.error('Error Insert',err)
        res.status(500).json({messsage:'error Insert'})
    }
})

// API สำหรับ Update ข้อมูล
router.put('/:id_sys',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const {id_sys} = req.params
        const {day_open,day_out,round_sys,year_sys,status_sys} = req.body
        const [rows] = await db.query(`update tb_system set day_open=?,day_out=?,round_sys=?,year_sys=?,status_sys=? where id_sys='${id_sys}'`,[day_open,day_out,round_sys,year_sys,status_sys])
        res.json(rows)
    }catch(err){
        console.error('Error update',err)
        res.status(500).json({messsage:'error update'})
    }
})

// API สำหรับ Delete ข้อมูล
router.delete('/:id_sys',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const {id_sys} = req.params
        const [rows] = await db.query(`delete from tb_system where id_sys='${id_sys}'`)
        res.json(rows)
    }catch(err){
        console.error('Error Delete',err)
        res.status(500).json({messsage:'error delete'})
    }
})

module.exports = router