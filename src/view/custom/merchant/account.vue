<template>
	<div>
		<div>
      <Coustom-tree></Coustom-tree>
      <div>
        <Input v-model="name"  placeholder="商户名称" clearable/>
        <Button>查询</Button>
        <Table border ref="selection" :columns="columns4" :data="data1" height="700">
          <template slot-scope="{ row, index }" slot="stream">
              <Button type="primary" size="small" @click="show(index)">View</Button>
          </template>
        </Table>
        <Page :total="100" show-elevator />
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
          title: '流水',
          align: 'center',
          slot: 'stream',
          maxWidth: 50,
          tooltip:true
        },
        {
          title: '商户名称',
          key: 'name',
          align: 'center',
          minWidth: 120,
          tooltip:true
        },
        {
          title: '可用余额',
          key: 'balance',
          align: 'center',
          maxWidth: 80,
          tooltip:true
        },
        {
          title: '可结算金额',
          key: 'amount',
          align: 'center',
          maxWidth: 80,
          tooltip:true
        },
        {
          title: '已结算金额',
          key: 'settled',
          align: 'center',
          maxWidth: 80,
          tooltip:true
        },
        {
          title: '总收益',
          key: 'totalIncome',
          align: 'center',
          tooltip:true
        },
        {
          title: '总支出',
          key: 'expenditure',
          align: 'center',
          tooltip:true
        },
        {
          title: '抽成金额',
          key: 'percentage',
          align: 'center',
          tooltip:true
        },
        {
          title: '前结算日收益',
          key: 'dayIncome',
          align: 'center',
          tooltip:true
        },
        {
          title: '前结算日抽成',
          key: 'perSettlement',
          align: 'center',
          tooltip:true
        },
        {
          title: '更新时间',
          key: 'updateTime',
          align: 'center',
          tooltip:true
        },
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
      name: '戴佳文：荷兰花卉小镇',
      balance:1000,
      amount:20000,
      settled:200,
      totalIncome:0.01,
      expenditure:0.003,
      percentage:5000,
      dayIncome:100,
      perSettlement:300,
      updateTime:'2019-04-09 10:19:58'
    }
    this.data1 = Array(20).fill(data)
  }
}
</script>

<style lang="less" scoped>
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
