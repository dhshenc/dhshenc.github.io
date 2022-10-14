---
layout: post
title: "Docker-Compose安装"
date: 2021-03-24
tag: 过去
---
### 一、概述

> * 上篇文章中我们使用 Docker 的时候，定义 Dockerfile 文件，然后使用 docker build、docker run 等命令操作容器。然而微服务架构的应用系统一般包含若干个微服务，每个微服务一般都会部署多个实例，如果每个微服务都要手动启停，那么效率之低，维护量之大可想而知
> * 使用 Docker Compose 可以轻松、高效的管理容器，它是一个用于定义和运行多容器 Docker 的应用程序工具
> * Docker Compose 可以通过 Python 的包管理⼯具 pip 进⾏安装，也可以直接下载编译好的⼆进制⽂件使⽤，甚⾄能够直接在 Docker 容器中运⾏。
> * 前两种⽅式是传统⽅式，适合本地环境下安装使⽤；最后⼀种⽅式则不破坏系统环境，更适合云计算场景。
> * 比如：使用软件Docker for Mac 、 Docker for Windows ⾃带 docker-compose ⼆进制⽂件，安装 Docker 之后可以直接使⽤。

### 二、安装 Dcoker-Compose

> **二进制包**
>
> * 可以从[【GitHub】](https://github.com/docker/compose/releases/)直接下载编译好的二进制文件
> * 也可以Linux系统上直接下载对应的⼆进制包
>
> ```shell
> # 下载二进制包
> sudo curl -L https://github.com/docker/compose/releases/download/1.24.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
> # 设置权限
> sudo chmod +x /usr/local/bin/docker-compose
> ```
>
> **PIP安装**
> 
> * 注： x86_64 架构的 Linux 建议按照上边的⽅法下载⼆进制包进⾏安装，如果您计算机的架构是 ARM (例如，树莓派)，再使⽤ pip 安装。
> * 这种⽅式是将 Compose 当作⼀个 Python 应⽤来从 pip 源中安装。
> * 执⾏安装命令：
>
> ```shell
> sudo pip install -U docker-compose
> # 看到以下内容，说明安装成功。
> Collecting docker-compose
> Downloading docker-compose-1.17.1.tar.gz (149kB): 149kB downloaded
> ...
> Successfully installed docker-compose cached-property requests texttable
> websocket-client docker-py dockerpty six enum34 backports.ssl-matchhostname ipaddress
> ```
>
> * bash 补全命令
> 
>```shell
>  curl -L https://raw.githubusercontent.com/docker/compose/1.8.0/contrib/completion/bash/docker-compose > /etc/bash_completion.d/docker-compose
>```
>
> **容器中执行**
>
> * Compose 既然是⼀个 Python 应⽤，⾃然也可以直接⽤容器来执⾏它。
> * 实际上，查看下载的 run.sh 脚本内容，可以看到，它其实是下载了 docker/compose 镜像并运⾏。
> 
>```shell
> curl -L https://github.com/docker/compose/releases/download/1.8.0/run.sh > /usr/local/bin/docker-compose
> chmod +x /usr/local/bin/docker-compose
>```
>

### 三、命令

> **常用命令**
>
>```shell
> # 前台运行
> docker-compose up
> # 后台运行
> docker-compose up -d
> # 启动
> docker-compose start
> # 停止
> docker-compose stop
> # 停止并移除容器
> docker-compose down
> # 查看版本
> docker-compose --version
>```

### 四、卸载

> * 如果是⼆进制包⽅式安装的，删除⼆进制⽂件即可。
>
>```shell
> sudo rm /usr/local/bin/docker-compose
>```
>
> * 如果是通过 pip 安装的，则执⾏如下命令即可删除。
>
>```shell
> sudo pip uninstall docker-compose
>```
>

<br>
    
转载请注明：[Memory的博客](https://www.shendonghai.com) » [点击阅读原文](http://www.shendonghai.com/2021/03/Docker-Compose%e5%ae%89%e8%a3%85/) 