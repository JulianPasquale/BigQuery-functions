require('dotenv').config()

const express      = require('express')
const path         = require('path')
const cookieParser = require('cookie-parser')
const logger       = require('morgan')

const indexRouter = require('./routes/index')
const apiV1Router = require('./api/v1/router')
const apiV2Router = require('./api/v2/router')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)

// API routes
app.use('/api/v1', apiV1Router)
app.use('/api/v2', apiV2Router)

module.exports = app
