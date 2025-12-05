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
router.get('/header/:id_eva',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const {id_eva} = req.params 
        const [rows] = await db.query(`select * from tb_member , tb_eva where tb_eva.id_eva='${id_eva}' and tb_eva.id_member=tb_member.id_member`)
        res.json(rows)
    }catch(err){
        console.error('Error get',err)
        res.status(500).json({messsage:'error get'})
    }
})

// API สำหรับ get ข้อมูล
router.get('/:id_eva',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const {id_eva} = req.params
        const [before] = await db.query(`select id_member,concat(first_name,' ',last_name)as fullname_commit from tb_member where role='กรรมการประเมิน' order by id_member desc`)
        const [after] = await db.query(`select id_commit,first_name,last_name,level_commit as role,tb_member.id_member from tb_member,tb_eva,tb_commit where tb_commit.id_eva='${id_eva}' and tb_eva.id_eva=tb_commit.id_eva and tb_commit.id_member=tb_member.id_member`)
        res.json({before,after})
    }catch(err){
        console.error('Error get',err)
        res.status(500).json({messsage:'error get'})
    }
})

// API สำหรับ Insert ข้อมูล
router.post('/:id_eva',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const {id_eva} = req.params
        await db.query(`delete from tb_commit where id_eva='${id_eva}'`)
        const commit = req.body
        const values = commit.map( p => [p.id_member,id_eva,p.role,'n'] )
        await db.query(`insert into tb_commit (id_member,id_eva,level_commit,status_commit) values ?`,[values])
        res.json({message:'Insert Committees Success'})
    }catch(err){
        console.error('Error Insert',err)
        res.status(500).json({messsage:'error Insert'})
    }
})

// API สำหรับ Delete ข้อมูล
router.delete('/:id_commit',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const {id_commit} = req.params
        const [rows] = await db.query(`delete from tb_commit where id_commit='${id_commit}'`)
        res.json(rows)
    }catch(err){
        console.error('Error Delete',err)
        res.status(500).json({messsage:'error Delete'})
    }
})

module.exports = router