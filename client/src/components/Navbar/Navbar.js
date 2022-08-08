import React, { useEffect } from 'react'
import { AppBar, Avatar, Toolbar, Typography , Button} from '@material-ui/core'
import useStyles from './styles'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import decode from 'jwt-decode'

import logo from '../../images/logo.jpeg'

//to make the Title link to home, make stuff multiplage
import {Link, BrowserRouter as Router, Switch, Route, Navigate, useNavigate, useLocation} from 'react-router-dom'
import { LOGOUT } from '../../constants/actionConstants'

const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const[user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    // const user = null


    

    useEffect(()=>{
        const token = user?.token

        //JWT
        if(token){
            const decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime()){
                logout();
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')))

    }, [location])


    const logout = ()=>{
        
        dispatch({type:LOGOUT})
        
        
        navigate('/')
        setUser(null)
        window.location.reload(false); //NEED TO FIX, TEMPORARILY FIX BY
    }

  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
        <div className={classes.brandContainer}>
            <Typography  component={Link} to='/' className={classes.heading} variant = 'h2' align="center">Art Gallery</Typography>
            <img className={classes.image} src={logo} alt='logo' height="60"/> 
            
        </div>
        <Toolbar className={classes.toolbar}>
            {user ? ( //logged in
                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user.result.name} src={user.result.image}>
                        {user.result.name.charAt(0)}
                    </Avatar>
                    
                    <Typography onClick={()=>{navigate(`/author/${user.result._id}`)}} className={classes.username} variant="h6">
                        {user.result.name}
                    </Typography>

                    <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                </div>
            ):(
                //not logged in
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign in</Button>
                
            )}
        </Toolbar>
    </AppBar>
  )
}

export default Navbar




