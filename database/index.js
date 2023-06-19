const Sequelizer = require('sequelize')
const sequelizer =  new Sequelizer('chatApp','root','',{
    host:'localhost',
    dialect:'mysql',
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

module.exports = db;