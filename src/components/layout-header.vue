<template>
<!-- 头部 -->
  <el-row type="flex" justify="space-between" align="middle">
    <!-- 左侧 -->
    <el-col :span="6" class="left">
      <i class="el-icon-s-fold"></i>
      <span>江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <!-- 右侧 -->
    <el-col :span="3" class="right">
      <!-- 输入框 -->

      <!-- <el-input
        placeholder="请输入搜索的内容"
        class="demo-input-suffix"
        size="small"
        resize="none"
        maxlength=6
        prefix-icon="el-icon-search"
       > -->
      <!-- </el-input> -->
      <!-- 消息 -->
      <el-tooltip effect="dark" content="消息" placement="bottom">
        <span>消息</span>
      </el-tooltip>
      <!-- 头像 -->
      <!-- <img src="../assets/avatar.jpg" alt=""> -->
      <img src="../assets/avatar.jpg" alt="" class="user-avatar">
      <!-- 下拉菜单 -->
      <!-- 使用command方法来控制组件之间的跳转  通过给command属性赋值 在方法中使用key值来控制跳转的方向 -->
      <el-dropdown trigger="click" @command='commandClick'>
        <span class="el-dropdown-link">同学<i class="el-icon-caret-bottom"></i></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command='account'>个人信息</el-dropdown-item>
          <el-dropdown-item command='git'>git地址</el-dropdown-item>
          <el-dropdown-item command='loginout'>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {
  methods: {
    commandClick (key) {
      if (key === 'account') {
        // 跳转到用户信息页
        this.$router.push('/home')
      } else if (key === 'git') {
        // 跳转到git地址
        window.location.href = 'https://github.com/peipei1234/88heimatoutiao'
      } else if (key === 'loginout') {
        // 清除当前前端页面所有缓存
        window.localStorage.clear()
        // 跳转到登录页
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style scoped lang="less">
  .left {
    display: flex;
    align-items: center;
    i {
      font-size:24px;
    }
    span {
      margin-left:4px;
    }
    .el-icon-s-fold {
      cursor: pointer;

    }
  };
  .right {
    display: flex;
    align-items: center;
    margin-top: 10px;
    img {
      margin-right: 5px;
      border-radius: 50%;
      cursor: pointer;

    }
    .el-dropdown-link {
       cursor: pointer;
    }
  }
</style>
