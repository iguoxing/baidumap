<template>
  <div style='padding: 0;margin: 0;height: 100%;width: 100%;'>
    <baidu-map id='container' class='Bmap' :center='center' :zoom='zoom' :scroll-wheel-zoom='true' :mapStyle='styleJson' @ready='handler'>
      <bm-boundary v-for="(items, index) in sites" :key="index" :name="items.val" :strokeWeight="2" strokeColor="rgba(255,255,255,1)" fillColor="#161736" />
      <!-- 百度地图拥堵路况叠加 <bm-traffic :predictDate="{weekday: 7, hour: 12}"></bm-traffic> -->
      <!-- <bml-heatmap :data="heatMapData" :max="heatMapDataMax" :radius="13" :gradient="{0:'rgb(34, 65, 255)',.5:'rgb(255, 198, 0)',1:'rgb(255, 30, 30)'}"></bml-heatmap> -->
      <!-- <bm-marker :position="markerPoint" :dragging="true" animation="BMAP_ANIMATION_BOUNCE" :icon="{url: 'http://developer.baidu.com/map/jsdemo/img/fox.gif', size: {width: 300, height: 157}}"></bm-marker> -->
      <div v-if="mapSelectType">
        <my-overlay-shuniu v-for="(item, index) in heatMapDataShuniu" :key="index"
          :position="{lng: item.lng, lat: item.lat}"
          :num="index+1"
          :name="item.name"
          @mouseover.native="active = true"
          @mouseleave.native="active = false">
        </my-overlay-shuniu>
      </div>
      <div v-if="!mapSelectType">
        <my-overlay-jingqu v-for="(item, index) in heatMapDataJingqu" :key="index"
          :position="{lng: item.lng, lat: item.lat}"
          :num="index+1"
          :name="item.name"
          @mouseover.native="active = true"
          @mouseleave.native="active = false">
        </my-overlay-jingqu>
      </div>
    </baidu-map>
    <div style="width: 100%;height: 100%;background-image: url(../../../static/img/bgImg.png);position: absolute;background-position: 100% 100%;background-size: 100% 100%;z-index: -9;"></div>
    <div style="height: 100%;color: #FFF;">
      <el-row style="height: 100%;" align="middle">
        <!-- -----------------左侧----------------- -->
        <el-col :span="6" style="height: 100%;padding-left: 3.125rem;">
          <el-col style="padding-top: 2.5rem;"></el-col>
          <!-- --------------------------------热门交通枢纽TOP10 -->
          <!-- 热门交通枢纽TOP10的标题 -->
          <el-col style="padding-top: 2.8rem;text-align: left;">
            <el-col :span="4">
              <img src="../../../static/img/qushi@2x.png" style="height: 55px;"/>
            </el-col>
            <el-col :span="18">
              <span class="congestionNumberTitleFont">热门交通枢纽TOP10</span>
            </el-col>
          </el-col>
          <el-col style="margin-top: 0rem;opacity: 0.5;font-size: 0.8rem;text-align: center;">
            <el-col :span="3">&nbsp;</el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="7" style="text-align: left;">
              <span>道路名称</span>
            </el-col>
            <el-col :span="4">
              <span>实时热度</span>
            </el-col>
            <el-col :span="4">
              <span>热度变化率</span>
            </el-col>
            <el-col :span="5">
              <span>周边拥堵指数</span>
            </el-col>
          </el-col>
          <el-col v-for="(items, index) in trafficTop" :key="index + 'wewewe'" v-show="index < 10"
            style="margin-top: 15px;text-align: center;color: rgba(255,255,255,.5);" class="">
            <el-col :span="4" class="rect">
              <div style="width: 100%;height: 100%;text-align: center;background-color: rgba(23, 198, 237, .25);color: rgba(255,255,255,.5);">
                {{items.t_index}}
              </div>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="20" class="list-gradient">
              <el-col :span="10" class="list-item">
                <span class="list-num">{{items.t_name}}</span>
              </el-col>
              <el-col :span="5" class="list-item">
                <span class="list-num">{{items.t_heatVal}}</span>
              </el-col>
              <el-col :span="5" class="list-item">
                <span class="list-num">{{items.t_heatValStateVal}}%</span>
                <i v-if="items.t_heatValStateVal>0" class="rate-up"></i>
                <i v-if="items.t_heatValStateVal<0" class="rate-down"></i>
              </el-col>
              <el-col :span="4" class="list-item">
                <span class="list-num">{{items.t_congestionIndex}}</span>
              </el-col>
            </el-col>
          </el-col>
        </el-col>
        <!-- -----------------中间----------------- -->
        <el-col :span="12" style="height: 100%;text-align: center;">
          <!-- 中间大标题 -->
          <el-col :span="4">&nbsp;</el-col>
          <el-col :span="24" style="text-align: center;">
            <div class="congestionTitleBg" style="margin: 0 auto;">
              <span class="congestionTitleFont" style="">
                百度全国热力地图
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
          <el-col style="height: 73%;">
            <!-- 顶部切换选择 -->
            <el-col style="display: flex;justify-content: center;">
              <el-col :class="[mapSelectType  == true ? 'titleBgSelect1' : 'titleBgSelect2']" @click.native="updateMapType()">
                <span class="titleFontCss2">交通枢纽</span>
              </el-col>
              <el-col :class="[mapSelectType == true ? 'titleBgSelect2' : 'titleBgSelect1']" @click.native="updateMapType()">
                <span class="titleFontCss1">热门景点</span>
              </el-col>
            </el-col>
          </el-col>

        </el-col>
        <!-- -----------------右侧----------------- -->
        <el-col :span="6" style="height: 100%;">
          <el-col style="margin-top: 4rem;font-size: 12px;font-weight: 400;color: #FFFFFF;line-height: 18px;opacity: 0.8;text-align: center;">
            <el-col :span="12"></el-col>
          </el-col>
          <el-col style="padding-top: 1.2rem;text-align: left;">
            <el-col :span="4">
              <img src="../../../static/img/top@2x.png" style="height: 55px;"/>
            </el-col>
            <el-col :span="18">
              <span class="congestionNumberTitleFont">热门景点TOP10</span>
            </el-col>
          </el-col>
          <el-col style="margin-top: 0rem;opacity: 0.5;font-size: .8rem;">
            <el-col :span="3">&nbsp;</el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="7">
              <span>景点名称</span>
            </el-col>
            <el-col :span="4">
              <span>实时热度</span>
            </el-col>
            <el-col :span="4">
              <span>热度变化率</span>
            </el-col>
            <el-col :span="5">
              <span>周边拥堵指数</span>
            </el-col>
          </el-col>
          <el-col v-for="(items, index) in scenicTop" :key="index + 'wewewe'" v-show="index < 10"
            style="margin-top: 15px;text-align: center;color: rgba(255,255,255,.5);" class="">
            <el-col :span="4" class="rect">
              <div style="width: 100%;height: 100%;text-align: center;background-color: rgba(23, 198, 237, .25);color: rgba(255,255,255,.5);">
                {{items.s_index}}
              </div>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="20" class="list-gradient">
              <el-col :span="10" class="list-item">
                <span class="list-num">{{items.s_name}}</span>
              </el-col>
              <el-col :span="5" class="list-item">
                <span class="list-num">{{items.s_heatVal}}</span>
              </el-col>
              <el-col :span="5" class="list-item">
                <span class="list-num">{{items.s_heatValStateVal}}%</span>
                <i v-if="items.s_heatValStateVal>0" class="rate-up"></i>
                <i v-if="items.s_heatValStateVal<0" class="rate-down"></i>
              </el-col>
              <el-col :span="4" class="list-item">
                <span class="list-num">{{items.s_congestionIndex}}</span>
              </el-col>
            </el-col>
          </el-col>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {BmlHeatmap} from 'vue-baidu-map'
