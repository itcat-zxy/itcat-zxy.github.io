---
title: Kafka 环境搭建
tags:
  - java
  - kafka
category: Java
keywords: 'Java, kafka'
description: 对消息队列的环境搭建
cover: 'https://cdn.staticaly.com/gh/itcat-zxy/Image@main/blog/gpwmed.1z7iyv2ai5uo.jpg'
abbrlink: kafka
date: 2023-04-20 20:11:12
top_img: 
---


### 搭建Kafka集群

1.  将Kafka的安装包上传到虚拟机，并解压

```shell
cd /export/software/
tar -xvzf kafka_2.12-2.4.1.tgz -C ../server/
cd /export/server/kafka_2.12-2.4.1/
```

2.  修改 server.properties

```shell
cd /export/server/kafka_2.12-2.4.1/config
vim server.properties
# 指定broker的id
broker.id=0
# 指定Kafka数据的位置
log.dirs=/export/server/kafka_2.12-2.4.1/data
# 配置zk的三个节点
zookeeper.connect=node1.itcast.cn:2181,node2.itcast.cn:2181,node3.itcast.cn:2181
```



3.  将安装好的kafka复制到另外两台服务器

```shell
cd /export/server
scp -r kafka_2.12-2.4.1/ node2.itcast.cn:$PWD
scp -r kafka_2.12-2.4.1/ node3.itcast.cn:$PWD

修改另外两个节点的broker.id分别为1和2
---------node2.itcast.cn--------------
cd /export/server/kafka_2.12-2.4.1/config
vim erver.properties
broker.id=1

---------node3.itcast.cn--------------
cd /export/server/kafka_2.12-2.4.1/config
vim server.properties
broker.id=2
```


4.  配置KAFKA_HOME环境变量

```shell
vim /etc/profile
export KAFKA_HOME=/export/server/kafka_2.12-2.4.1
export PATH=:$PATH:${KAFKA_HOME}

分发到各个节点
scp /etc/profile node2.itcast.cn:$PWD
scp /etc/profile node3.itcast.cn:$PWD
每个节点加载环境变量
source /etc/profile
```

5.  启动服务器

```shell
# 启动ZooKeeper
nohup bin/zookeeper-server-start.sh config/zookeeper.properties &
# 启动Kafka
cd /export/server/kafka_2.12-2.4.1
nohup bin/kafka-server-start.sh config/server.properties &
# 测试Kafka集群是否启动成功
bin/kafka-topics.sh --bootstrap-server node1.itcast.cn:9092 --list
```


### 目录结构分析

| 目录名称  | 说明                                                         |
| --------- | :----------------------------------------------------------- |
| bin       | Kafka的所有执行脚本都在这里。例如：启动Kafka服务器、创建Topic、生产者、消费者程序等等 |
| config    | Kafka的所有配置文件                                          |
| libs      | 运行Kafka所需要的所有JAR包                                   |
| logs      | Kafka的所有日志文件，如果Kafka出现一些问题，需要到该目录中去查看异常信息 |
| site-docs | Kafka的网站帮助文件                                          |

### Kafka一键启动/关闭脚本

为了方便将来进行一键启动、关闭Kafka，我们可以编写一个shell脚本来操作。将来只要执行一次该脚本就可以快速启动/关闭Kafka。

1.  在节点1中创建 /export/onekey 目录

> cd /export/onekey

2.  准备slave配置文件，用于保存要启动哪几个节点上的kafka

```shell
node1.itcast.cn
node2.itcast.cn
node3.itcast.cn
```


3.  编写start-kafka.sh脚本

```shell
vim start-kafka.sh
cat /export/onekey/slave | while read line
do
{
 echo $line
 ssh $line "source /etc/profile;export JMX_PORT=9988;nohup ${KAFKA_HOME}/bin/kafka-server-start.sh ${KAFKA_HOME}/config/server.properties >/dev/nul* 2>&1 & "
}&
wait
done
```

4.  编写stop-kafka.sh脚本

```shell
vim stop-kafka.sh
cat /export/onekey/slave | while read line
do
{
 echo $line
 ssh $line "source /etc/profile;jps |grep Kafka |cut -d' ' -f1 |xargs kill -s 9"
}&
wait
done
```

5.  给start-kafka.sh、stop-kafka.sh配置执行权限

```shell
chmod u+x start-kafka.sh
chmod u+x stop-kafka.sh
```

6.  执行一键启动、一键关闭

```shell
./start-kafka.sh
./stop-kafka.sh
```



## 基础操作

![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/kafka/image34.jpg)

### 创建topic

