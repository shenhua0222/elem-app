window.onload = function () {
console.log(devicePixelRatio)
// var scale = 1 / devicePixelRatio
// document.querySelector('meta[name="viewport"]').setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no')
// document.documentElement.style.fontSize = document.documentElement.clientWidth / 10 + 'px'
// 网易适配如下
document.documentElement.style.fontSize = document.documentElement.clientWidth / 750 * 100 + 'px'
// 为tab添加点击样式
var oAs = document.querySelectorAll('.tab a')
document.querySelector('.tab').onclick = function (ev) {
      if (ev.target.tagName.toUpperCase() === 'A') {
        oAs.forEach(function (n) {
          n.setAttribute('class', '')
        })
        ev.target.setAttribute('class', 'active')
      }
}
// 中间元素高度设置;
var oHead = document.querySelector('.head')
var oDiv = document.querySelector('.route-container')
var oTab = document.querySelector('.tab')
var oFoot = document.querySelector('footer')
var h1 = oHead.offsetHeight
var h2 = oTab.offsetHeight
var h3 = oFoot.offsetHeight
var h4 = document.documentElement.clientHeight
// 减10是微调
oDiv.style.height = h4 - h1 - h2 - h3 - 10 + 'px'
// 检测设备像素比以及视口大小
console.group('test')
console.log(document.body.clientHeight)
console.log(h1)
console.log(h2)
// console.log(oHead.style)
console.log(oDiv.style.height)
console.groupEnd('test')
}