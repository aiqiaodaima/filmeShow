<template>
  <div class="app-container">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {}
};
</script>

<style lang="scss">
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
dir,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
font,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td {
  margin: 0px;
  padding: 0px;
  border: 0px;
  outline: 0;
  font-size: 14px;
  vertical-align: baseline;
  background: transparent;
}
html,
body,
.app-container {
  width: 100%;
  height: 100%;
}
body {
  margin: 0px;
  padding: 0px;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  background: #fff;
}
ul,
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}
:focus {
  outline: 0;
  -moz-outline-style: none;
}
ins {
  text-decoration: none;
}
del {
  text-decoration: line-through;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
  table-layout: fixed;
}
img {
  vertical-align: middle;
  border: 0;
}
address,
caption,
cite,
code,
dfn,
em,
th,
var {
  font-weight: normal;
  font-style: normal;
}
select {
  border: 1px solid #b5bcc2;
}
input,
textarea,
select {
  font-family: Arial;
  vertical-align: middle;
}
input[type="checkbox"],
input[type="radio"] {
  top: -2px;
  *top: 0px;
}
.clear {
  clear: both;
  height: 0;
  overflow: hidden;
}
a {
  text-decoration: none;
  cursor: pointer;
}
a {
  outline-style: none;
  color: #333;
  text-decoration: none;
}
a:visited {
}
a:active {
}
a:hover {
  text-decoration: none;
  color: #5ca7ff;
}
.clearfix {
}
.clearfix:after {
  content: ".";
  height: 0px;
  font-size: 0px;
  clear: both;
  display: block;
  visibility: hidden;
}
.el-submenu[class^="fa"] {
  vertical-align: baseline;
  margin-right: 10px;
}
.el-menu-item [class^="fa"] {
  vertical-align: baseline;
  margin-right: 10px;
}
.toolbar {
  background: #f2f2f2;
  padding: 10px;
  /*  //border:1px solid #dfe6ec;*/
  margin: 10px 0px;
}
.toolbar .el-form-item {
  margin-bottom: 10px;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.app-container {
  // 重置elementUI分页样式
  .page-wrap {
    padding: 24px;
    text-align: center;
    .el-pagination {
      display: inline-block;
      .el-input__inner {
        height: 28px;
        line-height: 28px;
      }
      .el-input__icon {
        line-height: 28px;
      }
    }
  }
}
.action_start {
  color: #6ed200;
}
.action_stop {
  color: #ff3c00;
}
.action_more {
  color: 808080;
}

.el-tooltip__popper.is-dark {
    background: #212121bf;
}

// .el-popover {
//   min-width: 50px;
//   padding: 0px;
// }
// .el-tooltip__popper {
//   max-width: 450px;
//   max-height: 136px;
//   overflow: hidden;
// }
// .el-menu--vertical{
//       .el-submenu{
//      height: 20px;
//    }
//    .el-menu-item-group{
//      height: 20px;
  
//    }
//    }

// 重写框架样式
.el-button {
  padding: 8px 20px;
}
// 默认按钮
.el-button--default {
  background: #FFFFFF;
  border: 1px solid #BCBCBC;
  color: #666666;
}
.el-button--default:hover {
  background: #F5F5F5;
  border: 1px solid #BCBCBC;
  color: #666666;
}
.el-button--default.is-disabled {
  background: #F5F5F5;
  color: #BCBCBC;
}
// 主要按钮
.el-button--primary {
  background: #3B74FF;
  color: #FFFFFF;
}
.el-button--primary:hover {
  background: #0F55FF;
  color: #FFFFFF;
}
.el-button--primary.is-disabled {
  background: #3B74FF;
  color: #FFFFFF;
}
// 主要按钮 空心
.el-button--primary.is-plain {
  background: #FFFFFF;
  border: 1px solid #3B74FF;
  color: #3B74FF;
}
.el-button--primary.is-plain:hover {
  background: #FFFFFF;
  border: 1px solid #0F55FF;
  color: #0F55FF;
}
.el-button--primary.is-plain.is-disabled {
  background: #FFFFFF;
  border: 1px solid #3B74FF;
  color: #3B74FF;
}

// 表格中的按钮
.el-table .el-button {
  padding: 2px 20px;
  font-size: 12px;
  border-radius: 2px;
}
.el-table .el-button--primary {
  background: #FFFFFF;
  border: 1px solid #3B74FF;
}
.el-table .el-button--primary:hover {
  background: #F5F5F5;
  border: 1px solid #BCBCBC;
  color: #666666;
}
// selected 样式要根据自己的操作 js动态添加
.el-table .el-button--primary.selected {
  background: #3B74FF;
  color: #FFFFFF;
}

.el-table .el-button--default {
  background: #FFFFFF;
  border: 1px solid #BCBCBC;
}
.el-table .el-button--default:hover {
  background: #FFFFFF;
  border: 1px solid #BCBCBC;
}
// selected 样式要根据自己的操作 js动态添加
.el-table .el-button--default.selected {
  background: #3B74FF;
  border-radius: 2px;
  color: #FFFFFF;
}

// 输入框
.el-input__inner {
  height: 32px;
  border: 1px solid #BCBCBC;
  line-height: 32px;
} 
.el-input__inner:focus {
  border-color:#3B74FF;
}
// 下拉框内的图标
.el-input__icon {
  line-height: 32px;
}
.el-table .el-input__inner {
  height: 20px;
  line-height: 20px;
}
.el-table .el-input__icon {
  line-height: 20px;
}
// dialog弹窗
.main-container .el-dialog .el-dialog__header {
      padding: 20px 20px 10px 20px !important;
}
.main-container .el-dialog .el-dialog__body {
        padding: 30px 20px !important;
}
.el-dialog__title {
  font-size: 14px;
}
.el-dialog__footer {
  text-align: center;
}


// 排片提示信息
.tool-tips {
  div {
      font-size: 12px;
      margin-bottom: 5px;
      span {
        color:#FF8900;
      }
  }
  div:nth-last-of-type(1) {
    margin-bottom: 0;
  }
}
</style>
