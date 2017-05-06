<template>
	<div class="rating-container">
		<div class="rating">
			<div class="rating-lt">
				<h1>{{seller.score}}</h1>
				<h2>综合评分</h2>
				<p>高于周边商家{{seller.rankRate}}%</p>
			</div>
			<ul class="rating-rt">
				<li>
					<span>服务态度</span>
					<Star :score='seller.serviceScore'></Star>
					<span>{{seller.serviceScore}}分</span>
				</li>
				<li>
					<span>菜品评价</span>
					<Star :score='seller.foodScore'></Star>
					<span>{{seller.foodScore}}</span>
				</li>
				<li>
					<span>送达时间</span>
					<span>{{seller.deliveryTime}}分钟</span>
				</li>
			</ul>
			<br class="clear">
		</div>
		<div class="divider"></div>
		<div class="rating-main">
			<div class="r-m-nav">
				<span @click='c_all()'>全部{{ratings.length}}</span>
				<span @click='c_good()'>满意({{goodCount}})</span>
				<span @click='c_bad'>不满意({{badCount}})</span>
			</div>
			<ul class="review">
				<li v-if='val.score >= m && val.score <= n'  v-for='val in ratings'>
					<div class="userlogo">
						<img :src="val.avatar">
					</div>
					<div class="review-info">
						<h1 class="user">
							{{val.username}}
							<span class="ratingTime">{{val.rateTime}}</span>
						</h1>
						<Star :score='val.score'></Star>
						<h2>{{val.text}}</h2>
						<div>
							<span v-for='item in val.recommend'></span>
						</div>
					</div>
					<br class="clear">
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
  import Star from '../star/star.vue'
  export default {
    name: 'Rating',
    props: ['seller', 'goods', 'ratings'],
    data () {
      return {
        goodCount: '',
        badCount: '',
        m: 0,
        n: 5
      }
    },
    components: {
      Star
    },
    created () {
      this.goodBad()
    },
    methods: {
      goodBad () {
        let len = this.ratings.length
        let m = 0
        let n = 0
        for (let i = 0; i < len; i++) {
          if (this.ratings[i].score >= 4) {
            m++
          } else {
            n++
          }
        }
        this.goodCount = m
        this.badCount = n
      },
      c_all () {
        this.m = 0
        this.n = 5
      },
      c_good () {
        this.m = 4
        this.n = 5
      },
      c_bad () {
        this.m = 0
        this.n = 3
      }
    }
  }
 </script>

<style lang='less' scoped>
@import '../../less/index';

.rating-container {
	height:100%;
	width:100%;
	overflow:auto;
}
.rating {
	padding:0.36rem 0;
}
.rating-lt {
	box-sizing:border-box;
	float:left;
	width:2.75rem;
	text-align:center;
	border-right:1px solid #E6E7E8;
}
.rating-lt h1 {
	font-size: 0.48rem;
	color:#FF9900;
	margin-bottom:0.12rem;
}
.rating-lt h2 {
	font-size:0.24rem;
	color:rgb(7, 17, 27);
	margin-bottom:0.16rem;
}
.rating-lt p {
	font-size:0.16rem;
	color:rgb(147, 153, 159);
	margin-bottom:0.12rem;
}
.rating-rt {
	float:left;
	width:4.6rem;
	box-sizing:border-box;
	padding-left:0.3rem;
}

.rating-rt li {
	font-size:0.24rem;
	color:rgb(7, 17, 27);
	margin-bottom:0.16rem;
	.flexCenter(flex-start)
}

.rating-rt li > span {
	margin:0 0.1rem;
}
.divider {
	clear:both;
	height:0.15rem;
	background:#eee;
}

.rating-main {
	padding:0 0.36rem;
}
.r-m-nav {
	width:100%;
	box-sizing:border-box;
	padding:0.36rem;
	font-size: 0.28rem;
	border-bottom:1px solid rgba(7, 17, 27, 0.1);
}
.r-m-nav span {
	display:inline-block;
	padding:0.15rem 0.1rem;
	margin-right:0.12rem;
	border-radius:0.08rem;
}
.r-m-nav span:nth-of-type(1) {
	background:#3190E8;
	color:#fff;
}
.r-m-nav span:nth-of-type(2) {
	background:#EBF5FF;
}
.r-m-nav span:nth-of-type(3) {
	background:#F5F5F5;
}

.review {
	
}

.review > li {
	padding:0.36rem 0;
	border-bottom:1px solid rgba(7, 17, 27, 0.1);
}
.userlogo {
	float:left;
}
.userlogo img {
	width:0.56rem;
	margin-right:0.2rem;
	vertical-align:top;
}
.review-info {
	float:left;
	width:4.8rem;
}

.user {
	font-size:0.2rem;
	margin-bottom:0.08rem;
	color:rgb(7,17,27);
}

.ratingTime {
	float:right;
}
.review-info .star {
	margin-top:-0.5rem;
	margin-bottom:0.12rem;
}
.review-info > h2 {
	font-size:0.24rem;
	line-height:0.36rem;
	margin-bottom:0.06rem;
}
</style>