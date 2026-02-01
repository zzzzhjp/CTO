import axios, { AxiosResponse } from 'axios'

const request = axios.create({
  baseURL: '/api'
})

request.interceptors.request.use((config) => {
    let token:string | null = localStorage.getItem('TOKEN')
    if(token){
        config.headers['Authorization'] = token
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

request.interceptors.response.use((response) =>{
    return response
}, (error) => {
    return Promise.reject(error)
})

const http = {
    get<T>(url:string, params?:any, config?: {}):Promise<T> {
        return new Promise((resolve,reject)=>{
            request
            .get<T>(url,{params,...config})
            .then((res:AxiosResponse)=>{
                resolve(res.data)
            })
            .catch((error) => {
                reject(error)
            })
        })
    },
    post<T>(url:string,data?:any,config?:{}):Promise<T> {
        return new Promise((resolve,reject)=>{
            request
            .post<T>(url,data,config)
            .then((res:AxiosResponse)=>{
                resolve(res.data)
            })
            .catch((error)=>{
                reject(error)
            })
        })
    }
}

export default http