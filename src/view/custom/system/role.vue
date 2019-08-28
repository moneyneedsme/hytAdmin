<template>
  <div>
    <Coustom-tree></Coustom-tree>
    <div>
      <Input v-model="roleName" placeholder="角色名称" @keyup.enter.native="getRole" clearable />
      <Button @click="getRole">查询</Button>
      <Button type="primary" icon="md-add-circle" @click="addFormVisible = true">新增</Button>
      <Button type="primary" icon="ios-share-alt" @click="exportData">导出</Button>
      <Table :columns="columns" :data="dataTable" border height="700" ref="table">
        <!-- 操作 -->
        <template slot-scope="scope" slot="operation">
          <!-- 编辑按钮 -->
          <Button
            type="primary"
            size="small"
            icon="md-create"
            style="margin-right: 5px"
            @click="enterEdit(scope.row)"
          ></Button>
          <!-- 删除按钮 -->
          <Button type="error" size="small" icon="ios-trash" @click="delOne(scope.row)"></Button>
        </template>

        <!-- 状态按钮 -->
        <template slot="status" slot-scope="{ row, index }">
          <Button
            type="success"
            v-if="row.status==1"
            size="small"
            style="margin-right: 5px"
            @click="show(index)"
          >正常</Button>
          <Button
            type="error"
            v-if="row.status==2"
            size="small"
            style="margin-right: 5px"
            @click="show(index)"
          >锁定</Button>
        </template>

        <!-- 用户类型按钮 -->
        <template slot="type" slot-scope="{ row, index }">
          <div v-if="row.type==1">普通用户</div>
          <div v-if="row.type==2">管理员</div>
        </template>
      </Table>
      <Page :total="1000" @on-change="handleCurrentChange" :current="pageNum" show-elevator />
    </div>

    <!-- 新增弹框的模态框 -->
    <Modal
      v-model="addFormVisible"
      title="新增【用户】"
      @on-ok="getadduser('formValidate')"
      @on-cancel="cancel"
    >
      <Form ref="formValidate" inline :model="formValidate" :label-width="120">
        <FormItem label="角色名称" prop="roleName">
          <Input v-model="formValidate.roleName" placeholder="角色名称"></Input>
        </FormItem>
        <FormItem label="角色" prop="role">
          <Input v-model="formValidate.role" placeholder="role格式请以ROLE_开头"></Input>
        </FormItem>
        <FormItem label="渠道id" prop="channelId">
          <Input v-model="formValidate.channelId" placeholder="渠道id"></Input>
        </FormItem>
      </Form>
    </Modal>

    <!-- 编辑弹框的模态框 -->
    <Modal v-model="editFormVisible" title="编辑【角色】" @on-ok="saveEdit" @on-cancel="cancel">
      <Form ref="formValidate" inline :model="editForm" :label-width="120">
        <FormItem label="角色名称" prop="roleName">
          <Input v-model="editForm.roleName" placeholder="角色名称"></Input>
        </FormItem>
        <FormItem label="角色" prop="role">
          <Input v-model="editForm.role" placeholder="role格式请以ROLE_开头"></Input>
        </FormItem>
        <FormItem label="渠道id" prop="channelId">
          <Input v-model="editForm.channelId" placeholder="渠道id"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import CoustomTree from "../components/coustom-tree";
