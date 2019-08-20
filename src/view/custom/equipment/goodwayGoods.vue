<template>
	<div>
		<div>
			<Table border ref="selection" :columns="columns4" :data="data1" height="700">
					<template slot-scope="{ row, index }" slot="container">
            <Button type="error" size="small" @click="show(index)" :disabled='index%2==0'>发布</Button>
          </template>
          <template slot-scope="{ row, index }" slot="network">
            <span v-if='index%2==0'>离线</span >
            <span v-else>在线</span>
          </template>
					<template slot-scope="{ row, index }" slot="status">
              <Button type="success" size="small" @click="show(index)" v-if='index%2==0'>正常</Button>
							<Button type="error" size="small" @click="show(index)" v-else>禁用</Button>
          </template>
        </Table>
        <Page :total="100" show-elevator />
		</div>
  </div>
</template>

<script>
export default {
	name:'goodwayGoods',
	data(){
		return{
			data1:[],
			columns4:[
				{
          title: ' ',
          align: 'center',
          type:'index',
          maxWidth: 60,
          tooltip:true
				},
				{
          title: '操作',
					align: 'center',
					slot:'operation',
          maxWidth: 60,
          tooltip:true
				},
				{
          title: '点位',
					align: 'center',
					key:'point',
          tooltip:true
				},
				{
          title: '网络',
					align: 'center',
					slot:'network',
          tooltip:true
				},
				{
          title: '状态',
					align: 'center',
					slot:'status',
          tooltip:true
        },
			]
		}
	},
	mounted(){
		const data = {
			// point:''
		}
		this.data1 = Array(20).fill(data);
	}
}
</script>
<style lang="less" scoped>
	.ivu-page{
    text-align: center;
    margin-top: 10px;
	}
</style>