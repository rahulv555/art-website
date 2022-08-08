import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express();

//npm i dotenv
import dotevn from 'dotenv'
dotevn.config()
const PORT = process.env.PORT || 5000


//body parser to send requests
app.use(bodyParser.json({limit:'30mb', extended:true}));
app.use(bodyParser.urlencoded({limit:'30mb', extended:true}));

//cors
app.use(cors());

app.get('/', (req, res)=>{
   res.send("hello")
})


//connecting to database
const connectDB = async() => {
   try{
    await mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser : true, useUnifiedTopology: true});
    app.listen(PORT, ()=>console.log(`Listening on port : ${PORT}`))
   }catch(e){
        console.log(e)  
   }
}
connectDB()
// mongoose.set('useFindAndModify', false); 





///ROUTES
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import authorRoutes from './routes/author.js'













//
app.use('/posts', postRoutes)
app.use('/user', userRoutes)
app.use('/author', authorRoutes)

