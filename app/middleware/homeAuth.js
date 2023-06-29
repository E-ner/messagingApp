const jwt = require('jsonwebtoken')
const { user } = require('../../database/index')

const auth = (req,res)=>{
    if(isLoggedIn(req,res) != 0  && isLoggedIn(req,res) != null||undefined){
        home(req,res)
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

function home(req,res){
    const from = req.cookies.token

    var useremail

    if(from)
    {
        try{

            useremail = jwt.verify(from,process.env.JWT_KEY)
        }
        catch(e){
            if(e.instanceof(jwt.JsonWebTokenError)) res.end()
            res.end()
        }
    }
            user.findAll()
            .then( datas => {
                if(datas[0] == undefined){
                    res.render('messages',{
                        datas:'',
                        fromDatas:useremail.email,
                        users:datas,
                        to:''
                    })    
                }
                else{
                    res.render('messages',{
                        datas:'',
                        fromDatas:useremail.email,
                        users:datas,
                        to:''
                    })    
                }
             })       
}

