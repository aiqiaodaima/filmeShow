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
        <button class="btn_login" @click="filmLogin">注册</button>
      </div>
    </div>
    <div class="login_tip">
      <span>影院许可证必填</span>
    </div>
  </div>
</template>
<script>
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
              message: '恭喜你，注册成功',
            });
            // this.$store.commit("ctmRemberTerminal",res.data);
            localStorage.setItem("ctmRemberTerminal", JSON.stringify(res.data))
            this.$router.push('swiperList')
          } else {
            this.error(res.data);
          }
        })
      },
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
    }
  }

  .content_div {
    padding-left: 120px;

    .tips_p {
      margin-top: 64px;
      font-family: PingFang-SC-Bold;
      font-size: 28px;
      color: #FFFFFF;
      letter-spacing: 0;
    }

    .licenseKey_input {
      width: 640px;
      height: 120px;
      margin-top: 24px;

      box-shadow: 0 15px 50px 0 rgba(18, 63, 192, 0.60);
      border-radius: 10px;

      /deep/ .el-input__inner {
        border: 2px solid #FFFFFF;
        background: #111625;
        height: 120px;
        font-family: DINAlternate-Bold;
        font-size: 42px;
        color: #FFFFFF;
        letter-spacing: 0;
      }
    }

    .tips_p2 {
      margin-top: 30px;
      display: flex;
      align-items: center;
      span {
        display: block;
        margin: 0 12px;
        font-family: PingFangSC-Semibold;
        font-size: 24px;
        color: #6F80B0;
        letter-spacing: 0;
      }
    }

    .btn_login {
      cursor: pointer;
      margin-top: 92px;
      width: 185px;
      height: 80px;
      background-image: linear-gradient(-225deg, #537BE6 0%, #94B1FF 100%);
      border-radius: 10px;
      font-family: PingFangSC-Semibold;
      font-size: 32px;
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