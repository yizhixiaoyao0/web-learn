# linux

* [centos安装mysql, 修改密码等](https://blog.csdn.net/kabolee/article/details/82528913?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.channel_param&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.channel_param)

* [linux 修改创建数据库](https://www.cnblogs.com/donqiang/articles/2057972.html)

[mysql](https://www.cnblogs.com/xiaochaohuashengmi/archive/2011/10/18/2216279.html)

1、显示数据库列表。
show databases;
2、显示库中的数据表：
use mysql； ／／打开库
show tables;
3、显示数据表的结构：
describe 表名;
4、建库：
create database 库名;

GBK: create database test2 DEFAULT CHARACTER SET gbk COLLATE gbk_chinese_ci;
UTF8: CREATE DATABASE `test2` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
5、建表：
use 库名；
create table 表名(字段设定列表)；
6、删库和删表:
drop database 库名;
drop table 表名；
7、将表中记录清空：
delete from 表名;

truncate table  表名;
8、显示表中的记录：
select * from 表名;

9、编码的修改
如果要改变整个mysql的编码格式： 
启动mysql的时候，mysqld_safe命令行加入 
--default-character-set=gbk 

如果要改变某个库的编码格式：在mysql提示符后输入命令 
alter database db_name default character set gbk;

10.重命名表

alter table t1 rename t2;

11.查看sql语句的效率

 explain < table_name >

例如：explain select * from t3 where id=3952602;

12.用文本方式将数据装入数据库表中(例如D:/mysql.txt)

mysql> LOAD DATA LOCAL INFILE "D:/mysql.txt" INTO TABLE MYTABLE;

13. 查看用户

```bash
use mysql;

select user,host,plugin from user;
```

12. 设置外部链接

  ```bash
  
   update user set host = '%' where user = 'root';

   flush privileges;
  ```

13. MySQL [ERROR] Table 'mysql.user' doesn't exist

 - more /etc/my.cnf |grep -v ^#

 - cd ./etc

 - vi my.cnf

 - 敲i

 - 修改为 datadir=/mnt/mysql/data

 - esc

 - :

 - wq

# 命令行

pm2:

    ```bash
    pm2 list

    pm2 start app_name --name <name>

    pm2 start npm --name <name> --watch -- run start
    ```

systemctl

    ```bash
    systemctl status mysqld

    systemctl restart mysqld

    systemctl stop mysqld
    ```

进程：
   
   ```bash
   # 查看进程
   ps aux|grep nginx
   ```

