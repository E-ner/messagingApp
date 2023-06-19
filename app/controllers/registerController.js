const { user } = require('../../database/index')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
dotenv.config({ path:'./.env' })

module.exports = ( req,res ) => {

    var { names,email,password,confirm } = req.body

    if( password === confirm ){
      user.findOne({
        where:{
            email:email
        }
    }) 
          .then( data => {
            if(data){
                res.render('register',{
                  errors:'Try another email, email arleady exists'
                })
            }
            else{
              bcrypt.hash( password,12 )
              .then( dat => {
              var token = jwt.sign( { email:email,password:password },process.env.JWT_KEY,{
                  algorithm:'HS256',
                  expiresIn:'1d'
              } )
              res.cookie( 'token',token,{ expire: 360000*1000 } )
              user.create({
                name:names,
                password:dat,
                email:email,
                status:1
              })
              res.redirect('/home')
    
              })
              .catch( err => {
                if( err ) console.error(err.message)
              })
            }
          })
        }
      else{
        res.render('register',{
          errors:"The password doesn't match"
        })
      }
}