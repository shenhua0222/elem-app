<template>
	<div class="addgoods">
		<span v-if='food.count > 0' class="icon-remove_circle_outline" @click='decreaseCart'></span>
		<span v-if='food.count > 0' class="foodCount">{{food.count}}</span>
		<span class="icon-add_circle" @click='addCart'></span>
	</div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'addgoods',
  props: ['food'],
  methods: {
    addCart (event) {
      if (!this.food.count) {
      Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
      this.$emit('add', event.target)
    },
    decreaseCart () {
      this.food.count--
    }
  }
}
</script>

<style type="less" scoped>
.addgoods {
	position:absolute;
	right:0;
	bottom:0;
	font-size:0.4rem;
	color:#3199E8;
}

.foodCount {
	display: inline-block;
	font-size:0.24rem;
	color:#07111B;
	position:relative;
	bottom:0.08rem;
}
</style>