---
layout: post
title: "CentOS7安装Docker"
date: 2020-03-27
tag: Docker
---
### 一、前言

> * Docker的介绍、以及是什么，这里就不做介绍了，网上一搜一大堆。这里只说下怎么安装。
> * 这两天在公司有一点空闲时间，就复习一下Docker的安装和使用。之前也没有过自己的笔记，今天比较清闲就写下笔记。

### 二、安装

> * **Docker提供了两个版本（社区版和企业版）**
>   - 我们这里安装社区版，因为企业版收费（支持安全扫描，LDAP集成，内容签名，多云支持等）
> * **安装依赖**
>   - 安装必要的依赖包
>   - yum install -y yum-utils device-mapper-persistent-data lvm2
>   - yum-utis 提供yum-config-manager使用程序
>   - devicemapper 存储驱动程序需要device-mapper-persistent-data和lvm2
> * **设置安装源(使用aliyun镜像)**
>   - sudo yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
>   - sudo yum makecache fast
> * **安装Docker社区版(默认最新版本)**
>   - yum install -y docker-ce
> * **安装指定版本**
>   - 查看Docker版本
>       - yum list docker-ce --showduplicates | sort -r
>   - 安装指定版本
>       - yum install docker-ce-<VERSION STRING>
> * **启动服务**
>   - systemctl start docker && systemctl enable docker
> * **验证服务是否正常**
>   - docker run hello-world
>   - 这是Docker会主动下载这个镜像，并用这个镜像启动一个容器；当容器运行时，它打印hello world并退出
> * **附加**
>   - 由于国内下载Docker镜像速度慢，所以退出了加速器工具解决这个难题
>   - 推荐两个[【DaoCloud】](https://www.daocloud.io/)和[【阿里云】](https://promotion.aliyun.com/ntms/act/kubernetes.html)镜像加速
>   - 或者自己搭建一个私服，然后配置私服地址
>       - vim /etc/docker/daemon.json文件

### 三、卸载

> * 查询docker安装过的包
>   - yum list installed | grep docker
> * 删除安装包(删除多个)
>   - yum remove docker-* dcoker-* -y
> * 删除镜像/容器等
>   - rm -rf /var/lib/docker

<br>
    
转载请注明：[Memory的博客](https://www.shendonghai.com) » [点击阅读原文]() 