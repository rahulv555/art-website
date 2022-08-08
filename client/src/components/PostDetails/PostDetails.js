import React, {useEffect} from 'react'
import { Paper, Typography, CircularProgress, Divider, Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { useParams, useNavigate } from 'react-router-dom'
import DeleteIcon from '@material-ui/icons/Delete'
import { deletePost, likePost } from '../../actions/posts.js'

import {getPost, getPostsBySearch} from '../../actions/posts'

import useStyles from './styles'

import CommentSection from './CommentSection'



const PostDetails = () => {

   const {post, posts, isLoading} = useSelector((state)=>state.posts);
   const dispatch = useDispatch();
   const navigate = useNavigate()
   const classes = useStyles();
   const {id} = useParams();

   

   useEffect(()=>{
    dispatch(getPost(id))
   }, [id])   //incase if changes, get the new post with that id


   //FOR RECOMMENDED POSTS
   useEffect(()=>{
    if(post){
        const searchT = (post.title + post.description).replace(/\s+/g,'_');
        dispatch(getPostsBySearch(searchT)) 
    }
   }, [post])
   

   
   const user = JSON.parse(localStorage.getItem('profile'))


   const openPost = (_id)=>{
    navigate(`/posts/${_id}`)
   }



   if(!post)return null;

   

   if(isLoading){
    return <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em"/>
    </Paper>
   }

   const recommendedPosts = posts.filter(({_id})=>_id!==post._id) //to remove current post

  return (
  <Paper style={{padding: '20px', borderRadius: '15px'}} elevation={6}> 
    <div className={classes.card}>
        <div className={classes.section}>
          
          <div style={{display:'flex', justifyContent:'space-between'}}>
          <div> <Typography variant="h3" component="h2">{post.title}</Typography>
          {/* <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography> */}
          <Typography gutterBottom variant="body1" component="p">{post.description}</Typography>
          <Typography variant="h6" onClick={()=>navigate(`/author/${post.author}`)}>Created by: {post.authorName}</Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography></div>
          <div style={{display:'flex', flexDirection:'column'}}>
             {/* EDIT BUTTON */}

             {(user?.result?._id===post?.author) && (
                <span>
                <Button variant='contained' style={{margin:'20px'}} color='primary' onClick={()=>navigate(`/posts/edit/${post._id}`)}>EDIT</Button>
                </span>

            )}
            {/* DELETE BUTTON */}
            {(user?.result?._id===post?.author) && (
              <Button size="small" color="primary" onClick={()=>{
                dispatch(deletePost(post._id))
                navigate('/posts')
                }}>
              <DeleteIcon fontSize='small'/>
               Delete
              </Button>
              
              )}
              
          </div>

          </div>
         
          
           
           
            
        
          <Divider style={{ margin: '20px 0' }} />
          <div className={classes.imageSection}>
          <img className={classes.media} style={{objectFit:'contain'}} src={post.image || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
            </div>
            
          
        </div>
       
        
      </div>
      <CommentSection post={post}/>
          <Divider style={{ margin: '20px 0' }}/>
      <div></div>
      {/* recommended */}
      {recommendedPosts.length ? (
        <div className={classes.section}>
            <Typography gutterBottom variant='h5'>You might also like</Typography>
            <Divider/>
            <div className={classes.recommendedPosts}>
                {recommendedPosts.map(({title, description, authorName, image, _id, likes})=>(
                    <div style={{margin:'20px', cursor:'pointer', width: '20%'}} variant='outlined' onClick={()=>openPost(_id)} key={_id}>
                        <Typography gutterBottom variant="h6">{title}</Typography>
                        <img src={image||'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} width='200px' alt='image'/>
                        <Typography gutterBottom variant="subtitle2">{authorName}</Typography>
                        {/* <Typography gutterBottom variant="subtitle2">{description}</Typography> */}
                        <Typography gutterBottom variant="subtitle1">Likes : {likes.length}</Typography>
                        
                        
                    </div>
                ))}
            </div>
        </div>

      ):(<div></div>)}

      </Paper> 
  )
}

export default PostDetails