---
layout: post
title: "Spring AOP"
date: 2019-11-03
tag: Spring
---
### 介绍

> * Spring-AOP 是对 AOP框架之一。其他比如还有AspectJ
> * Aspect-Oriented-Programming(面向切面编程)，一种编程思想。
> * 切面：Aspect，由`切入点`和`额外功能（增强）`组成。
> * 作用：提供了新的编程角度，不再只是考虑`类、对象`，而可以考虑`切面`。切面和目标形成 `代理`，解决项目业务中`额外功能冗余`的问题。

### AOP出现的场景

> * 业务层中存在问题：
>   - 两类逻辑=核心业务+额外功能，其中额外功能存在大量的`代码冗余`，使得项目维护存在极大隐患。

### 两种解决方案

> **静态代理**
>   - 代目标类打理了额外功能                   
>   - 目标类：UserServiceImpl ,即，被代理的类
>   - 代理类原则：要和原始的业务(target)实现同样的接口,保持功能一致。
>   - 代理类组成：额外功能(Advice) +目标(Target)
>   - 解决了目标类的冗余问题，但自身却依然有冗余！！

> **动态代理**

> * 通过动态字节码技术，在运行时动态生成代理( 反射 )。
> * 则既不用维护代理类，有可以有代码打理额外功能。
> * 动态代理的实现方案：
>   - jdk代理 （ jdk在反射包中提供的一套api ） 通过和目标实现相同的接口保证功能一致
>   - cglib代理 ( 第三方cglib库中的一套api )   通过继承目标保证功能一致
> * Spring的AOP章节，底层采纳了如上两种代理实现，并对动态代理提供了，简单的，可操作性强的决绝方案。
> * 当项目中需要使用代理解决问题时，可以采用AOP章节的内容加以解决。
> * org.springframework.aop.framework.DefaultAopProxyFactory#createAopProxy()中spring做了jdk代理和cglib代理的选择。

### AOP编码流程

> **导入依赖**

> ```xml
> <groupId>org.springframework</groupId>
>     <artifactId>spring-context-support</artifactId>
>     <version>4.3.6.RELEASE</version>
> </dependency>
> <dependency>
>     <groupId>org.springframework</groupId>
>     <artifactId>spring-aspects</artifactId>
>     <version>4.3.6.RELEASE</version>
> </dependency>
> ```

> **准备目标(Target)类**

> ```java
> public class UserServiceImpl implements UserService{
>     private UserDAO userDAO;
>     // set/get...
>     @Override
>     public void updateUser(User user) {
>         System.out.println("update in service===============");
>         userDAO.updateUser(user);
>     }
> @Override
>     public void insertUser(User user) {
>        System.out.println("insert in service===============");
>         userDAO.insertUser(user);
>     }
>}
>```

> **准备Advice**

>```java
> public class MyBeforeAdvice implements MethodBeforeAdvice{
>     /**
>      * @param method 当前执行的方法
>      * @param args   当前执行的方法中的参数
>      * @param target 目标对象
>      * @throws Throwable
>      */
>     @Override
>     public void before(Method method, Object[] args, Object target) throws Throwable {
>         System.out.println("before~~~");
>     }
> }
> ```

> **编织 Weave**

> * 所谓编织，即，将Target  和 Advice 组装 形成代理。
> * 当然组装过程由spring管理，开发者只需要做出配置，告知spring需要组装谁即可

>```xml
> <!-- 声明 Target + Advice -->
> <!-- 声明 Target -->
> <bean id="userService" class="com.xxx.service.UserServiceImpl">
>     <!-- 为userDAO属性赋值，值为id=“userDAO”的组件 -->
>     <property name="userDAO" ref="userDAO"/>
> </bean>
> <!-- Advice -->
> <bean id="myBefore" class="com.xxx.advice.MyBeforeAdvice"/>
> 
> <!-- 编织 配置 -->
> <aop:config>
>     <!-- ref="引入MyAdvice" -->
>     <aop:aspect ref="myAdvice">
>         <!-- 切入点=pointcut
>  			execution()表达式：描述切入位置
>             组成：修饰符   返回值      包      类  方法名  参数表
>                  public Integer com.xx.xxx.AA.xxxXXX(int,String)
>             * com.service.UserServiceImpl.*(..)：com.service包下UserServiceImpl类中，返回值修饰符任意，方法名任意，
> 												 参数表任意
>             * com.service.UserServiceImpl.queryUser(..)：同上，只是方法名不是任意，而是 ”queryUser“
> 		-->
>         <aop:pointcut id="pc" expression="execution(* com.service.UserServiceImpl.queryUser(..))"/>
>         <aop:advisor advice-ref="myBefore" pointcut-ref="pc"/>
>     </aop:aspect>
> </aop:config>
> ```

> **测试**

>```java
> UserService userService = (UserService)context.getBean("userService");
> userService.insertUser(new User(...));
>```

<br>
    
转载请注明：[Memory的博客](https://www.shendonghai.com) » [点击阅读原文]() 