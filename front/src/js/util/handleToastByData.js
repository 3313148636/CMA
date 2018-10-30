
import toast from './toast'

const handleToastByData = ( data, options = {} ) => {

    let _none = () => {};

    let {isReact, success, fail} = {
        isReact : ( (typeof options.isReact) !== 'undefined' ) ? options.isReact : true,
        success : options.success || _none,
        fail : options.fail || _none
    }

    if(data.code == 200) {
        if(isReact) toast('操作成功', success, data);
    }else{
        if(isReact) toast('操作失败', fail, data);
    }
}

export default handleToastByData

