---
layout: post
title: "Spring整合MyBatis详解"
date: 2019-11-03
tag: Spring
---
### 介绍

> * 将Model层管理在工厂中，势必要将Service和DAO的对象纳入工厂，而Service和DAO中还依赖着Mybatis的相关封装功能，所以，只有将Mybatis的相关功能组件也纳入工厂，才可以让Service和DAO照常运作。
> * 需要纳入工厂的Mybatis的相关功能组件有：
>   - DataSource   负责管理数据库连接
>   - SqlSessionFacotry  Mybatis使用的核心组件
>   - MapperScannerConfigurer   负责创建DAO实现 (Mapper)

### DataSource

> * 数据源，即连接池。
> * 作用：减少请求执行过程中，创建数据库连接的时间消耗，提升执行性能。
> * 常见连接池：dbcp，c3p0，durid

> **需要的依赖**

>```xml
><!-- druid依赖 -->
><dependency>
>    <groupId>com.alibaba</groupId>
>    <artifactId>druid</artifactId>
>    <version>1.1.12</version>
></dependency>
>
><!-- dbcp依赖 -->
><dependency>
>    <groupId>commons-dbcp</groupId>
>    <artifactId>commons-dbcp</artifactId>
>    <version>1.4</version>
></dependency>
>
><!-- c3p0依赖 -->
><dependency>
>    <groupId>com.mchange</groupId>
>    <artifactId>c3p0</artifactId>
>    <version>0.9.5.2</version>
></dependency>
><!-- spring-jdbc(会传递tx) ，context-support ,aspects-->
><dependency>
>    <groupId>org.springframework</groupId>
>    <artifactId>spring-jdbc</artifactId>
>    <version>4.3.6.RELEASE</version>
></dependency>
>
><!-- spring+mybatis集成依赖 -->
><dependency>
>    <groupId>org.mybatis</groupId>
>    <artifactId>mybatis-spring</artifactId>
>    <version>1.3.1</version>
></dependency>
>```

> **dbcp配置**

>```xml
> <!-- 连接池 dbcp-->
>     <bean class="org.apache.commons.dbcp.BasicDataSource" id="durid_dateSource" destroy-method="close">
>         <property name="username" value="root"></property>
>         <property name="password" value="root"></property>
>         <property name="url" value="jdbc:mysql://localhost:3306/mybatis_01?useSSL=true&amp;characterEncoding=utf8"></property>
>         <property name="driverClassName" value="com.mysql.jdbc.Driver"></property>
>         <!-- 详细参数 -->
>         <!-- 连接池的最大连接对象 数量 -->
>         <property name="maxActive" value="3"></property>
>         <!-- 最少要空闲 1 个连接对象 -->
>         <property name="minIdle" value="1"></property>
>         <!-- 初始化连接池  要创建1个连接对象 -->
>         <property name="initialSize" value="1"></property>
>         <!-- 当想连接池索要连接池时，如果没有空闲连接，最大等待时间，毫秒 -->
>         <property name="maxWait" value="3000"></property>
>     </bean>
>```

> **druid配置**

>```xml
> <bean id="druid_dateSource" class="com.alibaba.druid.pool.DruidDataSource" init-method="init"
>          destroy-method="close">
>        <!-- 基本属性 url、user、password -->
>        <!--<property name="driver" value="${jdbc.driver}"/>-->
>        <property name="url" value="${jdbc.url}"/>
>        <property name="username" value="${jdbc.username}"/>
>        <property name="password" value="${jdbc.password}"/>
>
>        <!-- 配置初始化大小、最小、最大 -->
>        <property name="initialSize" value="1"/>
>        <property name="minIdle" value="1"/>
>        <property name="maxActive" value="3"/>
>
>        <!-- 配置获取连接等待超时的时间 -->
>        <property name="maxWait" value="3000"/>
>
>        <!-- 配置间隔多久才进行一次检测，检测需要关闭的空闲连接，单位是毫秒 -->
>        <property name="timeBetweenEvictionRunsMillis" value="60000"/>
>
>        <!-- 配置一个连接在池中最小空闲的时间，单位是毫秒 -->
>        <property name="minEvictableIdleTimeMillis" value="300000"/>
>
>        <!-- 发送一个连接，检测连接时候可用 -->
>        <property name="validationQuery" value="SELECT 'x'"/>
>        <!-- 空闲时发 -->
>        <property name="testWhileIdle" value="true"/>
>        <!-- 借出时不发 -->
>        <property name="testOnBorrow" value="false"/>
>        <!-- 归还时不发 -->
>        <property name="testOnReturn" value="false"/>
>    </bean>
>```

