<template>
  <el-menu
    v-if="!isSubItem"
    :collapse="false"
    @mouseenter="m_mouseenter"
    @mouseout="m_mouseout"
  >
    <default-aside :isSubItem="true" :menu="menu"></default-aside>
  </el-menu>
  <template v-else v-for="item in menu" :key="item.name || Math.random()">
    <el-sub-menu
      :index="item.name"
      v-if="item.children && item.children.length > 0"
    >
      <template #title>
        <el-icon>
          <component :is="(item.meta && item.meta.icon) || 'ElIconMenu'" />
        </el-icon>
        <span>{{ item.meta && item.meta.title }}</span>
      </template>
      <default-aside :isSubItem="true" :menu="item.children"></default-aside>
    </el-sub-menu>
    <el-menu-item
      v-else
      :index="item.name"
      @click="(index) => m_click(index, item)"
    >
      <template #title>
        <el-icon>
          <component :is="(item.meta && item.meta.icon) || 'ElIconMenu'" />
        </el-icon>
        <span>{{ item.meta && item.meta.title }}</span>
      </template>
    </el-menu-item>
  </template>
</template>


<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import {
  Location,
  Document,
  Menu as IconMenu,
  Setting,
} from "@element-plus/icons-vue";
import { MenuItemRegistered } from "element-plus";

interface I_menus {
  ['key']?: string;
}
export default defineComponent({
  name: "defaultAside",
  props: {
    menu: {
      type: Array as PropType<I_menus[]>,
      default: [],
    },
    isSubItem: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isCollapse: false,
      mousein: false,
      memuTarget: null as  EventTarget | null,
    };
  },
  methods: {
    m_click(index: MenuItemRegistered, item: I_menus) {
      this.$router.push({
        name: item.name
      })
    },
    handleClose(key: string, keyPath: string[]) {
      console.log("handleClose");
    },
    m_mouseenter(e: MouseEvent) {
      console.log("m_mouseenter");
      this.isCollapse = false;
      this.memuTarget = e.target;
    },
    m_mouseout(e: MouseEvent) {
      console.log("m_mouseout");
      if (
        this.$utils.isParent(
          e.relatedTarget as HTMLElement,
          this.memuTarget as any as HTMLElement
        )
      ) {
        this.isCollapse = false;
        setTimeout(() => {
          console.log("m_mouseout clearTimeout");
        }, 500);
      } else {
        this.isCollapse = true;
      }
    },
  },
});
</script>

<style scoped>
.el-el-menu-mousein {
  width: 200px;
}

.el-el-menu-mousein :deep() .el-sub-menu__title span {
  width: unset;
  height: unset;
  visibility: unset;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
