const { handleData } = require('../util')
const admin_model = require('../models/admin')


//注册
const registe = async (req, res) => {
    //判断是否有此用户
    var find = await admin_model.findOne({ username: req.body.username });
    var data = {};
    if(find){
        data = {
            code: 201,
            data:JSON.stringify({"msg":"用户名已注册"})
        }
    }else{
        if(!req.body.nickname){
            req.body.nickname = req.body.username;
        }
        data = await admin_model.registe(req.body);
    }
    res.render('admin',data);
}

//登录
const login = async (req, res) => {
    //判断是否有此用户
    var find = await admin_model.findOne({ username: req.body.username });
    var data = {};
    if(find){
        var flag =  admin_model.login(req.body.password, find.password);
        if(flag){
            req.session.userinfo = {
                userid: find._id,
                level: find.authority
            }
            console.log(1);
            
            data = {
                code: 200,
                data:JSON.stringify({
                    username: find.username,
                    nickname: find.nickname,
                    authority: find.authority
                })
            }
        }else{
            data = {
                code: 202,
                data:JSON.stringify({"msg":"密码错误"})
            }
        }
    }else{
        data = {
            code: 201,
            data:JSON.stringify({"msg":"用户名不存在"})
        }
    }
    res.render('admin',data);
    
}

module.exports = {
    registe,
    login
}