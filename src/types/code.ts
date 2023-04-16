//系统状态码
export enum Code {
    //接口返回成功
    STATUS_HTTP_SUCCESS = 0,
    //用户信息丢失
    STATUS_USER_LOST = -88,
    //用户掉线
    STATUS_USER_OFFLINE = -99
}
export enum Method {
    Get = 'get',
    Post = 'post',
    Delete = 'delete',
    Put = 'put'
}
