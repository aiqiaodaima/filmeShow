<template>
  <div class="bg_contain">
    <header>
      <p class="en_word">SCHEDULED DISPLAY</p>
      <p class="ch_word">慧影云排期展示</p>
      <div class="right-header">
        <p class="code_word">
          当前终端编号：{{terminalCode}}
        </p>
        <p class="status_word">
          {{status}}
        </p>
      </div>
    </header>
    <div class="content-show">
      <!-- <swiper :options="swiperOption">
        <swiper-slide v-for="(item,index) in arrList" :key="index">
          <div class="single-carousel" @click="goAddress(item.tCode)">
            <img :src="item.thumbnail" alt="">
          </div>

          <p class="tip-p">{{item.name}}</p>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper> -->
      <div class="swiper-container swiper-container-h" v-if="arrList.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in arrList" :key="index">
            <div class="single-carousel" @click="goAddress(item.tCode)">
              <img :src="item.thumbnail" alt="">
            </div>
            <p class="tip-p">{{item.name}}</p>
          </div>      
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
  </div>
</template>
<script>
let domain = document.domain,
protocol = window.location.protocol;
  // import {
  //   swiper,
  //   swiperSlide
  // } from 'vue-awesome-swiper'
  import md5 from 'js-md5'
  export default {
    // components: {
    //   swiper,
    //   swiperSlide
    // },
    data() {
      return {
        // licenseKey:this.$route.query.license || "",
        swiperOption: {
          slidesPerView: 'auto',
          autoplay: {
            delay: 2500,
            disableOnInteraction: false
          },
          spaceBetween: 40,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        },
        arrList: [],
        status: 1,
        tenantId: "",
        terminalCode: ""
      }
    },
    methods: {
      getList() {
        let terminalInfo = JSON.parse(localStorage.ctmRemberTerminal)
        let httpObj = { // 获取轮播图的信息
          tenantId: terminalInfo.tenantId, // 租户ID
          terminalCode: terminalInfo.code, // 账号的状态
          terminalKey: terminalInfo.password, // 终端账号密码
          templateCode: "T" // 随便给的值
        }
        this.tenantId = terminalInfo.tenantId;
        this.terminalCode = terminalInfo.code
        this.status = terminalInfo.status ? "启用" : "暂停"
        this.$ctmList.getSwiperList(httpObj).then(res => {
          console.log(res)
          if (res.code === 200 && res.data) {
            this.arrList = res.data.displayTemplates
            this.arrList.length && this.arrList.forEach(item => {
              item.addressUrl = res.data.videoShowPlanUrl + item.url
            })
            this.$nextTick(()=>{
              this.initSwiper()
            })
          } else {
            this.error(res.msg)
            this.status = "暂停"
          }
        })
      },
      filmLogin() {
        let httpObj = {
          licenseKey: this.licenseKey,
          type: 1 // 账号类型,1排期展示 2语言播报
        }
        this.$ctmList.filmLogin(httpObj).then(res => {
          console.log(res)
          if (res.code === 200 && res.data) {
            debugger
            res.data.passwordMd5 = md5(res.data.password)
            localStorage.setItem("ctmRemberTerminal", JSON.stringify(res.data))
            this.getList()
          } else {
            localStorage.removeItem("ctmRemberTerminal")
            this.error(res.data);
          }
        })
      },
      goAddress(tCode) {
        // window.location.href = protocol+ "//" + domain + "/detail" + tCode + "?template=" + tCode
        this.$router.push({
          path: `/detail${tCode}`,
          query: {
            templateCode: tCode
          }
        })
      },
      initSwiper(){
         var swiperH = new Swiper('.swiper-container-h', {
        resistanceRatio: 0,
        slidesPerView: 'auto',
        spaceBetween: 0,
        // slidesPerView: 3,
        autoplay: {
          delay: 2500,
          disableOnInteraction: true,
        },
         pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        loop: true,
        autoHeight:false,
      });
      }
    },
    mounted() {
     
      this.getList()
      // let routeQuery = this.$route.query
      // if(!localStorage.ctmRemberTerminal){
      //   if(routeQuery.license){
      //     this.filmLogin()
      //   }else{
      //     this.$router.push('login')
      //   }
      // }else{
      //   if (routeQuery.template){
      //     return this.$router.push({
      //       path: `detailT${routeQuery.template}?templateCode=T${routeQuery.template}`
      //     })
      //   }
      //   this.getList()
      // }

      // if(this.$route.query.template){
      //   this.goAddress(this.$route.query.template)
      // }
      // this.filmLogin()
      // this.translateRow()
    }
  }
</script>
<style lang="scss" scoped>
  // 1rem = 20px;
  .bg_contain {
    background-image: linear-gradient(-135deg, #131720 0%, #1E2643 100%);
    min-height: 100vh;

    // padding-left: 120px;
    header {
      background-image: url(./bglight.png);
      background-repeat: no-repeat;
      padding: 2rem 0 0 6rem;
      position: relative;

      .en_word {
        background-image: linear-gradient(-90deg, #14275E 0%, #6690FF 100%);
        font-family: DINAlternate-Bold;
        font-size: 1.4rem;
        color: transparent;
        -webkit-background-clip: text;
        letter-spacing: 0;
        text-shadow: 0 2px 4px #181E30;
      }

      .ch_word {
        font-family: PingFangSC-Semibold;
        font-size: 3.2rem;
        color: #FFFFFF;
        letter-spacing: 0;
      }

      .right-header {
        position: absolute;
        top: 3.2rem;
        right: 1.4rem;

        .code_word {
          font-family: PingFangSC-Semibold;
          font-size: 1.2rem;
          color: #6F80B0;
          letter-spacing: 0;
          margin-bottom: .6rem;
        }

        .status_word {
          position: absolute;
          right: 0;
          text-align: center;
          width: 4.5rem;
          height: 2rem;
          line-height: 2rem;
          background: #38AD65;
          border-radius: 10px;
          font-family: PingFang-SC-Bold;
          font-size: 1.2rem;
          color: #FFFFFF;
          letter-spacing: 0;
        }
      }
    }
  }

  .content-show {
    padding-left: 6rem;
    margin-top: 3.2rem;

    .single-carousel {
      width: 36.2rem;
      height: 20.3rem;
      cursor: pointer;
    }

    img {
      width: 36.2rem;
      height: 20.3rem;
    }

    .swiper-slide {
      width: 37.7rem !important;
    }

    .tip-p {
      font-family: PingFang-SC-Bold;
      font-size: 1.4rem;
      color: #FFFFFF;
      letter-spacing: 0;
    }
    .swiper-container{
      overflow-y: visible;
      height: 24rem;
    }
    .swiper-pagination {
      // bottom: -3rem;
      // position: relative;
      text-align: left;
      margin-top: 3.5rem;
    }

    /deep/ .swiper-pagination-bullet {
      width: 1.6rem;
      height: .4rem;
      background: #404B6B;
      border-radius: 7.5px;
    }

    /deep/ .swiper-pagination-bullet-active {
      width: 3.1rem;
      background-image: linear-gradient(-270deg, #537BE6 2%, #94B1FF 100%);
      box-shadow: 0 5px 20px 0 #123FC0;
      border-radius: 7.5px;
    }
  }
</style>