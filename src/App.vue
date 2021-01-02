<template style="padding: 0;margin: 0;">
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@font-face {
  font-family: myFirstFont;
  src: url('../static/Rajdhani-Medium.ttf');
}

html,body {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
    font-family:myFirstFont;
}
#app {
    margin: 0;
    padding: 0;
    height: 100%;
}
.bd1 {
  border: 1px solid red;
}
</style>
