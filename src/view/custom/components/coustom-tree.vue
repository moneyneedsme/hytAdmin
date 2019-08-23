<template>
		<Tree :data="data1" @on-select-change='treeSelect'></Tree>
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
      console.log(all)
    }
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
.ivu-tree{
	float: left;
  margin-right: 20px;
  width: 150px;
  min-height: 500px;
}
</style>
