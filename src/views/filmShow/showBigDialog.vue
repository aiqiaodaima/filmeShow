<template>
  <div class="my_dialog">
    <el-dialog :visible.sync="dialogTableVisible">
      <div class="contain">
        <div class="content-show">
          <ul class="out-carousel">
            <li class="big-carousel">
              <div class="single-carousel" :style="{'backgroundColor':templateStyle.backgroundColor}">
                <swiper :options="swiperOption" v-if="planMovieList.length">
                  <swiper-slide v-for="(item,index) in planMovieList" :key="index">
                    <div>
                      <img :src="item.moviePicUrl" alt="">
                    </div>
                    <p class="tip-white">{{item.movieName}}</p>
                    <div class="swiperOption_v">
                      <swiper :options="swiperOptionv">
                        <swiper-slide v-for="(item2,index2) in item.timeList" :key="index2">
                          <div class="flim-Info">
                            <p class="flim-time">{{item2.showTimeStart}}</p>
                            <p class="flim-price">
                              <span class="price-vip">会员120¥</span>
                              <span class="price-normal">240¥</span>
                            </p>
                            <p class="fime-type">
                              <span class="type-language">{{item.movieName}}</span>
                              <span class="type-type">{{item.movieLanguage}}</span>
                              <span class="type-position">{{item2.hallName}}</span>
                              <span class="type-price">{{item2.leftSeatNum / item2.seatNum}}</span>
                            </p>
                          </div>
                        </swiper-slide>
                      </swiper>
                    </div>
                  </swiper-slide>
                </swiper>
              </div>
              <!-- <p class="address-p">地址： www.oristarclound.com/mvs/t1.jsp</p> -->
              <!-- <p class="tip-p">模板编号{{}}</p> -->
            </li>
          </ul>
        </div>
      </div>

    </el-dialog>
  </div>

</template>
<script>
  import {
    swiper,
    swiperSlide
  } from 'vue-awesome-swiper'
  export default {
    components: {
      swiper,
      swiperSlide
    },
    data() {
      return {
        dialogTableVisible: false,
        templateStyle:{},
        swiperOption: {
          observer: true, //修改swiper自己或子元素时，自动初始化swiper 
          observeParents: true, //修改swiper的父元素时，自动初始化swiper 
          slidesPerView: 3,
          spaceBetween: 15,
          speed: 300,
          autoplay: { // 自动切换
            delay: 2500,
            disableOnInteraction: false
          },
          loop: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          breakpoints: { // 响应布局
            1024: {
              slidesPerView: 3,
              spaceBetween: 40
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            320: {
              slidesPerView: 1,
              spaceBetween: 10
            }
          }
        },
        swiperOptionv: {
          observer: true, //修改swiper自己或子元素时，自动初始化swiper 
          observeParents: true, //修改swiper的父元素时，自动初始化swiper 
          grabCursor: true,
          centeredSlides: true,
          slidesPerView: 'auto',
          coverflowEffect: {
            rotate: 10,
            stretch: -10,
            depth: 10,
            modifier: 2,
            slideShadows: true
          },
          speed: 300,
          autoplay: { // 自动切换
            delay: 1000,
            stopOnLastSlide: false,
            disableOnInteraction: true,
          },
          loop : true,
          direction: 'vertical',
          spaceBetween: 20,
        },
        planMovieList: [], // 影片信息
        timeList: [] // 时间信息
      }
    },
    methods: {
      templateDetail() { // 获取详细信息
        let terminalInfo = JSON.parse(localStorage.ctmRemberTerminal)
        let httpObj = {
          tenantId: terminalInfo.tenantId, // 租户ID
          terminalCode: terminalInfo.code, // 账号的状态
          terminalKey: terminalInfo.password, // 终端账号密码
          // templateCode: this.$router.query.templateCode  || "T1"
          templateCode: 'T1'
        }
        console.log(httpObj)
        this.$ctmList.templateDetail(httpObj).then(res => {
          console.log(res)
          if (res.code === 200) {
            this.planMovieList = res.data.planMovieList;
            this.templateStyle = res.data.template
          } else {
            this.error(res.msg)
          }
        })
      },
      getKey(httpObj) { // 获取凭证
        this.$ctmList.templatecinemaUid(httpObj).then(res => {
          console.log(res)
          if (res.code === 200) {

            this.planMovieList = res.data.planMovieList;
          } else {
            this.error(res.msg)
          }
        })
      }
    },
    created() {
      // this.templateDetail()
    }
  }
</script>

<style lang="scss" scoped>
  .my_dialog {
    /deep/ .el-dialog {
      width: 918px;

      .el-dialog__header {
        display: none;
      }

      .el-dialog__body {
        padding: 0;

      }

      img {
        width: 100%;
        height: 100px;
      }

      .contain {
        .header-title {
          display: flex;
          justify-content: center;
          height: 36px;
          line-height: 36px;
          position: relative;

          &::after {
            display: block;
            content: "";
            width: 100%;
            position: absolute;
            height: 1px;
            background-color: #999;
            top: 40px;
          }
        }

        .content-show {
          // margin: 2rem;
          display: flex;
          justify-content: space-between;

          .out-carousel {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            width: 100%;

            .big-carousel {
              width: 100%;
              // margin: 1em;

              .single-carousel {
                height: 600px;
                overflow: hidden;
                border: 1px solid #333;
                background-color: rgb(10, 30, 45);

                .swiper-slide {
                  padding: 1em;

                  .tip-white {
                    color: white;
                    line-height: 32px;
                    height: 32px;
                    text-align: center;
                  }
                }

                .swiperOption_v {
                  .swiper-slide {
                    width: 100%;
                    padding: 0;

                    // height: 40px;
                    // background-color: red;
                    .flim-Info {
                      border: 2px solid white;
                      position: relative;
                      padding: 8px;
                      border-radius: 5px;

                      .flim-time {
                        font-size: 16px;
                        color: white;
                        padding: 0.5em;
                      }

                      .flim-price {
                        position: absolute;
                        right: 0;
                        top: 0;

                        .price-vip {
                          display: block;
                          background: white;
                          color: #333;

                        }

                        .price-normal {
                          display: block;
                          color: white;
                          text-align: right;
                          padding: 4px;
                        }
                      }

                      .fime-type {
                        display: flex;

                        .type-language {
                          background: yellow;
                          color: #000;
                          padding: 2px;
                          white-space: nowrap;
                          border-radius: 1px;
                        }

                        .type-type {
                          padding: 2px;
                          background: #999;
                          color: white;
                          white-space: nowrap;
                        }

                        .type-position {
                          padding: 2px;
                          // background: #999;
                          color: white;
                          white-space: nowrap;
                        }

                        .type-price {
                          font-size: 12px;
                          color: rgb(100, 106, 118);
                          line-height: 16px;
                        }
                      }

                      // width: 200px;
                      // height: 100px;
                    }
                  }
                }
              }

              .address-p {
                text-align: center;
                height: 24px;
                line-height: 24px;
              }

              .tip-p {
                text-align: center;
                font-weight: 600;
                color: #333;
                font-size: 16px;
                height: 32px;
                line-height: 32px;
              }
            }
          }

        }
      }




    }
  }
</style>