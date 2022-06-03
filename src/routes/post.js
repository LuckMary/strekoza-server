import Router from '@koa/router'
import { Post, Comment } from '../models'

const route = new Router({ prefix: '/post' })

route.get('/:id', async ctx => {
  //   const page = parseInt(ctx.params.page, 10) || 1
  //   const limit = 10

  const post = await Post.findById(ctx.params.id)
  // .sort({ createdAt: -1 })
  // .skip(page * limit)
  // .limit(limit)
  // { status: 'published' }

  const comments = await Comment.find({
    post: post.id,
  }).sort({ createdAt: -1 })

  ctx.body = { post, comments }
})

export default route
