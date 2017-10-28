
//时间函数
function pickDates(cellvalue, options, cell){
    setTimeout(function(){
        var $this = $(cell);
        var $tr = $this.closest('tr');
        var starType = $this.hasClass('start-time');
        var endType = $this.hasClass('end-time');
        if(starType === true){
            $this.find('input[type=text]').datetimepicker({
                minView: "month",
                format: "yyyy-mm-dd",
                language: 'zh-CN',
                autoclose:true
            }).on("focus",function(){
                var value = $tr.find(".end-time").text().replace(/\s/g,"");;
                if(value !== ''){
                    console.log(1)
                    $(this).datetimepicker("setEndDate",$tr.find(".end-time").text());
                }
            });
            return false;
        }else if(endType === true){
            $this.find('input[type=text]').datetimepicker({
                minView: "month",
                format: "yyyy-mm-dd",
                language: 'zh-CN',
                autoclose:true
            }).on("focus",function(){
                var value = $tr.find(".start-time").text().replace(/\s/g,"");;
                if(value !== ''){
                    $this.find('input[type=text]').datetimepicker("setStartDate",$tr.find(".start-time").text())
                }
            });
            return false;
        }else{
            $this.find('input[type=text]').datetimepicker({
                minView: "month",
                format: "yyyy-mm-dd",
                language: 'zh',
                autoclose:true
            });
        }

    }, 0);
}

//表格保存
function tdSave(){
    $('table tbody').each(function(){
        $(this).find('tr').eq(1).find('td').eq(0).trigger('click');
    });
}


