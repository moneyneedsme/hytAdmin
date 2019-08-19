<template>
	<div class="payConfig">
    <Coustom-tree></Coustom-tree>
    <div class="paymentAllocation">
      <Card :title='cardTitle'>
        <Tabs type="card">
          <TabPane label="微信/支付宝">
            微信/支付宝
          </TabPane>
          <TabPane label="银联聚合支付">银联聚合支付</TabPane>
        </Tabs>
      </Card>
    </div>
  </div>
</template>
<script>
import CoustomTree from '../components/coustom-tree'
export default {
  components: {
    CoustomTree
  },
  name: 'payConfig',
  data () {
    return {
      cardTitle:'yj上海有限公司--商户收款配置'
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
.payConfig{
  overflow: hidden;
}
.paymentAllocation{
  padding-left:170px;
}
</style>
