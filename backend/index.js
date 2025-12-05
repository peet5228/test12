require('dotenv').config()
const express = require('express')
const fileupload = require('express-fileupload')
const cors = require('cors')
const path = require('path')
const app = express()

app.use(cors ({
    origin:'http://localhost:3000',
    credentials:true
}))

app.use(express.json())
app.use(fileupload())
app.use('uploads',express.static(path.join('uploads')))

const auth = require('./routes/auth')
app.use('/api/auth',auth)

const profile = require('./routes/profile')
app.use('/api/profile',profile)

//eva
const me = require('./routes/Eva/me')
app.use('/api/Eva/me',me)

const selfeva = require('./routes/Eva/selfeva')
app.use('/api/Eva/selfeva',selfeva)

const score_eva = require('./routes/Eva/score_eva')
app.use('/api/Eva/score_eva',score_eva)

app.listen(7000 , () => console.log('server running on port 7000'))

// Staff =====================
const member = require('./routes/Staff/member')
app.use('/api/Staff/member',member)

const topic = require('./routes/Staff/topic')
app.use('/api/Staff/topic',topic)

const indicate = require('./routes/Staff/indicate')
app.use('/api/Staff/indicate',indicate)

const round_eva = require('./routes/Staff/round_eva')
app.use('/api/Staff/round_eva',round_eva)


app.use((req,res) => res.status(404).json({message:'API ปิดปรับปรุง'}))
app.listen(7000 , () => console.log('server running on port 7000'))