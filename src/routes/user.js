import Router from '@koa/router'

const route = new Router({ prefix: '/user' })

route.get('/', ctx => {
  ctx.body = { user: 'user' }
})

export default route
