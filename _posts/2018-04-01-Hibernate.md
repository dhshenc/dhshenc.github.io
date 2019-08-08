---
layout: post
title: "Hibernate框架"
date: 2018-04-01
tag: Hibernate
---
### 介绍
	
	Hibernate是一个优秀的持久化框架，负责简化将对象数据保存到数据库中，或从数据库中读取数据并封装到对象的工作。
	Hibernate通过简单配置和编码即可替代JDBC繁琐的程序代码。
	Hibernate已经成为当前主流的数据库持久化框架，被广泛应用。

### 部署jar包
	
**下载jar包**

> 1、在[Hibernate](http://www.hibernate.org)官网下载(推荐下载hibernate-distribution-3.3.2.GA-dist.zip)    
> 3、解压后把hibernate3.jar和lib\required下的6个jar包拷贝到你的项目下(还有ojdbc6.jar包)

### 创建配置文件

打开你刚才解压hibernate-distribution-3.3.2.GA-dist.zip的压缩包中documentation\manual\zh-CN\html_single目录下index.html
会看到一个文档，在目录中点击”Hibernate配置“ ，你将会看到Hibernate配置文件，拷贝到你创建的文件中。

**或者拷贝下面配置好的hibernate.cfg.xml文件:**

>	<?xml version='1.0' encoding='utf-8'?>  
>	<!DOCTYPE hibernate-configuration PUBLIC  
>	"-//Hibernate/Hibernate Configuration DTD 3.0//EN"  
>	"http://hibernate.sourceforge.net/hibernate-configuration-3.0.dtd">  
>	  
>	<hibernate-configuration>  
>	  
>	<session-factory>  
>	  
>	<!-- Database connection settings -->  
>	<property name="connection.driver_class">oracle.jdbc.driver.oracleDriver</property>  
>	<property name="connection.url">jdbc:oracle:thin:@127.0.0.1:1521:ORCL</property>  
>	<property name="connection.username">SCOTT</property>  
>	<property name="connection.password">123456</property>  
>	  
>	<!-- JDBC connection pool (use the built-in) -->  
>	<property name="connection.pool_size">1</property>  
>	  
>	<!-- SQL dialect -->  
>	<property name="dialect">org.hibernate.dialect.Oracle10gDialect</property>  
>	  
>	<!-- Enable Hibernate's automatic session context management -->  
>	<property name="current_session_context_class">thread</property>  
>	  
>	<!-- Disable the second-level cache  -->  
>	<property name="cache.provider_class">org.hibernate.cache.NoCacheProvider</property>  
>	  
>	<!-- Echo all executed SQL to stdout -->  
>	<property name="show_sql">true</property>  
>	  
>	<!-- Drop and re-create the database schema on startup -->  
>	<property name="hbm2ddl.auto">update</property><br>  
>	  
>	<mapping resource="(your hbm.xml Directory location ).hbm.xml"/>  
>	  
>	</session-factory>  
>	  
>	</hibernate-configuration>

### 创建映射文件

还是在参考文档中点击映射文件，拷贝第一个和第四个代码。（注：映射文件对应持久化类）

**或者拷贝下面xxx.hbm.xml文件:**

>	<?xml version="1.0"?>  
>	<!DOCTYPE hibernate-mapping PUBLIC  
>	"-//Hibernate/Hibernate Mapping DTD 3.0//EN"  
>	"http://hibernate.sourceforge.net/hibernate-mapping-3.0.dtd">  
>	  
>	<hibernate-mapping package="org.hibernate.tutorial.domain">  
>	  
>	<class name="Event" table="EVENTS">  
>	<id name="id" column="EVENT_ID">  
>	<generator class="native"/>  
>	</id>  
>	<property name="date" type="timestamp" column="EVENT_DATE"/>  
>	<property name="title"/>  
>	</class>  
>	  
>	</hibernate-mapping>

### Hibernate操作数据库七个步骤
	
(1)读取并解析配置文件  
>* Configuration conf = new Configuration().configre();
  
(2)读取并解析映射文件  
>* SessionFactory sf = conf.buildSessionFactory(); 
 
(3)打开Session  
>* Session session = sf.openSession();  

(4)开始一个事务  
>* Transaction tx = session.beginTransaction(); 
 
(5)数据库操作  
>* session.save(xxx);  

(6)结束事务  
>* session.close();  

(7)关闭session  
>* session.close();

### 其他

> [MyEclipse连接Oracle数据库](https://www.cnblogs.com/userWuLiang/archive/2013/04/13/3018736.html)

> [MyEclipse反向生成hibernate文件](https://blog.csdn.net/u014008219/article/details/51120135)

> [MyEclipse生成hibernate配置文件](https://blog.csdn.net/u013654037/article/details/36186933)

<br>

转载请注明：[程序海的博客](https://www.shendonghai.com) » [点击阅读原文](https://www.shendonghai.com/2018/04/Hibernate/) 


	

	
	
	
	