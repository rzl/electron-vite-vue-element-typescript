<script lang="ts" setup>
import { configStore } from "./store/modules/config";
</script>

<template>
  <el-config-provider
    :size="configStore().get_size"
    :z-index="configStore().get_z_index"
  >
    <router-view></router-view>
  </el-config-provider>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  created() {
    window.vue = this;
  },
  computed: {
    // ...mapStores(configStore),
  },
  data() {
    return {
      size: "mini",
      zIndex: 3000,
    };
  },
});
</script>
<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
