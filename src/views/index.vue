<template>
  <div style='padding: 0;margin: 0;height: 100%;width: 100%;' class=''>
    <baidu-map class='Bmap' :center='center' :zoom='zoom' @ready='handler' :scroll-wheel-zoom='true' :mapStyle='styleJson'>
    </baidu-map>
    <div id="map_container"></div>
  </div>
</template>

<script>
export default {
  name: 'mapNum',
  data () {
    return {
      // 经纬度
      center: {
        lng: 0,
        lat: 0
      },
      // 地图展示级别
      zoom: 6,
      styleJson: {
        style: 'dark',
        styleJson: [{
          'featureType': 'districtlabel',
          'elementType': 'labels',
          'stylers': {
            'visibility': 'off'
          }
        }, {
          'featureType': 'districtlabel',
          'elementType': 'labels.icon',
          'stylers': {
            'visibility': 'off'
          }
        }, {
          'featureType': 'poilabel',
          'elementType': 'labels',
          'stylers': {
            'visibility': 'off'
          }
        }, {
          'featureType': 'poilabel',
          'elementType': 'labels.icon',
          'stylers': {
            'visibility': 'off'
          }
        }, {
          'featureType': 'water',
          'elementType': 'geometry',
          'stylers': {
            'color': '#003256ff'
          }
        }, {
          'featureType': 'green',
          'elementType': 'geometry',
          'stylers': {
            'visibility': 'off'
          }
        }, {
          'featureType': 'land',
          'elementType': 'geometry',
          'stylers': {
            'color': '#031127ff'
          }
        }, {
          'featureType': 'manmade',
          'elementType': 'geometry',
          'stylers': {
            'visibility': 'off'
          }
        }, {
          'featureType': 'manmade',
          'elementType': 'labels',
          'stylers': {
            'visibility': 'off'
          }
        }, {
          'featureType': 'road',
          'elementType': 'geometry.stroke',
          'stylers': {
            'color': '#ffffff00'
          }
        }, {
          'featureType': 'road',
          'elementType': 'labels.text.fill',
          'stylers': {
            'color': '#fffffff2'
          }
        }, {
          'featureType': 'road',
          'elementType': 'labels.text.stroke',
          'stylers': {
            'color': '#ffffff00'
          }
        }, {
          'featureType': 'road',
          'elementType': 'geometry.fill',
          'stylers': {
            'color': '#2f23ffff'
          }
        }, {
          'featureType': 'railway',
          'elementType': 'geometry',
          'stylers': {
            'visibility': 'off'
          }
        }, {
          'featureType': 'water',
          'elementType': 'labels.text.stroke',
          'stylers': {
            'color': '#ffffff00'
          }
        }, {
          'featureType': 'water',
          'elementType': 'labels',
          'stylers': {
            'visibility': 'off'
          }
        }, {
          'featureType': 'subway',
          'elementType': 'geometry',
          'stylers': {
            'visibility': 'off'
          }
        }, {
          'featureType': 'subway',
          'elementType': 'labels',
          'stylers': {
            'visibility': 'off'
          }
        }, {
          'featureType': 'subway',
          'elementType': 'labels.icon',
          'stylers': {
            'visibility': 'off'
          }
        }]
      }
    }
  },
  mounted () {
  },
  methods: {
    handler: function ({ BMap, map }) {
    }
  }
}
</script>

<style>
  .Bmap {
    height: 100%;
    width: 100%;
  }
</style>
