#!/usr/bin/env node

/**
 * Module dependencies.
 */

const renderer = require('koa-hbs-renderer')
const respond = require('koa-respond')
const routes = require('./lib/routes')
const Router = require('koa-router')
const serve = require('koa-static')
const parser = require('koa-body')
const path = require('path')
const koa = require('koa')
const PORT = process.env.PORT || 3000

/**
 * Define `app`
 */

const app = new koa()
const router = new Router()

/**
 * Body parser.
 */

app.use(parser({ multipart: true }))

/**
 * Configure templating engine.
 */

app.use(renderer({
	paths: {
		views: path.resolve('client'),
		layouts: path.resolve('server/templates'),
		partials: path.resolve('server/templates/partials'),
		helpers: path.resolve('server/templates/helpers')
	},
	defaultLayout: 'layout'
}))

/**
 * Add response.
 */

app.use(respond())

/**
 * Configure routes.
 */

router.get('/', routes.index)

/**
 * Add routes.
 */

app.use(router.routes())
app.use(router.allowedMethods())

/**
 * Setup static directory.
 */

app.use(serve('client'))

/**
 * Listen on PORT.
 */

app.listen(PORT)
console.log('Listening on port ' + PORT)
