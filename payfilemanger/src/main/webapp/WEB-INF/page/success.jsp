<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2017/3/30
  Time: 10:57
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
    <title>Title</title>
</head>
<body>
<h1>文件上传成功</h1>
<form action="${base}/down" method="post">
    <input type="hidden" name="group" value="${group}">
    <input type="hidden" name="downname"value="${msg}">
    <input type="submit" value="点击下载">
</form>
<form action="${base}/delet" metlhod="post">
    <input type="hidden" name="group" value="${group}">
    <input type="hidden" name="deletname"value="${msg}">
    <input type="submit" value="点击删除">
</form>
</body>
</html>
