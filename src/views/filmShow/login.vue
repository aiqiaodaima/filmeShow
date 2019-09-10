<template>
  <div class="bg_contain">
    <header>
      <p class="en_word">SCHEDULED DISPLAY</p>
      <p class="ch_word">慧影云排期展示</p>
    </header>
    <div class="content_div">
      <p class="tips_p">当前终端未注册，请输入影院许可证号注册：</p>
      <div class="input_div">
        <el-input v-model="licenseKey" placeholder="请输入内容" class="licenseKey_input"></el-input>
      </div>
      <p class="tips_p2">
        <img src="./point.png" alt="" width="32px" height="32px">
        <span> 提示：可在慧影云-> 票务 -> 影院信息设置 ->查看界面，看到许可证号</span>

      </p>
      <div class="btn-area">
        <!-- <router-link to='swiperList' replace tag="button"  exact>注册</router-link> -->
        <button class="btn_login" @click="filmLogin">注册</button>
      </div>
    </div>
    <div class="login_tip">
      <span>影院许可证必填</span>
    </div>
  </div>
</template>
<script>
import md5 from 'js-md5'
// import config from ''
  export default {
    data() {
      return {
        licenseKey: ""
      }
    },
    methods: {
      filmLogin() {
        let httpObj = {
          licenseKey: this.licenseKey,
          type: 1 // 账号类型,1排期展示 2语言播报
        }
        this.$ctmList.filmLogin(httpObj).then(res => {
          if (res.code === 200 && res.data) {
            this.$message({
              message: '恭喜你，注册成功',  // 弹出成功信息
            });
            // res.data.passwordMd5 = md5(res.data.password) // md5加密
            // console.log(res.data)
            // window.localStorage.setItem("ctmRemberTerminal", JSON.stringify(res.data))  // 记住登陆信息
            //this.$router.push('swiperList')  // 跳转到list 页
            window.location.href = "/swiperList"
          } else {
            localStorage.removeItem("ctmRemberTerminal")  // 清楚登陆信息
            this.error(res.data);
          }
        })
      }
    },
    created() {
      let routeQuery = this.$route.query;
      if(routeQuery.logout == 1) return localStorage.removeItem('ctmRemberTerminal')
      if (localStorage.ctmRemberTerminal) {
        let userInfo = JSON.parse(localStorage.ctmRemberTerminal)
        if(routeQuery.license && routeQuery.license != userInfo.licenseKey){
          return this.licenseKey = routeQuery.license
        }
        if (routeQuery.template){
          this.$router.push({
            path: `detailT${routeQuery.template}?templateCode=T${routeQuery.template}`
          })
        } else {
          this.$router.replace({
            path: `swiperList`
          })
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  // 1rem = 20px;
  .bg_contain {
    background-image: linear-gradient(-135deg, #131720 0%, #1E2643 100%);
    height: 100vh;

    // padding-left: 120px;
    header {
      background-image: url(./bglight.png);
      background-repeat: no-repeat;
      padding: 2rem 0 0 6rem;

      .en_word {
        // width: 265px;
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
    }
  }

  .content_div {
    padding-left: 6rem;

    .tips_p {
      margin-top: 3.2rem;
      font-family: PingFang-SC-Bold;
      font-size: 1.4rem;
      color: #FFFFFF;
      letter-spacing: 0;
    }

    .licenseKey_input {
      width: 32rem;
      height: 6rem;
      margin-top: 1.2rem;

      box-shadow: 0 15px 50px 0 rgba(18, 63, 192, 0.60);
      border-radius: 10px;

      /deep/ .el-input__inner {
        border: 2px solid #FFFFFF;
        background: #111625;
        height: 6rem;
        font-family: DINAlternate-Bold;
        font-size: 2.1rem;
        color: #FFFFFF;
        letter-spacing: 0;
      }
    }

    .tips_p2 {
      margin-top: 1.5rem;
      display: flex;
      align-items: center;

      span {
        display: block;
        margin: 0 12px;
        font-family: PingFangSC-Semibold;
        font-size: 1.2rem;
        color: #6F80B0;
        letter-spacing: 0;
      }
    }

    .btn_login {
      cursor: pointer;
      margin-top: 4.6rem;
      width: 9.3rem;
      height: 4rem;
      background-image: linear-gradient(-225deg, #537BE6 0%, #94B1FF 100%);
      border-radius: 10px;
      font-family: PingFangSC-Semibold;
      font-size: 1.6rem;
      color: #FFFFFF;
      letter-spacing: 0;
      box-shadow: 5px 5px 50px #537BE6;
    }
  }

  .login_tip {
    display: none;
    position: fixed;
    bottom: 150px;
    left: calc(50% - 180px);
    width: 360px;
    height: 97px;
    opacity: 0.27;
    background: #0B101D;
    border: 1px solid #FFFFFF;
    border-radius: 10px;
  }
</style>
// <style lang="scss">
  // 
</style>