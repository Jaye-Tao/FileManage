//分页
var gloadBaseUrl;

var _import_default = {
    definedInterface : '',
    definedFunction : '',
    startImportRow : 0,//从第几行开始进行导入
    endImportCol : 'B',//第几行结束
    sheetName : '', //excel 表的第几个sheet名称 进行导入
    type : 'all', //默认all  all:全部写入 (如果某一条数据不匹配:忽略该条数据 继续导入)  直接写表(数据库表)
    //once :一次性 (如果某一条数据不匹配:不允许导入) 一次性
	//temp : 数据不存在事务关联 可定义 报数据传回
    validColumn :[
        {	index:1,        //参数
            className : 'com.bozhi.con.Test', // 完全报名
            columns:
                [
                    {	fieldName : '', //与实体的的字段名称对应
                        fieldType : String,      // 对应的类型
                        isRequired: true//default:false:是否认必填 默认不必填
                    },
                    {
                        isTransient : true//defalt:false (是否临时,有些Excel 里面的字段在 表中不存在,临时占位)
                    },
                    {
                        fieldName :'',
                        fieldType :'Date',
                        format : [
                            'yyyy-MM-dd',
                            'yyyy-MM-dd hh:mm:ss',
                            'yyyy/MM/dd hh:mm:ss'
                        ]
                    }
                ]
        }
    ]
};


