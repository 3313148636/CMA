
import URL from 'url'

const contentHeaderInfo = (url, prevUrl) => {
    let _urlinfo = URL.parse(url)
    
    let _pathname = _urlinfo.pathname
    // search ?  是url种解析出来的 ?a=1&b=2&search
    // let _search = URL.parse(prevUrl).search

    let _infos = {
        '/home': {
            title: '首页',
            list: []
        },
        '/position_list': {
            title: '商家信息',
            description: '信息列表',
            list: [
                { text: '信息列表' }
            ]
        },
        '/position_save': {
            title: '商家信息',
            description: '添加信息',
            list: [
                { text: '信息列表', path: prevUrl},
                { text: '添加信息'}
            ]
        },
        '/position_update': {
            title: '商家信息',
            description: '更新信息',
            list: [
                { text: '信息列表', path: prevUrl},
                { text: '更新信息'}
            ]
        }
    }
    return _infos[_pathname] || {  }
}

const registe = (data) => {
    return $.ajax({
        url: '/api/v1/admin/registe',
        type: 'post',
        data,
        success:(results) => {
            return results;
        }
    })
}

const login = (data) => {
    return $.ajax({
        url: '/api/v1/admin/login',
        type: 'post',
        data,
        success:(results) => {
            return results;
        }
    })
}

export default {
    contentHeaderInfo,
    registe,
    login
}