<template>
  <div class="contain">
    <div class="header-title">
      <p class="middle-header">
        <span>慧影云排期展示首页</span>
      </p>
      <p class="right-header">
        <span>当前终端编号：</span>
        <span>{{terminalCode}}</span>
      </p>
      <p class="right-header">
        <span>状态：</span>
        <span style="color:blue">{{status}}</span>
      </p>
    </div>
    <div class="content-show">
      <ul class="out-carousel">
      <el-row>
        <el-col :span="8" v-for="(item,index) in arrList" :key="index">
          <div class="big-carousel">
            <div class="single-carousel">
              <img :src="item.thumbnail" alt="" @click="goAddress(item.tCode)">
            </div>
            <!-- <p class="address-p" @click="goAddress(item.tCode)">地址： {{item.addressUrl}}</p> -->
            <!-- <p class="tip-p">模板编号{{item.tCode}}</p> -->
              <p class="tip-p">{{item.name}}</p>
          </div>
        </el-col>
      </el-row>
      <!-- <ul class="out-carousel">
        <li class="big-carousel" v-for="(item,index) in arrList" :key="index">
          <div class="single-carousel">
            <img :src="item.thumbnail" alt="">
          </div>
          <p class="address-p" @click="goAddress(item.tCode)">地址： {{item.addressUrl}}</p>
          <p class="tip-p">模板编号{{item.tCode}}</p>
        </li> -->
      </ul> 
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        arrList: [],
        status:1,
        tenantId:"",
        terminalCode:""
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
        this.status = terminalInfo.status?"启用":"暂停"
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
          path: 'add',
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
  img {
    width: 100%;
    height: 300px;
    // height: 100px;
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
      .middle-header{
        span{
          font-weight: 600;
          font-size: 24px;
          margin-right: 20px;
        }
      }
      .right-header{
         margin-right: 20px;
         padding-top: 8px;
      }
    }

    .content-show {
      margin: 2rem;
      display: flex;
      justify-content: space-between;

      .out-carousel {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;

        .big-carousel {
          width: 80%;
          margin: 1em;

          .single-carousel {
            // height: 600px;
            overflow: hidden;
            cursor: pointer;

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
            cursor: pointer;
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
</style>