if (jQuery) {
	(function($) {
		$.fn.page = function(setting,callBack) {
			var definedPage;
			var $this = this;
			var _setting = {
				sDom: '<"datatable-header"<"dataTables_filter">rl><"datatable-scroll"rt><"datatable-footer"rip>',
				paging : true,
				pagingType : "simple_numbers",
				lengthChange : false,
				ajax: {
		            type: "POST"
		        },
				searching : true,
                export : null,
				import : null,
				processing: true,
				serverSide: true,
				ordering : true,
				info : true,
				colReorder : true,
				scrollX : "100%",
				scrollCollapse : true,
				autoWidth : false,
				iDisplayLength : 10,
				language : {
					paginate : {
						previous : "上一页",
						next : "下一页"
					},
					info : "当前显示 _START_ 到 _END_ 条,一共 _TOTAL_ 条",
					infoEmpty: "当前显示 _START_ 到 _END_ 条,一共 _TOTAL_ 条",
					search : "",
					searchPlaceholder: "数据搜索",
					zeroRecords: "无符合条件数据",
					processing: "<label style='color:#FC0D1B'>稍等,页码君正在赶来的路上...</label>"
				},
				colReorder : {
					fixedColumnsLeft : 1
				}
			}
			
			var descOptions = $.extend(true, _setting, setting || {});
			if(setting.severSide != null && setting.severSide == true) {
				if(setting.columns == null || setting.columns.length <=0) {
					throw ("columns is not defined ");
				}
				descOptions.columns = setting.columns;
			}
			
			descOptions.initComplete = function(settings) {
					if(descOptions.searching) {
						var searchHTML = '<label><input type="search" class="form-control input-sm" placeholder="回车搜索" aria-controls="'+$this.id+'"></label>';
					}
					if(descOptions.isAdvancedSearch) {
						var advancedHtml = '<input type="button" value="高级搜索" class="btn btn-sm" data-toggle="offcanvas" id="advancedSearchBtn"/>';
						searchHTML = searchHTML + advancedHtml; 
						var htmlObj = descOptions.isAdvancedSearch.searchHtml;
						var childHtml = $(htmlObj).children().clone();
						$(htmlObj).children().remove();
						$(htmlObj).append(htmlAppendUtils.appendSpiderHtml());
						$("#advancedSearch-cont").append(childHtml);
						
						$("body").append('<div id="showandhideDiv" class="btn-success" style="width:20px;position:fixed;top:30%;right:0;z-index:999;"><label style="font-size:12px;padding: 4px 0 0px;text-align: center;line-height: 13px;">展开</label></div>');
						if( $(descOptions.isAdvancedSearch.searchHtml) != null &&  $(descOptions.isAdvancedSearch.searchHtml) != 'undefined') {
							$(descOptions.isAdvancedSearch.searchHtml).show();
						}
						$(document).on("click",'#showandhideDiv',function(){
							$("#advancedSearch-warp").addClass("control-sidebar-open");
						})
					}
					if(descOptions.export) {
						if(!isNotNull(descOptions.baseUrl)) {
							throw ("baseUrl is null!");
						}
						if(!isNotNull(descOptions.export)) {
                            throw ("export is null!");
						}
                        gloadBaseUrl = descOptions.baseUrl;
                        var advancedExportHtml = '<input type="button" value="导出" class="btn btn-sm" data-toggle="offcanvas" id="advancedExportBtn"/>';
                        searchHTML = searchHTML + advancedExportHtml;
                        $("body").append(htmlAppendUtils.exportHtml());
                        htmlAppendUtils.resetModal();
                        //高级导出按钮
                        $(document).on("click","#advancedExportBtn",function () {
                            htmlAppendUtils.showModal();
                        });
                        //点击导出按钮
                        $(document).on("click",".exportModalBtn",function () {
                        	$(this).attr("disabled",true);
                            var columns = descOptions.columns;
                            var params = definedPage.ajax.params();
							var sourceColumns = htmlAppendUtils.parseTableColumns(columns);
                            var headerNames = htmlAppendUtils.getTableHederName($this);
                            htmlAppendUtils.insertValueToHtml(params,descOptions.export,sourceColumns,headerNames);
                            $.post(gloadBaseUrl+'/admin/exportExcel/judgeIsHasDatas.jhtml',$("#advancedExportFrom").serialize(),function(data){
                                if(data != null) {
                                    if(data.msg != null && data.msg != '' ) {
                                        commonExportTitleMsgShow(data.msg,true);
                                        $(".exportModalBtn").attr("disabled",true);
                                        //转换提交
                                        $("#advancedExportFrom").submit();
                                    }else {
                                        commonExportTitleMsgShow("数据解析失败,该模板不可用!",false)
                                    }
                                }else {
                                    commonExportTitleMsgShow("数据解析失败,该模板不可用!",false)
                                }
                            });
                        })

                        /** 取消*/
                        $(document).on("click",".cancelModalBtn",function() {
                            $('#advancedExportModal').modal('hide');
                            self.location.reload();
                        });
					}

					if(descOptions.import) {
                        if(!isNotNull(descOptions.baseUrl)) {
                            throw ("baseUrl is null!");
                        }
                        gloadBaseUrl = descOptions.baseUrl;
						var options = descOptions.import;
                        if(options != null && isNotNull(options.definedFunction) &&  isNotNull(options.definedInterface) && isNotNull(options.validColumn) && options.validColumn.length > 0 ) {
                            var descImportOptions = $.extend({}, _import_default, options || {});
                            if(descImportOptions != null && descImportOptions.validColumn.length > 0) {
                                var validColumns = descImportOptions.validColumn;
                                for(var i = 0 ;i<validColumns.length;i++) {
                                    var setValidColumn = validColumns[i].columns;
                                    for(var j=0 ; j<setValidColumn.length ; j ++) {
                                        var column = setValidColumn[j];
                                        if(column.fieldType!=null&&column.fieldType.toLowerCase() == 'date' && (!isNotNull(column.formart ) || column.formart.length==0)) {
                                            column.formart = _import_default.validColumn[0].columns[1].formart;
                                        }
                                    }
                                }
                            }

                            var advancedImportHtml = '<input type="button" value="导入" class="btn btn-sm" data-toggle="offcanvas" id="advancedImportBtn"/>';
                            searchHTML = searchHTML + advancedImportHtml;
                            $("body").append(htmlAppendUtils.import());

                            $(document).on('click',"#advancedImportBtn",function () {
								htmlAppendUtils.showImportModal()
                            });

                            $(document).on('click',"#importBtn",function(){
                                if (!isNotNull($("#excelFiles").val())) {
                                    alert("请选择要导入的Excel文件!");
                                    return;
                                }
                                htmlAppendUtils.resetImportModal();
                                $(this).attr("disabled","true");
                                $("#err_msg").html('');
                                $("#div_run div").hide();
                                $("#div_finishData").hide();
                                //文件上传中,等待状态
                                $("#div_reading").show();
                                $("#jsData").val(JSON.stringify(descImportOptions));
                                $("#commonImportForm").submit();
                            });

                            /** 取消*/
                            $(document).on("click",".cancelImportModalBtn",function() {
                                $('#advancedImportModal').modal('hide');
                                self.location.reload();
                            });
                        }
					}
					$('.dataTables_filter').append(searchHTML); //快捷操作的HTML DOM
					var searchVal = '';
					$('.dataTables_filter input').bind('keyup',function(e) {
					    //监听回车键
						if (e.keyCode == 13) {
							if(descOptions.isAdvancedSearch) {
								getValue();
							}else {
                                var encode = encodeURIComponent(this.value);
								definedPage.search(encode).draw();
							}
						}
					});
					/** 高级搜索*/
					$('#submitSearchBtn').on('click',function(){
						getValue();
					});

					var appendValue = function () {
						var inputSearchVal = $('.dataTables_filter input').val();
						if(isNotNull($("#advancedSearch-cont"))) {
                            var fieldvalues = $("#advancedSearch-cont").serialize();
                            inputSearchVal = "sourceSearchInput="+encodeURIComponent(inputSearchVal);
                            if(fieldvalues != null && fieldvalues != '' && fieldvalues != 'undefined') {
                                inputSearchVal = inputSearchVal +"&"+fieldvalues;
                            }
						}
						return inputSearchVal;
                    };

					var getValue = function() {
						definedPage.search(appendValue()).draw();
					}
					
					/** 高级搜索按钮显示/隐藏*/
					$('#advancedSearchBtn').on('click',function(){
						if($("#advancedSearch-warp").attr("class").indexOf('control-sidebar-open') == -1) {
							$("#advancedSearch-warp").addClass("control-sidebar-open");
						}else {
							$("#advancedSearch-warp").removeClass("control-sidebar-open");
						}
					});
					
					/** 隐藏*/
					$('#hideSidebarBtn').on('click',function(){
						$("#advancedSearch-warp").removeClass("control-sidebar-open");
					});
					
					if(callBack != null && callBack != 'undefined' && typeof(callBack) == 'function') {
						callBack();
					}
					
			     }
				//processing : true, // 打开数据加载时的等待效果
				//serverSide : false,// 打开后台分页
			definedPage =  $(this).DataTable(descOptions);
			return definedPage;
		},
		/**
		 * 时间控件
		 */
		$.fn.time = function(setting) {
			var _setting = {
					"timePicker": true,
				    "timePicker24Hour": true,
				    "autoUpdateInput": false,
				    "locale": {
				        "direction": "ltr",
				        "format": "YYYY-MM-DD HH:mm",
				        "separator": " - ",
				        "applyLabel": "确定",
				        "cancelLabel": "清空",
				        "fromLabel": "从",
				        "toLabel": "到",
				        "customRangeLabel": "Custom",
				        "daysOfWeek": [
				            "日",
				            "一",
				            "二",
				            "三",
				            "四",
				            "五",
				            "六"
				        ],
				        "monthNames": [
				            "一月",
				            "二月",
				            "三月",
				            "四月",
				            "五月",
				            "六月",
				            "七月",
				            "八月",
				            "九月",
				            "十月",
				            "十一月",
				            "十二月"
				        ],
				        "firstDay": 1
				    }
			}
//			var descOptions = $.extend({}, _setting, setting || {});
			var descOptions = $.extend(true, _setting, setting || {});
			var definedTime =  $(this).daterangepicker(descOptions);
			var startElement = setting.startElement;
			var endElement = setting.endElement;
			
			 $(this).on("apply.daterangepicker",function(obj,time){
				var  startTime = time.startDate.format(descOptions.locale.format);
				var  endTime = time.endDate.format(descOptions.locale.format);
				if(isNotNull(startElement) && isNotNull(endElement)) {
					$(startElement).val(startTime);
					$(endElement).val(endTime);
				}else {
					$(this).val(startTime+' - '+ endTime);
				}
			 });
			 
			 $(this).on("cancel.daterangepicker",function(obj,time){
				 if(isNotNull(startElement) && isNotNull(endElement)) {
						$(startElement).val('');
						$(endElement).val('');
					}else {
						$(this).val('');
					}
			 });
			
			
			return definedTime;
		},
		/**
		 * 门店
		 */
		$.fn.store = function (setting) {
			var _setting = {
					minimumInputLength   : 0,
				    language: "zh-CN",
				    multiple             : true,
				    maximumSelectionLength : 5, 
				    ajax : {
				        url      : "${base}/admin/autoorder/searchStores.jhtml",              // 异步请求地址
				        dataType : "json",                  // 数据类型
				        type : "get",
				        data     : function (search, page) {  // 请求参数（GET）
			            	return { searchValue: search.term };
			       		},
				        processResults      : function (datas, params) {
				        	params.page = params.page || 1;
				        	var data = [];
				        	for(var i =0;i<datas.length;i++) {
				        		var tmpData = datas[i];
				        		data.push({"id":tmpData.storeNo,"text":tmpData.storeName});
				        	}
				        	return {
						        results: data,
						        pagination: 20
					        }
			        	},  // 构造返回结果
				        escapeMarkup : function (m) { return m; }               // 字符转义处理
			    	}
			}
			var descOptions = $.extend(true, _setting, setting || {});
			var definedStrore =  $(this).select2(descOptions);
			return definedStrore;
		}
	})(jQuery);
}

