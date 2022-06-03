import Router from '@koa/router'

import user from './user'
import posts from './posts'
import post from './post'

export const router = new Router({})

router.use(user.routes()).use(user.allowedMethods())
router.use(posts.routes()).use(posts.allowedMethods())
router.use(post.routes()).use(post.allowedMethods())
