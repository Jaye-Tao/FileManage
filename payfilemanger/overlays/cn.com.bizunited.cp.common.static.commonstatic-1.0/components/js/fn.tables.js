(function($){

    //弹层
    $.fn.ejectEvent = function(options){
        var id = options.id,
            url = options.url,
            htmId = id + '-html',
            $body = $('body'),
            buttonID = this.selector,
            closeType = options.close;
        var opts = $.fn.extend({},options);

        //弹窗触发
        $(document).on('click',buttonID,function(){
            var eHtml = '<div class="hidden-form-box " id="' + id + '">\
                        <div class="hidden-form">\
                        <i class="ace-icon glyphicon glyphicon-remove hidden-pub-close" id="' + id + '-close"></i>';
            var html = $('#' + htmId).html(),
                eW = opts.width,
                eH = opts.height,
                winW = $(window).width(),
                numW;
            if ((html==undefined||html==null||html.length==0)&&url!=undefined){
                var tr = $(this).closest("tr");//.find("td [aria-describedby='grid-table_id']").text();
                var editId = '';
                if (tr.hasClass("ui-widget-content")){
                    editId = tr.attr("id");
                }else {
                    editId = $("table.ui-jqgrid-btable").find("input[type='checkbox']:checked").closest("tr").attr("id");
                }
                if (editId==''){
                    alert("请选择行");
                }
                var urle = url.indexOf("?")>0?url+"&id="+editId:url+"?id="+editId;
                $.get(urle, function(data){
                    html = data;
                    numW = (parseInt(winW) - parseInt(eW) - 26)/2;
                    html = eHtml + html + '</div></div>';
                    $body.append(html);
                    $('#' + id).find('.hidden-form').css({
                        'left':numW + 'px',
                        'right':numW + 'px',
                        'top':eH + 'px',
                        'bottom':eH + 'px',
                        'z-index':'10000000000'
                    });
                    $('#' + id).fadeIn(200).find('.hidden-form').fadeIn(200);

                    if(typeof opts.callback === 'function'){
                        opts.callback(eW,this);
                    }
                });
            }else {
                numW = (parseInt(winW) - parseInt(eW) - 26)/2;
                html = eHtml + html + '</div></div>';
                $body.append(html);
                $('#' + id).find('.hidden-form').css({
                    'left':numW + 'px',
                    'right':numW + 'px',
                    'top':eH + 'px',
                    'bottom':eH + 'px',
                    'z-index':'10000000000'
                });
                $('#' + id).fadeIn(200).find('.hidden-form').fadeIn(200);

                if(typeof opts.callback === 'function'){
                    opts.callback(eW,this);
                }
            }

        });

        //关闭
        $(document).on('click','#' + id + '-close',function(){
            $('#' + id).fadeOut(200,function(){
                $('#' + id).remove();
            });
        });

        if(closeType === true){
            $('#' + id).fadeOut(200,function(){
                $('#' + id).remove();
            });
        }

    };

    //表单验证
    $.fn.formValidation = function(options,submitAction,type){
        var cls = this.selector;
        var def = {
            "zh2-4":/^[\u4E00-\u9FA5\uf900-\ufa2d]{2,4}$/,     //中文验证  2-4个字符
            "zfl":/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,   //金额验证  格式为  保留2位小数
            "tm":/^[0-9]{4}-[0-1]?[0-9]{1}-[0-3]?[0-9]{1}$/
        };
        var formNum = this.length,
            nowFoem = [],
            _n = 0;
        def = $.extend(true, def, options || {});

        var form = $(cls).Validform({
            tiptype:3,
            showAllError:true,
            datatype:def,
            beforeCheck:function(curform){
            	tdSave();
                if(_n == 0){
                    nowFoem = [];
                }
                _n ++;
                if(_n == formNum){
                    _n = 0;
                }
            },
            beforeSubmit:function(curform){
            	tdSave();
                var num = 0;
                nowFoem.push(true);
                for( var i in nowFoem){
                    if(nowFoem[i] === true)
                        num ++;
                }
                if(num == formNum){
                    submitAction(type);
                }
            },
            callback:function(data){
                return false;
            }
        });
        form.tipmsg.r=" ";
    };

    //检索
    $.fn.retrieve = function(fun,clickFunc){
        var cls = this.selector,
            _cls = cls.substr(1,cls.length),
            revID = '#' + _cls + '-box',
            revIndex = -1;
        var inp;

        // $(document).delegate(cls + ' input','keyup',function(){
        //     var lt = $(this).offset().left,
        //         tp = $(this).offset().top + $(this).height() + 12,
        //         inW = $(this).width() + 10;
        //     var val = $(this).val(),
        //         $this = $(this).closest(cls),
        //         html = '<div class="retrieve" id="' + _cls + '-box" style="width:' + inW + 'px;min-width:200px;left:' + lt + 'px; top:' + tp + 'px;">';
        //     inp = $(this);
        //     fun(val,function(_data){
        //         $.each(_data,function(i,v){
        //             html += '<a href="javascript:;" data-d=\'' + v.data + '\'>' + v.text + '</a>'
        //         });
        //         $('.retrieve').remove();
        //         $('body').append(html);
        //     });
        // });

        function _inp(dom){
            var $this = $(dom);
            var lt = $this.offset().left,
                tp = $this.offset().top + $this.height() + 12,
                inW = $this.width() + 10;
            var val = $this.val(),
                $curr = $this.closest(cls),
                html = '<div class="retrieve" id="' + _cls + '-box" style="width:' + inW + 'px;min-width:200px;z-index: 1989111;">';

            inp = $this;
            fun(val,function(_data){
                $.each(_data,function(i,v){
                    html += '<a href="javascript:;" data-d=\'' + v.data + '\'>' + v.text + '</a>'
                });
                $('.retrieve').remove();
                if($this.closest(".hidden-form").length){
                    $curr.append(html).find(".retrieve").css("left", "12px");
                } else {
                    $("body").append(html).find(".retrieve").css({"left": lt + "px", "top": tp + "px"});
                }

            });
        }

        $(document).delegate(cls + ' input','keyup',function(e){
            var _scr = $(revID).scrollTop();
            var len = $(revID).find('a').length - 1;
            var _h = 0;
            if (e.keyCode === 38 && revIndex > -1){//上
                revIndex--;
                $(revID).find('a').removeClass('keycls').eq(revIndex).addClass('keycls');

                _h = revIndex * 29;
                if(_h < _scr){
                    $(revID).animate({scrollTop:_scr - 29},100);
                }else{

                }
            }else if (e.keyCode === 40 && revIndex >= -1){//下

                if(revIndex == len){
                    return false;
                }

                revIndex++;
                $(revID).find('a').removeClass('keycls').eq(revIndex).addClass('keycls');

                _h = revIndex * 29;
                if(revIndex == 0){
                    $(revID).animate({scrollTop:0},200);
                }else if(_h > (_scr + 4*29)){
                    $(revID).animate({scrollTop:_scr + 29},100);
                }else{

                }

            }else if(e.keyCode === 13 && revIndex > -1){
                var $this = inp.closest(cls),
                    text = $(revID).find('a').eq(revIndex).text(),
                    _data = $(revID).find('a').eq(revIndex).attr('data-d'),
                    rowid = $this.closest('tr').attr('id');
                $(this).val(text);
                clickFunc(_data,rowid);
                $('.retrieve').remove();
                revIndex = -1;
            }else{
                _inp(this);
            }

        });

        $(document).delegate(cls + ' input','click',function(){
            if(revIndex > 0){
                $(revID).find('a').removeClass('keycls').eq(revIndex).addClass('keycls');
            }else{
                _inp(this);
            }
        });

        $(document).delegate(cls + ' input','focus',function(){
            if(revIndex > 0){
                $(revID).find('a').removeClass('keycls').eq(revIndex).addClass('keycls');
            }else{
                _inp(this);
            }
        });

        $(document).delegate('#' + _cls + '-box a','click',function(e){
            var $this = inp.closest(cls),
                text = $(this).text(),
                _data = $(this).attr('data-d'),
                rowid = $this.closest('tr').attr('id');
            $this.find('input').val(text);
            clickFunc(_data,rowid);
            $('.retrieve').remove();
            e.stopPropagation();
        });

        $(document).on('click',cls,function(e){
            e.stopPropagation();
        });

        $(document).on('click',function(){
            $('.retrieve').remove();
            revIndex = -1;
        });
    };

    // 检索滚动翻页
    $.fn.retrieveScroll = function(data){

        var cls = this.selector,
            _cls = cls.substr(1,cls.length),
            $this = $(cls);
        var inp,_colname,len,
            page = 1;
        var retrieveScroll = $('#retrieveScroll');

        $(document).delegate(cls + ' input','focus',function(){
            var $this = $(this).closest(cls);
            var lt = $this.offset().left,
                tp = $this.offset().top + $this.height() + 6,
                inW = $this.width() + 10;
            var html = '';
            var urls;
            inp = $this;
            retrieveScroll.hide().html('');
            _colname = $(this).attr('name');
            page = 1;

            $.each(data,function(i,v){
                if(_colname == v.colname){
                    urls = v.colsrc;
                    len = v.len
                }
            });
            var msg = {page:page, length:len};

            $.ajax({
                type: "get",
                url: urls,
                data: msg,
                dataType: "json",
                success: function (res) {

                    $.each(res,function(i,v){
                        html += '<a href="javascript:;" data-code=\'' + v.code + '\'>' + v.name + '</a>'
                    });
                    retrieveScroll.css({
                        'width':inW + 'px',
                        'min-width':'200px',
                        'left':lt + 'px',
                        'top':tp + 'px'
                    }).append(html).show();

                    page ++;

                },
                error:function(err){
                }
            });


        });

        $(document).delegate('#retrieveScroll a','click',function(e){
            var $this = inp.closest(cls),
                text = $(this).text(),
                code = $(this).attr('data-code');
            var msg = {};
            $this.find('input').val(text);
            retrieveScroll.hide().html('');

            msg.colname = _colname;
            msg.name = text;
            msg.code = code;

            $('#retrieveScroll').trigger('selector',msg);

            e.stopPropagation();
        });

        retrieveScroll.on('scroll',function(){

            var h = parseInt(retrieveScroll.find('a').length)*29;
            var rH = retrieveScroll.scrollTop();
            var html = '';
            var urls;

            if(rH > (h - 160)){

                $.each(data,function(i,v){
                    if(_colname == v.colname){
                        urls = v.colsrc;
                        len = v.len
                    }
                });

                var msg = {page:page, length:len};

                $.each(data,function(i,v){
                    if(_colname == v.colname){
                        urls = v.colsrc;
                    }
                });

                $.ajax({
                    type: "get",
                    url: urls,
                    data: msg,
                    dataType: "json",
                    success: function (res) {

                        $.each(arr,function(i,v){
                            html += '<a href="javascript:;" data-code=\'' + v.code + '\'>' + v.name + '</a>'
                        });
                        retrieveScroll.append(html);

                        page ++ ;

                    },
                    error:function(err){
                    }
                });
            }

        });

        $(document).on('click',cls,function(e){
            e.stopPropagation();
        });

        $(document).on('click',function(){
            retrieveScroll.hide().html('');
        });

    };

    //导入错误提示
    $.fn.importInit = function(id){
        var id = this.selector;
        var $table = $(id),
            nid = id.substr(1,id.length);
        var len = $table.find('tr').length;
        $.each(jsonInfo._data,function(i,v){
            var rowid = parseInt(len) + i;
            $table.addRowData(rowid, v.rowData, "first");

            $.each(v.detailVo,function(j,vo){
                var $tr = $table.find('[id = "' + rowid + '"]'),
                    td = '[aria-describedby="' + nid + '_' + vo.fieldName + '"]';
                $tr.find(td).attr("data-error",vo.fieldErro).addClass("table-error");
            });
        });

        $(document).on("mouseenter","td.table-error",function(){
            var text = $(this).attr("data-error");
            var html =  '<div class="table-error-boxs">' +
                        '<div class="table-error-box">' +
                        text +
                        '</div>' +
                        '</div>';
            layer.tips('<span style="color:#cc0000;">' + text + '</span>',this,{
                tips: [2, '#f5f5f5'],
            });
        }).on("mouseleave","td.table-error",function(){
            layer.closeAll();
        });
    };

    //日历插件中文
    $.fn.datetimepicker.dates['zh'] = {  
        days:       ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六","星期日"],
        daysShort:  ["日", "一", "二", "三", "四", "五", "六","日"], 
        daysMin:    ["日", "一", "二", "三", "四", "五", "六","日"],
        months:     ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月","十二月"],
        monthsShort:  ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
        meridiem:    ["上午", "下午"],
        today:       "今天"  
    }; 

    //暂存时表格不为空字段判断
    $.fn.saveValidation = function(gridTable){
        var colModels = gridTable.getGridParam("colModel");
        var data = gridTable.getRowData();
        var state = true;
        $.each(data,function(i,v){
            $.each(colModels,function(j,vo){
                if(vo.editrules !== undefined && vo.editable == true && v[vo.name] == ''){
                    state = false;
                    return false;
                }
            });
            if(state === false){
                return false;
            }
        });
        return state;
    };

})(jQuery);
