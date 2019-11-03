---
layout: post
title: "Spring中MyBatis的事务控制"
date: 2019-11-03
tag: Spring
---
### DataSourceTransactionManager

> * 事务管理器，其中持有DataSource，可以控制事务功能。

>```xml
> <!-- 1. 引入一个事务管理器，其中依赖DataSource,借以获得连接，进而控制事务逻辑 -->
> <bean id="tx" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
> <property name="dataSource" ref="druid_pool"></property>
> </bean> 
>```

> * **注意**：DataSourceTransactionManager 和 SqlSessionFactoryBean 要注入同一个DataSource的Bean，否则事务控制失败!!!

### 进一步定制

> * 基于事务管理器，进一步定制，生成一个额外功能：Advice。
> * 此Advice可以切入任何需要事务的方法，通过事务管理器为方法控制事务。

> ```xml
> <tx:advice id="txManager" transaction-manager="tx">
> 	<tx:attributes>
> 		<!-- 如果 此事务管理可能切入此方法，则可以为此方法，单独定制事务属性 -->
> 		<!-- 以User结尾的方法
> 			<tx:method name="*User" rollback-for="Exception" isolation="DEFAULT"    
>               	propagation="REQUIRED" read-only="false"/> 
> 		-->
>         <!-- 以save开头的方法 -->
>         <tx:method name="save*" rollback-for="Exception"/>
>         <!-- 以query开头的方法 -->
>         <tx:method name="query*" propagation="SUPPORTS"/>
>         <!-- 剩余所有方法 -->
>         <tx:method name="*"/>
>     </tx:attributes>
> </tx:advice>
> ```

### 编织

> * 将事务管理的Advice 切入需要事务的业务方法中

> ```xml
> <aop:config>
>     <aop:pointcut expression="execution(* com.service.UserServiceImpl.*(..))" id="pc"/>
>     <!-- 组织切面 -->
>     <aop:advisor advice-ref="txManager" pointcut-ref="pc"/>
> </aop:config>
>```

### 事务属性补充

**`isolation = 隔离级别` 隔离级别由近到远，则并发性降低，安全性提高**
> 1. `default` **(默认值==采用数据库的默认的设置)**  
> 2. `read-uncommited`  **读未提交**   
> 3. `read-commited`      **读提交**   
> 4. `repeatable-read`  **可重复读**   
> 5. `serialized-read`  **序列化读**  

**细节：**
> 1. oracle只支持了  读提交(默认)  和   序列化读  
> 2. mysql都支持了  可重复读(默认)  

**事务并发时的安全问题：**
> 1. 脏读：一个事务中 读到了其他事务中 未提交的数据  
> 2. 不可重复读：一个事务中 多次读取相同的数据行，但是，结果不一致  
> 3. 幻影读：一个事务中 多次读取同一张表，但是，数据行数不一致；查询时没有某数据，但是操作时，却提示存在此数据。  

**propagation=传播性**
> 1. support = 如果已经有事务，则融入这个事务；如果没事务，以非事务环境运行  
> 2. required = 如果已经有事务，则融入这个事务；如果没事务，开启自己的事务 (默认值)  

**read-only:读写性**
> 1. true:只读事务，事务中只出现查询行为  
> 2. false：读写事务，事务中可以出现curd行为（默认值）  

**rollback-for:回滚时刻**
> 1. 如果事务中抛出 运行时异常(RuntimeException),则自动回滚  
> 2. 如果事务中抛出 已检查异常(非运行时异常 Exception)，不会自动回滚，而是默认提交事务  
>   - rollback-for="SQLException"  
>   - rollback-for="Exception"  

### 更新丢失

> **概述**
> * 多事务并发，且存在多个事务更新相同数据时。

> **数据丢失场景**
> * 表`t_user`
> * 表内字段：id     name     age
> * 表内数据：1       xxx        17

> * **事务1： age+1**

>```sql
> select age from t_user where id=1;
> # 结果:age=17;
> update t_user set age = 18  where id=1;
> commit;
> # age=18
>``` 

> * **事务2： age+2**

>```sql
> select age from t_user where id=1;
> # 结果:age=17;
> update t_user set age = 19  where id=1;
> commit;
> # age=19;
>``` 

### 解决更新丢失

> **悲观锁 : for update**
> * for update 追加到`查询语句`结尾
> * 会为数据库中的行上一个排它锁。当一个事务的操作未完成时候，其他事务可以读取但是不能写入或更新。

> **乐观锁: version**
> * 理解:
>   - 类似于 SVN、Git 这些版本管理系统，当修改了某个文件需要提交的时候，它会检查文件的当前版本是否与服务器上的一致，如果一致那就可以直接提交，如果不一致，那就必须先更新服务器上的最新代码然后再提交（也就是先将这个文件的版本更新成和服务器一样的版本）
>   - 就是在表中增加一个字段版本（version），更新数据时，先检查版本是否一致，一致则更新，不一致更新失败（使用上面的场景想想一下，这里就不沾代码了）

### Spring中使用注解控制事务

> * **`@Transactional` 用于为业务中切入事务**
> * 工厂配置中的` <tx:advice.... `和 `<aop:config... `可以省略 !!

> ```java
> //类中的每个方法都切入事务(有自己的事务控制的方法除外)
> @Transactional(isolation=Isolation.READ_COMMITTED,propagation=Propagation.REQUIRED,readOnly=false,rollbackFor=Exception.class)
> public class UserServiceImpl implements UserService {
> 	...
>     //该方法自己的事务控制，仅对此方法有效
> 	@Transactional(propagation=Propagation.SUPPORTS)
> 	public List<User> queryAll() {
> 		return userDao.queryAll();
> 	}
> 	public void save(User user){
> 		userDao.save(user);
> 	}
> }
> ```

> **spring配置文件**

>```xml
> <!-- 告知spring，@Transactional在定制事务时，基于txManager=DataSourceTransactionManager -->
> <tx:annotation-driven transaction-manager="txManager"/>
>```

<br>
    
转载请注明：[Memory的博客](https://www.shendonghai.com) » [点击阅读原文](http://www.shendonghai.com/2019/11/Spring%E4%B8%ADMyBatis%E7%9A%84%E4%BA%8B%E5%8A%A1%E6%8E%A7%E5%88%B6/) 