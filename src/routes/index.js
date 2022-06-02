import Router from '@koa/router'

import posts from './posts'
import user from './user'

export const router = new Router({})

router.use(posts.routes()).use(posts.allowedMethods())
router.use(user.routes()).use(user.allowedMethods())
