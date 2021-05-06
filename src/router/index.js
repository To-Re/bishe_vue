import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '高校在线考试系统',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '高校在线考试系统', icon: 'dashboard' }
    }]
  },

  {
    path: '/klass',
    component: Layout,
    redirect: '/klass/list',
    name: '班级管理',
    meta: { title: '班级管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'list',
        name: '班级列表',
        component: () => import('@/views/klass/list'),
        meta: { title: '班级列表', icon: 'table' }
      },
      {
        path: 'create',
        name: '创建班级',
        component: () => import('@/views/klass/create'),
        meta: { title: '创建班级', icon: 'el-icon-edit' }
      },
      {
        path: 'update',
        name: '编辑班级',
        component: () => import('@/views/klass/update'),
        meta: { title: '编辑班级', icon: 'el-icon-edit' },
        hidden: true
      }
    ]
  },

  {
    path: '/question',
    component: Layout,
    redirect: '/question/list',
    name: '题目管理',
    meta: { title: '题目管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'list',
        name: '题目列表',
        component: () => import('@/views/question/list'),
        meta: { title: '题目列表', icon: 'table' }
      },
      {
        path: 'create',
        name: '创建题目',
        component: () => import('@/views/question/create'),
        meta: { title: '创建题目', icon: 'el-icon-edit' }
      },
      {
        path: 'update',
        name: '编辑题目',
        component: () => import('@/views/question/update'),
        meta: { title: '编辑题目', icon: 'el-icon-edit' },
        hidden: true
      }
    ]
  },

  {
    path: '/paper',
    component: Layout,
    redirect: '/paper/list',
    name: '考卷管理',
    meta: { title: '考卷管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'list',
        name: '考卷列表',
        component: () => import('@/views/paper/list'),
        meta: { title: '考卷列表', icon: 'table' }
      },
      {
        path: 'create',
        name: '创建考卷',
        component: () => import('@/views/paper/create'),
        meta: { title: '创建考卷', icon: 'el-icon-edit' }
      },
      {
        path: 'update',
        name: '编辑考卷',
        component: () => import('@/views/paper/update'),
        meta: { title: '编辑考卷', icon: 'el-icon-edit' },
        hidden: true
      },
      {
        path: 'detail_update',
        name: '配置考题',
        component: () => import('@/views/paper/detail_update'),
        meta: { title: '配置考题', icon: 'el-icon-edit' },
        hidden: true
      }
    ]
  },

  {
    path: '/exam',
    component: Layout,
    redirect: '/exam/list',
    name: '考试管理',
    meta: { title: '考试管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'list',
        name: '考试列表',
        component: () => import('@/views/exam/list'),
        meta: { title: '考试列表', icon: 'table' }
      },
      {
        path: 'create',
        name: '创建考试',
        component: () => import('@/views/exam/create'),
        meta: { title: '创建考试', icon: 'el-icon-edit' }
      },
      {
        path: 'update',
        name: '编辑考试',
        component: () => import('@/views/exam/update'),
        meta: { title: '编辑考试', icon: 'el-icon-edit' },
        hidden: true
      }
    ]
  },

  {
    path: '/result',
    component: Layout,
    redirect: '/result/list',
    name: '成绩管理',
    meta: { title: '成绩管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'list',
        name: '考试结束列表',
        component: () => import('@/views/result/list'),
        meta: { title: '考试结束列表', icon: 'el-icon-edit' }
      },
      {
        path: 'detail',
        name: '考试学生成绩列表',
        component: () => import('@/views/result/detail'),
        meta: { title: '考试学生成绩列表', icon: 'el-icon-edit' }
      },
      {
        path: 'paper_detail',
        name: '学生考卷详情',
        component: () => import('@/views/result/paper_detail'),
        meta: { title: '学生考卷详情', icon: 'el-icon-edit' }
      }
    ]
  },

  {
    path: '/student',
    component: Layout,
    name: '学生功能',
    redirect: '/student/info/update',
    meta: { title: '学生功能', icon: 'el-icon-s-help' },
    children: [{
        path: 'info/update',
        name: '学生个人信息修改',
        component: () => import('@/views/student/info_update'),
        meta: { title: '学生个人信息修改', icon: 'el-icon-s-help' }
      },
      {
        path: 'exam/list',
        name: '考试列表',
        component: () => import('@/views/student/exam_list'),
        meta: { title: '考试列表', icon: 'el-icon-edit' }
      },
      {
        path: 'exam/join',
        name: '参加考试',
        component: () => import('@/views/student/exam_join'),
        meta: { title: '参加考试', icon: 'el-icon-edit' },
        hidden: true
      }
    ]
  },

  

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
