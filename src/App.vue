<template>
  <div id="app">
    <MyHead :seller='seller'></MyHead>
    <div class="tab">
      <router-link to='/goods'>商品</router-link>
      <router-link to='/rating'>评价</router-link>
    </div>
    <div class="route-container">
      <router-view :goods='goods' :seller='seller' :ratings='ratings'></router-view>
    </div>
  </div>
</template>

<script>
import MyHead from './components/head/Head'

export default {
  name: 'app',
  components: {
    MyHead
  },
  data () {
    return {
      seller: {},
      goods: [],
      ratings: {}
    }
  },
  created () {
    var that = this
    this.$http.get('/seller').then(function (res) {
      var data = res.body
      that.seller = data.seller
    }, function (err) {
      console.log(err)
    })
    this.$http.get('/goods').then(function (res) {
      that.goods = res.body.data
    })
    this.$http.get('/ratings').then(function (res) {
      that.ratings = res.body.data
    })
  }
}
</script>

<style lang='less' scoped>
@import './less/index';
.tab {
  height:0.8rem;
  box-sizing:border-box;
  font-size:0.28rem;
  color:rgb(77,85,93);
  border: 0.01rem solid rgba(7, 17, 27, 0.1);
  .flexCenter;
}

.tab a.active {
  color: #3190e8;
}

</style>
