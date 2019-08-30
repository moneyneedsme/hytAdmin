<template>
  <div class='purview'>
    <Card style="100%" bordered>
      <div class="headContainer">
        <Button type="primary" icon="ios-add" @click='showAddModal("zjd")'>添加子节点</Button>
        <Button icon="ios-add" @click='showAddModal("fjd")'>添加顶部菜单</Button>
        <Button icon="ios-trash" @click='modalDel=true'>删除节点</Button>
      </div>
      <div class="leftContainer">
        <Alert show-icon>当前选择编辑：{{rowDataName}}</Alert>
        <Coustom-tree 
          :treeData='treeData'
          @pickTree = 'pickTree'
        >
        </Coustom-tree>
      </div>
      <div class="rightContainer">
        <router-form :formValidate='formValidate'></router-form>
        <Button type="primary" icon="ios-create-outline" class="sure" @click='sure(formValidate)'>保存并修改</Button>
      </div>
      <Modal v-model="showModal" width="600" :title="showType=='zjd'?'新增子节点':'新增顶部菜单'" :loading='addedLoadding' :mask-closable='false'>
        <router-form :formValidate='newFormValidate'></router-form> 
        <div slot="footer">
          <Button type="text" size="large" @click='showModal=false'>取消</Button>
          <Button type="primary" size="large" @click="Added(newFormValidate)">确定</Button>
         </div>
      </Modal>
    </Card>
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
import routerForm from '../components/routerForm';
import {netWorkHttp} from '@/api/data';
export default {
  components: {
    CoustomTree,
    routerForm
  },
  name:"purview",
  data(){
    return{
      modal_loading:false,//删除的loading
      modalDel:false,
      addedLoadding:false,
      newFormValidate:{ //新增字段
        name:null,//名称
        path:null,//路径
        title:null, //路由名称
        icon:null,//图标
        component: null,//前端组件
        type:'1',//类型
        backend:'2',//功能类型
      },
      showType:'zjd',
      showModal:false,
      treeID:null,
      treeData:null, //树形数据
      rowData:{}, //某一行的数据
      rowDataName:null,
      formValidate:{ //新增字段
        name:null,//名称
        path:null,//路径
        title:null, //路由名称
        icon:null,//图标
        component: null,//前端组件
        type:'1',//类型
        backend:'2',//功能类型
      },
    }
  },
  methods:{
    del(){
      let url = '/permission/deletePermission?permissionId='+this.treeID;
      netWorkHttp(url,null,'delete').then(res=>{
        if(res.data.code===200){
          this.getTreeData();//刷新页面
          this.treeID = null;
          this.modal_loading = false;
          this.modalDel = false;
          this.$Message.success('删除成功');
        }else if(res.data.code===500){
          this.treeID = null;
          this.modal_loading = false;
          this.$Message.error(res.data.message);
        }
      }).catch(err=>{
        this.modal_loading = false;
        this.$Message.error('网络连接失败或超时');
      })
    },
    Added(value){
      if(value.title&&value.path&&value.name&&value.icon&&value.component){
        let {title,path,name,icon,component,backend,type} = value;
        let data;
        if(this.showType==='fjd'){
          data = {
            pid:-1,
            title,
            path,
            name,
            icon,
            component,
            backend,
            type
          }
          
        }else if(this.showType==='zjd'){
          data = {
            pid:this.rowData.id,
            pids:this.rowData.parentId==-1?this.rowData.id:this.rowData.id+','+this.rowData.parentId,
            title,
            path,
            name,
            icon,
            component,
            backend,
            type
          }
        }
        netWorkHttp('/permission/addPermission',data).then(res=>{
          if(res.data.code===200){
            this.getTreeData();//刷新页面
            this.rowData = null;
            this.newFormValidate = { //新增字段
              name:null,//名称
              path:null,//路径
              title:null, //路由名称
              icon:null,//图标
              component: null,//前端组件
              type:'1',//类型
              backend:'2',//功能类型
            }
            this.addedLoadding = false;
            this.showModal = false;
            this.$Message.success('添加成功');
          }else if(res.data.code===500){
            this.rowData = null;
            this.showModal = true;
            this.addedLoadding = false;
            this.$Message.error(res.data.message);
          }
        }).catch(err=>{
          this.showModal = true;
          this.addedLoadding = false;
          this.$Message.error('网络连接失败或超时');
        })
      }else{
        this.$Message.error('信息填写不完整！');
      }
    },
    showAddModal(type){
      this.showType = type;
      console.log(this.showType)
      if(type==='zjd'){
        if(!this.treeID){
          this.$Message.error('请先点击选择要修改的菜单节点');
          return false;
        }
        this.showModal = true;
      }else if(type==='fjd'){
        this.showModal = true;
      }
    },
    //保存并修改
    sure(value){
      if(!this.treeID){
        this.$Message.error('请先点击选择要修改的菜单节点');
        return false;
      } 
      if(value.title&&value.path&&value.name&&value.icon&&value.component){
        let {title,path,name,icon,component} = value;
        let data = {
          id:this.treeID,
          title,
          path,
          name,
          icon,
          component
        }
        netWorkHttp('/permission/modifyPermission',data).then(res=>{
          if(res.data.code===200){
            this.getTreeData();
            this.rowDataName = data.title;
            this.formValidate = { //新增字段
            name:null,//名称
            path:null,//路径
            title:null, //路由名称
            icon:null,//图标
            component: null,//前端组件
            type:'1',//类型
            backend:'2',//功能类型
          },
            this.$Message.success('修改成功');
          }else if(res.data.code===500){
            this.$Message.error(res.data.message);
          }
        }).catch(err=>{
          this.$Message.error('网络连接失败或超时');
        })
      }else{
        this.$Message.error('信息填写不完整！');
      }
    },
    pickTree(data){
      console.log(data)
      if(data){
        this.rowDataName = data.name;
        this.rowData = data;
        this.formValidate = data;
        console.log(this.formValidate.type)
        this.formValidate.type = this.formValidate.type.toString();
        this.formValidate.backend = this.formValidate.backend.toString();
        this.formValidate.title = data.meta.title;
        this.formValidate.icon = data.meta.icon;
        this.treeID = data.id;
      }else{
        this.rowDataName = null;
        this.rowData = null;
        this.formValidate = { //新增字段
          name:null,//名称
          path:null,//路径
          title:null, //路由名称
          icon:null,//图标
          component: null,//前端组件
          type:'1',//类型
          backend:'2',//功能类型
        };
        this.treeID = null;
      }
    },
    //获取树的数据
    getTreeData(){
      let data = {
        channelId:1,
        permissionType:1,
        userType:2
      }
      netWorkHttp('/permission/queryUserMenu',data).then(res=>{
        console.log(res.data)
        if(res.data.code===200){
          this.treeData = res.data.result;
        }else if(res.data.code===500){
          this.$Message.error(res.data.message);
        }
      }).catch(err=>{
        this.$Message.error('网络连接失败或超时');
      })
    }
  },
  created(){
    this.getTreeData();
  },
}
</script>

<style scoped lang='less'>
  .purview{
    /deep/ .ivu-card-body{
      overflow: hidden;
    }
    .ivu-alert.ivu-alert-with-icon{
      padding: 8px 0px 8px 30px;
    }
    .leftContainer{
      float: left;
      overflow: hidden;
      min-width: 210px;
      width: 30%;
      max-width: 320px;
      min-height: 500px;
      margin-right: 30px;
    }
    .headContainer{
      margin-bottom: 20px;
      .ivu-btn{
        margin-right: 10px;
      }
    }
    .rightContainer{
      overflow: hidden;
      max-width:400px;
      min-width: 400px;
    }
    .sure{
      margin: 20px auto;
      display: block;
    }
  }
  
</style>