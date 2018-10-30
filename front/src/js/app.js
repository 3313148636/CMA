// 引入样式
import '../css/app.scss'

import router from './router/index.js';

import body_template  from './views/body.html';

import { userSigninAuth } from './util/auth';

import user_controller from './controllers/user';

// 登录验证
userSigninAuth((auth) => { // 如果用户已经登录
    // 渲染整体内容结构
    $('#wrapper').html(body_template)
    // 启动路由
    router.init()
    //渲染用户信息
    user_controller.renderUserInfo();
}, () => { // 没有登录，直接跳转到admin
    window.location.href="/admin.html"
})

