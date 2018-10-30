import contentHeader_models from '../models/contentHeader';
import qs from 'querystring';
import {toast} from '../util';
import admin_template from '../views/admin-forms.html';


const render = (type) => {

    let _html = template.render(admin_template,  {type: type })

    $('#admin-forms').html(_html);
    
    bindEvent();
    
}

const bindEvent = () => {
    $("#SignUp button[type='button']").on('click',function(){
        render('signin');
    })
    $("#SignIn button[type='button']").on('click',function(){
        render('signup');
    })
    $("#signup-form").on("submit", async function(e){
        e.preventDefault();
        var form_data = qs.parse( $(this).serialize() );
        var result = await contentHeader_models.registe(form_data)

        if(result.code == 200){
            toast("注册成功,请登录", ()=>{
                render('signin');
            })
        }else{
            toast("用户名已注册，请重新注册", ()=>{
                render('signup');
            })
        }
    })
    $("#signin-form").on("submit", async function(e){
        e.preventDefault();
        var form_data = qs.parse( $(this).serialize() );
        var result = await contentHeader_models.login(form_data)
        if(result.code == 200){
            toast("登录成功", ()=>{
                window.location.href="/"
            })
        }else if(result.code == 201){
            toast("用户名不存在", ()=>{
                render('signin');
            })
        }else if(result.code == 202){
            toast("密码错误", ()=>{
                render('signin');
            })
        }
    })
}

export default {
    render
}