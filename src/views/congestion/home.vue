<template>
  <div style='padding: 0;margin: 0;height: 100%;width: 100%;'>
  <div class="Bmap">
      <iframe :src="htmlSrc" :v-if="htmlShow" style="width: 100%;height: 100%;padding: 0;margin: 0;"></iframe>
    </div>
    <div style="width: 100%;height: 100%;background-image: url(../../../static/img/bgImg.png);position: absolute;background-position: 100% 100%;background-size: 100% 100%;z-index: -9;"></div>
    <div style="height: 100%;color: #FFF;">
      <el-row style="height: 100%;" align="middle">
        <!-- -----------------左侧----------------- -->
        <el-col :span="6" style="height: 100%;padding-left: 3.125rem;">
          <!-- 顶部切换选择 -->
          <el-col style="padding-top: 2.5rem;padding-bottom: 2.5ren;" @click.native="updateMapType()">
            <el-col :class="[mapSelectType  == true ? 'titleBgSelect1' : 'titleBgSelect2']">
              <span class="titleFontCss2">实时拥堵</span>
            </el-col>
            <el-col :class="[mapSelectType == true ? 'titleBgSelect2' : 'titleBgSelect1']">
              <span class="titleFontCss1">拥堵预测</span>
            </el-col>
          </el-col>
          <!-- --------------------------------实时拥堵 -->
          <el-col v-show="mapSelectType">
            <!-- ---------------实时拥堵指数 -->
            <!-- 拥堵指数的标题 -->
            <el-col style="padding-top: 2.8rem;text-align: left;">
              <el-col :span="4">
                <img src="../../../static/img/daolu.png" style="height: 55px;" />
              </el-col>
              <el-col :span="18">
                <span class="congestionNumberTitleFont">实时拥堵指数</span>
              </el-col>
            </el-col>
            <!-- 拥堵指数的具体数值 -->
            <el-col style="padding-top: 27.5px;">
              <el-col>
                <span class="congestionNumberFont" :style="{color: city.data.city_detail.color}">{{city.data.city_detail.index}}</span>
                <span class="congestionNumberSubheadFont" :style="{color: city.data.city_detail.color}">({{city.data.city_detail.colorType}})</span>
              </el-col>
              <el-col>
                <span style="width: 135px;height: 13px;font-size: 14px;font-family: PingFang SC;font-weight: 500;
                  color: #FFFFFF;line-height: 18px;opacity: 0.6;">
                  较上周同期:
                  <img src="../../../static/img/arrows.png" style="height: 14px;" />
                  {{city.data.city_detail.week_rate}}%
                </span>
              </el-col>
            </el-col>
            <!-- 拥堵指数的渐变色图表 -->
            <el-col style="margin-top: 10px;">
              <el-col :span="22" style="background-color: rgba(28, 55, 55, 0);padding-bottom: 0;margin-bottom: 0;">
                <!-- <div class="jianbianbejingcss bd1" :style="{width: city.data.city_detail.bar_width}">
                  &nbsp;
                </div> -->
                <i class="el-icon-caret-bottom" :style="{color: city.data.city_detail.linear_color,marginLeft: city.data.city_detail.bar_width}"></i>
              </el-col>
              <el-col :span="22" style="padding: 0;margin: 0;">
                <el-col style="width: 25%;background-color: rgba(0, 212, 146, 1);height: 3px;">&nbsp;</el-col>
                <el-col style="width: 25%;background-color: rgba(255, 152, 0, 1);height: 3px;">&nbsp;</el-col>
                <el-col style="width: 25%;background-color: rgba(232, 13, 13, 1);height: 3px;">&nbsp;</el-col>
                <el-col style="width: 25%;background-color: rgba(184, 0, 32, 1);height: 3px;">&nbsp;</el-col>
              </el-col>
              <el-col :span="22" style="text-align: left;height: 10px;font-size: 12px;font-family: PingFang SC;ont-weight: 400;color: #FFFFFF;line-height: 18px;opacity: 0.6;">
                <el-col style="width: 25%;">
                  <span>1.0</span>
                </el-col>
                <el-col style="width: 25%;margin-left: -6px;">
                  <span>1.5</span>
                </el-col>
                <el-col style="width: 25%;margin-left: -6px;">
                  <span>1.8</span>
                </el-col>
                <el-col style="width: 25%;margin-left: -6px;">
                  <span>2.0</span>
                </el-col>
              </el-col>
            </el-col>
            <!-- 拥堵数据 -->
            <el-col :span="22" style="margin-top: 15px;">
              <el-col style="width: 32%;">
                <span style="width: 55px;height: 13px;font-size: 14px;font-weight: 400;color: #FFFFFF;line-height: 18px;opacity: 0.6;">平均速度</span>
              </el-col>
              <el-col style="width: 32%;">
                <span style="width: 55px;height: 13px;font-size: 14px;font-weight: 400;color: #FFFFFF;line-height: 18px;opacity: 0.6;">近30天最拥堵日</span>
              </el-col>
              <el-col style="width: 35%;">
                <span style="width: 55px;height: 13px;font-size: 14px;font-weight: 400;color: #FFFFFF;line-height: 18px;opacity: 0.6;">近30天最拥堵日指数</span>
              </el-col>
              <el-col style="width: 32%;margin-top: 8px;">
                <span style="width: 99px;height: 17px;font-size: 18px;font-weight: 500;color: #FFFFFF;line-height: 18px;">2.3&nbsp;km/h</span>
              </el-col>
              <el-col style="width: 32%;margin-top: 8px;">
                <span style="width: 99px;height: 17px;font-size: 18px;font-weight: 500;color: #FFFFFF;line-height: 18px;">
                  {{city.data.city_detail.max_congest_day}}
                </span>
              </el-col>
              <el-col style="width: 35%;margin-top: 8px;">
                <span style="width: 99px;height: 17px;font-size: 18px;font-weight: 500;color: #FFFFFF;line-height: 18px;">
                  {{city.data.city_detail.max_index}}
                </span>
              </el-col>
            </el-col>
            <!-- ---------------当天拥堵指数趋势 折线图 -->
            <!-- 当天拥堵指数趋势的标题 -->
            <el-col style="padding-top: 2.8rem;text-align: left;">
              <el-col :span="4">
                <img src="../../../static/img/qushi@2x.png" style="height: 55px;" />
              </el-col>
              <el-col :span="18">
                <span class="congestionNumberTitleFont">当天拥堵指数趋势</span>
              </el-col>
            </el-col>
            <!-- 折线图 -->
            <el-col :span="22">
              <div id='congestionLineChart' style="width: 394px;height: 250px;margin-top: -2rem;"></div>
            </el-col>
            <!-- ---------------近七天拥堵指数 柱状图 -->
            <!-- 近七天拥堵指数的标题 -->
            <el-col style="padding-top: -3rem;text-align: left;">
              <el-col :span="4">
                <img src="../../../static/img/daolu@2x.png" style="height: 55px;" />
              </el-col>
              <el-col :span="18">
                <span class="congestionNumberTitleFont">近七天拥堵指数</span>
              </el-col>
            </el-col>
            <!-- 柱状图 -->
            <el-col :span="22">
              <div id='congestionHistogram' style="width: 394px;height: 250px;margin-top: 0rem;"></div>
            </el-col>
          </el-col>
          <!-- --------------------------------拥堵预测 -->
          <el-col v-show="!mapSelectType">
            <!-- ---------------明日24小时拥堵趋势预测 -->
            <!-- 明日24小时拥堵趋势预测的标题 -->
            <el-col style="padding-top: 2.8rem;text-align: left;">
              <el-col :span="4">
                <img src="../../../static/img/qushi@2x.png" style="height: 55px;" />
              </el-col>
              <el-col :span="18">
                <span class="congestionNumberTitleFont">明日24小时拥堵趋势预测</span>
              </el-col>
            </el-col>
            <!-- 折线图 -->
            <el-col :span="22">
              <div id='congestionForecastLineChart' style="width: 394px;height: 250px;margin-top: 0rem;"></div>
            </el-col>
            <!-- --------------未来一周每小时拥堵预测 -->
            <!-- 未来一周每小时拥堵预测的标题 -->
            <el-col style="padding-top: 2.8rem;text-align: left;">
              <el-col :span="4">
                <img src="../../../static/img/daolu@2x.png" style="height: 55px;" />
              </el-col>
              <el-col :span="20">
                <span class="congestionNumberTitleFont">未来一周每小时拥堵预测</span>
              </el-col>
            </el-col>
            <el-col>
              <el-col :span="3" style="text-align: right;padding-right: 2px;font-size: 10px;line-height: 12px;color: rgba(255,255,255,.5);">
                <el-col style="">
                  <span>周四</span><br />
                  <span>09/24</span>
                </el-col>
                <el-col>
                  &nbsp;<br />&nbsp;
                </el-col>
                <el-col>
                  <span>周二</span><br />
                  <span>09/22</span>
                </el-col>
                <el-col>
                  &nbsp;<br />&nbsp;
                </el-col>
                <el-col>
                  <span>周天</span><br />
                  <span>09/20</span>
                </el-col>
                <el-col>
                  &nbsp;<br />&nbsp;
                </el-col>
                <el-col>
                  <span>周五</span><br />
                  <span>09/18</span>
                </el-col>
              </el-col>
              <el-col :span="19" style="background-color: rgba(27,207,245,.2);">
                <el-col v-for="(items, index) in 7" :key="index + 'weilaiday'">
                  <el-col class="congestionForecastTableCSS" style="background-image: url(../../../static/image/highway1.png);"
                    v-for="(items,index) in 24" :key="index + 'weilaiyuce'">
                    &nbsp;
                    <!-- <img src="../../../static/image/highway0.png" style="width: 400%;height: 100%;"/> -->
                  </el-col>
                </el-col>
              </el-col>
            </el-col>
            <!-- --------------未来七天拥堵趋势预测 -->
            <!-- 未来七天拥堵趋势预测的标题 -->
            <el-col style="padding-top: 2.8rem;text-align: left;">
              <el-col :span="4">
                <img src="../../../static/img/形状587.png" style="height: 55px;" />
              </el-col>
              <el-col :span="20">
                <span class="congestionNumberTitleFont">未来七天拥堵趋势预测</span>
              </el-col>
            </el-col>
            <el-col>
              <div style="width: 394px;height: 250px;margin-top: 0rem;" id="CongestionTrendForecastForTheNextSevenDaysHistogram"></div>
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
                {{city.name}}实时路况
              </span>
            </div>
          </el-col>
          <!-- 下边小标题 -->
          <el-col style="text-align: center;">
            <div class="congestionSubheadBg" style="display: none;">
              <el-col :span="12" style="padding: 0;margin: 0;">
                <span style="font-size: 18px;font-weight: bold;color: #1BCFF6;line-height: 42px;">实时拥堵道路排行</span>
              </el-col>
              <el-col :span="12">
                <span style="font-size: 18px;font-weight: 500;color: #FFFFFF;line-height: 42px;opacity: 0.4;">实时拥堵行政区排行</span>
              </el-col>
            </div>
          </el-col>
          <el-col style="height: 78%;">&nbsp;</el-col>
          <el-col style="text-align: center;" v-show="false">
            <el-col style="width: 35%;">&nbsp;</el-col>
            <el-col style="width: 10%;height: 24px;border: 1px solid #1CCCF3;text-align: center;margin: 0 auto;">
              <span style="width: 48px;height: 12px;font-size: 12px;font-weight: 500;color: #1CD0F6;line-height: 18px;">全部道路</span>
            </el-col>
            <el-col style="width: 10%;height: 24px;border: 1px solid #1CCCF3;text-align: center;opacity: 0.4;margin: 0 auto;">
              <span style="width: 48px;height: 12px;font-size: 12px;font-weight: 500;color: #FFF;line-height: 18px;opacity: 0.6;">高速/快速路</span>
            </el-col>
            <el-col style="width: 10%;height: 24px;border: 1px solid #1CCCF3;text-align: center;opacity: 0.4;margin: 0 auto;">
              <span style="width: 48px;height: 12px;font-size: 12px;font-weight: 500;color: #FFF;line-height: 18px;opacity: 0.6;">普通道路</span>
            </el-col>
          </el-col>
          <el-col style="border: 1px solid rgba(255,255,255,.0);">
            &nbsp;
          </el-col>
          <el-col>
            <el-col :span="14" style="height: 45px;line-height: 45px;">
              <i class="el-icon-location-outline"></i>
              <span style="font-size: 14px;font-weight: 400;color: #FFFFFF;line-height: 18px;">当前城市：{{city.name}}</span>
              &nbsp;
              <span style="width: 28px;height: 13px;font-size: 14px;font-family: PingFang SC;font-weight: 400;color: #18C7EE;line-height: 18px;"
                @click="selectCity = true">切换</span>
            </el-col>
            <el-col :span="8" style="height: 45px;line-height: 45px;">
              <el-col :span="6">
                <el-col style="width: 8px;height: 8px;border: 4px solid #00D391;background-color: rgba(34, 65, 255, 1);margin-top: 18.5px;"></el-col>
                <span>畅通</span>
              </el-col>
              <el-col :span="6">
                <el-col style="width: 8px;height: 8px;border: 4px solid rgba(255, 152, 0, 1);background-color: rgba(255, 152, 0, 1);margin-top: 18.5px;"></el-col>
                <span>缓行</span>
              </el-col>
              <el-col :span="6">
                <el-col style="width: 8px;height: 8px;border: 4px solid rgba(232, 13, 13, 1);background-color: rgba(232, 13, 13, 1);margin-top: 18.5px;"></el-col>
                <span>拥堵</span>
              </el-col>
              <el-col :span="6">
                <el-col style="width: 8px;height: 8px;border: 4px solid rgba(183, 0, 31, 1);background-color: rgba(255, 30, 31, 1);margin-top: 18.5px;"></el-col>
                <span>严重拥堵</span>
              </el-col>
            </el-col>
          </el-col>
        </el-col>
        <!-- -----------------右侧----------------- -->
        <el-col :span="6" style="height: 100%;">
          <el-col style="margin-top: 4rem;font-size: 12px;font-weight: 400color: rgba(0,0,0,0);line-height: 18px;opacity: 0.8;text-align: center;">
            <el-col :span="12">
              <!-- <i class="el-icon-success" style="color: rgba(29, 206, 246, 0);"></i>
              <span>每个五分钟更新一次</span> -->
            </el-col>
            <el-col :span="12">
              <!-- <i class="el-icon-refresh"></i>
              <span>最后一次更新于10：00</span> -->
            </el-col>
          </el-col>
          <el-col style="padding-left: 2rem;" v-show="mapSelectType">
            <!-- --------------------实时拥堵里程 -->
            <!-- 实时拥堵里程的标题 -->
            <el-col style="padding-top: 2.8rem;text-align: left;">
              <el-col :span="4">
                <img src="../../../static/img/licheng@2x.png" style="height: 55px;" />
              </el-col>
              <el-col :span="18">
                <span class="congestionNumberTitleFont">实时拥堵里程</span>
              </el-col>
            </el-col>
            <!-- 柱状图 -->
            <el-col :span="10" style="height: .8rem;font-size: .7rem;line-height: .8rem;margin-top: 2rem;color: rgba(255,255,255,.8);">
              <span>&nbsp;&nbsp;&nbsp;km/h</span>
            </el-col>
            <el-col :span="14" style="height: .8rem;font-size: .7rem;line-height: .8rem;margin-top: 2rem;color: rgba(255,255,255,.8);">
              <el-col :span="1">
                <el-col :span="8" style="background-color: #aa001f;height: .7rem;" >&nbsp;</el-col>
                <el-col :span="8" style="background-color: #FF1D1D;height: .7rem;">&nbsp;</el-col>
                <el-col :span="8" style="background-color: coral;height: .7rem;">&nbsp;</el-col>
              </el-col>
              <el-col :span="6" class="">
                当前值
              </el-col>
              <el-col :span="1" style="background-color: #00ACFF;height: .7rem;" >&nbsp;</el-col>
              <el-col :span="6" class="">
                通勤日均值
              </el-col>
            </el-col>
            <el-col>
              <div id='congestionMileageHistogram' style="width: 394px;height: 250px;margin-top: -2.5rem;"></div>
            </el-col>
            <!-- --------------------实际道路拥堵TOP10 -->
            <!-- 实际道路拥堵TOP10的标题 -->
            <el-col style="padding-top: 0rem;text-align: left;">
              <el-col :span="4">
                <img src="../../../static/img/top@2x.png" style="height: 55px;" />
              </el-col>
              <el-col :span="18">
                <span class="congestionNumberTitleFont">实际道路拥堵TOP5</span>
              </el-col>
            </el-col>
            <el-col>
              <swiper ref="mySwiper" :options="swiperOptions" style="width: 100%;margin-top: 1rem;">
                <swiper-slide class="swiperListCss" v-for="(items,index) in 2" :key="index">
                  <el-col style="margin-top: 0rem;opacity: 0.5;">
                    <el-col :span="4">&nbsp;</el-col>
                    <el-col :span="1">&nbsp;</el-col>
                    <el-col :span="9">
                      <span>道路名称</span>
                    </el-col>
                    <el-col :span="5">
                      <span>拥堵指数</span>
                    </el-col>
                    <el-col :span="5">
                      <span>平均速度</span>
                    </el-col>
                  </el-col>
                  <el-col v-for="(items, index1) in city.data.city_roadrank.road0" :key="index1 + 'wewewe1'" v-show="index1 < 5"
                    style="margin-top: 15px;text-align: center;color: rgba(255,255,255,.5);">
                    <el-col :span="4" class="rect">
                      <div style="width: 100%;height: 100%;text-align: center;background-color: rgba(23, 198, 237, .25);color: rgba(255,255,255,.5);">
                        {{index1 +1}}
                      </div>
                    </el-col>
                    <el-col :span="1">&nbsp;</el-col>
                    <el-col :span="20" style="text-align: left;margin: 0;padding: 0;height: 65px;" class="gradient">
                      <el-col :span="14" style="padding: 5px;">
                        <el-col>
                          <span style="height: 16px;font-size: 16px;font-weight: 500;color: #FFFFFF;line-height: 18px;">
                            {{items.roadname}}
                          </span>
                        </el-col>
                        <el-col>
                          <span style="height: 12px;font-size: 12px;font-weight: 500;color: rgba(255,255,255,.5);line-height: 18px;o">
                            {{items.semantic}}
                          </span>
                        </el-col>
                      </el-col>
                      <el-col :span="5">
                        <span style="line-height: 40px;color: rgba(166, 0, 0, 0.8);font-weight: 700;">{{items.index}}</span>
                      </el-col>
                      <el-col :span="5">
                        <span style="height: 14px;font-size: 16px;font-weight: 500;color: #FFFFFF;line-height: 40px;">{{items.speed}}km/h</span>
                      </el-col>
                    </el-col>
                  </el-col>
                </swiper-slide>
              </swiper>
            </el-col>

          </el-col>
          <el-col style="padding-left: 2rem;" v-show="!mapSelectType">
            <el-col style="padding-top: 2.8rem;text-align: left;">
              <el-col :span="4">
                <img src="../../../static/img/top@2x.png" style="height: 55px;" />
              </el-col>
              <el-col :span="18">
                <span class="congestionNumberTitleFont">明日拥堵路段预测TOP10</span>
              </el-col>
            </el-col>
            <el-col style="margin-top: 0rem;opacity: 0.5;">
              <el-col :span="4">&nbsp;</el-col>
              <el-col :span="1">&nbsp;</el-col>
              <el-col :span="9">
                <span>道路名称</span>
              </el-col>
              <el-col :span="5">
                <span>拥堵指数</span>
              </el-col>
              <el-col :span="5">
                <span>平均速度</span>
              </el-col>
            </el-col>
            <el-col v-for="(items, index) in 10" :key="index + 'wewewe'" style="margin-top: 15px;text-align: center;color: rgba(255,255,255,.5);"
              class="">
              <el-col :span="4" class="rect">
                <div style="width: 100%;height: 100%;text-align: center;background-color: rgba(23, 198, 237, .25);color: rgba(255,255,255,.5);">
                  {{index + 1}}
                </div>
              </el-col>
              <el-col :span="1">&nbsp;</el-col>
              <el-col :span="20" style="text-align: left;margin: 0;padding: 0;height: 65px;" class="gradient">
                <el-col :span="14" style="padding: 5px;">
                  <el-col>
                    <span style="height: 16px;font-size: 16px;font-weight: 500;color: #FFFFFF;line-height: 18px;">东三环中路</span>
                  </el-col>
                  <el-col>
                    <span style="height: 12px;font-size: 12px;font-weight: 500;color: rgba(255,255,255,.5);line-height: 18px;o">
                      从双金桥到金官桥，西向东
                    </span>
                  </el-col>
                </el-col>
                <el-col :span="5">
                  <span style="line-height: 40px;">2.53</span>
                </el-col>
                <el-col :span="5">
                  <span style="height: 14px;font-size: 16px;font-weight: 500;color: #FFFFFF;line-height: 40px;">8.32km/h</span>
                </el-col>
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
            <!-- <el-col :span="6">
              <span>拥堵指数</span>
            </el-col>
            <el-col :span="6">
              <span>往期拥堵指数</span>
            </el-col> -->
          </el-col>
          <el-col v-for="(items,index) in city.cityList" :key="index" @click.native="ontoCityByListClick(items.items.ci_code)" class="">
            <!-- <el-col :span="8">
              <span>{{index}}</span>
            </el-col> -->
            <el-col :span="12">
              <span>{{items.first}}</span>
            </el-col>
            <el-col :span="12">
              <span>{{items.ci_name}}</span>
            </el-col>
            <!-- <el-col :span="6">
              <span>{{items.ci_index}}</span>
            </el-col>
            <el-col :span="6">
              <span>{{items.ci_lastIndex}}</span>
            </el-col> -->
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
import { selectByCityCode, selectCityPushByCityCode, selectCityJBByCode } from '../../api/city.js'
export default {
  name: 'Congestion',
  data () {
    return {
      htmlShow: false,
      htmlSrc: 'http://127.0.0.1:8848/BaiduMap/static/zhihui.html?lng=113.305001&lat=23.303003&cityCode=257',
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
        cityList: [],
        cityIndex: 1,
        citypage: 0,
        cityLastType: false,
        cityNextType: false,
        coods: {
          lng: 12959238.56,
          lat: 4825347.47
        },
        code: 131,
        name: '北京',
        updateTime: '2020-12-14 11:41:44',
        data: {
          // 拥堵细节
          'city_detail': {
            // 拥堵指数
            'index': '1.53',
            // 往期拥堵指数
            'last_index': '1.53',
            // 上升下降趋势
            'week_rate': 0,
            // 近三十天最拥堵的日期
            'max_congest_day': '20201207',
            // 近三十天最拥堵的周几
            'max_week_day': '1',
            // 近三十天最拥堵的指数
            'max_index': '2.50',
            // 拥堵的颜色
            'color': 'rgba(255, 152, 0, 1)',
            // 拥堵条的背景颜色
            'linear_color': '#00d492',
            // 拥堵状态
            'colorType': '缓行',
            // 拥堵条的长度
            'bar_width': '50%'
          },
          // 拥堵曲线数据
          'city_curve': {
            // 同期的天数
            'curve_day': [
              {
                'index': '2.50',
                'speed': '20.42',
                'time': '12-07'
              },
              {
                'index': '2.12',
                'speed': '23.87',
                'time': '12-08'
              },
              {
                'index': '2.07',
                'speed': '24.34',
                'time': '12-09'
              },
              {
                'index': '2.20',
                'speed': '23.01',
                'time': '12-10'
              },
              {
                'index': '2.30',
                'speed': '22.36',
                'time': '12-11'
              },
              {
                'index': '1.56',
                'speed': '35.54',
                'time': '12-12'
              },
              {
                'index': '1.38',
                'speed': '38.77',
                'time': '12-13'
              }
            ],
            // 一天的分钟级数据
            'curve_minute': [
              {
                'index': '1.63',
                'speed': '30.62',
                'time': '16:35'
              },
              {
                'index': '1.62',
                'speed': '30.77',
                'time': '16:40'
              },
              {
                'index': '1.65',
                'speed': '30.35',
                'time': '16:45'
              },
              {
                'index': '1.67',
                'speed': '29.95',
                'time': '16:50'
              },
              {
                'index': '1.69',
                'speed': '29.54',
                'time': '16:55'
              },
              {
                'index': '1.73',
                'speed': '28.86',
                'time': '17:00'
              },
              {
                'index': '1.77',
                'speed': '28.22',
                'time': '17:05'
              },
              {
                'index': '1.79',
                'speed': '27.95',
                'time': '17:10'
              },
              {
                'index': '1.81',
                'speed': '27.64',
                'time': '17:15'
              },
              {
                'index': '1.83',
                'speed': '27.23',
                'time': '17:20'
              },
              {
                'index': '1.87',
                'speed': '26.78',
                'time': '17:25'
              },
              {
                'index': '1.87',
                'speed': '26.70',
                'time': '17:30'
              },
              {
                'index': '1.85',
                'speed': '26.95',
                'time': '17:35'
              },
              {
                'index': '1.84',
                'speed': '27.12',
                'time': '17:40'
              },
              {
                'index': '1.86',
                'speed': '26.84',
                'time': '17:45'
              },
              {
                'index': '1.85',
                'speed': '27.05',
                'time': '17:50'
              },
              {
                'index': '1.77',
                'speed': '28.18',
                'time': '17:55'
              },
              {
                'index': '1.78',
                'speed': '28.13',
                'time': '18:00'
              },
              {
                'index': '1.75',
                'speed': '28.60',
                'time': '18:05'
              },
              {
                'index': '1.73',
                'speed': '28.96',
                'time': '18:10'
              },
              {
                'index': '1.69',
                'speed': '29.49',
                'time': '18:15'
              },
              {
                'index': '1.66',
                'speed': '30.19',
                'time': '18:20'
              },
              {
                'index': '1.62',
                'speed': '30.82',
                'time': '18:25'
              },
              {
                'index': '1.59',
                'speed': '31.47',
                'time': '18:30'
              },
              {
                'index': '1.55',
                'speed': '32.26',
                'time': '18:35'
              },
              {
                'index': '1.51',
                'speed': '33.01',
                'time': '18:40'
              },
              {
                'index': '1.48',
                'speed': '33.79',
                'time': '18:45'
              },
              {
                'index': '1.47',
                'speed': '33.96',
                'time': '18:50'
              },
              {
                'index': '1.45',
                'speed': '34.39',
                'time': '18:55'
              },
              {
                'index': '1.41',
                'speed': '35.31',
                'time': '19:00'
              },
              {
                'index': '1.36',
                'speed': '36.75',
                'time': '19:05'
              },
              {
                'index': '1.33',
                'speed': '37.37',
                'time': '19:10'
              },
              {
                'index': '1.30',
                'speed': '38.27',
                'time': '19:15'
              },
              {
                'index': '1.29',
                'speed': '38.69',
                'time': '19:20'
              },
              {
                'index': '1.26',
                'speed': '39.51',
                'time': '19:25'
              },
              {
                'index': '1.25',
                'speed': '39.77',
                'time': '19:30'
              },
              {
                'index': '1.24',
                'speed': '40.11',
                'time': '19:35'
              },
              {
                'index': '1.24',
                'speed': '40.30',
                'time': '19:40'
              },
              {
                'index': '1.23',
                'speed': '40.48',
                'time': '19:45'
              },
              {
                'index': '1.23',
                'speed': '40.75',
                'time': '19:50'
              },
              {
                'index': '1.22',
                'speed': '40.99',
                'time': '19:55'
              },
              {
                'index': '1.21',
                'speed': '41.42',
                'time': '20:00'
              },
              {
                'index': '1.21',
                'speed': '41.14',
                'time': '20:05'
              },
              {
                'index': '1.22',
                'speed': '40.90',
                'time': '20:10'
              },
              {
                'index': '1.22',
                'speed': '40.90',
                'time': '20:15'
              },
              {
                'index': '1.20',
                'speed': '41.57',
                'time': '20:20'
              },
              {
                'index': '1.20',
                'speed': '41.69',
                'time': '20:25'
              },
              {
                'index': '1.20',
                'speed': '41.50',
                'time': '20:30'
              },
              {
                'index': '1.20',
                'speed': '41.54',
                'time': '20:35'
              },
              {
                'index': '1.20',
                'speed': '41.73',
                'time': '20:40'
              },
              {
                'index': '1.19',
                'speed': '41.92',
                'time': '20:45'
              },
              {
                'index': '1.19',
                'speed': '42.03',
                'time': '20:50'
              },
              {
                'index': '1.18',
                'speed': '42.46',
                'time': '20:55'
              },
              {
                'index': '1.16',
                'speed': '42.86',
                'time': '21:00'
              },
              {
                'index': '1.16',
                'speed': '43.06',
                'time': '21:05'
              },
              {
                'index': '1.16',
                'speed': '42.96',
                'time': '21:10'
              },
              {
                'index': '1.16',
                'speed': '43.15',
                'time': '21:15'
              },
              {
                'index': '1.15',
                'speed': '43.53',
                'time': '21:20'
              },
              {
                'index': '1.14',
                'speed': '43.66',
                'time': '21:25'
              },
              {
                'index': '1.14',
                'speed': '43.85',
                'time': '21:30'
              },
              {
                'index': '1.13',
                'speed': '44.07',
                'time': '21:35'
              },
              {
                'index': '1.12',
                'speed': '44.49',
                'time': '21:40'
              },
              {
                'index': '1.11',
                'speed': '44.78',
                'time': '21:45'
              },
              {
                'index': '1.11',
                'speed': '45.01',
                'time': '21:50'
              },
              {
                'index': '1.11',
                'speed': '45.07',
                'time': '21:55'
              },
              {
                'index': '1.09',
                'speed': '45.57',
                'time': '22:00'
              },
              {
                'index': '1.09',
                'speed': '45.79',
                'time': '22:05'
              },
              {
                'index': '1.09',
                'speed': '45.94',
                'time': '22:10'
              },
              {
                'index': '1.08',
                'speed': '46.21',
                'time': '22:15'
              },
              {
                'index': '1.08',
                'speed': '46.39',
                'time': '22:20'
              },
              {
                'index': '1.07',
                'speed': '46.53',
                'time': '22:25'
              },
              {
                'index': '1.07',
                'speed': '46.65',
                'time': '22:30'
              },
              {
                'index': '1.07',
                'speed': '46.80',
                'time': '22:35'
              },
              {
                'index': '1.06',
                'speed': '47.13',
                'time': '22:40'
              },
              {
                'index': '1.06',
                'speed': '47.26',
                'time': '22:45'
              },
              {
                'index': '1.05',
                'speed': '47.30',
                'time': '22:50'
              },
              {
                'index': '1.05',
                'speed': '47.36',
                'time': '22:55'
              },
              {
                'index': '1.05',
                'speed': '47.30',
                'time': '23:00'
              },
              {
                'index': '1.06',
                'speed': '47.21',
                'time': '23:05'
              },
              {
                'index': '1.06',
                'speed': '47.24',
                'time': '23:10'
              },
              {
                'index': '1.06',
                'speed': '47.03',
                'time': '23:15'
              },
              {
                'index': '1.05',
                'speed': '47.35',
                'time': '23:20'
              },
              {
                'index': '1.04',
                'speed': '47.74',
                'time': '23:25'
              },
              {
                'index': '1.04',
                'speed': '48.08',
                'time': '23:30'
              },
              {
                'index': '1.03',
                'speed': '48.28',
                'time': '23:35'
              },
              {
                'index': '1.03',
                'speed': '48.54',
                'time': '23:40'
              },
              {
                'index': '1.02',
                'speed': '48.73',
                'time': '23:45'
              },
              {
                'index': '1.02',
                'speed': '48.95',
                'time': '23:50'
              },
              {
                'index': '1.02',
                'speed': '49.04',
                'time': '23:55'
              },
              {
                'index': '1.00',
                'speed': '50.08',
                'time': '00:00'
              },
              {
                'index': '1.00',
                'speed': '49.99',
                'time': '00:05'
              },
              {
                'index': '1.00',
                'speed': '49.96',
                'time': '00:10'
              },
              {
                'index': '1.00',
                'speed': '49.94',
                'time': '00:15'
              },
              {
                'index': '1.00',
                'speed': '49.95',
                'time': '00:20'
              },
              {
                'index': '1.00',
                'speed': '50.05',
                'time': '00:25'
              },
              {
                'index': '0.99',
                'speed': '50.14',
                'time': '00:30'
              },
              {
                'index': '0.99',
                'speed': '50.26',
                'time': '00:35'
              },
              {
                'index': '0.99',
                'speed': '50.28',
                'time': '00:40'
              },
              {
                'index': '0.99',
                'speed': '50.29',
                'time': '00:45'
              },
              {
                'index': '0.99',
                'speed': '50.41',
                'time': '00:50'
              },
              {
                'index': '0.99',
                'speed': '50.54',
                'time': '00:55'
              },
              {
                'index': '0.97',
                'speed': '51.45',
                'time': '01:00'
              },
              {
                'index': '0.97',
                'speed': '51.62',
                'time': '01:05'
              },
              {
                'index': '0.97',
                'speed': '51.63',
                'time': '01:10'
              },
              {
                'index': '0.96',
                'speed': '51.76',
                'time': '01:15'
              },
              {
                'index': '0.96',
                'speed': '51.69',
                'time': '01:20'
              },
              {
                'index': '0.97',
                'speed': '51.64',
                'time': '01:25'
              },
              {
                'index': '0.97',
                'speed': '51.40',
                'time': '01:30'
              },
              {
                'index': '0.97',
                'speed': '51.63',
                'time': '01:35'
              },
              {
                'index': '0.96',
                'speed': '51.75',
                'time': '01:40'
              },
              {
                'index': '0.97',
                'speed': '51.44',
                'time': '01:45'
              },
              {
                'index': '0.97',
                'speed': '51.64',
                'time': '01:50'
              },
              {
                'index': '0.96',
                'speed': '51.77',
                'time': '01:55'
              },
              {
                'index': '0.96',
                'speed': '52.21',
                'time': '02:00'
              },
              {
                'index': '0.96',
                'speed': '52.11',
                'time': '02:05'
              },
              {
                'index': '0.95',
                'speed': '52.25',
                'time': '02:10'
              },
              {
                'index': '0.95',
                'speed': '52.39',
                'time': '02:15'
              },
              {
                'index': '0.96',
                'speed': '52.06',
                'time': '02:20'
              },
              {
                'index': '0.95',
                'speed': '52.28',
                'time': '02:25'
              },
              {
                'index': '0.95',
                'speed': '52.65',
                'time': '02:30'
              },
              {
                'index': 0.95,
                'speed': '52.89',
                'time': '02:35'
              },
              {
                'index': 0.95,
                'speed': '52.82',
                'time': '02:40'
              },
              {
                'index': '0.95',
                'speed': '52.70',
                'time': '02:45'
              },
              {
                'index': 0.95,
                'speed': '52.79',
                'time': '02:50'
              },
              {
                'index': 0.95,
                'speed': '53.13',
                'time': '02:55'
              },
              {
                'index': 0.95,
                'speed': '54.21',
                'time': '03:00'
              },
              {
                'index': 0.95,
                'speed': '53.88',
                'time': '03:05'
              },
              {
                'index': 0.95,
                'speed': '54.00',
                'time': '03:10'
              },
              {
                'index': 0.95,
                'speed': '54.21',
                'time': '03:15'
              },
              {
                'index': 0.95,
                'speed': '54.62',
                'time': '03:20'
              },
              {
                'index': 0.95,
                'speed': '54.57',
                'time': '03:25'
              },
              {
                'index': 0.95,
                'speed': '54.36',
                'time': '03:30'
              },
              {
                'index': 0.95,
                'speed': '54.79',
                'time': '03:35'
              },
              {
                'index': 0.95,
                'speed': '54.51',
                'time': '03:40'
              },
              {
                'index': 0.95,
                'speed': '55.27',
                'time': '03:45'
              },
              {
                'index': 0.95,
                'speed': '55.13',
                'time': '03:50'
              },
              {
                'index': 0.95,
                'speed': '55.10',
                'time': '03:55'
              },
              {
                'index': 0.95,
                'speed': '57.37',
                'time': '04:00'
              },
              {
                'index': 0.95,
                'speed': '57.52',
                'time': '04:05'
              },
              {
                'index': 0.95,
                'speed': '57.77',
                'time': '04:10'
              },
              {
                'index': 0.95,
                'speed': '57.95',
                'time': '04:15'
              },
              {
                'index': 0.95,
                'speed': '58.12',
                'time': '04:20'
              },
              {
                'index': 0.95,
                'speed': '58.18',
                'time': '04:25'
              },
              {
                'index': 0.95,
                'speed': '58.04',
                'time': '04:30'
              },
              {
                'index': 0.95,
                'speed': '57.94',
                'time': '04:35'
              },
              {
                'index': 0.95,
                'speed': '57.91',
                'time': '04:40'
              },
              {
                'index': 0.95,
                'speed': '57.79',
                'time': '04:45'
              },
              {
                'index': 0.95,
                'speed': '57.85',
                'time': '04:50'
              },
              {
                'index': 0.95,
                'speed': '57.71',
                'time': '04:55'
              },
              {
                'index': 0.95,
                'speed': '59.04',
                'time': '05:00'
              },
              {
                'index': 0.95,
                'speed': '59.08',
                'time': '05:05'
              },
              {
                'index': 0.95,
                'speed': '58.82',
                'time': '05:10'
              },
              {
                'index': 0.95,
                'speed': '58.75',
                'time': '05:15'
              },
              {
                'index': 0.95,
                'speed': '58.79',
                'time': '05:20'
              },
              {
                'index': 0.95,
                'speed': '58.76',
                'time': '05:25'
              },
              {
                'index': 0.95,
                'speed': '58.45',
                'time': '05:30'
              },
              {
                'index': 0.95,
                'speed': '58.12',
                'time': '05:35'
              },
              {
                'index': 0.95,
                'speed': '57.69',
                'time': '05:40'
              },
              {
                'index': 0.95,
                'speed': '57.35',
                'time': '05:45'
              },
              {
                'index': 0.95,
                'speed': '56.55',
                'time': '05:50'
              },
              {
                'index': 0.95,
                'speed': '55.79',
                'time': '05:55'
              },
              {
                'index': '0.98',
                'speed': '51.09',
                'time': '06:00'
              },
              {
                'index': '1.00',
                'speed': '49.94',
                'time': '06:05'
              },
              {
                'index': '1.03',
                'speed': '48.38',
                'time': '06:10'
              },
              {
                'index': '1.08',
                'speed': '46.37',
                'time': '06:15'
              },
              {
                'index': '1.13',
                'speed': '44.01',
                'time': '06:20'
              },
              {
                'index': '1.21',
                'speed': '41.17',
                'time': '06:25'
              },
              {
                'index': '1.31',
                'speed': '38.08',
                'time': '06:30'
              },
              {
                'index': '1.42',
                'speed': '35.16',
                'time': '06:35'
              },
              {
                'index': '1.53',
                'speed': '32.55',
                'time': '06:40'
              },
              {
                'index': '1.65',
                'speed': '30.22',
                'time': '06:45'
              },
              {
                'index': '1.78',
                'speed': '28.01',
                'time': '06:50'
              },
              {
                'index': '1.88',
                'speed': '26.52',
                'time': '06:55'
              },
              {
                'index': '1.94',
                'speed': '25.70',
                'time': '07:00'
              },
              {
                'index': '2.10',
                'speed': '23.80',
                'time': '07:05'
              },
              {
                'index': '2.20',
                'speed': '22.71',
                'time': '07:10'
              },
              {
                'index': '2.30',
                'speed': '21.72',
                'time': '07:15'
              },
              {
                'index': '2.42',
                'speed': '20.63',
                'time': '07:20'
              },
              {
                'index': '2.52',
                'speed': '19.81',
                'time': '07:25'
              },
              {
                'index': '2.60',
                'speed': '19.20',
                'time': '07:30'
              },
              {
                'index': '2.67',
                'speed': '18.68',
                'time': '07:35'
              },
              {
                'index': '2.75',
                'speed': '18.17',
                'time': '07:40'
              },
              {
                'index': '2.83',
                'speed': '17.62',
                'time': '07:45'
              },
              {
                'index': '2.90',
                'speed': '17.22',
                'time': '07:50'
              },
              {
                'index': '2.97',
                'speed': '16.78',
                'time': '07:55'
              },
              {
                'index': '2.88',
                'speed': '17.31',
                'time': '08:00'
              },
              {
                'index': '2.91',
                'speed': '17.12',
                'time': '08:05'
              },
              {
                'index': '2.94',
                'speed': '16.95',
                'time': '08:10'
              },
              {
                'index': '2.92',
                'speed': '17.06',
                'time': '08:15'
              },
              {
                'index': '2.87',
                'speed': '17.40',
                'time': '08:20'
              },
              {
                'index': '2.82',
                'speed': '17.68',
                'time': '08:25'
              },
              {
                'index': '2.76',
                'speed': '18.09',
                'time': '08:30'
              },
              {
                'index': '2.74',
                'speed': '18.23',
                'time': '08:35'
              },
              {
                'index': '2.71',
                'speed': '18.42',
                'time': '08:40'
              },
              {
                'index': '2.60',
                'speed': '19.16',
                'time': '08:45'
              },
              {
                'index': '2.52',
                'speed': '19.79',
                'time': '08:50'
              },
              {
                'index': '2.43',
                'speed': '20.55',
                'time': '08:55'
              },
              {
                'index': '2.28',
                'speed': '21.88',
                'time': '09:00'
              },
              {
                'index': '2.16',
                'speed': '23.12',
                'time': '09:05'
              },
              {
                'index': '2.14',
                'speed': '23.36',
                'time': '09:10'
              },
              {
                'index': '2.12',
                'speed': '23.53',
                'time': '09:15'
              },
              {
                'index': '2.08',
                'speed': '24.04',
                'time': '09:20'
              },
              {
                'index': '2.05',
                'speed': '24.32',
                'time': '09:25'
              },
              {
                'index': '2.02',
                'speed': '24.65',
                'time': '09:30'
              },
              {
                'index': '2.02',
                'speed': '24.73',
                'time': '09:35'
              },
              {
                'index': '2.04',
                'speed': '24.41',
                'time': '09:40'
              },
              {
                'index': '2.05',
                'speed': '24.37',
                'time': '09:45'
              },
              {
                'index': '2.01',
                'speed': '24.83',
                'time': '09:50'
              },
              {
                'index': '1.96',
                'speed': '25.42',
                'time': '09:55'
              },
              {
                'index': '1.88',
                'speed': '26.60',
                'time': '10:00'
              },
              {
                'index': '1.85',
                'speed': '26.96',
                'time': '10:05'
              },
              {
                'index': '1.81',
                'speed': '27.59',
                'time': '10:10'
              },
              {
                'index': '1.79',
                'speed': '27.83',
                'time': '10:15'
              },
              {
                'index': '1.77',
                'speed': '28.26',
                'time': '10:20'
              },
              {
                'index': '1.75',
                'speed': '28.47',
                'time': '10:25'
              },
              {
                'index': '1.73',
                'speed': '28.77',
                'time': '10:30'
              },
              {
                'index': '1.69',
                'speed': '29.57',
                'time': '10:35'
              },
              {
                'index': '1.64',
                'speed': '30.48',
                'time': '10:40'
              },
              {
                'index': '1.61',
                'speed': '30.93',
                'time': '10:45'
              },
              {
                'index': '1.59',
                'speed': '31.41',
                'time': '10:50'
              },
              {
                'index': '1.55',
                'speed': '32.26',
                'time': '10:55'
              },
              {
                'index': '1.47',
                'speed': '33.89',
                'time': '11:00'
              },
              {
                'index': '1.43',
                'speed': '35.00',
                'time': '11:05'
              },
              {
                'index': '1.40',
                'speed': '35.74',
                'time': '11:10'
              },
              {
                'index': '1.38',
                'speed': '36.13',
                'time': '11:15'
              },
              {
                'index': '1.38',
                'speed': '36.06',
                'time': '11:20'
              },
              {
                'index': '1.37',
                'speed': '36.53',
                'time': '11:25'
              },
              {
                'index': '1.36',
                'speed': '36.79',
                'time': '11:30'
              },
              {
                'index': '1.34',
                'speed': '37.20',
                'time': '11:35'
              },
              {
                'index': '1.31',
                'speed': '38.11',
                'time': '11:40'
              },
              {
                'index': '1.30',
                'speed': '38.38',
                'time': '11:45'
              },
              {
                'index': '1.30',
                'speed': '38.40',
                'time': '11:50'
              },
              {
                'index': '1.30',
                'speed': '38.31',
                'time': '11:55'
              },
              {
                'index': '1.27',
                'speed': '39.28',
                'time': '12:00'
              },
              {
                'index': '1.26',
                'speed': '39.72',
                'time': '12:05'
              },
              {
                'index': '1.24',
                'speed': '40.22',
                'time': '12:10'
              },
              {
                'index': '1.23',
                'speed': '40.72',
                'time': '12:15'
              },
              {
                'index': '1.22',
                'speed': '40.82',
                'time': '12:20'
              },
              {
                'index': '1.22',
                'speed': '40.85',
                'time': '12:25'
              },
              {
                'index': '1.22',
                'speed': '40.94',
                'time': '12:30'
              },
              {
                'index': '1.21',
                'speed': '41.16',
                'time': '12:35'
              },
              {
                'index': '1.22',
                'speed': '41.04',
                'time': '12:40'
              },
              {
                'index': '1.22',
                'speed': '40.88',
                'time': '12:45'
              },
              {
                'index': '1.23',
                'speed': '40.56',
                'time': '12:50'
              },
              {
                'index': '1.24',
                'speed': '40.26',
                'time': '12:55'
              },
              {
                'index': '1.24',
                'speed': '40.13',
                'time': '13:00'
              },
              {
                'index': '1.25',
                'speed': '39.95',
                'time': '13:05'
              },
              {
                'index': '1.26',
                'speed': '39.69',
                'time': '13:10'
              },
              {
                'index': '1.27',
                'speed': '39.25',
                'time': '13:15'
              },
              {
                'index': '1.28',
                'speed': '38.87',
                'time': '13:20'
              },
              {
                'index': '1.30',
                'speed': '38.40',
                'time': '13:25'
              },
              {
                'index': '1.31',
                'speed': '38.09',
                'time': '13:30'
              },
              {
                'index': '1.33',
                'speed': '37.53',
                'time': '13:35'
              },
              {
                'index': '1.35',
                'speed': '36.96',
                'time': '13:40'
              },
              {
                'index': '1.36',
                'speed': '36.73',
                'time': '13:45'
              },
              {
                'index': '1.36',
                'speed': '36.73',
                'time': '13:50'
              },
              {
                'index': '1.37',
                'speed': '36.42',
                'time': '13:55'
              },
              {
                'index': '1.38',
                'speed': '36.18',
                'time': '14:00'
              },
              {
                'index': '1.38',
                'speed': '36.15',
                'time': '14:05'
              },
              {
                'index': '1.39',
                'speed': '35.87',
                'time': '14:10'
              },
              {
                'index': '1.40',
                'speed': '35.61',
                'time': '14:15'
              },
              {
                'index': '1.41',
                'speed': '35.32',
                'time': '14:20'
              },
              {
                'index': '1.41',
                'speed': '35.29',
                'time': '14:25'
              },
              {
                'index': '1.42',
                'speed': '35.10',
                'time': '14:30'
              },
              {
                'index': '1.44',
                'speed': '34.77',
                'time': '14:35'
              },
              {
                'index': '1.43',
                'speed': '34.84',
                'time': '14:40'
              },
              {
                'index': '1.46',
                'speed': '34.26',
                'time': '14:45'
              },
              {
                'index': '1.46',
                'speed': '34.15',
                'time': '14:50'
              },
              {
                'index': '1.46',
                'speed': '34.23',
                'time': '14:55'
              },
              {
                'index': '1.45',
                'speed': '34.47',
                'time': '15:00'
              },
              {
                'index': '1.43',
                'speed': '34.83',
                'time': '15:05'
              },
              {
                'index': '1.43',
                'speed': '34.89',
                'time': '15:10'
              },
              {
                'index': '1.43',
                'speed': '34.81',
                'time': '15:15'
              },
              {
                'index': '1.45',
                'speed': '34.46',
                'time': '15:20'
              },
              {
                'index': '1.45',
                'speed': '34.52',
                'time': '15:25'
              },
              {
                'index': '1.44',
                'speed': '34.59',
                'time': '15:30'
              },
              {
                'index': '1.45',
                'speed': '34.37',
                'time': '15:35'
              },
              {
                'index': '1.45',
                'speed': '34.31',
                'time': '15:40'
              },
              {
                'index': '1.47',
                'speed': '34.02',
                'time': '15:45'
              },
              {
                'index': '1.47',
                'speed': '33.87',
                'time': '15:50'
              },
              {
                'index': '1.45',
                'speed': '34.33',
                'time': '15:55'
              },
              {
                'index': '1.46',
                'speed': '34.24',
                'time': '16:00'
              },
              {
                'index': '1.47',
                'speed': '33.96',
                'time': '16:05'
              },
              {
                'index': '1.49',
                'speed': '33.41',
                'time': '16:10'
              },
              {
                'index': '1.49',
                'speed': '33.41',
                'time': '16:15'
              },
              {
                'index': '1.50',
                'speed': '33.24',
                'time': '16:20'
              },
              {
                'index': '1.52',
                'speed': '32.80',
                'time': '16:25'
              },
              {
                'index': '1.53',
                'speed': '32.51',
                'time': '16:30'
              }
            ]
          },
          // 城市实时道路拥堵指数
          'road_index': {
            'highway_index': '1.82',
            'general_way_index': '1.42',
            'lhighway_index': '1.83',
            'lgeneral_way_index': '1.41',
            'highway_speed': '40.25',
            'general_way_speed': '28.58',
            'highway_week_rate': -0.005,
            'general_way_week_rate': 0.007
          },
          'congest_mile': {
            'slowly': '198.38',
            'congest': '90.16',
            'serious': '18.52',
            'avg_slowly': '350.53',
            'avg_congest': '270.75',
            'avg_serious': '102.21',
            'slowly_rate': -0.434,
            'congest_rate': -0.667,
            'serious_rate': -0.819,
            'is_work': '1'
          },
          'peak_detail': {
            'morning_hour': '10:45-11:45',
            'morning_index': '1.32',
            'evening_hour': '17:00-18:00',
            'evening_index': '1.82'
          },
          'city_roadrank': {
            'road0': [
              {
                'id': '20860156259',
                'time': '202012141625',
                'citycode': '131',
                'district_type': '0',
                'roadsegid': '温榆桥-0',
                'speed': '3.97',
                'yongdu_length': '1.41',
                'road_type': '1',
                'roadname': '温榆桥',
                'index': '19.18',
                'index_level': 4,
                'length': '1.41',
                'semantic': '温榆桥，西向东',
                'links': '15688408370|15911358810|58853026890|101802699850|15911505940',
                'location': '116.572625,40.03872',
                'nameadd': ''
              },
              {
                'id': '20860156274',
                'time': '202012141625',
                'citycode': '131',
                'district_type': '0',
                'roadsegid': '西二环-1',
                'speed': '7.79',
                'yongdu_length': '2.59',
                'road_type': '2',
                'roadname': '西二环',
                'index': '8.83',
                'index_level': 4,
                'length': '2.77',
                'semantic': '从西直门桥到月坛北桥，东向南',
                'links': '15259414310|15259417530|15259416100|15259414230|15831361110|16283313420|16283304170|15259370170|16003962480|16003956830|15831384530|15831361100|16252170380|16252179950|16162416380|16162413590|15901021320|15677510420|16310777280',
                'location': '116.362456,39.9494',
                'nameadd': '西直门桥附近'
              },
              {
                'id': '20860156260',
                'time': '202012141625',
                'citycode': '131',
                'district_type': '0',
                'roadsegid': '远通桥-10',
                'speed': '11.42',
                'yongdu_length': '1.78',
                'road_type': '2',
                'roadname': '远通桥',
                'index': '6.71',
                'index_level': 4,
                'length': '1.78',
                'semantic': '远通桥，南向北',
                'links': '15906100010|15685156630|15639702590|15685154060|15685157250|15903484840',
                'location': '116.553057,39.904077',
                'nameadd': ''
              },
              {
                'id': '20860156403',
                'time': '202012141625',
                'citycode': '131',
                'district_type': '0',
                'roadsegid': '立汤路-2-xj20190126',
                'speed': '9.12',
                'yongdu_length': '0.65',
                'road_type': '3',
                'roadname': '立汤路',
                'index': '5.53',
                'index_level': 4,
                'length': '1.65',
                'semantic': '安四路附近，南向北',
                'links': '15625867270|59015614380|101965287340|16065959050|16379285530|15751019910|15260514080|15625870670|15625873590|15420409190|15260514070|16361940000|16361939990|16361939980',
                'location': '116.419614,40.104692',
                'nameadd': ''
              },
              {
                'id': '20860156275',
                'time': '202012141625',
                'citycode': '131',
                'district_type': '0',
                'roadsegid': '西二环-0-xj20190430',
                'speed': '14.20',
                'yongdu_length': '2.16',
                'road_type': '2',
                'roadname': '西二环',
                'index': '4.83',
                'index_level': 4,
                'length': '6.18',
                'semantic': '从阜成门桥到菜户营桥，北向南',
                'links': '15769628500|15769628490|15259350880|15901604360|15831390240|15831386340|15908050910|16146582790|16146573360|16075063950|15688424640|15259380680|15901368000|15259413910|15816435900|16370794860|16370792510|15259418730|15420848410|15420766420|16109318250|16109318040|15685165810|15259411940|15688426330|15688422390|15901165020|15259420550|15259358520|15259419910|16036139880|16036129260|15420939020|15420883870|15259364820|15901055860|15420903140|15685172200|15908051580|15420918330|15259419900|15259421100|15259418640',
                'location': '116.362823,39.927578',
                'nameadd': '阜成门桥附近'
              },
              {
                'id': '20860156273',
                'time': '202012141625',
                'citycode': '131',
                'district_type': '0',
                'roadsegid': '西三环北路-1-xj20180721',
                'speed': '16.51',
                'yongdu_length': '1.80',
                'road_type': '2',
                'roadname': '西三环北路',
                'index': '4.30',
                'index_level': 4,
                'length': '2.73',
                'semantic': '从万寿桥到航天桥，北向南',
                'links': '15995327210|15995333380|16266086760|16266074820|15995328810|15259408460|15995329820|15995326650|16174201590|16174201740|16089849330|16174201730|16174201650|15995360930|15782835450|15782835460|15259420320|15832388160|16089840280|16089821720|15832387980|15832382780|15685198250|15995327360|15995334970|15259416770|15751552790|15995361170|16301906160|16301916050|16145204090',
                'location': '116.316208,39.954667',
                'nameadd': ''
              },
              {
                'id': '20860156270',
                'time': '202012141625',
                'citycode': '131',
                'district_type': '0',
                'roadsegid': '四惠桥-0',
                'speed': '14.89',
                'yongdu_length': '0.68',
                'road_type': '2',
                'roadname': '四惠桥',
                'index': '4.06',
                'index_level': 4,
                'length': '1.43',
                'semantic': '四惠桥，西向北',
                'links': '15687700690|15908426060|15901043220|15260617730|15259070200|15616875290',
                'location': '116.489524,39.911306',
                'nameadd': ''
              },
              {
                'id': '20860156268',
                'time': '202012141625',
                'citycode': '131',
                'district_type': '0',
                'roadsegid': '东三环北路-2',
                'speed': '17.77',
                'yongdu_length': '2.62',
                'road_type': '2',
                'roadname': '东三环北路',
                'index': '4.03',
                'index_level': 4,
                'length': '4.59',
                'semantic': '从三元东桥到京广桥，西向南',
                'links': '15259412240|15762399920|15762399910|15700117440|15259412320|15995329340|15995329610|15700119770|15995328570|15995327270|15259410520|16241769720|16241766520|15995328350|15995332470|15995333020|16305444950|16305444940|16085413740|15995361760|16129618110|16203846700|16203846710|16129618060|16129618100|15995350760|15259363000|15995329710|15995361640|15995358330|15995329090|15995329100|15995328270|15688766550|15995327890|15995361710|15839263940|15995327380|15995337180|15806742480|15685199500',
                'location': '116.460905,39.963448',
                'nameadd': ''
              },
              {
                'id': '20860156391',
                'time': '202012141625',
                'citycode': '131',
                'district_type': '0',
                'roadsegid': '蒲黄榆路-5',
                'speed': '12.40',
                'yongdu_length': '0.49',
                'road_type': '3',
                'roadname': '蒲黄榆路',
                'index': '3.97',
                'index_level': 3,
                'length': '1.52',
                'semantic': '从刘家窑桥到玉蜓桥，南向北',
                'links': '16294312950|16294312960|16097240620|15623305500|15260652770|15259423560|15257964190|15258685650|15260495070|15259171900|15257956430|15258931600|15258921020|15259379720|16197556080|16197556060|16284497190|16284497180|15831375510|15831378230|15831364370|15421203100|15421193110|15260277150|15259382130',
                'location': '116.428642,39.863951',
                'nameadd': ''
              },
              {
                'id': '20860156265',
                'time': '202012141625',
                'citycode': '131',
                'district_type': '0',
                'roadsegid': '东四环北路-2-xj20180721',
                'speed': '18.84',
                'yongdu_length': '1.72',
                'road_type': '2',
                'roadname': '东四环北路',
                'index': '3.95',
                'index_level': 3,
                'length': '3.05',
                'semantic': '从四元桥到东风北桥，西向南',
                'links': '16134145610|16134154700|15908598650|15259415020|15901386480|15685206440|15685201720|15907725600|15259422220|15685204910|15685206830|15685206670|15421652970',
                'location': '116.471226,39.980092',
                'nameadd': ''
              }
            ],
            'road1': [
              {
                'id': '20860156259',
                'time': '202012141625',
                'citycode': '131',
                'district_type': '0',
                'roadsegid': '温榆桥-0',
                'speed': '3.97',
                'yongdu_length': '1.41',
                'road_type': '1',
                'roadname': '温榆桥',
                'index': '19.18',
                'index_level': 4,
                'length': '1.41',
                'semantic': '温榆桥，西向东',
                'links': '15688408370|15911358810|58853026890|101802699850|15911505940',
                'location': '116.572625,40.03872',
                'nameadd': ''
              },
              {
                'id': '20860156274',
                'time': '202012141625',
                'citycode': '131',
                'district_type': '0',
                'roadsegid': '西二环-1',
                'speed': '7.79',
                'yongdu_length': '2.59',
                'road_type': '2',
                'roadname': '西二环',
                'index': '8.83',
                'index_level': 4,
                'length': '2.77',
                'semantic': '从西直门桥到月坛北桥，东向南',
                'links': '15259414310|15259417530|15259416100|15259414230|15831361110|16283313420|16283304170|15259370170|16003962480|16003956830|15831384530|15831361100|16252170380|16252179950|16162416380|16162413590|15901021320|15677510420|16310777280',
                'location': '116.362456,39.9494',
                'nameadd': '西直门桥附近'
              },
              {
                'id': '20860156260',
                'time': '202012141625',
                'citycode': '131',
                'district_type': '0',
                'roadsegid': '远通桥-10',
                'speed': '11.42',
                'yongdu_length': '1.78',
                'road_type': '2',
                'roadname': '远通桥',
                'index': '6.71',
                'index_level': 4,
                'length': '1.78',
                'semantic': '远通桥，南向北',
                'links': '15906100010|15685156630|15639702590|15685154060|15685157250|15903484840',
                'location': '116.553057,39.904077',
                'nameadd': ''
              },
              {
                'id': '20860156275',
                'time': '202012141625',
                'citycode': '131',
                'district_type': '0',
                'roadsegid': '西二环-0-xj20190430',
                'speed': '14.20',
                'yongdu_length': '2.16',
                'road_type': '2',
                'roadname': '西二环',
                'index': '4.83',
                'index_level': 4,
                'length': '6.18',
                'semantic': '从阜成门桥到菜户营桥，北向南',
                'links': '15769628500|15769628490|15259350880|15901604360|15831390240|15831386340|15908050910|16146582790|16146573360|16075063950|15688424640|15259380680|15901368000|15259413910|15816435900|16370794860|16370792510|15259418730|15420848410|15420766420|16109318250|16109318040|15685165810|15259411940|15688426330|15688422390|15901165020|15259420550|15259358520|15259419910|16036139880|16036129260|15420939020|15420883870|15259364820|15901055860|15420903140|15685172200|15908051580|15420918330|15259419900|15259421100|15259418640',
                'location': '116.362823,39.927578',
                'nameadd': '阜成门桥附近'
              },
              {
                'id': '20860156273',
                'time': '202012141625',
                'citycode': '131',
                'district_type': '0',
                'roadsegid': '西三环北路-1-xj20180721',
                'speed': '16.51',
                'yongdu_length': '1.80',
                'road_type': '2',
                'roadname': '西三环北路',
                'index': '4.30',
                'index_level': 4,
                'length': '2.73',
                'semantic': '从万寿桥到航天桥，北向南',
                'links': '15995327210|15995333380|16266086760|16266074820|15995328810|15259408460|15995329820|15995326650|16174201590|16174201740|16089849330|16174201730|16174201650|15995360930|15782835450|15782835460|15259420320|15832388160|16089840280|16089821720|15832387980|15832382780|15685198250|15995327360|15995334970|15259416770|15751552790|15995361170|16301906160|16301916050|16145204090',
                'location': '116.316208,39.954667',
                'nameadd': ''
              },
              {
                'id': '20860156270',
                'time': '202012141625',
                'citycode': '131',
                'district_type': '0',
                'roadsegid': '四惠桥-0',
                'speed': '14.89',
                'yongdu_length': '0.68',
                'road_type': '2',
                'roadname': '四惠桥',
                'index': '4.06',
                'index_level': 4,
                'length': '1.43',
                'semantic': '四惠桥，西向北',
                'links': '15687700690|15908426060|15901043220|15260617730|15259070200|15616875290',
                'location': '116.489524,39.911306',
                'nameadd': ''
              },
              {
                'id': '20860156268',
                'time': '202012141625',
                'citycode': '131',
                'district_type': '0',
                'roadsegid': '东三环北路-2',
                'speed': '17.77',
                'yongdu_length': '2.62',
                'road_type': '2',
                'roadname': '东三环北路',
                'index': '4.03',
                'index_level': 4,
                'length': '4.59',
                'semantic': '从三元东桥到京广桥，西向南',
                'links': '15259412240|15762399920|15762399910|15700117440|15259412320|15995329340|15995329610|15700119770|15995328570|15995327270|15259410520|16241769720|16241766520|15995328350|15995332470|15995333020|16305444950|16305444940|16085413740|15995361760|16129618110|16203846700|16203846710|16129618060|16129618100|15995350760|15259363000|15995329710|15995361640|15995358330|15995329090|15995329100|15995328270|15688766550|15995327890|15995361710|15839263940|15995327380|15995337180|15806742480|15685199500',
                'location': '116.460905,39.963448',
                'nameadd': ''
              },
              {
                'id': '20860156265',
                'time': '202012141625',
                'citycode': '131',
                'district_type': '0',
                'roadsegid': '东四环北路-2-xj20180721',
                'speed': '18.84',
                'yongdu_length': '1.72',
                'road_type': '2',
                'roadname': '东四环北路',
                'index': '3.95',
                'index_level': 3,
                'length': '3.05',
                'semantic': '从四元桥到东风北桥，西向南',
                'links': '16134145610|16134154700|15908598650|15259415020|15901386480|15685206440|15685201720|15907725600|15259422220|15685204910|15685206830|15685206670|15421652970',
                'location': '116.471226,39.980092',
                'nameadd': ''
              },
              {
                'id': '20860156243',
                'time': '202012141625',
                'citycode': '131',
                'district_type': '0',
                'roadsegid': '温榆大桥-6',
                'speed': '23.27',
                'yongdu_length': '0.26',
                'road_type': '1',
                'roadname': '温榆大桥',
                'index': '3.94',
                'index_level': 3,
                'length': '1.32',
                'semantic': '温榆大桥，西向东',
                'links': '15260177900|15260462290|16389229850|16389358290|15685340980|16280535670|16280535680',
                'location': '116.573629,40.042605',
                'nameadd': ''
              },
              {
                'id': '20860156271',
                'time': '202012141625',
                'citycode': '131',
                'district_type': '0',
                'roadsegid': '北四环东路-0',
                'speed': '19.17',
                'yongdu_length': '1.48',
                'road_type': '2',
                'roadname': '北四环东路',
                'index': '3.80',
                'index_level': 3,
                'length': '2.98',
                'semantic': '从惠新东桥到望京桥，西向南',
                'links': '15688762590|15688766440|15259411090|15259418350|15901396940|15904855280|15902480910|15421665620|15421605570|15421644850|15688768980|15688767970|15685204120|15901365360|15908693830|15421778820|15421763330|15421773430',
                'location': '116.439315,39.994911',
                'nameadd': ''
              }
            ],
            'road11': [
              {
                'id': '20860156259',
                'time': '202012141625',
                'citycode': '131',
                'district_type': '0',
                'roadsegid': '温榆桥-0',
                'speed': '3.97',
                'yongdu_length': '1.41',
                'road_type': '1',
                'roadname': '温榆桥',
                'index': '19.18',
                'index_level': 4,
                'length': '1.41',
                'semantic': '温榆桥，西向东',
                'links': '15688408370|15911358810|58853026890|101802699850|15911505940',
                'location': '116.572625,40.03872',
                'nameadd': ''
              },
              {
                'id': '20860156274',
                'time': '202012141625',
                'citycode': '131',
                'district_type': '0',
                'roadsegid': '西二环-1',
                'speed': '7.79',
                'yongdu_length': '2.59',
                'road_type': '2',
                'roadname': '西二环',
                'index': '8.83',
                'index_level': 4,
                'length': '2.77',
                'semantic': '从西直门桥到月坛北桥，东向南',
                'links': '15259414310|15259417530|15259416100|15259414230|15831361110|16283313420|16283304170|15259370170|16003962480|16003956830|15831384530|15831361100|16252170380|16252179950|16162416380|16162413590|15901021320|15677510420|16310777280',
                'location': '116.362456,39.9494',
                'nameadd': '西直门桥附近'
              },
              {
                'id': '20860156260',
                'time': '202012141625',
                'citycode': '131',
                'district_type': '0',
                'roadsegid': '远通桥-10',
                'speed': '11.42',
                'yongdu_length': '1.78',
                'road_type': '2',
                'roadname': '远通桥',
                'index': '6.71',
                'index_level': 4,
                'length': '1.78',
                'semantic': '远通桥，南向北',
                'links': '15906100010|15685156630|15639702590|15685154060|15685157250|15903484840',
                'location': '116.553057,39.904077',
                'nameadd': ''
              },
              {
                'id': '20860156403',
                'time': '202012141625',
                'citycode': '131',
                'district_type': '0',
                'roadsegid': '立汤路-2-xj20190126',
                'speed': '9.12',
                'yongdu_length': '0.65',
                'road_type': '3',
                'roadname': '立汤路',
                'index': '5.53',
                'index_level': 4,
                'length': '1.65',
                'semantic': '安四路附近，南向北',
                'links': '15625867270|59015614380|101965287340|16065959050|16379285530|15751019910|15260514080|15625870670|15625873590|15420409190|15260514070|16361940000|16361939990|16361939980',
                'location': '116.419614,40.104692',
                'nameadd': ''
              },
              {
                'id': '20860156275',
                'time': '202012141625',
                'citycode': '131',
                'district_type': '0',
                'roadsegid': '西二环-0-xj20190430',
                'speed': '14.20',
                'yongdu_length': '2.16',
                'road_type': '2',
                'roadname': '西二环',
                'index': '4.83',
                'index_level': 4,
                'length': '6.18',
                'semantic': '从阜成门桥到菜户营桥，北向南',
                'links': '15769628500|15769628490|15259350880|15901604360|15831390240|15831386340|15908050910|16146582790|16146573360|16075063950|15688424640|15259380680|15901368000|15259413910|15816435900|16370794860|16370792510|15259418730|15420848410|15420766420|16109318250|16109318040|15685165810|15259411940|15688426330|15688422390|15901165020|15259420550|15259358520|15259419910|16036139880|16036129260|15420939020|15420883870|15259364820|15901055860|15420903140|15685172200|15908051580|15420918330|15259419900|15259421100|15259418640',
                'location': '116.362823,39.927578',
                'nameadd': '阜成门桥附近'
              },
              {
                'id': '20860156273',
                'time': '202012141625',
                'citycode': '131',
                'district_type': '0',
                'roadsegid': '西三环北路-1-xj20180721',
                'speed': '16.51',
                'yongdu_length': '1.80',
                'road_type': '2',
                'roadname': '西三环北路',
                'index': '4.30',
                'index_level': 4,
                'length': '2.73',
                'semantic': '从万寿桥到航天桥，北向南',
                'links': '15995327210|15995333380|16266086760|16266074820|15995328810|15259408460|15995329820|15995326650|16174201590|16174201740|16089849330|16174201730|16174201650|15995360930|15782835450|15782835460|15259420320|15832388160|16089840280|16089821720|15832387980|15832382780|15685198250|15995327360|15995334970|15259416770|15751552790|15995361170|16301906160|16301916050|16145204090',
                'location': '116.316208,39.954667',
                'nameadd': ''
              },
              {
                'id': '20860156270',
                'time': '202012141625',
                'citycode': '131',
                'district_type': '0',
                'roadsegid': '四惠桥-0',
                'speed': '14.89',
                'yongdu_length': '0.68',
                'road_type': '2',
                'roadname': '四惠桥',
                'index': '4.06',
                'index_level': 4,
                'length': '1.43',
                'semantic': '四惠桥，西向北',
                'links': '15687700690|15908426060|15901043220|15260617730|15259070200|15616875290',
                'location': '116.489524,39.911306',
                'nameadd': ''
              },
              {
                'id': '20860156268',
                'time': '202012141625',
                'citycode': '131',
                'district_type': '0',
                'roadsegid': '东三环北路-2',
                'speed': '17.77',
                'yongdu_length': '2.62',
                'road_type': '2',
                'roadname': '东三环北路',
                'index': '4.03',
                'index_level': 4,
                'length': '4.59',
                'semantic': '从三元东桥到京广桥，西向南',
                'links': '15259412240|15762399920|15762399910|15700117440|15259412320|15995329340|15995329610|15700119770|15995328570|15995327270|15259410520|16241769720|16241766520|15995328350|15995332470|15995333020|16305444950|16305444940|16085413740|15995361760|16129618110|16203846700|16203846710|16129618060|16129618100|15995350760|15259363000|15995329710|15995361640|15995358330|15995329090|15995329100|15995328270|15688766550|15995327890|15995361710|15839263940|15995327380|15995337180|15806742480|15685199500',
                'location': '116.460905,39.963448',
                'nameadd': ''
              },
              {
                'id': '20860156391',
                'time': '202012141625',
                'citycode': '131',
                'district_type': '0',
                'roadsegid': '蒲黄榆路-5',
                'speed': '12.40',
                'yongdu_length': '0.49',
                'road_type': '3',
                'roadname': '蒲黄榆路',
                'index': '3.97',
                'index_level': 3,
                'length': '1.52',
                'semantic': '从刘家窑桥到玉蜓桥，南向北',
                'links': '16294312950|16294312960|16097240620|15623305500|15260652770|15259423560|15257964190|15258685650|15260495070|15259171900|15257956430|15258931600|15258921020|15259379720|16197556080|16197556060|16284497190|16284497180|15831375510|15831378230|15831364370|15421203100|15421193110|15260277150|15259382130',
                'location': '116.428642,39.863951',
                'nameadd': ''
              },
              {
                'id': '20860156265',
                'time': '202012141625',
                'citycode': '131',
                'district_type': '0',
                'roadsegid': '东四环北路-2-xj20180721',
                'speed': '18.84',
                'yongdu_length': '1.72',
                'road_type': '2',
                'roadname': '东四环北路',
                'index': '3.95',
                'index_level': 3,
                'length': '3.05',
                'semantic': '从四元桥到东风北桥，西向南',
                'links': '16134145610|16134154700|15908598650|15259415020|15901386480|15685206440|15685201720|15907725600|15259422220|15685204910|15685206830|15685206670|15421652970',
                'location': '116.471226,39.980092',
                'nameadd': ''
              }
            ]
          },
          'updatetime': '202012141630'
        }
      },
      selectCity: false,
      polylinePath: [[
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
      ]],
      // 选择 显示实时拥堵或者拥堵预测
      mapSelectType: true,
      // 未来一周的实时预测数据
      congestionForecastTable: [
        {
          number: 1
        },
        {
          number: 1.2
        },
        {
          number: 1.3
        },
        {
          number: 1.4
        },
        {
          number: 1.3
        },
        {
          number: 1.3
        },
        {
          number: 1.3
        },
        {
          number: 1.5
        },
        {
          number: 1.8
        },
        {
          number: 2.1
        },
        {
          number: 2.2
        },
        {
          number: 2.3
        },
        {
          number: 2.4
        },
        {
          number: 2.5
        },
        {
          number: 2.1
        },
        {
          number: 1.8
        },
        {
          number: 1.7
        },
        {
          number: 1.6
        },
        {
          number: 1.5
        },
        {
          number: 1.4
        },
        {
          number: 1.3
        },
        {
          number: 1.2
        },
        {
          number: 1.1
        },
        {
          number: 1
        }
      ],
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
      },
      // Swiper 滑动框设置
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination'
        },
        // 循环
        loop: true,
        // 自动滑动，
        autoplay: {
          // 每个页面停留的时间
          delay: 6000
        },
        // 动画切换的时间
        speed: 1000
      }
    }
  },
  mounted () {
    this.city.code = this.$route.query.code
    this.zoom = this.$route.query.zoom
    this.ontoCityByListClick(this.city.code)
    // let _this = this
    // 初始化获取页面详细信息
    // this.initCityVal(this.city.code)
    // 初始化菜单页面
    // selectByPage(0, 10).then(request => {
    //   _this.city.cityLastType = false
    //   _this.city.cityList = request.data
    // }).catch(err => {
    //   _this.$message.error('数据添加失败了' + err)
    //   _this.city.cityLastType = false
    // })
  },
  methods: {
    getCites (i) {
      this.city.cityList = this.allCities.slice(10 * (i - 1), 10 * i)
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
    handler ({ BMap, map }) {
      let isThis = this
      var projection2 = map.getMapType().getProjection()
      var LngLat = projection2.pointToLngLat(new BMap.Pixel(12959238.56, 4825347.47))
      isThis.center.lng = LngLat.lng
      isThis.center.lat = LngLat.lat
      isThis.zoom = 12
    },
    /* 初始分钟级拥堵指数化折线图 */
    initCongestionLineChart: function () {
      let myChart = this.$echarts.init(document.getElementById('congestionLineChart'))
      let option = {
        tooltip: {
          show: true,
          trigger: 'item'
        },
        grid: {
          x: 50,
          y: 50,
          x2: 50,
          y2: 50
        },
        xAxis: {
          type: 'category',
          /* 设置X轴的网格 */
          splitLine: {
            show: true,
            interval: 'auto',
            lineStyle: {
              color: 'rgba(255,255,255, .5)'
            }
          },
          /* 设置X轴的颜色 */
          axisLine: {
            lineStyle: {
              color: 'rgba( 255, 255, 255, .5)'
            }
          },
          data: [
            '0:00', '0:05', '0:10', '0:15', '0:20', '0:25', '0:30', '0:35', '0:40', '0:45', '0:50', '0:55',
            '1:00', '1:05', '1:10', '1:15', '1:20', '1:25', '1:30', '1:35', '1:40', '1:45', '1:50', '1:55',
            '2:00', '2:05', '2:10', '2:15', '2:20', '2:25', '2:30', '2:35', '2:40', '2:45', '2:50', '2:55',
            '3:00', '3:05', '3:10', '3:15', '3:20', '3:25', '3:30', '3:35', '3:40', '3:45', '3:50', '3:55',
            '4:00', '4:05', '4:10', '4:15', '4:20', '4:25', '4:30', '4:35', '4:40', '4:45', '4:50', '4:55',
            '5:00', '5:05', '5:10', '5:15', '5:20', '5:25', '5:30', '5:35', '5:40', '5:45', '5:50', '5:55',
            '6:00', '6:05', '6:10', '6:15', '6:20', '6:25', '6:30', '6:35', '6:40', '6:45', '6:50', '6:55',
            '7:00', '7:05', '7:10', '7:15', '7:20', '7:25', '7:30', '7:35', '7:40', '7:45', '7:50', '7:55',
            '8:00', '8:05', '8:10', '8:15', '8:20', '8:25', '8:30', '8:35', '8:40', '8:45', '8:50', '8:55',
            '9:00', '9:05', '9:10', '9:15', '9:20', '9:25', '9:30', '9:35', '9:40', '9:45', '9:50', '9:55',
            '10:00', '10:05', '10:10', '10:15', '10:20', '10:25', '10:30', '10:35', '10:40', '10:45', '10:50',
            '10:55',
            '11:00', '11:05', '11:10', '11:15', '11:20', '11:25', '11:30', '11:35', '11:40', '11:45', '11:50',
            '11:55',
            '12:00', '12:05', '12:10', '12:15', '12:20', '12:25', '12:30', '12:35', '12:40', '12:45', '12:50',
            '12:55',
            '13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50',
            '13:55',
            '14:00', '14:05', '14:10', '14:15', '14:20', '14:25', '14:30', '14:35', '14:40', '14:45', '14:50',
            '14:55',
            '15:00', '15:05', '15:10', '15:15', '15:20', '15:25', '15:30', '15:35', '15:40', '15:45', '15:50',
            '15:55',
            '16:00', '16:05', '16:10', '16:15', '16:20', '16:25', '16:30', '16:35', '16:40', '16:45', '16:50',
            '16:55',
            '17:00', '17:05', '17:10', '17:15', '17:20', '17:25', '17:30', '17:35', '17:40', '17:45', '17:50',
            '17:55',
            '18:00', '18:05', '18:10', '18:15', '18:20', '18:25', '18:30', '18:35', '18:40', '18:45', '18:50',
            '18:55',
            '19:00', '19:05', '19:10', '19:15', '19:20', '19:25', '19:30', '19:35', '19:40', '19:45', '19:50',
            '19:55',
            '20:00', '20:05', '20:10', '20:15', '20:20', '20:25', '20:30', '20:35', '20:40', '20:45', '20:50',
            '20:55',
            '21:00', '21:05', '21:10', '21:15', '21:20', '21:25', '21:30', '21:35', '21:40', '21:45', '21:50',
            '21:55',
            '22:00', '22:05', '22:10', '22:15', '22:20', '22:25', '22:30', '22:35', '22:40', '22:45', '22:50',
            '22:55',
            '23:00', '23:05', '23:10', '23:15', '23:20', '23:25', '23:30', '23:35', '23:40', '23:45', '23:50',
            '23:55'
          ]
        },
        yAxis: {
          type: 'value',
          /* 设置y轴的网格 */
          splitLine: {
            show: true,
            interval: 'auto',
            lineStyle: {
              color: 'rgba(255,255,255, .51)'
            }
          },
          /* 设置y轴的颜色 */
          axisLine: {
            lineStyle: {
              color: 'rgba( 255, 255, 255, .5)'
            }
          }
        },
        series: [{
          data: [0.86, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.86, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8,
            0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.86, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8,
            0.8, 0.8, 0.8, 0.8, 0.86, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8,
            0.8, 0.86, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.86, 0.8,
            0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.9, 0.91, 0.92, 0.93, 0.93, 0.93,
            0.94, 0.94, 0.95, 0.95, 0.95, 0.95, 0.95, 0.96, 0.96, 0.96, 0.96, 0.97, 0.97, 0.97, 0.97, 0.99,
            1.01, 1.02, 1.03, 1.04, 1.05, 1.06, 1.08, 1.09, 1.10, 1.120, 1.130, 1.140, 1.150, 1.6, 2.0, 2.6,
            1.8, 1.5
          ],
          type: 'line',
          smooth: true,
          symbolSize: 0,
          itemStyle: {
            color: '#8ec6ad'
          },
          areaStyle: {
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(142,198,173,1)'
            }, {
              offset: 1,
              color: 'rgba(142,198,173,0)'
            }])
          },
          markPoint: {
            data: [{
              name: '最大值',
              type: 'max'
            }]
          }
        }]
      }
      // let xData = []
      let valData = []
      let isDataList = this.city.data.city_curve.curve_minute
      let timeAdd = 0
      for (let i = 0; i < isDataList.length; i++) {
        if (isDataList[i].time === '23:55') {
          timeAdd = 2
        }
        if (timeAdd === 2) {
          let isData = isDataList[i]
          //  xData[i] = isData.time
          valData.push(parseFloat(isData.index))
        }
      }
      // option.xAxis.data = xData
      option.series[0].data = valData
      myChart.setOption(option)
    },
    // 初始七天指数化柱状图
    initCongestionHistogram: function () {
      let myChart1 = this.$echarts.init(document.getElementById('congestionHistogram'))
      let option = {
        legend: {
          right: '10%',
          top: '5%',
          data: [
            {
              name: '拥堵指数'
            },
            {
              name: '速度'
            }
          ],
          textStyle: {
            color: '#a8aab0',
            fontStyle: 'normal',
            fontFamily: '微软雅黑',
            fontSize: 12
          }
        },
        xAxis: [{
          type: 'category',
          data: ['22:18', '22:23', '22:25', '22:28', '22:30', '22:33', '22:35'],
          axisLabel: {
            textStyle: {
              color: '#078ceb',
              fontStyle: 'normal',
              fontFamily: '微软雅黑',
              fontSize: 12
            }
          },
          // 坐标轴刻度相关设置。
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#fff'],
              opacity: 0.06
            }
          }
        }],
        yAxis: [{
          type: 'value',
          name: '拥堵指数',
          splitNumber: 5,
          axisLabel: {
            textStyle: {
              color: '#a8aab0',
              fontStyle: 'normal',
              fontFamily: '微软雅黑',
              fontSize: 12
            }
          },
          axisLine: {
            show: true
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#fff'],
              opacity: 0.06
            }
          },
          min: 0,
          max: 3
        }, {
          type: 'value',
          name: '速度',
          splitNumber: 5,
          axisLabel: {
            textStyle: {
              color: '#a8aab0',
              fontStyle: 'normal',
              fontFamily: '微软雅黑',
              fontSize: 12
            }
          },
          axisLine: {
            show: true
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#fff'],
              opacity: 0.06
            }
          },
          min: 10,
          max: 40
        }],
        series: [
          {
            name: '拥堵指数',
            type: 'line',
            barWidth: 10,
            // 柱间距离
            barGap: 10,
            // 图形上的文本标签
            label: {
              normal: {
                show: true,
                position: 'top',
                textStyle: {
                  color: '#a8aab0',
                  fontStyle: 'normal',
                  fontFamily: '微软雅黑',
                  fontSize: 12
                }
              }
            },
            itemStyle: {
              normal: {
                show: true,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#5768EF'
                }, {
                  offset: 1,
                  color: '#5768EF'
                }]),
                barBorderRadius: 50,
                borderWidth: 0
              }
            }
          },
          {
            name: '速度',
            type: 'bar',
            yAxisIndex: 1,
            barWidth: 10,
            // 柱间距离
            barGap: 0,
            // 图形上的文本标签
            label: {
              normal: {
                show: true,
                position: 'top',
                textStyle: {
                  color: '#a8aab0',
                  fontStyle: 'normal',
                  fontFamily: '微软雅黑',
                  fontSize: 12
                }
              }
            },
            itemStyle: {
              normal: {
                show: true,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#69CBF2'
                }, {
                  offset: 1,
                  color: '#69CBF2'
                }]),
                barBorderRadius: 50,
                borderWidth: 0
              }
            }
          }
        ]
      }
      let xData = []
      let valData1 = []
      let valData2 = []
      let isDataList = this.city.data.city_curve.curve_day
      for (let i = 0; i < isDataList.length; i++) {
        let isData = isDataList[i]
        xData[i] = isData.time
        valData1[i] = parseFloat(isData.index)
        valData2[i] = parseFloat(isData.speed)
      }
      option.xAxis[0].data = xData
      option.series[0].data = valData1
      option.series[1].data = valData2
      myChart1.setOption(option)
    },
    // 初始化实时拥堵里程的柱状图
    initCongestionMileageHistogram: function () {
      let myChart1 = this.$echarts.init(document.getElementById('congestionMileageHistogram'))
      let option = {
        /* legend: {
          right: '10%',
          top: '5%',
          data: ['严重拥堵', '拥堵', '缓行', '通勤日/节假日均值'],
          textStyle: {
            color: '#a8aab0',
            fontStyle: 'normal',
            fontFamily: '微软雅黑',
            fontSize: 12
          }
        }, */
        xAxis: [{
          type: 'category',
          data: ['严重拥堵', '拥堵', '缓行'],
          axisLabel: {
            textStyle: {
              color: 'rgba(255, 255, 255, .6)',
              fontStyle: 'normal',
              fontFamily: '微软雅黑',
              fontSize: 12
            }
          },
          // 坐标轴刻度相关设置。
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#fff'],
              opacity: 0.06
            }
          }
        }],
        yAxis: [{
          type: 'value',
          splitNumber: 5,
          axisLabel: {
            textStyle: {
              color: '#a8aab0',
              fontStyle: 'normal',
              fontFamily: '微软雅黑',
              fontSize: 12
            }
          },
          axisLine: {
            show: true
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#fff'],
              opacity: 0.06
            }
          }
        }],
        series: [
          {
            name: '严重拥堵',
            type: 'bar',
            data: [10, 0, 0],
            barWidth: 10,
            stack: '当日',
            label: {
              show: false
            },
            itemStyle: {
              show: true,
              color: 'rgba(183, 0, 31, 1)'
            }
          },
          {
            name: '拥堵',
            type: 'bar',
            data: [0, 15, 0],
            barWidth: 10,
            stack: '当日',
            label: {
              show: false
            },
            itemStyle: {
              show: true,
              color: 'rgba(232, 13, 13, 1)'
            }
          },
          {
            name: '缓行',
            type: 'bar',
            data: [0, 0, 30],
            barWidth: 10,
            stack: '当日',
            label: {
              show: false
            },
            itemStyle: {
              show: true,
              color: 'rgba(255, 152, 0, 1)'
            }
          },
          {
            name: '通勤日/节假日均值',
            type: 'bar',
            data: [8, 5, 25],
            barWidth: 10,
            barGap: 0,
            label: {
              show: false
            },
            itemStyle: {
              show: true,
              color: 'rgba(27, 134, 243, 1)'
            }
          }
        ]
      }
      option.series[0].data[0] = this.city.data.congest_mile.serious
      option.series[1].data[1] = this.city.data.congest_mile.congest
      option.series[2].data[2] = this.city.data.congest_mile.slowly
      option.series[3].data = [this.city.data.congest_mile.avg_serious, this.city.data.congest_mile.avg_congest, this.city.data.congest_mile.avg_slowly]
      myChart1.setOption(option)
    },
    /* 初始化拥堵预测的折线图 */
    initCongestionForecastLineChart: function () {
      let myChart = this.$echarts.init(document.getElementById('congestionForecastLineChart'))
      let option = {
        visualMap: {
          show: false,
          min: 0.1,
          max: 3,
          inRange: {
            color: ['rgba(0, 211, 145, .8)', 'rgba(255, 152, 0, 0.9)', 'rgba(158, 0, 27, .9)'],
            symbolSize: [1.3, 1.5, 1.7]
          }
        },
        grid: {
          x: 50,
          y: 50,
          x2: 50,
          y2: 50
        },
        xAxis: {
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255,255,255, .8)'
            }
          },
          /* 设置X轴的颜色 */
          axisLine: {
            lineStyle: {
              color: 'rgba( 255, 255, 255, .8)'
            }
          },
          data: [
            '0:00', '0:05', '0:10', '0:15', '0:20', '0:25', '0:30', '0:35', '0:40', '0:45', '0:50', '0:55',
            '1:00', '1:05', '1:10', '1:15', '1:20', '1:25', '1:30', '1:35', '1:40', '1:45', '1:50', '1:55',
            '2:00', '2:05', '2:10', '2:15', '2:20', '2:25', '2:30', '2:35', '2:40', '2:45', '2:50', '2:55',
            '3:00', '3:05', '3:10', '3:15', '3:20', '3:25', '3:30', '3:35', '3:40', '3:45', '3:50', '3:55',
            '4:00', '4:05', '4:10', '4:15', '4:20', '4:25', '4:30', '4:35', '4:40', '4:45', '4:50', '4:55',
            '5:00', '5:05', '5:10', '5:15', '5:20', '5:25', '5:30', '5:35', '5:40', '5:45', '5:50', '5:55',
            '6:00', '6:05', '6:10', '6:15', '6:20', '6:25', '6:30', '6:35', '6:40', '6:45', '6:50', '6:55',
            '7:00', '7:05', '7:10', '7:15', '7:20', '7:25', '7:30', '7:35', '7:40', '7:45', '7:50', '7:55',
            '8:00', '8:05', '8:10', '8:15', '8:20', '8:25', '8:30', '8:35', '8:40', '8:45', '8:50', '8:55',
            '9:00', '9:05', '9:10', '9:15', '9:20', '9:25', '9:30', '9:35', '9:40', '9:45', '9:50', '9:55',
            '10:00', '10:05', '10:10', '10:15', '10:20', '10:25', '10:30', '10:35', '10:40', '10:45', '10:50',
            '10:55',
            '11:00', '11:05', '11:10', '11:15', '11:20', '11:25', '11:30', '11:35', '11:40', '11:45', '11:50',
            '11:55',
            '12:00', '12:05', '12:10', '12:15', '12:20', '12:25', '12:30', '12:35', '12:40', '12:45', '12:50',
            '12:55',
            '13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50',
            '13:55',
            '14:00', '14:05', '14:10', '14:15', '14:20', '14:25', '14:30', '14:35', '14:40', '14:45', '14:50',
            '14:55',
            '15:00', '15:05', '15:10', '15:15', '15:20', '15:25', '15:30', '15:35', '15:40', '15:45', '15:50',
            '15:55',
            '16:00', '16:05', '16:10', '16:15', '16:20', '16:25', '16:30', '16:35', '16:40', '16:45', '16:50',
            '16:55',
            '17:00', '17:05', '17:10', '17:15', '17:20', '17:25', '17:30', '17:35', '17:40', '17:45', '17:50',
            '17:55',
            '18:00', '18:05', '18:10', '18:15', '18:20', '18:25', '18:30', '18:35', '18:40', '18:45', '18:50',
            '18:55',
            '19:00', '19:05', '19:10', '19:15', '19:20', '19:25', '19:30', '19:35', '19:40', '19:45', '19:50',
            '19:55',
            '20:00', '20:05', '20:10', '20:15', '20:20', '20:25', '20:30', '20:35', '20:40', '20:45', '20:50',
            '20:55',
            '21:00', '21:05', '21:10', '21:15', '21:20', '21:25', '21:30', '21:35', '21:40', '21:45', '21:50',
            '21:55',
            '22:00', '22:05', '22:10', '22:15', '22:20', '22:25', '22:30', '22:35', '22:40', '22:45', '22:50',
            '22:55',
            '23:00', '23:05', '23:10', '23:15', '23:20', '23:25', '23:30', '23:35', '23:40', '23:45', '23:50',
            '23:55'
          ]
        },
        yAxis: {
          /* 设置y轴的网格 */
          splitLine: {
            show: true
          },
          /* 设置X轴的颜色 */
          axisLine: {
            lineStyle: {
              color: 'rgba( 255, 255, 255, .8)'
            }
          }
        },
        series: {
          type: 'line',
          data: [0.86, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.86, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8,
            0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.86, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8,
            0.8, 0.8, 0.86, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.86,
            0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.86, 0.8, 0.8, 0.8, 0.8,
            0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.9, 0.91, 0.92, 0.93, 0.93, 0.93, 0.94, 0.94, 0.95,
            0.95, 0.95, 0.95, 0.95, 0.96, 0.96, 0.96, 0.96, 0.97, 0.97, 0.97, 0.97, 0.99, 1.01, 1.02, 1.03,
            1.04, 1.05, 1.06, 1.08, 1.09, 1.10, 1.120, 1.130, 1.140, 1.150, 1.6, 2.0, 2.6, 2.51, 2.54, 2.40,
            2.30, 2.35, 2.30, 2.32, 2.28, 2.25, 2.24, 2.21, 2.0, 2.1, 1.8, 2.0, 2.6, 2.30, 2.35, 2.30, 2.32,
            2.28, 2.25, 2.24, 2.0, 2.6, 2.51, 2.54, 2.40, 2.30, 2.35, 2.30, 2.32, 2.28, 2.25, 2.24, 2.21, 2.0,
            2.1, 1.8, 2.0, 2.6, 1.8, 1.5, 0.92, 0.93, 0.93, 1.10, 1.120, 1.130, 1.140, 1.150, 1.6, 2.0, 2.6,
            2.51, 2.54, 2.40, 2.30, 2.35, 2.30, 2.32, 2.28, 2.25, 2.24, 2.21, 2.0, 2.1, 1.8, 2.0, 2.6, 2.30,
            2.35, 2.30, 2.32, 2.28, 2.25, 2.24, 2.0, 2.6, 2.51, 2.54, 2.40, 2.30, 2.35, 2.30, 2.32, 2.28, 2.25,
            2.24, 2.21, 2.0, 2.1, 1.8, 2.0, 2.6, 1.8, 1.5, 0.92, 0.93, 0.93, 0.93, 0.94, 0.94, 0.95, 0.95, 0.95,
            0.95, 0.95, 0.96, 0.96, 0.96, 0.96, 0.97, 0.97, 0.97, 0.97, 0.99, 1.01, 1.02, 1.03, 1.04, 1.05,
            1.06, 1.08, 1.09, 1.10, 1.120, 1.130, 1.140, 1.150, 1.6, 2.0, 2.6, 2.51, 2.54, 2.40, 2.30, 2.35,
            2.30, 2.32, 2.28, 2.25, 2.24, 2.21, 2.0, 2.1, 1.8, 2.0, 2.6, 2.30, 2.35, 2.30, 2.32, 2.28, 2.25,
            2.24, 2.0, 2.6, 2.51, 2.54, 2.40, 2.30, 2.35, 2.30, 2.32, 2.28, 2.25, 2.24, 2.21, 2.0, 2.1, 1.8,
            2.0, 2.6, 1.8, 1.5, 0.94, 0.95
          ]
        }
      }
      myChart.setOption(option)
    },
    // 未来七天拥堵趋势预测的柱状图
    initCongestionTrendForecastForTheNextSevenDaysHistogram: function () {
      let myChart1 = this.$echarts.init(document.getElementById(
        'CongestionTrendForecastForTheNextSevenDaysHistogram'))
      let option = {
        legend: {
          right: '10%',
          top: '5%',
          data: [
            {
              name: '现在指数'
            },
            {
              name: '去年同期'
            }
          ],
          textStyle: {
            color: '#a8aab0',
            fontStyle: 'normal',
            fontFamily: '微软雅黑',
            fontSize: 12
          }
        },
        xAxis: [{
          type: 'category',
          data: ['09/18 周五', '09/19 周六', '09/20 周天', '09/21 周一', '09/22 周二', '09/23 周三', '09/24 周四'],
          axisLabel: {
            textStyle: {
              color: '#078ceb',
              fontStyle: 'normal',
              fontFamily: '微软雅黑',
              fontSize: 12
            }
          },
          // 坐标轴刻度相关设置。
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#fff'],
              opacity: 0.06
            }
          }
        }],
        yAxis: [{
          type: 'value',
          splitNumber: 5,
          axisLabel: {
            textStyle: {
              color: '#a8aab0',
              fontStyle: 'normal',
              fontFamily: '微软雅黑',
              fontSize: 12
            }
          },
          axisLine: {
            show: true
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#fff'],
              opacity: 0.06
            }
          }
        }],
        series: [
          {
            name: '现在指数',
            type: 'bar',
            data: [10, 15, 30, 45, 55, 60, 62],
            barWidth: 10,
            // 柱间距离
            barGap: 0,
            // 图形上的文本标签
            label: {
              normal: {
                show: true,
                position: 'top',
                textStyle: {
                  color: '#a8aab0',
                  fontStyle: 'normal',
                  fontFamily: '微软雅黑',
                  fontSize: 12
                }
              }
            },
            itemStyle: {
              normal: {
                show: true,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#5768EF'
                }, {
                  offset: 1,
                  color: '#5768EF'
                }]),
                barBorderRadius: 50,
                borderWidth: 0
              }
            }
          },
          {
            name: '去年同期',
            type: 'bar',
            data: [8, 5, 25, 30, 35, 55, 62],
            barWidth: 10,
            // 柱间距离
            barGap: 0,
            // 图形上的文本标签
            label: {
              normal: {
                show: true,
                position: 'top',
                textStyle: {
                  color: '#a8aab0',
                  fontStyle: 'normal',
                  fontFamily: '微软雅黑',
                  fontSize: 12
                }
              }
            },
            itemStyle: {
              normal: {
                show: true,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#69CBF2'
                }, {
                  offset: 1,
                  color: '#69CBF2'
                }]),
                barBorderRadius: 50,
                borderWidth: 0
              }
            }
          }
        ]
      }
      myChart1.setOption(option)
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
    },
    // 通过城市名获取城市详细数据
    initCityVal: function (codeVal) {
      let _this = this
      selectByCityCode(codeVal).then(request => {
        _this.city.data = request.data
        let cityIndex = parseFloat(request.data.city_detail.index)
        if (cityIndex < 1.5) {
          _this.city.data.city_detail.color = 'rgba(0, 212, 146, 1)'
          _this.city.data.city_detail.linear_color = 'rgba(0, 212, 146, 1)'
          _this.city.data.city_detail.colorType = '畅通'
          _this.city.data.city_detail.bar_width = '20%'
        } else if (cityIndex < 1.8) {
          _this.city.data.city_detail.color = 'rgba(255, 152, 0, 1)'
          _this.city.data.city_detail.linear_color = 'rgba(255, 152, 0, 1)'
          _this.city.data.city_detail.colorType = '缓行'
          _this.city.data.city_detail.bar_width = '40%'
        } else if (cityIndex < 2.0) {
          _this.city.data.city_detail.color = 'rgba(232, 13, 13, 1)'
          _this.city.data.city_detail.linear_color = 'rgba(232, 13, 13, 1)'
          _this.city.data.city_detail.colorType = '拥堵'
          _this.city.data.city_detail.bar_width = '55%'
        } else if (cityIndex >= 2.0) {
          _this.city.data.city_detail.color = 'rgba(184, 0, 32, 1)'
          _this.city.data.city_detail.linear_color = 'rgba(184, 0, 32, 1)'
          _this.city.data.city_detail.colorType = '严重拥堵'
          _this.city.data.city_detail.bar_width = '65%'
        }
        /* // 拥堵的颜色
        'color': 'rgba(255, 152, 0, 1)',
        // 拥堵条的背景颜色
        'linear_color': 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%,rgba(255, 152, 0, 1) 100%)',
        // 拥堵状态
        'colorType': '缓行',
        // 拥堵条的长度
        'bar_width': '30%' */
        // 初始化分钟级拥堵指数折现图
        _this.initCongestionLineChart()
        // 初始化七天指数的柱状图
        _this.initCongestionHistogram()
        // 初始化实时拥堵里程的柱状图
        _this.initCongestionMileageHistogram()
        /* 初始化拥堵预测的折线图 */
        _this.initCongestionForecastLineChart()
        // 未来七天拥堵趋势预测的柱状图
        _this.initCongestionTrendForecastForTheNextSevenDaysHistogram()
        _this.getHotPath(codeVal)
      }).catch(err => {
        _this.$message.error('数据添加失败了' + err)
      })
    },
    getHotPath: function (code) {
      let _this = this
      selectCityPushByCityCode(code).then(request => {
        _this.polylinePath = request.data
      }).catch(err => {
        _this.$message.error('数据添加失败了' + err)
      })
    },
    ontoCityByListClick: function (ciCode) {
      // debugger
      let isThis = this
      selectCityJBByCode(ciCode).then(request => {
        isThis.center.lng = request.data.lng
        isThis.center.lat = request.data.lat
        isThis.city.name = request.data.cityname
        isThis.htmlShow = true
        isThis.htmlSrc = 'http://47.93.229.69/static/zhihui.html?lng=' + request.data.lng + '&lat=' + request.data.lat + '&cityCode=' + ciCode + '&zoom=' + isThis.zoom
        /* isThis.htmlSrc = 'http://127.0.0.1:8848/BaiduMap1230/static/zhihui.html?lng=' + request.data.lng + '&lat=' + request.data.lat + '&cityCode=' + ciCode + '&zoom=' + isThis.zoom */
        // 执行更新数据
        isThis.initCityVal(ciCode)
        isThis.selectCity = false
        isThis.getCites(isThis.city.cityIndex)
      }).catch(err => {
        isThis.$message.error('数据添加失败了' + err)
        isThis.selectCity = false
      })
    }
  }
}
</script>
<style>
  .icon1 {
    margin-left: 0px;
    display: block;
    color: red;
  }
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
  .congestionForecastTableCSS {
    width: 4.16666%;
    height: 24px;
    border: 1px solid rgba(200, 207, 245, .2);
    padding: 5px;
    line-height: 24px;
    background-image: url(../../../static/image/highway2.png);
    background-size: 90% 90%;
    background-position: 100% 100%;
    background-repeat: no-repeat;
  }

  .Bmap {
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: -11;
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

  .congestionNumberTitleFont {
    width: 131px;
    height: 55px;
    font-size: 21px;
    color: #FFFFFF;
    line-height: 55px;
  }

  .congestionNumberFont {
    width: 71px;
    height: 31px;
    font-size: 43px;
    font-family: DIN;
    font-weight: 500;
    color: #B80120;
    line-height: 18px;
  }

  .congestionNumberSubheadFont {
    width: 83px;
    height: 17px;
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #B80120;
    line-height: 18px;
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
    margin: 0 auto;
    background-image: url(../../../static/img/yi@2x.png);
    background-position: 100% 100%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 42px;
    width: 422px;
  }

  .rect {
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

  .gradient {
    background: -moz-linear-gradient(top, rgba(23, 198, 237, .25) 0%, rgba(23, 198, 237, 0) 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, rgba(23, 198, 237, .25)), color-stop(100%, rgba(23, 198, 237, 0)));
    background: -webkit-linear-gradient(top, rgba(23, 198, 237, .25) 0%, rgba(23, 198, 237, 0) 100%);
    background: -o-linear-gradient(top, rgba(23, 198, 237, .25) 0%, rgba(23, 198, 237, 0) 100%);
    background: -ms-linear-gradient(top, rgba(23, 198, 237, .25) 0%, rgba(23, 198, 237, 0) 100%);
    background: linear-gradient(to bottom, rgba(23, 198, 237, .25) 0%, rgba(23, 198, 237, 0) 100%);
  }
  .jianbianbejingcss {
    height: 100%;
    width: 80%;
    /* background: linear-gradient(to right, rgba(0, 0, 0, 0) 0%,rgba(158, 0, 28, 1) 100%); */
  }
</style>
