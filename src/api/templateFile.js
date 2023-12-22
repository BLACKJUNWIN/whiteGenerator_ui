import Request from "@/api/request";

export function net_addTemplateFile(data){
    return Request({
        url:"/templateFile/",
        method:"post",
        data
    })
}

export function net_removeTemplateFile(id){
    return Request({
        url:"/templateFile/"+id,
        method:"delete",
    })
}

export function net_modifyTemplateFile(data){
    return Request({
        url:"/templateFile/",
        method:"put",
        data
    })
}

export function net_getTemplateFile(){
    return Request({
        url:"/templateFile/",
        method:"get",
    })
}

export function net_findTemplateFile(data){
    return Request({
        url:"/templateFile/",
        method:"patch",
        data
    })
}