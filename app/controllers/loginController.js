const user = require('../../database/index').user
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
dotenv.config({ path:'./.env' })

module.exports = ( req,res ) => {
    const { email,password } = req.body
        user.findOne({
            where:{
                email:email
            }
        }) 
           .then( data => {
           
               if(!data){
                res.render('login',{
                    error:'The credentials not found'
                })
               }
               else{
                const name = data.dataValues.name
                const passwords =  data.dataValues.password
    
                bcrypt.compare(password,passwords)
                      .then((login) => {
                        if(login == true){
                            data.update({
                                status:1
                            })
                            var token = jwt.sign({email,password},process.env.JWT_KEY,{
                                algorithm:'HS256',
                                expiresIn:'1d'
                            })
                            res.cookie('token',token,{expire: 36000*1000 });  
                            res.redirect('/home') 
                        }
                
                        else{
                            res.render('login',{
                                errors:'Credentials not found'
                            })
                        }
                      })
                      .catch( error => {
                        console.log(error.msg)
                      })
                 
               }
           })
    }