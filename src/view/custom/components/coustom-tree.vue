<template>
  <Tree :data="treeData||[]" @on-select-change='pick'></Tree>
</template>

<script>
import giantTree from "vue-giant-tree";
import { getMerchantTree } from "../../../api/data";
export default {
  name: 'tree',
  components:{giantTree},
  props:{
		treeData:{
			default:[]
		},
	},
  data () {
    return {
    }
  },
  methods: {
    pick(row,index){
      this.$emit('pickTree',row[0])
    }
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
.ztree{
	float: left;
  margin-right: 20px;
  width: 200px;
  min-height: 500px;
}
</style>
