<!-- 
  author: rzl
-->
<template>
  <el-tabs class="header-tabs" type="card">
    <el-tab-pane>
      <template #label>
        <span class="custom-tabs-label">
          <!-- <el-icon><calendar /></el-icon> -->
          <span>route</span>
        </span>
      </template>
    </el-tab-pane>
    <el-tab-pane label="Config">
      
    </el-tab-pane>
    <el-tab-pane label="Role"></el-tab-pane>
    <el-tab-pane label="Task"></el-tab-pane>
  </el-tabs>
</template>
<style scoped>
.header-tabs :deep() .el-tabs__content {
  padding: 0px;
  color: #6b778c;
}
.header-tabs :deep() .el-tabs__header {
    margin: 0px;
}
.header-tabs :deep() .el-tabs__nav-wrap::after {
    height: 1px;
    display: none;
}
.header-tabs :deep() .el-tabs__header {
    /* border-bottom: 0px; */
}
.header-tabs{
    --el-tabs-header-height: 30px;
}
</style>