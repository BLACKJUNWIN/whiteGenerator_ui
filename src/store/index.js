import { createStore } from 'vuex'
import {ElMessage} from "element-plus";

/**
 * 创建仓库和导出
 */
export default createStore({
    state: {
        loading:false,
        gptLoading:false,
        pageLoading:false,
    },
    mutations: {
        tip(state,res){
            if(res.code===200||res.code==="200"){
                let message="操作成功";
                if(res.message){
                    message=res.message;
                }
                ElMessage({
                    message: message,
                    type: 'success',
                })
            }else if(res.code===100||res.code==="100"){
                let message="操作有误";
                if(res.message){
                    message=res.message;
                }
                ElMessage({
                    message: message,
                    type: 'warning',
                })
            }else{
                let message="操作异常";
                if(res.message){
                    message=res.message;
                }
                ElMessage.error(message);
            }
        },
        /**
         * 元素是否为空
         * @param state
         * @param item 元素
         * @returns {boolean} 是否为空
         */
        isNotBlank(state,item){
            switch (typeof item){
                case "bigint":
                case "number":return item!==0;
                case "string":return item!==null&&item!=="";
                case "undefined":return false;
                default: return false;
            }
        }
    },
    actions: {

    },
    modules: {

    }
})