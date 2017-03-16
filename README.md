共享服务Portal前端页面源代码项目

## 发布打包

```
webpack --config webpack.build.config.js -p
npm run publish
```

## 配置NC URL

修改如下文件

```
routes/iwebap.js
```

## 开始调试

```
npm start
DEBUG=* npm start
```

先登录NC：http://127.0.0.1:3001/portal

输入用户名d1密码123456a

登录成功之后访问：http://127.0.0.1:3001/


test
