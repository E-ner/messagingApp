const jwt = require('jsonwebtoken')
const { user } = require('../../database/index')

module.exports = (req,res) => {
    var email;

    if(req.cookies.token){
        try{

            email = jwt.verify(req.cookies.token,process.env.JWT_KEY)
        }
        catch(e){
            if(e.instanceof(jwt.JsonWebTokenError)) res.end()
            res.end()
        }
        user.findOne({
            where:{
                email:email.email
            }
        }) 
           .then( data => {
           
               if(!data){
                res.redirect('/register')
               }
               else{
                data.update({
                  status:0
                })
               }
               res.clearCookie('token')
               res.redirect('/')
           })
    }

    else{
        res.redirect('/login')
    }
} 