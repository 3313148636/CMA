const mongoose = require('../util/mongoose')
const Moment = require('moment')
const fs = require('fs-extra')
const Path = require('path')

var PositionModel = mongoose.model('positions',new mongoose.Schema({
    city: String,
    positionName: String,
    companyName: String,
    salary: String,
    createTime: String,
    formatTime: String,
    companyLogo: String
}));

const listAll = (_query = {}) => {
    // limit skip
    return PositionModel.find(_query).sort({createTime: -1})
        .then((results) => {
            return results
        })
        .catch((err) => {
            return false
        })
}

const list = async ({pageNo = 1,pageNum = 5, search = ''}) => {
    // limit skip
    let reg = new RegExp(search, 'g');
    let _query = { // 匹配各个字段值只要有一个字段含有关键字
        $or: [
            { companyName: reg },   
            { positionName: reg },   
            { city: reg },   
        ]
    }
    var _item = await listAll(_query);
    
    return PositionModel.find(_query)
        .sort({createTime: -1})
        .skip((pageNo - 1) * pageNum)
        .limit(~~pageNum)
        .then((results) => {
            return {
                results,
                pageTotal: _item.length,
                pageSize: Math.ceil(_item.length/pageNum),
                pageNo: ~~pageNo,
                pageNum: ~~pageNum,
                search: search
            }
        })
        .catch((err) => {
            return false
        })
}

const save = (body)=>{
    
    let _timestamp = Date.now();
    let moment = Moment(_timestamp);

    return new PositionModel({
        ...body,
        createTime: _timestamp,
        formatTime: moment.format("YYYY-MM-DD, hh:mm")
    })
    .save()
    .then((results)=>{
        return results
    })
    .catch((err)=>{
        return false
    })
}

const listone = ({_id}) => {
    return PositionModel.findById(_id)
        .then((results)=>{
            return results;
        })
        .catch((err)=>{
            return false;
        })
}

const remove = async ({ id }) => {
    let _row = await listone({ _id: id })
    return PositionModel.deleteOne({_id: id})
        .then((results)=>{
            results.deleteId = id;
            if(_row.companyLogo){
                fs.removeSync(Path.resolve(__dirname, '../public'+_row.companyLogo))
            }
            return results;
        })
        .catch((err)=>{
            return false;
        })
}

const update = (body) => {
    let {republish, img, companyLogo} = body;
    if(republish !== undefined){
        let _timestamp = Date.now();
        let moment = Moment(_timestamp);
        body.createTime = _timestamp;
        body.formatTime =  moment.format("YYYY-MM-DD, hh:mm");
    }
    if(companyLogo !== undefined){
        fs.removeSync(Path.resolve(__dirname, '../public'+ img))
    }
    return PositionModel.updateOne({ _id: body.id },{...body})
        .then((results)=>{
            return results;
        })
        .catch((err)=>{
            return false;
        })
}

module.exports = {
    list,
    save,
    listone,
    update,
    remove
}