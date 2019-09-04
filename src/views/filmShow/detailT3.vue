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
            <p class="p-title">{{item.movieName}} <span>{{item.movieLanguage}}/{{item.disVersion}}</span>
              <span class="span-time">{{item.timeLong}}分钟</span>
            </p>
            <ul class="ul-playTime">
              <li v-for="(i,j) in item.timeList" :key="j">
                <p class="movie-time">{{i.showTimeStart.substring(10,16)}}</p>
                <p class="movie-price">
                    <span class="vip_price"
                      v-show="infoShow.memberTicket && i.ticketList[1]">¥{{i.ticketList[1] && i.ticketList[1].totalPrice}}</span>
                    <span class="normal_price" v-show="infoShow.memberTicket && infoShow.nonMemberTicket && i.ticketList[1] && i.ticketList[0]">/</span>
                    <span class="normal_price"
                      v-show="i.ticketList[0] && infoShow.nonMemberTicket">¥{{i.ticketList[0] && i.ticketList[0].totalPrice}}</span>
                  </p>
              </li>
            </ul>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
<script>
  function dateFormat(fmt, date) {
    let ret;
    let opt = {
      "Y+": date.getFullYear().toString(), // 年
      "m+": (date.getMonth() + 1).toString(), // 月
      "d+": date.getDate().toString(), // 日
      "H+": date.getHours().toString(), // 时
      "M+": date.getMinutes().toString(), // 分
      "S+": date.getSeconds().toString() // 秒
    };
    for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
        fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
      };
    };
    return fmt;
  }
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
        infoShow: {
          nonMemberTicket: false, //票价
          memberTicket: false, //会员价
          hallName: false, // 影厅名称
          seatNum: false, // 总座位数
          leftSeatNum: false, // 剩余座位数
        },
        swiperOption: {
          slidesPerView: 'auto',
          autoplay: {
            delay: 10000,
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
          // planDate: '2019-09-05'
          // planDate:dateFormat("YYYY-mm-dd", new Date())
        }
        this.$ctmList.templateDetail(httpObj).then(res => {
          console.log(res)
          if (res.code === 200 && res.data) {
            this.arrList = [];
            this.classObject[res.data.template.backgroundColor] = true;
            // this.arrList = res.data.planMovieListPage.list
            this.swiperNum = Math.ceil(res.data.planMovieListPage.total / this.pageSize)
            for (let i = 0; i < this.swiperNum; i++) {
              let temp = res.data.planMovieListPage.list.slice(i * 2, i * 2 + 2);
              this.arrList.push(JSON.parse(JSON.stringify(temp)));
              console.log(this.arrList)
            }
            this.showList = res.data.template.columnList
            this.showList.length && this.showList.forEach(item => {
              console.log(item)
              this.infoShow[item] = true
            })
          } else {
            this.error(res.msg)
          }
        })
      }
    },
    mounted() {
      this.timer = setInterval(() => {
        this.dateTime = new Date().toLocaleString(); // 修改数据date
      }, 1000)
      this.timer2 = setInterval(() => {
       this.getList()
      }, 10000)
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

  // height: 100vh;
  // overflow: hidden;
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
        top: 2rem;
        right: 1.4rem;

        .code_word {
          font-family: PingFangSC-Semibold;
          font-size: 1.2rem;
          color: #6F80B0;
          letter-spacing: 0;
          margin-bottom: .6rem;
        }
      }
    }
  }

  .content-show {
    padding: 0 6rem;
    margin-top: 1.2rem;

    .item-div {
      .p-title {
        font-family: PingFangSC-Semibold;
        font-size: 2.2rem;
        color: #FFFFFF;
        letter-spacing: 0;

        span {
          font-family: PingFangSC-Regular;
          font-size: 1.4rem;
          color: #FFFFFF;
          letter-spacing: 0;
          text-align: right;
        }

        .span-time {
          background: #111625;
          border: 1px solid #445380;
          border-radius: 10px;
          font-family: PingFangSC-Semibold;
          padding: 0 .4rem;
          font-size: 1.1rem;
          color: #C8D6FF;
          letter-spacing: 0;
          text-align: center;
          margin-right: .4rem;
        }
      }


      .ul-playTime {
        display: flex;
        flex-wrap: wrap;
        margin-top: 1rem;

        li {
          background-image: linear-gradient(90deg, #212C53 0%, #313E5F 100%);
          box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.20);
          border-radius: 10px;
          padding: 15px 24px;
          margin: 0 1.5rem 1.2rem 0;

          .movie-time {
            font-family: DINAlternate-Bold;
            font-size: 1.7rem;
            color: #FFFFFF;
            letter-spacing: 0;
          }

          .movie-price {
            .vip_price {
              font-family: DINAlternate-Bold;
              font-size: 1.1rem;
              color: #FD9918;
              letter-spacing: 0;
            }

            .normal_price {
              font-family: DINAlternate-Bold;
              font-size: .9rem
              ;
              color: #6F80B0;
              letter-spacing: 0;
            }
          }
        }
      }
    }



  }
</style>