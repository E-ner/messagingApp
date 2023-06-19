const bodyParser= require('body-parser')
const express = require('express');
const ejs= require('ejs')
const app = express();
const cookiParser= require('cookie-parser')
const routes = require('../routers/routes')
app.use(express.static('public'))
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:true}));
app.use(routes)
app.listen('1200')
console.log('listening on http://127.0.0.1:1200')