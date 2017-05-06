<template>
	<div class="goods">
		<div class="goods-wrap">
			<ul class='g-side'>
				<li v-for='(val, index) in goods' @click='addClass($event)'>
					<p>
						<img v-if='val.type === 2' src="./special_3@2x.png">
						<a :href="'#To'+index">{{val.name}}</a>
					</p>
				</li>
			</ul>
			<ul class="g-main">
				<li :id="'To'+index" v-for='(val, index) in goods'>
					<h1 class="f-title">{{val.name}}</h1>
					<ul class="foods-wrap">
						<li class="f-card" v-for='food in val.foods'>
							<img :src="food.icon">
							<div>
								<h1>{{food.name}}</h1>
								<p>月售{{food.sellCount}}份，好评率{{food.rating}}%</p>
								<div class="f-price">
									￥{{food.price}}
									<Addgoods :food='food' @add='addFood'></Addgoods>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<!-- bottom -->
		<footer>
			<ShopCart ref='shopcart' :seller='seller' :selectFoods='selectFoods'></ShopCart>
		</footer>
	</div> 
</template>

<script>
import '../../index'
import Addgoods from '../addgoods/Addgoods.vue'
import ShopCart from '../shopcart/ShopCart.vue'
export default {
  name: 'Goods',
  props: ['goods', 'seller'],
  data () {
    return {
      selectFood: {}
    }
  },
  components: {
    Addgoods,
    ShopCart
  },
  methods: {
    addClass (ev) {
      var oAs = document.querySelectorAll('.g-side a')
      oAs.forEach(function (n) {
        n.setAttribute('class', '')
      })
      if (ev.target.tagName.toUpperCase() === 'A') {
        ev.target.setAttribute('class', 'active')
      }
    },
    addFood (target) {
      this.$nextTick(() => {
          this.$refs.shopcart.drop(target)
        })
    }
  },
  computed: {
    selectFoods () {
      let result = []
      this.goods.forEach(function (good) {
        good.foods.forEach(function (food) {
          if (food.count > 0) {
            result.push(food)
          }
        })
      })
      return result
    }
  }
}
</script>

<style lang='less' scoped>
@import '../../less/index';

.goods {
	height:100%;
}
.goods-wrap {
	height:100%;
	position:relative;
	overflow:hidden;
	.flexCenter(flex-start);
}
.g-side {
	overflow-y:scroll;
	width:1.6rem;
	height:100%;
}	
.g-side li {
	height:1.08rem;
	background:#f3f5f7;
	padding:0 0.24rem;
	box-sizing:border-box;
	font-size:0.24rem;
	color:rgb(7,12,27);
	font-weight:200;
	line-height:0.28rem;
	.flexCenter(center);
	border-bottom:0.01rem solid rgba(7,12,27,0.1);
}
.g-side li a.active {
	color:#61921D;
}
.g-side img {
	width:0.24rem;
	height:0.24rem;
}

/*  .g-main */  
.g-main {
	flex:1;
	overflow-y:auto;
	height:100%;
}
.f-title {
	background:#f3f5f7;
	font-size:0.24rem;
	color:rgb(147,153,159); 
	line-height:0.52rem;
	box-sizing:border-box;
	padding-left:0.28rem;
}
.foods-wrap {
	padding:0 0.24rem;
}

.f-card {
	padding:0.36rem 0;
	.flexCenter(flex-start);
	border-top:1px solid rgba(7,17,27,0.1);
}
.f-card > img {
	width:1.04rem;
	height:1.04rem;
	margin-right:0.1rem;
}
.f-card >div {
	flex:1;
}

.f-card > div h1 {
	color:rgb(7,17,27);
	font-size:0.28rem;
	margin:0.04rem 0 0.16rem;
}
.f-card > div > p {
	color:rgb(147,153,159);
	font-size:0.2rem;
	margin-bottom:0.16rem;
}
.f-card .f-price {
	font-size:0.28rem;
	color:red;
	font-weight:700;
	position:relative;
}
</style>