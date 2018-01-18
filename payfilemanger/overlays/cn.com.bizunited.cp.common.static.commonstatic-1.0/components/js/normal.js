var ind = {
    colarr: [{id: "1", info: "首页"}],
    addDom: function(_id, _info, _src){
        var $tabs = $(".nav-tabs"),
            $cont = $(".tab-content"),
            nav_str = '<li class="active"><a data-toggle="tab" data-nav-id="' + _id + '">' + _info + '<i class="fa fa-close close-item"></i></a></li>',
            cont_str = '<div class="page-content"><iframe frameborder="0" src="' + _src + '" width="100%" height="100%"></iframe></div>';
        $tabs.find("li").removeClass("active");
        $tabs.append(nav_str);
        $cont.find(".page-content").hide();
        $cont.append(cont_str);
    },
    initEvent: function(){
        var $a = $(".nav-list").find("a"),
            $tabs = $(".nav-tabs");
        $a.on({
            "click": function(){
                var $this = $(this),
                    _st = true,
                    $nav,
                    $tmp,
                    _id,
                    _info,
                    _src;
                if(!$this.hasClass("dropdown-toggle") && !$this.hasClass("active")){
                    _id = $this.attr("data-nav-id") || "";
                    for(var i=0, len=ind.colarr.length; i<len; i++){
                        if(ind.colarr[i].id === _id){
                            _st = false;
                            break;
                        }
                    }
                    if(_st){
                        if(ind.colarr.length >= 6){
                            layer.msg("页面太多啦~，请先关闭一些页面！", {time: 600});
                            return;
                        }
                        _info = $this.find(".menu-text").text();
                        _src = $this.attr("data-nav-src") || "";
                        ind.colarr[len] = {id: _id, info: _info};
                        ind.addDom(_id, _info, _src);
                    } else {
                        $nav = $tabs.find("a");
                        for(var j=0, len1=$nav.length; j<len1; j++){
                            $tmp = $nav.eq(i);
                            if($tmp.attr("data-nav-id") === _id){
                                $tabs.find("li").eq($tmp.closest("li").index()).addClass("active").siblings("li").removeClass("active");
                                $(".page-content").eq(i).show().siblings().hide();
                                break;
                            }
                        }
                    }
                    $a.closest("li").removeClass("active");
                    $this.closest("li").addClass("active");
                }
            }
        });

        $tabs.on("click", "a", function(e){
            var $this = $(this),
                $li = $this.closest("li"),
                _index;
            if(!$li.hasClass("active")){
                $li.addClass("active").siblings("li").removeClass("active");
                _index = $li.index();
                $(".page-content").eq(_index).show().siblings().hide();
            }
        });

        $tabs.on("click", ".close-item", function(e){
            if(this !== e.target){
                return;
            }
            var $this = $(this),
                $a = $this.closest("a"),
                _id = $a.attr("data-nav-id"),
                $li = $a.closest("li"),
                _index = $li.index(),
                $page = $(".page-content");
            for(var i=0, len=ind.colarr.length; i<len; i++){
                if(ind.colarr[i].id === _id){
                    ind.colarr.splice(i, 1);
                    break;
                }
            }
            if($li.hasClass("active")){
                $li.prev().addClass("active").siblings().removeClass("active");
                $page.eq(_index-1).show();
            }
            $li.remove();
            $page.eq(_index).remove();
            e.stopPropagation();
        });

    }
};
