// 导入axios
import axios from 'axios'

import Vue from 'vue'
import router from './router/index'

// 这里设置后端接口的IP和端口号
const IP = 'localhost'
const PORT = 3001

// 创建axios实例
const http = axios.create({
    baseURL: `http://${IP}:${PORT}/admin/api`
})

// 处理后台发送的message信息显示到前端
http.interceptors.response.use(
    res => {
        if( res.status === 200 && res.data.message ) {
            Vue.prototype.$message({
                type: 'success',
                message: res.data.message
            })
        }
        return res
    }, err => {
        if( err.response.data.message ) {
            Vue.prototype.$message({
                type: 'error',
                message: err.response.data.message
            })

        }
        
    }
)

// 暴露模块
export default http
