<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2016/10/31
  Time: 15:35
  To change this template use File | Settings | File Templates.
--%>
<%
	String root = request.getContextPath();
	String base = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath();
	request.getSession().setAttribute("base", base);
%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
	<title>文件上传TEST</title>
</head>
<body>
<form action="${base}/upload" method="post" enctype="multipart/form-data">
	<input type="file" name="fileName">
	<input type="submit" value="上传">
</form>
-------------------------------------------------------------------------------------------

</body>
</html>
