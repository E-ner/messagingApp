const app = require('express')();
const SiteController = require('../app/controllers/SiteController')
const LoginController = require('../app/controllers/loginController')
const RegisterController = require('../app/controllers/registerController')
const auth = require('../app/middleware/isAuthenticated')

app.get('/',auth,SiteController.index)
app.get('/login',SiteController.login)
app.get('/register',SiteController.register) 
app.get('/home',auth,SiteController.home)
app.post('/login',LoginController)
app.post('/register',RegisterController)

module.exports = app