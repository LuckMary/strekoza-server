/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
import Koa from 'koa'
import mongoose from 'mongoose'

import bodyParser from 'koa-bodyparser'

import { port, isDevelopment, mongoURI } from './constants/config'
import { router } from './routes'
import { Post, Tag, User, Comment } from './models'

const app = new Koa()

app.use(bodyParser())

router.get('/', ctx => {
  ctx.body = { hello: 'world' }
})

app.use(router.routes()).use(router.allowedMethods())

const mocks = async () => {
  const userIds = []

  for (let index = 0; index < 10; index++) {
    const user = await User.create({
      name: Math.random().toString(36).slice(2, 7),
      password: Math.random().toString(36).slice(2, 7),
    })

    userIds.push(user.id)
  }

  const tagsIds = []

  for (let index = 0; index < 10; index++) {
    const tag = await Tag.create({
      name: Math.random().toString(36).slice(2, 7),
    })

    tagsIds.push(tag.id)
  }

  userIds.forEach(async userId => {
    const postIds = []
    for (let index = 0; index < 10; index++) {
      const post = await Post.create({
        title: 'post',
        body: 'test',
        owner: userId,
        tags: tagsIds
          .sort(() => 0.5 - Math.random())
          .slice(0, Math.floor(Math.random() * 10) + 1),
      })

      // comments
      for (let index1 = 0; index1 < 3; index1++) {
        const comment = await Comment.create({
          body: Math.random().toString(36).slice(2, 7),
          owner: userId,
          post: post.id,
        })
      }
    }
  })

  //   const tag = await Tag.create({
  //     name: 'tag',
  //   })

  //   const post = await Post.create({
  //     title: 'post',
  //     body: 'test',
  //     owner: user.id,
  //     tags: [tag.id],
  //   })

  //   const comment = await Comment.create({
  //     body: 'body',
  //     owner: user.id,
  //     post: post.id,
  //   })
}

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(({ connections: [info] }) => {
    console.log(
      `✓ DB connected to ${info.host}:${info.port}, database: ${info.name}`,
    )
    mongoose.set('debug', isDevelopment)
    app.listen(port, () =>
      console.log(`✓ Started API server at http://localhost:${port}`),
    )
    // mocks()
  })
  .catch(console.log)
