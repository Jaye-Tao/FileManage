var baseFun = {
    timeArr: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
    currDate: null,
    getScreenWidth: function(){		//获取弹窗最大化利用宽度
    	return $(window).width()-50;
    },
    setEntiretyHeight: function(dom){    //统一终端列表整体高度
        var $dom = $(dom),
            len = dom.length,
            _hg = 0,
            _max = 0,
            i;
        $dom.css("height", "auto");
        for(i=0; i<len; i++){
            _hg = $dom.eq(i).outerHeight();
            if(_hg >= _max){
                _max = _hg;
            }
        }
        $dom.outerHeight(_max);
    },
    initDatePicker: function(pos){	//初始化日期插件
    	pos = pos === "bottom-left" || pos === "top-left" || pos === "top-right" ? pos : "bottom-right";
        $(".date-picker").datetimepicker({
            minView: "month",
            format: "yyyy-mm-dd",
            language: "zh-CN",
            autoclose: true,
            pickerPosition: pos
        });
    },
    initChosenSelect: function(){		//初始化下拉插件
    	$(".chosen-select").chosen({ allow_single_deselect: true });
    },
    initGallery: function(selector){	//初始化查看图片插件
    	var $overflow = '';
        	params = {
	            rel: selector,
	            reposition: true,
	            scalePhotos: true,
	            scrolling: false,
	            previous: '<i class="ace-icon fa fa-arrow-left"></i>',
	            next: '<i class="ace-icon fa fa-arrow-right"></i>',
	            close: '&times;',
	            current: '{current} of {total}',
	            maxWidth: '90%',
	            maxHeight: '90%',
	            onOpen: function(){
	                $overflow = document.body.style.overflow;
	                document.body.style.overflow = 'hidden';
	            },
	            onClosed: function(){
	                document.body.style.overflow = $overflow;
	            },
	            onComplete: function(){
	                $.colorbox.resize();
	            }
	        };

		$("#cboxLoadingGraphic").html("<i class='ace-icon fa fa-spinner blue fa-spin'></i>");
		$(selector).colorbox(params);

		/*$(document).one('ajaxloadstart.page', function(e) {
		    $('#colorbox, #cboxOverlay').remove();
		});*/
    },
    removePager: function(pageid){	//移除分页工具栏
    	$("#" + pageid).remove();
    },
    removeCheckAll: function(tableid){	//移除全选按钮
    	$("#jqgh_" + tableid.substring(tableid.indexOf("#")+1) + "_cb").remove();
    },
    removeCurrDialog: function(currDom){	//保存成功后移除当前弹窗
    	currDom.closest(".hidden-form-box").fadeOut(200, function(){
    		$(this).remove();
        });
    },
    preventSelectEvent: function(dom){      //阻止复制功能
        var $dom = $(dom),
            len = $dom.length,
            i;
        for(i=0; i<len; i++){
            $dom.eq(i)[0].onselectstart = function(){
                return false;
            }
        }
    },
    getWeekTime: function(date){    //获取一周时间
        var timeArr = baseFun.timeArr,
            len = timeArr.length,
            $time = $(".da-time"),
            arr = [],
            week,
            i;
        date = date || new Date();
        week = date.getDay();
        week = -((week ? week : 7)-1);
        date = baseFun.setWeekTime(date, week);
        baseFun.currDate = new Date(date);
        for(i=0; i<len; i++){
            var fmtDate = i ? baseFun.setWeekTime(date, 1) : date;
            arr[i] = baseFun.formateDate(fmtDate, timeArr);
            var year = fmtDate.getFullYear()+'',month = fmtDate.getMonth()+1,day = fmtDate.getDate();
            month = month < 10 ? "0"+month : month;
            day = day < 10 ? "0"+day : day;
            $time.eq(i).text(arr[i]).attr("time",(year+month+day)).attr("year",year).attr("month",month).attr("day",day);
        }
        return arr;
    },
    setWeekTime: function(date, week){
        date.setDate(date.getDate()+week);
        return date;
    },
    formateDate: function(date, timeArr){
        var year = date.getFullYear(),
            month = date.getMonth()+1,
            day = date.getDate();
        month = month < 10 ? "0"+month : month;
        day = day < 10 ? "0"+day : day;
        return timeArr[date.getDay()] + "(" + year + month + day + ")";
    },
    initMap: function(){
        var map = new BMap.Map("posMap"),
            point = new BMap.Point(116.400244,39.92556);
        map.centerAndZoom(point, 13);
        map.enableScrollWheelZoom(true);
        map.panBy($(window).width()/2, $(window).height()/2);
        return map;
    },

    formatWeekDay:function(date){
        var year = date.getFullYear(),
            month = date.getMonth()+1,
            day = date.getDate();
        month = month < 10 ? "0"+month : month;
        day = day < 10 ? "0"+day : day;
        var ymd = ""+year+month+day;
        var week = baseFun.timeArr[date.getDay()];
        var weekInfo = {};
        weekInfo.week = week;
        weekInfo.weekYMD = week+"("+ymd+")";
        weekInfo.ymd = ymd;
        return weekInfo;
    }
};