import Request from "@/api/request";

export function net_testSql(data){
    return Request({
        url:"/test_sql",
        method:"post",
        data
    })
}

export function net_sqlTable(data){
    return Request({
        url:"/sql_table",
        method:"post",
        data
    })
}

export function net_modifyTableComment(data){
    return Request({
        url:"/modify_table_comment",
        method:"post",
        data
    })
}

export function net_modifyColumnComment(data){
    return Request({
        url:"/modify_column_comment",
        method:"post",
        data
    })
}

export function net_generatorCode(data){
    return Request({
        url:"/generator_code",
        method:"post",
        data
    })
}