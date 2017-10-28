if (jQuery) {
    (function ($) {
        /**
         * excel导出
         * @param gridTable 表格
         * @param setting 配置
         * @param callBack 回调方法 导出完成点击关闭按钮时触发
         */
        $.fn.exportExcel = function (gridTable, setting, callBack) {
            var $this = $(this);
            var _export_default = {
                baseUrl: '',
                exportController: '',
                exportMethod: '',
                args: [
                    {clazz: "integer", name: "start", value: 1},
                    {clazz: "integer", name: "length", value: 10000},
                    {clazz: "boolean", name: "isCount", value: false},
                    {clazz: "httpServletRequest"}
                ]
            }

            var options = $.extend(_export_default, setting || {}, true);
            if (!isNotNull(options.baseUrl)) {
                throw ("baseUrl is null!");
            }
            gloadBaseUrl = options.baseUrl;
            if (isNotNull(gridTable)) {
                $("body").append(htmlAppendUtils.exportHtml());
                htmlAppendUtils.resetModal();
                //导出按钮
                $this.on("click", function () {
                    htmlAppendUtils.showModal();
                });
                //点击导出按钮
                $(document).on("click", ".exportModalBtn", function () {
                    $(this).attr("disabled", true);
                    var colModels = gridTable.getGridParam("colModel");
                    var colNames = gridTable.getGridParam("colNames");
                    var params = gridTable.getGridParam("postData");
                    var url = gridTable.getGridParam("url");
                    var allParams = params;
                    if (isNotNull(url)) {
                        var urlParams = htmlAppendUtils.parseUrl(url);
                        if (isNotNull(urlParams)) {
                            allParams = $.extend(urlParams, params);
                        }
                    }
                    var tableColumns = [];
                    var tableHeaderNames = [];
                    var cols = [];
                    var colObj = {};
                    for (var i = 0; i < colModels.length; i++) {
                        var colModel = colModels[i];
                        if (htmlAppendUtils.isSysExists(colModel.name)) {
                            continue;
                        }
                        if(colModel.hidden) {
                            continue;
                        }
                        var exportObject = {};
                        var headerName = {};

                        exportObject.isFill = true;
                        exportObject.fieldName = colModel.name;
                        tableColumns.push(exportObject);

                        headerName.title = colNames[i];
                        cols.push(headerName);
                    }
                    colObj.cols = cols;
                    tableHeaderNames.push(colObj);

                    // var params = definedPage.ajax.params();
                    // var sourceColumns = htmlAppendUtils.parseTableColumns(colModel);
                    // var headerNames = htmlAppendUtils.getTableHederName(colNames);

                    htmlAppendUtils.insertValueToHtml(allParams, options, tableColumns, tableHeaderNames);
                    $.post(gloadBaseUrl + '/admin/exportExcel/judgeIsHasDatas.jhtml', $("#advancedExportFrom").serialize(), function (data) {
                        if (data != null) {
                            if (data.msg != null && data.msg != '') {
                                commonExportTitleMsgShow(data.msg, true);
                                $(".exportModalBtn").attr("disabled", true);
                                //转换提交
                                $("#advancedExportFrom").submit();
                            } else {
                                commonExportTitleMsgShow("数据解析失败,该模板不可用!", false)
                            }
                        } else {
                            commonExportTitleMsgShow("数据解析失败,该模板不可用!", false)
                        }
                    });
                })

                /** 取消*/
                $(document).on("click", ".cancelModalBtn", function () {
                    $('#advancedExportModal').modal('hide');
                    if (isNotNull(callBack) && (typeof callBack == 'function')) {
                        callBack();
                    }
                });
            }
        }
    })(jQuery);

    var isNotNull = function (obj) {
        return obj !== null && obj !== '' && obj !== 'undefined' && typeof (obj) !== 'undefined';
    }


    var htmlAppendUtils = {
        exportHtml: function () {
            var html =
                '<div name="exportDiv" class="modal fade" id="advancedExportModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static">             				' +
                '        <div class="modal-dialog">                                                                                                                                                                   ' +
                '            <div class="modal-content">                                                                                                                                                              ' +
                '                <div class="modal-header">                                                                                                                                                           ' +
                '                    <h4 class="modal-title" id="myModalLabel">EXCEL导出</h4>                                                                                                                            ' +
                '                </div>                                                                                                                                                                               ' +
                '                <div class="modal-body">                                                                                                                                                             ' +
                '                	<form class="form-horizontal" id="advancedExportFrom" target="advancedExportframe" action="' + gloadBaseUrl + '/admin/exportExcel/export.jhtml" method="post" accept-charset="UTF-8">       ' +
                '		             <div class="box-body">                                                                                                                                                              ' +
                '		                <div class="form-group">                                                                                                                                                         ' +
                '		                  <label for="excelName" class="col-sm-2 control-label">导出名称:</label>                                                                                                          ' +
                '		                  	<div class="col-sm-10" id="export_default_div_param">                                                                                                                                                      ' +
                '		                 		<input type="hidden" name="exportFieldColumns" id="sourceColumns"/>' +
                '								<input type="hidden" name="exportHeaderColumns" id="headerColumns"/>' +
                '								<input type="hidden" name="fieldColumns" id="fieldColumns"/>' +
                '								<input type="hidden" id="columnSortName"/>' +
                '								<input type="hidden" name="exportDataJson" id="exportDataJson"/>' +
                '								<input type="hidden" name="defalutParams" id="defalutParams"/>' +
                '				                <input type="text" class="form-control" id="excelName" name="excelName"/>                                                                                              ' +
                '				             </div>                                                                                                                                                                          ' +
                '		                </div>                                                                                                                                                                           ' +
                '		                <div class="form-group">                                                                                                                                                         ' +
                '		                  <label id="commonExportTitleMsg" class="col-sm-12 control-label"></label>                                                                                                                  ' +
                '		                </div>                                                                                                                                                                           ' +
                '		                 <div class="form-group">                                                                                                                                                        ' +
                '		                  <label id="commonExportMsg"  class="col-sm-12 control-label"></label>                                                                                                                ' +
                '		                </div>                                                                                                                                                                           ' +
                '		                 <div class="form-group">                                                                                                                                                        ' +
                '		                  <label id="commonFinishedMsg"  class="col-sm-12 control-label"></label>                                                                                                              ' +
                '		                </div>                                                                                                                                                                           ' +
                '		              </div>                                                                                                                                                                             ' +
                '		              <!-- /.box-footer -->                                                                                                                                                              ' +
                '		            </form>                                                                                                                                                                              ' +
                '                </div>                                                                                                                                                                               ' +
                '                 <iframe name="advancedExportframe" id="exportframe" width="100%" height="100px;"  frameborder="0"  marginheight="0" marginwidth="0" src="' + gloadBaseUrl + '/components/js/showmsg.jsp"></iframe>' +
                '                <div class="modal-footer">                                                                                                                                                           ' +
                '                    <button type="button" class="btn btn-primary exportModalBtn">导出</button>                                                                                                             ' +
                '                    <button type="button" class="btn btn-default cancelModalBtn" >取消</button>                                                                                                            ' +
                '                </div>                                                                                                                                                                               ' +
                '            </div>                                                                                                                                                                                   ' +
                '        </div>                                                                                                                                                                                       ' +
                '</div>                                                                                                                                                                                               ';
            return html;
        },
        resetModal: function () {
            $(".exportModalBtn").attr("disabled", false);
            $("#exportMsg").html('');
            $("#titleMsg").html('');
            $("#finishedMsg").html('');
        },
        showModal: function () {
            $('#advancedExportModal').modal('show');
            $('.modal-backdrop').css("z-index", 1029);
            htmlAppendUtils.resetModal();
        },
        showImportModal: function () {
            $('#advancedImportModal').modal('show');
            $('.modal-backdrop').css("z-index", 1029);
            htmlAppendUtils.resetImportModal();
        },
        resetImportModal: function () {
            $("#div_reading").hide();
            $('#finishData').html('');
            $('#div_reading_success').html('');
            $('#err_msg').html('');
            $('#div_reading_success').html('');
            $('#currentPosition').html('');
            $('#div_writeData').hide();
        },
        /**
         * isFill 是否填充.当遇到复杂表头时,自动设置为空值
         * 否则,则自动忽略该列.不进行导出
         * */
        parseTableColumns: function (columns) {
            var tableColumns = [];
            for (var i = 0; i < columns.length; i++) {
                //var exportObject = new ExportObject()
                var exportObject = {};
                var column = columns[i];
                var fieldName = column.data;
                var isFill = column.isFill;
                exportObject.fieldName = fieldName;
                var valueFormat = column.valueFormat;
                if (isNotNull(isFill)) {
                    exportObject.isFill = isFill;
                } else {
                    exportObject.isFill = true;
                }
                var dateFormat = column.dateFormat;
                if (isNotNull(dateFormat)) {
                    exportObject.dateFormat = dateFormat;
                }
                if (isNotNull(valueFormat)) {
                    exportObject.valueFormat = valueFormat;
                }
                tableColumns.push(exportObject);
            }
            return tableColumns;
        },
        getTableHederName: function ($this) {
            var rowObj = {};
            var rows = [];
            //行或者列合并
            $this.find("thead > tr").each(function (index, data) {
                var $ths = $(data).find("th");
                var cols = [];
                var colObj = {};
                $ths.each(function (thIndex, thData) {
                    var rowspanCount = $(thData).attr("rowspan");
                    var colspanCount = $(thData).attr("colspan");
                    var col = {};
                    col.title = $(thData).text();
                    if (isNotNull(rowspanCount)) {
                        col.rowspanCount = rowspanCount;
                    }
                    if (isNotNull(colspanCount)) {
                        col.colspanCount = colspanCount;
                    }
                    cols.push(col);
                });
                colObj.cols = cols;
                rows.push(colObj);

            });
            rowObj.rows = rows;
            return rows;
        },
        insertValueToHtml: function (params, exportData, sourceColumns, headerNames) {
            var $exportDiv = $("#export_default_div_param");
            if (isNotNull(params)) {
                for (var key in params) {
                    $exportDiv.append(htmlAppendUtils.inputHiddenHtml(key, params[key]));
                }
            }
            $("#defalutParams").val(JSON.stringify(params));
            $("#exportDataJson").val(JSON.stringify(exportData));

            $("#sourceColumns").val(JSON.stringify(sourceColumns));
            $("#headerColumns").val(JSON.stringify(headerNames));
        },
        isArray: function (o) {
            return Object.prototype.toString.call(o) === '[object Array]';
        },
        inputHiddenHtml: function (name, value) {
            return inputHiddenHtml = '<input type="hidden" name="' + name + '" value="' + value + '" />';
        },
        isSysExists: function (colName) {
            var sysMarks = ["rn", "cb", "uid", "myac","pageStatus","xmh"];
            var isExists = false;
            for (var i = 0; i < sysMarks.length; i++) {
                var sysMark = sysMarks[i];
                if (colName == sysMark) {
                    isExists = true;
                    break;
                }
            }
            return isExists;
        },
        /**
         * 获取url后的参数
         * @param _url
         * @returns {{}}
         */
        parseUrl: function (_url) {
            var pattern = /(\w+)=(\w+)/ig;
            var parames = {};//定义数组
            _url.replace(pattern, function (a, b, c) {
                parames[b] = c;
            });
            /*这是最关键的.当replace匹配到classid=9时.那么就用执行function(a,b,c);其中a的值为:classid=9,b的值为classid,c的值为9;(这是反向引用.因为在定义 正则表达式的时候有两个子匹配.)然后将数组的key为classid的值赋为9;然后完成.再继续匹配到id=2;此时执行function(a,b,c);其中a的值为:id=2,b的值为id,c的值为2;然后将数组的key为id的值赋为2.*/
            return parames;//返回这个数组.
        }
    }
    /** 显示导出多少条*/
    var showExportNumber = function (number) {
        $("#commonExportMsg").html('当前正在导出第<span style="color: red; ">[' + number + ']</span>条数据!');
    }
    /** 回调导出*/
    var downCommonExcel = function (uuid) {
        window.location.href = gloadBaseUrl + "/admin/exportExcel/downCommonExcel.jhtml?uuid=" + encodeURIComponent(uuid);
    }
    var writeFinished = function (time) {
        $("#commonFinishedMsg").html('导出完成,本次导出总花费:<span style="color: blue; ">' + time + '</span> 秒');
        $(".exportModalBtn").attr("disabled", false);
    }
    var commonExportTitleMsgShow = function (msg, isSuccess) {
        if (isSuccess) {
            $("#commonExportTitleMsg").css("color", "green");
        } else {
            $("#commonExportTitleMsg").css("color", "red");
        }
        $("#commonExportTitleMsg").html(msg);
    }
}