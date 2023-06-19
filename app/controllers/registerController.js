const { user } = require('../../database/index')
const jwt = require('jsonwebtoken');
const bcrypt= require('bcrypt')

module.exports= (req,res)=>{

    var {names,email,password} = req.body

    try {
        bcrypt.hash(password,124)
    } catch (error) {
        if(error.instanceof(JsonWebTokenError)){
            res.status(401).end()
        }
        res.status(400).end()
    }


   var token= jwt.sign({names,password},'THE KEY',{
        algorithm:HS256,
        expiresIn:'1d'
    })
    var cookie= cookie('token',token,{maxAge:86400})
    user.create({
        name:names,
        email:email,
        password:password
    })
       .then(data=>{
        console.log(data)
       })
}