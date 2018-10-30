import position_list_template from'../views/position-list.html';
import position_save_template from '../views/position-save.html';
import position_update_template from '../views/position-update.html';

import position_models from '../models/position';

import {bus, handleToastByData} from '../util';

import qs from 'querystring';

const list = async (req, res, next) => {
    let {pageNo,pageNum,search} = req.query || {pageNo: "1", pageNum: "5", search: ""};
    var _data = (await position_models.list({pageNo:pageNo,pageNum:pageNum,search:search})).data;
    
    let html = template.render(position_list_template, {
        data: _data
    })  
    res.render(html)
    if( search == null){
        search = "";
    }
    bindListEvent(~~pageNo,~~pageNum,search);
}

const save = (req, res, next) => {
    res.render(position_save_template);
    bindSaveEvent();
}

const update = async (req, res) => {
    let {_id, pageNo, pageNum, search} = req.body;
    let html = template.render(position_update_template, {
        data: (await position_models.listone({_id})).data // 获取到列表数据
    })
    res.render(html)
    bindUpdateEvent(pageNo, pageNum, search);
}


const bindListEvent = (pageNo,pageNum,search) => {
    $('#addbtn').on('click', ()=>{
        bus.emit('go', '/position_save');
    })
    $('.position-list .pos-update').on('click', function(){
        let _id = $(this).parents('tr').data('id');
        bus.emit('go','/position_update', { _id, pageNo, pageNum, search })
    })
    $('.position-list .pos-remove').on('click', async function(){
        let id = $(this).parents('tr').data('id');
        let data = await position_models.remove({id})

        var size = $('.position-list__tabel tbody tr').length;
        
        if(size ==2 && pageNo!= 1){
            pageNo --;
        }
        
        handleToastByData(data, {
            isReact: true,
            success: (data) => {
                // 删除成功后
                bus.emit('go', '/position_list?pageNo='+pageNo+'&pageNun='+pageNum+'&search='+search+'&_='+ data.data.deleteId)
            }
        })
    })
    $('#search_btn').on('click',function(){
        var searchContext = $('#keywords').val();
        bus.emit('go', '/position_list?pageNo=1&pageNum=5&search='+searchContext);
    })
}

const bindSaveEvent = () => {
    $('.position-save #back').on('click', function () {
        bus.emit('go', '/position_list')
    })

    $(".position-save #companyLogo").change(function(){   
         var file = this.files[0];
           if (window.FileReader) {    
                var reader = new FileReader();    
                reader.readAsDataURL(file);    
                reader.onloadend = function (e) {
                    $(".position-save #companyLogo").css('visibility', 'hidden');
                    $(".position-save #com_logo")
                    .attr("src",e.target.result)
                    .css({
                        'width':'50px',
                        'height':'50px',
                        'float':'left'
                    }); 
                };    
           } 
    });

    let _isLoading = false
    $('.position-save #save-form').submit( async function(e){
        e.preventDefault();
        if(_isLoading) return false;
        _isLoading = true;
        var _results = await position_models.save();
        handleToastByData(_results, {
            isReact : true,
            success : () => {
                _isLoading = false;
                bus.emit('go', '/position_list')
            }
        });
    })
}

const bindUpdateEvent = (pageNo, pageNum, search) => {
    $('#update-form #back').on('click', function () {
        bus.emit('go', '/position_list?pageNo='+pageNo+'&pageNum='+pageNum+'&search='+search);
    })

    $('#update-form #com_logo').on('click',function(){
        $('#update-form #companyLogo').click();
    })

    $("#update-form #companyLogo").change(function () {
        var file = this.files[0];
        if (window.FileReader) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function (e) {
                $("#update-form #com_logo").prop("src", e.target.result)
            };
        }
    });

    let _isLoading = false
    $('#update-form').submit( async function(e){
        e.preventDefault();
        if(_isLoading) return false;
        _isLoading = true;
        var imgfile = $('#update-form #companyLogo').val();
        if(imgfile === ""){
            var data = qs.parse( $(this).serialize() );
            var _results = await position_models.update_no(data);
        }else{
            var _results = await position_models.update();
        }
        handleToastByData(_results, {
            isReact : true,
            success : () => {
                _isLoading = false;
                bus.emit('go', '/position_list?pageNo='+pageNo+'&pageNun='+pageNum+'&search='+search)
            }
        });
    })
}

export default {
    list,
    save,
    update
}