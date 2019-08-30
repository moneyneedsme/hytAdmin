<template>
  <div>
    <!-- <Coustom-tree></Coustom-tree> -->
    <div>
      应用id:
      <Input
        style="margin:0 15px"
        v-model="appId"
        placeholder="应用id"
        @keyup.enter.native="getAppManage"
        clearable
      />应用名称:
      <Input
        style="margin:0 15px"
        v-model="appName"
        placeholder="应用名称"
        @keyup.enter.native="getAppManage"
        clearable
      />应用描述:
      <Input
        style="margin:0 15px"
        v-model="appDesc"
        placeholder="应用描述"
        @keyup.enter.native="getAppManage"
        clearable
      />
      <Button @click="getAppManage">查询</Button>
      <Button type="primary" icon="md-add-circle" @click="addModal">新增</Button>
      <Table :columns="columns" :data="dataTable" border height="700">
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
      <Page :total="100" show-elevator />
    </div>

    <!-- 弹框的模态框 -->
    <Modal
      v-model="isShow"
      :title="isAdd==true?'新增【商户】':'编辑【商户】'"
      @on-ok="getAppManageModal('formValidate')"
      @on-cancel="cancel"
    >
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate"  :label-width="120">
        <FormItem label="应用名称" prop="appName">
          <Input v-model="formValidate.appName" placeholder="应用名称"></Input>
        </FormItem>
        <FormItem label="应用id" prop="appId">
          <Input v-model="formValidate.appId" placeholder="应用id"></Input>
        </FormItem>
        <FormItem label="应用描述" prop="appDesc">
          <Input v-model="formValidate.appDesc" placeholder="应用描述"></Input>
        </FormItem>
        <FormItem label="备注" prop="remark">
          <Input v-model="formValidate.remark" placeholder="备注"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import CoustomTree from "../components/coustom-tree";
import {
  appManage,
  addAppManage,
  delAppManage,
  editAppManage
} from "../../../api/data";
export default {
  components: {
    CoustomTree
  },
  name: "info",
  data() {
    return {
      delFormVisible: false, //删除模态框显示方式
      isShow: false, //弹框显示状态
      isAdd: false, //判断当前弹框是否新增
      //模态框表单数据
      formValidate: {
        appId: "", //应用id
        appDesc: "", // 应用描述
        appName: "", //应用名称
        operator: "", //操作人
        remark: "" //备注
      },
      ruleValidate: {
        appId: [
          {
            required: true,
            message: "输入不能为空",
            trigger: "blur"
          }
        ],
        appName: [
          {
            required: true,
            message: "输入不能为空",
            trigger: "blur"
          }
        ]
      },
      appId: "", //应用id
      appDesc: "", // 应用描述
      appName: "", //应用名称
      pageNum: 1, //页码
      pageSize: 15, //页容量
      columns: [
        {
          title: " ",
          align: "center",
          type: "index",
          maxWidth: 60,
          tooltip: true
        },
        {
          title: "应用名称",
          key: "appName",
          align: "center",
          minWidth: 100,
          tooltip: true
        },
        {
          title: "应用id",
          key: "appId",
          align: "center",
          maxWidth: 100,
          tooltip: true
        },
        {
          title: "应用描述",
          key: "appDesc",
          align: "center",
          minWidth: 50,
          tooltip: true
        },
        {
          title: "注册日期",
          key: "createDate",
          align: "center",
          minWidth: 25,
          tooltip: true
        },
        {
          title: "到期日期",
          key: "updateDate",
          align: "center",
          minWidth: 25,
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
      dataTable: []
    };
  },
  methods: {
    show(index) {
      alert(index);
    },

    cancel() {
      this.$Message.info("取消操作");
      this.formValidate = {
        appId: "", //应用id
        appDesc: "", // 应用描述
        appName: "", //应用名称
        operator: "", //操作人
        remark: "" //备注
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
    getAppManageModal(name) {
      if (this.isAdd == true) {
        this.$refs[name].validate(valid => {
          if (valid) {
            //对的
            addAppManage(this.formValidate).then(backData => {
              console.log(backData);
              if (backData.data.code == 200) {
                // 关闭弹框
                this.addFormVisible = false;
                // 重新获取数据
                this.getAppManage();
                this.$Message.info("新增成功");
                this.formValidate = {
                  appId: "", //应用id
                  appDesc: "", // 应用描述
                  appName: "", //应用名称
                  operator: "", //操作人
                  remark: "" //备注
                };
              }
            });
          } else if(backData.data.code == 500){
            this.$Message.error(backData.data.message);
          }
        });
      } else if (this.isAdd == false) {
        editAppManage(this.formValidate).then(backData => {
          // console.log(backData);
          if (backData.data.code == 200) {
            this.$Message.info("修改成功");
            this.editFormVisible = false;
            this.getAppManage();
            this.formValidate = {
              appId: "", //应用id
              appDesc: "", // 应用描述
              appName: "", //应用名称
              operator: "", //操作人
              remark: "" //备注
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
          delAppManage({ id: row.id }).then(backData => {
            console.log(backData);
            if (backData.data.code == 200) {
              this.getAppManage();
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

    // 获取商户信息
    getAppManage() {
      appManage({
        appId: this.appId,
        appDesc: this.appDesc,
        appName: this.appName,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(backData => {
        console.log(backData);
        if (backData.data.code == 200) {
          this.dataTable = backData.data.result.list;
        }
      });
    }
  },
  mounted() {
    this.getAppManage();
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
