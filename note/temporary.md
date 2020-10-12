
1. 表单提交

  * 如果data是普通对象， 则content-type是application/json, axios默认发的是这个格式

  * 如果data是qs.stringtify(data) 转换后的数据： key=value&key=value， 则Content-type会被设置为application/x-www-form-urlencoded

  * 如果data是formdata对象， 则Content-type是multipart/form-data

2. 登录优化

  * 表单提交按钮在请求期间设置disabled

  





