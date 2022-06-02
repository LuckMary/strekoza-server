import Koa from 'koa'
import Router from '@koa/router'
import bodyParser from 'koa-bodyparser'

import { port } from './constants/config'
import { postsRoute } from './routes/posts' // импортируешь

const app = new Koa()
const router = new Router({})

app.use(bodyParser())

router.get('/', ctx => {
  ctx.body = { hello: 'world' }
})

router.use(postsRoute.routes()).use(postsRoute.allowedMethods()) // подключаешь
app.use(router.routes()).use(router.allowedMethods())

app.listen(port, () =>
  console.log(`✓ Started API server at http://localhost:${port}`),
)
