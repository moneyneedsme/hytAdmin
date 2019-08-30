<template>
  <div>
    <!-- <Coustom-tree></Coustom-tree> -->
    <div>
      商户名称：<Input style="margin:0 15px" v-model="mchName" placeholder="请输入商户名称" @keyup.enter.native="getAppSecret" clearable />
      商户编号：<Input style="margin:0 15px" v-model="mchId" placeholder="请输入商户编号" @keyup.enter.native="getAppSecret" clearable />
      应用ID：<Input style="margin:0 15px" v-model="appId" placeholder="请输入应用ID" @keyup.enter.native="getAppSecret" clearable />
      商户秘钥：<Input style="margin:0 15px" v-model="appSecret" placeholder="请输入商户秘钥" @keyup.enter.native="getAppSecret" clearable />
      <Button @click="getAppSecret">查询</Button>
      <Button type="primary" icon="md-add-circle" @click="addModal">新增</Button>
      <Table :columns="columns" :data="dataTable" border height="700">
        <!-- 状态按钮 -->
        <template slot="enable" slot-scope="{ row, index }">
          <Button
            type="success"
            v-if="row.enable==1"
            size="small"
            style="margin-right: 5px"
            @click="show(index)"
          >启用</Button>
          <Button
            type="error"
            v-if="row.enable==0"
            size="small"
            style="margin-right: 5px"
            @click="show(index)"
          >不启用</Button>
        </template>
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
      :title="isAdd==true?'新增【商户秘钥】':'编辑【商户秘钥】'"
      @on-ok="getAppSecretModal('formValidate')"
      @on-cancel="cancel"
    >
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
        <FormItem label="商户号" prop="mchId">
          <Input v-model="formValidate.mchId" placeholder="商户号"></Input>
        </FormItem>
        <FormItem label="商 户名" prop="mchName">
          <Input v-model="formValidate.mchName" placeholder="商户名"></Input>
        </FormItem>
        <FormItem label="应用id" prop="appId">
          <Input v-model="formValidate.appId" placeholder="应用id"></Input>
        </FormItem>
        <FormItem label="商户秘钥" prop="appSecret">
          <Input v-model="formValidate.appSecret" placeholder="商户秘钥"></Input>
        </FormItem>
        <FormItem label="操作人" prop="operator">
          <Input v-model="formValidate.operator" placeholder="操作人"></Input>
        </FormItem>
        <FormItem label="备注" prop="remark">
          <Input v-model="formValidate.remark" placeholder="备注"></Input>
        </FormItem>
        <FormItem label="状态" prop="enable">
          <RadioGroup v-model="formValidate.enable">
            <Radio label="0">不启用</Radio>
            <Radio label="1">启用</Radio>
          </RadioGroup>
        </FormItem>
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
  name: "info",
  data() {
    return {
      delFormVisible: false, //删除模态框显示方式
      isShow: false, //弹框显示状态
      isAdd: false, //判断当前弹框是否新增
      //模态框表单数据
      formValidate: {
        appId: "", //应用id
        appSecret: "", //秘钥
        enable: "", //是否启用
        mchId: "", //商户号
        mchName: "", //商户名称
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
        appSecret: [
          {
            required: true,
            message: "输入不能为空",
            trigger: "blur"
          }
        ],
        mchId: [
          {
            required: true,
            message: "输入不能为空",
            trigger: "blur"
          }
        ],
        mchName: [
          {
            required: true,
            message: "输入不能为空",
            trigger: "blur"
          }
        ]

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
          title: "商户编号",
          key: "mchId",
          align: "center",
          minWidth: 100,
          tooltip: true
        },
        {
          title: "商户名称",
          key: "mchName",
          align: "center",
          minWidth: 100,
          tooltip: true
        },
        {
          title: "应用id",
          key: "appId",
          align: "center",
          minWidth: 100,
          tooltip: true
        },
        {
          title: "商户秘钥",
          key: "appSecret",
          align: "center",
          minWidth: 100,
          tooltip: true
        },
        {
          title: "状态",
          align: "center",
          slot: "enable",
          maxWidth: 100,
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
          Width: 200,
          tooltip: true
        }
      ],
      dataTable: [],
      List: [
        {
          value: "1",
          label: "正常"
        },
        {
          value: "0",
          label: "禁用"
        }
      ],
    };
  },
  methods: {
    show(index) {
      alert(index);
    },

    cancel() {
      this.$Message.info("取消操作");
      //模态框表单数据清空
      this.formValidate = {
        appId: "", //应用id
        appSecret: "", //秘钥
        enable: "", //是否启用
        mchId: "", //商户号
        mchName: "", //商户名称
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
    getAppSecretModal(name) {
      if (this.isAdd == true) {
        this.$refs[name].validate(valid => {
          if (valid) {
            //对的
            addAppSecret(this.formValidate).then(backData => {
              console.log(backData);
              if (backData.data.code == 200) {
                // 关闭弹框
                this.addFormVisible = false;
                // 重新获取数据
                this.getAppSecret();
                this.$Message.info("新增成功");
                this.formValidate = {
                  appId: "", //应用id
                  appSecret: "", //秘钥
                  enable: "", //是否启用
                  mchId: "", //商户号
                  mchName: "", //商户名称
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
        editAppSecret(this.formValidate).then(backData => {
          // console.log(backData);
          if (backData.data.code == 200) {
            this.$Message.info("修改成功");
            this.editFormVisible = false;
            this.getAppSecret();
            this.formValidate = {
              appId: "", //应用id
              appSecret: "", //秘钥
              enable: "", //是否启用
              mchId: "", //商户号
              mchName: "", //商户名称
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
          delAppSecret({ id: row.id }).then(backData => {
            console.log(backData);
            if (backData.data.code == 200) {
              this.getAppSecret();
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

    // 获取秘钥信息
    getAppSecret() {
      appSecret({
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
    this.getAppSecret();
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
