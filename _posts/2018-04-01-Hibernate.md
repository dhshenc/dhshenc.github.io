---
layout: post
title: "Hibernate"
date: 2018-04-01
tag: 链接Oracle数据库
---
### 介绍
	
	Hibernate是一个优秀的持久化框架，负责简化将对象数据保存到数据库中，或从数据库中读取数据并封装到对象的工作。
	Hibernate通过简单配置和编码即可替代JDBC繁琐的程序代码。
	Hibernate已经成为当前主流的数据库持久化框架，被广泛应用。

### 部署jar包
	
**下载jar包**

> 1、在[Hibernate](http://www.hibernate.org)官网下载(推荐下载hibernate-distribution-3.3.2.GA-dist.zip)<br>
> 2、解压后把hibernate3.jar和lib\required下的6个jar包拷贝到你的项目下(还有ojdbc6.jar包)<br>

### 创建配置文件

打开你刚才解压hibernate-distribution-3.3.2.GA-dist.zip的压缩包中documentation\manual\zh-CN\html_single目录下index.html<br>
会看到一个文档，在目录中点击”Hibernate配置“ ，你将会看到Hibernate配置文件，拷贝到你创建的文件中.
>	**或者拷贝下面配置hibernate.cfg.xml好的:**
	
> 1、<?xml version='1.0' encoding='utf-8'?><br>
> 2、<!DOCTYPE hibernate-configuration PUBLIC
> 3、	"-//Hibernate/Hibernate Configuration DTD 3.0//EN"
> 4、	"http://hibernate.sourceforge.net/hibernate-configuration-3.0.dtd"><br>
> 5、
> 6、<hibernate-configuration><br>
> 7、
> 8、	<session-factory><br>
> 9、
> 10、		<!-- Database connection settings --><br>
> 11、		<property name="connection.driver_class">oracle.jdbc.driver.oracleDriver</property><br>
> 12、		<property name="connection.url">jdbc:oracle:thin:@127.0.0.1:1521:ORCL</property><br>
> 13、		<property name="connection.username">SCOTT</property><br>
> 14、		<property name="connection.password">123456</property><br>
> 15、
> 16、		<!-- JDBC connection pool (use the built-in) --><br>
> 17、		<property name="connection.pool_size">1</property><br>
> 18、
> 19、		<!-- SQL dialect --><br>
> 20、		<property name="dialect">org.hibernate.dialect.Oracle10gDialect</property><br>
> 21、
> 22、		<!-- Enable Hibernate's automatic session context management --><br>
> 23、		<property name="current_session_context_class">thread</property><br>
> 24、
> 25、		<!-- Disable the second-level cache  --><br>
> 26、		<property name="cache.provider_class">org.hibernate.cache.NoCacheProvider</property><br>
> 27、
> 28、		<!-- Echo all executed SQL to stdout --><br>
> 29、		<property name="show_sql">true</property><br>
> 30、
> 31、		<!-- Drop and re-create the database schema on startup --><br>
> 32、		<property name="hbm2ddl.auto">update</property><br>
> 33、
> 34、		mapping resource="(your hbm.xml Directory location ).hbm.xml"/><br>
> 35、
> 36、	</session-factory><br>
> 37、
> 38、</hibernate-configuration><br>

### 创建映射文件

还是在参考文档中点击映射文件，拷贝第一个和第四个代码。（注：映射文件对应持久化类）<br>
**或者拷贝下面xxx.hbm.xml文件:**
	
> 1、<?xml version="1.0"?><br>
> 2、<!DOCTYPE hibernate-mapping PUBLIC
> 3、        "-//Hibernate/Hibernate Mapping DTD 3.0//EN"
> 4、        "http://hibernate.sourceforge.net/hibernate-mapping-3.0.dtd"><br>
> 5、
> 6、<hibernate-mapping package="org.hibernate.tutorial.domain"><br>
> 7、
> 8、    <class name="Event" table="EVENTS"><br>
> 9、        <id name="id" column="EVENT_ID"><br>
> 10、            <generator class="native"/><br>
> 11、        </id><br>
> 12、        <property name="date" type="timestamp" column="EVENT_DATE"/><br>
> 13、        <property name="title"/><br>
> 14、   </class><br>
> 15、
> 16、</hibernate-mapping>

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


	

	
	
	
	