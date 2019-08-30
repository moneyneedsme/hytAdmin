<template>
  <div>
    <!-- <Coustom-tree></Coustom-tree> -->
    <div>
      <Input v-model="deptName" placeholder="部门名称" @keyup.enter.native="getdepartment" clearable />
      <Input v-model="channelId" placeholder="渠道id" @keyup.enter.native="getdepartment" clearable />
      <Button @click="getdepartment">查询</Button>
      <Button type="primary" icon="md-add-circle" @click="addModal">新增</Button>
      <Table :columns="columns" :data="dataTable" row-key border height="700" ref="table">
        <!-- 操作 -->
        <template slot-scope="scope" slot="operation">
          <!-- 编辑按钮 -->
          <Button
            type="primary"
            size="small"
            style="margin-right: 5px"
            @click="editModal(scope.row)"
          >编辑</Button>
          <!-- 删除按钮 -->
          <Button type="error" size="small" @click="delOne(scope.row)">删除</Button>
        </template>
      </Table>
      <Page :total="1000" @on-change="handleCurrentChange" :current="pageNum" show-elevator />
    </div>

    <!-- 新增弹框的模态框 -->
    <Modal
      v-model="isShow"
      :title="isAdd==true?'新增【部门】':'编辑【部门】'"
      @on-ok="getDepartmentModal('formValidate')"
      @on-cancel="cancel"
    >
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
        <FormItem label="部门名称" prop="deptName">
          <Input v-model="formValidate.deptName" placeholder="部门名称"></Input>
        </FormItem>
        <FormItem label="上级部门" prop="pid ">
          <Input v-model="formValidate.pid " placeholder="上级部门"></Input>
        </FormItem>
        <FormItem label="排序号" prop="sort">
          <Input v-model="formValidate.sort" placeholder="排序号"></Input>
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
      delFormVisible: false, //删除模态框显示方式
      isShow: false, //弹框显示状态
      isAdd: false, //判断当前弹框是否新增
      //新增模态框表单数据
      formValidate: {
        deptName: "", //部门名称
        pid: "", //父ID
        sort: "" //排序
      },
      ruleValidate: {
        deptName: [
          {
            required: true,
            message: "输入不能为空",
            trigger: "blur"
          }
        ]
      },
      channelId: null, //渠道ID
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
          // maxWidth: 120,
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

    cancel() {
      this.$Message.info("取消新增");
      this.formValidate = {
        deptName: "", //部门名称
        pid: "", //父ID
        sort: "" //排序
      };
    },

    // 新增点击事件
    addModal() {
      this.isAdd = true;
      this.isShow = true;
    },

    // 编辑点击事件
    editModal(row) {
      this.isAdd = false;
      this.isShow = true;
      this.formValidate = row;
    },

    // 弹框确认的点击事件
    getDepartmentModal(name) {
      if (this.isAdd == true) {
        this.$refs[name].validate(valid => {
          if (valid) {
            //对的
            addDepartment(this.formValidate).then(backData => {
              console.log(backData);
              if (backData.data.code == 200) {
                // 重新获取数据
                this.getdepartment();
                this.$Message.info("新增成功");
                this.formValidate = {
                  deptName: "", //部门名称
                  pid: "", //父ID
                  sort: "" //排序
                };
              }
            });
          } else {
            this.$Message.error("新增失败");
          }
        });
      } else if (this.isAdd == false) {
        editDepartment(this.formValidate).then(backData => {
          // console.log(backData);
          if (backData.data.code == 200) {
            this.$Message.info("修改成功");
            this.getdepartment();
            this.formValidate = {
              deptName: "", //部门名称
              pid: "", //父ID
              sort: "" //排序
            };
          }
        });
      }
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
