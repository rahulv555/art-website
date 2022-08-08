import React, {useState, useRef} from 'react'
import {Typography, TextField, Button} from '@material-ui/core'
import {useDispatch} from 'react-redux'

import useStyles from './styles';
import {commentPost} from '../../actions/posts'

function CommentSection({post}) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const[comments, setComments] = useState(post?.comments) //loaded comments
    const[comment, setComment] = useState()//new comment

    const user = JSON.parse(localStorage.getItem('profile'))

    const commentsRef = useRef()  //so that it autoscrolls to this bottommost comment, one new comment added


    const handleClick = async(e)=>{
        const newcomment = `${user.result.name} : ${comment}`
        const newComments = await dispatch(commentPost(newcomment, post._id)) //as we are returning data.comments in actions,
        setComments(newComments) //this helps in preventing reloading
        setComment('')
        commentsRef.current.scrollIntoView({behavior: 'smooth'});
    }

    return (
    <div>
        <div className={classes.commentsOuterContainer}>
            <div className={classes.commentsInnerContainer} fullWidth>
                <Typography gutterBottom variant='h6'>Comments</Typography>
                {comments?.map((c, i)=>(
                    <Typography key={i} gutterBottom variant='subtitle1'>
                        {c}
                    </Typography>
                    
                ))}
                <div ref={commentsRef}></div>
            </div>
            {user?.result?.name &&  
            <div style={{width:'50%'}}>
                <Typography gutterBottom variant='h6'>Write a comment</Typography>
                <TextField
                    fullWidth
                    rows={4}
                    variant='outlined'
                    label='Comment'
                    multiline
                    value={comment}
                    onChange={(event)=>setComment(event.target.value)}
                />
                <Button style={{marginTop:'10px'}} color='primary' fullWidth disabled={!comment} variant='contained' onClick={handleClick}>Comment</Button>
            </div>
        }
        </div>
    </div>
  )
}

export default CommentSection