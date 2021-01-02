<template>
  <bm-overlay
    ref="customOverlay"
    :class="{sample: true}"
    pane="labelPane"
    @draw="draw">
    <!--
     :style="{width: 5 * val + 'rem',height: 5 * val + 'rem'}"
     >
     <div style="width: 5rem;height: 5rem;line-height: 5rem;">
    </div> -->
    <!-- <img src="http://127.0.0.1:8011/qipao.png" style="width: 100%"/> -->
    <img src="https://iguoxing.oss-cn-beijing.aliyuncs.com/img/baidu/hong.png" :style="{width: val * 100 + '%'}"/>
    <span v-if="num<3" class="rank-color">{{num+1}}</span>
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
.rank-color{
  color: #fff;
}
</style>
