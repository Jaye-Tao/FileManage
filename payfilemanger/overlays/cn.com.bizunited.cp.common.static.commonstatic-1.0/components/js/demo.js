
var dataUpload = {};  //表格select  code值

var jsonInfo = function(){
    var obj = {};
    //表行
    obj.data = [
        {id:"12",budget:"0",brand:"1",org:'南京分公司', budgetClass:"1", dealers:"", cost:"", channel:"", moneyYN:"1", sdate:"2007-12-03", ndate:"2007-12-03", jmoney:"¥27"},
        {id:"134",budget:"1",brand:"0",org:'南京分公司', budgetClass:"1", dealers:"", cost:"", channel:"", moneyYN:"0", sdate:"2007-12-03", ndate:"2007-12-03", jmoney:"¥27"},
        {id:"1234",budget:"2",brand:"1",org:'南京分公司', budgetClass:"1", dealers:"", cost:"", channel:"", moneyYN:"0", sdate:"2007-12-03", ndate:"2007-12-03", jmoney:"¥27"}
    ];

    obj.data_1 = [
        {id:"12",budget:"0",brand:"1",org:'南京分公司', budgetClass:"1", dealers:"", cost:"", channel:"", moneyYN:"1", sdate:"2007-12-03", ndate:"2007-12-03", jmoney:"¥27"},
        {id:"134",budget:"1",brand:"0",org:'南京分公司', budgetClass:"1", dealers:"", cost:"", channel:"", moneyYN:"0", sdate:"2007-12-03", ndate:"2007-12-03", jmoney:"¥27"},
        {id:"1234",budget:"2",brand:"1",org:'南京分公司', budgetClass:"1", dealers:"", cost:"", channel:"", moneyYN:"0", sdate:"2007-12-03", ndate:"2007-12-03", jmoney:"¥27"},
        {id:"134",budget:"1",brand:"0",org:'南京分公司', budgetClass:"1", dealers:"", cost:"", channel:"", moneyYN:"0", sdate:"2007-12-03", ndate:"2007-12-03", jmoney:"¥27"},
        {id:"1234",budget:"2",brand:"1",org:'南京分公司', budgetClass:"1", dealers:"", cost:"", channel:"", moneyYN:"0", sdate:"2007-12-03", ndate:"2007-12-03", jmoney:"¥27"},
        {id:"134",budget:"1",brand:"0",org:'南京分公司', budgetClass:"1", dealers:"", cost:"", channel:"", moneyYN:"0", sdate:"2007-12-03", ndate:"2007-12-03", jmoney:"¥27"},
        {id:"1234",budget:"2",brand:"1",org:'南京分公司', budgetClass:"1", dealers:"", cost:"", channel:"", moneyYN:"0", sdate:"2007-12-03", ndate:"2007-12-03", jmoney:"¥27"},
        {id:"134",budget:"1",brand:"0",org:'南京分公司', budgetClass:"1", dealers:"", cost:"", channel:"", moneyYN:"0", sdate:"2007-12-03", ndate:"2007-12-03", jmoney:"¥27"},
        {id:"1234",budget:"2",brand:"1",org:'南京分公司', budgetClass:"1", dealers:"", cost:"", channel:"", moneyYN:"0", sdate:"2007-12-03", ndate:"2007-12-03", jmoney:"¥27"},
        {id:"134",budget:"1",brand:"0",org:'南京分公司', budgetClass:"1", dealers:"", cost:"", channel:"", moneyYN:"0", sdate:"2007-12-03", ndate:"2007-12-03", jmoney:"¥27"},
        {id:"1234",budget:"2",brand:"1",org:'南京分公司', budgetClass:"1", dealers:"", cost:"", channel:"", moneyYN:"0", sdate:"2007-12-03", ndate:"2007-12-03", jmoney:"¥27"}
    ];

    //表头字段信息
    obj.thData = ['ID','操作 ', '序号','预算年度', '品牌大类', '组织','预算类型','经销商','费用类型','渠道','是否不检查可用金额','有效开始日期','有效结束日期','计划金额'];

    //表字段
    obj.tdData = [
        {name:'id',index:'id', width:60, classes:"uid", align:"center", hidden:true, editable: false},
        {name:'myac',index:'', width:120, classes:"iconbutton", fixed:true, align:"center", sortable:false, resize:false,
            formatter:'actions'
        },
        {name:'uid',index:'uid', width:60, align:"center", editable: false},
        {name:'budget',index:'budget', width:90,classes:"ui-state-editor", align:"center", editable: true,edittype:"select",editoptions:{value:'0:2018;1:2017;2:2016;3:2015;4:2014;5:2013;6:2012;7:2011'},
            formatter:function(cellvalue,options,cell){
                var str = '0:2018;1:2017;2:2016;3:2015;4:2014;5:2013;6:2012;7:2011';
                var arr = str.split(';');
                var text,
                    htm = '';
                $.each(arr,function(i,v){
                    var sArr = v.split(':');
                    if(sArr[0] == cellvalue && text!=''){
                        text = sArr[1]
                    }else if(sArr[1] == cellvalue){
                        text = cellvalue;
                        cellvalue = sArr[0];
                    }
                });

                var arr = {};
                arr.id = options.rowId;
                arr.budget = cellvalue;
                if(typeof dataUpload[options.gid] !== 'object'){
                    dataUpload[options.gid] = [];
                    dataUpload[options.gid].push(arr);
                }else{
                    var type = true;
                    $.each(dataUpload[options.gid],function(i,v){
                        if(v.id == arr.id){
                            dataUpload[options.gid][i]['budget'] = cellvalue;
                            type = false;
                        }
                    });
                    if(type === true){
                        dataUpload[options.gid].push(arr);
                    }
                }
                return text;
            },
            unformat:function(cellvalue,options,cell){
                console.log(options)
            }
        },
        {name:'brand',index:'brand', width:90, classes:"ui-state-editor", align:"center", editable: true,edittype:"select",editoptions:{value:"0:白酒;1:红酒"},
            formatter:function(cellvalue,options,cell){
                var str = '0:白酒;1:红酒';
                var arr = str.split(';');
                var text,
                    htm = '';
                $.each(arr,function(i,v){
                    var sArr = v.split(':');
                    if(sArr[0] == cellvalue && text!=''){
                        text = sArr[1]
                    }else if(sArr[1] == cellvalue){
                        text = cellvalue;
                        cellvalue = sArr[0];
                    }
                });
                var arr = {};
                arr.id = options.rowId;
                arr.brand = cellvalue;
                if(typeof dataUpload[options.gid] !== 'object'){
                    dataUpload[options.gid] = [];
                    dataUpload[options.gid].push(arr);
                }else{
                    var type = true;
                    $.each(dataUpload[options.gid],function(i,v){
                        if(v.id == arr.id){
                            dataUpload[options.gid][i]['brand']= arr.brand;
                            type = false;
                        }
                    });
                    if(type === true){
                        dataUpload[options.gid].push(arr);
                    }
                }

                return text;
            }
        },
        {name:'org',index:'org', width:90, classes:"ui-state-editor", align:"center", editable: true,sorttype:"int"},
        {name:'budgetClass',index:'budgetClass', width:120,classes:"ui-state-editor", align:"center", editable: true,edittype:"select", editoptions:{value:"0:普通;1:优秀"},
            formatter:function(cellvalue,options,cell){
                var str = '0:普通;1:优秀';
                var arr = str.split(';');
                var text,
                    htm = '';
                $.each(arr,function(i,v){
                    var sArr = v.split(':');
                    if(sArr[0] == cellvalue){
                        text = sArr[1]
                    }else if(sArr[1] == cellvalue){
                        text = cellvalue;
                        cellvalue = sArr[0];
                    }
                });
                var arr = {};
                arr.id = options.rowId;
                arr.budgetClass = cellvalue;
                if(typeof dataUpload[options.gid] !== 'object'){
                    dataUpload[options.gid] = [];
                    dataUpload[options.gid].push(arr);
                }else{
                    var type = true;
                    $.each(dataUpload[options.gid],function(i,v){
                        if(v.id == arr.id){
                            dataUpload[options.gid][i]['budgetClass']= arr.budgetClass;
                            type = false;
                        }
                    });
                    if(type === true){
                        dataUpload[options.gid].push(arr);
                    }
                }
                return text;
            }
        },
        {name:'dealers',index:'dealers', width:90, classes:"ui-state-editor ui-state-eject", editable: true,sorttype:"int"},
        {name:'cost',index:'cost', width:90, classes:"ui-state-editor", editable: true,sorttype:"int"},
        {name:'channel',index:'channel', width:90,classes:"ui-state-editor", editable: true,sorttype:"int"},
        {name:'moneyYN',index:'moneyYN', width:150, align:"center", classes:"ui-state-editor", editable: true,edittype:"select", editoptions:{value:'0:是;1:否'},
            formatter:function(cellvalue,options,cell){
                var str = '0:是;1:否';
                var arr = str.split(';');
                var text,
                    htm = '';
                $.each(arr,function(i,v){
                    var sArr = v.split(':');
                    if(sArr[0] == cellvalue && text!=''){
                        text = sArr[1]
                    }else if(sArr[1] == cellvalue){
                        text = cellvalue;
                        cellvalue = sArr[0];
                    }
                });
                var arr = {};
                arr.id = options.rowId;
                arr.moneyYN = cellvalue;
                if(typeof dataUpload[options.gid] !== 'object'){
                    dataUpload[options.gid] = [];
                    dataUpload[options.gid].push(arr);
                }else{
                    var type = true;
                    $.each(dataUpload[options.gid],function(i,v){
                        if(v.id == arr.id){
                            dataUpload[options.gid][i]['moneyYN']= arr.moneyYN;
                            type = false;
                        }
                    });
                    if(type === true){
                        dataUpload[options.gid].push(arr);
                    }
                }
                return text;
            }
        },
        {name:'sdate',index:'sdate',width:90, classes:"ui-state-editor", editable:true, sorttype:"date",unformat: pickDates},
        {name:'ndate',index:'ndate',width:90, classes:"ui-state-editor", editable:true, sorttype:"date",unformat: pickDates},
        {name:'jmoney',index:'jmoney', align:"center", width:150,editable: false}
    ];

    //数据地址
    obj.url = '';

    //添加弹窗数据
    obj.addHtmlData = function(type){
        var datas = '';
        if(type == '#grid-table'){
            datas = [
                {name:"budget",text:"预算年度",type:"select",con:[{value:'0',text:'0'},{value:'1',text:'1'}]},
                {name:"brand",text:"品牌大类",type:"select",con:[{value:'0',text:'0'},{value:'1',text:'1'}]},
                {name:"org",text:"组织",type:"text"},
                {name:"budgetClass",text:"预算类型",type:"select",con:[{value:'0',text:'0'},{value:'1',text:'1'}]},
                {name:"dealers",text:"经销商",type:"text"},
                {name:"cost",text:"费用类型",type:"text"},
                {name:"channel",text:"渠道",type:"text"},
                {name:"moneyYN",text:"是否不检查可用金额",type:"select",con:[{value:'0',text:'0'},{value:'1',text:'1'}]},
                {name:"sdate",text:"有效开始日期",type:"time"},
                {name:"ndate",text:"有效结束日期",type:"time"},
                {name:"jmoney",text:"计划金额",type:"text"}
            ];
        }
        return datas;
    };

    //删除数据请求 id为删除数据的ID  为数组 ["11","22"]
    obj.delReq = function(id,rowDate){
    };

    //添加数据请求 datas为添加层里面输入的内容
    obj.addReq = function(datas,callback){

    };

    //编辑数据请求  data编辑行数据
    obj.editerReq = function(data,rowid){
    };

    //单元格编辑开关
    obj.cellEditer = true;

    //显示隐藏删除按钮  留删除任务
    obj.cellDelState = true;

    obj.error = [
        {id:"",budget:"",brand:"白酒",org:'南京分公司', budgetClass:"", dealers:"", cost:"", channel:"", moneyYN:"否", sdate:"", ndate:"2007-12-03", jmoney:"¥27"},
        {id:"",budget:"",brand:"白酒",org:'', budgetClass:"普通", dealers:"", cost:"", channel:"", moneyYN:"否", sdate:"2007-12-03", ndate:"", jmoney:"¥27"},
        {id:"",budget:"",org:'', budgetClass:"普通", dealers:"", cost:"",brand:"白酒", channel:"", moneyYN:"否", sdate:"2007-12-03", ndate:"", jmoney:"¥27"}
    ];

    //检查出现错误，添加错误提示
    obj.errorFun = function(){
        var arr = this.error;
        var tdData = this.tdData;
        for(i in arr){
            var $tr = $("#grid-table tr.ui-widget-content").eq(i);
            $.each(arr[i],function(j,v){
                var key = 0;
                for(h in tdData){
                    var arrT = tdData[h];
                    if(j == arrT.name){
                        key = parseInt(h) + 1
                    }
                }
                if(v != ""){
                    $tr.find("td").eq(key).attr("data-error",v).addClass("table-error");
                }
            });
        }

        var $error = $('body');
        $error.on("mouseenter","td.table-error",function(){
            var text = $(this).attr("data-error");
            var html =  '<div class="table-error-boxs">' +
                '<div class="table-error-box">' +
                text +
                '</div>' +
                '</div>';
            layer.tips('<span style="color:#cc0000;">' + text + '</span>',this,{
                tips: [2, '#f9f9f9'],
            });
        }).on("mouseleave","td.table-error",function(){
            layer.closeAll();
        });

    };

    return obj;
}();

