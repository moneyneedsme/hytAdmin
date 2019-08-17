<template>
	<div>
		<Tree :data="data1" @on-select-change='treeSelect'></Tree>
		<router-view>
		</router-view>
  </div>
</template>

<script>
export default {
  name: 'tree',
  data () {
    return {
      data1: [
        {
          title: 'parent 1',
          expand: true,
          id: 1,
          children: [
            {
              title: 'parent 1-1',
              expand: false,
              id: 2,
              children: [
                {
                  title: 'leaf 1-1-1',
                  id: 3
                },
                {
                  title: 'leaf 1-1-2',
                  id: 4
                }
              ]
            },
            {
              title: 'parent 1-2',
              expand: true,
              id: 6,
              children: [
                {
                  title: 'leaf 1-2-1',
                  id: 7
                },
                {
                  title: 'leaf 1-2-1',
                  id: 8
                }
              ]
            }
          ]
        }
      ]
    }
  },
  methods: {
    treeSelect (all) {
      console.log(all[0].id)
    }
  },
  mounted () {

  }
}
</script>

<style lang="less">
.ivu-tree{
	float: left;
	margin-right: 20px;
}
</style>
