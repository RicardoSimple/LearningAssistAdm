<template>
  <div class="logo">
    <div v-show="!isCollapse">
      <img
        class="logo-img"
        src="@/assets/logo.png"
        alt="logo"
      />
      <span>vue-element-admin</span>
    </div>
    <div v-show="isCollapse">
      <img
        class="logo-img"
        src="@/assets/logo.png"
        alt="logo"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      isCollapse: (state) => state.app.isCollapse
    })
  }
}
</script>

<style lang="scss" scoped>
.logo {
  height: 50px;
  line-height: 50px;
  color: #fff;
  text-align: center;
  font-size: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  background-color: #2b2f3a;
  .logo-img {
    width: 32px;
    height: 32px;
    vertical-align: middle;
    margin-right: 12px;
  }
}
</style>
