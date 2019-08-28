<template>
  <div>
    <Coustom-tree></Coustom-tree>
    <div>
      <Input v-model="mchName" placeholder="请输入商户名称" @keyup.enter.native="getAppSecret" clearable />
      <Button @click.native="getAppSecret">查询</Button>
      <Button type="primary" icon="md-add-circle" @click="addModal">新增</Button>
      <Button type="primary" icon="ios-share-alt">导出</Button>
      <Table :columns="columns" :data="dataTable" border height="700">
        <template slot-scope="scope" slot="operation">
          <!-- 编辑按钮 -->
          <Button
            type="primary"
            size="small"
            icon="md-create"
            style="margin-right: 5px"
            @click="editModal(scope.row)"
          ></Button>

          <!-- 删除按钮 -->
          <Button type="error" size="small" icon="ios-trash" @click="delOne(scope.row)"></Button>
        </template>
      </Table>
      <Page :total="100" show-elevator />
    </div>

    <!-- 弹框的模态框 -->
    <Modal
      v-model="isShow"
      :title="isAdd==true?'新增【商户】':'编辑【商户】'"
      @on-ok="getappSecretModal('formValidate')"
      @on-cancel="cancel"
    >
      <Form ref="formValidate" :model="formValidate" :label-width="120">
        <FormItem label="应用id" prop="appId">
          <Input v-model="formValidate.appId" placeholder="应用id"></Input>
        </FormItem>
        <FormItem label="秘钥" prop="appSecret">
          <Input v-model="formValidate.appSecret" placeholder="秘钥"></Input>
        </FormItem>
        <FormItem label="商户号" prop="mchId">
          <Input v-model="formValidate.mchId" placeholder="商户号"></Input>
        </FormItem>
        <FormItem label="商户名" prop="mchName">
          <Input v-model="formValidate.mchName" placeholder="商户名"></Input>
        </FormItem>
        <FormItem label="操作人" prop="operator">
          <Input v-model="formValidate.operator" placeholder="操作人"></Input>
        </FormItem>
        <FormItem label="备注" prop="remark">
          <Input v-model="formValidate.remark" placeholder="备注"></Input>
        </FormItem>
        <!-- <FormItem label="状态" prop="enable">
          <RadioGroup v-model="formValidate.enable">
            <Radio label="0">不启用</Radio>
            <Radio label="1">启用</Radio>
          </RadioGroup>
        </FormItem> -->
      </Form>
    </Modal>
  </div>
</template>
<script>
import CoustomTree from "../components/coustom-tree";
import {
  appSecret,
  addAppSecret,
  delAppSecret,
  editAppSecret
} from "../../../api/data";
export default {
  components: {
    CoustomTree
  },
  name: "appSecret",
  data() {
    return {
      delFormVisible: false, //删除模态框显示方式
      isShow: false, //弹框显示状态
      isAdd: false, //判断当前弹框是否新增
      //模态框表单数据
      formValidate: {
        appId: "", //应用id
        appSecret: "", // 秘钥
        enable: "", //是否启用
        mchId: "", //商户号
        mchName: "", //商户名
        operator: "", //操作人
        remark: "" //备注
      },
      appId: "", //应用id
      appSecret: "", // 秘钥
      enable: "", //是否启用
      mchId: "", //商户号
      mchName: "", //商户名
      pageNum: 1, //页码
      pageSize: 15, //页容量
      columns: [
        {
          title: "#",
          align: "center",
          type: "index",
          maxWidth: 60,
          tooltip: true
        },
        {
          title: "商户号",
          key: "mchId",
          align: "center",
          minWidth: 100,
          tooltip: true
        },
        {
          title: "商户名",
          key: "mchName",
          align: "center",
          // maxWidth: 100,
          tooltip: true
        },
        {
          title: "应用id",
          key: "appId",
          align: "center",
          minWidth: 50,
          tooltip: true
        },
        {
          title: "应用秘钥",
          key: "appSecret",
          align: "center",
          minWidth: 25,
          tooltip: true
        },
        {
          title: "创建时间",
          key: "createDate",
          align: "center",
          maxWidth: 120,
          tooltip: true
        },
        {
          title: "更新时间",
          key: "updateDate",
          align: "center",
          maxWidth: 120,
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
    getappSecretModal(name) {
      if (this.isAdd == true) {
        this.$refs[name].validate(valid => {
          if (valid) {
            console.log(33333);
            console.log(addappSecret);
            //对的
            addappSecret(this.formValidate).then(backData => {
              console.log(backData);
              if (backData.data.code == 200) {
                // 关闭弹框
                this.addFormVisible = false;
                console.log(123);
                // 重新获取数据
                this.getappSecret();
                this.$Message.info("新增成功");
                this.formValidate = {
                  appId: "", //应用id
                  appSecret: "", // 秘钥
                  enable: "", //是否启用
                  mchId: "", //商户号
                  mchName: "", //商户名
                  operator: "", //操作人
                  remark: "" //备注
                };
              }
            });
          } else {
            this.$Message.error("新增失败");
          }
        });
      } else if (this.isAdd == false) {
        console.log(11111);
        
        editappSecret(this.formValidate).then(backData => {
          console.log(backData);
          if (backData.data.code == 200) {
            this.$Message.info("修改成功");
            this.editFormVisible = false;
            this.getappSecret();
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
          delappSecret({ channelId: row.id }).then(backData => {
            console.log(backData);
            if (backData.data.code == 200) {
              this.getappSecret();
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
    getappSecret() {
      appSecret({
        appId: this.appId,
        appSecret: this.appSecret,
        enable: this.enable,
        mchId: this.mchId,
        mchName: this.mchName,
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
    this.getappSecret();
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
