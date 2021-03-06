const bcrypt = require('bcrypt');

const none = () => {}

// 返回错误代码
const handleData = (data, res, template, callbacks = {}) => {
    let { success, fail } = {
        success: callbacks.success || none,
        fail: callbacks.fail || none
    }
    if ( !data ) {
        fail()
        response.call(res, { template, code: 500, data: '发生了不可预知的错误' })
        
    } else {
        success()
        response.call(res, { template, code: 200, data:  JSON.stringify(data)})
    }
}
// 响应
const response = function ({ template, code, data }) {
    this.render(template, {
        code: code,
        data: data
    })
}

const hash = (textplain) => {  

    const saltRounds = 10;
    //随机生成salt
    const salt = bcrypt.genSaltSync(saltRounds);
    //获取hash值
    var hash = bcrypt.hashSync(textplain, salt);
     //把hash值赋值给password变量
    return hash;
    
}

module.exports = {
    handleData,
    hash
}