> **c3p0配置**

>```xml
> <bean class="com.mchange.v2.c3p0.ComboPooledDataSource" id="c3p0_dateSource" destroy-method="close">
>        <property name="user" value="root"></property>
>        <property name="password" value="root"></property>
>        <property name="jdbcUrl" value="jdbc:mysql://localhost:3306/mybatis_01?useSSL=true&amp;characterEncoding=utf8"></property>
>        <property name="driverClass" value="com.mysql.jdbc.Driver"></property>
>        <!-- 详细参数 -->
>        <!-- 连接池的最大连接对象 数量 -->
>        <property name="maxPoolSize" value="3"></property>
>        <!-- 最少连接数 -->
>        <property name="minPoolSize" value="1"></property>
>        <!-- 初始化连接池  要创建1个连接对象 -->
>        <property name="initialPoolSize" value="1"></property>
>        <!-- 当想连接池索要连接池时，如果没有空闲连接，最大等待时间，毫秒 -->
>        <property name="checkoutTimeout" value="3000"></property>
>    </bean>
>```

### SqlSessionFactoryBean

> * 是一个`工厂bean`，用于生产SqlSessionFactory.
> * 依赖点：
> 1. **datasource**  
> 2. **dao映射文件位置**  
> 3. **别名**  

> ```xml
> <!-- 工厂bean：生成SqlSessionFactory -->
><bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
>    <!-- 注入连接池 -->
>    <property name="dataSource" ref="dataSource"></property>
>    <!-- 注入dao-mapper文件信息 ,如果映射文件和dao接口 同包同名，则此配置可省略-->
>    <property name="mapperLocations">
>        <list>
>            <value>classpath:com/zhj/dao/*.xml</value>
>        </list>
>    </property>
>    <!-- 为 dao-mapper文件中的实体 定义缺省包路径 
>     如：<select id="queryAll" resultType="User"> 中 User类可以不定义包
>    -->
>    <property name="typeAliasesPackage" value="com.xxx.domain"></property>
></bean>
>```

### MapperScannerConfigurer

>```xml
> <!-- mapperScannerConfigurer
> 		生产DAO实现类的对象，纳入工厂管理
> 		行为：
> 		  1.扫描所有DAO接口,去构建DAO实现
> 		  3.将DAO实现纳入工厂管理 且DAO实现对象在工厂中的id是：“首字母小写的-接口的类名”
>                                                    UserDAO==userDAO  OrderDAO==orderDAO
> -->
> <bean id="mapperScannerConfigurer9" class="org.mybatis.spring.mapper.MapperScannerConfigurer">
>    	<!-- dao接口所在的包  如果有多个包，可以用逗号或分号分隔 
>   		<property name="basePackage" value="com.a.dao,com.b.dao"></property>
>    	-->
>     <property name="basePackage" value="com.xxx.dao"></property>
>     <!-- SqlSessionFacotry: *mapper文件  *SqlSession -->
>     <!-- 如果工厂中只有一个SqlSessionFactory的bean，此配置可省略 -->
>     <property name="sqlSessionFactoryBeanName" value="sqlSessionFactory"></property>
> </bean>
> ```

### 测试如下:

> ```java
> ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
> SqlSessionFactory factory = (SqlSessionFactory)context.getBean("sqlSessionFactory");
> //获取SqlSession,其中会需要一个Connection
> SqlSession session1 = factory.openSession();
> session1.getConnection();
> SqlSession session2 = factory.openSession();
> session2.getConnection();
> SqlSession session3 = factory.openSession();
> session3.getConnection();
> SqlSession session4 = factory.openSession();
> session4.getConnection();
> System.out.println("test----------");
> ```

>```java
> ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
> //获取DAO对象
> UserDAO ud = (UserDAO)context.getBean("userDAO");
> List<User> users = ud.queryAll();
> for(User user:users){
>     System.out.println(user);
> }
> ud.insertUser(new User());//注意：此时事务是自动提交的
>```

