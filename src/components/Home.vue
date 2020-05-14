<template>
  <div class="wrapper">
    <v-header></v-header>
    <v-sidebar></v-sidebar>
    <div class="content-box" :class="{'content-collapse':collapse}">
      <v-tags></v-tags>
      <div class="content">
        <transition name="move" mode="out-in">
          <keep-alive :include="tagsList">
            <router-view></router-view>
          </keep-alive>
        </transition>
        <el-backtop target=".content"></el-backtop>
      </div>
    </div>
  </div>
</template>

<script>
import vHeader from "./common/Header.vue"
import vSidebar from "./common/Sidebar.vue"
import vTags from './common/Tags.vue'
import bus from "./common/bus"
export default {
  name: "home",
  data() {
    return {
      tagsList: [],
      collapse: false,
    };
  },
  components: {
    vHeader,
    vSidebar,
    vTags,
    
  },
  created() {
    bus.$on("collapse-content", msg => {
      this.collapse = msg;
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-drawer__header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}

.el-container,
.el-aside {
  height: 100%;
}
</style>
