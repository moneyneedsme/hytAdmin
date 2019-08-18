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
      <Table :columns="columns11" :data="dataTable" border height="500" :loading='tableLoading'>
        <template slot-scope="{ row,index}" slot="index">
            <strong>{{ index }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="edit">
            <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">View</Button>
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
  name: 'info',
  data () {
    return {
      tableLoading: false,
      columnsConfig: {},
      name: '',
      phone: '',
      contacts: '',
      columns11: [
        {
          title: ' ',
          align: 'center',
          slot: 'index',
          maxWidth: 40
        },
        {
          title: '编辑',
          align: 'center',
          slot: 'edit',
          maxWidth: 50
        },
        {
          title: '商户名称',
          key: 'name',
          align: 'center',
          minWidth: 120
        },
        {
          title: '可用余额',
          key: 'balance',
          align: 'center',
          maxWidth: 80
        },
        {
          title: '可结算金额',
          key: 'amount',
          align: 'center',
          maxWidth: 80
        },
        {
          title: '已结算金额',
          key: 'settled',
          align: 'center',
          maxWidth: 80
        },
        {
          title: '收款模式',
          key: 'paymentModel',
          align: 'center'
        },
        {
          title: '联系人',
          key: 'contacts',
          align: 'center'
        },
        {
          title: '联系电话',
          key: 'phone',
          align: 'center',
          minWidth: 50
        },
        {
          title: '注册日期',
          key: 'regdate',
          align: 'center',
          minWidth: 25
        },
        {
          title: '到期日期',
          key: 'dueDate',
          align: 'center',
          minWidth: 25
        }
      ],
      dataTable: [

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
      name: '广东省深圳市龙华区广东省深圳市龙华区',
      balance: 40000,
      amount: 6000,
      settled: 99000,
      paymentModel: '支付宝',
      contacts: '王小7',
      phone: '15668889785',
      regdate: '2019-8-17',
      dueDate: '2020-8-17'
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
