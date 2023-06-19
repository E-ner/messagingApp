const jwt = require('jsonwebtoken')

const auth = (req,res)=>{
    if(isLoggedIn(req,res) != 0  && isLoggedIn(req,res) != null||undefined){
        res.render('home',{
            errors:''
        })
    }
    else{
        res.redirect('/login')
    }
}
module.exports = auth;

function isLoggedIn(req,res){
    try {
        const verify = jwt.verify(req.cookies.token,process.env.JWT_KEY)
        if( verify.email && verify.password ) return verify
        else return 0;
    } catch (error) {
        // if(error.prototype == jwt.JsonWebTokenError.prototype) res.status(401).end()
        // else res.status(401)
        //         .end()
    }
}