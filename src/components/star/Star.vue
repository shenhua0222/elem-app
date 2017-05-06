<template>
	<div class="star">
		<span v-for='val in items' :class='val'></span>
	</div>
</template>

<script>
const lENGTH = 5
const CLS_ON = 'star-on'
const CLS_HALF = 'star-half'
const CLS_OFF = 'star-off'
export default {
  name: 'Star',
  props: {
    score: {required: Number}
  },
  computed: {
    items () {
      let result = []
      let score = Math.floor(this.score * 2) / 2
      let scoreInt = Math.floor(score)
      let hasDecimal = score % 1 !== 0
      for (var i = 0; i < scoreInt; i++) {
        result.push(CLS_ON)
      }
      if (hasDecimal) result.push(CLS_HALF)
      while (result.length < lENGTH) {
        result.push(CLS_OFF)
      }
      return result
    }
  }
}
</script>

<style lang='less' scoped>
 	.bg(@url) {
 		display:inline-block;
 		width:0.3rem;
 		height:0.29rem;
 		margin-right:0.05rem;
 		background:url(@url) no-repeat;
		background-size:cover;
 	}
	.star-on {
		.bg('star36_on@3x.png');
	}
	.star-half {
		.bg('star36_half@3x.png');
	}
	.star-off {
		.bg('star36_off@3x.png');
	}
</style>