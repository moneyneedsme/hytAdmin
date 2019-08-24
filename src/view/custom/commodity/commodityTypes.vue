<template>
	<div class='commodityTypes'>
      <Coustom-tree></Coustom-tree>
      <div>
        <Input v-model="name"  placeholder="类型名称" clearable/>
        <Button>查询</Button>
				<Button  type="primary">新增</Button>
				<Button  type="primary">删除</Button>
				<Button  type="primary">导出</Button>
        <Table border ref="selection" :columns="columns4" :data="data1" height="700">
          <template slot-scope="{ row, index }"  @click="show(index)"  slot="edit">
              <Button type="primary" size="small" class='marBtn'>编辑</Button>
              <Button type="error" size="small" >删除</Button>
          </template>
					<template slot-scope="{ row, index }" slot="status">
              <Button type="success" size="small" @click="show(index)" v-if='index%2'>正常</Button>
							<Button type="error" size="small" @click="show(index)" v-else>禁用</Button>
          </template>
        </Table>
        <Page :total="total" show-elevator :current='pageNum' @on-change='pageChange' :page-size='pageSize'/>
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
      pageNum:1, //当前页数
      total:null,//总条数
      pageSize:15,//每页条数
      name: '',
      data1: [],
      columns4: [
        {
          title: ' ',
          align: 'center',
          type:'index',
          tooltip:true
        },
        {
          type: 'selection',
          align: 'center',
          tooltip:true
        },
        {
          title: '商品类型',
          key: 'goodsType',
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
          title: '状态',
          slot: 'status',
          align: 'center',
          tooltip:true
        },
        {
          title: '创建时间',
          key: 'regdate',
          align: 'center',
          tooltip:true
        },
        {
          title: '到期时间',
          key: 'dueDate',
          align: 'center',
          tooltip:true
        },{
          title: '操作',
          align: 'center',
          slot: 'edit',
          minWidth:60,
          tooltip:true
				},
      ]
    }
  },
  methods: {
    show (index) {
      console.log(index%2)
    },
    pageChange(value){
      this.pageNum = value;
      this.getPageDatas();
    },
    getPageDatas(){
      // let data = {
      //   id:this.numID,
      //   productName:this.name,
      //   categoryId:this.categoryId,
      //   pageNum:this.pageNum,
      //   pageSize:this.pageSize
      // }
      // netWork('/product/findProductPage',data).then(res=>{
      //   if(res.data.code===200){
      //     this.pageNum = res.data.result.pageNum;
      //     this.total = res.data.result.total;
      //     this.datas = res.data.result.list;
      //   }else if(res.data.code===500){
      //     this.$Message.error(res.data.message);
      //   }
      // }).catch(err=>{
      //   console.log(err)
      // })
    },
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
  .commodityTypes{
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
    /deep/ .ivu-table-cell{
      padding-left: 0px;
      padding-right:0px;
    }
    .ivu-page{
      text-align: center;
      margin-top: 10px;
    }
  }
</style>
