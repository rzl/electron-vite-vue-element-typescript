<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
    <el-breadcrumb-item><a href="/">promotion management</a></el-breadcrumb-item>
    <el-breadcrumb-item>promotion list</el-breadcrumb-item>
    <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
  </el-breadcrumb>
  <el-button
    @click="$utils.toggleDark()"
    >
  </el-button>
</template>
<script lang="ts" setup>

</script>
<script lang="ts">
export default {
  name: 'breadcrumb',
  mounted() {

  }

}
</script>