//单元格成功保存后触发
function afterSaveCell(rowid, cellname, value, iRow, iCo){
    var tId = $(this).attr('id'); //table id

    //表格select修改后code存储修改
    $.each(dataUpload[tId],function(i,v){
        if(v.id == rowid){
            dataUpload[tId][i][cellname] = value;
        }
    })

}
//当插入每行时触发。rowid插入当前行的id；rowdata插入行的数据，格式为name: value，name为colModel中的名字
function afterInsertRow(){
}

//初始化
table_form.init(jsonInfo.tdData,jsonInfo.thData,jsonInfo.url,jsonInfo.data,"#grid-table","grid-pager",afterSaveCell,afterInsertRow,{
    datatype:'local',             // 访问方式  json：请求服务器数据    local：本地数据
    mtype:'post',                 //  post   get   请求
    cellEdit:true,                // 表单单元格编辑开关  true    false
    _rownumbers:true,             //如果为ture则会在表格左边新增一列，显示行顺序号，从1开始递增。此列名为'rn'
    multiselect:true,             //关闭全选
    tabHeight:'auto',                //表格高度
    prmNames:{name:1,name2:2}     //参数
});

//滚动加载初始化
table_form.init(jsonInfo.tdData,jsonInfo.thData,jsonInfo.url,jsonInfo.data_1,"#grid-table1","",afterSaveCell,afterInsertRow,{
    datatype:'local',             // 访问方式  json：请求服务器数据    local：本地数据
    mtype:'post',                 //  post   get   请求
    cellEdit:true,                // 表单单元格编辑开关  true    false
    _rownumbers:true,             //如果为ture则会在表格左边新增一列，显示行顺序号，从1开始递增。此列名为'rn'
    multiselect:true,             //关闭全选
    tabHeight:'200px',                //表格高度
    prmNames:{name:1,name2:2}     //参数
});

