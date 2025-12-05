const express = require('express')
const db = require('../../db')
const router = express.Router()

router.get('/eva',async (req,res) => {
    try{
        const [rows] = await db.query(`select * from tb_member where role='ผู้รับการประเมินผล' order by id_member desc`)
        
        res.json(rows)
    }
})