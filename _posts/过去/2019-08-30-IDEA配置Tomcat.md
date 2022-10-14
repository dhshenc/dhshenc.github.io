---
layout: post
title: "IDEA配置Tomcat"
date: 2019-08-30
tag: 过去
---
### IDEA配置Tomcat

> (1)打开设置setting(如图):  

![12](/images/ideaTomcat/12.png)

> (2)添加tomcat(如图):  

![13](/images/ideaTomcat/13.png)

> (3)选择下载的Tomcat文件位置(如图):  

![14](/images/ideaTomcat/14.png)

> (4)如图配置，点击OK完成(Tomcat也可创建项目后进行配置，这里就不演示了):  

![15](/images/ideaTomcat/15.png)
    
### 创建web项目

> (1)点击创建(如图):  

![1](/images/ideaTomcat/1.png)

> (2)选择图中标记选项，(如图):  

![2](/images/ideaTomcat/2.png)

> (3)输入项目名，点击Finish(如图):  

![3](/images/ideaTomcat/3.png)

> (4)点击Edit Configurations修改Tomcat默认配置(如图):  

![4](/images/ideaTomcat/4.png)

> (5)按照顺序介绍(如图):  
>   - 1.Tomcat名称
>   - 2.当更新时需要怎样执行，更新类和资源
>   - 3.当窗口失去焦点时，需要怎么执行
>   - 4.端口号
>   - 5.应用

![5](/images/ideaTomcat/5.png)

> (6)修改访问时的项目名,不然访问时项目名过长(如图):  

![6](/images/ideaTomcat/6.png)

> (7)启动Tomcat(如图):  

![9](/images/ideaTomcat/9.png)

> (8)更新项目(如图):  
>   - 1.更新按钮
>   - 2.更新资源
>   - 3.更新类和资源
>   - 4.重新部署
>   - 5.重新启动Tomcat

![10](/images/ideaTomcat/10.png)

> (9)访问项目，测试成功(如图):  

![11](/images/ideaTomcat/11.png)

### 把项目打包成war压缩包(可以拷贝到Tomcat/webapp下面可以运行)

> (1)按照顺序操作即可(如图):  

![7](/images/ideaTomcat/7.png)

> (2)顺序操作(如图):  

![8](/images/ideaTomcat/8.png)

> (3)打包成功(如果没有显示点击上面的小锤子或者点击Build-->Build Project):  

![17](/images/ideaTomcat/17.png)

<br>
    
转载请注明：[Memory的博客](https://www.shendonghai.com) » [点击阅读原文](https://www.shendonghai.com/2019/08/IDEA%E9%85%8D%E7%BD%AETomcat/) 