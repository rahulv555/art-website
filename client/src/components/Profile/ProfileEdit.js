import React, {useState, useEffect} from 'react'
import useStyles from './editstyles.js'
import { TextField, Button, Typography, Paper } from '@material-ui/core'

//to fill in the form if editing
import { useSelector } from 'react-redux'

//for image
import FileBase from 'react-file-base64'

import { useDispatch } from 'react-redux'
import { createPost, updatePost } from '../../actions/posts'
import { updateLocale } from 'moment'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { updateAuthor } from '../../actions/author.js'

export default function Form() {
  //for the styles
  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {id} = useParams(); //to get the current id from the parameter 
  const currentId = id
  console.log(currentId)


  


  //to display the currentpost if editing
  const {author}  = useSelector((state)=>state.author)
  useEffect(()=>{
    setAuthorData(author)
  },[author]) 




  //the current user
  const user = JSON.parse(localStorage.getItem('profile'))


    


  const [authorData, setAuthorData] = useState({
    bio:'',
    contact:'',
    image:'',
  })

  const handleSubmit = (e)=>{
    e.preventDefault();
    
      user.result.image =authorData.image
      localStorage.setItem('profile', JSON.stringify(user)) //to update image in the navbar
      dispatch(updateAuthor(currentId, authorData, navigate)) //edit

    
    //clear()
    navigate(`/author/${currentId}`)
  }




  //if no user
  if(!user?.result?.name){
    return(
      <Paper className={classes.paper}>
        <Typography variant='h6' align='center'>
          Please Sign in
        </Typography>
      </Paper>
    )
    
  }

  

  
  //to prevent hardcoding the url in the browser by another user
  if(currentId && id!==user?.result?._id){
    return(
      <Paper className={classes.paper}>
        <Typography variant='h6' align='center'>
          You do not have permission for this
        </Typography>
      </Paper>
    )
  }

  
  // const clear = ()=>{
  //   setCurrentId(currentId+1)
  //   setCurrentId(null)
  //   setPostData({
  //   title:'',
  //   description:'',
  //   image:'',})
  // }

  

  return (
    <Paper className={classes.paper}>
        <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit = {handleSubmit}>
            <Typography variant="h6">Edit Profile</Typography>
            {/* <TextField 
                name = 'author' 
                variant='outlined' 
                label='Created by' 
                fullWidth
                value={postData.author}
                onChange={(event)=>setPostData({ ...postData, author: event.target.value})}// this means, only the property of that textfield will change
                />  */}

            <TextField 
                name = 'bio' 
                variant='outlined' 
                label='Bio' 
                fullWidth
                value={authorData.bio}
                onChange={(event)=>setAuthorData({ ...authorData, bio: event.target.value})}// this means, only the property of that textfield will change
                /> 

            
            
            <div className={classes.fileInput}>
                <FileBase
                    type="file"
                    multiple={false}
                    onDone={({base64})=>setAuthorData({...authorData, image: base64})}
                />
            </div>

          

            <TextField 
                name = 'contact' 
                variant='outlined' 
                label='Contact' 
                fullWidth
                value={authorData.contact}
                onChange={(event)=>setAuthorData({ ...authorData, contact: event.target.value})}// this means, only the property of that textfield will change
                /> 

            <Button className={classes.buttonSubmit} variant="contained" color='primary' size='large' type="submit" fullWidth>Submit</Button>
            {/* <Button  variant="contained" color='secondary' size='small' onClick={clear} fullWidth>Clear</Button> */}
           
        </form>
    </Paper>
  )
}
