import Request from "@/api/request";

export function net_addTemplatePath(data){
    return Request({
        url:"/templatePath/",
        method:"post",
        data
    })
}

export function net_removeTemplatePath(id){
    return Request({
        url:"/templatePath/"+id,
        method:"delete",
    })
}

export function net_modifyTemplatePath(data){
    return Request({
        url:"/templatePath/",
        method:"put",
        data
    })
}

export function net_getTemplatePath(){
    return Request({
        url:"/templatePath/",
        method:"get",
    })
}

export function net_findTemplatePath(data){
    return Request({
        url:"/templatePath/",
        method:"patch",
        data
    })
}

export function net_getFileTree(){
    return Request({
        url:"/templatePath/getFileTree"
    })
}