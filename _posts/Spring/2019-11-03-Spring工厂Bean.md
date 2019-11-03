---
layout: post
title: "Spring工厂Bean"
date: 2019-11-03
tag: Spring
---
### 工厂Bean(重点)

> * `FactoryBean`:**生产某一类对象**
> * 在工厂中有些bean，无法直接通过 简单的`<bean></bean>`生产。
> * 比如：`Connection，SqlSessionFactory`
> * FactoryBean：spring工厂中一种特殊的bean，可以生产对象。Spring工厂中的小作坊。

> **Spring支持如下方式：**

> * FactoryBean
>   - 实际开发中不会使用这种方式，但是必须知道

> ```java
> // 1.实现FactoryBean
> public class MySqlSessionFactoryBean implements FactoryBean<SqlSessionFactory>{
>     public SqlSessionFactory getObject(){
>         //完成SqlSessionFactory的生产，并返回生产的对象
>     }
>     ...
> }
>```

> ```xml
> <!-- 通过该Id获取bean时，返回的不是工厂bean本身的对象，而是其生产的对象 -->
> <bean id="sqlSessionFactory" class="com.xxx.factory.MySqlSessionFactoroyBean"></bean>
> ```

### 静态工厂方法

> * 它的底层就是通过上面的建立的

>```java
> // 2.静态工厂方法
> public class MyFactoryBean {
>    public static User createUser(){
>       return new User();
>   }
> }
> //3.mybatis静态工厂
> public class MyFactory {
>     public static SqlSessionFactory buildSqlSessionFactory() throws Exception{
>         Reader reader = Resources.getResourceAsReader("mybatis-config.xml");
>         return new SqlSessionFactoryBuilder().build(reader);
>     }
> }
> ```

>```xml
> <bean id="user" factory-method="createUser" class="com.xxx.factory.MyFactoryBean" scope="xx"></bean>
>```

### 工厂方法

> ```java
> // 3.工厂方法
>public class MyFactoryBean {
>    public User createUser(){
>        return new User();
>    }
>}
> ```

>```xml
> <bean id="userFactory" class="com.xxx.factory.bean.MyFactoryBean"></bean>
> <bean id="user" factory-bean="userFactory" factory-method="createUser" scope="xx"></bean>
>```

> **定义了如上任何一种后，测试：**

>```java
> //获取bean，此时获取的并不是FactoryBean,而是其生产的对象。
> SqlSessionFactory sqlSessionFactory = (sqlSessionFactory)context.getBean("sqlSessionFactory");
> //获取bean，此时获取的并不是FactoryBean,而是其生产的对象。
> User user = (User)context.getBean("user");
>```

### 工厂模式

> **工厂模式是编程中经常用到的一种模式。**

> **它的主要优点有：**
> * 可以使代码结构清晰，有效地封装变化。在编程中，产品类的实例化有时候是比较复杂和多变的，通过工厂模式，将产品的实例化封装起来，使得调用者根本无需关心产品的实例化过程，只需依赖工厂即可得到自己想要的产品。对调用者屏蔽具体的产品类。如果使用工厂模式，调用者只关心产品的接口就可以了，至于具体的实现，调用者根本无需关心。即使变更了具体的实现，对调用者来说没有任何影响。
> * 降低耦合度。产品类的实例化通常来说是很复杂的，它需要依赖很多的类，而这些类对于调用者来说根本无需知道，如果使用了工厂方法，我们需要做的仅仅是实例化好产品类，然后交给调用者使用。对调用者来说，产品所依赖的类都是透明的。

<br>
    
转载请注明：[Memory的博客](https://www.shendonghai.com) » [点击阅读原文](http://www.shendonghai.com/2019/11/Spring%E5%B7%A5%E5%8E%82Bean/) 