import { selectJingqu, selectJT } from '../../api/heatmap.js'
import { getWeekDay } from '../../router/utils'
import MyOverlayJingqu from '../../components/overlay/ImgOverlayJingqu.vue'
import MyOverlayShuniu from '../../components/overlay/ImgOverlayShuniu.vue'
export default {
  name: 'Congestion',
  components: {
    BmlHeatmap,
    MyOverlayJingqu,
    MyOverlayShuniu
  },
  data () {
    return {
      heatMapDataShuniu: [],
      heatMapDataJingqu: [],
      markerPoint: {
        lng: 106.418261,
        lat: 39.921984
      },
      update_time: '10：00',
      // 热力地图数据
      heatMapData: [
        {lng: 116.418261, lat: 39.921984, count: 50},
        {lng: 116.423332, lat: 39.916532, count: 51},
        {lng: 116.419787, lat: 39.930658, count: 15}
      ],
      heatMapDataMax: 0,
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
          s_name: '测试名称',
          s_site: '河南省登封市',
          s_heatVal: '9034',
          s_heatValStateVal: '10.5',
          s_congestionIndex: '2.83',
          s_congestionIndexStateVal: '2,5'
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
          s_congestionIndexStateType: '2'
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
      nowWeek: getWeekDay(this.$moment().day()),
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
      ]
    }
  },
  mounted () {
    console.log('进入heatMap')
    this.initMapData()
  },
  methods: {
    // 修改是否显示实时拥堵或者拥堵预测
    updateMapType: function () {
      this.mapSelectType = !this.mapSelectType
    },
    // 百度地图被创建后的回调函数
    handler: function ({BMap, map}) {
      let isThis = this
      isThis.center.lng = 106.404
      isThis.center.lat = 35.915
      isThis.zoom = 5
    },
    draw: function ({el, BMap, map}) {
      const pixel = map.pointToOverlayPixel(new BMap.Point(116.404, 39.915))
      el.style.left = pixel.x - 60 + 'px'
      el.style.top = pixel.y - 20 + 'px'
    },
    initMapData: function () {
      let _this = this
      _this.heatMapData = []
      selectJingqu().then(request => {
        let requestDatas = request.data
        let requestScenicTop = []
        for (var i = 0; i < requestDatas.length; i++) {
          let requestData = requestDatas[i]
          let scenic = {}
          scenic.s_id = requestData.encrypted_name
          scenic.s_index = i + 1
          scenic.s_name = requestData.display_name
          scenic.s_site = ''
          scenic.s_heatVal = requestData.hot_value
          scenic.s_heatValStateVal = parseFloat(requestData.change_rate * 100).toFixed(1)
          scenic.s_congestionIndex = parseFloat(requestData.congest_index).toFixed(2)
          scenic.s_congestionIndexStateVal = parseFloat(requestData.change_rate2).toFixed(1)
          requestScenicTop[i] = scenic
          let location = requestData.location.split(',')
          let location1 = {
            'lng': parseFloat(location[0]) + 2.5,
            'lat': location[1],
            'count': requestData.hot_value,
            'name': requestData.display_name
          }
          if (i < 10) {
            _this.heatMapDataJingqu.push(location1)
          }
          // _this.heatMapData.push(location1)
          // if (_this.heatMapDataMax < requestData.hot_value) _this.heatMapDataMax = requestData.hot_value
          _this.update_time = requestData.update_time
        }
        _this.scenicTop = requestScenicTop
      }).catch(err => {
        _this.$message.error('数据添加失败了' + err)
      })

      selectJT().then(request => {
        let requestDatas = request.data
        let requestScenicTop = []
        for (var i = 0; i < requestDatas.length; i++) {
          let requestData = requestDatas[i]
          let traffic = {}
          traffic.t_id = requestData.encrypted_name
          traffic.t_index = i + 1
          traffic.t_name = requestData.display_name
          traffic.t_site = ''
          traffic.t_heatVal = requestData.hot_value
          traffic.t_heatValStateVal = parseFloat(requestData.change_rate * 100).toFixed(1)
          traffic.t_congestionIndex = parseFloat(requestData.congest_index).toFixed(2)
          traffic.t_congestionIndexStateVal = parseFloat(requestData.change_rate2).toFixed(1)
          requestScenicTop[i] = traffic
          let location = requestData.location.split(',')
          let location1 = {
            'lng': parseFloat(location[0]) + 2.5,
            'lat': location[1],
            'count': requestData.hot_value,
            'name': requestData.display_name
          }
          if (i < 10) {
            _this.heatMapDataShuniu.push(location1)
          }
          // _this.heatMapData.push(location1)
          // if (_this.heatMapDataMax < requestData.hot_value) _this.heatMapDataMax = requestData.hot_value
        }
        _this.trafficTop = requestScenicTop
      }).catch(err => {
        _this.$message.error('数据添加失败了' + err)
      })
    }
  }
}
</script>

