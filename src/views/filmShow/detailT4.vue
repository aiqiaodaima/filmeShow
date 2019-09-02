<template>
  <div class="bg_contain">
    <header>
      <p class="en_word">MOVIE NEWS</p>
      <p class="ch_word">今日影讯</p>
    </header>
    <div class="content-show">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item,index) in arrList" :key="index">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="影片名称" width="180">
            </el-table-column>
            <el-table-column prop="name" label="语种" width="180">
            </el-table-column>
            <el-table-column prop="address" label="影厅">
            </el-table-column>
            <el-table-column prop="name" label="开场时间" width="180">
            </el-table-column>
            <el-table-column prop="address" label="售价">
            </el-table-column>
            <el-table-column prop="name" label="会员价" width="180">
            </el-table-column>
            <el-table-column prop="address" label="可售座位">
            </el-table-column>
          </el-table>


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
      return {
        swiperOption: {
          slidesPerView: 'auto',
          autoplay: {
            delay: 5000,
            disableOnInteraction: false
          },
          // spaceBetween: 40,
          // pagination: {
          //   el: '.swiper-pagination',
          //   clickable: true
          // }
        },
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
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
    mounted() {
      this.getList()
      // this.translateRow()
    }
  }
</script>
<style lang="scss" scoped>
  .bg_contain {
    background-image: linear-gradient(-135deg, #131720 0%, #1E2643 100%);
    height: 100vh;

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
        top: 84px;
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

    /deep/ .content-show {
      padding: 0 120px;

      .el-table {
        background: transparent;

        .has-gutter {
          tr {}
        }
      }

    }
  }
</style>