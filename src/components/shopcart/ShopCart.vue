<template>
	<div>
		<div class="shopCart">
			<div @click='listShow' class="cart-lt">
				<div class="circle" :class='{active: isActive}'>
					<span class="icon-shopping_cart cart"></span>
					<p v-if='totalCount>0' class="totalCount">{{totalCount}}</p>
				</div>
				<div class="cart-lt-main">
					<span :class='{active: isActive}'>￥{{totalPrice}}</span>
					<span>|</span>
					<span>配送费￥{{seller.deliveryPrice}}</span>
				</div>
			</div>
			<div @click='goPay' class="cart-rt" :class='{active: dif}'>
				<span>{{txt}}</span>
			</div>
		</div>
		<!-- 小球动画 -->
		<div class="ball-container">
			<div v-for='ball in balls'>
				<transition name='drop' @before-enter="beforeDrop" @enter='dropping' @after-enter='afterDrop'>
					<div class="ball" v-show='ball.show'>
						<div class="inner inner-hook"></div>
					</div>
				</transition>
			</div>
		</div>
		<!-- 购物车滑动动画 -->
		<transition name='slide'>
			<div v-if='show' class="cart-list">
				<div v-if='selectFoods.length>0' class="list-head">
					<span class="list-title">购物车</span>
					<span class="list-clear" @click='removeAll'>删除</span>
				</div>
				<ul class="list-content">
					<li v-for='food in selectFoods'>
						<div class="l-f-name">{{food.name}}</div>
						<div class="list-rt">
							<p class="l-f-price">
								<span>￥</span>
								<span>{{food.price}}</span>
							</p>
							<div class="addgoods">
								<Addgoods :food='food'></Addgoods>
							</div>
						</div>
						<br class="clear">
					</li>
				</ul>
			</div>
		</transition>

		<transiton name='fade'>
			<div class="list-mask" v-if='show' @click='listShow'></div>
		</transiton>
	</div>
</template>

