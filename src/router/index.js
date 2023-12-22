import {createRouter, createWebHashHistory} from "vue-router";
let BeforeHome = () => import("@/view/before/BeforeHome")
let BeforeGenerator = () => import("@/view/before/item/generator")
let BeforeItemHome = () => import("@/view/before/item/home")
let BeforeItemBack = () => import("@/view/before/item/back")

let BackItemRecord= ()=>import("@/view/before/item/backItem/generatorRecord")
let BackItemFile= ()=>import("@/view/before/item/backItem/templateFile")
let BackItemPath= ()=>import("@/view/before/item/backItem/templatePath")
let BackItemUser= ()=>import("@/view/before/item/backItem/user")
const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes: [
        {
            path: "",
            redirect: "/before"
        },
        {
            path: "/",
            redirect: "/before"
        },
        {
            path: "/before",
            component: BeforeHome,
            children: [
                {
                  path: "",
                  redirect: "/before/home"
                },
                {
                    path: "/",
                    redirect: "/before/home"
                },
                {
                    path: "home",
                    component: BeforeItemHome,
                    meta: {
                        keepAlive: true
                    }
                },
                {
                    path: "generator",
                    component: BeforeGenerator,
                    meta: {
                        keepAlive: true
                    }
                },
                {
                    path: "back",
                    component: BeforeItemBack,
                    meta: {
                        keepAlive: true
                    },
                    children:[
                        {
                            path:"record",
                            name:"生成记录",
                            component:BackItemRecord
                        },
                        {
                            path:"path",
                            name:"模板路径",
                            component:BackItemPath
                        },
                        {
                            path:"file",
                            name:"模板文件",
                            component:BackItemFile
                        },
                        {
                            path:"user",
                            name:"用户管理",
                            component:BackItemUser
                        }
                    ]
                },
            ]
        }
    ]
})

// router.beforeEach((to, from, next)=>{
//
// })
export default router;