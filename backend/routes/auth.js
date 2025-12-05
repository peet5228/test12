const express = require('express')
const db = require('../db')
const router = express.Router()
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

router.post('/login',async (req,res) => {
    try{
        const {username,password,role} = req.body
        const [rows] = await db.query(`select * from tb_member where username=? and password=? and role=?`,[username,password,role])
        const m = rows[0]
        const token = jwt.sign(
            {id_member:m.id_member,username:m.username,role:m.role} , JWT_SECRET , {expiresIn:'2h'}
        )
        res.json({token,role:m.role})
    }catch(err){
        console.error('Error Login',err)
        res.status(500).json({message:'Error Login'})
    }
})

router.post('/regis',async (req,res) => {
    try{
        const {first_name,last_name,email,username,password,role} = req.body
        const [rows] = await db.query(`insert into tb_member (first_name,last_name,email,username,password,role) values (?,?,?,?,?,?)`,[first_name,last_name,email,username,password,role])
        res.json(rows)
    }catch(err){
        console.error('Error Register',err)
        res.status(500).json({message:'Error regis'})
    }
})

module.exports = router