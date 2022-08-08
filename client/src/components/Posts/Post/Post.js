import React, {useState} from 'react'
import useStyles from './styles.js'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase} from '@material-ui/core'
//icons
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'

import { useDispatch } from 'react-redux'
import { deletePost, likePost } from '../../../actions/posts.js'
import {  useNavigate } from 'react-router-dom'

import moment from 'moment'


export default function Post({post, setCurrentId}) {
    //for the styles
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // const [likes, setLikes] = useState(post?.likes)
    const user = JSON.parse(localStorage.getItem('profile'))


    const handleLike = async()=>{
      dispatch(likePost(post._id))


      // //this part so that likes is updated immediately on the UI
      // if(post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))){
      //   //current user has liked the post?
      //   setLikes(post.likes.filter((id)=>id!==(user?.result?.googleId||user?.result?._id)))
      // }
      
    }
    //LIKES SUBCOMPONENT
    const Likes = () => {
      if (post.likes.length > 0) {
        return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id)) //if likes array contained id of user
          ? (
            <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
          ) : (
            <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
          );
      }
  
      return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };

    const openPost = ()=>{
        return navigate(`/posts/${post._id}`)
    }

  
    return (
    <div>
      
        <Card className={classes.card} raised elevation={6}>


          <CardMedia onClick={openPost} className={classes.media} image={post.image} title={post.title}>
          
        
          </CardMedia>
          {/* <ButtonBase className={classes.cardAction} onClick={openPost}></ButtonBase> */}
          <div className={classes.overlay}>
            <Typography variant='h6'>{post.authorName}</Typography>
            <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
          </div>
          {(user?.result?._id===post?.author) && (
          <div className={classes.overlay2}>
            <Button style={{color:'white'}} size='small' onClick={()=>{setCurrentId(post._id)}}> 
              <MoreHorizIcon fontSize='default'></MoreHorizIcon>
            </Button>
          </div>)}
          {/* <div className={classes.details}></div> */}
         
          <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
          
         
            {/* <CardContent>
            
              <Typography variant="body2" component="p" gutterBottom>{post.description}</Typography>
            </CardContent> */}
            
            
            <CardActions className={classes.cardActions}>
              <Button size="small" color="primary" disabled={!user?.result}onClick={handleLike}>
                <Likes/>
              </Button>

              {(user?.result?._id===post?.author) && (
              <Button size="small" color="primary" onClick={()=>dispatch(deletePost(post._id))}>
              <DeleteIcon fontSize='small'/>
               Delete
              </Button>
              
              )}
              
            </CardActions>
         

          
          
        </Card>
    </div>
  )
}
