$(document).delegate('.hidden-pub-close','click',function(){
    var $this = $(this).closest('.hidden-form');
    $this.fadeOut(300,function () {
        $this.prev().remove();
        $this.remove();
    }).prev().fadeOut(300);
});

$(document).on('click','.table-links a',function(){
    var _src = $(this).attr('href'),
        _info = $(this).attr('data-title'),
        _id = '';
    var nav_str = '<li class="active"><a data-toggle="tab" href="#" data-nav-id="' + _id + '">' + _info + '<i class="fa fa-close close-item"></i></a></li>',
        cont_str = '<div class="page-content"><iframe frameborder="0" src="' + _src + '" width="100%" height="100%"></iframe></div>';
    var index = 0,
        type = true;

    $(".nav-tabs", window.parent.document).find("li").each(function(i){
        var $this = $(this).find('a');
        var info = $this.text();
        if(_info == info){
            type = false;
            index = i;
            return false;
        }else{

        }
    });

    if(type){
        $(".nav-tabs", window.parent.document).find("li").removeClass("active");
        $(".nav-tabs", window.parent.document).append(nav_str);
        $(".tab-content", window.parent.document).find(".page-content").hide();
        $(".tab-content", window.parent.document).append(cont_str);
    }else{
        $(".nav-tabs", window.parent.document).find("li").removeClass("active");
        $(".nav-tabs", window.parent.document).find("li").eq(index).addClass("active");
        $(".tab-content", window.parent.document).find(".page-content").hide();
        $(".tab-content", window.parent.document).find(".page-content").eq(index).show().find('iframe').attr('src',_src);
    }

    return false;

});

$(document).delegate('td input,td select','blur',function(){
    $(this).closest('tr').find('td').eq(0).trigger('click');
});