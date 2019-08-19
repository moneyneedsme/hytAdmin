<template>
	<div>
      <Coustom-tree></Coustom-tree>
      <div>
        <Input v-model="num"  placeholder="商品编号" clearable/>
        <Input v-model="name"  placeholder="商品名称" clearable/>
				<Select v-model="selectValue">
						<Option v-for="(item,index) in selectData" :value="item.value" :key="item.value+index">{{ item.label }}</Option>
				</Select>
        <Button>查询</Button>
				<Button  type="primary">新增</Button>
				<Button  type="primary">删除</Button>
        <Table border ref="selection" :columns="columns4" :data="data1" height="700">
          <template slot-scope="{ row, index }" slot="delete">
              <Button type="error" size="small" @click="show(index)">删除</Button>
          </template>
					<template slot-scope="{ row, index }"  @click="show(index)"  slot="edit">
              <Button type="primary" size="small" >编辑</Button>
          </template>
					<template slot-scope="{ row, index }" slot="img">
              <img src="http://image.szrousen.cn/zkong/Goods/picture/201903/20190302142019ODO.png" @click="show(index)">
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
  name: 'goodsCommodity',
  data () {
    return {
      num:'',
      name: '',
			data1: [],
			selectValue:'',
			selectData:[],
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
          title: '商品编号',
          key: 'goodsNum',
          align: 'center',
          maxWidth:70,
          tooltip:true
        },
        {
          title: '商品名称',
          key: 'goodsName',
          align: 'center',
          minWidth: 100,
          tooltip:true
        },
        {
          title: '售卖价格',
          key: 'price',
					align: 'center',
					maxWidth: 100,
          tooltip:true
        },
        {
          title: '商品类型',
          key: 'goodsType',
          align: 'center',
          maxWidth: 120,
          tooltip:true
				},
				{
          title: '显示顺序',
          key: 'order',
          align: 'center',
          maxWidth: 70,
          tooltip:true
				},
				{
          title: '商品图片',
          align: 'center',
          slot: 'img',
          tooltip:true
				},
				{
          title: '重量',
          key: 'weight',
          align: 'center',
          maxWidth: 70,
          tooltip:true
				},
				{
          title: '误差',
          key: 'error',
          align: 'center',
          maxWidth: 70,
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
			goodsNum:200,
			goodsName:'爆米花',
			dept:'巧克力榛子现磨咖啡',
			price:100.03,
			goodsType:'咖啡机600',
			order:100,
			weight:0.004,
			error:0.0001,
			regdate:'2019-04-09 10:19:58',
      updataDate:'2020-04-09 10:19:58'
    }
		this.data1 = Array(20).fill(data);
		const SData = {
			value: 'New York',
			label: 'New York'
		}
		this.selectData = Array(20).fill(SData);
  }
}
</script>

<style lang="less" scoped>
  .ivu-input-wrapper,.ivu-select{
    width: 180px;
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
