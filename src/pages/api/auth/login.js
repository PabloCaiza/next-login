import jwt from 'jsonwebtoken'
import cookie from 'cookie'
export default function loginHandler(req,res){
    const {email,password}=req.body;
    if(email=="pablocaiza1998@gmail.com" && password=="123"){
        const token=jwt.sign({
            exp: Math.floor(Date.now()/1000)+60*60,
            "email":email,
            "username":'pablo'
        },"secret1234#@!$%545dfsAsd#@!")
        const setCookie = cookie.serialize('token', token,{
            httpOnly:true,
            secure:false,
            sameTime:'none',
            maxAge:1000*60*60*24*30,
            path:'/'
        })
        res.setHeader('Set-Cookie', setCookie)
        return res.json(setCookie)
    }
    return res.status(401).json('invalid password or email')

}