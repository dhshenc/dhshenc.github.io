---
layout: post
title: "Spring AOP Advice"
date: 2019-11-03
tag: Spring
---
### Advice

> **前置额外功能**

> ```java
> public class MyBeforeAdvice implements MethodBeforeAdvice{
>
>    /**
>     * @param method 当前执行的方法
>     * @param args   当前执行的方法中的参数
>     * @param target 目标对象
>     * @throws Throwable
>     */
>    @Override
>    public void before(Method method, Object[] args, Object target) throws Throwable {
>        System.out.println("before~~~");
>    }
>}
>```

> **后置额外功能**

>```java
> public class MyAfterAdvice implements AfterReturningAdvice{
>
>    /**
>     * @param returnValue  目标业务方法返回值
>     * @param method       当前执行的业务方法对象
>     * @param args         方法的参数
>     * @param target       目标对象
>     * @throws Throwable
>     */
>    @Override
>    public void afterReturning(Object returnValue, Method method, Object[] args, Object target) throws Throwable {
>        System.out.println("after~~~");
>    }
>}
>```

> **环绕额外功能**

> ```java
> public class MyMethodInterceptor implements MethodInterceptor{
>
>    @Override
>    public Object invoke(MethodInvocation invocation) throws Throwable {
>        System.out.println("begin~~");
>        Object ret = invocation.proceed();//执行目标业务方法
>        System.out.println("end~~");
>        return ret;//返回目标业务方法返回值
>    }
>}
>```

> **异常额外功能(了解)**

>```java
> public class MyThrows implements ThrowsAdvice{
>    //目标业务方法中抛出异常时，执行此方法。ex=抛出的异常对象
>    public void afterThrowing(Exception ex){
>        System.out.println(ex.getMessage()+"~~~");
>    }
>}
>```

> **最终额外功能(了解)**

> * 在核心之后执行( 即使核心中出现了异常，依然执行额外 )

> **编织**

>```xml
> <!-- 声明 target+advice -->
><bean id="userService" class="xxxxx"></bean>
><bean id="myXXAdvice" class="xxxxx"></bean>
><aop:config>
>    <aop:pointcut id="pc" expression="execution(* com..UserService*.*(..))"/>
>    <aop:advisor advice-ref="advice的BeanId" pointcut-ref="pc"/>
></aop:config>
>```

### 切入点表达式

> **execution**
> * com.service.UserServiceImpl.queryUser(..)
>   - 修饰符：任意
>   - 返回值：任意
>   - 包:com.service
>   - 类：UserServiceImpl
>   - 方法：queryUser
>   - 参数表：任意
> * com.service.UserServiceImpl.*(..)
>   - 修饰符：任意
>   - 返回值：任意
>   - 包:com.service
>   - 类：UserServiceImpl
>   - 方法：所有，任意
>   - 参数表：任意
> * com..UserServiceImpl.*(..)
>   - 修饰符：任意
>   - 返回值：任意
>   - 包:com包，及其子包
>   - 类：UserServiceImpl
>   - 方法：所有，任意
>   - 参数表：任意
> * com.service.*.*(..)
>   - 修饰符：任意
>   - 返回值：任意
>   - 包:com.service
>   - 类：所有，任意
>   - 方法：所有，任意
>   - 参数表：任意
> * *(..)    不建议
>   - 修饰符：任意
>   - 返回值：任意
>   - 包:任意
>   - 类：所有，任意
>   - 方法：所有，任意
>   - 参数表：任意
> * com.service.UserServiceImpl.query*(..)  【技巧:批量切入】
>   - 修饰符：任意
>   - 返回值：任意
>   - 包:com.service
>   - 类：UserServiceImpl
>   - 方法：所有，任意
>   - 参数表：任意
> * 注意：尽量精确，避免不必要的切入

> **within**
> * 描述`包`和`类`，`类`中所有方法都切入
> * within(com.service.UserServiceImpl) 类中的所有方法
> * within(com..UserServiceImpl) com包和com子包下的类中的所有方法

> ```xml
> <aop:pointcut id="pc" expression="within(com..UserServiceImpl)"/>
> ```

> **args**
> * 描述`参数表`，符合的方法都切入
> * args(int,String,com.entity.User) 参数表如此的方法


>```xml
> <aop:pointcut id="pc" expression="args(int,String,com.entity.User)"/>
> ```

> **联用**
> * 不同种类的表达式之间，可以使用逻辑运算：
>   - `and  or  not`

>```xml
> <aop:pointcut id="pc" expression="execution(* com.xxx.service.UserServiceImpl.*(..)) and args(com.User)"/>
> <aop:pointcut id="pc" expression="within(com.service.UserServiceImpl) or args(com.User)"/>
> <aop:pointcut id="pc" expression="within(com.service.UserServiceImpl) and not args(com.User)"/>
>```

### 使用注解增强

> **@AspectJ**

>```java
>@Aspect // AspectJ的注解
>@Component
>public class MyAdvice {
>    private final String pc = "execution(* com.xxx.service.UserServiceImpl.*(..))";
>    @Before(pc) // AspectJ的注解
>    public void beforeXxx(JoinPoint a) {
>        System.out.println("target:"+a.getTarget());
>        System.out.println("args:"+a.getArgs());
>        System.out.println("method's name:"+a.getSignature().getName());
>        System.out.println("before~~~~");
>    }
>
>    @AfterReturning(value=pc,returning="ret9") // AspectJ的注解
>    public void myAfterReturning(JoinPoint a,Object ret9){
>        System.out.println("after~~~~:"+ret9);
>    }
>    @Around(pc) // AspectJ的注解
>    public Object myInterceptor(ProceedingJoinPoint p) throws Throwable {
>        System.out.println("interceptor1~~~~");
>        Object ret = p.proceed();
>        System.out.println("interceptor2~~~~");
>        return ret;
>    }
>    @AfterThrowing(value=pc,throwing="ex") // AspectJ的注解
>    public void myThrows(JoinPoint jp,Exception ex){
>        System.out.println("throws");
>        System.out.println("===="+ex.getMessage());
>    }
>}
>```

> **添加配置**

>```xml
> <!-- 添加如下配置 -->
> <aop:aspectj-autoproxy></aop:aspectj-autoproxy>
> <context:component-scan base-package="com.xxx"/>
> ```

<br>
    
转载请注明：[Memory的博客](https://www.shendonghai.com) » [点击阅读原文](http://www.shendonghai.com/2019/11/Spring-AOP-Advice/) 