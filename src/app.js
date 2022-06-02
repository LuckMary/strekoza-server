/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
import Koa from 'koa'
import mongoose from 'mongoose'
import { faker } from '@faker-js/faker'

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
    const gender = Math.random() < 0.7 ? 'female' : 'male'
    const user = await User.create({
      name: faker.name.firstName(gender),
      password: Math.random().toString(36).slice(2, 7),
      birthday: faker.date.birthdate({ min: 11, max: 110, mode: 'age' }),
      gender,
      avatar: faker.image.avatar(),
    })

    userIds.push(user.id)
  }

  const tagsIds = []

  for (let index = 0; index < 10; index++) {
    const tag = await Tag.create({
      name: faker.lorem.words(Math.floor(Math.random() * 4) + 1),
    })

    tagsIds.push(tag.id)
  }

  userIds.forEach(async userId => {
    // const postIds = []
    const date = faker.date.between(
      '2021-06-02T00:00:00.000Z',
      '2022-06-02T00:00:00.000Z',
    )
    for (let index = 0; index < 10; index++) {
      const post = await Post.create({
        title: faker.lorem.sentence(),
        body: faker.lorem.paragraph(5),
        owner: userId,
        tags: tagsIds
          .sort(() => 0.5 - Math.random())
          .slice(0, Math.floor(Math.random() * 4)),
        photo: faker.image.cats(1234, 2345, true),
        createdAt: date,
        updatedAt: date,
      })

      // comments
      for (let index1 = 0; index1 < 3; index1++) {
        const date2 = faker.date.between(
          '2021-06-02T00:00:00.000Z',
          '2022-06-02T00:00:00.000Z',
        )
        const comment = await Comment.create({
          body: faker.lorem.sentences(),
          owner: userId,
          post: post.id,
          createdAt: date2,
          updatedAt: date2,
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