var table_form = function(){
    var obj = {
        table_arr: []
    };

    var fun = {
        //分页图标
        pageicon:function(table){
            var replacement =
                {
                    'ui-icon-seek-first' : 'ace-icon fa fa-angle-double-left bigger-140',
                    'ui-icon-seek-prev' : 'ace-icon fa fa-angle-left bigger-140',
                    'ui-icon-seek-next' : 'ace-icon fa fa-angle-right bigger-140',
                    'ui-icon-seek-end' : 'ace-icon fa fa-angle-double-right bigger-140'
                };
            $('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function(){
                var icon = $(this);
                var $class = $.trim(icon.attr('class').replace('ui-icon', ''));

                if($class in replacement) icon.attr('class', 'ui-icon '+replacement[$class]);
            })
        },
        //按钮事件
        buttonFun:function(tableId,formField){

            $('body').on('click','.button-trash',function(){

                //行删除
                var $this = $(this);
                var adds = $this.hasClass('adds');
                var id = [$this.closest('tr').find(".uid").text()];

                if(adds == true){
                    $this.closest('tr').remove();
                }else{
                    // $this.closest('tr').hide().find(".pageStatus").html('del');
                    $this.closest('tr').remove();
                }
                //数据请求
                jsonInfo.delReq(id);
            }).on('click','.ui-inline-save',function(){

                //行编辑
                var $this = $(this);
                var datas = {};
                var id = tableId.substr(1,tableId.length);
                $this.closest('tr').find(".pageStatus").html('update');

                $.each(formField,function(i,v){
                    var attrs = "[aria-describedby = '" + id + "_" + v.name + "']";
                    datas[v.name] = $this.closest('tr').find(attrs).text();
                });

                //数据请求
                jsonInfo.editerReq(datas);
            }).on('change','.select-search-input',function(){
                //输入内容搜索
            });

            //多条删除
            $(document).delegate(tableId + '-del','click',function(){
                var $this = $(tableId);
                var id = [];

                $this.find('input:checkbox').each(function(i){
                    var state = $(this).prop('checked');
                    if(state){
                        id.push($(this).closest('tr').find(".uid").text());
                        // $(this).closest('tr').hide().find(".pageStatus").html('del');
                        // $(this).closest('tr').remove();
                    }
                });

                if(id.length < 1){
                    layer.msg("请选择删除项！",{time:1000,shade:0});
                    return false;
                }

                //数据请求
                jsonInfo.delReq(id,function(){
                    $this.find('input:checkbox').each(function(i){
                        var state = $(this).prop('checked');
                        if(state){
                            // id[i] = $(this).closest('tr').find(".uid").text();
                            $(this).closest('tr').remove();
                        }
                    });
                });

            });

            //行添加
            $(document).delegate(tableId + '-row-adds','click',function(){
                var tab = tableId.substr(1,tableId.length);
                var data = jsonInfo.addHtmlData(tableId);
                var rowid = new Date().getTime();  //当前时间戳
                var html = '';
                var $id = $(tableId).find('[id="' + rowid + '"]');

                var datas = {};

                $.each(formField,function(i,v){
                    datas[v.name] = ''
                });

                var timestamp = new Date().getTime();  //当前时间戳

                rowid = timestamp;
                $(tableId).addRowData(rowid, datas, "last");
                html = $(tableId).find('[id="' + rowid + '"]').html();

                //按钮替换
                var btn = '<div title="提交" style="float: left;" class="ui-pg-div ui-inline-save add-inline-save" id="jSaveButton_1498117278254" onmouseover="jQuery(this).addClass(\'ui-state-hover\');" onmouseout="jQuery(this).removeClass(\'ui-state-hover\');">\
                                <span class="ui-icon ui-icon-disk"></span>\
                            </div>\
                            <div title="取消" style="float: left; margin-left: 5px;" class="ui-pg-div ui-inline-cancel add-inline-cancel" id="jCancelButton_1498117278254" onmouseover="jQuery(this).addClass(\'ui-state-hover\');" onmouseout="jQuery(this).removeClass(\'ui-state-hover\');">\
                                <span class="ui-icon ui-icon-cancel"></span>\
                            </div>',
                    btnBox = $(tableId).find('[id="' + rowid + '"]').find('[aria-describedby="' + tab + '_myac"]');
                btnBox.html(btn);

                //行项目号
                var _rn = $(tableId).find('[id="' + rowid + '"]').find('[aria-describedby="' + tab + '_rn"]').html();
                $(tableId).find('[id="' + rowid + '"]').find('[aria-describedby="' + tab + '_xmh"]').html(_rn);

                $.each(data,function(i,v){
                    var $w = $(tableId).find('[id="' + rowid + '"]').find('[aria-describedby="' + tab + '_' + v.name + '"]');
                    var htm = '';
                    if(v.type === 'select'){
                        htm += '<select>';
                        $.each(v.con,function(key,vo){
                            htm += '<option role="option" value="' + vo.value + '">' + vo.text + '</option>';
                        });
                        htm += '</select>';
                    }else if(v.type === 'text'){
                        htm += '<input type="text" name="' + v.name + '" role="textbox" class="editable" style="width: 98%;">';
                    }else if(v.type === 'time'){
                        htm += '<input type="text" id="FormData-' + v.name + '" name="' + v.name + '" value="' + new Date().Format("yyyy-MM-dd") + '" role="textbox" class="FormElement ui-widget-content ui-corner-all form_datetime">';
                    }

                    $w.html(htm);

                    $('.form_datetime').datetimepicker({
                        minView: "month",
                        format: "yyyy-mm-dd",
                        language: 'zh-CN',
                        autoclose:true
                    });
                });
            });

            //保存
            $(document).delegate(tableId + ' .add-inline-save','click',function(){
                var $tr = $(this).closest('tr');
                var tab = tableId.substr(1,tableId.length);
                var data = jsonInfo.addHtmlData(tableId);
                var _data = {};
                var btn = '<div style="margin-left:8px;"><div title="编辑所选记录" style="cursor: pointer; display: inline-table;" class="ui-pg-div ui-inline-edit" id="jEditButton_14" onclick="jQuery.fn.fmatter.rowactions.call(this,\'edit\');" onmouseover="jQuery(this).addClass(\'ui-state-hover\');" onmouseout="jQuery(this).removeClass(\'ui-state-hover\')"><span class="ui-icon ui-icon-pencil"></span></div><div title="提交" style="display: none;" class="ui-pg-div ui-inline-save" id="jSaveButton_14" onclick="jQuery.fn.fmatter.rowactions.call(this,\'save\');" onmouseover="jQuery(this).addClass(\'ui-state-hover\');" onmouseout="jQuery(this).removeClass(\'ui-state-hover\');"><span class="ui-icon ui-icon-disk"></span></div><div title="取消" style="display: none; margin-left: 5px;" class="ui-pg-div ui-inline-cancel" id="jCancelButton_14" onclick="jQuery.fn.fmatter.rowactions.call(this,\'cancel\');" onmouseover="jQuery(this).addClass(\'ui-state-hover\');" onmouseout="jQuery(this).removeClass(\'ui-state-hover\');"><span class="ui-icon ui-icon-cancel"></span></div><div style="display:inline-table;margin:0 3px;" class="ui-pg-div button-trash" onmouseover="jQuery(this).addClass(\'ui-state-hover\');" onmouseout="jQuery(this).removeClass(\'ui-state-hover\');"><span class="ui-icon ui-icon-trash del-form-btn"></span></div></div>';
                var btnBox = $tr.find('[aria-describedby="' + tab + '_myac"]');
                btnBox.html(btn);

                $.each(data,function(i,v){
                    var $w = $tr.find('[aria-describedby="' + tab + '_' + v.name + '"]');
                    var htm = '';

                    if(v.type === 'select'){
                        _data[v.name] = $w.find('select').val();
                        htm = $w.find('select option:selected').text();
                    }else if(v.type === 'text'){
                        _data[v.name] = $w.find('input').val();
                        htm = $w.find('input').val();
                    }else if(v.type === 'time'){
                        _data[v.name] = $w.find('input').val();
                        htm = $w.find('input').val();
                    }

                    $w.html(htm).attr('title',htm);

                });

                $(tableId).trigger('addSaveOk',_data);

            });

            //取消添加
            $(document).delegate(tableId + ' .add-inline-cancel','click',function(){
                var $tr = $(this).closest('tr');
                $tr.remove();
            });

            //添加
            $(tableId + '-adds').on('click',function(){
                var html = fun.addHtml(tableId);
                var winH = $(window).height();
                var layerH = 350;

                if(layerH > parseInt(winH) - 50 && parseInt(winH) > 250){
                    layerH = parseInt(winH) - 50;
                }
                layer.open({
                    type: 1,
                    title:"添加",
                    skin: 'layui-layer-rim', //加上边框
                    area: ['620px', layerH + "px"], //宽高
                    content: html,
                    btn: ['提交', '取消'],
                    yes: function() {
                        var type = true;
                        var $tr = $("#ui-widget-content tr");
                        $tr.each(function(){
                            var inp = $(this).find("input").val();
                            if(inp == ""){
                                $(this).find("input").focus();
                                type = false;
                                return false;
                            }
                        });
                        if(!type){
                            layer.msg("内容不能有空项！",{time:1000,shade:0});
                            type = false;
                            return false;
                        }

                        var datas = {};
                        $("#ui-widget-content tr").each(function(){
                            var name = $(this).find(".FormElement").attr("name");
                            var state = $(this).find(".FormElement").attr('select-state');
                            if(name != undefined){
                                if(state === 'text'){
                                    datas[name] = $(this).find(".FormElement :selected").text();
                                }else{
                                    datas[name] = $(this).find(".FormElement").val();
                                }

                            }
                        });

                        obj[tableId] = parseInt(obj[tableId]) + 1;
                        datas.uid = obj[tableId];
                        datas.pageStatus = 'add';

                        //数据请求
                        var _datas = jsonInfo.addReq(datas,function(tableId) {
                            $(tableId).find(".ui-inline-del").prevAll().css({
                                'float': '',
                                'display': 'inline-table'
                            });
                            $(tableId).find(".ui-inline-del").prevAll('.ui-inline-save').css('display', 'none');
                            $(tableId).find(".ui-inline-del").prevAll('.ui-inline-cancel').css('display', 'none');
                            $(tableId).find(".ui-inline-del").closest('td > div').append('<div style="display:inline-table;margin:0 3px;" class="ui-pg-div button-trash adds" onmouseover="jQuery(this).addClass(\'ui-state-hover\');" onmouseout="jQuery(this).removeClass(\'ui-state-hover\');"><span class="ui-icon ui-icon-trash del-form-btn"></span></div>');
                            $(tableId).find(".ui-inline-edit").next().remove();
                        });
                        if(typeof _datas == 'object'){
                            datas = _datas;
                            $(obj[tableId]).addRowData(obj[tableId], datas, "last");
                            layer.closeAll();
                        }else if(_datas == false){
                        }else{
                            $(tableId).addRowData(datas.uid, datas, "last");
                            $(tableId).find(".ui-inline-del").prevAll().css({
                                'float':'',
                                'display':'inline-table'
                            });
                            $(tableId).find(".ui-inline-del").prevAll('.ui-inline-save').css('display','none');
                            $(tableId).find(".ui-inline-del").prevAll('.ui-inline-cancel').css('display','none');
                            $(tableId).find(".ui-inline-del").closest('td > div').append('<div style="display:inline-table;margin:0 3px;" class="ui-pg-div button-trash adds" onmouseover="jQuery(this).addClass(\'ui-state-hover\');" onmouseout="jQuery(this).removeClass(\'ui-state-hover\');"><span class="ui-icon ui-icon-trash del-form-btn"></span></div>');
                            $(tableId).find(".ui-inline-edit").next().remove();
                            layer.closeAll();
                            layer.msg("添加成功！",{time:1000,shade:0});
                        }
                    }
                });
                $('.layui-layer-shade,.layui-layer').css('z-index',10000);
                fun.datepicker();
                // 行项目号处理
                var _rn = $(tableId).getCol('rn',true);
                $.each(_rn,function(i,v){
                    $(tableId).setCell(v.id,'xmh',v.value);
                });
            });

            //复制行
            $(tableId + "-copy").on("click",function() {
                var datas = {};
                var tdData = formField;
                var id = tableId.substr(1,tableId.length);
                var $this = $(tableId).find('input:checked').closest('tr');
                var checkedNum = $(tableId).find('input:checked').length;

                if(checkedNum > 0){
                    for(i in tdData){
                        var td = "[aria-describedby = '" + id + "_" + tdData[i].name + "']";
                        if(i > 0){
                            if(tdData[i].editable){
                                datas[tdData[i].name] = "";
                            }else{
                                datas[tdData[i].name] = $this.find(td).html();
                            }
                        }
                    }
                    datas.id = '';
                    obj[tableId] = parseInt(obj[tableId]) + 1;
                    datas.uid = obj[tableId];

                    $(tableId).addRowData(datas.uid, datas, "first");

                    // 行项目号处理
                    var _rn = $(tableId).getCol('rn',true);
                    $.each(_rn,function(i,v){
                        $(tableId).setCell(v.id,'xmh',v.value);
                    });

                    $('.ui-inline-del').remove();
                    $this.closest('table').find('tr').eq(1).find('td.iconbutton > div').append('<div style="display:inline-table;margin:0 3px;" class="ui-pg-div button-trash adds" onmouseover="jQuery(this).addClass(\'ui-state-hover\');" onmouseout="jQuery(this).removeClass(\'ui-state-hover\');"><span class="ui-icon ui-icon-trash del-form-btn"></span></div>');
                    $('.ui-inline-edit').remove();
                }else{
                    layer.msg("请选择复制行！",{time:1000,shade:0});
                }

            });
        },

        //多表格删除
        multiFun:function(){
            $("#multi-table-del").on("click",function(){
                var len = obj.table_arr.length,
                    $trs,
                    $tr,
                    id = [],
                    i;
                for(i=0; i<len; i++){
                    $trs = $(obj.table_arr[i]).find("tr");
                    $trs.each(function(){
                        var $input = $(this).find("td").eq(0).find("input");
                        if($input.prop("checked")){
                            $tr = $input.closest("tr");
                            id[id.length] = $tr.find(".uid").text();
                            $tr.hide().find(".pageStatus").html("del");
                        }
                    });
                }
                //数据请求
                jsonInfo.delReq(id);
            });
        },

        idstr:function(id){
            return id.substr(1,id.length);
        },

        //表单加载完成执行
        formLoadO:function(state,tableId){
            var winW = $(window).width() - 20;
            var tid = fun.idstr(tableId);
            var $tab = $('#gbox_' + tid);
            $tab.find(".ui-jqgrid-bdiv").css("height","auto");
            $tab.find('.ui-inline-del').remove();
            $tab.find('td .ui-pg-div').css({
                'float':'',
                'display':'inline-table'
            });
            $tab.find('td').find('.ui-inline-save,.ui-inline-cancel').css('display','none');

            //隐藏行序号
            jQuery(tableId).setGridParam().hideCol("rn").trigger("reloadGrid");
            // 行项目号处理
            var _rn = $(tableId).getCol('rn',true);
            $.each(_rn,function(i,v){
                $(tableId).setCell(v.id,'xmh',v.value);
            });

            // $tab.find('.ui-jqgrid-pager').width(winW);
            var _tw = $tab.find('.ui-jqgrid-hdiv').width();
            if(_tw < winW){
                $tab.find('.ui-jqgrid-hdiv,.ui-jqgrid-bdiv').css({
                    'width':'100%'
                });
                $tab.find('.ui-jqgrid-view table').css({
                    'width':'100% !important'
                });
            }else{
                $tab.find('.ui-jqgrid-view table').css({
                    'width':'auto'
                });
            }
            $tab.find('.ui-jqgrid-view').css({
                // 'width':winW + 'px',
                'width':'100%',
                'overflow':'hidden',
                'overflow-x':'auto',
                'padding-bottom':'23px'
            });
            $(window).resize(function () {
                winW = $(window).width();
                var _tw = $tab.find('.ui-jqgrid-hdiv').width();
                if(_tw < winW){
                    $tab.find('.ui-jqgrid-hdiv,.ui-jqgrid-bdiv').css({
                        'width':'100%'
                    });
                    $tab.find('.ui-jqgrid-view table').css({
                        'width':'100% !important'
                    });
                }else{
                    $tab.find('.ui-jqgrid-view table').css({
                        'width':'auto'
                    });
                }

                $tab.find('.ui-jqgrid-pager').width(winW);
                $tab.find('.ui-jqgrid-view').css({
                    // 'width':winW + 'px',
                    'width':'100%',
                    'overflow':'hidden',
                    'overflow-x':'auto',
                    'padding-bottom':'23px'
                });
            });

            //删除按钮
            $(tableId).find('td.iconbutton > div .button-trash').remove();
            if(state == true){
                $(tableId).find('td.iconbutton > div').append('<div style="display:inline-table;margin:0 3px;" class="ui-pg-div button-trash" onmouseover="jQuery(this).addClass(\'ui-state-hover\');" onmouseout="jQuery(this).removeClass(\'ui-state-hover\');"><span class="ui-icon ui-icon-trash del-form-btn"></span></div>');
            }else if(state == 'editer'){
                $(tableId).find('td.iconbutton > div').append('<div style="display:inline-table;margin:0 3px;" class="ui-pg-div button-trash" onmouseover="jQuery(this).addClass(\'ui-state-hover\');" onmouseout="jQuery(this).removeClass(\'ui-state-hover\');"><span class="ui-icon ui-icon-trash del-form-btn"></span></div>');
                $(tableId).find('.ui-inline-edit').remove();
            }

        },

        //添加弹层html
        addHtml:function(tableId){
            var datas = jsonInfo.addHtmlData(tableId);
            var html =  '<div class="ui-jqdialog-content ui-widget-content" id="ui-widget-content">' +
                '<table id="TblGrid_grid-table" class="EditTable" cellspacing="0" cellpadding="0" border="0" style="margin-top:20px;border-top:0 !important;">' +
                '<tbody>' +
                '<tr id="FormError" style="display:none">' +
                '<td class="ui-state-error" colspan="2"></td>' +
                '</tr>';

            $.each(datas,function(i,v){
                if(v.type === "select"){
                    //下啦
                    var sel = "";
                    var selArr = v.con;
                    $.each(selArr,function(i,v){
                        sel += '<option role="option" value="'+ v.value +'">' + v.text + '</option>';
                    });

                    html += '<tr class="FormData" id="tr_' + v.name + '">' +
                        '<td class="CaptionTD">' + v.text + '</td>' +
                        '<td class="DataTD">&nbsp;' +
                        '<select role="select" id="FormData-' + v.name + '" name="' + v.name + '" select-state="' + v.state + '" size="1" class="FormElement ui-widget-content ui-corner-all">' +
                        sel +
                        '</select>' +
                        '</td>' +
                        '</tr>';
                }else if(v.type === "text"){
                    //文本输入
                    html += '<tr class="FormData" id="tr_' + v.name + '">' +
                        '<td class="CaptionTD">' + v.text + '</td>' +
                        '<td class="DataTD">&nbsp;' +
                        '<input type="text" id="FormData-' + v.name + '" name="' + v.name + '" role="textbox" class="FormElement ui-widget-content ui-corner-all">' +
                        '</td>' +
                        '</tr>';
                }else if(v.type === "time"){
                    //时间选择
                    html += '<tr class="FormData" id="tr_' + v.name + '">' +
                        '<td class="CaptionTD">' + v.text + '</td>' +
                        '<td class="DataTD">&nbsp;' +
                        '<input type="text" id="FormData-' + v.name + '" name="' + v.name + '" value="' + new Date().Format("yyyy-MM-dd") + '" role="textbox" class="FormElement ui-widget-content ui-corner-all form_datetime">' +
                        '</td>' +
                        '</tr>';
                }else if(v.type === 'textarea'){
                    //多行
                    html += '<tr class="FormData" id="tr_' + v.name + '">' +
                        '<td class="CaptionTD">' + v.text + '</td>' +
                        '<td class="DataTD">&nbsp;' +
                        '<textarea type="text" id="FormData-' + v.name + '" name="' + v.name + '" value="" role="textbox" style="height:50px;" class="FormElement ui-widget-content ui-corner-all "></textarea>' +
                        '</td>' +
                        '</tr>';
                }else if(v.type === 'hidden'){
                    html += '<tr style="display:none;"><input type="hidden" id="FormData-' + v.name + '" name="' + v.name + '" role="textbox" class="FormElement ui-widget-content ui-corner-all "></tr>';
                }
            });
            html += '</tbody>' +
                '</table>' +
                '</div>';

            return html;
        },

        datepicker:function(){
            $('.form_datetime').datetimepicker({
                minView: "month",
                format: "yyyy-mm-dd",
                language: 'zh-CN',
                autoclose:true
            });
        }
    };

    //日期格式化
    Date.prototype.Format = function(fmt){
        var o = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };

    //表格初始化  默认分页表
    obj.init = function(formField,formTit,urls,tdDataInfo,tableId,pageId,afterSaveCell,afterInsertRow,setting){

        formField.splice(0,0,{name:"xmh",index:"xmh", width:70, sortable:true, align:"center", editable: false});
        formTit.splice(0,0,'行项目号');

        var defaultSetting = {
            url: urls,                 //请求地址
            datatype: 'json',          // 访问方式  json：请求服务器数据    local：本地数据
            data: tdDataInfo,   //本地数据
            colNames: formTit,     //表头名字
            colModel: formField,   //表字段
            rowNum: 10,
            rowList: [10, 20, 30],
            pager: pageId,    //分页id
            sortname: 'id',
            mtype: "post",        //  post   get   请求
            viewrecords: true,
            sortorder: "asc",

            //单元格编辑
            cellEdit: false,   // 单元格编辑   true:可编辑    false:不可编辑
            cellsubmit: 'clientArray',
            cellurl: '',

            //编辑后单行保存
            beforeSubmitCell: function (rowid, celname, value, iRow, iCol) {
            },

            rownumbers: true, //如果为ture则会在表格左边新增一列，显示行顺序号，从1开始递增。此列名为'rn'
            //单元格成功保存后触发
            afterSaveCell: (afterSaveCell || function () {
            }),

            shrinkToFit: false, //表格宽度  ture 初始化列宽度  false 列宽度使用colModel指定的宽度
            multiselect: true,   //关闭全选
            multiboxonly: true, //为ture时只有选择checkbox才会起作用
            //表格还在完成后执行
            loadComplete: function () {
                var table = this;
                //分页图标
                fun.pageicon(table);

                //操作列按钮处理
                fun.formLoadO(jsonInfo.cellDelState,tableId);

                obj[tableId] = $(tableId).find('tr').length - 1; //行id

                $.each(formField,function(i,v){
                    var str = tableId.substr(1,tableId.length);
                    if(v.editable == true){
                        var td = "[aria-describedby = '" + str + "_" + v.name + "']";
                        $(td).addClass(v.name);
                    }
                });
                if(afterInsertRow != null && afterInsertRow != 'undefined' && typeof(afterInsertRow) === "function") {
                    afterInsertRow();
                }
            },
            //表格加载失败
            loadError: function () {
                var table = this;
                //分页图标
                fun.pageicon(table);

                //操作列按钮处理
                fun.formLoadO(jsonInfo.cellDelState,tableId);

                obj[tableId] = $(tableId).find('tr').length - 1; //行id

                $.each(formField,function(i,v){
                    var str = tableId.substr(1,tableId.length);
                    if(v.editable == true){
                        var td = "[aria-describedby = '" + str + "_" + v.name + "']";
                        $(td).addClass(v.name);
                    }
                });
            }
        };
        var extractSetting = defaultSetting;
        if (setting != null) {
            defaultSetting = $.extend(true, defaultSetting, setting || {});
        }
        var _data = jQuery(tableId).jqGrid(defaultSetting);

        fun.buttonFun(tableId,formField);
        obj.table_arr[obj.table_arr.length] = tableId;

        return _data;
    };

    //日期调用
    obj.pickDate = function(cell){
        setTimeout(function(){
            $(cell) .find('input[type=text]').datepicker({format:'yyyy-mm-dd' , autoclose:true});
        }, 0);
    };

    //按钮事件
    obj.delDleteButton = function(e){
        $(".ui-inline-del").remove();
    };

    //创建弹窗表格
    obj.creatFun = function(callback,field,Id,title,sendBtn,tableField,urls){
        var html = '';
        var _data = [];

        if(field === true){
            html =  '<div class="hidden-form-box"></div>' +
                '<div style="display:none; left:' + boxWidth() + 'px; right:' + boxWidth() + 'px;" class="hidden-form" id="hidden-form">' +
                '<i class="ace-icon glyphicon glyphicon-remove hidden-pub-close"></i>' +
                '<div class="box">' +
                title() +
                '<div class="table-hidden">' +
                '<table id="grid-table-hidden"></table>' +
                '<div id="grid-pager-hidden"></div>' +
                '</div>' +
                '</div>' +
                '</div>';
            _data = tableField;
        }else{
            html =  '<div class="hidden-form-box"></div>' +
                '<div style="display:none;" class="hidden-form" id="hidden-form">' +
                '<i class="ace-icon glyphicon glyphicon-remove hidden-pub-close"></i>' +
                '<div class="box">' +
                '<div class="row hidden-form-title hidden-title">' +
                '<h5>' + title +
                '</h5>' +
                '<a class="btn btn-primary btn-resize fs-12 fr">' + sendBtn +
                '</a>' +
                '</div>' +
                '<table id="grid-table-hidden"></table>' +
                '<div id="grid-pager-hidden"></div>' +
                '</div>' +
                '</div>';
            var $this = $(Id).find('input:checked');
            var str = Id.substr(1,Id.length);

            if($this.length < 1){
                layer.msg("请选择单号",{time:1000,shade:0});
                return false;
            }

            $this.each(function(j){
                var $this = $(this);
                var _dt = {};
                $.each(field,function(i,v){
                    _dt[v.name] = $this.closest('tr').find("[aria-describedby = '" + str + "_" + v.name + "']").text();
                });
                _data[j] = _dt;
            });
        }

        $('body').append(html);

        var datas = callback(_data);

        table_form.init(datas.viewField,datas.viewTitle,urls,datas.viewinfo,"#grid-table-hidden","#grid-pager-hidden");

        var $hidden = $("#hidden-form");

        if(field === true){
            setTimeout(function(){
                var boxW = $hidden.find(".box").width();
                $hidden.find("#grid-pager-hidden").width(boxW);
                $('#gview_grid-table-hidden table,#gview_grid-table-hidden .ui-jqgrid-hdiv,#gview_grid-table-hidden .ui-jqgrid-bdiv').width(tableWidth());
                $('#gview_grid-table-hidden .ui-jqgrid-bdiv').css({
                    'height':'auto'
                });
                $('#cb_grid-table-hidden').hide();
            },100);
        }

        var w = $hidden.find(".ui-jqgrid-hdiv").width() + 92;
        $hidden.fadeIn(300).find(".ui-jqgrid-hdiv,.ui-jqgrid-bdiv").css("width",w + "px");
        $('.hidden-form-box').fadeIn(300);
    };

    //日期初始化
    var pickerDateTime = function(){
        $('.form_datetime').datetimepicker({
            minView: "month",
            format: "yyyy-mm-dd",
            language: 'zh-CN',
            autoclose:true
        });
    };
    
    $(document).delegate('.hidden-pub-close','click',function(){
        var $this = $(this).closest('.hidden-form');
        $this.fadeOut(300,function () {
            $this.prev().remove();
            $this.remove();
        }).prev().fadeOut(300);
    });

    $(document).delegate('td input,td select','blur',function(){
        var $this = $(this);
        var type = $this.attr('type');
        var cls = $this.closest('tr').find('.ui-inline-edit');

        if(type === 'checkbox' || cls.length >0){
            return false;
        }
        setTimeout(function(){
            $this.closest('tr').find('td').eq(0).trigger('click');
        },500)
    });

    fun.multiFun();
    return obj;
}();