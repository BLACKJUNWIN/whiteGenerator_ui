<template>
  <div>
    <!--    筛选面板-->
    <el-card shadow="never">
      <el-form label-position="top" inline>
        <el-form-item label="文件名">
          <el-input placeholder="请输入文件名" v-model="formFilter.name"/>
        </el-form-item>
        <el-form-item label="类型">
          <el-select placeholder="请选择类型" v-model="formFilter.type" clearable>
            <el-option label="vue" value="vue"></el-option>
            <el-option label="js" value="js"></el-option>
            <el-option label="ts" value="ts"></el-option>
            <el-option label="css" value="css"></el-option>
            <el-option label="html" value="html"></el-option>
            <el-option label="java" value="java"></el-option>
            <el-option label="json" value="json"></el-option>
            <el-option label="无" value="无"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类">
          <el-select placeholder="请选择类别" v-model="formFilter.category" clearable>
            <el-option label="动态生成" value="动态生成"/>
            <el-option label="纯静态" value="纯静态"/>
            <el-option label="静态生成" value="静态生成"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div style="display: flex;justify-content: right">
        <el-button type="success" @click="data.isAdd=true;editBefore()">新增</el-button>
        <el-button type="info" @click="resetFilter();findAll()">重置</el-button>
        <el-button type="primary" @click="findAll()">搜索</el-button>
      </div>
    </el-card>
    <!--    路径结构体-->
    <el-card shadow="never" style="margin-top:20px">
      <el-collapse>
        <el-collapse-item title="模板文件结构" name="1">
          <el-tree :data="fileTree" />
        </el-collapse-item>
      </el-collapse>
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
        <el-form-item label="文件名" required>
          <el-input v-model="formParam.name" placeholder="请输入文件名"></el-input>
        </el-form-item>
        <el-form-item label="中文名">
          <el-input v-model="formParam.nameCh" placeholder="请输入中文名" ></el-input>
        </el-form-item>
        <el-form-item label="分类" required>
          <el-select placeholder="请选择分类" v-model="formParam.category" clearable style="width: 100%">
            <el-option label="动态生成" value="动态生成"></el-option>
            <el-option label="纯静态" value="纯静态"></el-option>
            <el-option label="静态生成" value="静态生成"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型"  required>
          <el-select placeholder="请选择类型" v-model="formParam.type" clearable style="width: 100%">
            <el-option label="vue" value="vue"></el-option>
            <el-option label="js" value="js"></el-option>
            <el-option label="ts" value="ts"></el-option>
            <el-option label="css" value="css"></el-option>
            <el-option label="html" value="html"></el-option>
            <el-option label="java" value="java"></el-option>
            <el-option label="json" value="json"></el-option>
            <el-option label="无" value="无"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="路径"  required>
          <el-input placeholder="请输入路径" v-model="formParam.path" clearable/>
        </el-form-item>
        <el-form-item label="数量"  required>
          <el-input-number v-model="formParam.size" placeholder="请输入数量"></el-input-number>
        </el-form-item>
        <el-form-item label="介绍">
          <el-input v-model="formParam.press" placeholder="请输入介绍"></el-input>
        </el-form-item>
        <el-form-item label="版本" required>
          <el-select placeholder="请选择版本" v-model="formParam.version" clearable style="width: 100%">
            <el-option label="vue2" value="2"></el-option>
            <el-option label="vue3" value="3"></el-option>
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
import {
  net_addTemplatePath,
  net_findTemplatePath,
  net_getFileTree,
  net_modifyTemplatePath,
  net_removeTemplatePath
} from "@/api/templatePath";

const store = useStore();
//基础数据
let data = reactive({
  isAdd: false,
  editVisible: false,
  total: 0,
})
//文件树形结构
const fileTree=ref([]);
//过滤数据
let formFilter = ref({
  name: "",
  type: "",
  category: "",
  pageNum: 1,
  pageSize: 10,
})
//编辑面板表单数据
let formParam = ref({
  category:"",
  name: "",
  nameCh: "",
  path: "",
  type: "",
  press: "",
  size: "",
  version: "",
})
//表单数据
const tableData = ref([])
//展示列表
const tableColum = ref([
  {
    column: "name",
    label: "文件路径名",
  },
  {
    column: "category",
    label: "分类",
  },
  {
    column: "nameCh",
    label: "中文名",
  },
  {
    column: "path",
    label: "路径",
  },
  {
    column: "type",
    label: "类型",
  },
  {
    column: "press",
    label: "介绍",
    width:"200"
  },
  {
    column: "size",
    label: "模板数量",
  },
  {
    column: "version",
    label: "版本",
  },
])
//方法****************************
onMounted(async () => {
  await findAll();
  fileTree.value=(await net_getFileTree()).data
})
//编辑面板打开之前
const editBefore = async (id) => {
  //重置表单
  resetParam()
  if (!data.isAdd) {
    //通过id获取数据
    let res = await net_findTemplatePath({"id": id,pageNum: 1,pageSize:10});
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
//新增
const add = async () => {
  let res = await net_addTemplatePath(formParam.value);
  store.commit("tip", res)
  await findAll();
}
//修改
const modify = async () => {
  let res = await net_modifyTemplatePath(formParam.value);
  store.commit("tip", res)
  await findAll();
}
//删除
const remove = async (id) => {
  let res = await net_removeTemplatePath(id);
  store.commit("tip", res)
  await findAll();
}
//查询全部
const findAll = async () => {
  let res = await net_findTemplatePath(formFilter.value);
  tableData.value = res.data.list;
  data.total = res.data.total;
}
//重置过滤面板

const resetFilter = () => {
  formFilter.value = {
    name: "",
    type: "",
    category: "",
    pageNum: 1,
    pageSize: 10,
  }
}
//重置表单
const resetParam = () => {
  formParam.value = {
    category:"",
    name: "",
    nameCh: "",
    path: "",
    type: "",
    press: "",
    size: "1",
    version: "2",
  }
}
//验证表单
const verify = () => {
  let res = {
    code: "100",
    message: ""
  }
  
  if (formParam.value.name == null || formParam.value.name === "") {
    res.message += "请先填写文件名";
  } else if (formParam.value.category == null || formParam.value.category === "") {
    res.message += "请选择分类";
  }else if (formParam.value.path == null || formParam.value.path === "") {
    res.message += "请输入路径";
  }else if (formParam.value.type == null || formParam.value.type === "") {
    res.message += "请选择类型";
  }else if (formParam.value.version == null || formParam.value.version === "") {
    res.message += "请选择版本";
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