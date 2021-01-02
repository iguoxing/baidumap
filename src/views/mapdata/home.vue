<template>
  <div style='padding: 0;margin: 0;height: 100%;width: 100%;'>
    <baidu-map id='container' class='Bmap' :center='center' :zoom='zoom' :scroll-wheel-zoom='true' :mapStyle='styleJson' @ready='handler'>
      <bm-boundary v-for="(items, index) in sites" :key="index" :name="items.val" :strokeWeight="2" strokeColor="rgba(255,255,255,1)" fillColor="#161736" />
      <!-- 百度地图拥堵路况叠加 <bm-traffic :predictDate="{weekday: 7, hour: 12}"></bm-traffic> -->
      <!--  -->
      <my-overlay v-for="(item, index) in citiesList" :key="index"
        :position="{lng: item.lng, lat: item.lat}"
        :active="active"
        :val="item.val"
        @mouseover.native="active = true"
        @mouseleave.native="active = false">
      </my-overlay>
    </baidu-map>
    <div style="width: 100%;height: 100%;background-image: url(../../../static/img/bgImg.png);position: absolute;background-position: 100% 100%;background-size: 100% 100%;z-index: -9;"></div>
    <div style="height: 100%;color: #FFF;">
      <el-row style="height: 100%;" align="middle">
        <!-- -----------------左侧----------------- -->
        <el-col :span="6" style="height: 100%;padding-left: 3.125rem;">
          <span>&nbsp;</span>
        </el-col>
        <!-- -----------------中间----------------- -->
        <el-col :span="12" style="height: 100%;text-align: center;">
          <!-- 中间大标题 -->
          <el-col :span="4">&nbsp;</el-col>
          <el-col :span="24" style="text-align: center;">
            <div class="congestionTitleBg" style="margin: 0 auto;">
              <span class="congestionTitleFont" style="">
                地图大数据
              </span>
            </div>
          </el-col>
          <!-- 下边小标题 -->
          <el-col style="text-align: center;">
            <div class="congestionSubheadBg">
              <el-col :span="4">
                &nbsp;
              </el-col>
              <el-col :span="16" style="padding: 0;margin: 0;">
                <span style="font-size: 18px;font-weight: bold;color: #1BCFF6;">
                  {{nowDate}}
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  {{nowWeek}}
                </span>
              </el-col>
              <el-col :span="4">
                &nbsp;
              </el-col>
            </div>
          </el-col>
          <el-col style="text-align: right;color: #1BCFF6;margin-top: 1rem;">
            <el-col :span="12">
              <el-col style="line-height: 3rem;">
                <span style="font-size: 1.8rem;">
                  日提供定位请求服务次数
                </span>
              </el-col>
              <el-col style="line-height: .8rem;margin-top: -0.5rem;">
                <span style="font-size: .8rem;">
                  REAL TIME FOR LOCATION SERVICE REQUIRES
                </span>
              </el-col>
            </el-col>
            <el-col :span="1" style="text-align: center;font-size: 2.2rem;font-weight: 300;">
              <span>|</span>
            </el-col>
            <el-col :span="11" style="text-align: left;font-size: 2.8rem;letter-spacing:2px;line-height: 3.5rem;font-weight: 600;">
              <span>
                {{requestNum}}
              </span>
            </el-col>
          </el-col>
          <el-col style="height: 73%;">&nbsp;</el-col>
        </el-col>
        <!-- -----------------右侧----------------- -->
        <el-col :span="6" style="height: 100%;">
          <el-col style="margin-top: 50px;font-size: 12px;font-weight: 400;color: #FFFFFF;line-height: 18px;opacity: 0.8;text-align: center;">
            <el-col :span="8">
              <!-- <i class="el-icon-success" style="color: rgba(29, 206, 246, 1);"></i>
              <span>每个五分钟更新一次</span> -->
            </el-col>
            <el-col :span="12">
              <!-- <i class="el-icon-refresh"></i>
              <span>最后一次更新于10：00</span> -->
            </el-col>
          </el-col>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {BmlHeatmap} from 'vue-baidu-map'
import MyOverlay from '../../components/overlay/ImgOverlay.vue'
import { getWeekDay } from '../../router/utils'

