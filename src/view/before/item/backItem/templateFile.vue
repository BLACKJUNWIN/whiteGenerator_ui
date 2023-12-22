<template>
  <div>
    <!--    筛选面板-->
    <!--    -->
    <el-card shadow="never">
      <el-form label-position="top" inline>
        <el-form-item label="文件名">
          <el-input placeholder="请输入文件名" v-model="formFilter.fileName"/>
        </el-form-item>
        <el-form-item label="文件路径">
          <el-select placeholder="请选择文件路径" v-model="formFilter.templatePathId" clearable>
            <el-option :value="item.id" v-for="(item,index) in templatePathList" :key="index" >{{item.path}}</el-option>
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
    <!--    -->
    <el-dialog v-model="data.editVisible" :title="data.isAdd?'新增':'修改'+'数据'"
               style="border-radius: 10px;padding:15px 30px">
      <el-form label-position="top">
        <el-form-item label="文件名">
          <el-input v-model="formParam.fileName" placeholder="请输入文件名"></el-input>
        </el-form-item>
        <el-form-item label="主题">
          <el-input v-model="formParam.theme" placeholder="主题"></el-input>
        </el-form-item>
        <el-form-item label="文件路径">
          <el-select placeholder="请选择文件路径" v-model="formFilter.templatePathId" clearable>
            <el-option :value="item.id" v-for="(item,index) in templatePathList" :key="index" :label="item.path"/>
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="formParam.describe" placeholder="请输入描述"></el-input>
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
import {net_addTemplateFile, net_findTemplateFile, net_modifyTemplateFile, net_removeTemplateFile} from "@/api/templateFile";
import {net_findTemplatePath} from "@/api/templatePath"

const store = useStore();
//基础数据
let data = reactive({
  isAdd: false,
  editVisible: false,
  total: 0, //文件路径
})

const templatePathList= ref([]);
//过滤数据
let formFilter = ref({
  fileName: "",
  templatePathId: "",
  pageNum: 1,
  pageSize: 10,
})
//编辑面板表单数据
let formParam = ref({
  fileName: "",
  templatePathId: "",
  theme:"",
  describe:"",
  // imgUrl:"",
})
//表单数据
const tableData = ref([])
//展示列表

const tableColum = ref([
  {
    column: "fileName",
    label: "文件名",
  },
  {
    column: "templatePathId",
    label: "文件路径ID",
  },
  {
    column: "theme",
    label: "主题",
  },
  {
    column: "imgUrl",
    label: "图片",
  },
  {
    column: "describe",
    label: "描述",
  },
])
//方法****************************
onMounted(async () => {
  await findAll();
  await getTemplatePath();
})
//编辑面板打开之前
const editBefore = async (id) => {
  //重置表单
  resetParam()
  if (!data.isAdd) {
    //通过id获取数据
    let res = await net_findTemplateFile({"id": id,pageNum: 1,pageSize:10});
    formParam.value = res.data.list[0];
    //同步到表单
  }
  data.editVisible = true;
}
const edit = async () => {
  if (verify()) {
    if (data.isAdd) {
      await add()
    } else {
      await modify();
    }
    data.editVisible=false;
  }
}

//获取文件路径
const getTemplatePath = async () => {
  let res = await net_findTemplatePath({});
  templatePathList.value=res.data.list;
}

//新增
const add = async () => {
  let res = await net_addTemplateFile(formParam.value);
  store.commit("tip", res)
  await findAll();
}
//修改
const modify = async () => {
  let res = await net_modifyTemplateFile(formParam.value);
  store.commit("tip", res)
  await findAll();
}
//删除
const remove = async (id) => {
  let res = await net_removeTemplateFile(id);
  store.commit("tip", res)
  await findAll();
}
//查询全部
const findAll = async () => {
  let res = await net_findTemplateFile(formFilter.value);
  tableData.value = res.data.list;
  data.total = res.data.total;
}
//重置过滤面板

const resetFilter = () => {
  formFilter.value = {
    fileName: "",
    templatePathId: "",
    pageNum: 1,
    pageSize: 10,
  }
}
//重置表单

const resetParam = () => {
  formParam.value = {
    fileName: "",
    templatePathId: "",
    theme:"",
    describe:"",
  }
}
//验证表单
const verify = () => {
  let res = {
    code: "100",
    message: ""
  }
  
  if (formParam.value.fileName == null || formParam.value.fileName === "") {
    res.message += "请先填写文件名";
  } else if (formParam.value.templatePathId == null || formParam.value.templatePathId === "") {
    res.message += "请先选择文件路径";
  } else if (formParam.value.theme == null || formParam.value.theme === "") {
    res.message += "请填写主题";
  } else if (formParam.value.describe == null || formParam.value.describe === "") {
    res.message += "请填写描述";
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