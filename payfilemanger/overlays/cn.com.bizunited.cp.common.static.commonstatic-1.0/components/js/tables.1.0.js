
//时间函数
function pickDates(cellvalue, options, cell){
    setTimeout(function(){
        var $this = $(cell),
            $tr = $this.closest('tr'),
            starType = $this.hasClass('start-time'),
            endType = $this.hasClass('end-time'),
            sdate = $this.hasClass("st-date"),
            edate = $this.hasClass("ed-date"),
            dateTime;
        if(starType === true){
            $this.find('input[type=text]').datetimepicker({
                minView: "month",
                format: "yyyy-mm-dd",
                language: 'zh-CN',
                autoclose:true
            }).on("focus",function(){
                var value = $tr.find(".end-time").text().replace(/\s/g, "");
                if(value !== ''){
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
                var value = $tr.find(".start-time").text().replace(/\s/g, "");
                if(value !== ''){
                    $this.find('input[type=text]').datetimepicker("setStartDate",$tr.find(".start-time").text())
                }
            });
            return false;
        } else if(sdate){
            $this.find('input[type=text]').datetimepicker({
                minView: "month",
                format: "yyyy-mm-dd",
                language: 'zh-CN',
                autoclose:true
            }).on("focus",function(){
                dateTime = $(this).val();
                var value = $tr.find(".ed-date").text().replace(/\s/g, "");
                if(value !== ''){
                    $(this).datetimepicker("setEndDate",$tr.find(".ed-date").text());
                }
            }).on("changeDate", function(ev){
                var $this = $(this),
                    $td = $this.closest("td"),
                    curr = ev.date.valueOf(),
                    before = new Date(dateTime).getTime();
                if ($td.hasClass("time-flag") && curr < before && before - curr >= 86400000){
                    var currlayer = layer.confirm("您录入的时间超出申请单的时间范围,请确认是否继续?", {
                        title: '时间确认',
                        btn: ['确认', '取消'],
                        closeBtn: false
                    }, function () {
                        $td.removeClass("time-flag");
                        layer.close(currlayer);
                    }, function(){
                        $td.text(dateTime);
                    });
                }
            });
            return false;
        } else if(edate){
            $this.find('input[type=text]').datetimepicker({
                minView: "month",
                format: "yyyy-mm-dd",
                language: 'zh-CN',
                autoclose:true
            }).on("focus",function(){
                dateTime = $(this).val();
                var value = $tr.find(".st-date").text().replace(/\s/g, "");
                if(value !== ''){
                    $(this).datetimepicker("setStartDate",$tr.find(".st-date").text());
                }
            }).on("changeDate", function(ev){
                var $this = $(this),
                    $td = $this.closest("td");
                console.log(new Date(dateTime).getTime(), ev.date.valueOf());
                if ($td.hasClass("time-flag") && ev.date.valueOf() > new Date(dateTime).getTime()){
                    var currlayer = layer.confirm("您录入的时间超出申请单的时间范围,请确认是否继续?", {
                        title: '时间确认',
                        btn: ['确认', '取消'],
                        closeBtn: false
                    }, function () {
                        $td.removeClass("time-flag");
                        layer.close(currlayer);
                    }, function(){
                        $td.text(dateTime);
                    });
                }
            });
            return false;
        } else{
            $this.find('input[type=text]').datetimepicker({
                minView: "month",
                format: "yyyy-mm-dd",
                language: 'zh',
                autoclose:true
            });
        }

    }, 0);
}

//表格内  根据申请单开始结束时间   限制单个时间选择   
function dateController(cellvalue, options, cell){
  setTimeout(function(){
      var $this = $(cell),
          $tr = $this.closest('tr'),
          flag = $this.hasClass("date-controller"),
          sdate = $('#sDate').val(),
          edate = $('#eDate').val(),
          dateTime;
          
       if(flag){
          $this.find('input[type=text]').datetimepicker({
              minView: "month",
              format: "yyyy-mm-dd",
              language: 'zh-CN',
              autoclose:true
          }).on("focus",function(){
              dateTime = $(this).val();

          }).on("changeDate", function(ev){
              var $this = $(this),
                  $td = $this.closest("td"),
                  curr = ev.date.valueOf(),
                  st = new Date(sdate).getTime(),
                  ed = new Date(edate).getTime();
              //if ($td.hasClass("date-controller") && (curr < before && before - curr >= 86400000)){
              if ($td.hasClass("date-controller") && ((st > curr && st - curr >= 86400000) || (ed < curr))){
                  var currlayer = layer.confirm("您申请的时间范围为"+sdate+"至"+edate+"，现已超出，是否继续？", {
                      title: '时间确认',
                      btn: ['确认', '取消'],
                      closeBtn: false
                  }, function () {
                      // $td.removeClass("date-controller");
                      layer.close(currlayer);
                  }, function(){
                      $td.text(dateTime);
                  });
              }
          });
          return false;
      } else {
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
    $('table.ui-jqgrid-btable tbody').each(function(){
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

            //行删除
            $(document).delegate(tableId + ' .button-trash','click',function(){
                var $this = $(this);
                var adds = $this.hasClass('adds');
                var id = [$this.closest('tr').find(".uid").text()];
                var rowID = $this.closest('tr').attr('id');
                var tabID = $this.closest('table').attr('id');
                var rowDate = $('#'+tabID).jqGrid("getRowData",rowID);

                //数据请求
                var _data = jsonInfo.delReq(rowID,rowDate,tableId);
                if(_data === false){
                }else{
                    $this.closest('tr').remove();
                }
                var rowNum = 1;
                $.each($(tableId).getCol('xmh', true), function () {
                    if (rowID != this.id) {
                        $(tableId).setCell(this.id, 'xmh', rowNum++);
                    }
                });
                // $(tableId).trigger("reloadGrid");
            });

            //行编辑
            $(document).delegate(tableId + ' .ui-inline-save','click',function(){
                var $this = $(this);
                var datas = {};
                var id = tableId.substr(1,tableId.length);
                var rowTr = $this.closest('tr');
                rowTr.find(".pageStatus").html('update');

                $.each(formField,function(i,v){
                    var attrs = "[aria-describedby = '" + id + "_" + v.name + "']";
                    datas[v.name] = rowTr.find(attrs).text();
                });
                datas.rowid = datas.id;
                datas.id = '';
                var rowid = rowTr.attr("id");
                jQuery(tableId).jqGrid('setCell',rowid,"id","&nbsp;");  //行编辑状态
                //数据请求
                jsonInfo.editerReq(datas,rowTr);
            });

            //行添加---
            $(document).delegate(tableId + '-row-adds','click',function(){
                var datas = {},
                    rowid;

                $.each(formField,function(i,v){
                    datas[v.name] = ''
                });

                var timestamp = new Date().getTime();  //当前时间戳
                rowid = timestamp;

                var _d = {};
                _d.tabID = tableId;
                _d.rowid = rowid;
                // addRowId.push(_d);

                $(tableId).addRowData(rowid, datas, "last");
                // jQuery(tableId).jqGrid('editRow',rowid);  //行编辑状态

                // 行项目号处理
                var _rn = $(tableId).getCol('rn',true);
                $.each(_rn,function(i,v){
                    $(tableId).setCell(v.id,'xmh',v.value);
                });

                var $tr =  $(tableId).find('[id = "' + rowid + '"]');

                $tr.find('.ui-inline-cancel').css('display','none');
                $tr.find(".ui-inline-del").remove();
                $tr.find('td > div').append('<div style="display:inline-table;" class="ui-pg-div button-trash adds" onmouseover="jQuery(this).addClass(\'ui-state-hover\');" onmouseout="jQuery(this).removeClass(\'ui-state-hover\');"><span class="ui-icon ui-icon-trash del-form-btn"></span></div>');
                fun.datepicker();

                if(jsonInfo.cellDelState == 'editor'){
                    $(tableId).find('.ui-inline-edit').remove();
                    $(tableId).find('.ui-inline-save').remove();
                }

            });

            //多条删除
            $(document).delegate(tableId + '-del','click',function(){
                var $this = $(tableId);
                var rowid = [];
                var rowDate = $(tableId).jqGrid("getRowData");

                $this.find('input:checkbox').each(function(i){
                    var state = $(this).prop('checked');
                    if(state){
                        rowid.push($(this).closest('tr').attr('id'));
                    }
                });

                if(rowid.length < 1){
                    layer.msg("请选择删除项！",{time:1000,shade:0});
                    return false;
                }

                //数据请求
                jsonInfo.delReq(rowid,function(){
                    $this.find('input:checkbox').each(function(i){
                        var state = $(this).prop('checked');
                        if(state){
                            // id[i] = $(this).closest('tr').find(".uid").text();
                            $(this).closest('tr').remove();
                        }
                    });
                });

            });

            //添加弹层
            $(document).delegate(tableId + '-adds', 'click', function () {
                var html = fun.addHtml(tableId);
                var winH = $(window).height();
                var layerH = 350;

                if (layerH > parseInt(winH) - 50 && parseInt(winH) > 250) {
                    layerH = parseInt(winH) - 50;
                }
                layer.open({
                    type: 1,
                    title: "添加",
                    skin: 'layui-layer-rim', //加上边框
                    area: ['620px', layerH + "px"], //宽高
                    content: html,
                    btn: ['提交', '取消'],
                    yes: function () {
                        var type = true;
                        var $tr = $("#ui-widget-content tr");
                        $tr.each(function () {
                            var inp = $(this).find("input").val();
                            if (inp == "") {
                                $(this).find("input").focus();
                                type = false;
                                return false;
                            }
                        });
                        if (!type) {
                            layer.msg("内容不能有空项！", {time: 1000, shade: 0});
                            type = false;
                            return false;
                        }

                        var datas = {};
                        $("#ui-widget-content .form-group").each(function () {
                            var name = $(this).find(".FormElement").attr("name");
                            var state = $(this).find(".FormElement").attr('select-state');
                            if (name != undefined) {
                                if (state === 'text') {
                                    datas[name] = $(this).find(".FormElement :selected").text();
                                }else{
                                    datas[name] = $(this).find(".FormElement").val();
                                }
                            }else{
                                var bArr = [];
                                var name = $(this).find(':checkbox').attr('name');
                                $(this).find(':checkbox').each(function (i) {
                                    if($(this).prop('checked'))
                                        bArr[i] = $(this).val();
                                });
                                datas[name] = bArr;
                            }
                        });

                        obj[tableId] = parseInt(obj[tableId]) + 1;
                        datas.uid = obj[tableId];
                        datas.pageStatus = 'add';

                        //数据请求
                        var _datas = jsonInfo.addReq(datas, function (tableId) {
                            $(tableId).find(".ui-inline-del").prevAll().css({
                                'float': '',
                                'display': 'inline-table'
                            });
                            $(tableId).find(".ui-inline-del").prevAll('.ui-inline-save').css('display', 'none');
                            $(tableId).find(".ui-inline-del").prevAll('.ui-inline-cancel').css('display', 'none');
                            $(tableId).find(".ui-inline-del").closest('td > div').append('<div style="display:inline-table;margin:0 3px;" class="ui-pg-div button-trash adds" onmouseover="jQuery(this).addClass(\'ui-state-hover\');" onmouseout="jQuery(this).removeClass(\'ui-state-hover\');"><span class="ui-icon ui-icon-trash del-form-btn"></span></div>');
                            $(tableId).find(".ui-inline-edit").next().remove();
                        });

                        if (typeof _datas == 'object') {
                            datas = _datas;
                            $(obj[tableId]).addRowData(obj[tableId], datas, "last");
                            layer.closeAll();
                        } else if (_datas == false) {

                        } else {
                            $(tableId).addRowData(obj[tableId], datas, "last");
                            var $tr = $(tableId).find('[id=' + obj[tableId] +']');
                            $tr.find(".ui-inline-del").prevAll().css({
                                'float': '',
                                'display': 'inline-table'
                            });
                            $tr.find(".ui-inline-del").prevAll('.ui-inline-save').css('display', 'none');
                            $tr.find(".ui-inline-del").prevAll('.ui-inline-cancel').css('display', 'none');
                            $tr.find(".ui-inline-del").closest('td > div').append('<div style="display:inline-table;margin:0 3px;" class="ui-pg-div button-trash adds" onmouseover="jQuery(this).addClass(\'ui-state-hover\');" onmouseout="jQuery(this).removeClass(\'ui-state-hover\');"><span class="ui-icon ui-icon-trash del-form-btn"></span></div>');
                            $tr.find(".ui-inline-edit").next().remove();
                            layer.closeAll();
                            layer.msg("添加成功！", {time: 1000, shade: 0});
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
                return false;
            });

            //取消编辑
            $(document).delegate('.ui-inline-cancel','click',function(){
                var rowid = $(this).closest('tr');
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
                    var timestamp = new Date().getTime();  //当前时间戳
                    obj[tableId] = timestamp;
                    // datas.uid = obj[tableId];

                    var _d = {};
                    _d.tabID = tableId;
                    _d.rowid = obj[tableId];
                    // addRowId.push(_d);

                    $(tableId).addRowData(obj[tableId], datas, "last");
                    // jQuery(tableId).jqGrid('editRow',obj[tableId]);  //行编辑状态

                    // 行项目号处理
                    var _rn = $(tableId).getCol('rn',true);
                    $.each(_rn,function(i,v){
                        $(tableId).setCell(v.id,'xmh',v.value);
                    });

                    var $tr =  $(tableId).find('[id = "' + obj[tableId] + '"]');
                    $('.ui-inline-del').remove();
                    $tr.find('td.iconbutton > div').append('<div style="display:inline-table;margin:0 3px;" class="ui-pg-div button-trash adds" onmouseover="jQuery(this).addClass(\'ui-state-hover\');" onmouseout="jQuery(this).removeClass(\'ui-state-hover\');"><span class="ui-icon ui-icon-trash del-form-btn"></span></div>');
                    $tr.find('.ui-inline-edit').remove();
                    $tr.find('.ui-inline-save').remove();
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
                        }
                    });
                }
                //数据请求
                var _data = jsonInfo.delReq(id);
                if(_data === true){
                    $(':checked').closest('tr').remove();
                }
            });
        },

        idstr:function(id){
            return id.substr(1,id.length);
        },

        //表单加载完成执行
        formLoadO:function(state,tableId,tabH){
            var winW = $(window).width() - 20;
            var tid = fun.idstr(tableId);
            var $tab = $('#gbox_' + tid);
            if(tabH == 'auto'){
                $tab.find(".ui-jqgrid-bdiv").css("height",tabH);
            }else{
                $tab.find(".ui-jqgrid-bdiv").css({
                    "height":tabH,
                    'overflow':'hidden',
                    'overflow-y':'auto',
                }).attr('id',tid + '-scroll');
            }
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
                // $tab.find('.ui-jqgrid-view table').css({
                //     'width':'auto'
                // });
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
//                    $tab.find('.ui-jqgrid-view table').css({
//                        'width':'auto'
//                    });
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
            }else if(state == 'editor'){
                $(tableId).find('td.iconbutton > div').append('<div style="display:inline-table;margin:0 3px;" class="ui-pg-div button-trash" onmouseover="jQuery(this).addClass(\'ui-state-hover\');" onmouseout="jQuery(this).removeClass(\'ui-state-hover\');"><span class="ui-icon ui-icon-trash del-form-btn"></span></div>');
                $(tableId).find('.ui-inline-edit').remove();
            }else{

            }

        },

        //添加弹层html
        addHtml: function(tableId){
            var datas = jsonInfo.addHtmlData(tableId);
            var html = '<div class="ui-jqdialog-content ui-widget-content" id="ui-widget-content">';

            $.each(datas, function (i, v) {
                if (v.type === "select") {
                    //下啦
                    var sel = "";
                    var selArr = v.con;
                    $.each(selArr, function (i, vo) {
                        sel += '<option role="option" value="' + vo.value + '">' + vo.text + '</option>';
                    });

                    html += '<div class="form-group form-horizontal row" id="tr_' + v.name + '" style="margin-bottom:15px;">' +
                        '<div class="col-sm-5 control-label no-padding-right" style="padding-top:3px;">' + v.text + '</div>' +
                        '<div class="col-sm-7">&nbsp;' +
                        '<select role="select" id="FormData-' + v.name + '" name="' + v.name + '" select-state="' + v.state + '" size="1" class="FormElement ui-widget-content ui-corner-all">' +
                        sel +
                        '</select>' +
                        '</div>' +
                        '</div>';
                } else if (v.type === "text") {
                    //文本输入
                    html += '<div class="form-group form-horizontal row" id="tr_' + v.name + '" style="margin-bottom:15px;">' +
                        '<div class="col-sm-5 control-label no-padding-right" style="padding-top:3px;">' + v.text + '</div>' +
                        '<div class="col-sm-7">&nbsp;' +
                        '<input type="text" id="FormData-' + v.name + '" name="' + v.name + '" role="textbox" class="FormElement ui-widget-content ui-corner-all">' +
                        '</div>' +
                        '</div>';
                } else if (v.type === "checkbox") {
                    //文本输入
                    var sel = "";
                    var selArr = v.con;
                    $.each(selArr, function (i, vo) {
                        sel += '<label style="padding-right:10px; margin-top:5px;height:auto;margin-bottom:0;">' +
                            '<input type="checkbox" name="' + v.name + '" class="ace checkboxInfo" value="' + vo.value + '">' +
                            '<span class="lbl"> ' + vo.text + '</span>' +
                            '</label>';
                    });
                    html += '<div class="form-group form-horizontal row" id="tr_' + v.name + '" style="margin-bottom:15px;">' +
                        '<div class="col-sm-5 control-label no-padding-right" style="padding-top:3px;">' + v.text + '</div>' +
                        '<div class="col-sm-7">&nbsp;' +
                        sel +
                        '</div>' +
                        '</div>';
                } else if (v.type === "time") {
                    //时间选择
                    html += '<div class="form-group form-horizontal row" id="tr_' + v.name + '" style="margin-bottom:15px;">' +
                        '<div class="col-sm-5 control-label no-padding-right" style="padding-top:3px;">' + v.text + '</div>' +
                        '<div class="col-sm-7">&nbsp;' +
                        '<input type="text" id="FormData-' + v.name + '" name="' + v.name + '" value="' + new Date().Format("yyyy-MM-dd") + '" role="textbox" class="FormElement ui-widget-content ui-corner-all form_datetime">' +
                        '</div>' +
                        '</div>';
                } else if (v.type === 'textarea') {
                    //多行
                    html += '<div class="form-group form-horizontal row" id="tr_' + v.name + '" style="margin-bottom:15px;">' +
                        '<div class="col-sm-5 control-label no-padding-right" style="padding-top:3px;">' + v.text + '</div>' +
                        '<div class="col-sm-7">&nbsp;' +
                        '<textarea type="text" id="FormData-' + v.name + '" name="' + v.name + '" value="" role="textbox" style="height:50px;" class="FormElement ui-widget-content ui-corner-all "></textarea>' +
                        '</div>' +
                        '</div>';
                } else if (v.type === 'hidden') {
                    html += '<div style="display:none;"><input type="hidden" id="FormData-' + v.name + '" name="' + v.name + '" role="textbox" class="FormElement ui-widget-content ui-corner-all "></div>';
                }
            });
            html += '</div>';

            return html;
        },

        //日期选择初始化
        datepicker:function(){
            $('.form_datetime').datetimepicker({
                minView: "month",
                format: "yyyy-mm-dd",
                language: 'zh',
                autoclose:true
            });
        }
    };

    //日期格式化
    Date.prototype.Format = function (fmt) {
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

        var _tabH = 'auto'; //单元格退出编辑状态执行
        if(setting !== undefined){
            if(typeof setting.tabHeight === 'string'){
                _tabH = setting.tabHeight;
            }
        }

        $.each(formField,function(i,v){
            var tdData = v.classes;
            var isEdit = v.editable;
            var isV = v.editrules;

            if(isEdit === true){
                if(tdData == undefined){
                    v.classes = 'ui-state-editor';
                }else{
                    v.classes = tdData + ' ui-state-editor';
                }
            }
        });

        formField.splice(0,0,{name:"xmh",index:"xmh", width:70, align:"center", editable: false});
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
            sortname: '',
            mtype: "post",        //  post   get   请求
            viewrecords: true,
            sortorder: "",

            //单元格编辑
            cellEdit: jsonInfo.cellEditer,   // 单元格编辑   true:可编辑    false:不可编辑
            cellsubmit: 'clientArray',
            cellurl: '',
            editurl: null,

            //编辑后单行保存
            beforeSubmitCell: function (rowid, celname, value, iRow, iCol) {
            },

            rownumbers: true, //如果为ture则会在表格左边新增一列，显示行顺序号，从1开始递增。此列名为'rn'
            //单元格成功保存后触发
            afterSaveCell: (afterSaveCell || function () {
            }),
            //当插入每行时触发。rowid插入当前行的id；rowdata插入行的数据，格式为name: value，name为colModel中的名字
            afterInsertRow: (afterInsertRow || function () {
            }),

            shrinkToFit: false, //表格宽度  ture 初始化列宽度  false 列宽度使用colModel指定的宽度
            multiselect: true,   //关闭全选
            multiboxonly: true, //为ture时只有选择checkbox才会起作用
            //表格还在完成后执行
            loadComplete: function () {
                var table = this;
                //分页图标
                fun.pageicon(table);

                //表单处理
                fun.formLoadO(jsonInfo.cellDelState,tableId,_tabH);

                if(typeof jsonInfo.seletTraverse === 'function'){
                    jsonInfo.seletTraverse(tableId);
                }

                if (setting!=null&&typeof setting.callback === 'function'){
                    setting.callback();
                }

                obj[tableId] = $(tableId).find('tr').length - 1; //行id

                $.each(formField,function(i,v){
                    var str = tableId.substr(1,tableId.length);
                    if(v.editable == true){
                        var td = "[aria-describedby = '" + str + "_" + v.name + "']";
                        $(td).addClass(v.name);
                    }
                });
                
                if(setting&&setting.loadCompleteFun){
                	setting.loadCompleteFun();
                }
            },
            //表格加载失败
            loadError: function () {
                var table = this;
                //分页图标
                fun.pageicon(table);

                //表单处理
                fun.formLoadO(jsonInfo.cellDelState,tableId,_tabH);

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
    obj.creatFun = function(callback,field,Id,title,sendBtn,tableField,urls,settings){
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
                '<a class="btn btn-primary btn-resize fs-12 fr ejectSubmit">' + sendBtn +
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

        table_form.init(datas.viewField,datas.viewTitle,urls,datas.viewinfo,"#grid-table-hidden","#grid-pager-hidden",null,null,settings);

        var $hidden = $("#hidden-form");

        if(field === true){
            setTimeout(function(){
                var boxW = $hidden.find(".box").width();
                $hidden.find("#grid-pager-hidden").width(boxW);
                $('#gview_grid-table-hidden table,#gview_grid-table-hidden .ui-jqgrid-hdiv,#gview_grid-table-hidden .ui-jqgrid-bdiv').width(tableWidth());
                $('#gview_grid-table-hidden .ui-jqgrid-bdiv').css({
                    'height':'auto'
                });
            },100);
        }

        var w = $hidden.find(".ui-jqgrid-hdiv").width() + 92;
        $hidden.fadeIn(300).find(".ui-jqgrid-hdiv,.ui-jqgrid-bdiv").css("width",w + "px");
        $('.hidden-form-box').fadeIn(300);

        // var top = $(document).scrollTop();
        // $("body").css({"position": "fixed", "top": "-"+top+"px"});
    };

    //日期初始化
    obj.pickerDateTime = function(){
        $('.form_datetime').datetimepicker({
            minView: "month",
            format: "yyyy-mm-dd",
            language: 'zh',
            autoclose:true
        });
    };
    
    $(document).delegate('.hidden-pub-close','click',function(){
        var $this = $(this).closest('.hidden-form');
        $this.fadeOut(300,function () {
            $this.prev().remove();
            $this.remove();
        }).prev().fadeOut(300);

        // var top = Math.abs(parseFloat($("body").css("top")));
        // $("body").css("position", "static");
        // $(document).scrollTop(top);
    });

    // $(document).delegate('td input,td select','blur',function(){
    //     var $this = $(this);
    //     var type = $this.attr('type');
    //     var cls = $this.closest('tr').find('.ui-inline-edit');
    //
    //     if(type === 'checkbox' || cls.length >0){
    //         return false;
    //     }
    //     setTimeout(function(){
    //         $this.closest('tr').find('td').eq(0).trigger('click');
    //     },500)
    // });

    var _val = '';
    $(document).delegate('td input,td select','change',function(){
        var $this = $(this);
        var type = $this.attr('type');
        var cls = $this.closest('tr').find('.ui-inline-edit');
        var val = $(this).val();

        var province_cls = $this.closest('td').hasClass('province'),
            city_cls = $this.closest('td').hasClass('city'),
            area_cls = $this.closest('td').hasClass('area');

        if(province_cls){
            var child = $this.find(':selected').attr('child');
            var data = JSON.parse(child);
            $this.closest('tr').find('.city').attr({
                'child':child,
                'title':data[0].name
            }).html(data[0].name);
            $this.closest('tr').find('.area').attr({
                'child':JSON.stringify(data[0].districts),
                'title':data[0].districts[0].name
            }).html(data[0].districts[0].name);
            $this.closest('td').attr({
                'd-name':$this.find(':selected').text(),
                'title':$this.find(':selected').text()
            });
        }

        if(city_cls){
            var child = $this.find(':selected').attr('child');
            $this.closest('tr').find('.area').attr('child',child).html(JSON.parse(child)[0].name);
            $this.closest('td').attr({
                'd-name':$this.find(':selected').text(),
                'title':$this.find(':selected').text()
            });
        }

        if(area_cls){
            $this.closest('td').attr({
                'd-name':$this.find(':selected').text(),
                'title':$this.find(':selected').text()
            });
        }

        child = '';
        if(type === 'checkbox' || cls.length >0){
            return false;
        }
        _val = '';
        if(!$(this).closest(".ui-pg-table").length){
            setTimeout(function(){
                $this.closest('tr').find('td').eq(0).trigger('click');
            },100);
        }
//        setTimeout(function(){
//            $this.closest('tr').find('td').eq(0).trigger('click');
//        },100)
    });

    $(document).delegate('td select','focus',function(){
        var $this = $(this);
        var province_cls = $this.closest('td').hasClass('province'),
            city_cls = $this.closest('td').hasClass('city'),
            area_cls = $this.closest('td').hasClass('area'),
            html = '',
            _name = $this.closest('td').attr('d-name');

        if(province_cls){

            $.getJSON(globalBase + '/resources/cascade.json',function(data){
                var _data = '';
                $.each(data,function(i,v){
                    if(_name == v.name){
                        html += '<option value="' + v.code + '" child=\'' + JSON.stringify(v.citys) + '\' selected>' + v.name + '</option>';
                    }else{
                        html += '<option value="' + v.code + '" child=\'' + JSON.stringify(v.citys) + '\'>' + v.name + '</option>';
                    }

                    if(i == 0){
                        _data = v.citys;
                        if(_name == undefined){
                            _name = v.name;
                            $this.closest('tr').find('.city').attr({
                                'child':JSON.stringify(_data),
                                'title':_data[0].name
                            }).html(_data[0].name);
                            $this.closest('tr').find('.area').attr({
                                'child':JSON.stringify(_data[0].districts),
                                'title':_data[0].districts[0].name
                            }).html(_data[0].districts[0].name);
                        }

                    }
                });
                $this.html(html);
                $this.closest('td').attr({
                    'd-name':_name,
                    'title':_name
                });
            });

            return false
        }

        if(city_cls){
            var data = $this.closest('td').attr('child');
            var _data = '';
            if(data == undefined){
                html += '<option value="-1" child=""></option>';
            }else{
                data = JSON.parse(data);
                $.each(data,function(i,v){

                    if(_name == v.name){
                        html += '<option value="' + v.code + '" child=\'' + JSON.stringify(v.districts) + '\' selected>' + v.name + '</option>';
                    }else{
                        html += '<option value="' + v.code + '" child=\'' + JSON.stringify(v.districts) + '\'>' + v.name + '</option>';
                    }

                    if(i == 0){
                        _data = JSON.stringify(v.districts);
                        if(_name == undefined){
                            _name = v.name;
                        }
                    }
                });
            }
            $this.html(html);
            $this.closest('tr').find('.area').attr({
                'child':_data
            });
            $this.closest('td').attr({
                'd-name':_name,
                'title':_name
            });

            return false
        }

        if(area_cls){
            var data = $this.closest('td').attr('child');
            if(data == undefined){
                html += '<option value="-1" child=""></option>';
            }else{
                data = JSON.parse(data);
                $.each(data,function(i,v){
                    if(_name == v.name){
                        html += '<option value="' + v.code + '" selected>' + v.name + '</option>';
                    }else{
                        html += '<option value="' + v.code + '">' + v.name + '</option>';
                    }

                    if(i == 0 && _name == undefined){
                        _name = v.name;
                    }
                });
            }
            $this.html(html);
            $this.closest('td').attr({
                'd-name':_name
            });

            return false
        }


    });

    $(document).delegate('td select','blur',function(){
        var $this = $(this);
        var type = $this.attr('type');
        var cls = $this.closest('tr').find('.ui-inline-edit');

        _val = $(this).val();
        if(type === 'checkbox' || cls.length >0){
            _val = '';
            return false;
        }
        setTimeout(function(){
            var val = $this.val();
            if(_val == val || val == ''){
                $this.closest('tr').find('td').eq(0).trigger('click');
            }
        },100)
    });
    
    $(document).on("keyup.pager", "input.ui-pg-input", function(e){
        var key = e.charCode || e.keyCode || 0,
            $this;
        if(key === 13) {
            $this = $(this);
            setTimeout(function(){
                e.preventDefault();
                $this.blur();
            }, 100);
        }
    });

    fun.multiFun();
    return obj;
}();

var tb_op = {
    initMultiDel: function(m){
        var f = false,
            st = "empty",
            all = "all";
        if(Object.prototype.toString.call(m) !== "[object Object]"){
            return;
        } else if(typeof m.currDomId !== "string" || typeof m.tableID !== "string"){
            return;
        }
        if(typeof m.callback === "function"){
            f = true;
        }
        if(m.selectAll){
            all = m.selectAll === "not" ? "not" : "all";
        }
        $(m.currDomId).on("click.del", function(){
            if(st === "empty"){
                st = "op";
                var $tb = $(m.tableID),
                    $all = $tb.find("input[type=checkbox]"),
                    $input = $tb.find("input[type=checkbox]:checked"),
                    alen = $all.length,
                    len = $input.length;
                if(all === "not" && len && alen === len){
                    layer.msg("请至少保留一项!", {time: 1000});
                } else if(len){
                    $input.each(function(i,e){
                        var $tr = $(e).closest("tr");
                        id = $tr.attr("id"),
                            data = $tb.jqGrid("getRowData", id),
                            rt = null;
                        $tr.remove();
                        f && (rt = m.callback(data));
                    });
                } else if(alen) {
                    layer.msg("请选择需要删除项!", {time: 1000});
                } else {
                    layer.msg("已无选项可以删除!", {time: 1000});
                }
                st = "empty";
            } else {
                layer.msg("正在处理数据，请勿重复点击!", {time: 1000});
            }
        });
    },
    initCopyRow: function(m){   //复制行
        var f = false,
            addRowArr = {},
            obj = {};
        if(Object.prototype.toString.call(m) !== "[object Object]"){
            return;
        } else if(typeof m.currDomId !== "string" || typeof m.tableID !== "string"){
            return;
        } else if(Object.prototype.toString.call(m.colModel) !== "[object Array]"){
            return;
        }
        if(typeof m.callback === "function"){
            f = true;
        }
        $(m.currDomId).on("click.copy", function(){
            var $table = $(m.tableID),
                $ck = $table.find("input[type=checkbox]:checked"),
                cklen = $ck.length,
                tbname = m.tableID.substring(1),
                colModel = m.colModel,
                data = {},
                timestamp,
                $p,
                $tr,
                len,
                td,
                i;
            if(cklen === 1){
                len = colModel.length;
                $p = $ck.closest("tr");
                for(i=0; i<len; i++){
                    td = "[aria-describedby = '" + tbname + "_" + colModel[i].name + "']";
                    if($p.find(td).hasClass(m.speClass)){
                        data[colModel[i].name] = $p.find(td).html();
                    } else {
                        data[colModel[i].name] = "";
                    }
                }
                data.id = '';
                timestamp = new Date().getTime();  //当前时间戳
                obj[tbname] = timestamp;

                addRowArr.rowid = $p.attr('id');
                addRowArr.tableName = tbname;

                $table.addRowData(timestamp, data, "last");
                //$table.jqGrid('editRow',timestamp);  //行编辑状态


                var _rn = $table.getCol("rn", true);
                $.each(_rn, function(i, v){
                    $table.setCell(v.id, "xmh", v.value);
                });


                $tr = $table.find('[id = "' + timestamp + '"]');
                $('.ui-inline-del').remove();
                $tr.find('td.iconbutton > div').append('<div title="" style="display:inline-table;margin:0 3px;" class="ui-pg-div button-trash adds" onmouseover="jQuery(this).addClass(\'ui-state-hover\');" onmouseout="jQuery(this).removeClass(\'ui-state-hover\');"><span class="ui-icon ui-icon-trash del-form-btn"></span></div>');
                $tr.find('.ui-inline-edit').remove();
                $tr.find('.ui-inline-save').remove();

                f && m.callback(addRowArr);
            } else if(cklen > 1){
                layer.msg("只能选择一行!", {time: 1000});
            } else {
                layer.msg("请先选择一行!", {time: 1000});
            }

        });
    },
    closeEditStatus: function(m){   //取消编辑状态
        var f = false,
            editors = [],
            $tb = $("table"),
            tblen = $tb.length,
            $tmp,
            $td,
            tdlen,
            $tr,
            tableId,
            rowId,
            row,
            col,
            name,
            i,
            j;

        if(Object.prototype.toString.call(m) !== "[object Object]"){
            return;
        }
        if(typeof m.callback === "function"){
            f = true;
        }
        for(i=0; i<tblen; i++){
            $tmp = $tb.eq(i);
            tableId = $tmp.attr("id");
            if(tableId){
                $td = $tmp.find(".ui-state-editor.edit-cell");
                tdlen = $td.length;
                for(j=0; j<tdlen; j++){
                    $tr = $td.eq(j).closest("tr"),
                        row = $tr.index();
                    rowId = $tr.attr("id");
                    col = $td.eq(j).index();
                    name = $td.attr("aria-describedby");
                    name = name.replace(tableId+"_", "");
                    editors[editors.length] = {tableId: tableId, rowId: rowId, row: row, col: col, name: name};
                    //$td.removeClass("edit-cell ui-state-highlight").find("input").blur();
                    //$tmp.setColProp(name, {editable: false});
                }
                if(tdlen){
                    console.log($tmp.find("tr").eq(0).find("td").eq(0));
                    $tmp.find("tr").eq(1).find("td").eq(0).trigger("click");
                }
            }
        }
        f && m.callback({data: editors, callback: tb_op.restoreEditStatus});
    },
    restoreEditStatus: function(a){
        var tmp,
            len,
            i;
        if(Object.prototype.toString.call(a) !== "[object Array]"){
            return;
        }
        len = a.length;
        for(i=0; i<len; i++){
            tmp = a[i];
            console.log(tmp.name);
            $("#"+tmp.tableId).setColProp(tmp.name, {editable: true});
        }
    },
    pickDates: function(cellvalue, options, cell){
        setTimeout(function(){
            var $this = $(cell),
                $tr = $this.closest('tr'),
                sdate = $this.hasClass("st-date"),
                edate = $this.hasClass("ed-date"),
                stLimite = "",
                edLimite = "",
                dateTime;
            if(sdate){
                //!$this.data("stLimite") && $this.data("stLimite", $this.text());
                $this.find('input[type=text]').datetimepicker({
                    minView: "month",
                    format: "yyyy-mm-dd",
                    language: 'zh-CN',
                    autoclose:true
                }).on("focus",function(){
                    dateTime = $(this).val();
                    var value = $tr.find(".ed-date").text().replace(/\s/g, "");
                    if(value !== ''){
                        $(this).datetimepicker("setEndDate",$tr.find(".ed-date").text());
                    }
                }).on("changeDate", function(ev){
                    var $input = $(this),
                        $td = $input.closest("td"),
                        curr = ev.date.valueOf(),
                        str = $td.siblings(".stTime-val").text() || "",
                        before = new Date(str).getTime();
                    if ($td.hasClass("time-flag") && curr < before && before - curr >= 86400000){
                        var currlayer = layer.confirm("您录入的时间超出申请单的时间范围,请确认是否继续?", {
                            title: '时间确认',
                            btn: ['确认', '取消'],
                            closeBtn: false
                        }, function () {
                            //$td.removeClass("time-flag");
                            layer.close(currlayer);
                        }, function(){
                            $td.text(dateTime);
                        });
                    }
                });
                return false;
            } else if(edate){
                //!$this.data("edLimite") && $this.data("edLimite", $this.text());
                $this.find('input[type=text]').datetimepicker({
                    minView: "month",
                    format: "yyyy-mm-dd",
                    language: 'zh-CN',
                    autoclose:true
                }).on("focus",function(){
                    dateTime = $(this).val();
                    var value = $tr.find(".st-date").text().replace(/\s/g, "");
                    if(value !== ''){
                        $(this).datetimepicker("setStartDate",$tr.find(".st-date").text());
                    }
                }).on("changeDate", function(ev){
                    var $input = $(this),
                        $td = $input.closest("td"),
                        curr = ev.date.valueOf(),
                        str = $td.siblings(".edTime-val").text() || "",
                        after = new Date(str).getTime();
                    if ($td.hasClass("time-flag") && curr > after){
                        var currlayer = layer.confirm("您录入的时间超出申请单的时间范围,请确认是否继续?", {
                            title: '时间确认',
                            btn: ['确认', '取消'],
                            closeBtn: false
                        }, function () {
                            //$td.removeClass("time-flag");
                            layer.close(currlayer);
                        }, function(){
                            $td.text(dateTime);
                        });
                    }
                });
                return false;
            } else{
                $this.find('input[type=text]').datetimepicker({
                    minView: "month",
                    format: "yyyy-mm-dd",
                    language: 'zh',
                    autoclose:true
                });
            }

        }, 0);
    },
    judgeDates: function(m){
        setTimeout(function(){
            var sdate = new Date($(m.startId).val() || ""),
                edate = new Date($(m.endId).val() || ""),
                dateTime,
                year,
                month,
                day;
            year = sdate.getFullYear();
            month = sdate.getMonth()+1;
            month = month < 10 ? "0" + month : month;
            day = sdate.getDate();
            day = day < 10 ? "0" + day : day;
            sdate = year + "-" + month + "-" + day;

            year = edate.getFullYear();
            month = edate.getMonth()+1;
            month = month < 10 ? "0" + month : month;
            day = edate.getDate();
            day = day < 10 ? "0" + day : day;
            edate = year + "-" + month + "-" + day;
            $(m.startTime).datetimepicker({
                minView: "month",
                format: "yyyy-mm-dd",
                language: 'zh-CN',
                autoclose:true
            }).on("focus",function(){
                dateTime = $(this).val();
            }).on("changeDate", function(ev){
                var $this = $(this),
                    curr = ev.date.valueOf(),
                    st = new Date(sdate).getTime();
                if (st > curr && st - curr >= 86400000){
                    var currlayer = layer.confirm("您申请的时间范围为"+sdate+"至"+edate+"，现已超出，是否继续？", {
                        title: '时间确认',
                        btn: ['确认', '取消'],
                        closeBtn: false
                    }, function () {
                        layer.close(currlayer);
                    }, function(){
                        $this.val(dateTime);
                    });
                }
            });

            $(m.endTime).datetimepicker({
                minView: "month",
                format: "yyyy-mm-dd",
                language: 'zh-CN',
                autoclose:true
            }).on("focus",function(){
                dateTime = $(this).val();
            }).on("changeDate", function(ev){
                var $this = $(this),
                    curr = ev.date.valueOf(),
                    ed = new Date(edate).getTime();
                if (ed < curr){
                    var currlayer = layer.confirm("您申请的时间范围为"+sdate+"至"+edate+"，现已超出，是否继续？", {
                        title: '时间确认',
                        btn: ['确认', '取消'],
                        closeBtn: false
                    }, function () {
                        layer.close(currlayer);
                    }, function(){
                        $this.val(dateTime);
                    });
                }
            });
        }, 0);
    },
    pickHiddenDates: function(cellvalue, options, cell){
        setTimeout(function(){
            var $this = $(cell),
                $tr = $this.closest('tr'),
                sdate = $this.hasClass("st-date"),
                edate = $this.hasClass("ed-date"),
                st = new Date($("#sDate").val() || ""),
                ed = new Date($("#eDate").val() || ""),
                dateTime;
            if(sdate){
                //!$this.data("stLimite") && $this.data("stLimite", $this.text());
                $this.find('input[type=text]').datetimepicker({
                    minView: "month",
                    format: "yyyy-mm-dd",
                    language: 'zh-CN',
                    autoclose:true
                }).on("focus",function(){
                    dateTime = $(this).val();
                    var value = $tr.find(".ed-date").text().replace(/\s/g, "");
                    if(value !== ''){
                        $(this).datetimepicker("setEndDate",$tr.find(".ed-date").text());
                    }
                }).on("changeDate", function(ev){
                    var $input = $(this),
                        $td = $input.closest("td"),
                        curr = ev.date.valueOf(),
                        before = new Date(st).getTime();
                    if ($td.hasClass("time-flag") && curr < before && before - curr >= 86400000){
                        var currlayer = layer.confirm("您申请的时间范围为"+st+"至"+ed+"，现已超出，是否继续？", {
                            title: '时间确认',
                            btn: ['确认', '取消'],
                            closeBtn: false
                        }, function () {
                            //$td.removeClass("time-flag");
                            layer.close(currlayer);
                        }, function(){
                            $td.text(dateTime);
                        });
                    }
                });
                return false;
            } else if(edate){
                //!$this.data("edLimite") && $this.data("edLimite", $this.text());
                $this.find('input[type=text]').datetimepicker({
                    minView: "month",
                    format: "yyyy-mm-dd",
                    language: 'zh-CN',
                    autoclose:true
                }).on("focus",function(){
                    dateTime = $(this).val();
                    var value = $tr.find(".st-date").text().replace(/\s/g, "");
                    if(value !== ''){
                        $(this).datetimepicker("setStartDate",$tr.find(".st-date").text());
                    }
                }).on("changeDate", function(ev){
                    var $input = $(this),
                        $td = $input.closest("td"),
                        curr = ev.date.valueOf(),
                        after = new Date(ed).getTime();
                    if ($td.hasClass("time-flag") && curr > after){
                        var currlayer = layer.confirm("您申请的时间范围为"+st+"至"+ed+"，现已超出，是否继续？", {
                            title: '时间确认',
                            btn: ['确认', '取消'],
                            closeBtn: false
                        }, function () {
                            //$td.removeClass("time-flag");
                            layer.close(currlayer);
                        }, function(){
                            $td.text(dateTime);
                        });
                    }
                });
                return false;
            } else{
                $this.find('input[type=text]').datetimepicker({
                    minView: "month",
                    format: "yyyy-mm-dd",
                    language: 'zh',
                    autoclose:true
                });
            }

        }, 0);
    }
};