var isNotNull = function(obj) {
	return obj !== null && obj !== '' && obj !== 'undefined' && typeof (obj) !== 'undefined';
}



var htmlAppendUtils = {
		appendSpiderHtml : function() {
		  var html ='<aside class="control-sidebar control-sidebar-dark control-sidebar1" id="advancedSearch-warp" '+
					'style="padding-top: 0px;top: 100px;position: fixed;">'+
					'<div>'+
					'<input type="button" id="hideSidebarBtn" class="btn-sm btn btn-success btn-block" value="隐藏"/>'+
					'</div>'+
					'<div class="tab-content" style="overflow:scroll;height:500px;">'+
					'<div class="tab-pane active">'+
					'<form id="advancedSearch-cont">'+
					'</form>'+
					'<div id="submitSearchDiv">'+
					'<input type="button" id="submitSearchBtn" class="btn btn-block btn-success btn-sm" value="搜索"/>'+
					'</div>'+
					'</div>'+
					'</div>'+
					'</aside>';
		  	return html;
		},
		exportHtml : function() {
			var html =
                '<div name="exportDiv" class="modal fade" id="advancedExportModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static">             				'+
                '        <div class="modal-dialog">                                                                                                                                                                   '+
                '            <div class="modal-content">                                                                                                                                                              '+
                '                <div class="modal-header">                                                                                                                                                           '+
                '                    <h4 class="modal-title" id="myModalLabel">EXCEL导出</h4>                                                                                                                            '+
                '                </div>                                                                                                                                                                               '+
                '                <div class="modal-body">                                                                                                                                                             '+
                '                	<form class="form-horizontal" id="advancedExportFrom" target="advancedExportframe" action="'+gloadBaseUrl+'/admin/exportExcel/export.jhtml" method="post" accept-charset="UTF-8">       '+
                '		             <div class="box-body">                                                                                                                                                              '+
                '		                <div class="form-group">                                                                                                                                                         '+
                '		                  <label for="excelName" class="col-sm-2 control-label">导出名称:</label>                                                                                                          '+
                '		                  	<div class="col-sm-10">                                                                                                                                                      '+
                '		                 		<input type="hidden" name="exportFieldColumns" id="sourceColumns"/>'+
                '								<input type="hidden" name="exportHeaderColumns" id="headerColumns"/>'+
                '								<input type="hidden" name="fieldColumns" id="fieldColumns"/>'+
                '								<input type="hidden" name="fieldColumns" id="fieldColumns"/>'+
                '								<input type="hidden" name="order[0][column]" id="columnSortIndex"/>'+
                '								<input type="hidden" id="columnSortName"/>'+
                '								<input type="hidden" name="order[0][dir]" id="columnSortVal"/>'+
                '								<input type="hidden" name="search[value]" id="columnSearch"/>'+
                '								<input type="hidden" name="exportDataJson" id="exportDataJson"/>'+
                '								<input type="hidden" name="defalutParams" id="defalutParams"/>'+
                '				                <input type="text" class="form-control" id="excelName" name="excelName"/>                                                                                              '+
                '				             </div>                                                                                                                                                                          '+
                '		                </div>                                                                                                                                                                           '+
                '		                <div class="form-group">                                                                                                                                                         '+
                '		                  <label id="commonExportTitleMsg" class="col-sm-12 control-label"></label>                                                                                                                  '+
                '		                </div>                                                                                                                                                                           '+
                '		                 <div class="form-group">                                                                                                                                                        '+
                '		                  <label id="commonExportMsg"  class="col-sm-12 control-label"></label>                                                                                                                '+
                '		                </div>                                                                                                                                                                           '+
                '		                 <div class="form-group">                                                                                                                                                        '+
                '		                  <label id="commonFinishedMsg"  class="col-sm-12 control-label"></label>                                                                                                              '+
                '		                </div>                                                                                                                                                                           '+
                '		              </div>                                                                                                                                                                             '+
                '		              <!-- /.box-footer -->                                                                                                                                                              '+
                '		            </form>                                                                                                                                                                              '+
                '                </div>                                                                                                                                                                               '+
                '                 <iframe name="advancedExportframe" id="exportframe" width="100%" height="100px;"  frameborder="0"  marginheight="0" marginwidth="0" src="'+gloadBaseUrl+'/components/static/export/showmsg.jsp"></iframe>'+
                '                <div class="modal-footer">                                                                                                                                                           '+
                '                    <button type="button" class="btn btn-primary exportModalBtn">导出</button>                                                                                                             '+
                '                    <button type="button" class="btn btn-default cancelModalBtn" >取消</button>                                                                                                            '+
                '                </div>                                                                                                                                                                               '+
                '            </div>                                                                                                                                                                                   '+
                '        </div>                                                                                                                                                                                       '+
                '</div>                                                                                                                                                                                               ';
			return html;
		},
		import : function () {
			var html = '<div name="importDiv" class="modal fade" id="advancedImportModal" tabindex="-1" role="dialog"  aria-labelledby="myImportModalLabel" aria-hidden="true" data-backdrop="static">'+
                '    <div class="modal-dialog">                                                                                                                                          '+
                '        <div class="modal-content">                                                                                                                                     '+
                '            <div class="modal-header">                                                                                                                                  '+
                '                <h4 class="modal-title" id="myImportModalLabel">EXCEL导入</h4>                                                                                                  '+
                '            </div>                                                                                                                                                      '+
                '            <div class="modal-body">                                                                                                                                    '+
                '                <form id="commonImportForm" method="post" enctype="multipart/form-data" target="commonImportExcel" style="width:100%;float:left;" action="'+gloadBaseUrl+'/admin/commonImportExcel/commomImportExcel.jhtml">                                   '+
                '                    <table width="100%" class="input" border="1px" id="top" align="center" cellpadding="4" cellspacing="4">                                            '+
                '                        <tr>                                                                                                                                            '+
                '                            <td class="width1" align="right">                                                                                                           '+
                '                                <span style="color: red;">*</span>Excel文件:                                                                                              '+
                '                            </td>                                                                                                                                       '+
                '                            <td class="width2">                                                                                                                         '+
                '                                <input type="file" id="excelFiles" name="excelFiles" accept=".xls,.xlsx"/></td>                                                         '+
                '                            <td align="left">                                                                                                                           '+
                '                                <input id="jsData" name="jsData" type="hidden">                                                                                         '+
                '                                <input id="importBtn" type="button" class="btn btn-sm" value="导入"/>                                                                              '+
                '                            </td>                                                                                                                                       '+
                '                        </tr>                                                                                                                                           '+
                '                    </table>                                                                                                                                            '+
                '                </form>                                                                                                                                                 '+
                '                <div id="div_run" style="font-size:12px;float:left;">                                                                                                   '+
                '                    <div id="div_reading">&nbsp;文件上传解析中,请稍候...</div>                                                                                                    '+
                '                    <div id="div_reading_success"></div>                                                                                                                '+
                '                    <div id="div_writeData">&nbsp;&nbsp;当前正在导入第[<span id="currentPosition"></span>]行记录</div>                                                            '+
                '                </div>                                                                                                                                                  '+
                '                <div id="err_msg" style="overflow: auto; height: 270px;width: 100%; border: 1px solid;margin-top: 50px;">&nbsp;</div>                                                                      '+
                '                <div>                                                                                                                                                   '+
                '                    <div id="div_finishData">                                                                                                                           '+
                '                        <div><span id="finishData"></span></div>                                                                                                        '+
                '                    </div>                                                                                                                                              '+
                '                </div>                                                                                                                                                  '+
                '                <iframe name="commonImportExcel" width="100%" height="10px;"  frameborder="0"  marginheight="0" marginwidth="0" src="'+gloadBaseUrl+'/components/static/import/showmsg.jsp"></iframe>                                                           '+
                '            </div>                                                                                                                                                      '+
                '            <div class="modal-footer">                                                                                                                                  '+
                '                <button type="button" class="btn btn-default cancelImportModalBtn">取消</button>                                                                                '+
                '            </div>                                                                                                                                                       '+
                '        </div>                                                                                                                                                           '+
                '    </div>                                                                                                                                                               '+
                '</div>                                                                                                                                                                   ';
			return html;
        },
		resetModal : function() {
			$(".exportModalBtn").attr("disabled",false);
			$("#exportMsg").html('');
			$("#titleMsg").html('');
			$("#finishedMsg").html('');
		},
		showModal : function() {
            $('#advancedExportModal').modal('show');
            $('.modal-backdrop').css("z-index",1029);
            htmlAppendUtils.resetModal();
		},
		showImportModal : function() {
            $('#advancedImportModal').modal('show');
            $('.modal-backdrop').css("z-index",1029);
            htmlAppendUtils.resetImportModal();
		},
		resetImportModal : function() {
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
		parseTableColumns : function (columns) {
			var tableColumns = [];
			for(var i = 0; i < columns.length ; i++) {
				//var exportObject = new ExportObject()
				var exportObject = {};
				var column = columns[i];
                var fieldName = column.data;
                var isFill = column.isFill;
                exportObject.fieldName = fieldName;
                var valueFormat = column.valueFormat;
                if(isNotNull(isFill)) {
                    exportObject.isFill = isFill;
				}else {
                    exportObject.isFill = true;
				}
                var dateFormat = column.dateFormat;
                if(isNotNull(dateFormat)) {
                    exportObject.dateFormat = dateFormat;
				}
                if(isNotNull(valueFormat)) {
                    exportObject.valueFormat = valueFormat;
                }
                tableColumns.push(exportObject);
			}
			return tableColumns;
		},
		getTableHederName : function ($this) {
			var rowObj = {};
			var rows = [];
			//行或者列合并
            $this.find("thead > tr").each(function(index,data) {
                var $ths = $(data).find("th");
                var cols = [];
                var colObj = {};
                $ths.each(function(thIndex,thData){
                    var rowspanCount = $(thData).attr("rowspan");
                    var colspanCount = $(thData).attr("colspan");
                    var col = {};
                    col.title = $(thData).text();
                    if(isNotNull(rowspanCount)) {
                        col.rowspanCount = rowspanCount;
                    }
                    if(isNotNull(colspanCount)){
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
		insertValueToHtml : function(params,exportData,sourceColumns,headerNames) {
           var orderColumnIndex =  params.order[0]["column"];
           var orderColumnName = params.columns[orderColumnIndex]["data"];
           var sort = params.order[0]["dir"];
            $("#columnSortIndex").val(orderColumnIndex);
           $("#columnSortName").attr("name","columns["+orderColumnIndex+"][data]").val(orderColumnName);
           $("#columnSortVal").val(sort);

           var searchValue = params.search["value"];
           $("#columnSearch").val(searchValue);
			$("#defalutParams").val(JSON.stringify(params));
            $("#exportDataJson").val(JSON.stringify(exportData));

            $("#sourceColumns").val(JSON.stringify(sourceColumns));
            $("#headerColumns").val(JSON.stringify(headerNames));
		},
		isArray : function(o) {
    		return Object.prototype.toString.call(o) === '[object Array]';
		}
}

/** 显示导出多少条*/
var showExportNumber = function(number) {
    $("#commonExportMsg").html('当前正在导出第<span style="color: red; ">[' +number+ ']</span>条数据!');
}
/** 回调导出*/
var downCommonExcel = function(uuid) {
    window.location.href=gloadBaseUrl+"/admin/exportExcel/downCommonExcel.jhtml?uuid="+encodeURIComponent(uuid);
}
var writeFinished = function(time) {
    $("#commonFinishedMsg").html('导出完成,本次导出总花费:<span style="color: blue; ">'+time+'</span> 秒');
    $(".exportModalBtn").attr("disabled",false);
}
var commonExportTitleMsgShow = function(msg,isSuccess) {
    if(isSuccess) {
        $("#commonExportTitleMsg").css("color","green");
    }else {
        $("#commonExportTitleMsg").css("color","red");
    }
    $("#commonExportTitleMsg").html(msg);
}


/***   导入 **/

function writeRowPositionByImport(position){
    var $writeData = $("#div_writeData");
    if($writeData.is(":hidden")){
        $("#div_writeData").show();
    }
    $("#currentPosition").html(position);
}
//解析成功
function totalRows(totalRows,realtotalRows) {
    $("#div_reading_success").show();
    $("#div_reading_success").html("&nbsp;&nbsp;&nbsp;文件解析成功,本次应导入[<span style='color:red'>"+totalRows+"</span>]行记录,实导入[<span style='color:red'>"+realtotalRows+"</span>]行记录");
}
//导入成功
function successFinish(realtotalRows) {
    $("#div_finishData").show();
    $("#finishData").html("&nbsp;&nbsp;&nbsp;本次导入成功,已导入[<span style='color:red'>"+realtotalRows+"</span>]行数据!");
    $("#importBtn").attr("disabled",false);
}
//导入失败
function erroRead(msg) {
    $("#div_reading_success").show();
    $("#div_reading_success").html(msg);
    $("#importBtn").attr("disabled",false);
}
//导入失败
function erroFinish(realtotalRows) {
    $("#div_finishData").show();
    $("#finishData").html("&nbsp;&nbsp;&nbsp;<span style='color:red'>本次导入失败,已导入[0]行数据,请根据错误提示信息,修改之后,重新导入!</span>");
    $("#importBtn").attr("disabled",false);
}

function error(msg,rowCount,colCount){
    $("#err_msg").append("<div>&nbsp;&nbsp;&nbsp;第[<span style='color: red; '>"+rowCount+"</span>]行 第[<span style='color: red; '>"+colCount+"</span>]列  出现错误  错误信息:"+ msg + "</div>");
}

function writeRowErro(msg,rowCount){
    $("#err_msg").append("<div>&nbsp;&nbsp;&nbsp;第[<span style='color: red; '>"+rowCount+"</span>]行 出现错误  错误信息:"+ msg + "</div>");
}






