const { handleData } = require('../util')
const position_model = require('../models/position')

//显示职位信息列
const list = async (req, res) => {
    console.log(req.query)
    let _data = await position_model.list(req.query);
    handleData(_data, res, 'position')
}

//添加职位信息
const save = async (req, res) => {
    let _data = await position_model.save(req.body);
    handleData(_data, res, 'position')
}

const listone = async (req, res) => {
    let _data = await position_model.listone(req.query)
    handleData(_data, res, 'position')
}

const update = async (req, res) => {
    let _data = await position_model.update(req.body)
    handleData(_data, res, 'position')
}

const remove = async (req, res) => {
    let _data = await position_model.remove(req.query)
    handleData(_data, res, 'position')
}

module.exports = {
    list,
    save,
    listone,
    update,
    remove
}