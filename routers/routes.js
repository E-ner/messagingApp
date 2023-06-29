const app = require('express')();
const SiteController = require('../app/controllers/SiteController')
const LoginController = require('../app/controllers/loginController')
const RegisterController = require('../app/controllers/registerController')
const auth = require('../app/middleware/isAuthenticated')
const homeAuth = require('../app/middleware/homeAuth')
const LogoutController = require('../app/controllers/logoutController')
const sendMsg = require('../app/controllers/chatController')
const sendUser = require('../app/controllers/chatController').getUser;


app.get('/',homeAuth)
app.get('/login',auth,SiteController.login)
app.get('/register',SiteController.register) 
app.get('/home',homeAuth)
app.get('/sent',sendMsg.sent)
app.post('/login',LoginController)
app.post('/register',RegisterController)
app.get('/logout',LogoutController)
app.post('/send',sendMsg.chat)
app.get('/user',sendUser)
app.get('*',homeAuth)

module.exports = app