const { user } = require('../../database/index')
var SiteController = {
    login: (req,res) => {
        res.render('login',{
            errors:''
        })
    },
    register: (req,res) => {
        res.render('register',{
            errors:''
        })
    },
    home: (req,res) => {
        getUsers(res)
    }
}

module.exports = SiteController

function getUsers(res){
    user.findAll()
         .then( data => {
            if(data[0] == undefined){
                res.render('message',
                {
                    user:'',
                    errors:''
                })
            }
            else{
                res.render('message',{
                    user:data,
                    errors:''
                })
            }
         })
}