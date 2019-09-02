<template>
  <div class="bg_contain">
    <header>
      <div class="right-header">
        <p class="code_word">
          {{dateTime}}
        </p>
      </div>
    </header>
    <div class="content-show">
      <swiper :options="swiperOption" ref="swiper" v-if="swiperNum">
        <swiper-slide v-for="a in swiperNum" :key="a">
          <div class="item-div" v-for="(item,index) in arrList[a-1]" :key="index">
            <p class="p-title">{{item.movieName}} <span>{{item.movieLanguage}}/{{item.disVersion}}</span></p>
            <p class="p-time"><span>{{item.timeLong}}分钟</span><span>¥120</span></p>
            <ul class="ul-playTime">
              <li v-for="(i,j) in item.timeList" :key="j">
                {{i.showTimeStart.substring(10,16)}}
              </li>
            </ul>
          </div>
        </swiper-slide>
      </swiper>
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
      let that = this
      return {
        classObject: {
          balckBgc: false,
          blueBgc: false,
          greenBgc: false,
          redBgc: false
        },
        swiperOption: {
          slidesPerView: 'auto',
          autoplay: {
            delay: 5000,
            disableOnInteraction: false
          },
          loop: true,
          // spaceBetween: 40,
          on: {
            slideChange: function () {
            
              console.log('slideChange', this.previousIndex, '->', this.activeIndex)
            },
          }
        },
        dateTime: new Date().toLocaleString(),
        arrList: [],
        status: 1,
        tenantId: "",
        terminalCode: "",
        pageNum: 1,
        pageSize: 2,
        swiperNum: "",
      }
    },
    methods: {
      getList() {
        let terminalInfo = JSON.parse(localStorage.ctmRemberTerminal)
        let httpObj = { // 获取轮播图的信息
          tenantId: terminalInfo.tenantId, // 租户ID
          terminalCode: terminalInfo.code, // 账号的状态
          terminalKey: terminalInfo.password, // 终端账号密码
          templateCode: "T3", // 随便给的值
          pageNum: this.pageNum,
          // pageSize: this.pageSize,
          pageSize: 100,
          planDate: '2019-09-02'
        }
        // this.tenantId = terminalInfo.tenantId;
        // this.terminalCode = terminalInfo.code
        // this.status = terminalInfo.status ? "启用" : "暂停"
        this.$ctmList.templateT3Detail(httpObj).then(res => {
          console.log(res)
          if (res.code === 200 && res.data) {
            this.classObject[res.data.template.backgroundColor] = true;
            // this.arrList = res.data.planMovieListPage.list
            this.swiperNum = Math.ceil(res.data.planMovieListPage.total / this.pageSize)
            for (let i = 0; i < this.swiperNum; i++) {
              let temp = res.data.planMovieListPage.list.slice(i * 2, i * 2 + 2);
              this.arrList.push(JSON.parse(JSON.stringify(temp)));
              console.log(this.arrList)
            }
          } else {
            this.error(res.msg)
          }
        })
      },
      goAddress(tCode) {
        this.$router.push({
          path: `detail${tCode}`,
          query: {
            templateCode: tCode
          }
        })

      }
    },
    // watch:{
    //   pageNum(){
    //     console.log(this.pageNum)
    //     this.getList()
    //   }
    // },
    mounted() {
      this.timer = setInterval(() => {
        this.dateTime = new Date().toLocaleString(); // 修改数据date
      }, 1000)
      this.getList()
    },
    beforeDestroy() {
      if (this.timer) {
        clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
      }
    }
  }
</script>
<style lang="scss" scoped>
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
  .bg_contain {
    background-image: linear-gradient(-135deg, #131720 0%, #1E2643 100%);


    min-height: 100vh;

    // padding-left: 120px;
    header {
      background-image: url(./bglight.png);
      background-repeat: no-repeat;
      padding: 80px 0 0 120px;
      position: relative;

      .en_word {
        width: 265px;
        background-image: linear-gradient(-90deg, #14275E 0%, #6690FF 100%);
        font-family: DINAlternate-Bold;
        font-size: 28px;
        color: transparent;
        -webkit-background-clip: text;
        letter-spacing: 0;
        text-shadow: 0 2px 4px #181E30;
      }

      .ch_word {
        font-family: PingFangSC-Semibold;
        font-size: 64px;
        color: #FFFFFF;
        letter-spacing: 0;
      }

      .right-header {
        position: absolute;
        top: 57px;
        right: 28px;

        .code_word {
          font-family: PingFangSC-Semibold;
          font-size: 24px;
          color: #6F80B0;
          letter-spacing: 0;
          margin-bottom: 12px;
        }

        .status_word {
          position: absolute;
          right: 0;
          text-align: center;
          width: 90px;
          height: 40px;
          line-height: 40px;
          background: #38AD65;
          border-radius: 10px;
          font-family: PingFang-SC-Bold;
          font-size: 24px;
          color: #FFFFFF;
          letter-spacing: 0;
        }
      }
    }
  }

  .content-show {
    padding: 0 120px;
    margin-top: 64px;

    .item-div {
      .p-title {
        font-family: PingFangSC-Semibold;
        font-size: 44px;
        color: #FFFFFF;
        letter-spacing: 0;

        span {
          font-family: PingFangSC-Regular;
          font-size: 28px;
          color: #FFFFFF;
          letter-spacing: 0;
          text-align: right;
        }
      }

      .p-time {
        span {
          background: #111625;
          border: 1px solid #445380;
          border-radius: 10px;
          font-family: PingFangSC-Semibold;
          padding: 0 8px;
          font-size: 22px;
          color: #C8D6FF;
          letter-spacing: 0;
          text-align: center;
          margin-right: 8px;
        }
      }

      .ul-playTime {
        display: flex;
        flex-wrap: wrap;
        margin-top: 32px;

        li {
          background-image: linear-gradient(90deg, #212C53 0%, #313E5F 100%);
          box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.20);
          border-radius: 10px;
          font-family: DINAlternate-Bold;
          font-size: 34px;
          color: #FFFFFF;
          letter-spacing: 0;
          padding: 15px 24px;
          margin: 0 36px 30px 0;
        }
      }
    }



  }
</style>