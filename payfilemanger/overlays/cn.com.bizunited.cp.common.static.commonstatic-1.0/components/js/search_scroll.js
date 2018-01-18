//滚动事件
        function scorlldiv(){
            var $box = $('.scroll-div-box'),
                h = $box.height();
            $box.height(h);
        }
        scorlldiv();
        //scroll-box
        var scrollType = true;
        window.onscroll = function(){
            var yScroll = $(window).scrollTop();
            var $box = $('.scroll-div-box'),
                $scroll = $('#scroll-box'),
                $btn = $('.scroll-div-btn'),
                boxH = $box.height() + 100;
            if(yScroll > boxH){
                if(scrollType){
                    $scroll.addClass('scroll-fixed').css({
                        'top': (80 - boxH) + "px"
                    });
                    $btn.css({
                        'opacity':'1'
                    });
                }
                scrollType = false;
            }else{
                if(!scrollType){
                    $scroll.removeClass('scroll-fixed').css({
                        'top': (80 - boxH) + "px"
                    });
                    $btn.css({
                        'opacity':'0'
                    }).find('i').addClass('fa-chevron-down').removeClass('fa-chevron-up');
                }
                scrollType = true;
            }
        };

        $(document).delegate('.scroll-div-btn span','click',function(){
            var $box = $('.scroll-div-box'),
                $scroll = $('#scroll-box'),
                $btn = $(this),
                boxH = $box.height();
            var is = $btn.find('i').hasClass('fa-chevron-down');
            console.log(is)
            if(is){
                $scroll.animate({'top':0},200);
                $btn.find('i').removeClass('fa-chevron-down').addClass('fa-chevron-up');
            }else{
                $scroll.animate({'top':-boxH},200);
                $btn.find('i').addClass('fa-chevron-down').removeClass('fa-chevron-up');
            }
        });