$('#grid-table1-scroll').on('scroll',function(){
    var data = jsonInfo.data_1,
        top = $(this).scrollTop(),
        scrollHeight = $(this)[0].scrollHeight,
        h = $(this).height();
    if(top >= scrollHeight - h - 10){

        $.each(data,function(i,v){
            $("#grid-table1").addRowData(v.id, v, "last");
        });

    }
});
//滚动加载end

//检查出现错误，添加错误提示
jsonInfo.errorFun();

//弹层
$(document).delegate('.ui-state-eject input','click',function(){
    tableEct();
});

function tableInit(width,dom){

    var _data = [
        {
            viewinfo:[
                {number:"1234",title:"拉萨觉213得饭卡上"},
                {number:"1234123",title:"拉萨觉23得饭卡上"},
                {number:"123124",title:"拉萨觉得饭43234卡上"}
            ],
            viewField:[
                {name:'number',index:'number', width:120, align:"center", editable: false},
                {name:'title',index:'title', width:120, align:"center", editable: false}
            ],
            viewTitle:['费用类型编号','费用类型名称'],
            url:'',
            tableid:'#grid-table-hidden',
            pageid:'#grid-pager-hidden'
        },
        {
            viewinfo:[
                {number:"1234",title:"拉萨觉21卡上"},
                {number:"1234123",title:"拉萨觉2饭卡上"},
                {number:"123124",title:"拉萨觉得饭43卡上"}
            ],
            viewField:[
                {name:'number',index:'number', width:120, align:"center", editable: false},
                {name:'title',index:'title', width:120, align:"center", editable: false}
            ],
            viewTitle:['费用类型编号','费用类型名称'],
            url:'',
            tableid:'#grid-table-b',
            pageid:'#grid-pager-b'
        }
    ];


    $.each(_data,function(i,v){
        var tableid = v.tableid,
            pageid = v.pageid,
            tableidStr = tableid.substr(1,tableid.length),
            $hidden = $('#hidden-form'),
            grid = [];
        grid[i] = table_form.init(v.viewField,v.viewTitle,v.url,v.viewinfo,tableid,pageid,null,null,{
            datatype:'local',             // 访问方式  json：请求服务器数据    local：本地数据
            mtype:'post',                 //  post   get   请求
            cellEdit:true,                // 表单单元格编辑开关  true    false
            _rownumbers:true,             //如果为ture则会在表格左边新增一列，显示行顺序号，从1开始递增。此列名为'rn'
            multiselect:true,             //关闭全选
            prmNames:{name:1,name2:2}     //参数
        });


        //表格宽
        $('#gview_' + tableidStr).find('table,.ui-jqgrid-hdiv,.ui-jqgrid-bdiv').width(width);
        $(tableid).width(parseInt(width) - 1);
        $(pageid).width(width);   //表格翻页宽
        $('#cb_' + tableidStr).hide();
    });


}

