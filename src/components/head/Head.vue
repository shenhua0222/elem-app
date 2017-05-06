<template>
  <div class="head">
    <div class="head-up">
      <div class="logo">
        <img :src="seller.avatar">
      </div>
      <div class="seller-info">
        <div class="title">
          <img class="brand" src="./brand@3x.png" >
          <span>{{seller.name}}</span>
        </div>
        <p class="diliver">{{ seller.description}}/{{seller.deliveryTime}}分钟送达</p>
        <div v-if='seller.supports' class="discount">
          <img src="./decrease_1@3x.png">
          <span>{{ seller.supports[0].description }}</span>
        </div>
      </div>
      <div class="support-btn" @click='maskShow'>
        5个活动 
      </div>
    </div>
    <div class="head-dw">
      <div class="bulletin">
        <img src="./bulletin@2x.png">
        <div>
          <span>{{seller.bulletin}}</span>
        </div>
      </div>
      <span class="icon-keyboard_arrow_right btn-arrow" @click='maskShow'></span>
    </div>
    <transition name='fade'>
      <div class="mask" v-if='show'>
        <div class="mask-wraper">
          <div class="mask-main">
            <h1 class="shop-name">{{seller.name}}</h1>
            <Star :score='seller.score'></Star>
            <h2><span>优惠信息</span></h2>
            <ul class="supports">
              <li v-for='(val, index) in seller.supports'>
                <span class="icon" :class='"icon-"+index'>{{classMap[index]}}</span>
                <span class="support-txt">{{val.description}}</span>
              </li>
            </ul>
            <h2><span>商家公告</span></h2>
            <p class="bul-txt">{{seller.bulletin}}</p>

          </div>
        </div>
        <div class="mask-close">
          <span @click='maskClose' class="icon-close"></span>
        </div>
      </div>
    </transition>
    
  </div>
</template>

<script>
import Star from '../star/Star'
export default {
  name: 'Head',
  props: ['seller'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      show: false,
      classMap: ['减', '折', '折', '特', '特']
    }
  },
  components: {
    Star
  },
  computed: {
    dpi () {
      return window.devicePixelRatio
    }
  },
  methods: {
    maskShow () {
      this.show = true
    },
    maskClose () {
      this.show = false
    }
  }
}
</script>

<style lang='less'>
@import '../../less/index';
.head-up {
  padding:0.48rem 0.24rem 0 0.48rem;
  background:rgba(141, 117, 102, 0.5);
  position:relative;
}
.logo {
  display:inline-block;
}
.logo img {
  display:inline-block;
  width:1.28rem;
  height:1.28rem;
  border-radius:0.04rem;
  margin:0 0.32rem 0.36rem 0;
}

.seller-info {
  display: inline-block;
  color:#fff;
  vertical-align:top;
  font-size:0;
  margin-left:-0.25rem;
}

.brand {
  display:inline-block;
  height:0.36rem;
  width:0.6rem;
  overflow:hidden;
  margin:0.04rem 0.12rem 0.16rem 0;
}

.title span {
  vertical-align:top;
  font-size:0.32rem;
  color:#fff;
  font-weight:bold;
  line-height:0.36rem;
}
.diliver {
  font-size:0.24rem;
  font-weight:200;
  margin-bottom:0.2rem;
}

.discount img {
  display:inline-block;
  height:0.24rem;
  width:0.24rem;
  margin:0 0.08rem 0.04rem 0;
}

.discount span {
  font-size:0.2rem;
  font-weight:200;
  vertical-align:top;
}
.support-btn {
  font-size:0.2rem;
  font-weight:200;
  padding:0.14rem 0.16rem;
  background:rgba(0,0,0,0.2);
  border-radius:0.14rem;
  color:#fff;
  position:absolute;
  bottom:0.3rem;
  right:0.24rem;
}
.head-dw {
  color:#fff;
  font-size:0.2rem;
  font-weight:200;
  padding:0 0.24rem;
  background:rgba(141, 117, 102, 0.4);
  position:relative;
}

.bulletin img {
  width:0.44rem;
  height:0.24rem;
  margin-right:0.08rem;
  vertical-align:top;
  margin-top:0.18rem;
}
.bulletin div {
  overflow:hidden;
  display:inline-block;
  width:85%;
}
.bulletin span {
  line-height:0.56rem;
  display:block;
  overflow:hidden;
  white-space:nowrap;
  text-overflow:ellipsis;
}
.btn-arrow {
  position:absolute;
  right:0.24rem;
  top:0.16rem;
  font-size:0.3rem;
}

/*遮罩层*/
.mask {
  position:fixed;
  z-index:100;
  top:0;
  left:0; 
  height:100%;
  width:100%;
  background:#262626;
}
.mask .star {
  margin-top:-0.5rem;
  text-align:center;
}
.mask-wraper {
  min-height:100%;
  overflow:auto;
}
.mask-main {
  padding-top:1.28rem;
  padding-bottom:1.28rem;
}

.mask-close {
  width:100%;
  height:0.64rem;
  font-size:0.64rem;
  margin-top:-1.28rem;
  text-align: center;
  color:white;
}

.shop-name {
  font-size:0.32rem;
  font-weight:700;
  color:rgb(255, 255, 255);
  text-align:center;
  margin-bottom:0.32rem;
}

.mask-main > h2 {
  font-size:0.28rem;
  color:white;
  text-align:center;
  margin:0.3rem 0;
  font-weight:700;
}

.mask-main > h2 span {
  display:inline-block;
  padding:0.1rem 0.2rem;
  border:1px solid #373737;
  border-radius:0.3rem;
}
.supports {
  margin-left:0.96rem;
}
.supports li {
  color:#fff;
  font-size:0.24rem;
  line-height:0.24rem;
  margin-bottom:0.24rem;
  padding:0.08rem 0.44rem;
}

.icon {
  display:inline-block;
  padding:0.04rem;
  background:#fff;
  font-weight:700;
  font-family:'黑体';
}

.icon-0{
  color:#F67272;
}

.icon-1, .icon-2 {
  color:#33A3D3;
}

.icon-3, .icon-4 {
  color:#33C363;
}

.bul-txt {
  padding:0 0.72rem;
  font-size:0.24rem;
  line-height:0.48rem;
  color:#fff;
}







</style>
