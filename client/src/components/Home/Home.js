import React, {useState, useEffect} from 'react'
import {Container, Grow, Grid, Paper, AppBar, TextField, Button} from '@material-ui/core'
import useStyles from './styles'

//hook from react-redux
import {useDispatch} from 'react-redux'  //to dispatch an action

//actions
import {getPosts} from '../../actions/posts.js'
import { getPostsBySearch } from '../../actions/posts.js'

import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import Pagination from '../Pagination'
import { useNavigate,useLocation } from 'react-router-dom'


//URL SEARCH PARAMS  to extract
function useQuery(){
  return new URLSearchParams(useLocation().search)
}


const Home = () => {
      //for the styles
  const classes = useStyles()

  const query = useQuery()
  const navigate = useNavigate()
  const page = query.get('page') || 1 //reads url, and if page no. parameter, then populated this page with it
  console.log(page)
  const searchQuery = query.get('searchQuery')

  const dispatch = useDispatch() //to dispatch an action


  const[currentId, setCurrentId] = useState(null)
  const[searchTerm, setSearchTerm] = useState('')

  
  // useEffect(()=>{
  //   dispatch(getPosts());
  // }, [currentId,dispatch])


  //to search when click enter
  const handleKeyPress = (e)=>{
    if(e.keyCode===13){
      searchPost()
    }
  }


  const searchPost = ()=>{
    if(searchTerm.trim()){
      const searchT= searchTerm.replace(/\s+/g,'_')
      console.log(searchT)
      dispatch(getPostsBySearch(searchT))
      navigate(`/posts/search?searchQuery=${searchTerm||'none'}`)
    }else{
      navigate('/')
    }
  }



  const addPostForm = ()=>{
    navigate('/posts/add')
  }

  return (
    
    <Grow in>
        {/* grow provides animation */}
    <Container maxWidth='xl'>
      <Grid container justify='space-between' alignItems='stretch' spacing={3} className={classes.gridContainer}>
        <Grid item xs={12} sm={6} md={9}>
          <Posts setCurrentId={setCurrentId}/>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AppBar className={classes.appBarSearch} position='static' color='inherit'>
            {/* for search */}
            <TextField value={searchTerm} onKeyPress={handleKeyPress} name='search' variant='outlined' label='Search Posts' fullWidth onChange={(e)=>{setSearchTerm(e.target.value)}}></TextField>
            <Button className={classes.searchButton} onClick={searchPost} variant='contained' color='primary'>Search</Button>
          </AppBar>

          {/* <Form currentId={currentId} setCurrentId={setCurrentId}/> */}

          <Button className={classes.buttonSubmit} variant="contained" color='primary' size='large' fullWidth onClick={addPostForm}>Add New</Button>

          <Paper className={classes.pagination} elevation={6}>
              <Pagination page={page}/>
          </Paper>

        </Grid>
      </Grid>
    </Container>
  </Grow>
  )
}

export default Home