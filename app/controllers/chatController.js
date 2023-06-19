const jwt = require('jsonwebtoken');
const { user } = require('../../database/index')
const { messages } = require('../../database/index');
const { EventEmitter } = require('events');
const msGs = new EventEmitter() 

var messagingController = {
    chat: (req,res) => {
        const { email,message } = req.body
        const from = req.cookies.token
    
        var useremail;
    
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
        user.findOne({
            where:{
                email:email
            }
        }) 
           
          .then( data => {
            if(!data){
                res.render('home',{
                    errors:`Try another email ${email} not found`
                })
            }
            else{
                if(data.dataValues.email == useremail.email)
                {
                    res.render('home',{
                        errors:`This is your email please try another`
                    })
                }
                else{
                    messages.create({
                        message:message,
                        to:email,
                        from:useremail.email,
                      })
                    res.render('home',{
                        errors:''
                    })
                }
            }
          })
    },

    // received: (req,res) => {
    //     const from = req.cookies.token
    //     var useremail
    //     if(from)
    //     {
    //         try{
    
    //             useremail = jwt.verify(from,process.env.JWT_KEY)
    //         }
    //         catch(e){
    //             if(e.instanceof(jwt.JsonWebTokenError)) res.end()
    //             res.end()
    //         }
    //     }
    //     messages.findAll({
    //         where:{
    //             to:useremail.email
    //         }
    //     }) 
           
    //       .then( data => {
    //         if(data[0] == undefined){
    //             res.render('messages',{
    //                 datas:'false',
    //                 from
    //             })
    //         }
    //         else{
    //             res.render('messages',{
    //                 datas:data,
    //             })
    //         }
    //       })
          
    // },

    sent: (req,res) => {
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
        messages.findAll({
            where:{
                from:useremail.email
            }
        }) 
           
          .then( data => {
            if(data[0] == undefined){
                getAll(useremail.email,req,res,data)
            }
            else{
                getAll(useremail.email,req,res,data)
            }
          })          
    }

}

module.exports = messagingController

function getAll(fromData,req,res,data){

    var dataValues;
    messages.findAll({
        where:{
            to:fromData
        }
    })
        .then( datas =>{

            if(datas[0] == undefined){
                res.render('messages',{
                    datas:data,
                    fromDatas:'false'
                })
            }
            else{
                res.render('messages',{
                    datas:data,
                    fromDatas:datas
                })
            }
        })
        .catch(err =>{
            console.log(err.msg)
        })
}