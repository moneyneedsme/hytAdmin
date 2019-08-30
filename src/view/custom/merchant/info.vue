<template>
  <div>
    <Coustom-tree></Coustom-tree>
    <div>
      <Input v-model="channelName" placeholder="商户名称" @keyup.enter.native="getMerchant" clearable />
      <Button @click="getMerchant">查询</Button>
      <Button type="primary" icon="md-add-circle" @click="addModal">新增</Button>
      <Button type="primary" icon="md-build">绑定协议</Button>
      <Button type="primary" icon="ios-share-alt">导出</Button>
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
          <Button type="error" size="small"  @click="delOne(scope.row)">删除</Button>
        </template>
      </Table>
      <Page :total="100" show-elevator />
    </div>

    <!-- 弹框的模态框 -->
    <Modal
      v-model="isShow"
      :title="isAdd==true?'新增【商户】':'编辑【商户】'"
      @on-ok="getMerchantModal('formValidate')"
      @on-cancel="cancel"
    >
      <Form ref="formValidate" :model="formValidate" :label-width="120">
        <FormItem label="渠道名称" prop="channelName">
          <Input v-model="formValidate.channelName" placeholder="渠道名称"></Input>
        </FormItem>
        <FormItem label="父id" prop="pid">
          <Input v-model="formValidate.pid" placeholder="父id"></Input>
        </FormItem>
        <FormItem label="父ids" prop="pids">
          <Input v-model="formValidate.pids" placeholder="父ids"></Input>
        </FormItem>
        <FormItem label="操作人" prop="operator">
          <Input v-model="formValidate.operator" placeholder="操作人"></Input>
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
  merchant,
  addMerchant,
  delMerchant,
  editMerchant
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
        channelName: "", //渠道名称
        operator: "", //操作人
        pid: "", //父id
        pids: "", //父ids
        remark: "" //备注
      },
      channelName: "", //商户名称
      pageNum: 1, //页码
      pageSize: 10, //页容量
      columns: [
        {
          title: "#",
          align: "center",
          type: "index",
          maxWidth: 60,
          tooltip: true
        },
        {
          title: "商户名称",
          key: "channelName",
          align: "center",
          minWidth: 100,
          tooltip: true
        },
        {
          title: "联系人",
          key: "contacts",
          align: "center",
          maxWidth: 100,
          tooltip: true
        },
        {
          title: "联系电话",
          key: "phone",
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
          maxWidth: 120,
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
      //模态框表单数据
      this.formValidate= {
        channelName: "", //渠道名称
        operator: "", //操作人
        pid: "", //父id
        pids: "", //父ids
        remark: "" //备注
      }
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
    getMerchantModal(name) {
      if (this.isAdd == true) {
        this.$refs[name].validate(valid => {
          if (valid) {
            //对的
            addMerchant(this.formValidate).then(backData => {
              console.log(backData);
              if (backData.data.code == 200) {
                // 重新获取数据
                this.getMerchant();
                this.$Message.info("新增成功");
                this.formValidate = {
                  channelName: "", //渠道名称
                  operator: "", //操作人
                  pid: "", //父id
                  pids: "", //父ids
                  remark: "" //备注
                };
              }
            });
          } else if(backData.data.code == 500){
            this.$Message.error(backData.data.message);
          }
        });
      } else if (this.isAdd == false) {
        editMerchant(this.formValidate).then(backData => {
          // console.log(backData);
          if (backData.data.code == 200) {
            this.$Message.info("修改成功");
            this.getMerchant();
            this.formValidate = {
              channelName: "", //渠道名称
              operator: "", //操作人
              pid: "", //父id
              pids: "", //父ids
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
          delMerchant({ channelId: row.id }).then(backData => {
            console.log(backData);
            if (backData.data.code == 200) {
              this.getMerchant();
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
    getMerchant() {
      merchant({
        channelName: this.channelName,
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
    this.getMerchant();
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
