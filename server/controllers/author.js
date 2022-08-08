import mongoose from 'mongoose'
import User from '../models/User.js'
import Post from '../models/Post.js'


export const getAuthor = async(req, res)=>{
    try {
        const{id} = req.params
       
        const author = await User.findById(id)

       
        //console.log(author)
        
        res.status(200).json(author)
        
    } catch (error) {
        res.status(400).json({message : error.message})
    }
}



export const getPostsByAuthor = async(req, res)=>{
    try{
        const{id} = req.params
        const posts = await Post.find({"author": id})
        
        res.status(200).json(posts)

    }catch(error){
        res.status(400).json({message : error.message})
    }

}


export const updateAuthor = async(req, res)=>{
    try {
        const {id: _id} = req.params
        console.log("hello")
    if(mongoose.Types.ObjectId.isValid(_id)){

        
        const updatedAuthor = await User.findByIdAndUpdate(_id, {...req.body, _id}, {new: true})
        //console.log("mate")

        res.json(updatedPost)


        
    }} catch (error) {
        res.status(400).json({message : error.message})
    }
}