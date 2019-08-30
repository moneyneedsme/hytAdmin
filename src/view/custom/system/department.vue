<template>
  <div>
    <!-- <Coustom-tree></Coustom-tree> -->
    <div>
      <Input v-model="deptName" placeholder="部门名称" @keyup.enter.native="getdepartment" clearable />
      <Button @click="getdepartment">查询</Button>
      <Button type="primary" icon="md-add-circle" @click="addFormVisible = true">新增</Button>
      <Table :columns="columns" :data="dataTable" row-key border height="700" ref="table">
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
      </Table>
      <Page :total="1000" @on-change="handleCurrentChange" :current="pageNum" show-elevator />
    </div>

    <!-- 新增弹框的模态框 -->
    <Modal
      v-model="addFormVisible"
      title="新增【部门】"
      @on-ok="getadddepartment('formValidate')"
      @on-cancel="cancel"
    >
      <Form ref="formValidate" :model="formValidate" :label-width="120">
        <FormItem label="部门名称" prop="deptName">
          <Input v-model="formValidate.deptName" placeholder="部门名称"></Input>
        </FormItem>
        <FormItem label="渠道id" prop="channelId ">
          <Input v-model="formValidate.channelId " placeholder="渠道id"></Input>
        </FormItem>
        <FormItem label="排序号" prop="sort">
          <Input v-model="formValidate.sort" placeholder="排序号"></Input>
        </FormItem>
      </Form>
    </Modal>

    <!-- 编辑弹框的模态框 -->
    <Modal v-model="editFormVisible" title="编辑【部门】" @on-ok="saveEdit" @on-cancel="cancel">
      <Form ref="formValidate" :model="editForm" :label-width="120">
        <FormItem label="部门名称" prop="deptName">
          <Input v-model="editForm.deptName" placeholder="部门名称"></Input>
        </FormItem>
        <FormItem label="渠道id" prop="channelId ">
          <Input v-model="editForm.channelId " placeholder="渠道id"></Input>
        </FormItem>
        <FormItem label="排序号" prop="sort">
          <Input v-model="editForm.sort" placeholder="排序号"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import CoustomTree from "../components/coustom-tree";
import {
  department,
  addDepartment,
  delDepartment,
  editDepartment
} from "../../../api/data";
export default {
  components: {
    CoustomTree
  },
  name: "department",
  data() {
    return {
      editFormVisible: false, //编辑模态框显示方式
      delFormVisible: false, //删除模态框显示方式
      addFormVisible: false, //新增模态框显示方式
      //编辑模态框表单数据
      editForm: {
        channelId: "", //渠道id
        deptName: "", //部门名称
        id: "", //主键id
        operator: "", //操作人
        pid: "", //父ID
        pids: "", //父IDS
        remark: "", //备注
        sort: "" //排序
      },
      //新增模态框表单数据
      formValidate: {
        channelId: "", //渠道id
        deptName: "", //部门名称
        operator: "", //操作人
        pid: "", //父ID
        pids: "", //父IDS
        remark: "", //备注
        sort: "" //排序
      },
      channelId: Number, //渠道ID
      deptName: "", //部门名称
      pageNum: 1, // 页码
      pageSize: 10, // 页容量
      // 数据结构
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center",
          function(selection, row) {
            console.log(selection, row);
          }
        },
        {
          title: "#",
          align: "center",
          type: "index",
          maxWidth: 60,
          tooltip: true
        },
        {
          title: "部门名称",
          key: "deptName",
          align: "center",
          // maxWidth: 100,
          tooltip: true
        },
        {
          title: "上级部门",
          key: "parentDeptName",
          align: "center",
          // maxWidth: 100,
          tooltip: true
        },
        {
          title: "排序号",
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
    show(row) {
      alert(row);
    },
    // 页码改变时触发
    handleCurrentChange(current) {
      // console.log(current);
      this.pageNum = current;
      // 重新获取数据
      this.getdepartment();
    },

    // 新增模态框的确认点击事件
    getadddepartment(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          //对的
          addDepartment(this.formValidate).then(backData => {
            console.log(this.formValidate);
            console.log(backData);
            if (backData.data.code == 200) {
              // 关闭弹框
              this.addFormVisible = false;
              // 重新获取数据
              this.getdepartment();
              this.$Message.info("新增成功");
              this.formValidate = {
                channelId: "", //渠道id
                deptName: "", //部门名称
                operator: "", //操作人
                pid: "", //父ID
                pids: "", //父IDS
                remark: "", //备注
                sort: "" //排序
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
          delDepartment({ id: row.id }).then(backData => {
            console.log(backData);
            if (backData.data.code == 200) {
              this.getdepartment();
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

    // // 编辑按钮操作
    enterEdit(row) {
      // 弹框
      this.editFormVisible = true;
      // console.log(row);
      this.editForm = row;
    },

    // 提交编辑
    saveEdit() {
      editDepartment(this.editForm).then(backData => {
        console.log(backData);
        if (backData.data.code == 200) {
          this.$Message.info("修改成功");
          this.editFormVisible = false;
          this.getdepartment();
        }
      });
    },

    cancel() {
      this.$Message.info("取消新增");
    },

    // 获取部门信息
    getdepartment() {
      department({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        deptName: this.deptName,
        channelId: this.channelId
      }).then(backData => {
        console.log(backData);
        if (backData.data.code == 200) {
          this.dataTable = backData.data.result.list;
        }
      });
    }
  },

  mounted() {
    this.getdepartment();
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
