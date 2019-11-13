<template>
  <div class='login'>
    <!-- 中间区域 -->
    <el-card class='login-card'>
      <!-- 卡片内容 -->
      <div class='title'>
        <img src="../../assets/logo_index.png" alt="">
      </div>
      <!-- 表单 -->
      <el-form style="margin-top:20px">
        <el-form-item>
          <!-- 手机号 -->
          <el-input></el-input>
        </el-form-item>
        <el-form-item>
          <el-input style="width:280px;"></el-input>
          <el-button plain style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <!-- 勾选框 -->
          <el-checkbox>我已阅读并同意用户协议及条款</el-checkbox>
        </el-form-item>
        <el-form-item>
           <el-button type="primary" style='width:100%;'>登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>

  </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
.login {
  background-image: url('../../assets/login_bg.jpg');
  background-size: cover;
  // 占据屏幕的100%
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-card {
    width: 440px;
    height: 340px;
  .title {
    text-align: center;
    img {
      height: 45px;
    }
  }
  }
}
</style>
