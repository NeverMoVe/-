<template>
  <el-container class="index-container">
    <!-- 首页头部 -->
    <el-header class="index-header">
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <img src="../assets/logo.png" alt>
          </div>
        </el-col>
        <el-col :span="16" class="header-center">
          <div class="grid-content bg-purple-light">电商后台管理系统</div>
        </el-col>
        <el-col :span="4" class="header-right">
          <div class="grid-content bg-purple">
            <el-button type="info" @click="loginout">退出</el-button>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <!-- 首页的下部结构 -->
    <el-container class="index-container">
      <!-- 侧边栏 -->
      <el-aside width="200px" class="index-aside">
        <el-menu default-active="2" active-text-color='blue' class="el-menu-vertical-demo" router>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户列表</span>
            </template>
            <el-menu-item index="/index/users">
              <span class="el-icon-menu"></span>用户管理
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 内容区域 -->
      <el-main class="index-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  methods: {
    loginout() {
      // 退出提示
      this.$confirm("确定要退出吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          window.sessionStorage.removeItem("token");
          this.$router.push("/login");
        })
        .catch(() => {});
    }
  }
};
</script>
<style>
.index-container {
  height: 100%;

}
.index-header {
  height: 60px;
  background-color: #b3c0d1;
  line-height: 60px;
}
.header-center {
  font-weight: 500;
  color: #fff;
  font-size: 25px;
  text-align: center;
}
.header-right {
  text-align: right;
}
.index-aside {
}
.index-main {
  background-color: #e9eef3;
}
.el-main.index-main{
  padding-top: 0;
}
</style>

