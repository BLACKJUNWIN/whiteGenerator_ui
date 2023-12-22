<template>
  <div>
    <!--    筛选面板-->
    <el-card shadow="never">
      <el-form label-position="top" inline>
        <el-form-item label="用户名">
          <el-input placeholder="请输入用户名" v-model="formFilter.name"/>
        </el-form-item>
        <el-form-item label="权限">
          <el-select placeholder="请选择权限" v-model="formFilter.role" clearable>
            <el-option label="用户" value="用户"></el-option>
            <el-option label="管理员" value="管理员"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div style="display: flex;justify-content: right">
        <el-button type="success" @click="data.isAdd=true;editBefore()">新增</el-button>
        <el-button type="info" @click="resetFilter();findAll()">重置</el-button>
        <el-button type="primary" @click="findAll()">搜索</el-button>
      </div>
    </el-card>
    <!--    表单展示-->
    <el-card shadow="never" style="margin-top:20px">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column :prop="item.column" :label="item.label" :width="item.width===undefined?'auto':item.width"
                         v-for="item in tableColum" :key="item.column"/>
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button type="warning" icon="edit" @click="data.isAdd=false;editBefore(scope.row.id)">修改</el-button>
            <el-popconfirm title="确认删除该数据?" @confirm="remove(scope.row.id)">
              <template #reference>
                <el-button type="danger" icon="delete">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div style="width: 100%;margin-top:20px">
        <el-pagination background layout="prev, pager, next" :total="parseInt(data.total)"
                       v-model:current-page="formFilter.pageNum" @current-change="findAll()" :page-size="10"/>
      </div>
    </el-card>
    <!--编辑面板-->

    <el-dialog v-model="data.editVisible" :title="data.isAdd?'新增':'修改'+'数据'"
               style="border-radius: 10px;padding:15px 30px">
      <el-form label-position="top">
        <el-form-item label="用户名">
          <el-input v-model="formParam.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formParam.password" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <el-select placeholder="请选择权限" v-model="formParam.role" clearable>
            <el-option label="用户" value="用户"></el-option>
            <el-option label="管理员" value="管理员"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div style="display: flex;justify-content: right">
        <el-button type="primary" @click="edit()">确认</el-button>
        <el-button type="info" @click="data.editVisible=false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import {useStore} from "vuex";
import {net_addUser, net_findUserBy, net_modifyUser, net_removeUser} from "@/api/user";

const store = useStore();
//基础数据
let data = reactive({
  isAdd: false,
  editVisible: false,
  total: 0,
})
//过滤数据
let formFilter = ref({
  name: "",
  role: "",
  pageNum: 1,
  pageSize: 10,
})
//编辑面板表单数据
//新页面需要修改***********************************************************
let formParam = ref({
  name: "",
  password: "",
  role: ""
})
//表单数据
const tableData = ref([])
//展示列表
//新页面需要修改***********************************************************
const tableColum = ref([
  {
    column: "name",
    label: "用户名",
  },
  {
    column: "password",
    label: "密码",
  },
  {
    column: "role",
    label: "权限",
  },
  {
    column: "createTime",
    label: "创建时间",
  },
  {
    column: "updateTime",
    label: "修改时间",
  }
])
//方法****************************
onMounted(async () => {
  await findAll();
})
//编辑面板打开之前
const editBefore = async (id) => {
  //重置表单
  resetParam()
  if (!data.isAdd) {
    //通过id获取数据
    let res = await net_findUserBy({"id": id,pageNum: 1,pageSize:10});
    formParam.value = res.data.list[0];
    //同步到表单
  }
  data.editVisible = true;
}
const edit = async () => {
  console.log(data.isAdd);
  if (verify()) {
    if (data.isAdd) {
      await add()
    } else {
      await modify();
    }
    data.editVisible=false;
  }
}
//新增
const add = async () => {
  let res = await net_addUser(formParam.value);
  store.commit("tip", res)
  await findAll();
}
//修改
const modify = async () => {
  let res = await net_modifyUser(formParam.value);
  store.commit("tip", res)
  await findAll();
}
//删除
const remove = async (id) => {
  let res = await net_removeUser(id);
  store.commit("tip", res)
  await findAll();
}
//查询全部
const findAll = async () => {
  let res = await net_findUserBy(formFilter.value);
  tableData.value = res.data.list;
  data.total = res.data.total;
}
//重置过滤面板
//新页面需要修改***********************************************************
const resetFilter = () => {
  formFilter.value = {
    name: "",
    role: "",
    pageNum: 1,
    pageSize: 10,
  }
}
//重置表单
//新页面需要修改***********************************************************
const resetParam = () => {
  formParam.value = {
    name: "",
    password: "",
    role: "用户"
  }
}
//验证表单
const verify = () => {
  let res = {
    code: "100",
    message: ""
  }
  //新页面需要修改***********************************************************
  if (formParam.value.name == null || formParam.value.name === "") {
    res.message += "请先填写消息";
  } else if (formParam.value.password == null || formParam.value.password === "") {
    res.message += "请先填写密码";
  } else if (formParam.value.role == null || formParam.value.role === "") {
    res.message += "请选择权限";
  }
  if (res.message === "") {
    return true;
  } else {
    store.commit("tip", res);
    return false;
  }
}
</script>

<style scoped>

</style>