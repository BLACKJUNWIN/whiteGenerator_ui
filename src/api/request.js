import axios from 'axios'
import store from "../store"
import router from "../router"
import {ElMessage} from "element-plus";
// let baseUrl="http://106.55.26.247:443";
let baseUrl="http://localhost:8085";
export {baseUrl};

let starTime;
let reqTime;
export {reqTime};

const instance = axios.create({
    baseURL: baseUrl,//生产环境
    timeout: 50000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})
// http request 请求拦截器
instance.interceptors.request.use(
    config => {
        if(config.url.includes("/GptClient/generateEverything")){
            store.state.gptLoading=true;
            starTime=(new Date().valueOf());
        }else{
            store.state.loading=true;
        }
        let token = sessionStorage.getItem("token")
        if (token) {
            config.headers.token = token;
        }
        return config;
    },
    err => {
        store.state.loading=false;
        store.state.gptLoading=false;
        ElMessage({
            message: '请求出现问题,请联系管理员',
            type: 'error',
        })
        return {
            data:{
                code: 500,
                message: "网络请求失败",
                data:err,
            },
        };
    }
)
// http response 响应拦截器
instance.interceptors.response.use(
    response => {
        if(response.data.result!==undefined){
            if(response.data.result.code===20002||response.data.result.code===20001){
                router.push('/login')
                ElMessage({
                    message: '令牌失效,请重新登录',
                    type: 'warning',
                })
                sessionStorage.clear();
            }
            store.state.loading=false;
            store.state.gptLoading=false;
            return {
                data:{
                    code: 500,
                    message: "网络请求失败",
                },
            }
        }else {
            store.state.loading=false;
            if(store.state.gptLoading){
                store.state.gptLoading=false;
                reqTime=(new Date().valueOf())-starTime;
            }
            return response.data;
        }
    },
    error => {
        store.state.loading=false;
        store.state.gptLoading=false;
        ElMessage({
            message: '反馈出现问题,请联系管理员',
            type: 'error',
        })
        return {
            data:{
                code: 500,
                message: "网络请求失败",
                data:error,
            },
        };
    })
export default instance;