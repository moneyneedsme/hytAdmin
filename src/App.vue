<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
// import Main from '@/components/main'
export default {
  name: 'App',
}
</script>

<style lang="less">
.size{
  width: 100%;
  height: 100%;
}
html,body{
  .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  .size;
}
//重置element table样式
.el-table th>.cell{
  color: #515a6e;
  font-size: 12px;
}
.el-table td, .el-table th{
  height: 40px;
  padding: 0px 0;
}
.el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
  font-size: 12px;
}
.el-table [class*=el-table__row--level] .el-table__expand-icon{
  margin-left: -28px
}
</style>
