
const toast = (text, options, data = {} ) => {
    $.toast({ 
        text , 
        showHideTransition : 'fade',
        allowToastClose : false,
        bgColor : '#f8f8f8',
        textColor : '#ccc',
        hideAfter : 1000,
        stack : 5,
        textAlign : 'left',
        position : 'mid-center',
        afterHidden : function(){
            options(data)
        }
    }) 
}

export default toast