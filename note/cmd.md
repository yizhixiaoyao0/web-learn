1. `npm whoami`  查看npm上的用户名

2. `npm config get registry` 查看镜像源

3. git

```bash
git status

git init

git add .

git commit -m 'init'

git log


git remote add origin https://

git remote -v

git push -u origin master

git remote rename orign origin

```
4.  代理

  ```bash
  git config --global https.proxy http://127.0.0.1:10809

  git config --global http.proxy http://127.0.0.1:10809

  git config --global --unset http.proxy
  
  git config --global --unset https.proxy
  ```

5. 杀进程 

  ```bash

  taskkill /f /im node.exe

  ```

6. 查看端口 

  ```bash
  netstat -aon|findstr "3000"

  ```