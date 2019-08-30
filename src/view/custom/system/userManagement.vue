<template>
  <div>
    <!-- <Coustom-tree></Coustom-tree> -->
    <div>
      <Input
        v-model="userName"
        placeholder="商户名称"
        @keyup.enter.native="getuserManagement"
        clearable
      />
      <Button @click="getuserManagement">查询</Button>
      <Button type="primary" icon="md-add-circle" @click="addFormVisible = true">新增</Button>
      <Button type="primary" icon="ios-share-alt" @click="exportData">导出</Button>
      <Table :columns="columns11" :data="dataTable" border height="700" ref="table">
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
    <Modal v-model="addFormVisible" title="新增【用户】" @on-ok="getadduser('formValidate')" @on-cancel="cancel">
      <Form ref="formValidate" inline :model="formValidate" :label-width="120">
        <FormItem label="用户名" prop="userName">
          <Input v-model="formValidate.userName" placeholder="用户名"></Input>
        </FormItem>
        <FormItem label="密码" prop="password">
          <Input v-model="formValidate.password" placeholder="密码"></Input>
        </FormItem>
        <FormItem label="联系电话" prop="phone">
          <Input v-model="formValidate.phone" placeholder="联系电话"></Input>
        </FormItem>
        <FormItem label="邮箱" prop="email">
          <Input v-model="formValidate.email" placeholder="邮箱"></Input>
        </FormItem>
        <FormItem label="出生日期" prop="date">
          <DatePicker type="date" v-model="formValidate.date"></DatePicker>
        </FormItem>
        <FormItem label="性别" prop="sex">
          <Select v-model="formValidate.sex">
            <Option value="1">男</Option>
            <Option value="2">女</Option>
          </Select>
        </FormItem>
        <FormItem label="用户类型" prop="type">
          <Select v-model="formValidate.type">
            <Option value="1">普通用户</Option>
            <Option value="2">管理员</Option>
          </Select>
        </FormItem>
        <FormItem label="所属商户" prop="channelId">
          <Select v-model="formValidate.channelId">
            <Input search />
            <Option value="1">普通用户</Option>
            <Option value="2">管理员</Option>
          </Select>
        </FormItem>
        <FormItem label="所属部门" prop="deptId">
          <Select v-model="formValidate.deptId">
            <Input search />
            <Option value="1">环阳通</Option>
            <Option value="2">测试部</Option>
          </Select>
        </FormItem>
        <FormItem label="状态" prop="status">
          <RadioGroup v-model="formValidate.status">
            <Radio label="1">正常</Radio>
            <Radio label="2">锁定</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
    </Modal>

    <!-- 编辑弹框的模态框 -->
    <Modal v-model="editFormVisible" title="编辑【用户】" @on-ok="saveEdit" @on-cancel="cancel">
      <Form ref="formValidate" inline :model="editForm" :label-width="120">
        <FormItem label="用户名" prop="userName">
          <Input v-model="editForm.userName" placeholder="用户名"></Input>
        </FormItem>
        <FormItem label="密码" prop="password">
          <Input v-model="editForm.password" placeholder="密码"></Input>
        </FormItem>
        <FormItem label="联系电话" prop="phone">
          <Input v-model="editForm.phone" placeholder="联系电话"></Input>
        </FormItem>
        <FormItem label="邮箱" prop="email">
          <Input v-model="editForm.email" placeholder="邮箱"></Input>
        </FormItem>
        <FormItem label="出生日期" prop="date">
          <DatePicker type="date" v-model="editForm.date"></DatePicker>
        </FormItem>
        <FormItem label="性别" prop="sex">
          <Select v-model="editForm.sex">
            <Option value="1">男</Option>
            <Option value="2">女</Option>
          </Select>
        </FormItem>
        <FormItem label="用户类型" prop="type">
          <Select v-model="editForm.type">
            <Option value="1">普通用户</Option>
            <Option value="2">管理员</Option>
          </Select>
        </FormItem>
        <FormItem label="所属商户" prop="channelId">
          <Select v-model="editForm.channelId">
            <Input search />
            <Option value="1">普通用户</Option>
            <Option value="2">管理员</Option>
          </Select>
        </FormItem>
        <FormItem label="所属部门" prop="deptId">
          <Select v-model="editForm.deptId">
            <Input search />
            <Option value="1">环阳通</Option>
            <Option value="2">测试部</Option>
          </Select>
        </FormItem>
        <FormItem label="状态" prop="status">
          <RadioGroup v-model="editForm.status">
            <Radio label="1">正常</Radio>
            <Radio label="2">锁定</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import CoustomTree from "../components/coustom-tree";
