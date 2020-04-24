require('dotenv').config()

const express      = require('express')
const path         = require('path')
const cookieParser = require('cookie-parser')
const logger       = require('morgan')

const app     = express()
var expressWs = require('express-ws')(app)

// Global routers.
const indexRouter = require('./routes/index')
const apiV1Router = require('./api/v1/router')
const apiV2Router = require('./api/v2/router')

// Allow v2 router to use web sockets.
expressWs.applyTo(apiV2Router)

// Sets up websockets in global router.
// const expressWs = require('express-ws')(app)

// Middlewares.
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)

// API routes.
app.use('/api/v1', apiV1Router)
app.use('/api/v2', apiV2Router)

module.exports = app
