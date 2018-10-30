
import SMERouter from 'sme-router'

import home_template from '../views/home.html';

import not_found_template from '../views/404.html';

import position_controller from '../controllers/position';

import content_header_model from '../models/contentHeader';

import content_header_template from '../views/content-header.html';

import bus from '../util/bus';

var prevUrl = '';

const _init = ()=>{

    const router = new SMERouter('router-view')

    // 中间件会先执行
    router.use((req, res, next) => {
        _activeLink(req.route) 
    })
    
    router.route('/', contentHeader_controller);
    
    router.route('/home', (req, res, next) => {
        res.render(home_template);
    })

    router.route('/position_list', position_controller.list)

    router.route('/position_save', position_controller.save)

    router.route('/position_update', position_controller.update)

    // router.route('/position_update_no', position_controller.update)

    router.route('/not-found', (req, res, next) => { // 当路由切换进来的时候执行
        res.render(not_found_template)
    })
    
    router.route('*', (req, res, next) => {
        if ( req.url === '' ) { // 刚进入项目，没有hash值，重定向到home
            res.redirect('/home')
        } else { // 如果路径匹配不到，导向404
            res.redirect('/not-found')
        }
    })

    // 给bus绑定事件
    bus.on('go', (path, body = {}) => {
        router.go(path,body)
    })
    bus.on('back', () => {
        router.back()
    }) 
}

const _activeLink = (route) => {
    let $navs = $('.sidebar-menu li[to]')
    $navs.filter(`[to='${route}']`)
         .addClass('active')
         .siblings()
         .removeClass('active')
    
}

const contentHeader_controller = ( req, res, next ) => {

    // 这里的prevUrl就是上一次的URL
    let data = content_header_model.contentHeaderInfo(req.url, prevUrl);
    prevUrl = req.url;

    let html = template.render(content_header_template, data)  
    $('#content-header').html(html);
}

export default {
    init:_init
}