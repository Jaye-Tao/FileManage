var channelFun = function(){

    //下级
    var _child = function($this,idarr,data){
        var index = $this.selectedIndex;  //索引
        var code = $this.options[index].getAttribute('value');
        var idIndex = $this.options[index].getAttribute('linkages');
        var tId = idarr[idIndex];
        var valCode = data.code || "code";
        var valName = data.name || "name";
        var children = data.children || "childrenChannel";

        if(idarr[idIndex] != undefined){
            $.each(data.menu,function(i,v){
                if(v[valCode] == code){
                    var htm = '<option value="">请选择</option>';
                    var child  = v[children];
                    
                   if(child == null || child == "" || typeof(child) != "object") {
                    	$("#" + tId.name).html('<option linkages="' + tId.value + '"  value="">请选择</option>');
                       return;
                   }
                    for(var i = 0 ; i < child.length; i++ ) {
                        var vo = child[i];
                        var select = '';
                        if(i == 0){
                            select = '';
                        }
                        htm += '<option linkages="' + tId.value + '" ' + select + ' value="'+ vo[valCode] + '">' + vo[valName] + '</option>'
                    }
                    $("#" + tId.name).html(htm);
                }
            });
        }else{
        }
    };

    //
    var _object = {
        init:function(data){
            this.start(data);
        },
        start:function(data){

            var idarr = data.ids;
            var html = '';
            var code = data.code || "code";
            var name = data.name || "name";
            var children = data.children || "childrenChannel";
            var parentCode = (data.parentCode || '');

            //一级初始化
            $.each(data.menu,function(i,v){
                var select = '';
                if(i == 0 || v[code] === parentCode){
                    var htm = '';
                    select = '';
                    $.each(v[children],function(j,vo){
                        var select = '';
                        if(j == 0){
                            select = '';;
                            htm += '<option linkages="' + idarr[1].value + '"  value="">请选择</option>';
                        }
                        htm += '<option linkages="' + idarr[1].value + '" ' + select + ' value="'+ vo[code] + '">' + vo[name] + '</option>';
                    });
                    $("#" + idarr[1].name).html(htm);
                }
                html += '<option linkages="' + idarr[0].value + '" ' + select + ' value="'+ v[code] + '">' + v[name] + '</option>';
            });
            $("#" + idarr[0].name).html(html);

            for(var i in idarr){
                var doc = document.getElementById(idarr[i].name);
                //选项点击
                doc.onchange = function(){
                    _child(this,idarr,data);
                }
            }
        }
    };
    return _object;
}();