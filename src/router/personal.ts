export default [{
  path: 'personal',
  name: 'personal',
  meta: {
    title: '用户信息',
    requireAuth: false,
    keepAlive: false
  },
  component: () => import('@/views/personal/Layout.vue'),
  children: [
    {
      path: '',
      name: 'userShow',
      meta: {
        title: '首页',
        requireAuth: false,
        keepAlive: false
      },
      component: () => import('@/views/personal/userInfo/userShow.vue')
    },
    {
      path: 'userinfo',
      name: 'userInfo',
      meta: {
        title: '用户信息',
        requireAuth: false,
        keepAlive: false
      },
      component: () => import('@/views/personal/userInfo/userInfo.vue')
    },{
      path: 'picturesetting',
      name: 'pictureSetting',
      meta: {
        title: '用户信息',
        requireAuth: false,
        keepAlive: false
      },
      component: () => import('@/views/personal/userInfo/pictureSetting.vue')
    },{
      path: 'livesetup',
      name: 'liveSetUp',
      meta: {
        title: '直播设置',
        requireAuth: false,
        keepAlive: false
      },
      component: () => import('@/views/personal/live/setUp.vue')
    },
  ]
}] 