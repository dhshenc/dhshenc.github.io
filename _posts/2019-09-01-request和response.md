---
layout: post
title: "request和response"
date: 2019-09-01
tag: Servlet
---
### 页面跳转

> * 作为后台开发人员,我们大多时候都在接收处理用户请求,给予用户响应,为了方便操作,服务器软件将请求和响应封装成了`request`和`response`

> * Java Web服务端控制页面跳转主要有两种：重定向和转发

> **重定向**

> * 代码示例:
>   - response.sendRedirect("index.html");

> * 重定向就是通过各种方法将网络请求重新定个方向转到其它位置。

> * 实现原理：
>   - 客户浏览器发送http请求----》web服务器接受后发送302状态码响应及对应新的location给客户浏览器--》客户浏览器发现是302响应，则自动再发送一个新的http请求，请求url是新的location地址----》服务器根据此请求寻找资源并发送给客户。
>   - 在这里location可以重定向到任意URL，既然是浏览器重新发出了请求，则就没有什么request传递的概念了。在客户浏览器路径栏显示的是其重定向的路径，客户可以观察到地址的变化的。

> * 特点：
> 1. 重定向是客户端行为。  
> 2. 重定向是浏览器做了至少两次的访问请求。  
> 3. 重定向浏览器地址改变。  
> 4. 重定向两次跳转之间传输的信息会丢失（request范围）。  
> 5. 重定向可以指向任何的资源，包括当前应用程序中的其他资源，同一个站点上的其他应用程序中的资源，其他站点的资源。  
> * 注意：传递给HttpServletResponse.sendRedirect方法的相对URL以“/”开头，它是相对于整个WEB站点的根目录

> **请求转发**

> * 代码示例:
>   - request.getRequestDispatcher("/login.html").forward(request, response);

> * 转发的原理:
>   - 客户浏览器发送http请求----》web服务器接受此请求--》调用内部的一个方法在容器内部完成请求处理和转发动作----》将目标资源发送给客户。
>   - 在这里，转发的路径必须是同一个web容器下的url，其不能转向到其他的web路径上去，中间传递的是自己的容器内的request。在客户浏览器路径栏显示的仍然是其第一次访问的路径，也就是说客户是感觉不到服务器做了转发的。

> * 特点：
> 1. 转发是服务器行为  
> 2. 转发是浏览器只做了一次访问请求  
> 3. 转发浏览器地址不变  
> 4. 转发两次跳转之间传输的信息不会丢失，所以可以通过request进行数据的传递  
> 5. 转发只能将请求转发给同一个WEB应用中的组件  
> * 注意：如果创建RequestDispatcher对象时指定的相对URL以“/”开头，它是相对于当前WEB应用程序的根目录。

> **网络路径问题**

> * 路径分类:
>   - **绝对路径:**用在不同网站之间的跳转,比如：http://www.baidu.com/aaa/1.jpg
>   - **相对路径:**用在同一个网站中,aaa/1.jpg，仅限静态资源，如果页面比较多，并且使用框架，会出现混乱。
>   - **根路径:**根指定就是主机名（服务器） /day12web1/loginservlet（/表示  http://localhost:8080/）/day12web1/loginservlet 
>   - 如果在浏览器中使用`/`表示 http://localhost:8080//listservlet
>   - 如果是在服务器中使用`/`表示 /day12web1

### response对象

> * 在Servlet中可以使用的内置对象主要有：request、response、application、session、out（PrintWriter）

> **ServletResponse简介**

> * 定义辅助servlet将响应发送到客户端的对象。servlet 容器创建 ServletResponse 对象，并将它作为参数传递给 servlet 的 service 方法。
> * 要发送 MIME 正文响应中的二进制数据，请使用 `getOutputStream` 返回的 `ServletOutputStream`。
> * 要发送字符数据，请使用 `getWriter` 返回的 `PrintWriter` 对象。
> * `两个流不可以同时使用`

> **HttpServletResponse介绍**

> 扩展 ServletResponse 接口以提供特定于 HTTP 的发送响应功能。例如，该接口拥有访问 HTTP 头和 cookie 的方法。 客户端向服务器发起的都是HTTP协议操作,所以我们大部分使用HttpServletResponse对象作为直接操作对象!

