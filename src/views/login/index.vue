<template>
  <div class='login'>
    <!-- 中间区域 -->
    <el-card class='login-card'>
      <!-- 卡片内容 -->
      <div class='title'>
        <img src="../../assets/logo_index.png" alt="">
      </div>
      <!-- 表单 -->
      <!-- model 属性 -->
      <el-form style="margin-top:20px" :model='loginForm' :rules='loginRules' ref="formObj">
        <el-form-item prop="mobile">
          <!-- 手机号输入框 -->
          <el-input placeholder="请输入手机号" v-model='loginForm.mobile'></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <!-- 验证码输入框 -->
          <el-input  v-model='loginForm.code' style="width:280px;" placeholder="请输入验证码"></el-input>
          <!-- 发送验证码按钮 -->
          <el-button plain style="float:right" >发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="checked">
          <!-- 勾选框 -->
          <el-checkbox v-model='loginForm.checked'>我已阅读并同意用户协议及条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <!-- 登录按钮 -->
           <el-button type="primary" style='width:100%;' @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>

  </div>
</template>

<script>
export default {
  methods: {
    login () {
      // 定义一个 ref属性 通过this.$refs. 获取DOM对象
      this.$refs.formObj.validate((isOk) => {
        if (isOk) {
          this.$axios({
            method: 'POST',
            url: '/authorizations',
            data: this.loginForm
          }).then(res => {
            window.localStorage.setItem('user-token', res.data.data.token)
            this.$router.push('/home')
          }).catch(() => {
            this.$message({
              message: '手机号或验证码输入错误',
              type: 'warning'

            })
          })
        }
      })
    }
  },
  data () {
    return {
      // 要校验的整个的表单数据
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        checked: false // 是否勾选
      },
      // 校验规则
      loginRules: {
        // required 必须填 如果不填就会提示错误 message 提示信息
        mobile: [{ required: true, message: '请输入手机号' }, {
          pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号' }],
        code: [{ required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码' }],
        // 自定义校验 校验内容为布尔值的时候采用自定义
        checked: [{ validator: function (rules, value, callback) {
          // value 当前字段的值  callback 回调函数
          if (value) {
            callback() // 表示直接执行
          } else {
            callback(new Error('您必须勾选'))
          }
        } }]

      }
    }
  }
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
