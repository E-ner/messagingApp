const jwt = require('jsonwebtoken')

const auth = (req,res)=>{
    if(isLoggedIn(req,res) == true){
        res.redirect('/home');
    }
    else{
        res.render('login',{
            errors:''
        })
    }
}
module.exports = auth;

function isLoggedIn(req,res){
    try {
        const verify = jwt.verify(req.cookies.token,process.env.JWT_KEY)
        console.log(verify)
        if( verify.email && verify.password ) return true
        else return false;
    } catch (error) {
        // if(error.prototype == jwt.JsonWebTokenError.prototype) res.end()
        // res.end()
    }
}