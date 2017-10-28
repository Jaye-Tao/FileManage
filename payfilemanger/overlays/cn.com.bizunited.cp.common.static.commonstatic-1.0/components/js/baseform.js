$(function(){

	//初始化日期插件
	$('.date-picker').datetimepicker({
        minView: "month",
        format: "yyyy-mm-dd",
        language: 'zh-CN',
        autoclose:true
    });

	//下拉
	$('.chosen-select').chosen({ allow_single_deselect: true });


	
	layer.photos({
	 	photos: '#layer-photos-demo'
	});




	/*
	
	服务器端返回的json需严格按照如下格式：
	{
	  "title": "", //相册标题
	  "id": 123, //相册id
	  "start": 0, //初始显示的图片序号，默认0
	  "data": [   //相册包含的图片，数组格式
	    {
	      "alt": "图片名",
	      "pid": 666, //图片id
	      "src": "", //原图地址
	      "thumb": "" //缩略图地址
	    }
	  ]
	}

	例如：
	$.getJSON('/jquery/layer/test/photos.json', function(json){
		layer.photos({
			photos: json
		});
	});

	*/
});