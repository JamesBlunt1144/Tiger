const Clients = require('../models/ClientModels')

exports.getAllClients = async (req,res)=>{
    const knex = await Clients.knex()
    const client = await knex.raw(`SELECT id, Name, Summa, DATE_FORMAT (TimeLimit, '%d/%m/%Y') as TimeLimit FROM client`)
    

    return res.json({success: true, client: client[0]})
}
 