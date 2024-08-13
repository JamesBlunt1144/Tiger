const Users = require('../models/UserModels')
const bcrypto = require('bcryptjs')
const { batchInsert } = require('../settings/db')
const jwt = require('jsonwebtoken')
const {secret} = require('../config/config')


exports.register = async(req,res)=>{
    const user = await Users.query().where('login',req.body.login).first()
    if(user) {
        return res.status(400).json({success: false, msg: "Foydalanuvchi mavjud"})
    }
    const salt = await bcrypto.genSaltSync(10)
    const password = await bcrypto.hashSync(req.body.password, salt)
    await Users.query().insert({    
        name: req.body.name,
        birthday: req.body.birthday,
        passport_series: req.body.passport_series,
        phone_number: req.body.phone_number,
        login: req.body.login,
        password: password,
        
    })
    return res.status(201).json({success:true})
};

exports.auth = async(req,res) => {
    const user = await Users.query().where('login',req.body.login)
    if(!user) {
        return res
        .status(404)
        .json({success: false , err: "user-not-found"})
    }
const payload = {
    id: user.id,
 }
 const token = await jwt.sign(payload, secret , {expiresIn: "id"}) 
return res.status(200).json({success: true, token: token})
}


exports.getHome = (req, res) => {
    return res.json({ success: true, msg: "Foydalanuvchi yaratish" })
}

exports.getOneUser = async (req, res) => {
    const user = await Users.query().where('id', req.params.id).first()
    return res.json({ success: true, user: user })
}

exports.getAllUsers = async (req, res) => {
    console.log(1)
    const user = await Users.query().select('*')
    console.log(user)
    return res.status(200).json({ success: true, user: user })
}




