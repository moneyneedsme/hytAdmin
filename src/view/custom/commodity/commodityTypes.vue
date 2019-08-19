<template>
	<div>
      <Coustom-tree></Coustom-tree>
      <div>
        <Input v-model="name"  placeholder="类型名称" clearable/>
        <Button>查询</Button>
				<Button  type="primary">新增</Button>
				<Button  type="primary">删除</Button>
				<Button  type="primary">导出</Button>
        <Table border ref="selection" :columns="columns4" :data="data1" height="700">
          <template slot-scope="{ row, index }" slot="delete">
              <Button type="error" size="small" @click="show(index)">删除</Button>
          </template>
					<template slot-scope="{ row, index }" slot="edit">
              <Button type="primary" size="small" @click="show(index)">编辑</Button>
          </template>
					<template slot-scope="{ row, index }" slot="status">
              <Button type="success" size="small" @click="show(index)" v-if='index%2'>正常</Button>
							<Button type="error" size="small" @click="show(index)" v-else>禁用</Button>
          </template>
        </Table>
        <Page :total="100" show-elevator />
      </div>
  </div>
</template>
<script>
import CoustomTree from '../components/coustom-tree'
export default {
  components: {
    CoustomTree
  },
  name: 'commodityTypes',
  data () {
    return {
      name: '',
      data1: [],
      columns4: [
        {
          title: ' ',
          align: 'center',
          type:'index',
          maxWidth: 40,
          tooltip:true
        },
        {
          type: 'selection',
          maxWidth: 40,
          align: 'center',
          tooltip:true
        },
        {
          title: '删除',
          align: 'center',
          slot: 'delete',
          maxWidth: 70,
          tooltip:true
				},
				{
          title: '编辑',
          align: 'center',
          slot: 'edit',
          maxWidth: 70,
          tooltip:true
        },
        {
          title: '商品类型',
          key: 'goodsType',
          align: 'center',
          minWidth: 120,
          tooltip:true
        },
        {
          title: '所属部门',
          key: 'dept',
          align: 'center',
          maxWidth: 100,
          tooltip:true
        },
        {
          title: '状态',
          slot: 'status',
          align: 'center',
          maxWidth: 70,
          tooltip:true
        },
        {
          title: '创建时间',
          key: 'regdate',
          align: 'center',
          minWidth: 25,
          tooltip:true
        },
        {
          title: '到期时间',
          key: 'dueDate',
          align: 'center',
          minWidth: 25,
          tooltip:true
        }
      ]
    }
  },
  methods: {
    show (index) {
      console.log(index%2)
    }
  },
  mounted () {
    const data = {
			goodsType:'爆米花',
			dept:'技术部生产部',
			regdate:'2019-04-09 10:19:58',
      dueDate:'2020-04-09 10:19:58'
    }
    this.data1 = Array(20).fill(data)
  }
}
</script>

<style lang="less" scoped>
  .ivu-input-wrapper{
    width: 200px;
    margin-right:5px;
	}
	.ivu-btn{
    margin-right: 10px;
	}
	.ivu-table-wrapper .ivu-btn{
		margin-right: 0px;
	}
  .ivu-table-wrapper{
    margin-top:20px;
  }
  .ivu-table-cell{
    padding-left: 0px;
    padding-right:0px;
  }
  .ivu-page{
    text-align: center;
    margin-top: 10px;
  }
</style>
