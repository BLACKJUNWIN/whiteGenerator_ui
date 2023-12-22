<template>
  <div>
    <!--    筛选面板-->
    <!--    //新页面需要修改***********************************************************-->
    <el-card shadow="never">
      <el-form label-position="top" inline>
        <el-form-item label="信息">
          <el-input placeholder="请输入信息" v-model="formFilter.info"/>
        </el-form-item>
        <el-form-item label="信息">
          <el-input placeholder="请输入反馈" v-model="formFilter.feedback"/>
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
    <!--    //新页面需要修改***********************************************************-->
    <el-dialog v-model="data.editVisible" :title="data.isAdd?'新增':'修改'+'数据'"
               style="border-radius: 10px;padding:15px 30px">
      <el-form label-position="top">
        <el-form-item label="用户名">
          <el-select placeholder="请选择用户名" v-model="formParam.userId" clearable style="width: 100%">
            <el-option :value="item.id" v-for="(item,index) in data.userList" :key="item.id" :label="item.name">{{item.name}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="信息">
          <el-input v-model="formParam.info" placeholder="请输入信息"></el-input>
        </el-form-item>
        <el-form-item label="反馈">
          <el-input v-model="formParam.feedback" placeholder="请输入反馈" ></el-input>
        </el-form-item>
        <el-form-item label="评价">
          <el-input v-model="formParam.evaluation" placeholder="请输入评价" ></el-input>
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
import {net_addGeneratorRecord, net_findGeneratorRecord, net_modifyGeneratorRecord, net_removeGeneratorRecord} from "@/api/generatorRecord";
import {net_findUserBy} from "../../../../api/user";

const store = useStore();
//基础数据
let data = reactive({
  isAdd: false,
  editVisible: false,
  total: 0,
  userList:[]
})
//过滤数据
//新页面需要修改***********************************************************
let formFilter = ref({
  info: "",
  feedback: "",
  pageNum: 1,
  pageSize: 10,
})
//编辑面板表单数据
//新页面需要修改***********************************************************
let formParam = ref({
  userId: "",
  info: "",
  feedback: "",
  evaluation: "",
})
//表单数据
const tableData = ref([])
//展示列表
//新页面需要修改***********************************************************
const tableColum = ref([
  {
    column: "userId",
    label: "用户ID",
  },
  {
    column: "info",
    label: "信息",
  },
  {
    column: "feedback",
    label: "反馈",
  },
  {
    column: "evaluation",
    label: "评价",
  },
])
//方法****************************
onMounted(async () => {
  await findAll();
  await getUser();
})
//编辑面板打开之前
const editBefore = async (id) => {
  //重置表单
  resetParam()
  if (!data.isAdd) {
    //通过id获取数据
    let res = await net_findGeneratorRecord({"id": id,pageNum: 1,pageSize:10});
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

//获取用户信息
const getUser = async () => {
  let res = await net_findUserBy({pageNum: 1,pageSize:10});
  data.userList = res.data.list
}

//新增
const add = async () => {
  let res = await net_addGeneratorRecord(formParam.value);
  store.commit("tip", res)
  await findAll();
}
//修改
const modify = async () => {
  let res = await net_modifyGeneratorRecord(formParam.value);
  store.commit("tip", res)
  await findAll();
}
//删除
const remove = async (id) => {
  let res = await net_removeGeneratorRecord(id);
  store.commit("tip", res)
  await findAll();
}
//查询全部
const findAll = async () => {
  let res = await net_findGeneratorRecord(formFilter.value);
  tableData.value = res.data.list;
  data.total = res.data.total;
}
//重置过滤面板
//新页面需要修改***********************************************************
const resetFilter = () => {
  formFilter.value = {
    info: "",
    feedback: "",
    pageNum: 1,
    pageSize: 10,
  }
}
//重置表单
//新页面需要修改***********************************************************
const resetParam = () => {
  formParam.value = {
    userId: "",
    info: "",
    feedback: "",
    evaluation: "",
  }
}
//验证表单
const verify = () => {
  let res = {
    code: "100",
    message: ""
  }
  //新页面需要修改***********************************************************
  if (formParam.value.userId == null || formParam.value.userId === "") {
    res.message += "请先填写用户名";
  } else if (formParam.value.info == null || formParam.value.info === "") {
    res.message += "请先填写信息";
  } else if (formParam.value.feedback == null || formParam.value.feedback === "") {
    res.message += "请填写反馈";
  } else if (formParam.value.evaluation == null || formParam.value.evaluation === "") {
    res.message += "请填写评价";
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