# e-app
 
> A Vue.js project 
 
 
## 项目预览
----
 
![](https://github.com/shenhua0222/elem-app/blob/master/static/img/1.jpg)
 
备注：该项目部署在国外的服务器上，打开可能会有点慢，若求稳定，请按如下命令在本地查看
 
``` bash
# install dependencies
npm install
 
# serve with hot reload at localhost:8080
npm run dev
 
```
 
##  项目目录结构
 
```
project
  ├─ node_modules   (npm模块)  
  ├─ src    (工程模块)
  │  ├─ components (组件)
  │  │  └─ goods
  │  │  └─ head
  │  │  └─ rating
  │  │  └─ shopcart
  │  │  └─ star
  │  ├─ less    (预编译样式)
  │  │  ├─ index
  │  └─ app (跟组件)
  │  └─ index (页面)
  │  └─ main (入口js)
  │  └─ router    (路由)
  │     ├─ index
  ├─ static    (非业务相关资源)
  │  ├─ css
  │  │  ├─ reset 
  ├─ config (配置)
  │  ├─ dev.env
  │  ├─ index
  │  ├─ prod.env
  │  ├─ test.env
  ├─ index.html   (入口文件)
  ...
```
 
 
## 自适应方案
---
 
个人认为淘宝的无限适配方案非常好，代码如下：
 
 
    var scale = 1 / devicePixelRatio    
     
    document.querySelector('meta[name="viewport"]').setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no')
 
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 10 + 'px'
 
这种方式计算元素的rem值复杂一点，但是有专门的拓展工具，所以使用起来也非常的方便。 
参考链接  [https://github.com/amfe/lib-flexible/blob/master/README.md](https://github.com/amfe/lib-flexible/blob/master/README.md)
另外，这种布局做出来的效果不兼容微信浏览器，所以最后改用了网易布局方案；
 
  js
 
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 750 * 100 + 'px'
       
html
 
    <meta name="viewport"   content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
 
这种布局的缺点是随着设备分辨率的不同，存在一像素边框线宽变化的问题