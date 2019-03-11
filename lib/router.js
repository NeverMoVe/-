import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import login from '../src/components/login.vue'
import index from '../src/components/index.vue'
import users from '../src/components/users.vue'
const routes=[{
    path:'/login',
    component:login
},{
    path:'/index',
    component:index,
    children:[{
        path:'users',
        component:users
    }]
},]

const router = new VueRouter({
    routes
})

// 导航守卫，跳转路由时执行
router.beforeEach((to,from,next)=>{
    if(to.path=='/login'){
        next();
    }else{
        if(window.sessionStorage.getItem('token')){
            next();
        }else{
            Vue.prototype.$message.warning('哥们,先登录再来吧')
            next('/login')
        }
    }

})

export default router