<script>
import Addgoods from '../addgoods/Addgoods.vue'
export default {
  name: 'shopCart',
  props: ['seller', 'selectFoods'],
  data () {
    return {
      isActive: false,
      txt: '',
      show: false,
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropBalls: []
    }
  },
  computed: {
    totalPrice () {
      let temp = 0
      this.selectFoods.forEach(function (food) {
        if (food.count > 0) {
          temp += food.price * food.count
        }
      })
      return temp
    },
    totalCount () {
      let temp = 0
      this.selectFoods.forEach(function (food) {
        if (food.count > 0) {
          temp += food.count
        }
      })
      if (temp) {
        this.isActive = true
      } else {
        this.isActive = false
        this.show = false
      }
      return temp
    },
    dif () {
      let temp = this.seller.minPrice - this.totalPrice
      if (this.totalPrice === 0) {
        this.txt = '￥' + this.seller.minPrice + '起送'
        return 0
      }
      if (temp > 0) {
        this.txt = '还差￥' + temp + '起送'
        return 0
      } else {
        this.txt = '去结算'
        return 1
      }
    }
  },
  methods: {
    removeAll () {
      this.selectFoods.forEach(function (food) {
        food.count = 0
      })
      this.show = false
    },
    listShow () {
      if (this.selectFoods.length === 0) return
      this.show = !this.show
    },
    goPay () {
      if (this.dif === 1) {
        window.location.href = 'https://h5.ele.me/login/#redirect=https%3A%2F%2Fh5.ele.me%2Fcheckout%2F'
      }
    },
    drop (el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i]
          if (!ball.show) {
            ball.show = true
            ball.el = el
            this.dropBalls.push(ball)
            return
          }
        }
    },
    beforeDrop (el) {
        let count = this.balls.length
        console.log(el)
        while (count--) {
          let ball = this.balls[count]
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect()
            let x = rect.left - 32
            let y = -(window.innerHeight - rect.top - 22)
            el.style.display = ''
            el.style.webkitTransform = `translate3d(0,${y}px,0)`
            el.style.transform = `translate3d(0,${y}px,0)`
            let inner = el.getElementsByClassName('inner-hook')[0]
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`
            inner.style.transform = `translate3d(${x}px,0,0)`
          }
        }
      },
      dropping (el, done) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)'
          el.style.transform = 'translate3d(0,0,0)'
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = 'translate3d(0,0,0)'
          inner.style.transform = 'translate3d(0,0,0)'
          el.addEventListener('transitionend', done)
        })
      },
      afterDrop (el) {
        let ball = this.dropBalls.shift()
        if (ball) {
          ball.show = false
          el.style.display = 'none'
        }
      }
  },
  components: {
    Addgoods
  }
}
</script>

<style lang='less'>
@import '../../less/index';
.shopCart {
	width:100%;
	height:1.0rem;
	.flexCenter(flex-start);
	background:#141d27;
	position:fixed;
	bottom:0;
	left:0;
	z-index:10;
}
.cart-lt {
	padding:0 0.24rem;
	flex:1;
}
.circle {
	display:inline-block;
	background:#2B333B;
	color:rgba(225,225,225,0.4);
	width:44px;
	height:44px;
	font-size:24px;
	border:6px solid #141d27;
	border-radius:50%;
	display:flex;
	flex-direction:row;
	align-items:center;
	justify-content:center;
	position:absolute;
	left:12px;
	top:-10px;
}
.cart-lt div.active {
	background:#3C96E9;
	color:#fff;
}

.totalCount {
	position:absolute;
	left:0.55rem;
	top:-0.1rem;
	font-size:0.18rem;
	color:#fff;
	background:red;
	padding:3px 5px;
	border-radius:50%;
}
.cart-lt span.active {
	color:#fff;
}
.cart-rt {
	background:#2B333B;
	font-weight:700;
	color:rgba(225,225,225,0.4);
	font-size:0.28rem;
	width:2.1rem;
	.flexCenter(center);
	height:100%;
}
.cart-rt.active {
	background:#55DB6C;
	color:#fff;
} 
.cart-lt-main{
	font-size:0.32rem;
	color:rgba(225,225,225,0.4);
}
.cart-lt-main span:nth-of-type(1) {
	margin-left:1.1rem;
}
.cart-lt-main span:nth-of-type(2) {
	margin:0 0.1rem;
	font-weight:200;
}

/* transition */

.slide-enter-active, .slide-leave-active {
	transition: all 0.5s;
} 
.slide-enter, .slide-leave-active {
	transform:translateY(100%)
}

/* cart list */
.cart-list {
	width:100%;
	position:absolute;
	bottom:1.0rem;
	left:0;
	z-index:1;
	background:#fff;
}
.list-head {
	background:#ECEFF1;
	color:#666666;
	font-size:0.28rem;
	line-height:0.8rem;
	padding:0 0.36rem;
}
.list-clear {
	float:right;
	color:#24A6DE;
}  
.list-content {
 	max-height:4.7rem;
 	overflow:auto;
}
.list-content li {
 	padding:0.24rem 0.36rem;
 	height:0.96rem;
 	box-sizing:border-box;
 	line-height: 0.48rem;
}
.l-f-name {
	float:left;
	font-size:0.28rem;
}
.list-rt {
	float:right;
}
.l-f-price {
	float:left;
	font-size:0.2rem;
	color:red;
	margin-right:0.24rem;
}

.l-f-price span:nth-of-type(2) {
	font-weight:bold;
	font-size:0.28rem;
}
.list-content .addgoods {
	position:relative;
	float:left;
	top:0.02rem;
}
.list-mask {
	height:100%;
	width:100%;
	position:absolute;
	top:0;
	left:0;
	background:rgba(0,0,0,0.3);
}

/* 小球动画*/
.ball {
	position: fixed;
	left: 32px;
	bottom:22px;
	z-index: 200;
	transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
}
.ball .inner {
	width: 16px;
	height: 16px;
	border-radius: 50%;
	background: rgb(0, 160, 220);
	transition: all 0.4s linear;
}
</style>