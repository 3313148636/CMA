

const list = (data) => {
    return $.ajax({
        url: '/api/v1/position/list',
        data,
        success:(results) => {
            return results;
        }
    })
}

// const save = (data) => {
//     return $.ajax({
//         url: '/api/v1/position/save',
//         type: 'post',
//         data : data,
//         success: (results) => {
//             return results;
//         }
//     })
// }

const save = (data) => {
    return new Promise((resolve) => {
        $('.position-save #save-form').ajaxSubmit({
            url: '/api/v1/position/save',
            type: 'POST',
            success: (results) => {
                resolve(results)
            }
        })
    })
}

const listone = (data) => {
    return $.ajax({
        url: 'api/v1/position/listone',
        data: data,
        success: (results) => {
            return results;
        }
    })
}

const update_no = (data) => {
    return $.ajax({
        url: '/api/v1/position/update_no',
        type: 'post',
        data : data,
        success: (results) => {
            return results;
        }
    })
}

const update = (data) => {
    return new Promise((resolve) => {
        $('#update-form').ajaxSubmit({
            url: '/api/v1/position/update',
            type: 'POST',
            success: (results) => {
                resolve(results)
            }
        })
    })
}

const remove = (data) => {
    return $.ajax({
        url: 'api/v1/position/remove',
        data: data,
        success: (results) => {
            return results;
        }
    })
}

export default {
    list,
    save,
    listone,
    update,
    remove,
    update_no
}