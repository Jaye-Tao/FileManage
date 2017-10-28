if (jQuery) {
    (function ($) {
        /**
         * Excel导入
         * @param setting 自定义参数设置
         * @param cancelCallBack 取消按钮回调
         */
        $.fn.importExcel = function (setting, cancelCallBack) {
            var $this = $(this);
            var _import_default = {
                definedInterface: '',
                definedFunction: '',
                baseUrl: '',
                startImportRow: 0,//从第几行开始进行导入
                endImportCol: 'B',//第几行结束
                sheetName: '', //excel 表的第几个sheet名称 进行导入
                type: 'all', //默认all  all:全部写入 (如果某一条数据不匹配:忽略该条数据 继续导入)  直接写表(数据库表)
                //once :一次性 (如果某一条数据不匹配:不允许导入) 一次性
                //temp : 数据不存在事务关联 可定义将数据传回
                //回调方法 只有当 type为temp时可用
                callBackResponse: null,
                validColumn: [
                    {
                        className: 'com.bozhi.con.Test', // 完全报名
                        columns: [
                            {
                                fieldName: '', //与实体的的字段名称对应
                                fieldType: 'String',      // 对应的类型
                                isRequired: true//default:false:是否认必填 默认不必填
                            },
                            {
                                isTransient: true//defalt:false (是否临时,有些Excel 里面的字段在 表中不存在,临时占位)
                            },
                            {
                                fieldName: '',
                                fieldType: 'Date',
                                format: [
                                    'yyyy-MM-dd',
                                    'yyyy-MM-dd hh:mm:ss',
                                    'yyyy/MM/dd hh:mm:ss'
                                ]
                            }
                        ],
                        //扩展
                        extras: [
                            {
                                fieldName: '', //与实体的的字段名称对应
                                fieldType: 'String',      // 对应的类型
                                fieldValue: ''
                            }
                        ]
                    }
                ],

            };
            var options = $.extend( _import_default, setting || {},true);
            if (!isNotNull(options.baseUrl)) {
                throw ("baseUrl is null!");
            }
            gloadBaseUrl = options.baseUrl;
            if (options != null && isNotNull(options.definedFunction) && isNotNull(options.definedInterface) && isNotNull(options.validColumn) && options.validColumn.length > 0) {
                if (options != null && options.validColumn.length > 0) {
                    var validColumns = options.validColumn;
                    for (var i = 0; i < validColumns.length; i++) {
                        var setValidColumn = validColumns[i].columns;
                        for (var j = 0; j < setValidColumn.length; j++) {
                            var column = setValidColumn[j];
                            if (column.fieldType != null && column.fieldType.toLowerCase() == 'date' && (!isNotNull(column.formart) || column.formart.length == 0)) {
                                column.formart = _import_default.validColumn[0].columns[2].formart;
                            }
                        }
                    }
                }

                $this.on("click", function () {
                    $("#advancedImportModal").remove();
                    $("body").append(htmlAppendUtils.import());
                    htmlAppendUtils.showImportModal()
                });
                //点击事件
                $(document).on('click', "#importBtn", function () {
                    if (!isNotNull($("#excelFiles").val())) {
                        alert("请选择要导入的Excel文件!");
                        return;
                    }
                    htmlAppendUtils.resetImportModal();
                    $(this).attr("disabled", "true");
                    $("#err_msg").html('');
                    $("#div_run div").hide();
                    $("#div_finishData").hide();
                    //文件上传中,等待状态
                    $("#div_reading").show();
                    $("#jsData").val(JSON.stringify(options));
                    $("#commonImportForm").submit();
                });
                /** 取消*/
                $(document).on("click", ".cancelImportModalBtn", function () {
                    $('#advancedImportModal').modal('hide');
                    if(isNotNull(cancelCallBack) && (typeof cancelCallBack == "function")) {
                        cancelCallBack();
                    }
                    // self.location.reload();
                });
            }
        }
    })(jQuery);

    var isNotNull = function (obj) {
        return obj !== null && obj !== '' && obj !== 'undefined' && typeof (obj) !== 'undefined';
    }


    var importCallMethods = {
        /***   导入 **/
        //类型为 临时类型时 数据返回
        writeByTempCallBack: function (uuid,callBackResponse) {
            if(isNotNull(callBackResponse)) {
                $.post(gloadBaseUrl+"/admin/commonImportExcel/tempImportCallback.jhtml",{uuid:uuid},function (data) {
                    var c = eval(callBackResponse);
                    c(data);
                })
            }
        },
        writeRowPositionByImport: function (position) {
            var $writeData = $("#div_writeData");
            if ($writeData.is(":hidden")) {
                $("#div_writeData").show();
            }
            $("#currentPosition").html(position);
        },
        //解析成功
        totalRows: function (totalRows, realtotalRows) {
            $("#div_reading_success").show();
            $("#div_reading_success").html("&nbsp;&nbsp;&nbsp;文件解析成功,本次应导入[<span style='color:red'>" + totalRows + "</span>]行记录,实导入[<span style='color:red'>" + realtotalRows + "</span>]行记录");
        },
        //导入成功
        successFinish: function (realtotalRows) {
            $("#div_finishData").show();
            $("#finishData").html("&nbsp;&nbsp;&nbsp;本次导入成功,已导入[<span style='color:red'>" + realtotalRows + "</span>]行数据!");
            $("#importBtn").attr("disabled", false);
        },
        //导入失败
        erroRead: function (msg) {
            $("#div_reading_success").show();
            $("#div_reading_success").html(msg);
            $("#importBtn").attr("disabled", false);
        },
        //导入失败
        erroFinish: function (realtotalRows) {
            $("#div_finishData").show();
            $("#finishData").html("&nbsp;&nbsp;&nbsp;<span style='color:red'>本次导入失败,已导入[0]行数据,请根据错误提示信息,修改之后,重新导入!</span>");
            $("#importBtn").attr("disabled", false);
        },

        error: function (msg, rowCount, colCount) {
            $("#err_msg").append("<div>&nbsp;&nbsp;&nbsp;第[<span style='color: red; '>" + rowCount + "</span>]行 第[<span style='color: red; '>" + colCount + "</span>]列  出现错误  错误信息:" + msg + "</div>");
        },

        writeRowErro: function (msg, rowCount) {
            $("#err_msg").append("<div>&nbsp;&nbsp;&nbsp;第[<span style='color: red; '>" + rowCount + "</span>]行 出现错误  错误信息:" + msg + "</div>");
        }

    }


    var htmlAppendUtils = {
        import: function () {
            var html = '<div name="importDiv" class="modal fade" id="advancedImportModal" tabindex="-1" role="dialog"  aria-labelledby="myImportModalLabel" aria-hidden="true" data-backdrop="static">' +
                '    <div class="modal-dialog">                                                                                                                                          ' +
                '        <div class="modal-content">                                                                                                                                     ' +
                '            <div class="modal-header">                                                                                                                                  ' +
                '                <h4 class="modal-title" id="myImportModalLabel">EXCEL导入</h4>                                                                                                  ' +
                '            </div>                                                                                                                                                      ' +
                '            <div class="modal-body">                                                                                                                                    ' +
                '                <form id="commonImportForm" method="post" enctype="multipart/form-data" target="commonImportExcel" style="width:100%;float:left;" action="' + gloadBaseUrl + '/admin/commonImportExcel/commomImportExcel.jhtml">                                   ' +
                '                    <table width="100%" class="input" border="1px" id="top" align="center" cellpadding="4" cellspacing="4">                                            ' +
                '                        <tr>                                                                                                                                            ' +
                '                            <td class="width1" align="right">                                                                                                           ' +
                '                                <span style="color: red;">*</span>Excel文件:                                                                                              ' +
                '                            </td>                                                                                                                                       ' +
                '                            <td class="width2">                                                                                                                         ' +
                '                                <input type="file" id="excelFiles" name="excelFiles" accept=".xls,.xlsx"/></td>                                                         ' +
                '                            <td align="left">                                                                                                                           ' +
                '                                <input id="jsData" name="jsData" type="hidden">                                                                                         ' +
                '                                <input id="importBtn" type="button" class="btn btn-sm" value="导入"/>                                                                              ' +
                '                            </td>                                                                                                                                       ' +
                '                        </tr>                                                                                                                                           ' +
                '                    </table>                                                                                                                                            ' +
                '                </form>                                                                                                                                                 ' +
                '                <div id="div_run" style="font-size:12px;float:left;">                                                                                                   ' +
                '                    <div id="div_reading">&nbsp;文件上传解析中,请稍候...</div>                                                                                                    ' +
                '                    <div id="div_reading_success"></div>                                                                                                                ' +
                '                    <div id="div_writeData">&nbsp;&nbsp;当前正在导入第[<span id="currentPosition"></span>]行记录</div>                                                            ' +
                '                </div>                                                                                                                                                  ' +
                '                <div id="err_msg" style="overflow: auto; height: 270px;width: 100%; border: 1px solid;margin-top: 50px;">&nbsp;</div>                                                                      ' +
                '                <div>                                                                                                                                                   ' +
                '                    <div id="div_finishData">                                                                                                                           ' +
                '                        <div><span id="finishData"></span></div>                                                                                                        ' +
                '                    </div>                                                                                                                                              ' +
                '                </div>                                                                                                                                                  ' +
                '                <iframe name="commonImportExcel" width="100%" height="10px;"  frameborder="0"  marginheight="0" marginwidth="0" src="' + gloadBaseUrl + '/components/js/showmsg.jsp"></iframe>                                                           ' +
                '            </div>                                                                                                                                                      ' +
                '            <div class="modal-footer">                                                                                                                                  ' +
                '                <button type="button" class="btn btn-default cancelImportModalBtn">取消</button>                                                                                ' +
                '            </div>                                                                                                                                                       ' +
                '        </div>                                                                                                                                                           ' +
                '    </div>                                                                                                                                                               ' +
                '</div>                                                                                                                                                                   ';
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
            var orderColumnIndex = params.order[0]["column"];
            var orderColumnName = params.columns[orderColumnIndex]["data"];
            var sort = params.order[0]["dir"];
            $("#columnSortIndex").val(orderColumnIndex);
            $("#columnSortName").attr("name", "columns[" + orderColumnIndex + "][data]").val(orderColumnName);
            $("#columnSortVal").val(sort);

            var searchValue = params.search["value"];
            $("#columnSearch").val(searchValue);
            $("#defalutParams").val(JSON.stringify(params));
            $("#exportDataJson").val(JSON.stringify(exportData));

            $("#sourceColumns").val(JSON.stringify(sourceColumns));
            $("#headerColumns").val(JSON.stringify(headerNames));
        },
        isArray: function (o) {
            return Object.prototype.toString.call(o) === '[object Array]';
        }
    }
}