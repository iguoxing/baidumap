<template>
  <div style='padding: 0;margin: 0;height: 100%;width: 100%;'>
    <baidu-map id='container' class='Bmap' :center='center' :zoom='zoom' :scroll-wheel-zoom='true' :mapStyle='styleJson' @ready='handler'>
      <bm-boundary v-for="(items, index) in sites" :key="index" :name="items.val" :strokeWeight="2" strokeColor="rgba(255,255,255,1)" fillColor="#161736" />
      <!-- 百度地图拥堵路况叠加 <bm-traffic :predictDate="{weekday: 7, hour: 12}"></bm-traffic> -->
      <!-- 北京 :active="active"-->
        <my-overlay-chang v-for="(item, index) in heatMapDataChang" :key="index"
          :position="{lng: item.lng, lat: item.lat}"
          :val="item.rank"
          :num="index"
          @mouseover.native="active = true"
          @mouseleave.native="active = false">
        </my-overlay-chang>
        <my-overlay-huan v-for="(item, index) in heatMapDataHuan" :key="index"
          :position="{lng: item.lng, lat: item.lat}"
          :val="item.rank"
          :num="index"
          @mouseover.native="active = true"
          @mouseleave.native="active = false">
        </my-overlay-huan>
        <my-overlay-du v-for="(item, index) in heatMapDataDu" :key="index"
          :position="{lng: item.lng, lat: item.lat}"
          :val="item.rank"
          @mouseover.native="active = true"
          @mouseleave.native="active = false">
        </my-overlay-du>
        <my-overlay-yan v-for="(item, index) in heatMapDataYan" :key="index"
          :position="{lng: item.lng, lat: item.lat}"
          :val="item.rank"
          @mouseover.native="active = true"
          @mouseleave.native="active = false">
        </my-overlay-yan>
    </baidu-map>
    <div style="width: 100%;height: 100%;background-image: url(../../../static/img/bgImg.png);position: absolute;background-position: 100% 100%;background-size: 100% 100%;z-index: -9;"></div>
    <div style="height: 100%;color: #FFF;">
      <el-row style="height: 100%;" align="middle">
        <!-- -----------------左侧----------------- -->
        <el-col :span="6" style="height: 100%;padding-left: 3.125rem;">
          <!-- 顶部切换选择 -->
          <el-col style="padding-top: 2.5rem;padding-bottom: 2.5ren;" @click.native="updateMapType()">
          </el-col>
          <!-- --------------------------------拥堵高速公路TOP10 -->
          <!-- 拥堵高速公路TOP10的标题 -->
          <el-col style="padding-top: 2.8rem;text-align: left;">
            <el-col :span="4">
              <img src="../../../static/img/qushi@2x.png" style="height: 55px;"/>
            </el-col>
            <el-col :span="18">
              <span class="congestionNumberTitleFont">拥堵高速公路TOP30</span>
            </el-col>
          </el-col>
          <el-col style="margin-top: 0rem;opacity: 0.5;font-size: 0.8rem;text-align: center;">
            <el-col :span="4">&nbsp;</el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="7" style="text-align: left;">
              <span>路段</span>
            </el-col>
            <el-col :span="6">
              <span>拥堵里程</span>
            </el-col>
            <el-col :span="4">
              <span style="margin-left:15px">平均速度</span>
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
            <el-col :span="20" style="text-align: left;margin: 0;padding: 0;height: 65px;" class="gradient">
              <el-col :span="12" style="padding: 5px;">
                <el-col>
                  <span style="height: 16px;font-size: 16px;font-weight: 500;color: #FFFFFF;line-height: 18px;">{{items.t_name}}</span>
                </el-col>
                <el-col>
                  <span style="height: 12px;font-size: 12px;font-weight: 500;color: rgba(255,255,255,.5);line-height: 18px;o">
                    {{items.t_site}}
                  </span>
                </el-col>
              </el-col>
              <el-col :span="6" style="padding: 5px;">
                <el-col>
                  <span style="height: 16px;font-size: 16px;font-weight: 500;color: #FFFFFF;line-height: 18px;">{{items.t_length}}km</span>
                </el-col>
                <el-col>
                </el-col>
              </el-col>
              <el-col :span="6" style="padding: 5px;">
                <el-col>
                  <span style="height: 16px;font-size: 16px;font-weight: 500;color: #FFFFFF;line-height: 18px;">{{items.t_speed}}km/h</span>
                </el-col>
                <el-col>
                </el-col>
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
                全国实时拥堵状况
              </span>
            </div>
          </el-col>
          <!-- 下边小标题 -->
          <el-col style="text-align: center; display: none;">
            <div class="congestionSubheadBg">
              <el-col :span="4">
                &nbsp;
              </el-col>
              <el-col :span="16" style="padding: 0;margin: 0;">
                <span style="font-size: 18px;font-weight: bold;color: #1BCFF6;">
                  2020年06月01日
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  周六
                </span>
              </el-col>
              <el-col :span="4">
                &nbsp;
              </el-col>
            </div>
          </el-col>
          <el-col style="height: 73%;">&nbsp;</el-col>
          <el-col>&nbsp;</el-col>
          <el-col>
            <el-col :span="6" style="height: 45px;line-height: 45px;">
                <span style="width: 28px;height: 13px;font-size: 14px;font-family: PingFang SC;font-weight: 400;color: #18C7EE;line-height: 18px;"
                @click="selectCity = true">选择城市</span>
            </el-col>
            <el-col :span="16" style="height: 45px;line-height: 45px;">
              <el-col :span="6">
                <el-col class="dot-icon chang"></el-col>
                <span>畅通 [1.00～1.50)</span>
              </el-col>
              <el-col :span="6">
                <el-col class="dot-icon huan"></el-col>
                <span>缓行 [1.50～1.80)</span>
              </el-col>
              <el-col :span="6">
                <el-col class="dot-icon du"></el-col>
                <span>拥堵 [1.80～2.00)</span>
              </el-col>
              <el-col :span="6">
                <el-col class="dot-icon yandu"></el-col>
                <span>严重拥堵 [2.00～)</span>
              </el-col>
            </el-col>
          </el-col>
        </el-col>
        <!-- -----------------右侧----------------- -->
        <el-col :span="6" style="height: 100%;">
          <el-col style="margin-top: 4rem;font-size: 12px;font-weight: 400;color: #FFFFFF;line-height: 18px;opacity: 0.8;text-align: center;">
          </el-col>
          <el-col style="padding-top: 1.2rem;text-align: left;">
            <el-col :span="4">
              <img src="../../../static/img/top@2x.png" style="height: 55px;"/>
            </el-col>
            <el-col :span="18">
              <span class="congestionNumberTitleFont">拥堵城市TOP10</span>
            </el-col>
          </el-col>
          <el-col style="margin-top: 0rem;opacity: 0.5;font-size: .8rem;">
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="8">
              <span>拥堵城市</span>
            </el-col>
            <el-col :span="6">
              <span>拥堵指数</span>
            </el-col>
            <el-col :span="7">
              <span>较上周同期</span>
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
            <el-col :span="20" style="text-align: left;margin: 0;padding: 0;height: 65px;" class="gradient">
              <el-col :span="10" class="city-item">
                <span class="city-word">{{items.s_name}}</span>
              </el-col>
              <el-col :span="7" class="city-item">
                <span class="city-word">{{items.s_heatVal}}</span>
              </el-col>
              <el-col :span="7" class="city-item">
                <span class="city-word">{{items.s_heatValStateVal}}%</span>
                <i v-if="items.s_heatValStateVal>0" class="rate-up"></i>
                <i v-if="items.s_heatValStateVal<0" class="rate-down"></i>
              </el-col>
            </el-col>
          </el-col>
        </el-col>
      </el-row>
    </div>
    <el-dialog title="城市排行" :visible.sync="selectCity">
      <div style="text-align: center;font-size: 1.35rem;line-height: 4rem;height: 47rem;margin-top: -3.5rem;">
        <el-col :span="3">&nbsp;</el-col>
        <el-col :span="18" style="height: 100%;">
          <el-col>
            <el-col :span="12">
              <span>字母</span>
            </el-col>
            <el-col :span="12">
              <span>城市</span>
            </el-col>
          </el-col>
          <el-col v-for="(items,index) in city.cityList" :key="index" @click.native="ontoCityByListClick(items.ci_code)" class="">
            <el-col :span="12">
              <span>{{items.first}}</span>
            </el-col>
            <el-col :span="12">
              <span>{{items.ci_name}}</span>
            </el-col>
          </el-col>
        </el-col>
        <el-col style="text-align: center;margin-top: -2.5rem;">
          <el-col :span="12">
            <el-button style="background-color: #1E1E1E;font-size: 1.35rem;border: none;color: #1BCFF6;" @click="ontoLast(city.cityIndex)" :disabled="city.cityLastType">上一页</el-button>
          </el-col>
          <el-col :span="12">
            <el-button style="background-color: #1E1E1E;font-size: 1.35rem;border: none;color: #1BCFF6;" @click="ontoNext(city.cityIndex)" :disabled="city.cityNextType">下一页</el-button>
          </el-col>
        </el-col>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {BmlHeatmap} from 'vue-baidu-map'
