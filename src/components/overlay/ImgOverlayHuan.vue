<template>
  <bm-overlay
    ref="customOverlay"
    :class="{sample: true}"
    pane="labelPane"
    @draw="draw">
    <div class="dot-rank">
      <img src="https://iguoxing.oss-cn-beijing.aliyuncs.com/img/baidu/huan.gif" :style="{width: getWidth(val) + '%'}"/>
      <span class="rank-color" v-if="num<5">{{num+1}}</span>
    </div>
  </bm-overlay>
</template>

<script>
export default {
  props: ['position', 'val', 'num'],
  watch: {
    position: {
      handler () {
        this.$refs.customOverlay.reload()
      },
      deep: true
    }
  },
  methods: {
    draw ({el, BMap, map}) {
      const {lng, lat} = this.position
      const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat))
      el.style.left = pixel.x - 65 + 'px'
      el.style.top = pixel.y - 50 + 'px'
    },
    getWidth (val) {
      if (val > 0) {
        return 60 + (5 - val) * 5
      } else {
        return 20
      }
    }
  }
}
</script>

<style>
.sample {
  border: 0px solid #FEFEFE;
  overflow: hidden;
  text-align: center;
  position: absolute;
  width: 5rem;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
}
.dot-rank{
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.rank-color{
  position: absolute;
  color: #fff;
}
</style>
