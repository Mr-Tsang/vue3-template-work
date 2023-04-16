import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
const source = axios.CancelToken.source();
import { ElMessage } from 'element-plus';
import { Code, Method } from '@/types/code';

/**
 * @description 请求公共方法
 * @param method 请求方法
 * @param url 请求地址
 * @param params 请求参数
 * @returns 请求promise
 */
function axiosMethod(method: Method, url: string, params: object): Promise<AxiosResponse> {
    const API = 'development' === process.env.NODE_ENV ? `/proxy${url}` : `${url}`;
    let axiosParams: AxiosRequestConfig = {
        method,
        url: API,
        cancelToken: source.token,
    };
    axiosParams.headers = {
        'Cache-Control': 'must-revalidate,no-cache,no-store',
        "appId": ""
    };
    if ([Method.Get, Method.Delete].includes(method)) {
        axiosParams.params = params;
    } else if ([Method.Post, Method.Put].includes(method)) {
        axiosParams.data = params;
    }
    return new Promise((resolve, reject) => {
        axios(axiosParams).then(({ data }: AxiosResponse) => {
            //用户掉线
            if (Code.STATUS_USER_LOST === data.code || Code.STATUS_USER_OFFLINE === data.code) {
                // 跳转登陆界面
            } else if (Code.STATUS_HTTP_SUCCESS === data.code) {
                //返回成功
                resolve(data.result);
            } else {
                //后端返回失败
                ElMessage.error(data.resultMessage || data.codeMsg)
                console.error(data.resultMessage || data.codeMsg);
                reject(data);
            }
        }).catch((error: AxiosError) => {
            //内部错误
            console.error(error.message);
            reject(error);
        });
    })
};

export default {
    get(url: string, params: object = {}): Promise<AxiosResponse> {
        return axiosMethod(Method.Get, url, params);
    },

    post(url: string, params: object = {}): Promise<AxiosResponse> {
        return axiosMethod(Method.Post, url, params);
    },

    delete(url: string, params: object = {}): Promise<AxiosResponse> {
        return axiosMethod(Method.Delete, url, params);
    },

    put(url: string, params: object = {}): Promise<AxiosResponse> {
        return axiosMethod(Method.Put, url, params);
    },
    //取消请求
    cancel(): void {
        source.cancel('已取消本次请求');
    }
};