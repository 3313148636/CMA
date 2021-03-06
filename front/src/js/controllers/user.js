import user_model from '../models/user';

const renderUserInfo = async () => {
    let _result = await user_model.info()
    console.log(_result)
    if ( _result.code !== 200 ) { // 用户没有登录信息
        alert('请重新登录')
        window.location.href = '/admin.html'
    } else {
        $('.nickname').html(_result.data.nickname);
        $('#exit').on('click', async function(){
            let _result = await user_model.exit();
            if ( _result.code === 200 ) {
                $.cookie('connect.sid', '', { expires: -1 })
                window.location.href = '/admin.html'
            }
        })
    } 
}

export default {
    renderUserInfo
}