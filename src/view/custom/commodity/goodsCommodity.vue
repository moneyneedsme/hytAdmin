<template>
	<div class="goodsCommodity">
      <div>
        <Input v-model="numID"  placeholder="商品编号" clearable/>
        <Input v-model="name"  placeholder="商品名称" clearable/>
        <Cascader :data="selectData" v-model="selectValue" @on-change="selectChange" v-if='selectData.length' ></Cascader>
        <Button @click='getPageDatas'>查询</Button>
        <Button  type="primary" @click='showNewlyAdded("xz")'>新增</Button>
        <Table border ref="selection" :columns="columns" :data="datas" height="700">
					<template slot-scope="{ row, index }"  slot="edit">
              <Button type="primary" size="small" class='marBtn' @click='showNewlyAdded("bj",index)'>编辑</Button>
              <Button type="error" size="small" @click="modalDel=true;delID=row.id;delIndex=index">删除</Button>
          </template>
					<template slot-scope="{ row}" slot="img">
              <img :src="row.imageAddress" >
          </template>
					<template slot-scope="{ row}" slot="status">
            <Button type="success" v-if='row.auditStatus==1'>待提交</Button>
            <span v-if='row.auditStatus==2'>待审核</span>
            <span v-if='row.auditStatus==3'>审核不通过</span>
            <span v-if='row.auditStatus==4'>审核通过</span>
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
      <Modal v-model="newlyAdded" width="600" :title="showNewlyType=='xz'?'新增基础商品':'编辑基础商品'" :loading='addedLoadding' :mask-closable='false'>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
          <FormItem label="商品名称" prop="productName">
            <Input v-model.trim="formValidate.productName" placeholder="请输入商品名称"></Input>
          </FormItem>
          <FormItem label="商品类型" prop="categoryId">
            <Cascader :data="selectData" v-model="formValidate.categoryId" @on-change="selectChange" v-if='selectData.length' ></Cascader>
            <!-- <Input v-model.trim="formValidate.categoryId" placeholder="Enter your name"></Input> -->
          </FormItem>
          <FormItem label="商品编码" prop="productCode">
            <Input v-model.trim="formValidate.productCode" placeholder="请输入商品编码"></Input>
          </FormItem>
          <FormItem label="进价" prop="buyPrice">
            <Input v-model.trim="formValidate.buyPrice" placeholder="请输入进价" ></Input>
          </FormItem>
          <FormItem label="进价上浮百分比" prop="buyPriceUpper">
            <InputNumber
            :max="100"
            v-model="Percentage"
            :formatter="value => `${value}%`"
            :parser="value => value.replace('%', '')"
            @on-change='PercentageChange'
            ></InputNumber>
          </FormItem>
          <FormItem label="售价" prop="salePrice">
            <Input v-model.trim="formValidate.salePrice" placeholder="请输入售价"></Input>
          </FormItem>
          <FormItem label="商品描述" prop="productDesc">
            <Input v-model.trim="formValidate.productDesc" placeholder="请输入商品描述"></Input>
          </FormItem>
          <FormItem label="上传图片" prop="imageAddress">
            <img  :src="formValidate.imageAddress" alt="" class='uploadImg' v-if='formValidate.imageAddress' >
            <template>
              <Upload 
                :show-upload-list='false'
                :action="Upload" name='multipartFile' 
                :format="['jpg','jpeg','png']"  
                :on-format-error = 'formtError'
                :on-error = 'onError'
                :on-success = 'imgSuccess'
              >
                  <Button icon="ios-cloud-upload-outline">上传图片</Button>
              </Upload>
            </template>
          </FormItem>
          <FormItem label="状态" prop="enable">
            <RadioGroup v-model="formValidate.enable">
              <Radio label="START">上架</Radio>
              <Radio label="STOP">下架</Radio>
            </RadioGroup>
          </FormItem>
        </Form>
         <div slot="footer">
          <Button type="text" size="large" @click='newlyAdded=false'>取消</Button>
          <Button type="primary" size="large" @click="Added(formValidate)">确定</Button>
         </div>
      </Modal>
  </div>
