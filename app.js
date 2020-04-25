/**
 * Reads config from .env files.
 */
require('dotenv').config()

/**
 * Require all middlewares.
 */
const express      = require('express')
const path         = require('path')
const cookieParser = require('cookie-parser')
const logger       = require('morgan')

/**
 * Creates an express app instance.
 */
const app = express()

/**
 * Configures express-ws library.
 * This line have to be located before any route definition.
 * Docs: https://github.com/HenningM/express-ws
 */
require('express-ws')(app)

/**
 * Global routers.
 * Allow sub routers to define routes with an implicit scope.
 */
const indexRouter = require('./routes/index')
const apiV1Router = require('./api/v1/router')
const apiV2Router = require('./api/v2/router')

/**
 * App instance use middlewares.
 */
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)

/**
 * API routes.
 */
app.use('/api/v1', apiV1Router)
app.use('/api/v2', apiV2Router)

/**
 * Exports app instance.
 */
module.exports = app
