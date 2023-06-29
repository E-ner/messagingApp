const jwt = require('jsonwebtoken');
const { user } = require('../../database/index')
const { messages } = require('../../database/index');
const Sequelizer = require('sequelize')

var messagingController = {
    chat: (req,res) => {
        const { email,message } = req.body
        const from = req.cookies.token
        const hours = new Date().getHours()+':'+new Date().getMinutes();

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
            messages.create({
             message:message,
             to:req.cookies.email,
             from:useremail.email,
             created: hours
           })
           res.redirect('/sent')
    },
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
            where:Sequelizer.and(
                Sequelizer.or(
                    {to:useremail.email},
                    {from:useremail.email}
                ),
                Sequelizer.or(
                    {to:req.cookies.email},
                    {from:req.cookies.email}
                )
            )
        }) 
           
          .then( data => {
            if(data[0] == undefined){
                user.findAll()
                .then( datas => {
                    if(datas[0] == undefined){
                        res.render('messages',{
                            datas:data,
                            fromDatas:useremail.email,
                            users:datas,
                            to:req.cookies.email
                        })    
                    }
                    else{
                        res.render('messages',{
                            datas:data,
                            fromDatas:useremail.email,
                            users:datas,
                            to:req.cookies.email
                        })    
                    }
                 })    
          
            }
            else{
                user.findAll()
                .then( datas => {
                    if(datas[0] == undefined){
                        res.render('messages',{
                            datas:data,
                            fromDatas:useremail.email,
                            users:datas,
                            to:req.cookies.email
                        })    
                    }
                    else{
                        res.render('messages',{
                            datas:data,
                            fromDatas:useremail.email,
                            users:datas,
                            to:req.cookies.email
                        })    
                    }
                 })     
            }
          })          
    },


    //Getting selected user

    getUser: (req,res) => {
        const name = req.query.name;

        res.cookie('email',name,{expire: 36000*1000 });
        res.redirect('/sent');
    }

}

module.exports = messagingController