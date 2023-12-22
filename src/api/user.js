import request from "./request";

export function net_addUser(data){
    return request({
        url:'/user',
        method:'post',
        data
    })
}

export function net_removeUser(id){
    return request({
        url:'/user'+id,
        method:'delete',
    })
}

export function net_modifyUser(data){
    return request({
        url:'/user',
        method:'put',
        data
    })
}

export function net_findAll(){
    return request({
        url:'/user',
        method:'get',
    })
}

export function net_findUserBy(data){
    return request({
        url:'/user/',
        method:'patch',
        data
    })
}