<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@taglib prefix="shiro" uri="/WEB-INF/tld/shiro.tld" %>
<%
	int port = request.getServerPort();
	String base = request.getScheme()+"://"+request.getServerName()+(port==80?"":":"+port)+request.getContextPath();
	request.getSession().setAttribute("base", base);
%>