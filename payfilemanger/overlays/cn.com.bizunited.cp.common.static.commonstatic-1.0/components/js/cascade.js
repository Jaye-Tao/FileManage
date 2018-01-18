(function ($, w, d) {
    $.fn.linkAge = function (options) {
        var def = {
                url: "url",
                param: {},
                code: "code",
                name: "name",
                //second: "citys",
                //third: "districts",
                data: {},
                base: [],
                state: false,
                callback: null
            },
            base_str = '<div class="cascade">\
                      <ul class="ca-tabs">\
                          <li class="ca-tab ca-spe act"><a>省份</a></li>\
                          <li class="ca-tab"><a>城市</a></li>\
                          <li class="ca-tab"><a>区域</a></li>\
                      </ul>\
                      <ul class="ca-areas">\
                          <li class="ca-area act"></li>\
                          <li class="ca-area"></li>\
                          <li class="ca-area"></li>\
                      </ul>\
                  </div>';
        opts = $.fn.extend({}, def, options);
        if (!opts && typeof opts !== "object") {
            return;
        }
        opts.state = opts.state === true ? true : false;
        return this.each(function () {
            var $this = $(this),
                code = opts.code,
                name = opts.name,
                obj = [],
                arr = [],
                cacheCode = [],
                cacheName = [],
                str = "",
                $cascade,
                $area,
                i;
            $this.next().after(base_str);
            $cascade = $this.siblings(".cascade");
            $area = $cascade.find(".ca-area");
            if(Object.prototype.toString(opts.base) === "[object Object]"){
                obj = opts.base;
            }
            function initDom($this, opts, base_str) {
                var param = opts.param;
                var isHasClickCode = false;
                var definedNextKey = "";
                if (param != null && (typeof(param) == 'object')) {
                    for (var key in param) {
                        if (param[key] == 'thisClickCode') {
                            isHasClickCode = true;
                            param[key] = null;
                            definedNextKey = key;
                        }
                    }
                }
                $.ajax({
                    type: "get",
                    url: opts.url,
                    data: param,
                    //async: false,//取消异步
                    success: function (data) {
                        if (data != null) {
                            for (i = 0; i < data.length; i++) {
                                str += '<a data-code="' + data[i][code] + '">' + data[i][name] + '</a>';
                            }
                            opts.data = data;

                            $area.eq(0).html(str);
                            var data = opts.data;
                            initEvent($cascade, data, definedNextKey, param, $area, opts.callback);
                        }
                    }
                });

                var len = obj.length,
                    _str = '',
                    _s = '',
                    _tmp = "",
                    j;
                for(var j=0; j<len; j++){
                    _tmp = obj[j].provinceName + obj[j].cityName + obj[j].countyName;
                    _s += _tmp;
                    if(opts.state){
                        _str += '<a><span>' + _tmp + '</span></a>';
                    } else {
                        _str += '<a><span>' + _tmp + '</span><span class="linkage-close fa fa-times"></span></a>';

                    }
                    if(j !== len-1){
                        _s += ',';
                    }
                }
                $(".areamarket").val(_s);
                $this.append(_str);

            }

            function reloadDom(data, $curr, code, name) {
                $curr.html('');
                var len = data.length,
                    str = '',
                    i;
                for (i = 0; i < len; i++) {
                    str += '<a data-code="' + data[i][code] + '">' + data[i][name] + '</a>';
                }
                $curr.html(str);
            }

            function setDomValue($a) {
                var len = $a.length,
                    str = '',
                    i;
                for (i = 0; i < len; i++) {
                    str += $a.eq(i).find("span").eq(0).text();
                    if (i !== len - 1) {
                        str += ",";
                    }
                }
                return str;
            }

            function initEvent($cascade, data, definedNextKey, param, $area, callback) {
                var $d = $(d),
                    $tab = $cascade.find(".ca-tab"),
                    len = $area.length,
                    citys = [],
                    districts = [];
                $d.on("click", ".ca-tab", function () {
                    var $this = $(this),
                        _ind = $this.index();
                    if (!$this.hasClass("act")) {
                        if (_ind <= arr.length) {
                            $this.addClass("act").siblings("li").removeClass("act");
                            $area.eq(_ind).fadeIn(300).siblings("li").hide();
                        }
                    }
                }).on("click", ".ca-area a", function () {
                    var $this = $(this),
                        _code = $this.attr("data-code"),
                        _index = $this.closest(".ca-area").index(),
                        flag = false,
                        _cflag = false,
                        _name = "",
                        _data = null,
                        _str = '',
                        _len,
                        _alen,
                        i,
                        j;
                    switch (_index) {
                        case 0:
                            _len = data.length;
                            for (i = 0; i < _len; i++) {
                                if (data[i][code] === _code) {
                                    $this.addClass("act").siblings("a").removeClass("act");
                                    //param[definedNextKey] = _code;
                                    _data = data[i];
                                    _name = _data[name];
                                    flag = true;
                                    arr.length = 1;
                                    arr[_index] = {code: _code, name: _name};
                                    $.ajax({
                                        type: "get",
                                        url: opts.url,
                                        data: {"regionCode": _code},
                                        async: false,//取消异步
                                        success: function (data) {
                                            if (data != null) {
                                                citys = data;
                                                citys.length && (_cflag = true);
                                                reloadDom(data, $area.eq(_index + 1), code, name);
                                            }
                                        }
                                    });
                                    break;
                                }
                            }
                            break;
                        case 1:
                            _len = citys.length;
                            for (i = 0; i < _len; i++) {
                                if (citys[i][code] === _code) {
                                    $this.addClass("act").siblings("a").removeClass("act");
                                    _data = citys[i];
                                    _name = _data[name];
                                    flag = true;
                                    arr.length = 2;
                                    arr[_index] = {code: _code, name: _name};
                                    //param[definedNextKey] = _code;
                                    $.ajax({
                                        type: "get",
                                        url: opts.url,
                                        data: {"regionCode" : _code},
                                        async: false,//取消异步
                                        success: function (data) {
                                            if (data != null) {
                                                districts = data;
                                                reloadDom(data, $area.eq(_index + 1), code, name);
                                                districts.length && (_cflag = true);
                                            }
                                        }
                                    });
                                    break;
                                }
                            }
                            break;
                        case 2:
                            _len = districts.length;
                            for (i = 0; i < _len; i++) {
                                if (districts[i][code] === _code) {
                                    $this.addClass("act").siblings("a").removeClass("act");
                                    _data = districts[i];
                                    _name = _data[name];
                                    flag = true;
                                    arr.length = 3;
                                    arr[_index] = {code: _code, name: _name};
                                    break;
                                }
                            }
                            break;
                    }
                    if (flag) {
                        _alen = arr.length;
                        for (j = 0; j < _alen; j++) {
                            _str += arr[j].name;
                        }
                        $cascade.siblings(".linkage-pos").find(".linkage-info").text(_str);
                    }
                    if (_cflag) {
                        if (_index < len - 1) {
                            $tab.eq(_index + 1).addClass("act").siblings("li").removeClass("act");
                            $area.eq(_index + 1).fadeIn(300).siblings("li").hide();
                        }
                    }
                }).on("click", ".confirm-btn", function () {
                    var $form = $(this).closest(".dialog-ccc"),
                        $part = $form.find(".linkage-part"),
                        len = arr.length,
                        clen = cacheCode.length,
                        _s = '',
                        _c = ''
                        _str = '',
                        _index = -1,
                        i;
                    if (!len) {
                        layer.msg("请选择！", {time: 500});
                        return;
                    }
                    for (i = 0; i < len; i++) {
                        _s += arr[i][name];
                        _c += (i !== len - 1) ? arr[i][code] + "," : arr[i][code];
                    }
                    if (clen) {
                        for (j = 0; j < clen; j++) {
                            if (cacheCode[j].length >= _c.length) {
                                _index = cacheCode[j].indexOf(_c);
                            } else {
                                _index = _c.indexOf(cacheCode[j]);
                            }
                            if (_index === 0) {
                                break;
                            }
                        }
                    } else {
                        _index = 1;
                    }
                    if (_index !== 0) {
                        _str += '<a><span>' + _s + '</span><span class="linkage-close fa fa-times"></span></a>';
                        $part.append(_str);
                        cacheCode[clen] = _c;
                        cacheName[clen] = _s;

                        if(len === 1){
                            obj[obj.length] = {provinceId: arr[0].code, provinceName: arr[0].name, cityId: "", cityName: "", countyId: "", countyName: ""};
                        } else if(len === 2){
                            obj[obj.length] = {provinceId: arr[0].code, provinceName: arr[0].name, cityId: arr[1].code, cityName: arr[1].name, countyId: "", countyName: ""};
                        } else if(len === 3){
                            obj[obj.length] = {provinceId: arr[0].code, provinceName: arr[0].name, cityId: arr[1].code, cityName: arr[1].name, countyId: arr[2].code, countyName: arr[2].name};
                        }
                    } else {
                        layer.msg("请勿重复选择！", {time: 500});
                    }
                }).on("click", ".linkage-close", function () {
                    var $this = $(this),
                        _index = $this.closest("a").index();
                    $this.closest("a").remove();
                    cacheCode.splice(_index, 1);
                    cacheName.splice(_index, 1);
                    obj.splice(_index, 1);

                }).on("click", ".dialog-cl, .dialog-cancel", function () {
                    var $this = $(this),
                        $dialog = $this.closest(".dialog-ccc"),
                        _str = setDomValue($dialog.find(".linkage").find("a"));
                    $dialog.hide();
                    $(".areamarket").val(_str);
                    $(".ccc-box").eq(0).hide();
                    callback(obj);
                });

            }

            initDom($this, opts, base_str);
        });
    }
}(jQuery, window, document));