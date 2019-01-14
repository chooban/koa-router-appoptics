require('appoptics-apm')

const Koa = require('koa')
const Router = require('koa-router')

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

app.use(router.routes())

app.listen(3333)
