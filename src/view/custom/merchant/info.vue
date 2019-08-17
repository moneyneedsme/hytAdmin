<template>
	<div>
    <Coustom-tree></Coustom-tree>
		<div>
      <Input v-model="name"  placeholder="商户名称" clearable/>
      <Input v-model="contacts"  placeholder="联系人" />
      <Input v-model="phone" placeholder="联系电话" />
      <Button >查询</Button>
      <Button  type="primary">新增</Button>
      <Button  type="primary">绑定协议</Button>
      <Button  type="primary">购买服务</Button>
      <Button  type="primary">导出</Button>
      <template>
        <Table :columns="columns11" :data="dataTable" border height="700" :loading='tableLoading'></Table>
      </template>
    </div>
  </div>
</template>
<script>
import CoustomTree from '../components/coustom-tree'
export default {
  components: {
    CoustomTree
  },
  name: 'info',
  data () {
    return {
      tableLoading: false,
      columnsConfig: {},
      name: '',
      phone: '',
      columns11: [
        {
          title: ' ',
          align: 'center',
          key: 'id'
        },
        {
          title: '编辑',
          align: 'center',
          key: 'edit'
        },
        {
          title: '商户名称',
          key: 'Other',
          align: 'center'
        },
        {
          title: '可用余额',
          key: 'Company',
          align: 'center',
          maxWidth: 90
        },
        {
          title: '可结算金额',
          key: 'Gender',
          align: 'center',
          maxWidth: 100
        },
        {
          title: '已结算金额',
          key: 'Gender',
          align: 'center',
          maxWidth: 100
        },
        {
          title: '收款模式',
          key: 'Gender',
          align: 'center'
        },
        {
          title: '联系人',
          key: 'Gender',
          align: 'center'
        },
        {
          title: '联系电话',
          key: 'Gender',
          align: 'center'
        },
        {
          title: '注册日期',
          key: 'Gender',
          align: 'center'
        },
        {
          title: '到期日期',
          key: 'Gender',
          align: 'center'
        }
      ],
      dataTable: [

      ]
    }
  },
  methods: {
  },
  mounted () {
    const data = {
      Name: 1,
      Other: 2,
      Company: 3,
      Gender: 4
    }
    this.dataTable = Array(20).fill(data)
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
