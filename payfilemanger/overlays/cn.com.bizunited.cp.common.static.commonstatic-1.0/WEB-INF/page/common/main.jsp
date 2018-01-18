<%@ page language="java" contentType="text/html; charset=UTF-8"
		 pageEncoding="UTF-8"%>
<%@ include file="baseUrl.jsp" %>

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
		<title>洋河后台管理系统</title>
		<meta name="description" content="overview &amp; stats" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />

		<!-- bootstrap & fontawesome -->
		<link rel="stylesheet" href="${base}/components/assets/css/bootstrap.css" />
		<link rel="stylesheet" href="${base}/components/assets/css/font-awesome.css" />
		<!-- 插件样式 -->
		<!-- text fonts -->
		<link rel="stylesheet" href="${base}/components/assets/css/ace-fonts.css" />
		<!-- ace styles -->
		<link rel="stylesheet" href="${base}/components/assets/css/ace.css" class="ace-main-stylesheet" id="main-ace-style" />
		<!--[if lte IE 9]>
		<link rel="stylesheet" href="${base}/components/assets/css/ace-part2.css" class="ace-main-stylesheet" />
		<![endif]-->
		<!--[if lte IE 9]>
		<link rel="stylesheet" href="${base}/components/assets/css/ace-ie.css" />
		<![endif]-->
		<link rel="stylesheet" href="${base}/components/css/common.css" />
		<link rel="stylesheet" href="${base}/components/css/normal.css" />
		<!-- 当前页相关样式 -->
		<!-- ace 设置操作 -->
		<script src="${base}/components/assets/js/ace-extra.js"></script>
		<!-- HTML5shiv and Respond.js for IE8 to support HTML5 elements and media queries -->
		<!--[if lte IE 8]>
		<script src="${base}/components/assets/js/html5shiv.js"></script>
		<script src="${base}/components/assets/js/respond.js"></script>
		<![endif]-->
	</head>
	<body class="no-skin">
		<!-- 顶部 -->
		<div id="navbar" class="navbar navbar-default">
			<script>
				try{ace.settings.check('navbar' , 'fixed')}catch(e){}
			</script>
			<div class="navbar-container" id="navbar-container">
				<!-- 展开按钮 -->
				<button type="button" class="navbar-toggle menu-toggler pull-left" id="menu-toggler" data-target="#sidebar">
					<span class="sr-only"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<!-- 顶部logo -->
				<div class="navbar-header pull-left">
					<a href="#" class="navbar-brand">
						<small>
							<!-- <i class="fa fa-leaf"></i>Ace Admin -->
							<img src="${base}/components/assets/img/logo.png"/>
						</small>
					</a>
				</div>
				<!-- 顶部右侧 -->
				<div class="navbar-buttons navbar-header pull-right" role="navigation">
					<ul class="nav ace-nav">
						<li>
							<a data-toggle="dropdown" class="dropdown-toggle" href="#">
								<i class="ace-icon fa fa-user"></i>
							</a>
							<ul class="user-menu dropdown-menu-right dropdown-menu dropdown-yellow dropdown-caret dropdown-close">
								<li>
									<a href="#"><i class="ace-icon fa fa-cog"></i>Settings</a>
								</li>
								<li>
									<a href="profile.html"><i class="ace-icon fa fa-user"></i>Profile</a>
								</li>
								<li class="divider"></li>
								<li>
									<a href="${base}/admin/logout.jsp"><i class="ace-icon fa fa-power-off"></i>Logout</a>
								</li>
							</ul>
						</li>
						<li>
							<a data-toggle="dropdown" class="dropdown-toggle" href="#">
								<i class="ace-icon fa fa-gear"></i>
							</a>
							<ul class="user-menu dropdown-menu-right dropdown-menu dropdown-yellow dropdown-caret dropdown-close">
								<li>
									<a href="#"><i class="ace-icon fa fa-cog"></i>Settings</a>
								</li>
								<li>
									<a href="profile.html"><i class="ace-icon fa fa-user"></i>Profile</a>
								</li>
								<li class="divider"></li>
								<li>
									<a href="${base}/admin/logout.jsp"><i class="ace-icon fa fa-power-off"></i>Logout</a>
								</li>
							</ul>
						</li>
						<li>
							<a data-toggle="dropdown" class="dropdown-toggle" href="#">
								<i class="ace-icon fa fa-power-off"></i>
							</a>
							<ul class="user-menu dropdown-menu-right dropdown-menu dropdown-yellow dropdown-caret dropdown-close">
								<li>
									<a href="#"><i class="ace-icon fa fa-cog"></i>Settings</a>
								</li>
								<li>
									<a href="profile.html"><i class="ace-icon fa fa-user"></i>Profile</a>
								</li>
								<li class="divider"></li>
								<li>
									<a href="${base}/admin/logout.jsp"><i class="ace-icon fa fa-power-off"></i>Logout</a>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<!-- 主要内容 -->
		<div class="main-container" id="main-container">
			<script>
				try{ace.settings.check('main-container' , 'fixed')}catch(e){}
			</script>
			<!-- 左侧导航 -->
			<div id="sidebar" class="sidebar responsive">
				<script>
					try{ace.settings.check('sidebar' , 'fixed')}catch(e){}
				</script>
				<ul class="nav nav-list">
					<!--菜单加载-->
				</ul>
				<!-- 展开收起按钮 -->
				<div class="sidebar-toggle sidebar-collapse" id="sidebar-collapse">
					<i class="ace-icon fa fa-angle-double-left" data-icon1="ace-icon fa fa-angle-double-left" data-icon2="ace-icon fa fa-angle-double-right"></i>
				</div>
				<script>
					try{ace.settings.check('sidebar' , 'collapsed')}catch(e){}
				</script>
			</div>
			<!-- 中间内容区域 -->
			<div class="main-content index-content row">
				<div class="tabbable">
					<ul class="nav nav-tabs">
						<li class="active">
							<a data-toggle="tab" href="#">首页</a>
						</li>
					</ul>
					<div class="tab-content">
						<!-- 切换内容 -->
						<div class="page-content">
							<iframe frameborder="0" src="table.html" width="100%" height="100%"></iframe>
						</div>
						<!-- 切换内容 -->
					</div>
				</div>
			</div>
			<!-- 底部内容区域 -->
			<div class="footer">
				<div class="footer-inner">
					<div class="footer-content">
						<span class="bigger-120">
							<span class="blue bolder">洋河</span>&nbsp;Application &copy; 2017&nbsp; &nbsp;
						</span>
						<span class="action-buttons">
							<a href="#">
								<i class="ace-icon fa fa-twitter-square light-blue bigger-150"></i>
							</a>
							<a href="#">
								<i class="ace-icon fa fa-facebook-square text-primary bigger-150"></i>
							</a>
							<a href="#">
								<i class="ace-icon fa fa-rss-square orange bigger-150"></i>
							</a>
						</span>
					</div>
				</div>
			</div>
			<!-- 回到顶部 -->
			<a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse">
				<i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i>
			</a>
		</div>

		<script type="text/template" id="menu-tpl">
			<$if(!data.url){$>
				<li>
					<a data-nav-id="<$=data.id$>" data-nav-src="<$=data.url$>" class="<$=data.children ? 'dropdown-toggle' : ' '$>">
						<i class="menu-icon fa fa-folder-o"></i>
						<span class="menu-text"><$=data.name$></span>
						<$if(data.children){$>
							<b class="arrow fa fa-angle-down"></b>
						<$}$>
					</a>
					<b class="arrow"></b>
				</li>
			<$}else{$>
				<li>
					<a data-nav-id="<$=data.id$>" data-nav-src="<$=data.url$>">
						<i class="menu-icon fa fa-caret-right"></i>
						<span class="menu-text"><$=data.name$></span>
					</a>
					<b class="arrow"></b>
				</li>
			<$}$>

		</script>

		<!-- 基础js -->
		<!--[if !IE]> -->
		<script>
		window.jQuery || document.write("<script src='${base}/components/assets/js/jquery.js'>"+"<"+"/script>");
		</script>
		<!-- <![endif]-->
		<!--[if IE]>
		<script>
		window.jQuery || document.write("<script src='${base}/components/assets/js/jquery1x.js'>"+"<"+"/script>");
		</script>
		<![endif]-->
		<script>
		if('ontouchstart' in document.documentElement) document.write("<script src='${base}/components/assets/js/jquery.mobile.custom.js'>"+"<"+"/script>");
		</script>
		<script src="${base}/components/assets/js/bootstrap.js"></script>
		<!--[if lte IE 8]>
		  <script src="${base}/components/assets/js/excanvas.js"></script>
		<![endif]-->
		<!-- ace js -->
		<script src="${base}/components/assets/js/ace/elements.scroller.js"></script>
		<script src="${base}/components/assets/js/ace/elements.colorpicker.js"></script>
		<script src="${base}/components/assets/js/ace/elements.fileinput.js"></script>
		<script src="${base}/components/assets/js/ace/elements.typeahead.js"></script>
		<script src="${base}/components/assets/js/ace/elements.wysiwyg.js"></script>
		<script src="${base}/components/assets/js/ace/elements.spinner.js"></script>
		<script src="${base}/components/assets/js/ace/elements.treeview.js"></script>
		<script src="${base}/components/assets/js/ace/elements.wizard.js"></script>
		<script src="${base}/components/assets/js/ace/elements.aside.js"></script>
		<script src="${base}/components/assets/js/ace/ace.js"></script>
		<script src="${base}/components/assets/js/ace/ace.ajax-content.js"></script>
		<script src="${base}/components/assets/js/ace/ace.touch-drag.js"></script>
		<script src="${base}/components/assets/js/ace/ace.sidebar.js"></script>
		<script src="${base}/components/assets/js/ace/ace.sidebar-scroll-1.js"></script>
		<script src="${base}/components/assets/js/ace/ace.submenu-hover.js"></script>
		<script src="${base}/components/assets/js/ace/ace.widget-box.js"></script>
		<script src="${base}/components/assets/js/ace/ace.settings.js"></script>
		<script src="${base}/components/assets/js/ace/ace.settings-rtl.js"></script>
		<script src="${base}/components/assets/js/ace/ace.settings-skin.js"></script>
		<script src="${base}/components/assets/js/ace/ace.widget-on-reload.js"></script>
		<script src="${base}/components/assets/js/ace/ace.searchbox-autocomplete.js"></script>
		<script src="${base}/components/common/layer/layer.js"></script>
		<script src="${base}/components/js/normal.js"></script>

		<!-- template -->
		<script src="${base}/components/assets/js/baiduTemplate.js"></script>

		<script type="text/javascript">

            jQuery.fn.outerHTML = function(s) {
                return s
                    ? this.before(s).remove()
                    : jQuery("<p>").append(this.eq(0).clone()).html();
            };

            /**菜单重新加载提示*/
            function menuLoadFunc(msg) {
                if(msg) {
                    alert("菜单重新加载成功!");
                }else{
                    alert("菜单重新加载失败!");
                }
                window.setTimeout(function(){
                    var hrefUrl = self.location.href;
                    var hrefMarkIndex = hrefUrl.indexOf(";jsessionid=");
                    if(hrefMarkIndex != -1) {
                        hrefUrl = hrefUrl.substring(0,hrefMarkIndex);
                    }
                    window.location.href=hrefUrl;
                },500);
            }

            function calcPageHeight() {
                var doc=document;
                var cHeight = Math.max(doc.body.clientHeight,doc.documentElement.clientHeight)
                var sHeight = Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight)
                var height  = Math.max(cHeight, sHeight)
                return height;
            }


            //首页菜单 事件处理
            var Index = function(){

                var baiduTpl = {};

                var initTpl = function(){
                    baiduTpl.menu_tpl = baidu.template('menu-tpl');
				}

                var menusHtml = {
                    //菜单
                    menuHtml : function(menu) {
                        var url = menu.url;
                        var id = menu.id;
                        var isHasChild = (menu.children.length > 0);
                        var menuName = menu.name;
                        var html = '';
                        var clazz = isHasChild ? "dropdown-toggle" : " ";
                        if(url == null || url == '' || url == 'undefined') {
                            html += '<li><a data-nav-id="'+id+'" data-nav-src="'+url+'" class="'+clazz+'"><i class="menu-icon fa fa-folder-o"></i><span class="menu-text">'+menuName+'</span>';
								if(isHasChild) {
									html += '<b class="arrow fa fa-angle-down"></b>';
								}
                            html += '</a><b class="arrow"></b>';
							 if(isHasChild) {
							     html += '<ul class="submenu">';
							     for(var i = 0 ; i< menu.children.length ; i++) {
							         var childMenu = menu.children[i];
                                     html += menusHtml.menuHtml(childMenu);
								 }
                                 html +='</ul>';
							 }
                            html += '</li>';
                        }else{
                            html += '<li><a data-nav-id="'+id+'" data-nav-src="'+url+'"><i class="menu-icon fa fa-caret-right"></i><span class="menu-text">'+menuName+'</span></a><b class="arrow"></b></li>';
                        }
                        return html;
                    }

                }

                var initMenu = function(){
                    var menus = [ <%@ include file="common-menus.jsp" %> ];
                    var menuNode = $('.nav.nav-list');
                    for(var i = 0; i < menus.length; i++){
                        var menu = menus[i];
                        var html = menusHtml.menuHtml(menu);
                        menuNode.append(html);
                    }

                   ind.initEvent();	//初始化菜单事件

					function recursionMenu(menus,node){
                        for(var i = 0; i < menus.length; i++){
                            var menu = menus[i];

                            var childrenNode = node.find('ul.submenu');
                            var tempNode;
                            if(childrenNode.length){
                                tempNode = $(baiduTpl.menu_tpl({data: menu})).appendTo(childrenNode[childrenNode.length-1]);
                            }else{
                                tempNode = $(baiduTpl.menu_tpl({data: menu})).appendTo(node);
                            }
							//存在子菜单
                            if(menu.children.length) {
                            	$('<ul class="submenu"> </ul>').appendTo(tempNode);
							    recursionMenu(menu.children,tempNode);
                            }
                        }
					}
				}
                //ind.initEvent();
                return {
                    init: function(){
                        initTpl();
                        initMenu();
					}
				}
			}

			$(Index().init);
		</script>
	</body>
</html>