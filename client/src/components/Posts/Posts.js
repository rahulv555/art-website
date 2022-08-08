import React, { useEffect } from 'react'
import Post from './Post/Post'
import useStyles from './styles.js'
import { CircularProgress, Divider, Grid } from '@material-ui/core'

//accessing the global redux store 
import { useSelector } from 'react-redux'


export default function Posts({setCurrentId}) {
  //for the styles
  const classes = useStyles()
  const {posts, isLoading}= useSelector((state)=>state.posts)  //from reducers/index.js


  // useEffect(()=>{
  //   posts.sort((a, b)=>{
  //     return b.likes.length - a.likes.length   //sort in descending order of likes
  //   })
  // }, [posts])


    if(!posts.length && !isLoading) return 'NO POSTS'

    return (
    isLoading?<CircularProgress />:(

    <div>
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {
          posts.map((post)=>{
            return(
              
            <Grid item key={post._id} xs={12} sm={12} md={12} lg={12}>
              <Post post={post} setCurrentId={setCurrentId}></Post>
              
            </Grid>
          )})
        }
      </Grid>
        
    </div>
    )
  )
}
