<template>
  <bm-overlay
    ref="customOverlay"
    :class="{sample: true}"
    pane="labelPane"
    @draw="draw">
    <div class="dot-rank">
      <el-tooltip class="item" value="true" effect="light" :content="name" :placement="className" manual="true" hide-after="0">
        <img src="https://iguoxing.oss-cn-beijing.aliyuncs.com/img/baidu/shuniu.png" :style="{width: 30 + '%'}"/>
      </el-tooltip>
    </div>
  </bm-overlay>
</template>

<script>
export default {
  props: ['position', 'num', 'name', 'className'],
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
.dot-rank{
  display: flex;
  justify-content: center;
  align-items: center;
  /* position: relative; */
}
.rank-color{
  z-index: 1000;
  color: #fff;
}
</style>
