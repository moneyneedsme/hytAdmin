<template>
	<div class='commodityPrice'>
      <Coustom-tree></Coustom-tree>
      <div>
        <Input v-model="name"  placeholder="分类名称" clearable/>
        <Select v-model="conditionValue">
            <Option v-for="item in conditionList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Button @click='getPageDatas'>查询</Button>
        <Button  type="primary" @click='showNewlyAdded("xz")'>新增</Button>
				<!-- <Button  type="primary">删除</Button>
				<Button  type="primary">导出</Button> -->
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
      <Modal v-model="newlyAdded" width="600" :title="showNewlyType=='xz'?'新增商品类型':'编辑商品类型'" :loading='addedLoadding' :mask-closable='false'>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
          <FormItem label="分类名称" prop="categoryName">
            <Input v-model.trim="formValidate.categoryName" placeholder="请输入分类名称"></Input>
          </FormItem>
          <FormItem label="父id">
            <Cascader :data="selectData" v-model="formValidate.pid" v-if='selectData.length' change-on-select :disabled='showNewlyType=="bj"'></Cascader>
          </FormItem>
          <FormItem label="备注">
            <Input v-model.trim="formValidate.remark" placeholder="请输入备注"></Input>
          </FormItem>
          <FormItem label="分类类型" prop="categoryType">
            <RadioGroup v-model="formValidate.categoryType">
              <Radio label="PATH">路径</Radio>
              <Radio label="CLASSIFY">分类</Radio>
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
import CoustomTree from '../components/coustom-tree';
import {netWork} from '@/api/data'
export default {
  components: {
    CoustomTree
  },
  name: 'commodityPrice',
  data () {
    return {
      conditionValue:null,
      conditionList:[
        {
          value:'PATH',
          label:'路径',
        },
        {
          value:'CLASSIFY',
          label:'分类',
        }
      ],
      modalDel:false,
      modal_loading:false,//删除的loading
      delID:null,//删除的ID
      delIndex:null,//删除的索引
      pIdValue:[],
      showNewlyType:'xz',
      addedLoadding:true,
      newlyAdded:false,//新增按钮的弹框
      formValidate:{ //新增字段
        categoryName: null, //分类名称
        pid:[],//父id
        remark: null,//备注
        categoryType: 'PATH',//分类类型
      },
      ruleValidate: {
        categoryName: [
          {
            required: true,
            message: "输入不能为空",
            trigger: "blur",
          }
        ]
      },
      selectData:[],
      pageNum:1, //当前页数
      total:null,//总条数
      pageSize:15,//每页条数
      name: null,
      datas: [],
      columns: [
        {
          title: '分类名称',
          key: 'categoryName',
          align: 'center',
          tooltip:true
        },
        {
          title: '分类类型',
          key: 'categoryType',
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
      let url = '/category/categoryDelete?id='+this.delID
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
      this.formValidate = { //新增字段
        categoryName: "", //分类名称
        pid:[],//父id
        remark: "",//备注
        categoryType: 'PATH',//分类类型
      };
      this.pIdValue = [];
      if(type=='bj'){
        this.formValidate = this.datas[index];
        console.log(this.datas[index])
        let ary =[];
        if(this.datas[index].pids){
          ary = this.datas[index].pids.split(",");
        }
        console.log(ary)
        ary =ary.map(item=>{
          return parseInt(item)
        })
        this.formValidate.pid = [...this.pIdValue,...ary,this.datas[index].pid]
      }
      this.newlyAdded=true
    },
    Added(value){
      if(value.categoryName){
          let  { categoryName,pid,remark,categoryType} =  value;
          if(this.showNewlyType=='xz'){
            let data = {
              categoryName,
              pid:pid[pid.length-1],
              remark,
              categoryType
            }
            netWork('/category/categorySave',data).then(res=>{
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
              this.newlyAdded = true;
              this.addedLoadding = false;
            })
          }else if(this.showNewlyType=='bj'){
            let data = {
              categoryName,
              // pid:pid[pid.length-1],
              remark,
              categoryType,
              id:value.id
            }
            netWork('/category/categoryModified',data).then(res=>{
              if(res.data.code===200){
                if(res.data.result){
                  // this.categoryId = null; //清除掉 筛选id
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
    getSelectData(){
      netWork('/category/findCategoryTree').then(res=>{
        // console.log(res.data)
        if(res.data.code===200){
          this.selectData = res.data.result;
        }else if(res.data.code===500){
          this.$Message.error(res.data.message);
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    pageChange(value){
      this.pageNum = value;
      this.getPageDatas();
    },
    getPageDatas(){
      let data = {
        categoryName:this.name,
        categoryType:this.conditionValue,
        pageNum:this.pageNum,
        pageSize:this.pageSize
      }
      netWork('/category/findCategoryPage',data).then(res=>{
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
  },
  mounted () {
    this.getPageDatas();
    this.getSelectData();
  }
}
</script>

<style lang="less" scoped>
  .commodityPrice{
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
