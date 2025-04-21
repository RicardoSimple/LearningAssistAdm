<template>
  <div class="navbar">
    <div class="navbar-left">
      <i
        :class="toggleStyle"
        @click="toggleCollapse"
      ></i>
      <el-breadcrumb
        class="my-breadcrumb"
        separator-class="el-icon-arrow-right"
      >
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="navbar-right">
      <el-dropdown
        trigger="click"
        @command="handleCommand"
      >
        <div class="el-dropdown-link">
          <img
            class="user-icon"
            :src="avatar"
            alt=""
          />
          下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="profile">个人中心</el-dropdown-item>
          <el-dropdown-item
            command="logout"
            divided
            >退出登录</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      isCollapse: (state) => state.app.isCollapse,
      avatar: (state) => state.user.userInfo.avatar
    }),
    toggleStyle() {
      return this.isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'
    }
  },
  methods: {
    toggleCollapse() {
      this.$store.commit('app/TOGGLE_SIDEBAR')
    },
    handleCommand(command) {
      if (command === 'logout') {
        this.$store.dispatch('user/logout')
        this.$router.push('/login')
      }
      if (command === 'profile') {
        this.$router.push('/profile')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  min-width: 1000px;
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing: border-box;
  .navbar-left {
    display: flex;
    align-items: center;
    .el-icon-s-fold,
    .el-icon-s-unfold {
      font-size: 24px;
      margin-right: 10px;
    }
    .my-breadcrumb {
      margin-left: 10px;
    }
  }
  .navbar-right {
    .el-dropdown-link {
      display: flex;
      align-items: center;
      cursor: pointer;
      color: #000;
      .user-icon {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
    .el-icon-arrow-down {
      font-size: 12px;
    }
  }
}
</style>
