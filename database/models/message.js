module.exports=(sequelizer,Sequelizer)=>{
    var msg = sequelizer.define('messages',{
        message:Sequelizer.TEXT(''),
        from:Sequelizer.STRING,
        to:Sequelizer.STRING
    })

    msg
       .sync()
    return msg
}