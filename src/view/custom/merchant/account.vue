<template>
	<div>
		<div>
      <Coustom-tree></Coustom-tree>
      <div>
        <Input v-model="name"  placeholder="商户名称" clearable/>
        <Button>查询</Button>
        <Table border ref="selection" :columns="columns4" :data="data1"></Table>
      </div>
    </div>
  </div>
</template>
<script>
import CoustomTree from '../components/coustom-tree'
export default {
  components: {
    CoustomTree
  },
  name: 'account',
  data () {
    return {
      name: '',
      data1: [],
      columns4: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: 'Name',
          key: 'name'
        },
        {
          title: 'Age',
          key: 'age'
        },
        {
          title: 'Address',
          key: 'address'
        }
      ]
    }
  },
  methods: {
    show (index) {
      alert(index)
    }
  },
  mounted () {
    const data = {
      name: 'John Brown',
      age: 18,
      address: 'New York No. 1 Lake Park',
      date: '2016-10-03'
    }
    this.data1 = Array(20).fill(data)
  }
}
</script>

<style lang="less">
  .ivu-input-wrapper{
    width: 150px;
    margin-right:5px;
  }
  .ivu-btn{
    margin-right: 10px;
  }
</style>
