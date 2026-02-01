export const AppRoutes = [
    { 
        path: "/", 
        name:'layout',
        redirect: '/dashboard',
        component: ()=>import('@layout/home/index.vue'),
    },
    { 
        path: "/login", 
        name:'登录',
        component: ()=>import('@views/login/index.vue') 
    }
]