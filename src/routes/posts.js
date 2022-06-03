import Router from '@koa/router'
import { Post } from '../models'

const route = new Router({ prefix: '/posts' })

route.get('/:page*', async ctx => {
  const page = parseInt(ctx.params.page, 10) || 1
  const limit = 10

  const posts = await Post.find({ status: 'published' })
    .sort({ createdAt: -1 })
    .skip(page * limit)
    .limit(limit)

  ctx.body = { posts }
})

export default route
