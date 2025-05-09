<template>
  <el-container class="box">
    <el-header style="padding: 0px" class="layouts-default-header">
      <el-container style="height: 100%">
        <div class="layouts-default-header-left">
          <logo></logo>
        </div>
        <div class="layouts-default-header-center">
          <breadcrumb></breadcrumb>
        </div>
        <div class="layout-default-header-right"></div>
      </el-container>
    </el-header>
    <el-container class="box">
      <el-aside style="position: relative; width: 180px;">
        <defaultAside :is-sub-item="false" :menu="userStore().menu" class="layouts-default-aside"></defaultAside>
      </el-aside>
      <el-main class="main">
        <el-container class="box">
          <el-header style="padding: 0px; height: 30px;" class="layouts-default-header">
            <div style="padding-bottom: 2px">
              <tabs></tabs>
            </div>
          </el-header>
          <el-main class="main">

            <el-auto-resizer>
              <template #default="rect">
                <div class="main-router-view"
                  :style="`width:${rect.width}px ; height: ${rect.height}px; padding:5px; overflow: auto;    box-sizing: border-box;`">
                  <router-view v-slot="{ Component }">
                    <Transition>
                        <component  :is="Component" />
                    </Transition>
                  </router-view>
                </div>
              </template>
            </el-auto-resizer>
          </el-main>
        </el-container>
      </el-main>
    </el-container>
    <!-- <el-footer>Footer</el-footer> -->
  </el-container>
</template>

<script lang="ts" setup>
import defaultAside from "./defaultAside.vue";
import logo from "./logo.vue";
import breadcrumb from "./breadcrumb.vue";
import tabs from "./tabs.vue";
import { userStore } from "@/store/modules/user";
</script>
<script lang="ts">
export default {
  components: {
    logo,
    breadcrumb,
    tabs,
  },
  mounted() {

  },
  data() {
    return {
      routerShow: true
    };
  },
  watch: {
    $route() {
      console.log("$route", this.$route);
      this.routerShow = false
      this.$nextTick(() => {
          this.routerShow = true
      })
    }
  },
  methods: {

    m_a() {
      console.log("m_a");
    },
  },
};
</script>

<style scoped>
.main {
  padding: 0px;
  position: relative;
}

.layouts-default-aside {
  position: absolute;
  height: 100%;
  z-index: 99;
  width: 180px;
}

.layouts-default-header-aside {
  width: 180px;
}

.layouts-default-header {
  border-bottom: solid 1px var(--el-menu-border-color);
}

.layouts-default-header-center {
  align-items: center;
  display: flex;
  padding: 0 20px;
}

.layouts-default-header-left {
  width: 180px;
  border-right: solid 1px var(--el-menu-border-color);
}
</style>

<style>
/* 下面我们会解释这些 class 是做什么的 */
.v-enter-active,
.v-leave-active {
  transition: opacity 1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>