import mongoose from 'mongoose'
import Post from '../models/Post.js'

export const getPosts = async(req, res)=>{
    try{
        const {page} = req.query
        console.log(page);
        //to get the posts per page
        const LIMIT = 8;
        const startIndex = (Number(page)-1)*LIMIT //start index of the first post in that page
        const total = await Post.countDocuments({});
        

        const posts = await Post.find({}).sort({_id:-1}).limit(LIMIT).skip(startIndex) //gives newest post first        

        res.status(200) //everything ok
        res.json({data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total/LIMIT)})


    }catch(e){
        res.status(400).json({message : e.message})
    }
        
}


export const getPostsBySearch = async(req, res)=>{
    console.log("hello")

    try {   
            
            const {searchQuery} = req.query
            
            //const searchTerms = new RegExp(searchQuery, 'i')  //i means ignore case        
            
            const searchTitle = searchQuery.replaceAll('_', ' ')
            const searchTerms = searchQuery.split('_')

            
            let posts = await Post.find({"title":{$regex:searchTitle, $options:"i"}})
            let x = []
            for(let term of searchTerms){   
                x = await Post.find({$or:[{"description":{$regex:term, $options:"i"}}, {"title":{$regex:term, $options:"i"}}]}) // HAVE TO FIX THE QUERY
                posts = posts.concat(x)
            }
            

            let index = []
            posts = posts.filter((item)=> {   //need to find better slolution to remove duplicates
                let k = item._id.toString();
                return index.indexOf(k) >= 0 ? false : index.push(k);})

            console.log(posts)
            res.json({data: posts});
         
    } catch (error) {
        res.status(404).json({message : error.message})
    }
}


export const getPost = async(req, res)=>{
    try{
        const {id} = req.params

        const post = await Post.findById(id)     

        res.status(200).json(post)


    }catch(e){
        res.status(400).json({message : e.message})
    }
        
}



export const createPost = async(req, res)=>{
    
    try{
        const newPost = new Post({...req.body, author: req.userId, createdAt: new Date().toISOString()});
        console.log(newPost)
        await newPost.save()
        res.status(201) //successful creation
        res.json(newPost)
    }catch(e){
        console.log(e)
        res.status(409).json({message : e.message})
    }
}



export const updatePost = async(req, res)=>{
    const {id: _id} = req.params
    console.log("hello")
    if(mongoose.Types.ObjectId.isValid(_id)){

        
        const updatedPost = await Post.findByIdAndUpdate(_id, {...req.body, _id}, {new: true})
        console.log("mate")

        res.json(updatedPost)


    }else{
        return res.status(404).send("No post with id")
    }



}





export const deletePost = async(req, res)=>{
    const {id : _id} = req.params

    if(mongoose.Types.ObjectId.isValid(_id)){

        await Post.findByIdAndRemove(_id);

        res.json({message: 'Post deleted successfully'})

    }else{
        return res.status(404).send("No post with id")
    }

}



export const likePost = async(req, res)=>{
    const {id: _id} = req.params

    if(!req.userId)return res.json({message:"not logged in"})
    

    if(mongoose.Types.ObjectId.isValid(_id)){
        const post = await Post.findById(_id)

        const index = post.likes.findIndex((id)=>id===String(req.userId))
        //if not already like
        if(index===-1){
            //like
            post.likes.push(req.userId)
        }else{
            //unlike
            post.likes = post.likes.filter((id)=>id!==String(req.userId))
        }

        const updatedPost = await Post.findByIdAndUpdate(_id, post, {new:true})

        
        res.json(updatedPost)

    }else{
        return res.status(404).send("No post with id")
    }
}




export const commentPost = async(req, res)=>{
    const {id} = req.params;
    const {comment} = req.body;

    const post = await Post.findById(id)
    post.comments.push(comment);

    const updatedPost = await Post.findByIdAndUpdate(id, post, {new:true})

    res.json(updatedPost)
}