//
$('#telid').ejectEvent({
    id:'shouquan-form',
    width:700,
    height:100,
    callback:function(width,dom){//dom:点击的元素    width：设置的弹窗宽度
    }
});
$('#telid2').ejectEvent({
    id:'shouquan-form', //弹层id
    width:700, //层内容的宽
    height:100, //层内容的宽
    callback:function(width,dom){//dom:点击的元素    width：设置的弹窗宽度
        $('#shouquan').ejectEvent({
            id:'hide-form', //弹层id
            width:600,  //层内容的宽
            height:140,   //层主内容到顶和底的距离
            callback:tableInit
        });
        // 关闭指定弹层
        // $('#telid2').ejectEvent({
        //     id:'shouquan-form',   //弹层id
        //     close:true
        // });
    }
});
$('#formet').ejectEvent({
    id:'hide-form',
    width:700,
    height:100,
    callback:function(width,dom){ //dom:点击的元素    width：设置的弹窗宽度
        tableInit(width,dom);
    }
});




//搜索选择下拉
$('.chosen-select').chosen({ allow_single_deselect: true }).change(function(dom,key){
    //选择后执行  key为选中键值
    console.log(dom.target);
    console.log(key);
});

//日期初始化
table_form.pickerDateTime();

//联动
channelFun.init({
    ids:[
        {
            name:"first-channel",
            value:"1"
        },
        {
            name:"scond-channel",
            value:"2"
        }
    ],
    menu:[
        {
            code:'s1',
            name:'渠道1',
            childrenChannel:[
                {
                    code:'s3',
                    name:'s1夏季1111 '
                },
                {
                    code:'s4',
                    name:'s1夏季11111'
                }
            ]
        },
        {
            code:'s1=2',
            name:'渠道2',
            childrenChannel:[
                {
                    code:'s3',
                    name:'s1夏季3333 '
                },
                {
                    code:'s3',
                    name:'s1夏季1333'
                }
            ]
        }
    ],
    code:'code',
    name:'name',
    children:'childrenChannel'
});