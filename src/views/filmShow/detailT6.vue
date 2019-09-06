<template>
  <div class="contain">
    <div class="content-show">
      <ul class="out-carousel">
        <li class="big-carousel">
          <div class="single-carousel" :class="classObject" v-if="planMovieList.length">
            <swiper :options="swiperOption" ref="mySwiper">
              <swiper-slide v-for="(item,index) in planMovieList" :key="index">
                <div style="height:340px">
                  <img :src="item.moviePicUrl" alt="">
                </div>
                <p class="tip-white">{{item.movieName}}</p>
                <div class="swiperOption_v">
                  <swiper :options="swiperOptionv" v-if="item.timeList">
                    <swiper-slide v-for="(item2,index2) in item.timeList" :key="index2">
                      <div class="flim-Info">
                        <p class="flim-time">{{item2.showTimeStart.slice(-8).slice(0,5)}}</p>
                        <p class="flim-price">
                          <span class="price-vip"
                            v-show="infoShow.memberTicket">{{item2.ticketList[0] && item2.ticketList[0].price+"¥"}}</span>
                          <span class="price-normal"
                            v-show="infoShow.nonMemberTicket">{{item2.ticketList[1] && item2.ticketList[1].price+"¥"}}</span>
                        </p>
                        <p class="fime-type">
                          <span class="type-language">{{item.movieLanguage}}</span>
                          <span class="type-type">{{item. disVersion}}</span>
                          <span class="type-position" v-show="infoShow.hallName">{{item2.hallName}}</span>
                          <span class="type-price">{{item2.leftSeatNum}} / {{item2.seatNum}}</span>
                        </p>
                      </div>
                    </swiper-slide>
                  </swiper>
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </li>
      </ul>
    </div>
    <div class="btn-area">
      <el-button type="primary" @click="$router.go(-1)">返回</el-button>
    </div>
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
        classObject: {
          balckBgc: false,
          blueBgc: false,
          greenBgc: false,
          redBgc: false
        },
        planMovieList: [], // 影片信息
        showList: [], // 显示信息
        infoShow: {
          nonMemberTicket: false, //票价
          memberTicket: false, //会员价
          hallName: false, // 影厅名称
          seatNum: false, // 总座位数
          leftSeatNum: false, // 剩余座位数
        },
         swiperOption: {
          observer: true, //修改swiper自己或子元素时，自动初始化swiper 
          observeParents: true, //修改swiper的父元素时，自动初始化swiper 
          observeSlideChildren:true,
          slidesPerView: 5,
          spaceBetween: 15,
          speed: 300,
          autoplay: { // 自动切换
            delay: 1000,
            stopOnLastSlide: false,
            disableOnInteraction: false,
          },
          loop: true,
          loopAdditionalSlides:1,
          // slidesPerView: '5',
          loopedSlides: 5,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          // on:{
          //   slideChange: function(){
          //     _this.$refs.mySwiper
          //   }
          // },
        },
        swiperOptionv: {
          observer: true, //修改swiper自己或子元素时，自动初始化swiper 
          observeParents: true, //修改swiper的父元素时，自动初始化swiper 
          observeSlideChildren:true,
          grabCursor: true,
          centeredSlides: true,
          // slidesPerView: 5,
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
            disableOnInteraction: false,
          },
          loop: true,
           loopAdditionalSlides:2,
          direction: 'vertical',
          //   slidesPerView: '2',
          // loopedSlides: 1,
          // spaceBetween: 20,
        },
        planMovieList: [], // 影片信息
        timeList: [], // 时间信息
        vipPrice: "",
        commonPrice: "",
        websock:null,
        timeoutNum: 30000,
        heart:null,
      }
    },
    methods: {
      templateDetail() { // 获取详细信息
        let terminalInfo = JSON.parse(localStorage.ctmRemberTerminal)
        let httpObj = {
          tenantId: terminalInfo.tenantId, // 租户ID
          terminalCode: terminalInfo.code, // 账号的状态
          terminalKey: terminalInfo.password, // 终端账号密码
          templateCode: this.$route.query.templateCode  || "T1"
          // templateCode: 'T1'
        }
        console.log(httpObj)
        this.$ctmList.templateDetail(httpObj).then(res => {
          console.log(res)
          if (res.code === 200) {
            this.planMovieList = res.data.planMovieList;
            for(let i=0;i<3;i++){
              this.planMovieList = this.planMovieList.concat(this.planMovieList)
            }
            this.templateStyle = res.data.template;
            if(res.data.template.backgroundColor.indexOf('#')== 0 || !res.data.template.backgroundColor) res.data.template.backgroundColor = "balckBgc"
            this.classObject[res.data.template.backgroundColor] = true;
            this.showList = res.data.template.columnList
            this.showList.length && this.showList.forEach(item => {
              console.log(item)
              this.infoShow[item] = true
            })
          } else {
            this.error(res.msg)
          }
        })
      },
      heartReset() {
                clearInterval(this.heart);
                this.heartStart();
            },
            heartStart() {
                this.heart = setInterval(() => {
                    this.websocketsend('holdOn')
                }, this.timeoutNum)
            },

            reconnect() {
                if(this.lockReconnect) {
                    return
                }
                this.lockReconnect = true
                this.reInit = setTimeout( () => {     //没连接上会一直重连，设置延迟避免请求过多
                this.initWebSocket();
                this.lockReconnect = false
                }, 4000);
            },

            initWebSocket(){ //初始化weosocket
                // console.log("开始重连")
                let terminalInfo = JSON.parse(localStorage.ctmRemberTerminal)
                this.websock = new WebSocket(`${this.$wsUrl}/${terminalInfo.tenantId}/${terminalInfo.cinemaUid}/${terminalInfo.licenseKey}`);
                this.websock.onopen = this.websocketonopen;
                this.websock.onmessage = this.websocketonmessage;
                this.websock.onerror = this.websocketonerror;
                this.websock.onclose = this.websocketclose;
            },
            websocketonopen(e){ //连接建立之后执行send方法发送数据
                // console.log('setUpWS', e)
                this.heartReset()
            },
            websocketonerror(e){//连接建立失败重连
                // console.log('connectErr', e)
                this.reconnect()
                
            },
            websocketonmessage(e){
                // console.log('receiveMessage', e)
                // console.log(this.$route)
                // if(this.$route.name != 'toHome') return
                if(e.data != '连接成功' && e.data != 'holdOn') {
                  let data = (JSON.parse(e.data))
                     if(data.type == 1){
                      console.log(1)
                      this.templateDetail()
                    }
                    
                }
                this.heartReset()
            },  
            websocketsend(Data){//数据发送
                // console.log('sendMessage', Data)
                this.websock.send(Data)
            },
            websocketclose(e){  //关闭
                // console.log('close', e)
                this.reconnect()
            },

            //切换页面干掉webSocket
            killWebSocket() {
                clearInterval(this.heart);
                this.lockReconnect = true;
                clearInterval(this.reInit);
                this.websock.onclose = null;
                this.websock.onerror = null;
                this.websock = null;
            },
    },
    created() {
      this.templateDetail()
      this.initWebSocket()
    },
    beforeDestroy() {
      // if (this.timer) {
      //   clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
      // }
      this.killWebSocket()
    }
  }
