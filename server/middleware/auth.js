import jwt, {decode} from 'jsonwebtoken'


const secret = 'thisshouldntbeseenbyanyone'

//to check whos signed in and whether signed in
const auth = async(req, res, next)=>{
    try {

        
       
        const token = req.headers.authorization.split(" ")[1];
        
        const isCustomAuth = token.length < 500 //if less than 500, then it is ours, else google auth

        let decodedData
        if(token && isCustomAuth){
            decodedData = jwt.verify(token, secret) //gives the username and id

            req.userId = decodedData?.id
        }else{
            //google auth
            // decodedData = jwt.decode(token)
            // req.userId = decodedData?.sub
        }
        
        next();
    } catch (error) {
        console.log(error)
    }
}



export default auth