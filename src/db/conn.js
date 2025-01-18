import { Sequelize } from "sequelize";

const sequelize = new Sequelize('deposito','root','root',{
    dialect:'mysql',
    host: 'localhost'
})
try{
    sequelize.authenticate()
}catch(err){
    console.log(err)
}

export default sequelize
