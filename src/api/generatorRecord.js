import Request from "@/api/request";

export function net_addGeneratorRecord(data){
    return Request({
        url:"/generatorRecord/",
        method:"post",
        data
    })
}

export function net_removeGeneratorRecord(id){
    return Request({
        url:"/generatorRecord/"+id,
        method:"delete",
    })
}

export function net_modifyGeneratorRecord(data){
    return Request({
        url:"/generatorRecord/",
        method:"put",
        data
    })
}

export function net_getGeneratorRecord(){
    return Request({
        url:"/generatorRecord/",
        method:"get",
    })
}

export function net_findGeneratorRecord(data){
    return Request({
        url:"/generatorRecord/",
        method:"patch",
        data
    })
}