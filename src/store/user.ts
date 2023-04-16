// 定义
import { defineStore } from 'pinia';
import axios from "axios";
import { State } from '@/types/store'
import { Code } from '@/types/code'

const url = 'development' === process.env.NODE_ENV ? "/proxy" : ""

export const userStore = defineStore('user', {
    state: () => {
        return {
            userName: '', //用户名
            menu:[],//左侧菜单栏
        } as State
    },
    getters: {
        isLogin: (state: State) => !!state.userName,
    },
    actions: {
        getUserInfo() {
            return new Promise<number>((resolve, reject) => {
                axios.defaults.headers.get['appId'] = "";
                axios.get(url + "/", {},).then(({ data }: any) => {
                    if (Code.STATUS_USER_LOST === data.code || Code.STATUS_USER_OFFLINE === data.code) {
                        // 用户信息丢失/用户掉线
                        reject();
                    } else {
                        // 接口返回成功-设置state
                        this.userName = data.result.realName;
                        this.menu = data.result.menu;
                        resolve(Code.STATUS_HTTP_SUCCESS);
                    }
                }).catch(err => {
                    console.error(err);
                });
            })
        }
    },
})