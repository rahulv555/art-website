import mongoose from "mongoose"



const postSchema = mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    description:{
        type:String,
    },
    authorName:{
        type:String,
        //required:true
    },
    author:{
        type:String,
        //required:true,
    },
    image:{
        type:String,
        //required:true,
    },
    likes:{
        type:[String], 
        default:[]
    },
    createdAt:{
        type:Date,
        default: new Date()
    },
    comments:{
    type:[String], 
    default:[]
    }
})


const Post = new mongoose.model('Post', postSchema)
export default Post