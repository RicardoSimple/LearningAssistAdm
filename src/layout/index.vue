<template>
  <div>
    <side-bar :class="['sidebar-container ', isCollapse ? 'unfold' : 'flod']" />
    <div :class="['main-container', isCollapse ? 'unfold' : 'flod']">
      <nav-bar />
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import AppMain from './components/AppMain'
import SideBar from './components/SideBar'
import NavBar from './components/NavBar'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      isCollapse: (state) => state.app.isCollapse
    })
  },
  components: {
    AppMain,
    SideBar,
    NavBar
  }
}
</script>

<style lang="scss" scoped>
.sidebar-container {
  width: 200px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 1001;
  overflow: hidden;
  background-color: #304156;
  transition: width 0.28s;
  &::-webkit-scrollbar {
    display: none;
  }
  &.flod {
    width: 200px;
  }
  &.unfold {
    width: 64px;
  }
}

.main-container {
  transition: margin-left 0.28s;
  margin-left: 200px;
  &.flod {
    margin-left: 200px;
  }
  &.unfold {
    margin-left: 64px;
  }
}
</style>
