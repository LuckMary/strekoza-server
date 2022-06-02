import Router from '@koa/router'

export const postsRoute = new Router({ prefix: '/posts' })

postsRoute.get('/', ctx => {
  ctx.body = { posts: 'posts' }
})
