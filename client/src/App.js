import React from 'react'
import {Container} from '@material-ui/core'
import Navbar from './components/Navbar/Navbar'

import useStyles from './styles.js'
import 'bootstrap/dist/css/bootstrap.min.css'


import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'

import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'
import PostDetails from './components/PostDetails/PostDetails'
import AddNew from './components/AddNew/AddNew'
import Form from './components/Form/Form'
import Profile from './components/Profile/Profile'
import ProfileEdit from './components/Profile/ProfileEdit'


export default function App () {
  const user = JSON.parse(localStorage.getItem('profile'));
  const classes=useStyles()

  return (
        <Container maxWidth='lg' className={classes.container}>
          <ErrorBoundary>
          <Router>
            <Navbar></Navbar>
            <Routes>
              <Route path='/' exact element={<Navigate to='/posts'/>}/>
              <Route path='/posts' exact element={<Home/>}/>
              <Route path='/posts/search' exact element={<Home/>}/>
              <Route path='/posts/:id' exact element={<PostDetails/>}/>
              <Route path='/auth' exact element={(!user?<Auth/>:<Navigate to='/posts'/>)}/>
              <Route path='/posts/add' exact element={!user?<Auth/>:<AddNew/>}/>
              <Route path='/posts/edit/:id' exact element={!user?<Auth/>:<Form/>}/>
              <Route path='/author/:id' exact element={<Profile/>}/>
              <Route path='/author/:id/edit' exact element={<ProfileEdit/>}/>
            </Routes>
          </Router>
          </ErrorBoundary>
          

         

        </Container>
  )
}




//////////////////////////////////////////////////////////////////////////
//TO CATCH ERRORS IN COMPONENTS
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting service
      console.log(error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <h1>Something went wrong.</h1>;
      }
  
      return this.props.children; 
    }
  }