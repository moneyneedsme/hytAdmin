<template>
	<div class='commodityPriceDetails'>
      <Coustom-tree></Coustom-tree>
      <div>
        <Input v-model="name"  placeholder="模板名称" clearable/>
        <Input v-model="productName"  placeholder="商品名称" clearable/>
        <Button @click='getPageDatas'>查询</Button>
        <Button  type="primary" @click='showNewlyAdded("xz")'>新增</Button>
        <Table border ref="selection" :columns="columns" :data="datas" height="700">
          <template slot-scope="{ row, index }"    slot="edit">
              <Button type="primary" size="small" class='marBtn' @click='showNewlyAdded("bj",index)'>编辑</Button>
              <Button type="error" size="small" @click="modalDel=true;delID=row.id;delIndex=index">删除</Button>
          </template>
        </Table>
        <Page :total="total" show-elevator :current='pageNum' @on-change='pageChange' :page-size='pageSize'/>
      </div>
      <!-- 删除 -->
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
      <Modal v-model="newlyAdded" width="600" :title="showNewlyType=='xz'?'新增商品价格模版详情':'编辑商品价格模版详情'" :loading='addedLoadding' :mask-closable='false'>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
          <FormItem label="模板" prop="templateName">
            <Input v-model.trim="formValidate.templateName" placeholder="模板名称" :readonly='true' @on-focus='showPriceTemplate=true'></Input>
          </FormItem>
          <FormItem label="渠道商品" prop="productName" >
            <Input v-model.trim="formValidate.productName" placeholder="渠道商品" :readonly='true' @on-focus='showAllProductChannel=true'></Input>
          </FormItem>
          <FormItem label="进价" prop="buyPrice" v-if="showNewlyType=='xz'">
            <Input v-model.trim="formValidate.buyPrice"  :readonly='true'></Input>
          </FormItem>
          <FormItem label="售价" prop="salePrice" v-if="showNewlyType=='xz'" >
            <Input v-model.trim="formValidate.salePrice"  :readonly='true'></Input>
          </FormItem>
          <FormItem label="实际售价" prop="actualPrice">
            <Input v-model.trim="formValidate.actualPrice" placeholder="实际售价"></Input>
          </FormItem>
          <FormItem label="备注" prop="remark">
            <Input v-model.trim="formValidate.remark" placeholder="备注"></Input>
          </FormItem>
        </Form>
         <div slot="footer">
          <Button type="text" size="large" @click='newlyAdded=false'>取消</Button>
          <Button type="primary" size="large" @click="Added(formValidate)">确定</Button>
         </div>
      </Modal>
      <!-- 所有渠道商商品信息 模态框 -->
      <modal-table
        :showModal = 'showAllProductChannel'
        :modalColumns = 'AllProductChannelColumns'
        :modalDatas = 'AllProductChannel'
        :modalTotal = 'AllProductChannelTotal' 
        :modalPageSize = 'AllProductChannelPageSize' 
        :modalPageNum = 'AllProductChannelPageNum'
        @modalGetDatas = 'getAllProductChannel'
        @modalPageChange = 'AllProductChannelPageChange'
        @modalHide = 'AllProductChannelHide'
        @modalGetRow = 'AllProductChannelGetRow'
      >
      </modal-table>
      <!--商品价格模板  模态框 -->
      <modal-table
        :showModal = 'showPriceTemplate'
        :modalColumns = 'priceTemplateColumns'
        :modalDatas = 'priceTemplateDatas'
        :modalTotal = 'priceTemplateTotal' 
        :modalPageSize = 'priceTemplatePageSize' 
        :modalPageNum = 'priceTemplatePageNum'
        @modalGetDatas = 'getTemplate'
        @modalPageChange = 'TemplatePageChange'
        @modalHide = 'TemplateHide'
        @modalGetRow = 'TemplateGetRow'
      >
      </modal-table>
  </div>
