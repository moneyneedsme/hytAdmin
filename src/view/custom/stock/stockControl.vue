<template>
  <div class="stockControl">
    <!-- 权限树 -->
    <Coustom-tree></Coustom-tree>
    <!-- 右边内容 -->
    <div class="stockControlContent">
      <Input v-model="num" placeholder="商品编号" style="width: 196px" class="input" clearable />
      <Input v-model="num" placeholder="商户名称" style="width: 196px" class="input" clearable />
      <Select
        v-model="networkValue"
        placeholder="商品类型"
        style="width: 196px"
        class="input"
        clearable
      >
        <Option
          v-for="(item,index) in networkData"
          :value="item.value"
          :key="item.value+index"
        >{{ item.label }}</Option>
      </Select>
      <Button class="button" icon="ios-search">查询</Button>
      <Button type="primary" class="button" icon="md-add-circle" @click="modaladd = true">新增</Button>

      <!-- 表格 -->
      <Table
        class="stockControlTable"
        border
        ref="selection"
        :columns="columns4"
        :data="data1"
        height="700"
      >
        <!-- 删除按钮 -->
        <template slot-scope="{ row, index }" slot="delete">
          <Button type="error" icon="md-close" size="small" @click="modaldel = true"></Button>
        </template>
        <!-- 编辑按钮 -->
        <template slot-scope="{ row, index }" slot="edit">
          <Button type="primary" icon="md-create" size="small" @click="modaledit = true"></Button>
        </template>
        <template slot-scope="{ row, index }" slot="network">
          <span v-if="index%2==0">离线</span>
          <span v-else>在线</span>
        </template>
        <template slot-scope="{ row, index }" slot="status">
          <Button type="success" size="small" @click="show(index)" v-if="index%2==0">正常</Button>
          <Button type="error" size="small" @click="show(index)" v-else>禁用</Button>
        </template>
      </Table>

      <!-- 页码 -->
      <Page class="page" :total="100" show-elevator />
    </div>

    <!-- 删除弹框的模态框 -->
    <Modal v-model="modaldel" title="提示" @on-ok="ok" @on-cancel="cancel">
      <p>确定要删除当前【商品】？</p>
    </Modal>

    <!-- 编辑弹框的模态框 -->
    <Modal v-model="modaledit" title="修改【商品】" @on-ok="ok" @on-cancel="cancel">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="商品编号" prop="name">
          <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
        </FormItem>
        <FormItem label="商品名称" prop="name">
          <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
        </FormItem>
        <FormItem label="售卖价格" prop="name">
          <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
        </FormItem>
        <FormItem label="库存数量" prop="name">
          <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
        </FormItem>
        <FormItem label="商品类型" prop="name">
          <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
        </FormItem>
        <FormItem label="状态" prop="gender">
          <RadioGroup v-model="formValidate.gender">
            <Radio label="male">正常</Radio>
            <Radio label="female">禁用</Radio>
          </RadioGroup>
        </FormItem>

        <FormItem>
          <Button type="primary" @click="handleSubmit('formValidate')">确定</Button>
          <Button @click="handleReset('formValidate')" style="margin-left: 8px">返回</Button>
        </FormItem>
      </Form>
    </Modal>

    <!-- 新增弹框的模态框 -->
    <Modal v-model="modaladd" title="新增【商品】" @on-ok="ok" @on-cancel="cancel">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="商品编号" prop="name">
          <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
        </FormItem>
        <FormItem label="商品名称" prop="name">
          <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
        </FormItem>
        <FormItem label="售卖价格" prop="name">
          <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
        </FormItem>
        <FormItem label="库存数量" prop="name">
          <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
        </FormItem>
        <FormItem label="商品类型" prop="name">
          <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
        </FormItem>
        <FormItem label="状态" prop="gender">
          <RadioGroup v-model="formValidate.gender">
            <Radio label="male">正常</Radio>
            <Radio label="female">禁用</Radio>
          </RadioGroup>
        </FormItem>

        <FormItem>
          <Button type="primary" @click="handleSubmit('formValidate')">确定</Button>
          <Button @click="handleReset('formValidate')" style="margin-left: 8px">返回</Button>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import CoustomTree from "../components/coustom-tree";
