<template>
	<div>
      <Coustom-tree></Coustom-tree>
      <div>
        <Input v-model="num"  placeholder="设备编号" clearable/>
				<Select v-model="networkValue" placeholder="网络" clearable >
						<Option v-for="(item,index) in networkData" :value="item.value" :key="item.value+index">{{ item.label }}</Option>
				</Select>
        <Select v-model="lineValue" placeholder="所属路线" clearable >
            <Input suffix="ios-search" />
						<Option v-for="(item,index) in lineData" :value="item.value" :key="item.value+index">{{ item.label }}</Option>
				</Select>
        <Select v-model="pointValue" placeholder="点位分类" clearable >
						<Option v-for="(item,index) in pointData" :value="item.value" :key="item.value+index">{{ item.label }}</Option>
				</Select>
        <Button>查询</Button>
				<Button  type="primary">新增</Button>
        <Button  type="primary">复制为</Button>
				<Button  type="primary">解绑</Button>
				<Button  type="primary">设备转移</Button>
        <Table border ref="selection" :columns="columns4" :data="data1" height="700">
          <template slot-scope="{ row, index }" slot="delete">
              <Button type="error" size="small" @click="show(index)">删除</Button>
          </template>
					<template slot-scope="{ row, index }"  @click="show(index)"  slot="edit">
              <Button type="primary" size="small" >编辑</Button>
          </template>
					<template slot-scope="{ row, index }" slot="container">
            <Button type="error" size="small" @click="show(index)" :disabled='index%2==0'>发布</Button>
          </template>
          <template slot-scope="{ row, index }" slot="network">
            <span v-if='index%2==0'>离线</span >
            <span v-else>在线</span>
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
  name: 'deviceManagement',
  data () {
    return {
      num:'',
			data1: [],
			networkValue:'',
      networkData:[],
      lineValue:'',
      lineData:[],
      pointValue:'',
      pointData:[],
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
          title: '货柜',
          slot: 'container',
          align: 'center',
          maxWidth:70,
          tooltip:true
        },
        {
          title: '网络',
          slot: 'network',
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
          title: '设备编号',
          key: 'number',
          align: 'center',
          tooltip:true
        },
        {
          title: '终端号',
          key: 'terminal',
					align: 'center',
					minWidth: 70,
          tooltip:true
        },
        {
          title: '点位名称',
          key: 'pointName',
          align: 'center',
          maxWidth: 120,
          tooltip:true
				},
				{
          title: '点位分类',
          key: 'classification',
          align: 'center',
          maxWidth: 70,
          tooltip:true
				},
				{
          title: 'DTU注册码',
          align: 'center',
          key: 'DTUcode',
          minWidth:100,
          tooltip:true
				},
				{
          title: '线路',
          key: 'line',
          align: 'center',
          tooltip:true
				},
				{
          title: '补货',
          key: 'replenishment',
          align: 'center',
          tooltip:true
				},
			
        {
          title: '城市',
          key: 'city',
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
			number:20081,
			terminal:'56b88a66d21b5c9a',
			pointName:'清河湾高尔夫 ',
			classification:'公园',
			DTUcode:'CC87053A2249838FC3640EF7D7',
			line:'深圳2',
			replenishment:'人工',
      city:'北京市',
			updataDate:'2019-04-09 10:19:58',
    }
		this.data1 = Array(20).fill(data);
		const NData = {
			value: '离线',
			label: '离线'
		}
    this.networkData = Array(20).fill(NData);
    const LData = {
			value: '深圳朗科有限公司',
			label: '深圳朗科有限公司'
		}
    this.lineData = Array(20).fill(LData);
    const PData = {
			value: '机场',
			label: '机场'
		}
		this.pointData = Array(20).fill(PData);
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
  .ivu-input-with-suffix {
    padding-right:0px;
  }
  .ivu-input-with-suffix{
    margin:0 3px;
  }
</style>
