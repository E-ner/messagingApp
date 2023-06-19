const Sequelizer = require('sequelize')
const dotenv = require('dotenv')
dotenv.config({path:'./.env'})

const sequelizer =  new Sequelizer(process.env.DB_NAME,process.env.DB_USER,process.env.PASSWORD,{
    host:process.env.HOST,
    dialect:process.env.DIALECT,
    timestamps:true,
    pool:{
        min:0,
        max:1200,
        acquire:3000,
        idle:1200
    }
})

const db={}

db.user= require('./models/user')(sequelizer,Sequelizer);
db.messages =  require('./models/message')(sequelizer,Sequelizer)
module.exports = db;