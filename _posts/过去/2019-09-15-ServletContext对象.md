---
layout: post
title: "ServletContext对象"
date: 2019-09-15
tag: 过去
---
### ServletContext对象

> * ServletContext:Servlet上下文，代表当前整个应用程序。（jsp中application）

> **什么是ServletContext**

> * ServletContext：Servlet上下文。
> * 当WEB服务器启动时，会为每一个WEB应用程序(webapps下的每个目录就是一个应用程序)创建一块共享的存储区域
> * ServletContext也叫做“公共区域”，也就是同一个WEB应用程序中，所有的Servlet和JSP都可以共享同一个区域。
> * ServletContext在WEB服务器启动时创建，服务器关闭时销毁。

> **获得Servlet上下文**

> * 方式一:GenericServlet提供了getServletContext()方法。（推荐）
> * 方式二:HttpServletRequest提供了getServletContext()方法。(推荐)
> * 方式三:ServletConfig提供了getServletContext()方法。
> * 方式四:HttpSession提供了getServletContext()方法。

> **Servlet上下文的作用及特点**

> * 作用：
>   - 1、获取真实路径
>       - 获取当前项目的发布路径
>       - request.getServletContext().getRealPath("/");
>   - 2、获取容器的附加信息
>       - System.out.println(request.getServletContext().getServerInfo());
>       - System.out.println(request.getServletContext().getContextPath());
>       - System.out.println(request.getContextPath());
>   - 3、全局容器
>       - //设置信息到全局容器中
>       - request.getServletContext().setAttribute("msg", "共享信息");
>       - //获取数据
>       - System.out.println(request.getServletContext().getAttribute("msg"));
>       - //移除数据
>       - request.getServletContext().removeAttribute("msg");

> * 特点：
>   - 唯一性: 一个应用对应一个servlet上下文。
>   - 一直存在: 只要容器不关闭或者应用不卸载，servlet上下文就一直存在。

> * web.xml文件配置servletContext参数
> * 代码如下:

>```xml
> <!-- 配置应用程序的初始化参数  -->
> <context-param>
> 	<param-name>appname</param-name>
> 	<param-value>xxx管理系统</param-value>
> </context-param>
>   
> <context-param>
> 	<param-name>appversion</param-name>
> 	<param-value>2.0</param-value>
> </context-param>
> ```

>```java
> //获取servlet上下文参数
> String appname=application.getInitParameter("appname");
> String appversion=application.getInitParameter("appversion");
> System.out.println(appname+"..."+appversion);
>```

> **ServletContext统计Servlet访问次数**

> * 代码示例:

>```java
>ServletContext application = request.getServletContext();
>Integer count=(Integer) application.getAttribute("count");
>if(count==null) {
>	count=1;
>	application.setAttribute("count", count);
>}else {
>   count++;
>   application.setAttribute("count", count);
>}
>PrintWriter out=response.getWriter();
>out.write("servlet共访问次数："+count);
>```

<br>
    
转载请注明：[Memory的博客](https://www.shendonghai.com) » [点击阅读原文](https://www.shendonghai.com/2019/09/ServletContext%E5%AF%B9%E8%B1%A1/) 