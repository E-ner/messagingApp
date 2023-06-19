var SiteController={
    index: (req,res)=>{
        res.render('index')
    },
    login:(req,res)=>{
        res.render('login')
    },
    register:(req,res)=>{
        res.render('register')
    },
    home:(req,res)=>{
        res.render('home')
    }
}

module.exports = SiteController