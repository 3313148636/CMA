const mongoose = require('../util/mongoose');

const UserModel = mongoose.model('admins');

const getUserInfoById = (id) => {
    return UserModel
        .findById(id)
        .then((result)=>{
            return result;
        })
        .catch((err)=>{
            return false;
        })
}

const auths = () => {
    return {
        'list': 1,
        'list-remove': 5
    }
}

module.exports = {
    getUserInfoById,
    auths
}