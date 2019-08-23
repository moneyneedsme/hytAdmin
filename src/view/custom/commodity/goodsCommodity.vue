<template>
	<div>
      <Coustom-tree></Coustom-tree>
      <div>
        <Input v-model="numID"  placeholder="商品id" clearable/>
        <Input v-model="name"  placeholder="商品名称" clearable/>
        <Cascader :data="selectData" v-model="selectValue" :value="selectValue" ></Cascader>
        <Button @click='getPageDatas'>查询</Button>{{selectValue}}
        <Table border ref="selection" :columns="columns" :data="datas" height="700">
					<template slot-scope="{ row, index }"  @click="show(index)"  slot="edit">
              <Button type="primary" size="small" >编辑</Button>
              <Button type="error" size="small" @click="modalDel=true;delID=row.id;delIndex=index">删除</Button>
          </template>
					<template slot-scope="{ row, index }" slot="img">
              <img :src="row.imageAddress" @click="show(index)">
          </template>
					<template slot-scope="{ row}" slot="status">
              <Button type="success" size="small" @click="enable(row.enable)" v-if='row.enable=="START"'>上架</Button>
							<Button type="error" size="small" @click="enable(row.enable)" v-else>下架</Button>
          </template>
        </Table>
        <Page :total="total" show-elevator :current='pageNum' @on-change='pageChange' :page-size='pageSize'/>
      </div>
      <Modal v-model="modalDel" width="360">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>警告</span>
        </p>
        <div style="text-align:center">
            <p>确定要删除吗？</p>
        </div>
        <div slot="footer">
            <Button type="error" size="large" long :loading="modal_loading" @click="del">删除</Button>
        </div>
      </Modal>
  </div>
</template>
<script>
import CoustomTree from '../components/coustom-tree';
import {netWork} from '@/api/data'
export default {
  components: {
    CoustomTree
  },
  name: 'goodsCommodity',
  data () {
    return {
      modal_loading:false,//删除的loading
      delID:null,//删除的ID
      delIndex:null,//删除的索引
      modalDel:false,
      numID:'',
      name: '',
			selectValue:[],
      selectData:[],
      pageNum:1,
      total:null,
      pageSize:15,
			datas: [],
      columns: [
				{
          title: '商品编号',
          key: 'productCode',
          align: 'center',
          tooltip:true
        },
        {
          title: '商品名称',
          key: 'productName',
          align: 'center',
          tooltip:true
        },
        {
          title: '商品类型',
          key: 'categoryId',
          align: 'center',
          tooltip:true
        },
        {
          title: '进价',
          key: 'buyPrice',
					align: 'center',
          tooltip:true
        },
        {
          title: '售价',
          key: 'salePrice',
					align: 'center',
          tooltip:true
        },
				{
          title: '商品图片',
          align: 'center',
          slot: 'img',
          tooltip:true
				},
				{
          title: '商品描述',
          key: 'productDesc',
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
          title: '更新时间',
          key: 'updateDate',
          align: 'center',
          tooltip:true
        },
        {
          title: '操作',
          align: 'center',
          slot: 'edit',
          tooltip:true
				},
      ]
    }
  },
  methods: {
    
    show (index) {
      console.log(index%2)
    },
    del(){
      this.modal_loading = true;
      let url = '/product/productDelete?id='+this.delID
      netWork(url).then(res=>{
        if(res.data.code===200){
          this.modal_loading = false;
          this.modalDel = false;
          this.datas = this.datas.splice(this.delIndex,1)
        }else if(res.data.code===500){
          this.$Message.error(res.data.message);
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    enable(value){
      alert(value)
    },
    pageChange(value){
      this.pageNum = value;
      this.getPageDatas();
    },
    getPageDatas(){
      let data = {
        id:this.numID,
        productName:this.name,
        pageNum:this.pageNum,
        pageSize:this.pageSize
      }
      netWork('/product/findProductPage',data).then(res=>{
        if(res.data.code===200){
          this.pageNum = res.data.result.pageNum;
          this.total = res.data.result.total;
          this.datas = res.data.result.list;
        }else if(res.data.code===500){
          this.$Message.error(res.data.message);
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    getSelectData(){
      netWork('/category/findCategoryTree').then(res=>{
        // console.log(res.data)
        if(res.data.code===200){
          this.selectData = res.data.result;
          console.log(res.data.result)
        }else if(res.data.code===500){
          this.$Message.error(res.data.message);
        }
      }).catch(err=>{
        console.log(err)
      })
    },
  },
  mounted () {
    this.getSelectData();
    this.getPageDatas();
  }
}
</script>

<style lang="less" scoped>
  .ivu-input-wrapper,.ivu-cascader {
    width: 180px;
    margin-right:5px;
    display: inline-block;
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