export default {
  name: 'Congestion',
  components: {
    BmlHeatmap,
    MyOverlay
  },
  data () {
    return {
      requestNum: '435,586,925',
      active: false,
      markerPoint: {
        lng: 106.418261,
        lat: 39.921984
      },
      markerPoint1: {
        lng: 116.418261,
        lat: 49.921984
      },
      sites: [
        {
          id: 1,
          val: '北京市'
        },
        {
          id: 2,
          val: '广东省'
        },
        {
          id: 3,
          val: '山东省'
        },
        {
          id: 4,
          val: '江苏省'
        },
        {
          id: 1,
          val: '河南省'
        },
        {
          id: 2,
          val: '上海市'
        },
        {
          id: 3,
          val: '河北省'
        },
        {
          id: 4,
          val: '浙江省'
        },
        {
          id: 1,
          val: '香港特别行政区'
        },
        {
          id: 2,
          val: '陕西省'
        },
        {
          id: 1,
          val: '湖南省'
        },
        {
          id: 2,
          val: '重庆市'
        },
        {
          id: 3,
          val: '福建省'
        },
        {
          id: 4,
          val: '天津市'
        },
        {
          id: 1,
          val: '云南省'
        },
        {
          id: 2,
          val: '四川省'
        },
        {
          id: 3,
          val: '广西壮族自治区'
        },
        {
          id: 4,
          val: '安徽省'
        },
        {
          id: 1,
          val: '海南省'
        },
        {
          id: 2,
          val: '江西省'
        },
        {
          id: 1,
          val: '湖北省'
        },
        {
          id: 2,
          val: '山西省'
        },
        {
          id: 3,
          val: '辽宁省'
        },
        {
          id: 4,
          val: '台湾省'
        },
        {
          id: 1,
          val: '黑龙江'
        },
        {
          id: 2,
          val: '内蒙古自治区'
        },
        {
          id: 3,
          val: '澳门特别行政区'
        },
        {
          id: 4,
          val: '贵州省'
        },
        {
          id: 1,
          val: '甘肃省'
        },
        {
          id: 2,
          val: '青海省'
        },
        {
          id: 1,
          val: '新疆维吾尔自治区'
        },
        {
          id: 2,
          val: '西藏区'
        },
        {
          id: 3,
          val: '吉林省'
        },
        {
          id: 4,
          val: '宁夏回族自治区'
        }
      ],
      // 热力地图数据
      heatMapData: [
        {lng: 116.418261, lat: 39.921984, count: 50},
        {lng: 116.423332, lat: 39.916532, count: 51},
        {lng: 116.419787, lat: 39.930658, count: 15}
      ],
      // 省会动图
      citiesList: [
        {
          name: '北京',
          lng: 118.404,
          lat: 39.915,
          val: 1.25
        },
        {
          name: '哈尔滨',
          lng: 127.76,
          lat: 45.44,
          val: 1.01
        },
        {
          name: '上海',
          lng: 123.89,
          lat: 30.14,
          val: 1.3
        },
        {
          name: '深圳',
          lng: 115.84,
          lat: 21.88,
          val: 1
        },
        {
          name: '成都',
          lng: 105.04,
          lat: 29.4,
          val: 0.75
        },
        {
          name: '武汉',
          lng: 115.67,
          lat: 30.35,
          val: 0.8
        },
        {
          name: '河南',
          lng: 115.40,
          lat: 33.46,
          val: 0.8
        },
        {
          name: '重庆',
          lng: 109.54,
          lat: 29.59,
          val: 0.8
        },
        {
          name: '乌鲁木齐',
          lng: 89.36,
          lat: 42.45,
          val: 0.5
        },
        {
          name: '沈阳',
          lng: 125.42,
          lat: 40.79,
          val: 0.75
        },
        {
          name: '长春市',
          lng: 126.3,
          lat: 42.88,
          val: 0.6
        },
        {
          name: '呼和浩特',
          lng: 112.75,
          lat: 39.84,
          val: 0.7
        },
        {
          name: '银川',
          lng: 107.83,
          lat: 36.48,
          val: 0.4
        },
        {
          name: '兰州',
          lng: 105.83,
          lat: 35.06,
          val: 0.4
        },
        {
          name: '太原',
          lng: 114.24,
          lat: 36.85,
          val: 0.6
        },
        {
          name: '石家庄',
          lng: 116.90,
          lat: 37.54,
          val: 0.75
        },
        {
          name: '济南',
          lng: 119.00,
          lat: 35.67,
          val: 1
        },
        {
          name: '西安市',
          lng: 110.94,
          lat: 34.26,
          val: 0.75
        },
        {
          name: '广州市',
          lng: 115.28,
          lat: 22.52,
          val: 1
        },
        {
          name: '昆明',
          lng: 103.71,
          lat: 23.54,
          val: 0.7
        },
        {
          name: '贵阳',
          lng: 108.71,
          lat: 25.57,
          val: 0.9
        },
        {
          name: '南宁',
          lng: 110.32,
          lat: 22.82,
          val: 0.6
        },
        {
          name: '拉萨',
          lng: 91.11,
          lat: 29.64,
          val: 0.5
        },
        {
          name: '南昌',
          lng: 117.89,
          lat: 27.67,
          val: 0.9
        },
        {
          name: '西宁',
          lng: 102.77,
          lat: 35.61,
          val: 0.5
        },
        {
          name: '福州',
          lng: 121.3,
          lat: 25.07,
          val: 0.9
        },
        {
          name: '台北',
          lng: 123.52,
          lat: 24.03,
          val: 0.9
        },
        {
          name: '海口',
          lng: 112.19,
          lat: 19.04,
          val: 0.9
        },
        {
          name: '南京',
          lng: 121.76,
          lat: 31.04,
          val: 0.9
        },
        {
          name: '合肥',
          lng: 119.28,
          lat: 30.86,
          val: 0.9
        },
        {
          name: '长沙',
          lng: 114.38,
          lat: 27.19,
          val: 0.9
        }
      ],
      // 热力交通数据
      trafficTop: [
        {
          t_id: '1',
          t_index: 1,
          t_name: '河南建国机场',
          t_site: '河南省登封市',
          t_heatVal: '8034',
          t_heatValStateVal: '10.5',
          t_heatValStateType: '3',
          t_congestionIndex: '2.83',
          t_congestionIndexStateVal: '2,5',
          t_congestionIndexStateType: '1'
        }, {
          t_id: '2',
          t_index: 2,
          t_name: '北京首都国际机场',
          t_site: '北京市',
          t_heatVal: '7854',
          t_heatValStateVal: '12.1',
          t_heatValStateType: '1',
          t_congestionIndex: '2.83',
          t_congestionIndexStateVal: '2,5',
          t_congestionIndexStateType: '1'
        }, {
          t_id: '3',
          t_index: 3,
          t_name: '济南市金融机场',
          t_site: '河南省登封市',
          t_heatVal: '7209',
          t_heatValStateVal: '10.5',
          t_heatValStateType: '3',
          t_congestionIndex: '2.83',
          t_congestionIndexStateVal: '2,5',
          t_congestionIndexStateType: '1'
        }, {
          t_id: '4',
          t_index: 4,
          t_name: '西安机场',
          t_site: '西安省',
          t_heatVal: '7109',
          t_heatValStateVal: '10.5',
          t_heatValStateType: '3',
          t_congestionIndex: '2.83',
          t_congestionIndexStateVal: '2,5',
          t_congestionIndexStateType: '1'
        }, {
          t_id: '5',
          t_index: 5,
          t_name: '西安机场',
          t_site: '西安省',
          t_heatVal: '7109',
          t_heatValStateVal: '10.5',
          t_heatValStateType: '3',
          t_congestionIndex: '2.83',
          t_congestionIndexStateVal: '2,5',
          t_congestionIndexStateType: '1'
        }, {
          t_id: '6',
          t_index: 6,
          t_name: '西安机场',
          t_site: '西安省',
          t_heatVal: '7109',
          t_heatValStateVal: '10.5',
          t_heatValStateType: '3',
          t_congestionIndex: '2.83',
          t_congestionIndexStateVal: '2,5',
          t_congestionIndexStateType: '1'
        }, {
          t_id: '7',
          t_index: 7,
          t_name: '西安机场',
          t_site: '西安省',
          t_heatVal: '7109',
          t_heatValStateVal: '10.5',
          t_heatValStateType: '3',
          t_congestionIndex: '2.83',
          t_congestionIndexStateVal: '2,5',
          t_congestionIndexStateType: '1'
        }, {
          t_id: '8',
          t_index: 8,
          t_name: '西安机场',
          t_site: '西安省',
          t_heatVal: '7109',
          t_heatValStateVal: '10.5',
          t_heatValStateType: '3',
          t_congestionIndex: '2.83',
          t_congestionIndexStateVal: '2,5',
          t_congestionIndexStateType: '1'
        }, {
          t_id: '9',
          t_index: 9,
          t_name: '西安机场',
          t_site: '西安省',
          t_heatVal: '7109',
          t_heatValStateVal: '10.5',
          t_heatValStateType: '3',
          t_congestionIndex: '2.83',
          t_congestionIndexStateVal: '2,5',
          t_congestionIndexStateType: '1'
        }, {
          t_id: '10',
          t_index: 10,
          t_name: '西安机场',
          t_site: '西安省',
          t_heatVal: '7109',
          t_heatValStateVal: '10.5',
          t_heatValStateType: '3',
          t_congestionIndex: '2.83',
          t_congestionIndexStateVal: '2,5',
          t_congestionIndexStateType: '1'
        }
      ],
      // 热力景点数据
      scenicTop: [
        {
          s_id: '1',
          s_index: 1,
          s_name: '河南建国机场',
          s_site: '河南省登封市',
          s_heatVal: '8034',
          s_heatValStateVal: '10.5',
          s_heatValStateType: '3',
          s_congestionIndex: '2.83',
          s_congestionIndexStateVal: '2,5',
          s_congestionIndexStateType: '1'
        }, {
          s_id: '2',
          s_index: 2,
          s_name: '北京首都国际机场',
          s_site: '北京市',
          s_heatVal: '7854',
          s_heatValStateVal: '12.1',
          s_heatValStateType: '1',
          s_congestionIndex: '2.83',
          s_congestionIndexStateVal: '2,5',
          s_congestionIndexStateType: '1'
        }, {
          s_id: '3',
          s_index: 3,
          s_name: '济南市金融机场',
          s_site: '河南省登封市',
          s_heatVal: '7209',
          s_heatValStateVal: '10.5',
          s_heatValStateType: '3',
          s_congestionIndex: '2.83',
          s_congestionIndexStateVal: '2,5',
          s_congestionIndexStateType: '1'
        }, {
          s_id: '4',
          s_index: 4,
          s_name: '西安机场',
          s_site: '西安省',
          s_heatVal: '7109',
          s_heatValStateVal: '10.5',
          s_heatValStateType: '3',
          s_congestionIndex: '2.83',
          s_congestionIndexStateVal: '2,5',
          s_congestionIndexStateType: '1'
        }, {
          s_id: '5',
          s_index: 5,
          s_name: '西安机场',
          s_site: '西安省',
          s_heatVal: '7109',
          s_heatValStateVal: '10.5',
          s_heatValStateType: '3',
          s_congestionIndex: '2.83',
          s_congestionIndexStateVal: '2,5',
          s_congestionIndexStateType: '1'
        }, {
          s_id: '6',
          s_index: 6,
          s_name: '西安机场',
          s_site: '西安省',
          s_heatVal: '7109',
          s_heatValStateVal: '10.5',
          s_heatValStateType: '3',
          s_congestionIndex: '2.83',
          s_congestionIndexStateVal: '2,5',
          s_congestionIndexStateType: '1'
        }, {
          s_id: '7',
          s_index: 7,
          s_name: '西安机场',
          s_site: '西安省',
          s_heatVal: '7109',
          s_heatValStateVal: '10.5',
          s_heatValStateType: '3',
          s_congestionIndex: '2.83',
          s_congestionIndexStateVal: '2,5',
          s_congestionIndexStateType: '1'
        }, {
          s_id: '8',
          s_index: 8,
          s_name: '西安机场',
          s_site: '西安省',
          s_heatVal: '7109',
          s_heatValStateVal: '10.5',
          s_heatValStateType: '3',
          s_congestionIndex: '2.83',
          s_congestionIndexStateVal: '2,5',
          s_congestionIndexStateType: '1'
        }, {
          s_id: '9',
          s_index: 9,
          s_name: '西安机场',
          s_site: '西安省',
          s_heatVal: '7109',
          s_heatValStateVal: '10.5',
          s_heatValStateType: '3',
          s_congestionIndex: '2.83',
          s_congestionIndexStateVal: '2,5',
          s_congestionIndexStateType: '1'
        }, {
          s_id: '10',
          s_index: 10,
          s_name: '西安机场',
          s_site: '西安省',
          s_heatVal: '7109',
          s_heatValStateVal: '10.5',
          s_heatValStateType: '3',
          s_congestionIndex: '2.83',
          s_congestionIndexStateVal: '2,5',
          s_congestionIndexStateType: '1'
        }
      ],
      // 选择 显示实时拥堵或者拥堵预测
      mapSelectType: true,
      // 经纬度
      center: {
        lng: 0,
        lat: 0
      },
      // 地图展示级别
      zoom: 3,
      // 百度地图样式
      styleJson: {
        style: 'dark',
        styleJson: [
          {
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
          }
        ]
      },
      nowDate: this.$moment().format(' YYYY[年]MM[月]DD[日]'), // 当前日期
      nowWeek: getWeekDay(this.$moment().day())
    }
  },
  mounted () {
    console.log('进入heatMap')
    let _this = this
    setInterval(function () {
      let c = Math.random().toFixed(5)
      let tmp = 465555345 + 100000 * c
      _this.requestNum = _this.funseparateNum(tmp + '')
    }, 3000)
  },
  methods: {
    // 加逗号
    funseparateNum (str) {
      let counter = 0
      let result = ''
      str = str + ''
      for (let j = str.length - 1; j >= 0; j--) {
        counter++
        result = str.charAt(j) + result
        if (!(counter % 3) && j !== 0) {
          result = ',' + result
        }
      }
      return result
    },
    // 修改是否显示实时拥堵或者拥堵预测
    updateMapType: function () {
      this.mapSelectType = !this.mapSelectType
      if (this.mapSelectType) {
        this.polylinePath = [
          {
            lng: 116.21,
            lat: 39.2
          },
          {
            lng: 116.404,
            lat: 39.92
          },
          {
            lng: 117.21,
            lat: 40.2
          }
        ]
      } else {
        this.polylinePath = [
          {
            lng: 116.404,
            lat: 39.915
          },
          {
            lng: 116.405,
            lat: 39.920
          },
          {
            lng: 116.423493,
            lat: 39.907445
          }
        ]
      }
    },
    // 百度地图被创建后的回调函数
    handler ({BMap, map}) {
      let isThis = this
      isThis.center.lng = 106.404
      isThis.center.lat = 43.515
      isThis.zoom = 5
    },
    draw ({el, BMap, map}) {
      // debugger
      const pixel = map.pointToOverlayPixel(new BMap.Point(116.404, 39.915))
      el.style.left = pixel.x - 60 + 'px'
      el.style.top = pixel.y - 20 + 'px'
    }
  }
}
</script>

