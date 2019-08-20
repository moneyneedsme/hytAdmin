<template>
	<div>
      <Coustom-tree></Coustom-tree>
      <div>
        <Input v-model="num"  placeholder="异常内容" clearable/>
				<Select v-model="abnormalLevelValue" placeholder="异常等级" clearable >
						<Option v-for="(item,index) in abnormalLevel" :value="item.value" :key="item.value+index">{{ item.label }}</Option>
				</Select>
        <Select v-model="abnormalTypeValue" placeholder="异常类型" clearable >
						<Option v-for="(item,index) in abnormalType" :value="item.value" :key="item.value+index">{{ item.label }}</Option>
				</Select>
        <Select v-model="statusValue" placeholder="状态" clearable >
						<Option v-for="(item,index) in status" :value="item.value" :key="item.value+index">{{ item.label }}</Option>
				</Select>
        <Button>查询</Button>
        <Table border ref="selection" :columns="columns4" :data="data1" height="700">
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
  name: 'troubleshooting',
  data () {
    return {
      num:'',
			data1: [],
			abnormalLevelValue:'',
      abnormalLevel:[
        {
          value: '一般警告',
          label: '一般警告'
        },
        {
          value: '重要警告',
          label: '重要警告'
        },
        {
          value: '严重警告',
          label: '严重警告'
        },
      ],
      abnormalTypeValue:'',
      abnormalType:[],
      statusValue:'',
      status:[
        {
          value: '未解除',
          label: '未解除'
        },
        {
          value: '已解除',
          label: '已解除'
        },
      ],
      columns4: [
        {
          title: ' ',
          align: 'center',
          type:'index',
          maxWidth: 60,
          tooltip:true
        },
        {
          title: '22',
          type: 'selection',
          maxWidth: 60,
          align: 'center',
          tooltip:true
        },
        {
          title: '设备编号',
          key: 'number',
          align: 'center',
          tooltip:true
        },
        {
          title: '线路',
          key: 'line',
          align: 'center',
          tooltip:true
        },
        {
          title: '货道',
          slot: 'cargoWay',
          align: 'center',
          maxWidth:70,
          tooltip:true
        },
				{
          title: '商品编号',
          align: 'center',
          key: 'goodsNum',
          maxWidth: 70,
          tooltip:true
				},
        {
          title: '库存数量',
          key: 'quantity',
          align: 'center',
          maxWidth:70,
          tooltip:true
        },
        {
          title: '预警阈值',
          key: 'earlyWarning',
          align: 'center',
          maxWidth: 70,
          tooltip:true
        },
        
        {
          title: '状态',
          key: 'status',
					align: 'center',
          tooltip:true
        },
        {
          title: '预警信息',
          key: 'warnInfo',
          align: 'center',
          tooltip:true
				},
        {
          title: '创建时间',
          key: 'creactTime',
          align: 'center',
          minWidth: 25,
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
			number:20081,
      line:'深圳2',
      creactTime:'2019-08-10 10:28:44',
			updataDate:'2019-04-09 10:19:58',
    }
		this.data1 = Array(20).fill(data);
    const aData = {
			value: '货道故障',
			label: '货道故障'
		}
		this.abnormalType = Array(20).fill(aData);
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