创建一个topic（主题）。Kafka中所有的消息都是保存在主题中，要生产消息到Kafka，首先必须要有一个确定的主题。

```shell
# 创建名为test的主题
bin/kafka-topics.sh --create --bootstrap-server node1.itcast.cn:9092 --topic test
# 查看目前Kafka中的主题
bin/kafka-topics.sh --list --bootstrap-server node1.itcast.cn:9092
```



### 生产消息到Kafka

使用Kafka内置的测试程序，生产一些消息到Kafka的test主题中。

```shell
bin/kafka-console-producer.sh --broker-list node1.itcast.cn:9092 --topic test
```

### 从Kafka消费消息

使用下面的命令来消费 test 主题中的消息。

```shell
bin/kafka-console-consumer.sh --bootstrap-server node1.itcast.cn:9092 --topic test --from-beginning
```

### 使用Kafka Tools操作Kafka

#### 连接Kafka集群

> 安装Kafka Tools后启动Kafka

![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/kafka/image35.jpg)  

![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/kafka/image36.jpg)  

![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/kafka/image37.jpg)   


#### 创建topic

![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/kafka/image38.jpg)

![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/kafka/image39.jpg)

![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/kafka/image40.jpg)




### 安装Kafka-Eagle

#### 开启Kafka JMX 接口
JMX(Java Management Extensions)是一个为应用程序植入管理功能的框架。JMX是一套标准的代理和服务，实际上，用户可以在任何Java应用程序中使用这些代理和服务实现管理。很多的一些软件都提供了JMX接口，来实现一些管理、监控功能。

在启动Kafka的脚本前，添加：

```shell
cd ${KAFKA_HOME}
export JMX_PORT=9988
nohup bin/kafka-server-start.sh config/server.properties &
```

#### 安装Kafka-Eagle

1. 安装JDK，并配置好JAVA_HOME。  
2. 将kafka_eagle上传，并解压到 /export/server 目录中。

```shell
cd cd /export/software/
tar -xvzf kafka-eagle-bin-1.4.6.tar.gz -C ../server/
cd /export/server/kafka-eagle-bin-1.4.6/ 
tar -xvzf kafka-eagle-web-1.4.6-bin.tar.gz
cd /export/server/kafka-eagle-bin-1.4.6/kafka-eagle-web-1.4.6
```

3. 配置 kafka_eagle 环境变量。

>  vim  /etc/profile 

```shell
export KE_HOME=/export/server/kafka-eagle-bin-1.4.6/kafka-eagle-web-1.4.6
export PATH=$PATH:$KE_HOME/bin
```

> source  /etc/profile



4. 配置 kafka_eagle。使用vi打开conf目录下的system-config.properties

> vim conf/system-config.properties

```shell
# 修改第4行，配置kafka集群别名
kafka.eagle.zk.cluster.alias=cluster1
# 修改第5行，配置ZK集群地址
cluster1.zk.list=node1.itcast.cn:2181,node2.itcast.cn:2181,node3.itcast.cn:2181
# 注释第6行
#cluster2.zk.list=xdn10:2181,xdn11:2181,xdn12:2181

# 修改第32行，打开图标统计
kafka.eagle.metrics.charts=true
kafka.eagle.metrics.retain=30

# 注释第69行，取消sqlite数据库连接配置
#kafka.eagle.driver=org.sqlite.JDBC
#kafka.eagle.url=jdbc:sqlite:/hadoop/kafka-eagle/db/ke.db
#kafka.eagle.username=root
#kafka.eagle.password=www.kafka-eagle.org

# 修改第77行，开启mys
kafka.eagle.driver=com.mysql.jdbc.Driver
kafka.eagle.url=jdbc:mysql://node1.itcast.cn:3306/ke?useUnicode=true&characterEncoding=UTF-8&zeroDateTimeBehavior=convertToNull
kafka.eagle.username=root
kafka.eagle.password=123456
```

5. 配置JAVA_HOME  

```shell
cd /export/server/kafka-eagle-bin-1.4.6/kafka-eagle-web-1.4.6/bin
vim ke.sh
# 在第24行添加JAVA_HOME环境配置
export JAVA_HOME=/export/server/jdk1.8.0_241
```

6. 修改Kafka eagle可执行权限

```shell
cd /export/server/kafka-eagle-bin-1.4.6/kafka-eagle-web-1.4.6/bin
chmod +x ke.sh
```

7. 启动 kafka_eagle。

```shell
./ke.sh start
```

8. 访问Kafka eagle，默认用户为admin，密码为：123456  

> http://node1.itcast.cn:8048/ke

![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/kafka/image18.jpg)

![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/kafka/image19.jpg)






