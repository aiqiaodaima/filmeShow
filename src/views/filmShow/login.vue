<template>
  <div>
    <header>
      慧影云排期展示首页
    </header>
    <div class="content_div">
      <p class="tips_p">当前终端未注册，请输入影院许可证号注册：</p>
      <div class="input_div">
        <span>影院许可证号：</span>
        <el-input v-model="licenseKey" placeholder="请输入内容" style="width:300px;"></el-input>
      </div>
      <p class="tips_p" style="color:#333">提示：可在慧影云-> 票务 -> 影院信息设置 ->查看界面，看到许可证号</p>
    </div>

    <div class="btn-area">
      <el-button type="primary" @click="filmLogin">注册</el-button>
      <el-button type="primary" style="margin-left:32px">关闭</el-button>
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
              type: 'success'
            });
            // this.$store.commit("ctmRemberTerminal",res.data);
            localStorage.setItem("ctmRemberTerminal",JSON.stringify(res.data))
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
  header {
    text-align: center;
    font-size: 24px;
    color: #333;
    height: 48px;
    line-height: 48px;

    &::after {
      content: "";
      display: block;
      width: 100%;
      height: 1px;
      background-color: #e5e5e5;
    }
  }

  .content_div {
    margin: 10em auto 5em;

    .tips_p {
      color: red;
      font-size: 16px;
      text-align: center;
      margin-bottom: 36px;
    }

    .input_div {
      display: flex;
      justify-content: center;
      margin-bottom: 36px;

      span {
        font-weight: 600;
        color: #333;
        font-size: 16px;
        line-height: 32px;
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