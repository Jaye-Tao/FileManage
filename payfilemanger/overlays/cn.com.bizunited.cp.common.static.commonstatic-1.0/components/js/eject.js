
function ordinary(htmlID,boxID,tableWidth,tableHeight){
    var $ID = $(htmlID);
    var html = $ID.html();
        $('body').append(html);
    var $boxId = $(boxID);
    var winW = $(window).width();
        tableWidth = parseInt(tableWidth);
    var num = (parseInt(winW) - tableWidth - 26)/2;
    $boxId.css({
        'left':num + 'px',
        'right':num + 'px'
    }).fadeIn(300).prev('.hidden-form-box').fadeIn(300);
    table_form.pickerDateTime();
}

var eject = function(){
    var obj = {};

    //弹层点击时间
    var clickFun = function(){

        //弹层关闭
        $(document).delegate('.hidden-pub-close,.dialog-cancel','click',function(){
            var $this = $(this).closest('.hidden-form');
            $this.fadeOut(300,function () {
                $this.prev().remove();
                $this.remove();
            }).prev().fadeOut(300);
        });

    };

    var Initialize = function(htmlID,boxID,datas,tableWidth,settings){
        var $ID = $(htmlID);
        var html = $ID.html();
        var winW = $(window).width();
        tableWidth = parseInt(tableWidth);
        var num = (parseInt(winW) - tableWidth - 26)/2;

        $('body').append(html);

        var grid = [];
        $.each(datas,function(i,v){
            var tableid = v.tableid;
            var pageid = v.pageid;
            var tableidStr = tableid.substr(1,tableid.length);
            grid[i] = table_form.init(v.viewField,v.viewTitle,v.url,v.viewinfo,tableid,pageid,null,null,settings);
            var $hidden = $(boxID);
            var boxW = $hidden.find(".box").width();
            $hidden.find(pageid).width(tableWidth);
            $hidden.find('.table-hidden').show();
            $('#gview_' + tableidStr).find('table,.ui-jqgrid-hdiv,.ui-jqgrid-bdiv').width(tableWidth);
            $(tableid).width(parseInt(tableWidth) - 1);
            $('#cb_' + tableidStr).hide();
        });

        var $hidden = $(boxID);
        $hidden.css({
            'left':num + 'px',
            'right':num + 'px',
            'z-index':'10000000000'
        }).fadeIn(300);
        // $('.hidden-form-box').fadeIn(300);

        return grid;
    };


    return {
        init:function(){
            clickFun();
        },
        initTable:function(ID,boxID,_data,tableWidth,settings){
           return  Initialize(ID,boxID,_data,tableWidth,settings);
        }
    }

};
$(eject().init);