<template>
  <div>
    <Coustom-tree></Coustom-tree>
    <div>
      <Input v-model="channelName" placeholder="商户名称" clearable />
      <Input v-model="contacts" placeholder="联系人" />
      <Input v-model="phone" placeholder="联系电话" />
      <Button @click="searchMerchantInfo">查询</Button>
      <Button type="primary" icon="md-add-circle">新增</Button>
      <Button type="primary" icon="md-build">绑定协议</Button>
      <Button type="primary" icon="ios-share-alt">导出</Button>
      <Table :columns="columns11" :data="dataTable" border height="700" :loading="tableLoading">
        <template slot-scope="{ row, index }" slot="edit">
          <Button
            type="primary"
            size="small"
            icon="md-create"
            style="margin-right: 5px"
            @click="show(index)"
          ></Button>
        </template>
      </Table>
      <Page :total="100" show-elevator />
    </div>
  </div>
</template>
<script>
import CoustomTree from "../components/coustom-tree";
// import {getMerchantInfo} from "../../../api/data";
export default {
  components: {
    CoustomTree
  },
  name: "info",
  data() {
    return {
      tableLoading: false,
      columnsConfig: {},
      channelName: "",//商户名称
      phone: "",//联系方式
      contacts: "",//联系人
      columns11: [
        {
          title: "#",
          align: "center",
          type: "index",
          maxWidth: 60,
          tooltip: true
        },
        {
          title: "编辑",
          align: "center",
          slot: "edit",
          maxWidth: 80,
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
          title: "可用余额",
          key: "balance",
          align: "center",
          maxWidth: 100,
          tooltip: true
        },
        {
          title: "可结算金额",
          key: "amount",
          align: "center",
          maxWidth: 100,
          tooltip: true
        },
        {
          title: "已结算金额",
          key: "settled",
          align: "center",
          maxWidth: 100,
          tooltip: true
        },
        {
          title: "收款模式",
          key: "paymentModel",
          align: "center",
          maxWidth: 100,
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
          key: "regdate",
          align: "center",
          minWidth: 25,
          tooltip: true
        },
        {
          title: "到期日期",
          key: "dueDate",
          align: "center",
          minWidth: 25,
          tooltip: true
        }
      ],
      dataTable: [],
      dataOne:{}
    };
  },
  methods: {
    show(index) {
      alert(index);
    },

    // 获取商户信息
    // searchMerchantInfo(){
    //   getMerchantInfo(1).then(backData=>{
    //     console.log(backData);
    //     if(backData.data.code==200){
    //       this.dataOne= backData.data.result
    //     }
    //     else{
    //       this.$Message.error(backData.data.message);
    //     } 
    //   })
    // }
  },
  mounted() {
    
    // const data = {
    //   channelName: "广东省深圳市龙华区广东省深圳市龙华区",
    //   balance: 40000,
    //   amount: 6000,
    //   settled: 99000,
    //   paymentModel: "支付宝",
    //   contacts: "王小7",
    //   phone: "15668889785",
    //   regdate: "2019-8-17",
    //   dueDate: "2020-8-17"
    // };
    // this.dataTable = Array(20).fill(data);
    // this.searchMerchantInfo()
    this.dataTable = Array(20).fill(this.dataOne);

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
