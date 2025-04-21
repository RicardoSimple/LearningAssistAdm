<template>
  <div class="sidebar">
    <Logo />
    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      background-color="#2e4158"
      text-color="#ebf2fc"
      router
      active-text-color="#ffd04b"
      :collapse-transition="false"
    >
      <el-menu-item
        v-for="item in noRoutesSubItem"
        :key="item.path"
        :index="item.path"
      >
        <i :class="'el-icon-' + item.meta.icon"></i>
        <span slot="title">{{ item.name }}</span>
      </el-menu-item>

      <el-submenu
        v-for="item in hasRoutesSubItem"
        :key="item.path"
        :index="item.path"
      >
        <template slot="title">
          <i :class="'el-icon-' + item.meta.icon"></i>
          <span slot="title">{{ item.name }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            v-for="subItem in item.children"
            :key="subItem.path"
            :index="subItem.path"
          >
            {{ subItem.name }}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import Logo from './Logo.vue'
import { mapState } from 'vuex'

export default {
  components: { Logo },
  computed: {
    ...mapState({
      isCollapse: state => state.app.isCollapse,
      routes: state => state.routes.routes
    }),

    defaultActive() {
      return this.$route.path
    },

    // 子菜单项：children.length >= 1
    hasRoutesSubItem() {
      return this.routes.filter(item => Array.isArray(item.children) && item.children.length > 0)
    },

    // 普通菜单项：没有 children 或 children 是空数组
    noRoutesSubItem() {
      return this.routes.filter(item => !Array.isArray(item.children) || item.children.length === 0)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.sidebar {
  ::v-deep .el-menu {
    border-right: none;
  }
}
</style>
