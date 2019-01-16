require('appoptics-apm')

const Koa = require('koa')
const Router = require('koa-router')
const jwt = require('koa-jwt')
const { ApolloServer } = require('apollo-server-koa')

const schema = require('./data/schema')

const app = new Koa()
const router = new Router()

const timeout = ms => new Promise(res => setTimeout(res, ms))

router.get('/', (ctx) => {
  ctx.body = 'Hello world'
})

router.get('/foo', (ctx) => {
  ctx.body = 'Called the foo'
})

router.get('/bar', async (ctx) => {
  await timeout(5000)
  ctx.body = 'you are barred'
})

app.use(jwt({
  secret: 'secret',
  passthrough: true
}))

const publicServer = new ApolloServer({
  schema,
  context: ({ ctx }) => {
    console.log('ctx', ctx)
    return {}
  }
})
publicServer.applyMiddleware({
  app
})

app.use(router.routes())
app.use(router.allowedMethods())


app.listen(3333)
