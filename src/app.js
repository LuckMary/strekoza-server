import Koa from 'koa'

import bodyParser from 'koa-bodyparser'

import { port } from './constants/config'
import { router } from './routes'

const app = new Koa()

app.use(bodyParser())

router.get('/', ctx => {
  ctx.body = { hello: 'world' }
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(port, () =>
  console.log(`✓ Started API server at http://localhost:${port}`),
)
