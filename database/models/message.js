module.exports=(sequelizer,Sequelizer)=>{
    var msg = sequelizer.define('messages',{
        message:Sequelizer.TEXT(''),
        from:Sequelizer.STRING,
        to:Sequelizer.STRING,
        connection:Sequelizer.STRING,
        created:Sequelizer.TIME
    })

    msg
       .sync()
    return msg
}

