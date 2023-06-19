module.exports=(sequelizer,Sequelizer) => {
    var users = sequelizer.define('users',{
        name:Sequelizer.STRING,
        status:Sequelizer.BOOLEAN,
        email:Sequelizer.STRING,
        password:Sequelizer.STRING
    })

    users
       .sync()
    return users
}