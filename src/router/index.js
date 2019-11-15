import Vue from 'vue'
import VueRouter from 'vue-router'
// 前提是home下必须有index文件
import Layout from '../views/layout'
import Login from '../views/login'
import Home from '../views/home'
import Article from '../views/article'
import Publish from '../views/publish'
import Comment from '../views/comment'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/layout'

  },
  {
    // 一级路由
    path: '/layout',
    name: 'layout',
    component: Layout,
    children: [
      {
        // 默认路由
        path: '',
        component: Home
      },
      {
        // 文章列表
        path: '/article',
        component: Article
      },
      {
        // 发布文章
        path: '/publish',
        component: Publish
      },
      // 评论列表
      {
        path: '/comment',
        component: Comment
      }
    ]
  },
  {
    // 一级路由
    path: '/login',
    name: 'login',
    component: Login
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})
// 路由拦截    所有页面
// to 去哪里的路由信息
// from 来自哪里
//  next  是个方法 用来路由的放行
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
    // 停止代码往后执行
    return
  }
  // 判断   获取用户token 是否有
  const token = window.localStorage.getItem('user-token')
  if (token) {
    next()
  } else {
    // 跳转到指定页面
    next('/login')
  }
})
export default router