</script>
<style lang="scss" scoped>
  // img {
  //   width: 100%;
  //   height: 100px;
  // }
  .balckBgc {
    // 高端黑
    background-image: linear-gradient(0deg, #1D222D 0%, #51586C 99%);
  }

  .blueBgc {
    // TV蓝
    background-image: linear-gradient(-179deg, #16599F 0%, #1B082D 100%);
  }

  .greenBgc {
    // TV绿
    background-image: linear-gradient(-180deg, #074755 0%, #0A1E39 100%);
  }

  .redBgc {
    // TV红
    background-image: linear-gradient(0deg, #26001B 0%, #961340 99%);
  }

  .contain {
    img {
      width: 238px;
      height: 340px;
    }

    // height: 90vh;
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
      .out-carousel {
        // display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;

        .big-carousel {
          width: 100%;

          // margin: 1em;
          .single-carousel {
            overflow: hidden;
            height: 100vh;

            .swiper-slide {
              padding: 1em;

              .tip-white {
                width: 230px;
                font-family: PingFangSC-Semibold;
                font-size: 14px;
                color: #FFFFFF;
                text-align: center;
                line-height: 57px;
                overflow: hidden;
                /*内容超出宽度时隐藏超出部分的内容 */
                text-overflow: ellipsis;
                /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
                white-space: nowrap;
                /*不换行 */
              }
            }

            .swiperOption_v {
              width: 230px;

              .swiper-slide {
                width: 100%;

                padding: 0;

                // height: 40px;
                // background-color: red;
                .flim-Info {
                  // height: 124px;
                  height: 86px;
                  margin-bottom: 20px;
                  border: 2px solid white;
                  position: relative;
                  // padding: 8px;
                  border-radius: 3px;

                  .flim-time {
                    font-size: 28px;
                    font-family: DINAlternate-Bold;
                    color: white;
                    padding: 0.5em;
                  }

                  .flim-price {
                    position: absolute;
                    right: 0;
                    top: 0;

                    .price-vip {
                      display: block;
                      color: #333;
                      font-size: 12px;
                      padding: 2px 4px 2px 8px;
                      background-image: url("./filmShow.png")
                    }

                    .price-normal {
                      display: block;
                      color: white;
                      text-align: right;
                      padding: 2px 4px;
                    }
                  }

                  .fime-type {
                    display: flex;

                    .type-language {
                      background: #FDFF82;
                      border-radius: 4px;
                      color: #000;
                      padding: 0 2px;
                      height: 16px;
                      font-size: 14px;
                      line-height: 16px;
                      // height: 24px;
                      white-space: nowrap;
                      // line-height: 24px;
                      margin: 0 2px;
                      // margin: 8px 0 8px 8px;
                    }

                    .type-type {
                      padding: 0 2px;
                      line-height: 16px;
                      background: #181A21;
                      // background: #3F0021;
                      opacity: 0.8;
                      border-radius: 4px;
                      // color: white;
                      white-space: nowrap;
                      height: 16px;
                      line-height: 16px;
                    }

                    .type-position {
                      font-family: PingFangSC-Semibold;
                      font-size: 13px;
                      color: #FFBAC9;
                      padding: 2px;
                      color: #A9B1CE;
                      white-space: nowrap;
                      margin-top: -3px;
                    }

                    .type-price {
                      margin-top: -3px;
                      font-family: DINAlternate-Bold;
                      font-size: 12px;
                      line-height: 24px;
                      color: #FFBAC9;
                      font-size: 12px;
                      color: rgb(100, 106, 118);
                      padding: 0px 0 0 4px;
                    }
                  }
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

  .btn-area {
    display: flex;
    justify-content: center;
    margin: 2em 0 1em;

    .el-button {
      padding: 9px 27px;
    }
  }
</style>