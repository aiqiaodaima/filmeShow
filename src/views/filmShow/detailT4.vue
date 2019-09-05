<template>
  <div class="bg_contain">
    <header>
      <!-- <p class="en_word">MOVIE NEWS</p> -->
      <p class="ch_word">今日影讯</p>
    </header>
    <div class="content-show">
      <el-row class="table_head">
        <el-col :span="4">影片名称</el-col>
        <el-col :span="3">语种</el-col>
        <el-col :span="3">影厅</el-col>
        <el-col :span="4">开场时间</el-col>
        <el-col :span="3">售价</el-col>
        <el-col :span="3">会员价</el-col>
        <el-col :span="4">可售座位</el-col>
      </el-row>
      <swiper :options="swiperOption" v-if="arrList.length">
        <swiper-slide v-for="a in swiperNum" :key="a">
          <el-row class="table_body" v-for="(item,index) in arrList[a-1]" :key="index">
            <el-col :span="4">{{item.movieName}}</el-col>
            <el-col :span="3">{{item.movieLanguage}}</el-col>
            <el-col :span="3">{{item.hallName}}</el-col>
            <el-col :span="4">{{item.showTimeStart.substring(10,16)}}</el-col>
            <el-col :span="3">{{item.ticketList[0] && item.ticketList[0].totalPrice || "无"}}</el-col>
            <el-col :span="3">{{item.ticketList[1] && item.ticketList[1].totalPrice || "无"}}</el-col>
            <el-col :span="4">{{item.seatNum}}</el-col>
          </el-row>
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
          // direction : 'vertical',
          // spaceBetween: 40,
          // pagination: {
          //   el: '.swiper-pagination',
          //   clickable: true
          // }
        },
        arrList: [],
        status: 1,
        tenantId: "",
        terminalCode: "",
        pageNum: 1,
        pageSize: 3,
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
          templateCode: "T4", // 随便给的值
          pageNum: this.pageNum,
          // pageSize: this.pageSize,
          pageSize: 100,
          planDate: '2019-09-06'
          // planDate:dateFormat("YYYY-mm-dd", new Date())
        }
        this.$ctmList.templateDetail(httpObj).then(res => {
          console.log(res)
          if (res.code == 200 && res.data) {
            this.arrList = [];
            let tempArr = [];
            this.pageSize = res.data.template.pageSize || "3"
            console.log(res.data.planMovieListPage)
            res.data.planMovieListPage.list.forEach(item => {
              item.timeList && item.timeList.forEach(a => { 
                item = Object.assign({},item,a)
                tempArr.push(item)
              })
            });
            this.swiperNum = Math.ceil(tempArr.length / this.pageSize)
            console.log(tempArr.length, this.swiperNum)
            for (let i = 0; i < this.swiperNum; i++) {
              let temp = tempArr.slice(i * this.pageSize, i * this.pageSize + this.pageSize);
              this.arrList.push(JSON.parse(JSON.stringify(temp)));
            }
          } else {
            this.error(res.msg)
          }
        })
      }
    },
    mounted() {
      
       this.timer = setInterval(() => {
       this.getList()
      }, 10000)
      this.getList()
      // this.translateRow()
    },
     beforeDestroy() {
      if (this.timer) {
        clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
      }
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
      padding: 1rem 0 0 6rem;
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
        font-size: 2.6rem;
        color: #FFFFFF;
        letter-spacing: 0;
      }
    }

    /deep/ .content-show {
      padding: 0 6rem;

      .table_head {
        line-height: 5.5rem;

        div {
          text-align: center;
          font-family: PingFangSC-Regular;
          font-size: 1.7rem;
          color: #C8D6FF;
          letter-spacing: 0;
        }
      }

      .table_body {
        background-image: linear-gradient(90deg, #212C53 0%, #313E5F 100%);
        box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.20);
        border-radius: 10px;
        height: 5.5rem;
        line-height: 5.5rem;
        margin-bottom: 1.5rem;

        div {
          text-align: center;
          font-family: PingFangSC-Regular;
          font-size: 1.6rem;
          color: #FFFFFF;
          text-align: center;
          letter-spacing: 0;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;      //超出部分以省略号显示
          white-space: nowrap;
        }
      }

    }
  }
</style>