import React, {useState} from 'react'
import {Avatar, Button, Paper, Grid, Typography, Container, TextField} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './styles'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'

import Input from './Input'
import Icon from './Icon'

//for google login
import {GoogleLogin} from 'react-google-login'

//JWT auth
import {signin, signup} from '../../actions/auth'

const Auth = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)
    const [isSignup, setIsSignUp]=useState(false)
    const [formData, setFormData]=useState({firstName:'', lastName:'', email:'', password:'', confirmPassword:''})

    const handleSubmit = (e)=>{
        e.preventDefault()

        if(isSignup){
             dispatch(signup(formData, navigate))
        }else{
            dispatch(signin(formData, navigate))
        }


    }

    const handleChange = (e)=>{
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    const handleShowPassword = ()=>{
        return setShowPassword((prevShowPassword)=>!prevShowPassword)
    }

    const switchMode = ()=>{
        if(showPassword)handleShowPassword()
        return setIsSignUp((prevIsSignUp)=>!prevIsSignUp)
    
    }

    // const googleSuccess =async (res)=>{
        
    //     try {
    //         const result = res?.profileObject; //access profile object only if res exists
    //         const token = res?.tokenId;
    //         dispatch({type: 'AUTH', data:{result, token}})

    //         //to redirect
    //         navigate('/')
        

    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // const googleFailure = ()=>{
    //     console.log('Google sign in unsuccessful')
    // }


    return (
        <Container component='main' maxwidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography varient="h5">
                    {isSignup? 'Sign Up': 'Sign in'}
                </Typography>

                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup &&(
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
                                </>
                            )
                        }
                        <Input name="email" label="Email" handleChange={handleChange} type="email"/>
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword? 'text':'password'} handleShowPassword={handleShowPassword}/>
                    </Grid>

                    {/* confirmation if signing up */}
                    {isSignup && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password"></Input>}
                
                    {/* GOOGLE LOGIN */}
                        {/* <GoogleLogin
                            clientId='649645803483-55ah95c45phipmt180quqhc8hasdm5tl.apps.googleusercontent.com'
                            // render={(renderProps)=>(
                            //     <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon/>}>
                            //         Google Sign in
                            //     </Button>
                            // )}
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy="single_host_origin"
                        /> */}
                    {/* ///////////// */}
                        
                    <Button type="submit" fullWidth variant='contained' color="primary" className={classes.submit}>
                        {isSignup?'Sign Up':'Sign In'}
                    </Button>

                    <Grid item>
                        <Button onClick={switchMode}>
                            {isSignup?'Already have an account? Sign in':'New to the website? Sign up'}
                        </Button>
                    </Grid>
                </form>

            </Paper>
        </Container>
    )
    }

export default Auth