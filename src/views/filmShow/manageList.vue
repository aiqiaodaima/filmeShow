<template>
  <div class="contain">
    <div>
      <el-form :inline="true" class="demo-form-inline search-form" size="small" label-width="100px">
        <el-form-item label="影院名称：">
          <el-button @click="singleCinemaVisible = true, $refs.frameSingleCinema.listAuthCommCinemas()"
            style="width:176px;height:32px;">
            {{ cinemaName }}</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="content-show">
      <ul class="out-carousel">
        <li class="big-carousel" v-for="(item,index) in arrList" :key="index">
          <div class="single-carousel">
            <img :src="item.thumbnail" alt="">
          </div>
          <!-- <p class="address-p" @click="addressTo(item.addressUrl)">地址： {{item.addressUrl}}</p> -->
          <p class="tip-p">模板编号{{item.tCode}}</p>
          <div class="btn-area">
            <el-button type="primary" @click="goAddress(item.tCode)">编辑</el-button>
            <el-button type="primary" style="margin-left:32px" @click="detail(item.tCode)">预览</el-button>
          </div>
        </li>
      </ul>
    </div>
    <singleCinema ref="frameSingleCinema" :framedialogVisible.sync="singleCinemaVisible" :type="singleCinemaType"
      :innerData="innerData" @callBackSingle="callBackSingle">
      <div slot="footerId">
        <el-button @click="singleCinemaVisible = false">取 消</el-button>
        <el-button type="primary" @click="$refs.frameSingleCinema.confirmData(), singleCinemaVisible = false">确
          定</el-button>
      </div>
    </singleCinema>
    <showDialog ref="showDialog"></showDialog>
  </div>
</template>
<script>
  import singleCinema from "frame_cpm/dialogs/cinemaDialog/singleCinema"
  import showDialog from "./showBigDialog"
  export default {
    components: {
      singleCinema,
      showDialog
    },
    data() {
      return {
        singleCinemaVisible: false,
        singleCinemaType: 2,
        innerData: {
          id: '',
        },
        cinemaName: '',
        cinemaUid: '',
        arrList: []
      }
    },
    methods: {
      getList() {
        let httpObj = {
          cinemaUid: this.cinemaUid
        }
        this.$ctmList.getFilmList(httpObj).then(res => {
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
          path: 'editor',
          query: {
            templateCode: tCode,
            cinemaUid: this.cinemaUid
          }
        })
      },
      detail(tCode) {
        this.$refs.showDialog.dialogTableVisible = true;
        let httpObj = {
          templateCode: tCode,
          cinemaUid: this.cinemaUid
        }
        this.$refs.showDialog.getKey(httpObj);
        // this.$router.push({
        //   path: 'add',
        //   query: {
        //     templateCode: tCode,
        //     cinemaUid: this.cinemaUid
        //   }
        // })
      },
      callBackSingle(data) {
        console.log(data, '-----> data')
        this.cinemaUid = data.data.id
        this.cinemaName = data.data.name
        this.innerData.id = data.data.id
        this.getList()
      },
      getUserInfo() {
        this.$ctmList.getUserInfo().then(res => {
          console.log(res)
          if (res.code === 200) {
            this.cinemaName = res.data.cinemaName
            this.cinemaUid = res.data.cinemaUid
            this.innerData.id = Number(res.data.cinemaUid)
            this.getList()
          } else {
            this.error(res.msg)
          }
        })
      }
    },
    mounted() {
      this.getUserInfo()
    }
  }
</script>
<style lang="scss" scoped>
  img {
    width: 100%;
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
      margin: 2rem;
      display: flex;
      justify-content: space-between;

      .out-carousel {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;

        .big-carousel {
          width: 48%;
          margin: 1em;

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

  .btn-area {
    display: flex;
    justify-content: center;

    .el-button {
      padding: 9px 27px;
    }
  }
</style>