<style scoped>
  .list-item{
    display: flex;
    align-items: center;
    padding-top: 12px;
    padding-left: 8px;
  }
  .list-num{
    height: 20px;
    line-height: 20px;
    font-size: 16px;
    font-weight: 500;
    color: #FFFFFF;
  }
  .list-item i{
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-left: 3px;
    /* padding-top: 3px; */
  }
  .list-item .rate-up{
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAU5JREFUWAntlM9qwkAQh3ckx4ok1p7EJ+mhN+kr9Un6JqU3D158ioJ4UpNQ6jGwnQEngcX9E3d66gRk4+zM58fPTYzRSxPQBDQBTUAsAbtYPNBHDIggkIKRWNN1H8SriuIVTqeLBFtEkOWsMc8khdCtlGS2oCvHqUlJZgn65CQl7xaMyUlJ3iWYKichOVpwrFyu5IQBKatPDgB27rxboyecXkPEcHtD35MFQ3Jg7dr9EapJSCYL1l33zu85liEBEqna9ptrvFLNJ0ks7outyYLY+IYH9ouBITnuuSVJDGJxT2wd9ZA0ZbnCFDcG4Ogmdy5L3Bqux7bt2Tg3swCfxtonLL6g+H7oDN/1kHDbsFtX1RLlfty/NSRI01fJ6bxpDgMtfjda0IeMCfrmYvXkMxgD/dW+CuYmqwlqgrkJ5M7rGcxNUOc1AU1AE/jvCfwCq6azc/YKnY8AAAAASUVORK5CYII=) no-repeat;
    background-size: contain;
  }
  .list-item .rate-down{
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAUhJREFUWAntljGKwkAUhicWVgvbGAuVBbe122YbL+AFPIPgPbyBhewNvIDYLWJjI2yRci+gnWgTotn8gcBb0HFe3hAUXmDITDL//775JwkxRg9NQBPQBDQBTUCSQCARU21zO03pePcx9uJdo6aP2FdA6a5ogpqgNAGpXp/ByhNs/3x13n9nr9zC0EDL1bG2uBXN3pJLvDodkiUHEnOhgRYeHEhnQBif4+Q7TU03a5+ukAUcNNDCgwPpDJgZT1CgWL0LJIUjOkBOivG9szNgox6OTGDW1NAGeQ0u12YeuRc1svRZv0S9aP6yj/cLk5o+9QwCswHsvWtYYFgPB1FveKRzbX0WIIxuQdqK5PdKwEHHBoSIDVkSrjQgC1IAJwJ0ghTCiQGtkB7gvABehfQE5w3wH2Q24H5KoK/kwNuNVkkxLaIJaAJPksAfA1zBDKq+YpwAAAAASUVORK5CYII=) no-repeat;
    background-size: contain;
  }
  .titleBgSelect1 {
    width: 100px;
    height: 33px;
    background: rgba(28, 204, 243, 0.4);
    border: 1px solid #1CCCF3;
    text-align: center;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #FFFFFF;
    line-height: 30px;
  }

  .titleBgSelect2 {
    width: 100px;
    height: 33px;
    border: 1px solid #1CCCF3;
    opacity: 0.5;
    text-align: center;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    opacity: 0.4;
    line-height: 30px;
  }
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
  .list-gradient{
    margin: 0;
    padding: 0;
    height: 60px;
    text-align: left;
    background: -moz-linear-gradient(top, rgba(23, 198, 237, .25) 0%, rgba(23, 198, 237, 0) 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(23, 198, 237, .25)), color-stop(100%,rgba(23, 198, 237, 0)));
    background: -webkit-linear-gradient(top, rgba(23, 198, 237, .25) 0%,rgba(23, 198, 237, 0) 100%);
    background: -o-linear-gradient(top, rgba(23, 198, 237, .25) 0%,rgba(23, 198, 237, 0) 100%);
    background: -ms-linear-gradient(top, rgba(23, 198, 237, .25) 0%,rgba(23, 198, 237, 0) 100%);
    background: linear-gradient(to bottom, rgba(23, 198, 237, .25) 0%,rgba(23, 198, 237, 0) 100%);
  }
</style>
