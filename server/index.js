const express=require('express')

const mongoose=require('mongoose')
const dotEnv=require('dotenv')

dotEnv.config()
const cors=require('cors')
const authController=require('./controllers/authController')
const propertyController = require('./controllers/propertyController')
const uploadController = require('./controllers/uploadController')
const app=express()

const port=5000;

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("MONGODB IS CONNECTED SUCCESSFULLY")
})
.catch((err)=>{
    console.log(err)
})
app.use('/images',express.static('public/images'))

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/auth',authController)
app.use('/property',propertyController)
app.use('/upload',uploadController)


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})

