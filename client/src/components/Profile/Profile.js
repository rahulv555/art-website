import { Divider, Paper, Typography, Button , Grid} from '@material-ui/core';
import React, { useEffect, useSyncExternalStore } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import useStyles from './styles'
import { getAuthor, getPostsByAuthor } from '../../actions/author';



const Profile = () => {
    
    const {author, posts} = useSelector((state)=>state.author)
    const {id} = useParams();
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const user = JSON.parse(localStorage.getItem('profile'));
    useEffect(()=>{
        dispatch(getAuthor(id))
    }, [id])


    //FOR GETTING CREATED POSTS
    useEffect(()=>{
        if(id){
            dispatch(getPostsByAuthor(id)) 
        }
       }, [id])
  



       const openPost = (_id)=>{
        navigate(`/posts/${_id}`)
       }


       const editProfile = ()=>{
        if(user?.result?._id===author?._id){
            navigate(`/author/${author?._id}/edit`)
        }

       }


       

    return (
    <Paper style={{padding: '20px', borderRadius: '15px'}} elevation={6}>
         <div className={classes.card}>
            <div className={classes.section}>
            <div style={{display:'flex', justifyContent:'space-between'}}>
            <div style={{display:'flex', justifyContent:'start'}}>
            <img className={classes.media} style={{width:'200px', height:'200px'}} src={ author?.image || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={author?.name} />
                <div style={{padding:'30px'}}> <Typography variant="h3" component="h2" >{author?.name}</Typography>
                <Typography gutterBottom variant="body1" component="p">{author?.bio}</Typography>
                <Typography gutterBottom variant="body1" component="p">Contact : {author?.contact}</Typography>
                </div>
            </div>

            {/* EDIT BUTTON */}
            {
                user?.result?._id===author?._id?(
                    <Button variant="contained" size="small" onClick={editProfile}>Edit</Button>
                ):(
                    <div></div>
                )

            }
            </div>            
            </div>
            </div>
            <Divider style={{ margin: '20px 0' }}/>
            {/* ////////////////////////////////////////////////////// */}
            {posts.length ? (
                <div className={classes.section}>
                <Typography gutterBottom variant='h5'>Posts by {author?.name}</Typography>
                <Divider/>
                {/* </div><div> */}
                
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
            {
                posts.map(({title, description, authorName, image, _id, likes})=>{
                return(
              
                    <Grid item key={_id} xs={3} sm={3} md={3} lg={3}>
                     <div style={{margin:'20px', cursor:'pointer', width: '50%'}} variant='outlined' onClick={()=>openPost(_id)} key={_id}>
                            <Typography gutterBottom variant="h6">{title}</Typography>
                            <img src={image||'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} width='200px' alt='image'/>
                            <Typography gutterBottom variant="subtitle2">{authorName}</Typography>
                            {/* <Typography gutterBottom variant="subtitle2">{description}</Typography> */}
                            <Typography gutterBottom variant="subtitle1">Likes : {likes.length}</Typography>
                            
                            
                        </div>
              
                    </Grid>
                   
                )})
            }
             
            </Grid>
            </div>) : <div></div>} 
            
            
            {/* {posts.length ? (
                <div className={classes.section}>
                <Typography gutterBottom variant='h5'>Posts by {author?.name}</Typography>
                <Divider/>
                <div className={classes.recommendedPosts}>
                    {posts.map(({title, description, authorName, image, _id, likes})=>(
                        <div style={{margin:'20px', cursor:'pointer', width: '20%'}} variant='outlined' onClick={()=>openPost(_id)} key={_id}>
                            <Typography gutterBottom variant="h6">{title}</Typography>
                            <img src={image||'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} width='200px' alt='image'/>
                            <Typography gutterBottom variant="subtitle2">{authorName}</Typography>
                            {/* <Typography gutterBottom variant="subtitle2">{description}</Typography> */}
                            {/* <Typography gutterBottom variant="subtitle1">Likes : {likes.length}</Typography> */}
                            
                            
                        {/* </div>
                    ))}
                </div>
            </div>
            ) : <div></div>} */}

        
        


    </Paper>
  )
}

export default Profile