import MyOverlay from '../../components/overlay/ImgOverlay.vue'
import MyOverlayChang from '../../components/overlay/ImgOverlayChang.vue'
import MyOverlayHuan from '../../components/overlay/ImgOverlayHuan.vue'
import MyOverlayDu from '../../components/overlay/ImgOverlayDu.vue'
import MyOverlayYan from '../../components/overlay/ImgOverlayYan.vue'
import { selectCS, selectGS } from '../../api/heatmap.js'
export default {
  name: 'Congestion',
  components: {
    BmlHeatmap,
    MyOverlay,
    MyOverlayChang,
    MyOverlayHuan,
    MyOverlayDu,
    MyOverlayYan
  },
  data () {
    return {
      allCities: [
        {
          'first': 'B',
          'ci_name': '保定',
          'ci_code': 307
        },
        {
          'first': 'B',
          'ci_name': '北京',
          'ci_code': 131
        },
        {
          'first': 'C',
          'ci_name': '潮州',
          'ci_code': 201
        },
        {
          'first': 'C',
          'ci_name': '沧州',
          'ci_code': 149
        },
        {
          'first': 'C',
          'ci_name': '成都',
          'ci_code': 75
        },
        {
          'first': 'C',
          'ci_name': '常州',
          'ci_code': 348
        },
        {
          'first': 'C',
          'ci_name': '长沙',
          'ci_code': 158
        },
        {
          'first': 'C',
          'ci_name': '重庆',
          'ci_code': 132
        },
        {
          'first': 'C',
          'ci_name': '长春',
          'ci_code': 53
        },
        {
          'first': 'D',
          'ci_name': '大同',
          'ci_code': 355
        },
        {
          'first': 'D',
          'ci_name': '大理',
          'ci_code': 111
        },
        {
          'first': 'D',
          'ci_name': '德州',
          'ci_code': 372
        },
        {
          'first': 'D',
          'ci_name': '东莞',
          'ci_code': 119
        },
        {
          'first': 'D',
          'ci_name': '大连',
          'ci_code': 167
        },
        {
          'first': 'F',
          'ci_name': '福州',
          'ci_code': 300
        },
        {
          'first': 'F',
          'ci_name': '佛山',
          'ci_code': 138
        },
        {
          'first': 'G',
          'ci_name': '广州',
          'ci_code': 257
        },
        {
          'first': 'G',
          'ci_name': '贵阳',
          'ci_code': 146
        },
        {
          'first': 'G',
          'ci_name': '桂林',
          'ci_code': 142
        },
        {
          'first': 'G',
          'ci_name': '赣州',
          'ci_code': 365
        },
        {
          'first': 'H',
          'ci_name': '湖州',
          'ci_code': 294
        },
        {
          'first': 'H',
          'ci_name': '呼和浩特',
          'ci_code': 321
        },
        {
          'first': 'H',
          'ci_name': '邯郸',
          'ci_code': 151
        },
        {
          'first': 'H',
          'ci_name': '衡阳',
          'ci_code': 159
        },
        {
          'first': 'H',
          'ci_name': '哈尔滨',
          'ci_code': 48
        },
        {
          'first': 'H',
          'ci_name': '海口',
          'ci_code': 125
        },
        {
          'first': 'H',
          'ci_name': '淮安',
          'ci_code': 162
        },
        {
          'first': 'H',
          'ci_name': '合肥',
          'ci_code': 127
        },
        {
          'first': 'H',
          'ci_name': '惠州',
          'ci_code': 301
        },
        {
          'first': 'H',
          'ci_name': '衡水',
          'ci_code': 208
        },
        {
          'first': 'H',
          'ci_name': '杭州',
          'ci_code': 179
        },
        {
          'first': 'J',
          'ci_name': '济宁',
          'ci_code': 286
        },
        {
          'first': 'J',
          'ci_name': '金华',
          'ci_code': 333
        },
        {
          'first': 'J',
          'ci_name': '江门',
          'ci_code': 302
        },
        {
          'first': 'J',
          'ci_name': '济南',
          'ci_code': 288
        },
        {
          'first': 'J',
          'ci_name': '嘉兴',
          'ci_code': 334
        },
        {
          'first': 'K',
          'ci_name': '昆明',
          'ci_code': 104
        },
        {
          'first': 'L',
          'ci_name': '兰州',
          'ci_code': 36
        },
        {
          'first': 'L',
          'ci_name': '乐山',
          'ci_code': 79
        },
        {
          'first': 'L',
          'ci_name': '连云港',
          'ci_code': 347
        },
        {
          'first': 'L',
          'ci_name': '拉萨',
          'ci_code': 100
        },
        {
          'first': 'L',
          'ci_name': '柳州',
          'ci_code': 305
        },
        {
          'first': 'L',
          'ci_name': '廊坊',
          'ci_code': 191
        },
        {
          'first': 'L',
          'ci_name': '洛阳',
          'ci_code': 153
        },
        {
          'first': 'L',
          'ci_name': '临沂',
          'ci_code': 234
        },
        {
          'first': 'M',
          'ci_name': '茂名',
          'ci_code': 139
        },
        {
          'first': 'M',
          'ci_name': '绵阳',
          'ci_code': 240
        },
        {
          'first': 'N',
          'ci_name': '南充',
          'ci_code': 291
        },
        {
          'first': 'N',
          'ci_name': '宁波',
          'ci_code': 180
        },
        {
          'first': 'N',
          'ci_name': '南宁',
          'ci_code': 261
        },
        {
          'first': 'N',
          'ci_name': '南昌',
          'ci_code': 163
        },
        {
          'first': 'N',
          'ci_name': '南阳',
          'ci_code': 309
        },
        {
          'first': 'N',
          'ci_name': '南通',
          'ci_code': 161
        },
        {
          'first': 'N',
          'ci_name': '南京',
          'ci_code': 315
        },
        {
          'first': 'Q',
          'ci_name': '泉州',
          'ci_code': 134
        },
        {
          'first': 'Q',
          'ci_name': '秦皇岛',
          'ci_code': 148
        },
        {
          'first': 'Q',
          'ci_name': '青岛',
          'ci_code': 236
        },
        {
          'first': 'Q',
          'ci_name': '清远',
          'ci_code': 197
        },
        {
          'first': 'S',
          'ci_name': '三亚',
          'ci_code': 121
        },
        {
          'first': 'S',
          'ci_name': '深圳',
          'ci_code': 340
        },
        {
          'first': 'S',
          'ci_name': '汕头',
          'ci_code': 303
        },
        {
          'first': 'S',
          'ci_name': '厦门',
          'ci_code': 194
        },
        {
          'first': 'S',
          'ci_name': '韶关',
          'ci_code': 137
        },
        {
          'first': 'S',
          'ci_name': '石家庄',
          'ci_code': 150
        },
        {
          'first': 'S',
          'ci_name': '上海',
          'ci_code': 289
        },
        {
          'first': 'S',
          'ci_name': '沈阳',
          'ci_code': 58
        },
        {
          'first': 'S',
          'ci_name': '苏州',
          'ci_code': 224
        },
        {
          'first': 'S',
          'ci_name': '绍兴',
          'ci_code': 293
        },
        {
          'first': 'T',
          'ci_name': '唐山',
          'ci_code': 265
        },
        {
          'first': 'T',
          'ci_name': '太原',
          'ci_code': 176
        },
        {
          'first': 'T',
          'ci_name': '泰安',
          'ci_code': 325
        },
        {
          'first': 'T',
          'ci_name': '天津',
          'ci_code': 332
        },
        {
          'first': 'T',
          'ci_name': '台州',
          'ci_code': 244
        },
        {
          'first': 'W',
          'ci_name': '潍坊',
          'ci_code': 287
        },
        {
          'first': 'W',
          'ci_name': '武汉',
          'ci_code': 218
        },
        {
          'first': 'W',
          'ci_name': '乌鲁木齐',
          'ci_code': 92
        },
        {
          'first': 'W',
          'ci_name': '温州',
          'ci_code': 178
        },
        {
          'first': 'W',
          'ci_name': '无锡',
          'ci_code': 317
        },
        {
          'first': 'X',
          'ci_name': '邢台',
          'ci_code': 266
        },
        {
          'first': 'X',
          'ci_name': '西宁',
          'ci_code': 66
        },
        {
          'first': 'X',
          'ci_name': '西安',
          'ci_code': 233
        },
        {
          'first': 'X',
          'ci_name': '徐州',
          'ci_code': 316
        },
        {
          'first': 'X',
          'ci_name': '新乡',
          'ci_code': 152
        },
        {
          'first': 'X',
          'ci_name': '咸阳',
          'ci_code': 323
        },
        {
          'first': 'Y',
          'ci_name': '云浮',
          'ci_code': 258
        },
        {
          'first': 'Y',
          'ci_name': '银川',
          'ci_code': 360
        },
        {
          'first': 'Y',
          'ci_name': '宜宾',
          'ci_code': 186
        },
        {
          'first': 'Y',
          'ci_name': '扬州',
          'ci_code': 346
        },
        {
          'first': 'Y',
          'ci_name': '阳泉',
          'ci_code': 357
        },
        {
          'first': 'Y',
          'ci_name': '烟台',
          'ci_code': 326
        },
        {
          'first': 'Y',
          'ci_name': '盐城',
          'ci_code': 223
        },
        {
          'first': 'Z',
          'ci_name': '郑州',
          'ci_code': 268
        },
        {
          'first': 'Z',
          'ci_name': '张家口',
          'ci_code': 264
        },
        {
          'first': 'Z',
          'ci_name': '湛江',
          'ci_code': 198
        },
        {
          'first': 'Z',
          'ci_name': '淄博',
          'ci_code': 354
        },
        {
          'first': 'Z',
          'ci_name': '漳州',
          'ci_code': 255
        },
        {
          'first': 'Z',
          'ci_name': '镇江',
          'ci_code': 160
        },
        {
          'first': 'Z',
          'ci_name': '肇庆',
          'ci_code': 338
        },
        {
          'first': 'Z',
          'ci_name': '中山',
          'ci_code': 187
        },
        {
          'first': 'Z',
          'ci_name': '珠海',
          'ci_code': 140
        }
      ],
      city: {
        cityIndex: 1,
        cityList: []
      },
      // 城市切换
      // selectCity: true,
      selectCity: false,
      heatMapDataMax: 0,
      heatMapData1: [],
      heatMapDataChang: [],
      heatMapDataHuan: [],
      heatMapDataDu: [],
      heatMapDataYan: [],
      heatMapDataMax1: 0,
      // 热力地图数据
      heatMapData: [
        {lng: 116.418261, lat: 39.921984, count: 50},
        {lng: 116.423332, lat: 39.916532, count: 51},
        {lng: 116.419787, lat: 39.930658, count: 15}
      ],
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
      // 拥堵高速数据
      trafficTop: [
        {
          t_id: '1',
          t_index: 1,
          t_name: '河南建国机场',
          t_site: '河南省登封市',
          t_length: '8034',
          t_speed: '10.5'
        }, {
          t_id: '2',
          t_index: 2,
          t_name: '北京首都国际机场',
          t_site: '北京市',
          t_length: '7854'
        }, {
          t_id: '3',
          t_index: 3,
          t_name: '济南市金融机场',
          t_site: '河南省登封市',
          t_length: '7209',
          t_speed: '10.5'
        }, {
          t_id: '4',
          t_index: 4,
          t_name: '西安机场',
          t_site: '西安省',
          t_length: '7109',
          t_speed: '10.5'
        }, {
          t_id: '5',
          t_index: 5,
          t_name: '西安机场',
          t_site: '西安省',
          t_length: '7109',
          t_speed: '10.5'
        }, {
          t_id: '6',
          t_index: 6,
          t_name: '西安机场',
          t_site: '西安省',
          t_length: '7109',
          t_speed: '10.5'
        }, {
          t_id: '7',
          t_index: 7,
          t_name: '西安机场',
          t_site: '西安省',
          t_length: '7109',
          t_speed: '10.5'
        }, {
          t_id: '8',
          t_index: 8,
          t_name: '西安机场',
          t_site: '西安省',
          t_length: '7109',
          t_speed: '10.5'
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
          s_heatValStateVal: '10.5'
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
      }
    }
  },
  mounted () {
    console.log('进入heatMap')
    this.initMapData()
    let _this = this
    setInterval(function () {
      _this.initMapData()
    }, 300000)
  },
  methods: {
    getCites (i) {
      this.city.cityList = this.allCities.slice(10 * (i - 1), 10 * i)
    },
    ontoCityByListClick (val) {
      console.info('--choose city start--')
      console.info(val)
      this.$router.push({
        path: '/congestionIndex',
        name: 'CongestionIndex',
        query: {
          code: val,
          zoom: 12
        }
      })
      console.info('--choose city endy--')
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
    handler: function ({BMap, map}) {
      let isThis = this
      // isThis.center.lng = 106.404
      // isThis.center.lat = 35.915
      var projection2 = map.getMapType().getProjection()
      var LngLat = projection2.pointToLngLat(new BMap.Pixel(11559238.56, 4525347.47))
      isThis.center.lng = LngLat.lng
      isThis.center.lat = LngLat.lat
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
      selectGS().then(request => {
        let requestDatas = request.data
        let requestScenicTop = []
        for (var i = 0; i < requestDatas.length; i++) {
          let requestData = requestDatas[i]
          let gaoSu = {}
          gaoSu.t_id = i
          gaoSu.t_index = i + 1
          gaoSu.t_name = requestData.roadname
          gaoSu.t_site = requestData.semantic
          gaoSu.t_length = parseFloat(requestData.congestLength).toFixed(2)
          gaoSu.t_speed = parseFloat(requestData.speed).toFixed(2)
          requestScenicTop[i] = gaoSu

          let location = requestData.location.split(',')
          let location1 = {
            'lng': parseFloat(location[0]) + 2.4,
            'lat': location[1] - 0.5,
            'count': requestData.congestLength / requestDatas[5].congestLength,
            'name': requestData.roadname
          }
          _this.heatMapData.push(location1)
          if (_this.heatMapDataMax < requestData.congestLength) _this.heatMapDataMax = requestData.congestLength
          _this.update_time = requestData.update_time
        }
        _this.trafficTop = requestScenicTop
      }).catch(err => {
        _this.$message.error('数据添加失败了' + err)
      })

      selectCS().then(request => {
        // debugger
        let requestDatas = request.data
        let requestScenicTop = []
        for (var i = 0; i < requestDatas.length; i++) {
          let requestData = requestDatas[i]
          let chengShi = {}
          // requestData.index = parseInt(requestData.index).toFixed(2)
          chengShi.s_id = i
          chengShi.s_index = i + 1
          chengShi.s_name = requestData.cityname
          chengShi.s_site = requestData.provincename
          chengShi.s_heatVal = requestData.index
          chengShi.s_heatValStateVal = requestData.week_rate * 100
          chengShi.s_heatValStateVal = chengShi.s_heatValStateVal.toFixed(2)
          requestScenicTop[i] = chengShi
          let location = requestData.city_coords.split(',')
          let location1 = {
            'lng': parseFloat(location[0]) / 120000 + 10,
            'lat': parseFloat(location[1]) / 128000 + 3.2,
            'count': requestData.index,
            'name': requestData.cityname,
            'rank': i < 5 ? (i + 1) : ''
          }
          // console.info(requestData.index >= 2)
          // 严重拥堵
          if (requestData.index >= 2) {
            _this.heatMapDataYan.push(location1)
          }
          // 拥堵
          if (requestData.index >= 1.8 && requestData.index < 2) {
            console.info(location1.rank)
            _this.heatMapDataDu.push(location1)
          }
          // 缓行
          if (requestData.index >= 1.5 && requestData.index < 1.8) {
            console.info(location1.rank)
            _this.heatMapDataHuan.push(location1)
          }
          // 畅通
          if (requestData.index >= 1 && requestData.index < 1.5) {
            _this.heatMapDataChang.push(location1)
          }
          _this.heatMapData1.push(location1)
          if (_this.heatMapDataMax1 < requestData.index) _this.heatMapDataMax1 = requestData.index
          _this.update_time = requestData.time
        }
        _this.scenicTop = requestScenicTop
      }).catch(err => {
        _this.$message.error('数据添加失败了' + err)
      })
      _this.getCites(_this.city.cityIndex)
    },
    // 显示上一页的菜单页面
    ontoLast: function (i) {
      let _this = this
      if (i > 1) {
        i -= 1
        _this.getCites(i)
      }
      _this.city.cityIndex = i
    },
    // 显示下一页的菜单
    ontoNext: function (i) {
      let _this = this
      if (i < 10) {
        i += 1
        _this.getCites(i)
      }
      _this.city.cityIndex = i
    }
  }
}
</script>

<style>
.el-dialog__titleP {color: #fff;}
.el-dialog__header {
    background-color: #031127ff !important;
    color: #1BCFF6 !important;
  }

  .el-dialog__body {
    background-color: #031127ff !important;
    color: #1BCFF6 !important;
  }

  .el-dialog__footer {
    background-color: #031127ff !important;
    color: #1BCFF6 !important;
  }
</style>

<style scoped>
  .dot-icon{
    margin-top: 18.5px;
    width: 8px;
    height: 8px;
    border: 4px solid;
  }
  .dot-icon.chang{border-color:#16ce95;background-color: #16ce95;}
  .dot-icon.huan{border-color:#f79d06;background-color: #f79d06;}
  .dot-icon.du{border-color:#ec1111;background-color: #ec1111;}
  .dot-icon.yandu{border-color:#b40100;background-color: #b40100;}
  .dot-type{
    margin-top: 16.5px;
    width: 10px;
    height: 10px;
    border: 5px solid #00acff;
    border-radius: 5px;
  }
  .city-item{
    display: flex;
    align-items: center;
    padding-top: 10px;
    padding-left: 5px;
  }
  .city-item i{
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-left: 3px;
    padding-top: 3px;
  }
  .city-item .rate-up{
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAU5JREFUWAntlM9qwkAQh3ckx4ok1p7EJ+mhN+kr9Un6JqU3D158ioJ4UpNQ6jGwnQEngcX9E3d66gRk4+zM58fPTYzRSxPQBDQBTUAsAbtYPNBHDIggkIKRWNN1H8SriuIVTqeLBFtEkOWsMc8khdCtlGS2oCvHqUlJZgn65CQl7xaMyUlJ3iWYKichOVpwrFyu5IQBKatPDgB27rxboyecXkPEcHtD35MFQ3Jg7dr9EapJSCYL1l33zu85liEBEqna9ptrvFLNJ0ks7outyYLY+IYH9ouBITnuuSVJDGJxT2wd9ZA0ZbnCFDcG4Ogmdy5L3Bqux7bt2Tg3swCfxtonLL6g+H7oDN/1kHDbsFtX1RLlfty/NSRI01fJ6bxpDgMtfjda0IeMCfrmYvXkMxgD/dW+CuYmqwlqgrkJ5M7rGcxNUOc1AU1AE/jvCfwCq6azc/YKnY8AAAAASUVORK5CYII=) no-repeat;
    background-size: contain;
  }
  .city-item .rate-down{
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAUhJREFUWAntljGKwkAUhicWVgvbGAuVBbe122YbL+AFPIPgPbyBhewNvIDYLWJjI2yRci+gnWgTotn8gcBb0HFe3hAUXmDITDL//775JwkxRg9NQBPQBDQBTUCSQCARU21zO03pePcx9uJdo6aP2FdA6a5ogpqgNAGpXp/ByhNs/3x13n9nr9zC0EDL1bG2uBXN3pJLvDodkiUHEnOhgRYeHEhnQBif4+Q7TU03a5+ukAUcNNDCgwPpDJgZT1CgWL0LJIUjOkBOivG9szNgox6OTGDW1NAGeQ0u12YeuRc1svRZv0S9aP6yj/cLk5o+9QwCswHsvWtYYFgPB1FveKRzbX0WIIxuQdqK5PdKwEHHBoSIDVkSrjQgC1IAJwJ0ghTCiQGtkB7gvABehfQE5w3wH2Q24H5KoK/kwNuNVkkxLaIJaAJPksAfA1zBDKq+YpwAAAAASUVORK5CYII=) no-repeat;
    background-size: contain;
  }
  .city-word{
    height: 20px;
    line-height: 18px;
    font-size: 16px;
    font-weight: 500;
    color: #FFFFFF;
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
  .gradient{
      background: -moz-linear-gradient(top, rgba(23, 198, 237, .25) 0%, rgba(23, 198, 237, 0) 100%);
      background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(23, 198, 237, .25)), color-stop(100%,rgba(23, 198, 237, 0)));
      background: -webkit-linear-gradient(top, rgba(23, 198, 237, .25) 0%,rgba(23, 198, 237, 0) 100%);
      background: -o-linear-gradient(top, rgba(23, 198, 237, .25) 0%,rgba(23, 198, 237, 0) 100%);
      background: -ms-linear-gradient(top, rgba(23, 198, 237, .25) 0%,rgba(23, 198, 237, 0) 100%);
      background: linear-gradient(to bottom, rgba(23, 198, 237, .25) 0%,rgba(23, 198, 237, 0) 100%);
  }
</style>
