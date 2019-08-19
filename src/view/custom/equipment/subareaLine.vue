<template>
	<div>
      <Coustom-tree></Coustom-tree>
      <div>
        <Input v-model="name"  placeholder="分区名称" clearable/>
        <Button>查询</Button>
        <Button  type="primary">新增</Button>
        <Table border ref="selection" :columns="columns4" :data="data1" height="700">
          <template slot-scope="{ row, index }" slot="delete">
              <Button type="error" size="small" @click="show(index)">删除</Button>
          </template>
					<template slot-scope="{ row, index }"  @click="show(index)"  slot="edit">
              <Button type="primary" size="small" >编辑</Button>
          </template>
          <template slot-scope="{ row, index }" slot="status">
              <Button type="success" size="small" @click="show(index)" v-if='index%2==0'>正常</Button>
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
  name: 'subareaLine',
  data () {
    return {
      name:'',
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
          title: '分区名称',
          key: 'partitionName',
          align: 'center',
          tooltip:true
        },
        {
          title: '分区线路',
          key: 'subareaLine',
          align: 'center',
          tooltip:true
        },
        {
          title: '所属部门',
          key: 'dept',
          align: 'center',
          tooltip:true
        },
        {
          title: '联系人',
          key: 'contacts',
          align: 'center',
          maxWidth:70,
          tooltip:true
        },
				{
          title: '联系电话',
          align: 'center',
          key: 'phone',
          tooltip:true
				},
        {
          title: '显示顺序',
          key: 'order',
          align: 'center',
          maxWidth:70,
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
          key: 'creactTime',
          align: 'center',
          tooltip:true
        },
        {
          title: '更新时间',
          key: 'updataDate',
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
      partitionName:'分区名称aab',
      subareaLine:'分区线路aabb',
      dept:'技术部',
      contacts:'王小7',
      phone:'15687744652',
      order:100,
      creactTime:'2019-08-10 10:28:44',
			updataDate:'2019-08-10 10:28:43',
    }
		this.data1 = Array(20).fill(data);
  }
}
</script>

<style lang="less" scoped>
  .ivu-input-wrapper{
    width: 180px;
    margin-right:5px;
  }
  .ivu-select{
    width: 120px;
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
	.ivu-table-cell img{
		width: 33px;
		height: 33px;
  }
</style>