</template>
<script>
import {netWork,Upload} from '@/api/data'
import { setTimeout } from 'timers';
export default {
  components: {
  },
  name: 'goodsCommodity',
  data () {
    return {
      Upload, //上传文件地址
      Percentage:0,//浮动百分比
      categoryIdValue:[],
      showNewlyType:'xz',
      addedLoadding:true,
      formValidate:{ //新增字段
        productName: "", //商品名称
        categoryId: [],//商品类型
        productCode: "",//商品编码
        buyPrice: "",//进价
        buyPriceUpper:0,//进价上浮百分比
        salePrice: "",//售价
        productDesc:'',//商品描述
        enable:'START',
        imageAddress:null,
        image:null,
      },
      ruleValidate: {
        productName: [
          {
            required: true,
            message: "输入不能为空",
            trigger: "blur",
          }
        ],
        productCode: [
          {
            required: true,
            message: "输入不能为空",
            trigger: "blur",
          }
        ],
        categoryId: [
          {
            required: true,
          }
        ],
        buyPrice: [
          {
            required: true,
            message: "输入不能为空",
            trigger: "blur",
            // type:'number',
            // max:100
          }
        ],
        buyPriceUpper: [
          {
            required: true,
            message: "输入不能为空",
            trigger: "blur",
            type:'number',
          }
        ],
        salePrice: [
          {
            required: true,
            message: "输入不能为空",
            trigger: "blur",
          }
        ],
        productDesc: [
          {
            required: true,
            message: "输入不能为空",
            trigger: "blur"
          }
        ],
        imageAddress: [
          {
            required: true,
            message: "图片不能为空",
            trigger: "blur"
          }
        ],
      },
      newlyAdded:false,//新增按钮的弹框
      modal_loading:false,//删除的loading
      delID:null,//删除的ID
      delIndex:null,//删除的索引
      categoryId:null,//下拉框查询id
      modalDel:false,
      numID:'',
      name: '',
			selectValue:[],
      selectData:[],
      pageNum:1,
      total:null,
      pageSize:15,
			datas:[],
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
          minWidth:100,
          tooltip:true
        },
        {
          title: '商品类型',
          key: 'categoryName',
          align: 'center',
          minWidth:60,
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
    //文件上传
    formtError(file,fileList){
      console.log(file)
      console.log(fileList)
      this.$Message.error('上传文件类型错误');
    },
    onError(error){
      console.log(err)
      this.$Message.error('上传失败');
    },
    imgSuccess(response){
      if(response.code===200){
        this.$set(this.formValidate,'imageAddress',response.result.url)
        console.log(this.formValidate.imageAddress)
        this.formValidate.image = response.result.key;
        this.$Message.success('图片上传成功');
      }else if(response.code===500){
        this.$Message.error(response.message);
      }
      console.log(response);
    },
    PercentageChange(value){
      this.formValidate.buyPriceUpper = value;
    },
    showNewlyAdded(type,index){
      this.showNewlyType = type;
      this.uploadImgUrl = null;
      //初始化数据
      this.formValidate = { //新增字段  
        productName: "", //商品名称
        categoryId: [],//商品类型
        productCode: "",//商品编码
        buyPrice: "",//进价
        buyPriceUpper: "",//进价上浮百分比
        salePrice: "",//售价
        productDesc:'',//商品描述
        enable:'START',
      }
      this.categoryIdValue = [];
      if(type=='bj'){
        this.formValidate = this.datas[index];
        console.log(this.datas[index].categoryIds)
        let ary = [];
        if(this.datas[index].categoryIds){
          ary = this.datas[index].categoryIds.split(",")
          ary =ary.map(item=>{
            return parseInt(item)
          })
        }
        this.formValidate.categoryId = [...this.categoryIdValue,...ary,this.datas[index].categoryId]
        // this.formValidate.categoryId = [ 41, 43, 44 ]
        console.log(this.formValidate.categoryId)
      }
      this.newlyAdded=true
    },
    Added(value){
      if(value.buyPrice&&value.buyPriceUpper&&value.categoryId.length>0&&value.productCode&&value.productDesc&&value.productName&&value.salePrice&&value.imageAddress){
          let  { buyPrice ,buyPriceUpper,categoryId,productCode,productDesc,enable,productName,salePrice,auditStatus,imageAddress,image} =  value;
          if(this.showNewlyType=='xz'){
            let data = {
              buyPrice,
              buyPriceUpper,
              categoryId:categoryId[categoryId.length-1],
              productCode,
              productDesc,
              enable,
              productName,
              salePrice,
              imageAddress,
              image,
            }
            netWork('/product/productSave',data).then(res=>{
              if(res.data.code===200){
                if(res.data.result){
                  this.categoryId = null; //清除掉 筛选id
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
              buyPrice,
              buyPriceUpper,
              categoryId:categoryId[categoryId.length-1],
              productCode,
              productDesc,
              enable,
              productName,
              salePrice,
              auditStatus,
              imageAddress,
              image,
              id:value.id
            }
            netWork('/product/productModified',data).then(res=>{
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
    selectChange(value){
      this.categoryId = value[value.length-1];
    },
    del(){
      this.modal_loading = true;
      let url = '/product/productDelete?id='+this.delID
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
        productCode:this.numID,
        productName:this.name,
        categoryId:this.categoryId,
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
        this.$Message.error('网络连接失败或超时');
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
        this.$Message.error('网络连接失败或超时');
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
  .goodsCommodity{
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
  .uploadImg{
    width: 50px;
    height: 50px;
    border-radius: 2px;
    margin-right:10px;
    vertical-align: bottom;
  }
  .ivu-upload{
    display: inline-block;
    vertical-align: middle;
  }
</style>