</template>
<script>
import CoustomTree from '../components/coustom-tree';
import modalTable from '../components/modalTable';
import {netWork} from '@/api/data'
export default {
  components: {
    CoustomTree,
    modalTable
  },
  name: 'commodityPriceDetails',
  data () {
    return {
      priceTemplateColumns:[
        {
          title: '模板名称',
          key: 'templateName',
					align: 'center',
					minWidth:109,
          tooltip:true
        },
        {
          title: '操作人姓名',
          key: 'operatorName',
					align: 'center',
					minWidth:109,
          tooltip:true
        },
        {
          title: '备注',
          key: 'remark',
					align: 'center',
					minWidth:109,
          tooltip:true
				},
				{
          title: '创建时间',
          key: 'createDate',
					align: 'center',
					minWidth:109,
          tooltip:true
        },
				{
          title: '修改时间',
          align: 'center',
					key: 'updateDate',
					minWidth:109,
          tooltip:true
				}
      ],
      showPriceTemplate:false,
      priceTemplateTotal:null,
      priceTemplatePageSize:10,
      priceTemplatePageNum:1,
      priceTemplateDatas:[],//商品价格模板
      AllProductChannelTotal:null,
      AllProductChannelPageSize:10,
      AllProductChannelPageNum:1,
      showAllProductChannel:false,
      AllProductChannelColumns:[
        {
          title: '商品名称',
          key: 'productName',
					align: 'center',
					minWidth:109,
          tooltip:true
        },
        {
          title: '进价',
          key: 'buyPrice',
					align: 'center',
					minWidth:109,
          tooltip:true
        },
        {
          title: '售价',
          key: 'salePrice',
					align: 'center',
					minWidth:109,
          tooltip:true
				},
				{
          title: '实际售价',
          key: 'actualPrice',
					align: 'center',
					minWidth:109,
          tooltip:true
        },
				{
          title: '商品图片',
          align: 'center',
					slot: 'img',
					minWidth:109,
          tooltip:true
				}
      ],
      AllProductChannel:[],//所有渠道商商品信息
      modalDel:false,
      modal_loading:false,//删除的loading
      delID:null,//删除的ID
      delIndex:null,//删除的索引
      pIdValue:[],
      showNewlyType:'xz',
      addedLoadding:true,
      newlyAdded:false,//新增按钮的弹框
      formValidate:{ //新增字段
        templateId: null, //模板id
        templateName:null, //模板名称
        productId:null,//渠道商品id
        productName:null,//渠道商品
        actualPrice:null,//实际售价
        remark:null,//备注
        buyPrice:null,
        salePrice:null
      },
      ruleValidate: {
        templateName: [
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
        ],
        productName: [
          {
            required: true,
            message: "输入不能为空",
            trigger: "blur",
          }
        ],
      },
      pageNum:1, //当前页数
      total:null,//总条数
      pageSize:15,//每页条数
      name: null,
      productName:null,
      datas: [],
      columns: [
        {
          title: '模板名称',
          key: 'templateName',
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
          title: '实际售价',
          key: 'actualPrice',
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
          title: '备注',
          key: 'remark',
          align: 'center',
          tooltip:true
        },
        {
          title: '创建时间',
          key: 'createDate',
          align: 'center',
          tooltip:true
        },
        {
          title: '修改时间',
          key: 'updateDate',
          align: 'center',
          tooltip:true
        },{
          title: '操作',
          align: 'center',
          slot: 'edit',
          tooltip:true
				},
      ]
    }
  },
  methods: {
    getRowKeys(row){
      return row.value;
    },
    del(){
      this.modal_loading = true;
      let url = '/priceTemplateDetail/priceTemplateDetailDelete?id='+this.delID
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
        this.modal_loading = false;
        console.log(err)
      })
    },
    showNewlyAdded(type,index){
      this.showNewlyType = type;
      //初始化数据
      this.formValidate = {//新增字段
        templateName: null, //模板名称
      };
      this.pIdValue = [];
      if(type=='bj'){
        this.formValidate = this.datas[index];
        console.log(this.datas[index])
      }
      this.newlyAdded=true
    },
    Added(value){
      if(value.templateName&&value.productName&&value.actualPrice){
          let  { templateId,productId,actualPrice,remark} =  value;
          if(this.showNewlyType=='xz'){
            let data = {
              templateId,
              productId,
              actualPrice,
              remark
            }
            netWork('/priceTemplateDetail/priceTemplateDetailSave',data).then(res=>{
              if(res.data.code===200){
                if(res.data.result){
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
              this.newlyAdded = true;
              this.addedLoadding = false;
            })
          }else if(this.showNewlyType=='bj'){
            let data = {
              templateId,
              productId,
              actualPrice,
              remark,
              id:value.id
            }
            netWork('/priceTemplateDetail/priceTemplateDetailModified',data).then(res=>{
              if(res.data.code===200){
                if(res.data.result){
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
              this.newlyAdded = true;
              this.addedLoadding = false;
            })
          }
        }else{
          this.addedLoadding = false;
          this.$Message.error('信息填写不完整！');
        }
    },
    pageChange(value){
      this.pageNum = value;
      this.getPageDatas();
    },
    getPageDatas(){
      let data = {
        templateName:this.name,
        productName:this.productName,
        pageNum:this.pageNum,
        pageSize:this.pageSize
      }
      netWork('/priceTemplateDetail/findPriceTemplateDetailPage',data).then(res=>{
        if(res.data.code===200){
          this.pageNum = res.data.result.pageNum;
          this.total = res.data.result.total;
          this.datas = res.data.result.list;
          console.log(this.datas)
        }else if(res.data.code===500){
          this.$Message.error(res.data.message);
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    //查询所有渠道商商品信息
    getAllProductChannel(value){
      let data = {
        enable:'START',
        productName:value,
        pageNum:this.AllProductChannelPageNum,
        pageSize:this.AllProductChannelPageSize
      }
      netWork('/productChannel/findProductChannelPage',data).then(res=>{
        if(res.data.code===200){
          this.AllProductChannel = res.data.result.list;
          this.AllProductChannelTotal = res.data.result.total;
          this.AllProductChannelPageNum = res.data.result.pageNum;
        }else if(res.data.code===500){
          this.$Message.error(res.data.message);
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    //  查询所有渠道商商品信息 分页
    AllProductChannelPageChange(value){
      this.AllProductChannelPageNum = value;
      this.getAllProductChannel();
    },
    AllProductChannelHide(){  //隐藏点击商品的弹框
      this.showAllProductChannel =false;
    },
    //获取一行的信息
    AllProductChannelGetRow(row){
      console.log(row)
      this.formValidate.productId  = row.id;
      this.formValidate.productName = row.productName;
      this.formValidate.buyPrice  = row.buyPrice;
      this.formValidate.salePrice = row.salePrice;
    },
    //查询所有商品价格模版
    getTemplate(value){
      let data = {
        enable:true,
        templateName:value,
        pageNum:this.priceTemplatePageNum,
        pageSize:this.priceTemplatePageSize
      }
      netWork('/priceTemplate/findPriceTemplatePage',data).then(res=>{
        if(res.data.code===200){
          this.priceTemplatePageNum = res.data.result.pageNum;
          this.priceTemplatePageSize = res.data.result.total;
          this.priceTemplateDatas = res.data.result.list;
        }else if(res.data.code===500){
          this.$Message.error(res.data.message);
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    //  查询所有渠道商商品信息 分页
    TemplatePageChange(value){
      this.priceTemplatePageNum = value;
      this.getTemplate();
    },
    TemplateHide(){  //隐藏点击商品的弹框
      this.showPriceTemplate =false;
    },
    //获取一行的信息
    TemplateGetRow(row){
      console.log(row)
      this.formValidate.templateId  = row.id;
      this.formValidate.templateName = row.templateName;
    },
  },
  mounted () {
    this.getPageDatas();
    this.getAllProductChannel();
    this.getTemplate();
  }
}
</script>

<style lang="less" scoped>
  .commodityPriceDetails{
    .ivu-input-wrapper{
      width: 200px;
      margin-right:5px;
    }
    .ivu-select{
      width: 180px;
      margin-right:5px;
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
  }
</style>
