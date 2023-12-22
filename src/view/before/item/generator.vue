<template>
  <!--  基础参数设置-->
  <h1 style="text-align: center;font-size: 60px">
    <span style="color: #99cccc">Code</span>&nbsp;<span style="color: #ffc269">生</span><span
      style="color: #1c6bbc">成</span><span style="color: forestgreen">器</span>
  </h1>
  <div>
    <el-card shadow="never" style="width: 80%;min-width: 500px;margin:0 auto">
      <el-alert title="项目基础信息,全部用于生成内容,务必准确填写" type="warning" show-icon :closable="false"
                style="margin-bottom: 30px;padding:20px;font-size: 13px"/>
      <el-form label-width="150">
        <el-form-item label="项目名称" required>
          <el-input v-model="projectData.projectName" @blur="saveInfoSession('projectData')" style="width: 300px"
                    show-word-limit maxlength="10" minlength="1"
                    placeholder="例: 二手书城"></el-input>
        </el-form-item>
        <el-form-item label="主模块名称" required>
          <el-input v-model="projectData.modelName" @blur="saveInfoSession('projectData')" style="width: 360px"
                    show-word-limit maxlength="20" minlength="1"
                    placeholder="例: java_book"></el-input>
        </el-form-item>
        <el-form-item label="预设主题">
          <el-radio-group size="small" @change="changePresetColor" v-model="projectData.presetColor">
            <el-radio-button :label="item.value" v-for="(item,index) in presetsColor" :key="index">
              {{ item.mode }}
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="主题颜色" required>
          <div style="width: 500px;display: flex;justify-content: space-between;margin-left: 30px">
            <div>背景颜色:
              <el-color-picker show-alpha v-model="projectData.backgroundColor"
                               @change="saveInfoSession('data')"/>
            </div>
            <div>辅助颜色:
              <el-color-picker show-alpha v-model="projectData.assistColor" @change="saveInfoSession('data')"/>
            </div>
            <div>点缀颜色:
              <el-color-picker show-alpha v-model="projectData.spotColor" @change="saveInfoSession('data')"/>
            </div>
            <div style="display: flex;box-shadow: 0 0 2px 3px rgba(128,128,128,0.2);border-radius: 5px;width: 90px;height: 30px;overflow: hidden">
              <el-tooltip :content="projectData.backgroundColor" placement="top">
                <div style="width: 30px;height: 30px;" :style="{backgroundColor:projectData.backgroundColor}"></div>
              </el-tooltip>
              <el-tooltip :content="projectData.assistColor" placement="top">
                <div style="width: 30px;height: 30px;" :style="{backgroundColor:projectData.assistColor}"></div>
              </el-tooltip>
              <el-tooltip :content="projectData.spotColor" placement="top">
                <div style="width: 30px;height: 30px;" :style="{backgroundColor:projectData.spotColor}"></div>
              </el-tooltip>
            </div>
          </div>
        </el-form-item>
        <el-form-item :label="item.mode" v-for="(item,index) in publicMode" :key="index">
          <el-radio-group v-model="item.source" size="small" @change="saveInfoSession('publicMode')">
            <el-radio-button :label="item2.value" v-for="(item2,index2) in item.sourceList" :key="index2">
              {{ item2.key }}
            </el-radio-button>
          </el-radio-group>
          <div style="margin-left: 50px;position: relative;top:-2px;display: flex" v-if="item.mode==='按钮样式'">
            <div v-if="item.source==='default'||item.source==='auto'">
              <bl-button type="primary" size="small">重要</bl-button>
              <bl-button type="success" size="small">成功</bl-button>
              <bl-button type="warning" size="small">警告</bl-button>
              <bl-button type="danger" size="small">危险</bl-button>
            </div>
            <div v-else-if="item.source==='plain'">
              <bl-button type="primary" mode="plain" size="small">重要</bl-button>
              <bl-button type="success" mode="plain" size="small">成功</bl-button>
              <bl-button type="warning" mode="plain" size="small">警告</bl-button>
              <bl-button type="danger" mode="plain" size="small">危险</bl-button>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="生成范围">
          <el-radio-group label="size control" size="small" v-model="data.generatorRange"
                          @change="saveInfoSession('data')">
            <el-radio-button label="all">全部</el-radio-button>
            <el-radio-button label="before">前端首页</el-radio-button>
            <el-radio-button label="back">后台管理</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <div v-if="data.generatorRange!=='before'">
          <el-divider content-position="center"><span style="color: #4da8fb">mysql</span></el-divider>
          <el-form-item label="url" required>
            <el-input v-model="sqlData.url" @blur="saveInfoSession('sqlData')" style="width: 500px" show-word-limit
                      maxlength="200" minlength="10"
                      placeholder="地址.例: jdbc:mysql://localhost/java_book"></el-input>
          </el-form-item>
          <el-form-item label="drive" required>
            <el-select v-model="sqlData.drive" @blur="saveInfoSession('sqlData')" placeholder="请选择驱动版本">
              <el-option value="com.mysql.jdbc.Driver" label="5.0版本"/>
              <el-option value="com.mysql.cj.jdbc.Driver" label="8.0版本"/>
            </el-select>
          </el-form-item>
          <el-form-item label="user" required>
            <el-input v-model="sqlData.user" @blur="saveInfoSession('sqlData')" style="width: 200px"
                      placeholder="用户名.例: root"
                      autocomplete="new-password"></el-input>
          </el-form-item>
          <el-form-item label="password" required>
            <el-input v-model="sqlData.password" @blur="saveInfoSession('sqlData')" style="width: 200px" show-password
                      placeholder="密码.例: 123456"
                      autocomplete="new-password"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div style="display: flex;justify-content: right">
        <el-button type="primary" icon="Bicycle" @click="testSql()">测试连接</el-button>
        <el-button type="success" icon="Download" @click="syncTableData()">提取数据</el-button>
      </div>
    </el-card>
  </div>
  <!--    数据库表数据-->
  <div v-if="data.generatorRange!=='before'">
    <h2 style="font-size: 30px;text-align: center">表单数据</h2>
    <el-card shadow="never" style="width: 80%;margin:0 auto">
      <el-alert title="该数据将用于生成后台管理系统UI,按需选择表以及功能" type="warning" show-icon :closable="false"
                style="margin-bottom: 30px;padding:20px;font-size: 13px"/>
      <el-form-item label="生成的表" required>
        <el-select multiple placeholder="请选择需动态生成的表" v-model="generatorTable" @change="saveTableData()"
                   value-key="name" style="width:80%;min-width: 500px">
          <el-option v-for="(item,index) in dataData" :label="item.name" :value="item" :key="index"/>
        </el-select>
      </el-form-item>
      <h2>样式</h2>
      <el-form label-width="150">
        <el-form-item :label="item.mode" v-for="(item,index) in backMode" :key="index">
          <el-radio-group v-model="item.source" size="small" @change="saveInfoSession('backMode')">
            <el-radio-button :label="item2.value" v-for="(item2,index2) in item.sourceList" :key="index2">
              {{ item2.key }}
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <!--        标签页-->
      <el-tabs type="card" v-model="data.tabIndex" closable class="demo-tabs" @tab-change="changeTab" @tab-remove="tabRemove">
        <el-tab-pane :label="item.name" :name="index" v-for="(item,index) in generatorTable" :key="index">
          <template #label>
            <el-tooltip :content="item.comment" placement="top" v-if="item.comment!=null&&item.comment!==''">
              {{ item.name }}
            </el-tooltip>
            <div v-else>
              {{ item.name }}
            </div>
          </template>
        </el-tab-pane>
      </el-tabs>
      <el-form label-width="65" :inline="true" v-if="currentTable.name!==''">
        <el-form-item label="表名:">
          <el-tag type="success">{{ currentTable.name }}</el-tag>
        </el-form-item>
        <el-form-item label="表注释:">
          <div v-if="isBankItem(currentTable.comment)" style="color: orangered;cursor: default">
            <el-tooltip placement="top" content="点击右侧按钮,补充表注释">
              <el-icon size="20" style="position: relative;top:5px">
                <WarningFilled/>
              </el-icon>
            </el-tooltip>
            需补充
          </div>
          <div v-else>
            {{ currentTable.comment }}
          </div>
        </el-form-item>
        <el-form-item>
          <el-tooltip content="修改表注释" placement="top">
            <el-button size="small" circle icon="edit" plain type="warning" @click="data.tableVisible=true"/>
          </el-tooltip>
        </el-form-item>
      </el-form>
      <!--        表单数据-->
      <el-table :data="tableData">
        <el-table-column prop="column" label="属性名"/>
        <el-table-column prop="comment" label="注释名">
          <template #default="scope">
            <div v-if="!isBankItem(scope.row.comment)">{{ scope.row.comment }}</div>
            <div style="color: orangered;cursor: default" v-else>
              <el-tooltip placement="top" content="点击修改,补充注释名">
                <el-icon size="20" style="position: relative;top:5px">
                  <WarningFilled/>
                </el-icon>
              </el-tooltip>
              需补充
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="类型" width="100">
          <template #default="scope">
            <el-tag>{{ sqlToJavaType(scope.row.type) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="枚举" width="80">
          <template #header>
            <span>枚举</span>
            <el-popover
                placement="top-start" title="枚举" :width="200" trigger="hover"
                content="设置枚举后,字段输入框都会变为选择框">
              <template #reference>
                <el-icon>
                  <QuestionFilled/>
                </el-icon>
              </template>
            </el-popover>
          </template>
          <template #default="scope">
            <el-switch v-model="scope.row.isEnum"/>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="枚举数据" width="200">
          <template #default="scope">
            <div style="color: orangered;cursor: default" v-if="scope.row.isEnum&&scope.row.enumList.length<=0">
              <div>
                <el-tooltip placement="top" content="点击修改,补充枚举数据">
                  <el-icon size="20" style="position: relative;top:5px">
                    <WarningFilled/>
                  </el-icon>
                </el-tooltip>
                需补充
              </div>
            </div>
            <div v-else>
              <el-tooltip placement="top" :content="item.value" v-for="(item,index) in scope.row.enumList" :key="index">
                <el-tag>{{ item.name }}</el-tag>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="筛选" width="80">
          <template #header>
            <span>筛选</span>
            <el-popover
                placement="top-start" title="筛选" :width="200" trigger="hover"
                content="设置筛选后,可以通过字段来查询数据">
              <template #reference>
                <el-icon>
                  <QuestionFilled/>
                </el-icon>
              </template>
            </el-popover>
          </template>
          <template #default="scope">
            <el-switch v-model="scope.row.canSelect"/>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="编辑" width="80">
          <template #header>
            <span>编辑</span>
            <el-popover
                placement="top-start" title="编辑" :width="200" trigger="hover"
                content="设置编辑后,字段会在新增与修改时能够编辑内容">
              <template #reference>
                <el-icon>
                  <QuestionFilled/>
                </el-icon>
              </template>
            </el-popover>
          </template>
          <template #default="scope">
            <el-switch v-model="scope.row.canEdit"/>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="操作" width="110" fixed="right">
          <template #default="scope">
            <el-button type="warning" icon="edit" plain @click="editColumnBefore(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
  <!--  前端首页生成数据-->
  <div v-if="data.generatorRange!=='back'">
    <h2 style="font-size: 30px;text-align: center">前端首页</h2>
    <el-card style="width: 80%;margin:0 auto" shadow="never">
      <el-alert title="该数据将用于生成前端首页UI界面,选择您需要的样式" type="warning" show-icon :closable="false"
                style="margin-bottom: 30px;padding:20px;font-size: 13px"/>
      <h2>样式</h2>
      <el-form label-width="150">
        <el-form-item :label="item.mode" v-for="(item,index) in beforeMode" :key="index">
          <el-radio-group v-model="item.source" size="small" @change="saveInfoSession('beforeMode')">
            <el-radio-button :label="item2.value" v-for="(item2,index2) in item.sourceList" :key="index2">
              {{ item2.key }}
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <el-tabs type="card" class="demo-tabs">
        <el-tab-pane v-for="(item,index) in beforePages" :key="index" :label="item.page">
          <el-form-item label="生成样式">
            <el-radio-group v-model="item.source" size="small" @change="saveInfoSession('beforePages')">
              <el-radio-button :label="item2.value" v-for="(item2,index2) in item.sourceList" :key="index2">
                {{ item2.key }}
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
  <div style="width: 80%;margin:20px auto;display: flex;justify-content: right">
    <el-button icon="Cpu" type="success" @click="generatorCode()">生成代码</el-button>
  </div>
  <!--  表注释修改面板-->
  <el-dialog v-model="data.tableVisible" title="修改表注释" style="width: 40%;min-width: 500px">
    <el-form label-width="80">
      <el-form-item label="表名:">
        <el-tag type="success">{{ currentTable.name }}</el-tag>
      </el-form-item>
      <el-form-item label="表注释:" required>
        <el-input v-model="currentTable.comment"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="warning" @click="modifyTableComment()">
          修改
        </el-button>
        <el-button @click="data.tableVisible = false">取消</el-button>
      </span>
    </template>
  </el-dialog>
  <!--  列数据修改面板-->
  <el-dialog v-model="data.columnVisible" title="修改表注释" style="width: 40%;min-width: 500px">
    <el-form label-width="100">
      <el-form-item label="列名:" required>
        {{ editColumn.column }}
      </el-form-item>
      <el-form-item label="列注释:" required>
        <el-input v-model="editColumn.comment"></el-input>
      </el-form-item>
      <el-form-item label="枚举:">
        <el-switch v-model="editColumn.isEnum"/>
      </el-form-item>
      <el-form-item label="枚举数据:" :required="editColumn.isEnum" v-if="editColumn.isEnum">
        <el-select placeholder="选择框预览">
          <el-option v-for="(item,index) in editColumn.enumList" :key="index" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div style="width: 400px;margin:0 auto" v-if="editColumn.isEnum">
      <table style="width: 100%;text-align: center">
        <tr>
          <th>枚举名</th>
          <th>枚举值</th>
          <th>操作</th>
        </tr>
        <tr>
          <td>
            <el-input style="width: 150px" v-model="editColumnEnum.name"/>
          </td>
          <td>
            <el-input style="width: 150px" v-model="editColumnEnum.value"/>
          </td>
          <td>
            <el-tooltip content="添加枚举" placement="top">
              <el-button circle icon="Plus" type="success" plain @click="addEnum()"
                         :disabled="editColumnEnum.name===''||editColumnEnum.value===''"/>
            </el-tooltip>
          </td>
        </tr>
        <tr v-for="(item,index) in editColumn.enumList" :key="index">
          <td>{{ item.name }}</td>
          <td>{{ item.value }}</td>
          <td>
            <el-tooltip placement="top" content="移除枚举">
              <el-button icon="delete" type="danger" plain circle @click="removeEnum(index)"/>
            </el-tooltip>
          </td>
        </tr>
      </table>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="warning" @click="modifyColumnComment()">
          修改
        </el-button>
        <el-button @click="data.columnVisible = false">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {useStore} from "vuex";
import {onMounted, reactive, ref} from "vue";
import {
  net_generatorCode,
  net_modifyColumnComment,
  net_modifyTableComment,
  net_sqlTable,
  net_testSql
} from "@/api/generator";
import Default from "vuedraggable";
//基础数据
const store = useStore();
const data = ref({
  generatorRange: "all",
  tableVisible: false,
  columnVisible: false,
  tabIndex: 0,
})
const presetsColor = reactive([
  {
    mode: "极简",
    value: ["#FFFFFF", "#FFFFFF", "#FFFFFF"],
  },
  {
    mode: "柔和",
    value: ["#FFCCCC", "#FFFFFF", "#99CC99"],
  },
  {
    mode: "爽朗",
    value: ["#CCFFFF", "#FFFFFF", "#CCCCFF"],
  },
  {
    mode: "快活",
    value: ["#99CC33", "#FFFFFF", "#FF6600"],
  },
  {
    mode: "华丽",
    value: ["#FF9933", "#FFFF00", "#336699"],
  },
  {
    mode: "高雅",
    value: ["#FFFF99", "#993399", "#FF99CC"],
  },
  {
    mode: "优雅",
    value: ["#FFCCCC", "#FF99CC", "#CCCCFF"],
  },
  {
    mode: "稳重",
    value: ["#FFFFCC", "#CC9933", "#336666"],
  },
  {
    mode: "黑白",
    value: ["#FFFFFF", "#333333", "#FFFFFF"],
  }
])
let publicMode = ref({
  buttonStyle: {
    mode: "按钮样式",
    source: "auto",
    sourceList: [
      {
        key: "随机",
        value: "auto"
      },
      {
        key: "默认",
        value: "default"
      },
      {
        key: "淡雅",
        value: "plain"
      }
    ]
  },
  bottom: {
    mode: "底部展示",
    source: "auto",
    sourceList: [
      {
        key: "随机",
        value: "auto"
      }
    ]
  },
})
let backMode = ref({
  backTop: {
    mode: "后台头部导航栏",
    source: "auto",
    sourceList: [
      {
        key: "随机",
        value: "auto"
      }
    ]
  },
  backLeft: {
    mode: "后台侧边导航栏",
    source: "auto",
    sourceList: [
      {
        key: "随机",
        value: "auto"
      }
    ]
  },
  filterPlant: {
    mode: "过滤面板",
    source: "auto",
    sourceList: [
      {
        key: "随机",
        value: "auto"
      }
    ]
  },
  tableStyle: {
    mode: "表格样式",
    source: "auto",
    sourceList: [
      {
        key: "随机",
        value: "auto"
      }
    ]
  },
})
let beforeMode = ref({
  beforeTop: {
    mode: "前端头部导航栏",
    source: "auto",
    sourceList: [
      {
        key: "随机",
        value: "auto"
      }
    ]
  },
  beforeLeft: {
    mode: "前端侧边导航栏",
    source: "auto",
    sourceList: [
      {
        key: "随机",
        value: "auto"
      }
    ]
  },
  productCard: {
    mode: "产品展示卡片",
    source: "auto",
    sourceList: [
      {
        key: "随机",
        value: "auto"
      }
    ]
  },
  infoStrip: {
    mode: "信息展示条",
    source: "auto",
    sourceList: [
      {
        key: "随机",
        value: "auto"
      }
    ]
  },
  productCategory: {
    mode: "产品分类",
    source: "auto",
    sourceList: [
      {
        key: "随机",
        value: "auto"
      }
    ]
  },
})
let beforePages = ref([
  {
    page: "首页",
    source: "auto",
    sourceList: [
      {
        key: "随机",
        value: "auto"
      }
    ]
  },
  {
    page: "商品分类",
    source: "auto",
    sourceList: [
      {
        key: "随机",
        value: "auto"
      }
    ]
  },
  {
    page: "商品详情",
    source: "auto",
    sourceList: [
      {
        key: "随机",
        value: "auto"
      }
    ]
  },
  {
    page: "网站介绍",
    source: "auto",
    sourceList: [
      {
        key: "随机",
        value: "auto"
      }
    ]
  },
  {
    page: "我的界面",
    source: "auto",
    sourceList: [
      {
        key: "随机",
        value: "auto"
      }
    ]
  },
  {
    page: "登录注册",
    source: "auto",
    sourceList: [
      {
        key: "随机",
        value: "auto"
      }
    ]
  }
])
let editColumn = reactive({
  column: "",
  comment: "",
  isEnum: false,
  enumList: [],
})
let editColumnEnum = ref({
  name: "",
  value: ""
})
let projectData = ref({
  projectName: "",
  modelName: "",
  presetColor: "极简",
  backgroundColor: "#FFFFFF",
  assistColor: "#FFFFFF",
  spotColor: "#FFFFFF"
})
let sqlData = ref({
  url: "",
  drive: "",
  user: "",
  password: ""
})
let dataData = ref([]);// 全部表数据
let generatorTable = ref([]);//需生成表数据
let tableData = ref([]);//table展示数据
let currentTable = ref({
  name: "",
  comment: "",
})
//方法
onMounted(async () => {
  resolveInfoSession();
  if(!isBankItem(sqlData.value.url)){
    await syncTableData();
  }
})
//切换预设颜色
const changePresetColor = (colorArr) => {
  projectData.value.backgroundColor = colorArr[0];
  projectData.value.assistColor = colorArr[1];
  projectData.value.spotColor = colorArr[2];
  saveInfoSession("data");
}
//同步表数据
const syncTableData = async () => {
  if (verifySql()) {
    dataData.value = (await net_sqlTable(sqlData._rawValue)).data;
    for (let i = 0; i < dataData.value.length; i++) {
      for (let j = 0; j < generatorTable.value.length; j++) {
        if (generatorTable.value[j].name === dataData.value[i].name) {
          generatorTable.value[j] = dataData.value[i];
        }
      }
    }
    changeTab(data.value.tabIndex);
  }
}
//修改表注释
const modifyTableComment = async () => {
  if (isBankItem(currentTable.value.comment)) {
    store.commit("tip", {code: 100, message: "请输入表注释"})
  } else {
    data.value.tableVisible = false;
    let res = await net_modifyTableComment({"sqlData": sqlData._rawValue, "dataMap": currentTable._rawValue})
    store.commit("tip", res);
    await syncTableData();
    saveInfoSession("generatorTable");
  }
}
//修改列注释
const modifyColumnComment = async () => {
  if (isBankItem(editColumn.comment)) {
    store.commit("tip", {code: 100, message: "请输入列注释"})
  } else if (editColumn.enumList.length <= 0 && editColumn.isEnum) {
    store.commit("tip", {code: 100, message: "请添加枚举数据"})
  } else {
    data.value.columnVisible = false;
    let req = {
      "name": currentTable.value.name,
      "column": editColumn.column,
      "columnType": editColumn.type,
      "comment": editColumn.comment,
      "charLength": editColumn.charLength,
      "enumList": editColumn.enumList,
      "isEnum": editColumn.isEnum
    }
    let res = await net_modifyColumnComment({"sqlData": sqlData._rawValue, "dataMap": req});
    store.commit("tip", res);
    await syncTableData();
    saveInfoSession("generatorTable");
  }
}
//新增枚举
const addEnum = () => {
  editColumn.enumList.push({name: editColumnEnum.value.name, value: editColumnEnum.value.value});
  editColumnEnum.value.name = "";
  editColumnEnum.value.value = "";
}
//删除枚举
const removeEnum = (index) => {
  editColumn.enumList.splice(index, 1);
}
//column注释修改
const editColumnBefore = (item) => {
  data.value.columnVisible = true
  editColumn.column = item.column;
  editColumn.comment = item.comment;
  editColumn.isEnum = item.isEnum;
  editColumn.type = item.type;
  editColumn.charLength = item.charLength;
  if (isBankItem(item.enumList)) {
    editColumn.enumList = [];
  } else {
    editColumn.enumList = item.enumList;
  }
}
//tab删除
const tabRemove = (index) => {
  generatorTable.value.splice(index, 1);
  saveInfoSession("generatorTable");
}
//数据库类型转java类型
const sqlToJavaType = (type) => {
  switch (type) {
    case 'char':
    case 'text':
    case 'varchar':
      return "String";
    case 'smallint':
    case 'mediumint':
    case 'tinyint':
      return "Integer";
    case 'id':
    case 'bigint':
      return "Long";
    case 'boolean':
    case 'bit':
      return "Boolean";
    case 'float':
      return "float";
    case 'double':
      return "double";
    case 'blob':
      return "byte";
    case 'date':
    case 'datetime':
      return "Date";
    default:
      return type;
  }
}
//测试sql连接
const testSql = async () => {
  if (verifySql()) {
    let res = await net_testSql(sqlData._rawValue);
    if (res.code === 200) {
      store.commit("tip", {code: 200, message: "数据连接成功!"})
    } else {
      store.commit("tip", res);
    }
  }
}
//切换标签页
const changeTab = (index) => {
  if (generatorTable.value.length > 0) {
    tableData.value = generatorTable.value[index].data;
    currentTable.value.name = generatorTable.value[index].name;
    currentTable.value.comment = generatorTable.value[index].comment;
    saveInfoSession("generatorTable");
    saveInfoSession("tabIndex")
  }
}
//展示数据显示
const saveTableData = () => {
  if (generatorTable.value.length > 0) {
    tableData.value = generatorTable.value[0].data;
    currentTable.value.name = generatorTable.value[0].name;
    currentTable.value.comment = generatorTable.value[0].comment;
  } else {
    tableData.value = [];
    currentTable.value.name = "";
    currentTable.value.comment = "";
  }
  saveInfoSession("generatorTable");
}
//验证sql数据
const verifySql = () => {
  let res = {
    code: 100,
    message: ""
  }
  if (isBankItem(sqlData.value.url)) {
    res.message = "请输入数据库地址";
  } else if (isBankItem(sqlData.value.drive)) {
    res.message = "请选择数据库驱动";
  } else if (isBankItem(sqlData.value.user)) {
    res.message = "请输入用户名";
  } else if (isBankItem(sqlData.value.password)) {
    res.message = "请输入密码";
  }
  if (res.message === "") {
    return true;
  } else {
    store.commit("tip", res);
    return false;
  }
}
//实时保存数据本地
const saveInfoSession = (dataLabel) => {
  switch (dataLabel) {
    case "data":
      sessionStorage.setItem(dataLabel, JSON.stringify(data.value));
      break;
    case "projectData":
      sessionStorage.setItem(dataLabel, JSON.stringify(projectData.value));
      break;
    case "sqlData":
      sessionStorage.setItem(dataLabel, JSON.stringify(sqlData.value));
      break;
    case "generatorTable":
      sessionStorage.setItem("generatorTable", JSON.stringify(generatorTable.value));
      sessionStorage.setItem("tableData", JSON.stringify(tableData.value));
      sessionStorage.setItem("currentTable", JSON.stringify(currentTable.value));
      break;
    case "tabIndex":
      sessionStorage.setItem(dataLabel, JSON.stringify(data.value.tabIndex));
      break;
    case "publicMode":
      sessionStorage.setItem(dataLabel,JSON.stringify(publicMode.value));break;
    case "beforeMode":
      sessionStorage.setItem(dataLabel,JSON.stringify(beforeMode.value));break;
    case "backMode":
      sessionStorage.setItem(dataLabel,JSON.stringify(backMode.value));break;
  }
}
//本地解析并溶入其中
const resolveInfoSession = () => {
  let sData = sessionStorage.getItem("data");
  let sProjectData = sessionStorage.getItem("projectData");
  let sSqlData = sessionStorage.getItem("sqlData");
  let sGeneratorTable = sessionStorage.getItem("generatorTable");
  let sTableData = sessionStorage.getItem("tableData");
  let sCurrentTable = sessionStorage.getItem("currentTable");
  let sTabIndex = sessionStorage.getItem("tabIndex");
  let sPublicMode = sessionStorage.getItem("publicMode");
  let sBeforeMode = sessionStorage.getItem("beforeMode");
  let sBeforePages = sessionStorage.getItem("beforePages");
  let sBackMode = sessionStorage.getItem("backMode");
  if (!isBankItem(sData)) {
    data.value = JSON.parse(sData);
  }
  if (!isBankItem(sProjectData)) {
    projectData.value = JSON.parse(sProjectData);
  }
  if (!isBankItem(sSqlData)) {
    sqlData.value = JSON.parse(sSqlData);
  }
  if (!isBankItem(sGeneratorTable)) {
    generatorTable.value = JSON.parse(sGeneratorTable)
  }
  if (!isBankItem(sTableData)) {
    tableData.value = JSON.parse(sTableData);
  }
  if (!isBankItem(sCurrentTable)) {
    currentTable.value = JSON.parse(sCurrentTable);
  }
  if (!isBankItem(sTableData)) {
    data.value.tabIndex = parseInt(sTabIndex);
  }
  if(!isBankItem(sPublicMode)){
    publicMode.value=JSON.parse(sPublicMode);
  }
  if(!isBankItem(sBeforeMode)){
    beforeMode.value=JSON.parse(sBeforeMode);
  }
  if(!isBankItem(sBackMode)){
    backMode.value=JSON.parse(sBackMode);
  }
  if(!isBankItem(sBeforePages)){
    beforePages.value=JSON.parse(sBeforePages);
  }
}
//为空
const isBankItem = (item) => {
  return item === null || item === undefined || item === "" || item === "undefined";
}

//代码生成
const generatorCode=async()=>{
  let res= await net_generatorCode(generatorTable.value)
}
</script>

<style scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>