### 基于注解整合

> **注解使用**

> * `@Service`  业务类专用
> * `@Repository`  dao实现类专用
> * `@Controller `   web层专用
> * `@Component` 通用 可以代替上面三个。不推荐使用，语义不清晰
> * `@Scope`  用户控制bean的创建模式
> * 注解的作用:部分 `<bean>` 可以省略 !!

>```java
> // @Service说明 此类是一个业务类，需要将此类纳入工厂==bean  等价替换掉 <bean class="xxx.UserServiceImpl">
> // @Service默认beanId == 首字母小写的类名"userServiceImpl"
> // @Service("userService") 自定义beanId为"userService"
> @Service
> public class UserServiceImpl implements UserService {
>  	...   
> }
>```

> * `@Autowired`  基于类型自动注入
> * `@Resource`    基于名称自动注入

>```java
> public class UserServiceImpl implements UserService {
>	...
>	//@Resource(name="userService9")//将id=userService9的bean注入给此属性
>	//此属性要求工厂，基于名称自动注入
>	//@Resource //set/get可省略
>	//此属性要求工厂，基于类型自动注入
>	@Autowired //set/get可省略
>	private UserDao userDao;
>	...
>}
>```

> **注解需求配置**

>```xml
> <!-- 告知spring，哪些包中 有被注解的类、方法、属性 -->
> <!-- <context:component-scan base-package="com.xxx.action,com.xxx.service"></context:component-scan> -->
> <context:component-scan base-package="com.xxx"></context:component-scan>
>```

### 配置参数分离

> **定义参数文件**

>```properties
> jdbc.url=jdbc:mysql://localhost:3306/xxx?useUnicode=true&amp;characterEncoding=utf8
> jdbc.username=root
> jdbc.password=111111
> jdbc.maxActive=3
>```

> **工厂配置中导入外部文件**

>```xml
> <!-- 导入外部的配置信息 -->
> <context:property-placeholder location="classpath:db.properties"/>
>```

> **在工厂配置中使用外部参数**

>```xml
> <property name="url" value="${jdbc.url}"></property>
> <property name="username" value="${jdbc.username}"></property>
> <property name="password" value="${jdbc.password}"></property>
> <property name="maxActive" value="${jdbc.maxActive}"></property>
>```

### 与web集成

> **ContextLoaderListener**
> * 核心：注册`ContextLoaderListener`

> **需要依赖**

>```xml
> <!-- 提供和web环境集成的支持 -->
> <dependency>
>    <groupId>org.springframework</groupId>
>    <artifactId>spring-web</artifactId>
>    <version>4.3.6.RELEASE</version>
> </dependency>
>```

> **web.xml文件配置**

>```xml
> <!-- 监听项目的启动，负责启动spring工厂，并把工厂对象存储于ServletContext作用域中
>     细节：需要知道 spring的配置文件的位置。会从 一个名为"contextConfigLocation"的context-param中获取
>   -->
> <listener>
>     <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
> </listener>
> <!-- 定义了spring配置文件位置 -->
> <context-param>
>     <param-name>contextConfigLocation</param-name>
>     <param-value>classpath:applicationContext.xml</param-value>
> </context-param>
>```

#### Servlet集成工厂

> ```java
> public class UserServlet extends HttpServlet {
>    // 获取项目启动时随之启动的，存储于ServletContext中的工厂对象，
>    private ApplicationContext context = ContextLoader.getCurrentWebApplicationContext();
>    // 从工厂中获取Service组件
>    private UserService userService = context.getBean("userService",UserService.class);
>    @Override
>    protected void service(HttpServletRequest req, HttpServletResponse resp) throws 
>        ServletException, IOException {
>        List<User> users = userService.queryUsers();
>        req.setAttribute("users",users);
>        req.getRequestDispatcher("/users.jsp").forward(req,resp);
>    }
>}
>```

<br>
    
转载请注明：[Memory的博客](https://www.shendonghai.com) » [点击阅读原文](http://www.shendonghai.com/2019/11/Spring%E6%95%B4%E5%90%88MyBatis%E8%AF%A6%E8%A7%A3/) 