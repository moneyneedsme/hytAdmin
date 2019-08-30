<template>
	<div class="channelGoodsCommodity">
      <div>
        <Input v-model="name"  placeholder="商品名称" clearable/>
        <Button @click='getPageDatas'>查询</Button>
        <Button  type="primary" @click='showNewlyAdded("xz")'>新增</Button>
        <Table border ref="selection" :columns="columns" :data="datas" height="700">
          <template slot-scope="{ row, index }"  slot="history">
              <Button type="success" size="small" @click='showHistory(row.id)'>查看</Button>
          </template>
					<template slot-scope="{ row, index }"  slot="edit">
              <Button type="primary" size="small" class='marBtn' @click='showNewlyAdded("bj",index)'>编辑</Button>
              <Button type="error" size="small" @click="modalDel=true;delID=row.id;delIndex=index">删除</Button>
          </template>
					<template slot-scope="{ row}" slot="img">
              <img :src="row.imageAddress">
          </template>
					<template slot-scope="{ row,index}" slot="status">
              <Button type="success" size="small" @click="enable(row.id,row.status,index)" v-if='row.status'>上架</Button>
							<Button type="error" size="small" @click="enable(row.id,row.status,index)" v-else>下架</Button>
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
      <!-- 新增弹框的模态框 -->
      <Modal v-model="newlyAdded" width="600" :title="showNewlyType=='xz'?'新增渠道商商品':'编辑渠道商商品'" :loading='addedLoadding' :mask-closable='false'>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
          <FormItem label="商品" prop="productId">
            <!-- <Input v-model.number.trim="formValidate.productId" placeholder="请输入商品" disabled></Input> -->
            <div class="getOnModal" @click='getOnModal'>{{formValidate.productName}}</div>
          </FormItem>
          <FormItem label="商品进价" prop="buyPrice">
            <Input v-model.trim="formValidate.buyPrice" placeholder="请输入商品进价"></Input>
          </FormItem>
          <FormItem label="商品售价" prop="salePrice">
            <Input v-model.trim="formValidate.salePrice" placeholder="请输入商品售价"></Input>
          </FormItem>
          <FormItem label="实际售价" prop="actualPrice">
            <Input v-model.trim="formValidate.actualPrice" placeholder="请输入实际售价"></Input>
          </FormItem>
          <FormItem label="渠道分类" prop="categorylId">
            <Select v-model="formValidate.categorylId">
                <Option v-for="item in channelList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem label="备注" prop="remark">
            <Input v-model.trim="formValidate.remark" placeholder="请输入备注"></Input>
          </FormItem>
          <FormItem label="状态">
            <RadioGroup v-model="formValidate.status">
              <Radio label=1>上架</Radio>
              <Radio label=0>下架</Radio>
            </RadioGroup>
          </FormItem>
        </Form>
         <div slot="footer">
          <Button type="text" size="large" @click='newlyAdded=false'>取消</Button>
          <Button type="primary" size="large" @click="Added(formValidate)">确定</Button>
         </div>
      </Modal>
      <goodsid-modal 
        :showGoodsIDmodal='showGoodsIDmodal'
        :GoodsIDdatas='GoodsIDdatas' 
        :GoodsIdTotal='GoodsIdTotal' 
        :GoodsIDPageSize='GoodsIDPageSize' 
        :GoodsIDPageNum='GoodsIDPageNum'
        @getGoodsIDPageDatas = 'getGoodsIDPageDatas'
        @GoodsIDPageChange = 'GoodsIDPageChange'
        @hideGoodsIdModal = 'hideGoodsIdModal'
        @getGoodsId = 'getGoodsId'
        >
      </goodsid-modal>
      <Modal v-model="historyModal" width="600">
        <Table border ref="selection" :columns="columnsHistory" :data="datasHistory" height="700">
        </Table>
        <div slot="footer">
          <Button type="primary" size="large" @click="historyModal=false">确定</Button>
        </div>
      </Modal>
  </div>
