const user = require('../../database/index')

module.exports= (req,res)=>{
    const {email,password} = req.body
    console.log(email,password)
    res.end()
}