import { userManagement, addUser, delUser, editUser } from "../../../api/data";
export default {
  components: {
    CoustomTree
  },
  name: "userManagement",

  data() {
    return {
      editFormVisible: false, //编辑模态框显示方式
      delFormVisible: false, //删除模态框显示方式
      addFormVisible: false, //新增模态框显示方式
      //新增模态框表单数据
      formValidate: {
        birth: "", //出生日期
        channelId: "", //渠道id
        deptId: "", //部门id
        email: "", //电子邮件
        image: "", //头像
        imageAddress: "", //头像地址
        name: "", //姓名
        operator: "", //操作人
        password: "", //密码
        phone: "", //手机
        remark: "", //备注
        sex: "", //性别
        status: "", //状态
        type: "", //类型
        userName: "" //用户
      },
      // 编辑模态框表单数据
      editForm: {
        birth: "", //出生日期channelId: "",
        deptId: "", //部门id
        email: "", //电子邮件
        id: "", //主键id
        image: "", //头像
        imageAddress: "", //头像地址
        name: "", //姓名
        operator: "", //操作人
        password: "", //密码
        phone: "", //手机
        remark: "", //备注
        sex: "", //性别
        status: "", //状态
        type: "", //类型
        userName: "" //用户
      },
      channelId: Number, //渠道ID
      pageNum: 1, // 页码
      pageSize: 10, // 页容量
      phone: "", // 联系方式
      userName: "", //用户名
      status: Number, //用户状态
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
          tooltip: true
        },
        {
          title: "所属部门",
          key: "deptName",
          align: "center",
          // maxWidth: 100,
          tooltip: true
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
      this.getuserManagement();
    },


    // 新增模态框的确认点击事件
    getadduser(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          //对的
          addUser(this.formValidate).then(backData => {
            console.log(backData);
            if (backData.data.code == 200) {
              // 关闭弹框
              this.addFormVisible = false;
              // 重新获取数据
              this.getuserManagement();
              this.$Message.info("新增成功");
              this.formValidate = {
                birth: "", //出生日期
                channelId: "", //渠道id
                deptId: "", //部门id
                email: "", //电子邮件
                image: "", //头像
                imageAddress: "", //头像地址
                name: "", //姓名
                operator: "", //操作人
                password: "", //密码
                phone: "", //手机
                remark: "", //备注
                sex: "", //性别
                status: "", //状态
                type: "", //类型
                userName: "" //用户
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
          delUser({ id: row.id }).then(backData => {
            console.log(backData);
            if (backData.data.code == 200) {
              this.getuserManagement();
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
      editUser(this.editForm).then(backData => {
        // console.log(backData);
        if (backData.data.code == 200) {
          this.$Message.info("修改成功");
          this.editFormVisible = false;
          this.getuserManagement();
        }
      });
    },

    cancel() {
      this.$Message.info("取消新增");
    },

    // 获取用户信息
    getuserManagement() {
      userManagement({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        phone: this.phone,
        userName: this.userName,
        status: this.status,
        channelId: this.channelId
      }).then(backData => {
        console.log(backData);
        this.dataTable = backData.data.result.list;
      });
    }
  },

  mounted() {
    this.getuserManagement();
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