import { log } from "util";
export default {
  components: {
    CoustomTree
  },
  name: "stockControl",
  data() {
    return {
      num: "",
      data1: [],
      networkValue: "",
      networkData: [],
      lineValue: "",
      lineData: [],
      pointValue: "",
      pointData: [],
      columns4: [
        {
          title: "#",
          align: "center",
          type: "index",
          maxWidth: 60,
          tooltip: true
        },
        {
          title: "删除",
          align: "center",
          slot: "delete",
          maxWidth: 70,
          tooltip: true
        },
        {
          title: "编辑",
          align: "center",
          slot: "edit",
          maxWidth: 70,
          tooltip: true
        },
        {
          title: "商品编号",
          key: "terminal",
          align: "center",
          minWidth: 70,
          tooltip: true
        },
        {
          title: "商品名称",
          key: "terminal",
          align: "center",
          minWidth: 70,
          tooltip: true
        },
        {
          title: "售卖价格",
          key: "number",
          align: "center",
          tooltip: true
        },
        {
          title: "库存数量",
          key: "number",
          align: "center",
          tooltip: true
        },
        {
          title: "商品类型",
          key: "terminal",
          align: "center",
          minWidth: 70,
          tooltip: true
        },

        {
          title: "状态",
          slot: "status",
          align: "center",
          maxWidth: 70,
          tooltip: true
        },
        {
          title: "上货时间",
          key: "line",
          align: "center",
          tooltip: true
        },
        {
          title: "更新时间",
          key: "updataDate",
          align: "center",
          minWidth: 25,
          tooltip: true
        }
      ],
      // 新增模态框显示方式
      modaladd: false,
      // 删除模态框显示方式
      modaldel: false,
      // 编辑模态框显示方式
      modaledit: false,
      // 表单数据
      formValidate: {
        name: "",
        mail: "",
        city: "",
        gender: "",
        interest: [],
        date: "",
        time: "",
        desc: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        mail: [
          {
            required: true,
            message: "Mailbox cannot be empty",
            trigger: "blur"
          },
          { type: "email", message: "Incorrect email format", trigger: "blur" }
        ],
        city: [
          {
            required: true,
            message: "Please select the city",
            trigger: "change"
          }
        ],
        gender: [
          { required: true, message: "Please select gender", trigger: "change" }
        ],
        interest: [
          {
            required: true,
            type: "array",
            min: 1,
            message: "Choose at least one hobby",
            trigger: "change"
          },
          {
            type: "array",
            max: 2,
            message: "Choose two hobbies at best",
            trigger: "change"
          }
        ],
        date: [
          {
            required: true,
            type: "date",
            message: "Please select the date",
            trigger: "change"
          }
        ],
        time: [
          {
            required: true,
            type: "string",
            message: "Please select time",
            trigger: "change"
          }
        ],
        desc: [
          {
            required: true,
            message: "Please enter a personal introduction",
            trigger: "blur"
          },
          {
            type: "string",
            min: 20,
            message: "Introduce no less than 20 words",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    show(index) {
      console.log(index % 2);
    },
    // 删除模态框点击事件
    ok() {
      this.$Message.info("Clicked ok");
    },
    cancel() {
      this.$Message.info("Clicked cancel");
    },
    // 表单事件
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  },
  mounted() {
    const data = {
      container: "0001",
      network: "云烟",
      number: 20081,
      terminal: "56b88a66d21b5c9a",
      pointName: "清河湾高尔夫 ",
      classification: "公园",
      line: "2019-09-09 10:19:58",
      updataDate: "2019-09-09 10:19:58"
    };
    this.data1 = Array(20).fill(data);
    const NData = {
      value: "离线",
      label: "离线"
    };
    this.networkData = Array(20).fill(NData);
    const LData = {
      value: "深圳朗科有限公司",
      label: "深圳朗科有限公司"
    };
    this.lineData = Array(20).fill(LData);
    const PData = {
      value: "机场",
      label: "机场"
    };
    this.pointData = Array(20).fill(PData);
  }
};
</script>

<style lang="less" scoped>
.stockControlContent {
  .input {
    margin-right: 15px;
  }
  .button {
    margin-right: 15px;
  }
  .stockControlTable {
    margin-top: 10px;
  }
  .page {
    margin: 20px 220px;
  }
}
</style>