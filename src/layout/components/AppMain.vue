<template>
  <div class="app-main">
    <router-view />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.app-main {
  height: 100% calc(100vh - 50px);
  min-height: calc(100vh - 50px);
  overflow: hidden;
  padding: 20px;
  background-color: #f0f2f5;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  background-color: #f0f2f5;
}
</style>
