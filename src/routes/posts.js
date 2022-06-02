import Router from '@koa/router'

const route = new Router({ prefix: '/posts' })

route.get('/', ctx => {
  ctx.body = { posts: 'posts' }
})

export default route
