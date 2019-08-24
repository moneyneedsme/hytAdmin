<template>
  <div>
    <Coustom-tree></Coustom-tree>
    <div>
      <Input v-model="userName" placeholder="商户名称" clearable />
      <Button>查询</Button>
      <Button type="primary" icon="md-add-circle">新增</Button>
      <Button type="primary" icon="ios-trash">删除</Button>
      <Button type="primary" icon="ios-share-alt">导出</Button>
      <Table :columns="columns11" :data="dataTable" border height="700">
        <!-- 编辑按钮 -->
        <template slot-scope="{ row, index }" slot="edit">
          <Button
            type="primary"
            size="small"
            icon="md-create"
            style="margin-right: 5px"
            @click="show(index)"
          ></Button>
        </template>
        <!-- 状态按钮 -->
        <template slot="status" slot-scope="{ row, index }">
          <Button type="success" v-if="row.status==1" size="small" style="margin-right: 5px" @click="show(index)">正常</Button>
          <Button type="error" v-if="row.status==2" size="small" style="margin-right: 5px" @click="show(index)">锁定</Button>
        </template>
        <!-- 用户类型按钮 -->
        <template slot="type" slot-scope="{ row, index }">
          <div v-if="row.type==1">普通用户</div>
          <div v-if="row.type==2">管理员</div>
        </template>
      </Table>
      <Page :total="100" show-elevator />
    </div>
  </div>
</template>
<script>
import CoustomTree from "../components/coustom-tree";
import { userManagement } from "../../../api/data";
export default {
  components: {
    CoustomTree
  },
  name: "info",
  data() {
    return {
      pageNum: 1, // 页码
      pageSize: 10, // 页容量
      phone: "", // 联系方式
      userName: "", //用户名
      status: Number, //用户状态

      // tableLoading: false,
      // columnsConfig: {},
      // 数据结构
      columns11: [
        {
          title: "#",
          align: "center",
          type: "index",
          maxWidth: 60,
          tooltip: true
        },
        {
          title: "用户名",
          key: "userName",
          align: "center",
          // maxWidth: 100,
          tooltip: true
        },
        {
          title: "联系电话",
          key: "phone",
          align: "center",
          // maxWidth: 100,
          tooltip: true
        },
        {
          title: "用户类型",
          key: "type",
          align: "center",
          slot: "type",
          // maxWidth: 100,
          tooltip: true,
        },
        {
          title: "状态",
          align: "center",
          slot: "status",
          maxWidth: 100,
          tooltip: true
        },
        {
          title: "创建时间",
          key: "createDate",
          align: "center",
          // maxWidth: 100,
          tooltip: true
        },
        {
          title: "编辑",
          align: "center",
          slot: "edit",
          maxWidth: 80,
          tooltip: true
        }
      ],
      // 数据
      dataTable: []
    };
  },
  methods: {
    show(index) {
      alert(index);
    },

    // 获取用户信息
    getuserManagement() {
      userManagement({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        phone: this.phone,
        channelName: this.channelName,
        status: this.status
      }).then(backData => {
        console.log(backData);
        this.dataTable = backData.data.result.list;
      });
    }
  },
  created() {
    this.getuserManagement();
    // console.log(this.getuserManagement)
  },
  mounted() {
    // this.getuserManagement()
  }
};
</script>
<style lang="less" scoped>
.ivu-input-wrapper {
  width: 150px;
  margin-right: 5px;
}
.ivu-btn {
  margin-right: 10px;
}
.ivu-table-wrapper {
  margin-top: 20px;
}
.ivu-table-cell {
  padding-left: 0px;
  padding-right: 0px;
}
.ivu-page {
  text-align: center;
  margin-top: 10px;
}
</style>
