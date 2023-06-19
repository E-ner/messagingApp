
var SiteController = {
    index: (req,res) => {
        res.render('index')
    },
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
        res.render('home',{
            errors:''
        })
    }
}

module.exports = SiteController