<template>
	<giant-tree :nodes="nodes" @onClick='aaaaa'/>
</template>

<script>
import giantTree from "vue-giant-tree";
import { getMerchantTree } from "../../../api/data";
export default {
  name: 'tree',
  components:{giantTree},
  data () {
    return {
      nodes: [
        { id:1, pid:0, name:"随意勾选 1", open:true},
        { id:11, pid:1, name:"随意勾选 1-1", open:true},
        { id:111, pid:11, name:"随意勾选 1-1-1"},
        { id:112, pid:11, name:"随意勾选 1-1-2"},
        { id:12, pid:1, name:"随意勾选 1-2", open:true},
        { id:121, pid:12, name:"随意勾选 1-2-1"},
        { id:122, pid:12, name:"随意勾选 1-2-2"},
        { id:2, pid:0, name:"随意勾选 2", checked:true, open:true},
        { id:21, pid:2, name:"随意勾选 2-1"},
        { id:22, pid:2, name:"随意勾选 2-2", open:true},
        { id:221, pid:22, name:"随意勾选 2-2-1", checked:true},
        { id:222, pid:22, name:"随意勾选 2-2-2"},
        { id:23, pid:2, name:"随意勾选 2-3"}
      ]
      // nodes:[]
    }
  },
  methods: {
    aaaaa(event, treeId, treeNode){
      console.log(event)
      console.log(treeId)
      console.log(treeNode)
      alert(treeNode.id)
    }
  },
  mounted () {
    getMerchantTree({
      channelId:1
    }).then(backData=>{
      console.log(backData);
    })
  }
}
</script>

<style lang="less" scoped>
.ztree{
	float: left;
  margin-right: 20px;
  width: 150px;
  min-height: 500px;
}
</style>
