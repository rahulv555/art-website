import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken' //to safely store the user in broswer for some time


import User from '../models/User.js'

const secret = 'thisshouldntbeseenbyanyone'



export const signin = async(req, res)=>{
    try {
        console.log(req.body)
        const {email, password} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){   
            //checking password
            const isPassCorrect  = await bcrypt.compare(password, existingUser.password)
            if(isPassCorrect){
                console.log("logged in")
                const token = jwt.sign({email: existingUser.email, id:existingUser._id}, secret, {expiresIn:'1h'})//the info u want to store in the token
                return res.status(200).json({result: existingUser, token})
            }else{
                return res.status(400).json({message:"Invalid username or password"})
            }

        }else{
            return res.status(404).json({message:"Invalid username or password"})
        }


    } catch (error) {
        res.status(500)
    }
    

}




export const signup = async(req, res)=>{
    const {email, password, confirmPassword, firstName, lastName} = req.body;

    try {
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:'User already exists'})
        }else{

            if(password!==confirmPassword)return res.status(400).json({message:'Passwords dont match'})
            else{

                const hashedPassword = await bcrypt.hash(password, 12)
                const result = await User.create({email, password: hashedPassword, name:`${firstName} ${lastName}`});
                const token = jwt.sign({email: result.email, id:result._id}, secret, {expiresIn:'1h'})//the info u want to store in the token
                return res.status(200).json({result, token})  

            }

        }
        
    } catch (error) {
        res.status(500)
    }
}

