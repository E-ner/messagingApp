const bodyParser= require('body-parser')
const express = require('express');
const ejs= require('ejs')
const session =  require('express-session');
const dotenv = require('dotenv')
const app = express();
const cookiParser= require('cookie-parser')
const routes = require('../routers/routes')
app.use(express.static('public'))
dotenv.config({path:'./.env'})
app.set('view engine','ejs')
app.use(cookiParser(process.env.JWT_KEY))
app.use(bodyParser.urlencoded({extended:true}));
app.use(routes)
app.listen(process.env.PORT || 1200)
console.log('listening on http://127.0.0.1:1200')