import { role, addRole, delRole, editRole } from "../../../api/data";
export default {
  components: {
    CoustomTree
  },
  name: "role",

  data() {
    return {
      editFormVisible: false, //编辑模态框显示方式
      delFormVisible: false, //删除模态框显示方式
      addFormVisible: false, //新增模态框显示方式
      //新增模态框表单数据
      formValidate: {
        channelId: "", //渠道id
        createDate: "", //创建时间
        operator: "", //操作人
        remark: "", //备注
        role: "", //角色
        roleName: "", //角色名称
        updateDate: "" //修改时间
      },
      // 新增模态框表单规则
      ruleValidate: {
        role: [
          {
            required: true,
            message: "role格式必须以ROLE_开头",
            trigger: "blur"
          }
        ]
      },
      // 编辑模态框表单数据
      editForm: {
        channelId: "", //渠道id
        id: "", //主键id
        operator: "", //操作人
        remark: "", //备注
        role: "", //角色
        roleName: "", //角色名称
      },
      channelId: 1, //渠道ID
      pageNum: 1, // 页码
      pageSize: 10, // 页容量
      roleName: "", //角色名称
      // 数据结构
      columns: [
        {
          title: "#",
          align: "center",
          type: "index",
          maxWidth: 60,
          tooltip: true
        },
        {
          title: "角色名称",
          key: "roleName",
          align: "center",
          // maxWidth: 100,
          tooltip: true
        },
        {
          title: "角色",
          key: "role",
          align: "center",
          // maxWidth: 100,
          tooltip: true
        },
        {
          title: "所属部门",
          key: "channelId",
          align: "center",
          // maxWidth: 100,
          tooltip: true
        },
        {
          title: "备注",
          key: "remark",
          align: "center",
          // maxWidth: 100,
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
          title: "更新时间",
          key: "updateDate",
          align: "center",
          // maxWidth: 100,
          tooltip: true
        },
        {
          title: "操作",
          align: "center",
          slot: "operation",
          maxWidth: 120,
          tooltip: true
        }
      ],
      // 数据
      dataTable: []
    };
  },
  methods: {
    // 导出表格方法
    exportData(type) {
      this.$refs.table.exportCsv({
        filename: "用户明细"
      });
    },

    show(row) {
      alert(row);
    },

    // 页码改变时触发
    handleCurrentChange(current) {
      // console.log(current);
      this.pageNum = current;
      // 重新获取数据
      this.getRole();
    },

    // 新增模态框的确认点击事件
    getadduser(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          //对的
          addRole(this.formValidate).then(backData => {
            console.log(backData);
            if (backData.data.code == 200) {
              // 关闭弹框
              this.addFormVisible = false;
              // 重新获取数据
              this.getRole();
              this.$Message.info("新增成功");
              this.formValidate = {
                channelId: "", //渠道id
                createDate: "", //创建时间
                operator: "", //操作人
                remark: "", //备注
                role: "", //角色
                roleName: "", //角色名称
                updateDate: "" //修改时间
              };
            }
          });
        } else {
          this.$Message.error("新增失败");
        }
      });
    },

    // 删除按钮操作
    delOne(row) {
      // 显示模态框
      this.delFormVisible = true;
      console.log(row);
      this.$Modal.confirm({
        title: "此操作将永久删除该用户, 是否继续?",
        // 点击了确定
        onOk: () => {
          delRole({ roleId: row.id }).then(backData => {
            console.log(backData);
            if (backData.data.code == 200) {
              this.getRole();
              this.$Message.info("删除成功");
            }
          });
        },
        // 点击了取消
        onCancel: () => {
          this.$Message.info("取消删除");
        }
      });
    },

    // 编辑按钮操作
    enterEdit(row) {
      // 弹框
      this.editFormVisible = true;
      // console.log(row);
      this.editForm = row;
    },

    // 提交编辑
    saveEdit() {
      editRole(this.editForm).then(backData => {
        // console.log(backData);
        if (backData.data.code == 200) {
          this.$Message.info("修改成功");
          this.editFormVisible = false;
          this.getRole();
        }
      });
    },

    cancel() {
      this.$Message.info("取消新增");
    },

    // 获取用户信息
    getRole() {
      role({
        channelId: this.channelId,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        roleName: this.roleName
      }).then(backData => {
        console.log(backData);
        if(backData.data.code==200){
          this.dataTable = backData.data.result.list;
        }
      });
    }
  },

  mounted() {
    this.getRole();
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
