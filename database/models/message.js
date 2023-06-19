module.exports=(sequelizer,Sequelizer)=>{
    var msg = sequelizer.define('messages',{
        message:Sequelizer.STRING,
        from:Sequelizer.INTEGER,
        to:Sequelizer.INTEGER
    })

    msg
       .sync()
       .then(function(data){
        console.log(data)
       })
    return msg
}