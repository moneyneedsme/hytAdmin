<template>
  <div class="clientManagement">
    <!-- 权限树 -->
    <Coustom-tree></Coustom-tree>

    <!-- 右边内容 -->
    <div class="clientManagementContent">
      <Input class="input" v-model="clientName"  placeholder="请输入用户名" style="width: 196px" clearable/>
      <Input class="input" v-model="clientPhone"  placeholder="请输入手机号码" style="width: 196px" clearable/>
      <Button type="primary" icon="ios-search">查询</Button>

      <!-- 表格 -->
      <div class="clientManagementTable">
        <Table height="600" border :columns="columns12" :data="data6">
          <template slot-scope="{ row }" slot="name">
            <strong>{{ row.name }}</strong>
          </template>
          <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" style="margin-right:5px"  width="200" @click="modal1 = true">积分明细</Button>
          </template>
        </Table>
      </div>

      <!-- 页码 -->
      <Page class="page" :total="100" show-elevator />

      <!-- 积分明细弹出框 -->
      <Modal v-model="modal1" width="600" title="积分明细" @on-ok="ok" @on-cancel="cancel">
        <Table height="300"  border :columns="columns1" :data="data1" ></Table>
      </Modal>
    </div>
  </div>
</template>

<script>
import CoustomTree from "../components/coustom-tree";
export default {
  components: {
    CoustomTree
  },
  name: "clientManagement",
  data() {
    return {
      clientName: "", // 用户名
      clientPhone: null, // 联系方式
      // 表格数据
      columns12: [
        {
          title: "用户名",
          slot: "name"
        },
        {
          title: "联系方式",
          key: "age"
        },
        {
          title: "身份证号码",
          key: "address"
        },
        {
          title: "交易次数",
          key: "address"
        },
        {
          title: "积分",
          key: "address"
        },
        {
          title: "操作",
          slot: "action",
          width: 120,
          align: "center"
        }
      ],
      data6: [
        {
          name: "John Brown",
          age: 18,
          address: 123456789456123123
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park"
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park"
        }
      ],
      // 弹出框显示方式
      modal1: false,
      // 积分明细弹出框表格数据
      columns1: [
        {
          title: "交易时间",
          key: "name",
          minWidth: 120
        },
        {
          title: "交易机型",
          key: "age",
          minWidth: 100
        },
        {
          title: "设备编号",
          key: "address",
          minWidth: 120
        },
        {
          title: "交易金额",
          key: "address",
          minWidth: 100
        },
        {
          title: "获取积分数",
          key: "address",
          minWidth: 100,
        }
        
      ],
      data1: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01"
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04",
          maxWidth: 60
        }
      ]
    };
  },
  methods: {
    ok() {
      this.$Message.info("Clicked ok");
    },
    cancel() {
      this.$Message.info("Clicked cancel");
    }
  }
};
</script>

<style lang="less" scoped>
  .clientManagementContent{
    .input {
      margin-right: 10px;
    }
    .clientManagementTable {
      margin-top: 10px;
    }
    .page {
      margin: 20px 220px;
    }
  }
</style>