<template>
  <div>
    <!-- 栅格布局 -->
    <Row :gutter="32">
      <Col class="span6" span="6">
        <!-- 按钮 -->
        <Button type="primary" icon="md-add-circle" @click="addModal">添加字典</Button>
        <!-- 下拉菜单 -->
        <Dropdown style="margin-left: 10px" @on-click="getDropdownData">
          <Button>
            更多操作
            <Icon type="ios-arrow-down"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem :name="dictId">编辑字典</DropdownItem>
            <DropdownItem @click.native="delOne">删除字典</DropdownItem>
            <DropdownItem @click.native="getDictType()">刷新</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <!-- 警告 -->
        <Alert style="margin-top: 20px" show-icon>当前选择：{{dictDataByID.name}}</Alert>
        <!-- 搜索 -->
        <Input
          suffix="ios-search"
          style="margin-bottom: 20px"
          v-model="name"
          @keyup.enter.native="getDictType"
          placeholder="请输入字典"
          clearable
        />
        <div class="dictContent">
          <Menu active-name="1" width="240" @on-select="selectRow">
            <MenuItem :name="item.id" v-for="(item) in dictTypeList" :key='item.id'>
              <Icon type="md-document" />
              {{item.name}}
            </MenuItem>
          </Menu>
        </div>
      </Col>
      <Col class="span18" span="18">
        数据名称：
        <Input style="width:200px;margin-right: 20px" placeholder="请输入数据名称" clearable />状态：
        <Select v-model="model8" clearable style="width:200px">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Button type="primary" icon="ios-search" style="margin-left: 10px">查询</Button>
        <Button
          type="primary"
          icon="md-add-circle"
          style="margin-left: 10px"
          @click="addModalData"
        >新增</Button>
        <Table :columns="columns" :data="dataTable" border height="700" style="margin-top: 20px">
          <template slot-scope="scope" slot="operation">
            <!-- 编辑按钮 -->
            <Button
              type="primary"
              size="small"
              icon="md-create"
              style="margin-right: 5px"
              @click="editModalData(scope.row)"
            ></Button>

            <!-- 删除按钮 -->
            <Button type="error" size="small" icon="ios-trash" @click="delOneData(scope.row)"></Button>
          </template>
        </Table>

        <Page
          :total="1000"
          @on-change="handleCurrentChange"
          :current="pageNumData"
          style="margin-top: 10px"
          show-elevator
        />
      </Col>
    </Row>

    <!-- 字典类型弹框的模态框 -->
    <Modal
      v-model="isShow"
      :title="isAdd==true?'新增【字典类型】':'编辑【字典类型】'"
      @on-ok="getDictTypeModal('formValidate')"
      @on-cancel="cancel"
    >
      <Form ref="formValidate" :model="formValidate" :label-width="120">
        <FormItem label="字典类型名称" prop="name">
          <Input v-model="formValidate.name" placeholder="字典类型名称"></Input>
        </FormItem>
        <FormItem label="字典类型" prop="type">
          <Input v-model="formValidate.type" placeholder="字典类型"></Input>
        </FormItem>
        <FormItem label="操作人" prop="operator">
          <Input v-model="formValidate.operator" placeholder="操作人"></Input>
        </FormItem>
        <FormItem label="备注" prop="remark">
          <Input v-model="formValidate.remark" placeholder="备注"></Input>
        </FormItem>
      </Form>
    </Modal>

    <!-- 字典数据弹框的模态框 -->
    <Modal
      v-model="isShowData"
      :title="isAddData==true?'新增【字典数据】':'新增【字典数据】'"
      @on-ok="getDictDataModal('formValidateData')"
      @on-cancel="cancel"
    >
      <Form ref="formValidateData" :model="formValidateData" :label-width="120">
        <FormItem label="字典名称" prop="dataName">
          <Input v-model="formValidateData.dataName" placeholder="字典名称"></Input>
        </FormItem>
        <FormItem label="字典值" prop="dataValue">
          <Input v-model="formValidateData.dataValue" placeholder="字典值"></Input>
        </FormItem>
        <FormItem label="字典类型id" prop="dictId">
          <Input v-model="formValidateData.dictId" placeholder="字典类型id"></Input>
        </FormItem>
        <FormItem label="操作人" prop="operator">
          <Input v-model="formValidateData.operator" placeholder="操作人"></Input>
        </FormItem>
        <FormItem label="备注" prop="remark">
          <Input v-model="formValidateData.remark" placeholder="备注"></Input>
        </FormItem>
        <FormItem label="排序" prop="sort">
          <Input v-model="formValidateData.sort" placeholder="排序"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import {
  dictType,
  addDictType,
  delDictType,
  editDictType,
  searchDictTypeByID,
  dictData,
  addDictData,
  delDictData,
  editDictData
} from "../../../api/data";
export default {
  name: "dict",
  data() {
    return {
      // 字典类型信息
      dictDataByID: {},
      delFormVisibleData: false, //删除模态框显示方式
      isShowData: false, //弹框显示状态
      isAddData: false, //判断当前弹框是否新增
      //字典数据模态框表单数据
      formValidateData: {
        dataName: "", //字典名称
        dataValue: "", // 字典值
        dictId: "", //字典类型id
        operator: "", //操作人
        remark: "", //备注
        sort: "" //排序
      },
      delFormVisible: false, //删除模态框显示方式
      isShow: false, //弹框显示状态
      isAdd: false, //判断当前弹框是否新增
      //字典类型模态框表单数据
      formValidate: {
        name: "", //字典类型名称
        type: "", // 字典类型
        operator: "", //操作人
        remark: "" //备注
      },
      name: "", //字典类型名称
      type: "", //字典类型
      pageNum: 1, //页码
      pageSize: 15, //页容量
      dataName: "", //字典名称
      dataValue: "", // 字典值
      dictId: "", //字典类型id
      dictTypeName: "", //字典类型的名称
      pageNumData: 1, //页码
      pageSizeData: 15, //页容量
      cityList: [
        {
          value: "1",
          label: "正常"
        },
        {
          value: "0",
          label: "禁用"
        }
      ],
      model8: "",
      // 字典类型列表
      dictTypeList: [],
      // 字典数据列表
      columns: [
        {
          title: "#",
          align: "center",
          type: "index",
          maxWidth: 60,
          tooltip: true
        },
        {
          title: "名称",
          key: "dataName",
          align: "center",
          minWidth: 100,
          tooltip: true
        },
        {
          title: "数据值",
          key: "dataValue",
          align: "center",
          maxWidth: 100,
          tooltip: true
        },
        {
          title: "备注",
          key: "remark",
          align: "center",
          minWidth: 50,
          tooltip: true
        },
        {
          title: "排序值",
          key: "sort",
          align: "center",
          minWidth: 50,
          tooltip: true
        },
        {
          title: "创建日期",
          key: "createDate",
          align: "center",
          minWidth: 25,
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
      dataTable: []
    };
  },
  methods: {
    show(index) {
      alert(index);
    },

    // 页码改变时触发
    handleCurrentChange(current) {
      // console.log(current);
      this.pageNumData = current;
      // 重新获取数据
      this.getDictData();
    },

    // 点击字典类型触发
    selectRow(name) {
      // console.log(name);
      this.dictId = name;
      // console.log(this.dictId);
      this.getsearchDictTypeByID(name);
      this.getDictData();
    },

    cancel() {
      this.$Message.info("取消操作");
      this.formValidate = {
        appId: "", //应用id
        appDesc: "", // 应用描述
        appName: "", //应用名称
        operator: "", //操作人
        remark: "" //备注
      };
    },

    // 字典数据新增点击事件
    addModalData() {
      this.isAddData = true;
      this.isShowData = true;
      if(this.dictId==""){
        return this.$Message.error("请选择一个字典类型");
      }
      
    },

    // 字典数据编辑点击事件
    editModalData(row) {
      this.isAddData = false;
      this.isShowData = true;
      this.formValidateData = row;
    },

    // 字典数据弹框确认的点击事件
    getDictDataModal(name) {
      if (this.isAddData == true) {
        this.$refs[name].validate(valid => {
          if (valid) {
            //对的
            addDictData(this.formValidateData).then(backData => {
              console.log(backData);
              if (backData.data.code == 200) {
                // 关闭弹框
                this.addFormVisible = false;
                // 重新获取数据
                this.getDictData();
                this.$Message.info("新增成功");
                this.formValidateData = {
                  dataName: "", //字典名称
                  dataValue: "", // 字典值
                  dictId: "", //字典类型id
                  operator: "", //操作人
                  remark: "", //备注
                  sort: "", //排序
                  createDate: "", //创建时间
                  updateDate: "" //修改时间
                };
              }
            });
          } else {
            this.$Message.error("新增失败");
          }
        });
      } else if (this.isAddData == false) {
        editDictData(this.formValidateData).then(backData => {
          console.log(backData);
          if (backData.data.code == 200) {
            this.$Message.info("修改成功");
            this.editFormVisible = false;
            this.getDictData();
            this.formValidateData = {
              dataName: "", //字典名称
              dataValue: "", // 字典值
              dictId: "", //字典类型id
              operator: "", //操作人
              remark: "", //备注
              sort: "", //排序
              createDate: "", //创建时间
              updateDate: "" //修改时间
            };
          }
        });
      }
    },

    // 字典数据删除按钮操作
    delOneData(row) {
      // 显示模态框
      this.delFormVisibleData = true;
        console.log(row);
      this.$Modal.confirm({
        title: "此操作将永久删除该用户, 是否继续?",
        // 点击了确定
        onOk: () => {
          delDictData({ id: row.id }).then(backData => {
            console.log(backData);
            if (backData.data.code == 200) {
              this.getDictData();
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

    // 字典类型新增点击事件
    addModal() {
      this.isAdd = true;
      this.isShow = true;
    },

    // 字典类型获取Dropdown下拉框数据
    getDropdownData(name) {
      if (name == "") {
        this.$Message.error("请选择字典");
      } else if (name == this.dictId) {
        this.getsearchDictTypeByID(name);
        console.log(11111);
        this.formValidate = this.dictDataByID;
        this.isAdd = false;
        this.isShow = true;
      }
    },

    // 字典类型删除按钮操作
    delOne() {
      if (this.dictId == "") {
        this.$Message.error("请选择字典");
      } else {
        // 显示模态框
        this.delFormVisible = true;
        this.$Modal.confirm({
          title: "此操作将永久删除该用户, 是否继续?",
          // 点击了确定
          onOk: () => {
            delDictType({ id: this.dictId }).then(backData => {
              console.log(backData);
              if (backData.data.code == 200) {
                this.getDictType();
                this.dictDataByID = {};
                this.$Message.info("删除成功");
              }
            });
          },
          // 点击了取消
          onCancel: () => {
            this.$Message.info("取消删除");
          }
        });
      }
    },

    // 字典类型弹框确认的点击事件
    getDictTypeModal(name) {
      if (this.isAdd == true) {
        this.$refs[name].validate(valid => {
          if (valid) {
            //对的
            addDictType(this.formValidate).then(backData => {
              console.log(backData);
              if (backData.data.code == 200) {
                // 关闭弹框
                this.addFormVisible = false;
                // 重新获取数据
                this.getDictType();
                this.$Message.info("新增成功");
                this.formValidate = {
                  name: "", //字典类型名称
                  type: "", // 字典类型
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
        editDictType(this.formValidate).then(backData => {
          // console.log(backData);
          if (backData.data.code == 200) {
            this.$Message.info("修改成功");
            this.editFormVisible = false;
            this.getDictType();
            this.getsearchDictTypeByID();
            this.formValidate = {
              name: "", //字典类型名称
              type: "", // 字典类型
              operator: "", //操作人
              remark: "" //备注
            };
          }
        });
      }
    },

    // 获取字典类型
    getDictType() {
      dictType({
        name: this.name,
        type: this.type,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(backData => {
        console.log(backData);
        if (backData.data.code == 200) {
          this.dictTypeList = backData.data.result.list;
        }
      });
    },
    // 获取字典数据
    getDictData() {
      dictData({
        dataName: this.dataName,
        dataValue: this.dataValue,
        dictId: this.dictId,
        pageNum: this.pageNumData,
        pageSize: this.pageSizeData
      }).then(backData => {
        console.log(backData);
        if (backData.data.code == 200) {
          this.dataTable = backData.data.result.list;
        }
      });
    },

    getsearchDictTypeByID() {
      // 根据字典id获取字典类型信息
      searchDictTypeByID({ id: this.dictId }).then(backData => {
        console.log(backData);
        if (backData.data.code == 200) {
          this.dictDataByID = backData.data.result;
        }
      });
    }
  },

  mounted() {
    this.getDictType();
    this.getDictData();
  }
};
</script>

<style>
</style>