<style scoped>
  .Bmap {
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: -11;
  }
  .congestionNumberTitleFont {
    width: 131px;
    height: 55px;
    font-size: 21px;
    color: #FFFFFF;
    line-height: 55px;
  }
  .congestionTitleBg {
    background-image: url(../../../static/img/biaoti_bg@2x.png);
    background-position: 100% 100%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 180px;
    width: 531px;
    margin-top: 20px;
  }
  .congestionTitleFont {
    font-size: 30px;
    font-weight: 500;
    color: #FEFEFE;
    line-height: 72px;
  }
  .congestionSubheadBg {
    margin: -72px auto 0;
    background-image: url(../../../static/img/kuang@2x.png);
    background-position: 100% 100%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 42px;
    width: 360px;
    text-align: center;
    line-height: 42px;
  }
  .rect{
    height: 40px;
    width: 40px;
    line-height: 40px;
    text-align: center;
    background-color: rgba(23, 198, 237, .25);
    background: linear-gradient(to left, #196aa8, #196aa8) left top no-repeat,
                linear-gradient(to bottom, #196aa8, #196aa8) left top no-repeat,
                linear-gradient(to left, #196aa8, #196aa8) right top no-repeat,
                linear-gradient(to bottom, #196aa8, #196aa8) right top no-repeat,
                linear-gradient(to left, #196aa8, #196aa8) left bottom no-repeat,
                linear-gradient(to bottom, #196aa8, #196aa8) left bottom no-repeat,
                linear-gradient(to left, #196aa8, #196AA8) right bottom no-repeat,
                linear-gradient(to left, #196aa8, #196aa8) right bottom no-repeat;
    background-size: 1px 5px, 5px 1px, 1px 5px, 5px 1px;
  }
  .gradient{
      background: -moz-linear-gradient(top, rgba(23, 198, 237, .25) 0%, rgba(23, 198, 237, 0) 100%);
      background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(23, 198, 237, .25)), color-stop(100%,rgba(23, 198, 237, 0)));
      background: -webkit-linear-gradient(top, rgba(23, 198, 237, .25) 0%,rgba(23, 198, 237, 0) 100%);
      background: -o-linear-gradient(top, rgba(23, 198, 237, .25) 0%,rgba(23, 198, 237, 0) 100%);
      background: -ms-linear-gradient(top, rgba(23, 198, 237, .25) 0%,rgba(23, 198, 237, 0) 100%);
      background: linear-gradient(to bottom, rgba(23, 198, 237, .25) 0%,rgba(23, 198, 237, 0) 100%);
  }
</style>
