const express = require('express')
const db = require('../../db')
const router = express.Router()
const {verifyToken,requireRole} = require('../../middleware/authMiddleware')

router.get('/',verifyToken,requireRole('ผู้รับการประเมินผล'),async (req,res) => {
    try{
        const id_member = req.user.id_member
        const [rows] = await db.query(`select * from tb_member m,tb_eva e,tb_system s where e.id_member=? and e.id_member=m.id_member and e.id_sys=s.id_sys and status_sys=? order by e.id_eva desc`,
            [id_member,'y']
        )
        res.json(rows[0])
    }catch(err){
        console.error('Error GET Me',err)
        res.status(500).json({message:'Error GET Me'})
    }
})

router.get('/indicate',verifyToken,requireRole('ผู้รับการประเมินผล'),async (req,res) => {
    try{
        const id_member = req.user.id_member
        const [[evaRow]] = await db.query(`select * from tb_member m,tb_eva e,tb_system s where e.id_member=? and e.id_member=m.id_member and e.id_sys=s.id_sys and status_sys=? order by e.id_eva desc`,
            [id_member,'y']
        )
        const id_eva = evaRow.id_eva
        const [topics] = await db.query(`select * from tb_topic`)
        const [indicates] = await db.query(`select * from tb_indicate i,tb_evadetail d where i.id_indicate=d.id_indicate and status_eva=? and id_eva=?`,
            [1,id_eva]
        )
        const result = topics.map(t => ({
            ...t,
            indicates:indicates.filter((i) => i.id_topic === t.id_topic)
        }))
        res.json(result)
    }catch(err){
        console.error('Error GET Topic and Indicate',err)
        res.status(500).json({message:'Error GET Topic and Indicate'})
    }
})

module.exports = router