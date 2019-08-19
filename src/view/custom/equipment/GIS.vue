<template>
	<div class="gis">
      <Card>
        <div id="map"></div>
      </Card>
      <Card>
        <Tree :data="data" @on-select-change='treeSelect'></Tree>
      </Card>
  </div>
</template>
<script>
export default {
  components: {
  },
  name: 'GIS',
  data () {
    return {
      data: [
        {
          title: '北京市',
          expand: true,
          id: 1,
          children: [
            {
              title: '东城区',
              expand: false,
              id: 2,
            },
            {
              title: '西城区',
              expand: false,
              id: 3,
            },
            {
              title: '朝阳区',
              expand: false,
              id: 4,
            },
          ]
        },
        {
          title: '湖南省',
          expand: true,
          id: 5,
          children: [
            {
              title: '长沙市',
              expand: false,
              id: 6,
              children: [
                {
                  title: '雨花区',
                  id: 7
                },
                {
                  title: '天心区',
                  id: 8
                }
              ]
            },
            {
              title: '娄底市',
              expand: true,
              id: 9,
              children: [
                {
                  title: '涟源市',
                  id: 10
                },
                {
                  title: '新化市',
                  id: 11
                }
              ]
            }
          ]
        }
      ]
		}
  },
  methods: {
    getMap(){
       // 创建Map实例
      var map = new BMap.Map("map")
      // 初始化地图,设置中心点坐标和地图级别
      map.centerAndZoom(new BMap.Point(116.404, 39.915), 11)
      //添加地图类型控件
      map.addControl(new BMap.MapTypeControl({
        mapTypes:[BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
      }))
      // 设置地图显示的城市 此项是必须设置的
      map.setCurrentCity("北京")
      //开启鼠标滚轮缩放
      map.enableScrollWheelZoom(true)
      map.addControl(new BMap.MapTypeControl({mapTypes:['BMAP_NORMAL_MAP',BMAP_SATELLITE_MAP]})); //展示普通街道视图和卫星视图
      map.addControl(new BMap.NavigationControl()); 
    },
    treeSelect (all) {
      console.log(all[0].id)
    }
  },
  mounted () {
    this.getMap()
  }
}
</script>

<style lang="less" scoped>
  .gis{
    font-size: 0px;
    overflow: hidden;
    >div.ivu-card:first-of-type{
      float: left;
      width: 75%;
      .ivu-card-body{
        padding:0
      }
    }
    >div.ivu-card:last-of-type{
      float: right;
      width: 24%;
    }
    #map{
      height: 700px;
    }
  }
</style>
