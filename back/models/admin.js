const mongoose = require('../util/mongoose')
const Moment = require('moment')
const fs = require('fs-extra')
const Path = require('path')
const { hash } = require('../util')
const bcrypt = require('bcrypt');


var adminModel = mongoose.model('admins',new mongoose.Schema({
    username: String,
    password: String,
    nickname: String,
    createTime: String,
    formatTime: String,
    authority: String
}));

const findOne = (query) => {
    return adminModel.findOne(query)
    .then((results)=>{
        return results;
    })
    .catch((err)=>{
        return false;
    })
}

const registe = async (body)=>{
    
    let _timestamp = Date.now();
    let moment = Moment(_timestamp);
    
    let _password = hash(body.password);
    body.password = _password;
    return new adminModel({
        ...body,
        authority: 1,
        createTime: _timestamp,
        formatTime: moment.format("YYYY-MM-DD, hh:mm")
    })
    .save()
    .then((results)=>{
        return {
            code: 200,
            data: JSON.stringify({
                username: results.username,
                nickname: results.nickname
            })
        }
    })
    .catch((err)=>{
        return false
    })
}

const login = (password, _password) => {
    return bcrypt.compareSync( password , _password);
}

module.exports = {
    registe,
    login,
    findOne
}