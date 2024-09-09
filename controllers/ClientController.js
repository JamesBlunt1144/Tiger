const Clients = require('../models/ClientModels')

exports.getAllClients = async (req,res)=>{
    const knex = await Clients.knex()
    const client = await knex.raw(`SELECT * FROM client`)
    

    return res.json({success: true, client: client[0]})
}