</template>
<script>
import goodsidModal from '../components/goodsIDmodal';
import {netWork} from '@/api/data'
import { setTimeout } from 'timers';
export default {
  components: {
    goodsidModal
  },
  name: 'channelGoodsCommodity',
  data () {
    return {
      datasHistory:[],
      columnsHistory:[
        {
          title: '商品进价',
          key: 'buyPrice',
          align: 'center',
          tooltip:true
        },
        {
          title: '操作人姓名',
          key: 'operatorName',
          align: 'center',
          tooltip:true
        },
        {
          title: '修改时间',
          key: 'updateDate',
          align: 'center',
          tooltip:true
        },
      ],
      historyModal:false,
      //渠道
      channelList:[],
      // 商品
      GoodsIDdatas:[],
      GoodsIdTotal:null,
      GoodsIDPageSize:10,
      GoodsIDPageNum:1,
      showGoodsIDmodal:false,
      categoryIdValue:[],
      showNewlyType:'xz',
      addedLoadding:true,
      formValidate:{ //新增字段
        buyPrice:null, //商品进价
        categorylId:null,//渠道分类id
        productId:null,//商品id
        salePrice: null,//商品售价
        actualPrice:null,//实际售价
        remark:null,//备注
        status:'1',
        productName:null,
      },
      ruleValidate: {
        buyPrice: [
          {
            required: true,
            message: "输入不能为空",
            trigger: "blur",
          }
        ],
        categorylId: [
          {
            required: true,
            message: "输入不能为空",
            trigger: "blur",
          }
        ],
        productId: [
          {
            required: true,
            message: "输入不能为空",
            trigger: "blur",
          }
        ],
        salePrice: [
          {
            required: true,
            message: "输入不能为空",
            trigger: "blur",
          }
        ],
        actualPrice: [
          {
            required: true,
            message: "输入不能为空",
            trigger: "blur",
          }
        ]
      },
      newlyAdded:false,//新增按钮的弹框
      modal_loading:false,//删除的loading
      delID:null,//删除的ID
      delIndex:null,//删除的索引
      categoryId:null,//下拉框查询id
      modalDel:false,
      name: '',
      pageNum:1,
      total:null,
      pageSize:15,
			datas: [],
      columns: [
        {
          title: '商品名称',
          key: 'productName',
          align: 'center',
          minWidth:100,
          tooltip:true
        },
        {
          title: '渠道分类名称',
          key: 'categoryName',
          align: 'center',
          minWidth:60,
          tooltip:true
        },
        {
          title: '商品进价',
          key: 'buyPrice',
          align: 'center',
          tooltip:true
        },
        {
          title: '商品售价',
          key: 'salePrice',
          align: 'center',
          tooltip:true
        },
        {
          title: '实际售价',
          key: 'actualPrice',
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
          maxWidth:90,
          tooltip:true
        },
        {
          title: '更新时间',
          key: 'updateDate',
          align: 'center',
          tooltip:true
        },
        {
          title: '查看历史记录',
          align: 'center',
          slot: 'history',
          tooltip:true
        },
        {
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
    showHistory(id){
      let data = {
        id
      }
      netWork('/productChannelHistory/findProductChannelHistory',data).then(res=>{
        if(res.data.code===200){
          this.datasHistory = res.data.result;
          this.historyModal = true;
        }else if(res.data.code===500){
          this.$Message.error(res.data.message);
        }
      }).catch(err=>{
        this.$Message.error('网络连接失败或超时');
      })
    },
    getGoodsId(row){ //点击一行传过来的id
      console.log(row)
      this.formValidate.productId = row.id;
      this.formValidate.productName = row.productName
      this.formValidate.buyPrice = row.buyPrice
      this.formValidate.salePrice = row.salePrice
    },
    hideGoodsIdModal(){  //隐藏点击商品的弹框
      this.showGoodsIDmodal =false;
    },
    getOnModal(){
      this.showGoodsIDmodal=true
    },
    GoodsIDPageChange(value){
      this.GoodsIDPageNum = value;
      this.getGoodsIDPageDatas();
    },
    //点击新增商品 事件
    getGoodsIDPageDatas(value){
      console.log(value)
      let data = {
        // productCode:this.GoodsIdnum,
        enable:'START',
        productName:value,
        pageNum:this.GoodsIDPageNum,
        pageSize:this.GoodsIDPageSize
      }
      netWork('/product/findProductPage',data).then(res=>{
        if(res.data.code===200){
          this.GoodsIDPageNum = res.data.result.pageNum;
          this.GoodsIdTotal = res.data.result.total;
          this.GoodsIDdatas = res.data.result.list;
        }else if(res.data.code===500){
          this.$Message.error(res.data.message);
        }
      }).catch(err=>{
        this.$Message.error('网络连接失败或超时');
        console.log(err)
      })
    },
    showNewlyAdded(type,index){
      this.showNewlyType = type;
      //初始化数据
      this.formValidate = { //新增字段
        buyPrice:null, //商品进价
        categorylId:null,//渠道分类id
        productId:null,//商品id
        salePrice: null,//商品售价
        actualPrice:null,//实际售价
        remark:null,//备注
        status:'1',
        productName:null,
      }
      this.categoryIdValue = [];
      if(type=='bj'){
        this.formValidate = this.datas[index];
        this.formValidate.status =  this.formValidate.status.toString()
      }
      this.newlyAdded=true
    },
    Added(value){
      if(value.buyPrice&&value.categorylId&&value.productId&&value.salePrice&&value.actualPrice){
          let  { buyPrice ,categorylId,productId,salePrice,remark,status,actualPrice} =  value;
          if(this.showNewlyType=='xz'){
            let data = {
              actualPrice,
              buyPrice,
              categorylId,
              productId,
              salePrice,
              remark,
              status:status==1?true:false,
            }
            netWork('/productChannel/productChannelSave',data).then(res=>{
              if(res.data.code===200){
                if(res.data.result){
                  // this.categoryId = null; //清除掉 筛选id
                  this.getPageDatas();//刷新页面
                  this.addedLoadding = false;
                  this.newlyAdded = false;
                  this.$Message.success('新增成功');
                }
              }else if(res.data.code===500){
                this.newlyAdded = true;
                this.addedLoadding = false;
                this.$Message.error(res.data.message);
              }
            }).catch(err=>{
              this.$Message.error('网络连接失败或超时');
              this.newlyAdded = true;
              this.addedLoadding = false;
              console.log(err)
            })
          }else if(this.showNewlyType=='bj'){
            let data = {
              actualPrice,
              buyPrice,
              categorylId,
              productId,
              salePrice,
              remark,
              status:status==1?true:false,
              id:value.id
            }
            netWork('/productChannel/productChannelModified',data).then(res=>{
              if(res.data.code===200){
                if(res.data.result){
                  this.categoryId = null; //清除掉 筛选id
                  this.getPageDatas();//刷新页面
                  this.addedLoadding = false;
                  this.newlyAdded = false;
                  this.$Message.success('编辑成功');
                }
              }else if(res.data.code===500){
                this.newlyAdded = true;
                this.addedLoadding = false;
                this.$Message.error(res.data.message);
              }
            }).catch(err=>{
              this.$Message.error('网络连接失败或超时');
              this.newlyAdded = true;
              this.addedLoadding = false;
              console.log(err)
            })
          }
        }else{
          this.addedLoadding = false;
          this.$Message.error('信息填写不完整！');
        }
    },
    del(){
      this.modal_loading = true;
      let url = '/productChannel/productChannelDelete?id='+this.delID
      netWork(url).then(res=>{
        if(res.data.code===200){
          this.modal_loading = false;
          this.modalDel = false;
          this.datas.splice(this.delIndex,1);
          this.delID = null;//删除的ID
          this.delIndex =null;//删除的索引
          this.$Message.success('删除成功');
        }else if(res.data.code===500){
          this.modal_loading = false;
          this.$Message.error(res.data.message);
        }
      }).catch(err=>{
        this.$Message.error('网络连接失败或超时');
        this.modal_loading = false;
        console.log(err)
      })
    },
    enable(id,value,index){
      let data = {
        id,
        status:!value
      }
      netWork('/productChannel/productChannelModified',data).then(res=>{
        if(res.data.code===200){
          if(res.data.result){
            this.datas[index].status = !this.datas[index].status;
          }
        }else if(res.data.code===500){
          this.$Message.error(res.data.message);
        }
      }).catch(err=>{
        this.$Message.error('网络连接失败或超时');
        console.log(err)
      })
    },
    pageChange(value){
      this.pageNum = value;
      this.getPageDatas();
    },
    getPageDatas(){
      let data = {
        enable: "START",
        productName:this.name,
        pageNum:this.pageNum,
        pageSize:this.pageSize
      }
      netWork('/productChannel/findProductChannelPage',data).then(res=>{
        if(res.data.code===200){
          this.pageNum = res.data.result.pageNum;
          this.total = res.data.result.total;
          this.datas = res.data.result.list;
        }else if(res.data.code===500){
          this.$Message.error(res.data.message);
        }
      }).catch(err=>{
        this.$Message.error('网络连接失败或超时');
        console.log(err)
      })
    },
    // 查询所有渠道商商品类型
    getChannelList(){
      netWork('/categoryChannel/findAllCategoryChannel',{}).then(res=>{
        if(res.data.code===200){
          let data = [];
          for(let i=0,len=res.data.result.length;i<len;i++){
            data[i] = {};
            data[i].value = res.data.result[i].id;
            data[i].label = res.data.result[i].categoryName;
          }
          this.channelList = data;
        }else if(res.data.code===500){
          this.$Message.error(res.data.message);
        }
      }).catch(err=>{
        this.$Message.error('网络连接失败或超时');
        console.log(err)
      })
    }
  },
  mounted () {
    this.getPageDatas();
    this.getGoodsIDPageDatas();
    this.getChannelList();
  }
} 
</script>

<style lang="less" scoped>
  .channelGoodsCommodity{
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
    .ivu-table-wrapper button.marBtn{margin-right: 10px;}
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
    .ivu-table-cell img{
      width: 33px;
      height: 33px;
    }
    
  }
  .getOnModal{
    display: inline-block;
    width: 100%;
    height: 32px;
    line-height: 1.5;
    padding: 4px 7px;
    font-size: 12px;
    border: 1px solid #dcdee2;
    border-radius: 4px;
    color: #515a6e;
    background-color: #fff;
    background-image: none;
    position: relative;
    cursor:pointer;
  }
  div.GoodsIdname{
    width: 180px;
    margin-right:5px;
  }
  div.goodsIDTable{
    margin-top: 10px;
  }
  .modalPage{
    text-align: center;
    margin-top: 10px;
  }
</style>
