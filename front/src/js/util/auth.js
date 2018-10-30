import user_model from '../models/user';

const _none = () => {}

// 返回用户登录状态
const userSigninState = async () => {
    let isSignIn = await user_model.isSignIn();
    return isSignIn.code === 200
}
// 验证用户登录状态
const userSigninAuth = async (success = _none, fail = _none) => {
    let auth = await userSigninState();
    if ( auth ) {
        success(auth)
        return true; 
    } else {
        fail()
        return false
    }
}

export  {
    userSigninState,
    userSigninAuth
}

export default {
    userSigninState,
    userSigninAuth
}