> **HttpServletResponse 常用API介绍**

| 方法名称                      |                             作用                             |
| :---------------------------- | :----------------------------------------------------------: |
| setStatus(int code)           | 设置响应状态码：200 成功  302 临时重定向  304 处理缓存  404 Not Found没有找到资源，500 服务器错误 |
| setHeader(name,value)         |                        设置响应信息头                        |
| setCharacterEncoding(String); |                         设置编码格式                         |
| setContentType(String)        |                     设置返回数据mimetype                     |
| getWriter()                   |                        获取字符输出流                        |
| getOutputStream()             |                        获取字节输出流                        |

> **设置返回字符编码格式**

> * 第一种方法:
> * 代码示例:

> ```html
>response.setCharacterEncoding("utf-8");
><!--设置tomcat编码格式-->
><html>
>	<head>
>		<meta charset="utf-8">
>  		<title>xxx</title>
>	</head>
>	<body>编写返回的文本内容</body>
></html>	
><!--设置浏览器解析文本内容格式-->
>```
> * 可以解决返回字符串乱码问题,但是需要将返回的字符串封装到html代码中.操作繁琐!

> * 第二种方法:
> * 代码示例:
>   - response.setHeader("Content-type","text/html;charset=UTF-8")
> * 相对简单,通过`设置响应头`告知浏览器解析字符串的编码格式!

> * 第三种方法(推荐):
> * 代码示例:
>   - response.setContentType("text/html;charset=UTF-8")
> * 利用`setContentType`这种综合性的写法解决问题!此方法也是开发中常用的方法!方便!

### request对象

> **ServletRequest介绍**

> * 定义将客户端请求信息提供给某个 servlet 的对象。servlet 容器创建ServletRequest 对象，并将该对象作为参数传递给该 servlet 的service方法。 

> **HttpServletRequest介绍**

> * HttpServletRequest对象代表客户端的请求，当客户端通过HTTP协议访问服务器时，HTTP请求头中的所有信息都封装在这个对象中，开发人员通过这个对象的方法，可以获得客户这些信息。

> * 小结:同响应相同,客户端请求协议都是基于HTTP所以我们选用HttpServletRequest来操作用户发送过来的请求的数据!

> **HttpServletRequest常用API**

> * URL：Uniform Resource Location (统一资源定位符) 网址
> * URI：Uniform Resource Identifier (统一资源标识符)  URI包含URL

> **获取请求路径相关参数**

> - getRequestURL方法返回客户端发出请求时的完整URL。
> - getRequestURI方法返回请求行中的资源名部分。
> - getQueryString 方法返回请求行中的参数部分。
> - getRemoteAddr方法返回发出请求的客户机的IP地址
> - getRemoteHost方法返回发出请求的客户机的完整主机名
> - getRemotePort方法返回客户机所使用的网络端口号
> - getLocalAddr方法返回WEB服务器的IP地址。
> - getLocalName方法返回WEB服务器的主机名
> - getMethod得到客户机请求方式

> **获取请求头信息**

> - getHead(name)方法 
> - getHeaders(String name)方法 //根据name获取keys
> - getHeaderNames()获取所有请求的names

> **获取请求正文参数**

> - getParameter(name)方法
> - getParameterValues（String name）方法
> - getParameterNames方法 
> - getParameterMap方法 //做框架用，非常实用
> - getInputStream方法 获取输入流

> * 部分代码示例:

> ```java
>String header = request.getHeader("user-agent");
>//获取所有请求的names
>Enumeration<String> headerNames = request.getHeaderNames();
>while (headerNames.hasMoreElements()) {
>   String name = (String) headerNames.nextElement();
>   //根据name获取keys
>   Enumeration<String> headers = request.getHeaders(name);
>   while (headers.hasMoreElements()) {
>       String key = (String) headers.nextElement();
>       System.out.println(name+"--->"+key);
>   }
>}
>```

<br>
    
转载请注明：[Memory的博客](https://www.shendonghai.com) » [点击阅读原文](https://www.shendonghai.com/2018/04/2018-04-05-Git%E9%85%8D%E7%BD%AE/) 