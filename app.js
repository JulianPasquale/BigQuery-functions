const express      = require('express')
const path         = require('path')
const cookieParser = require('cookie-parser')
const logger       = require('morgan')

const indexRouter  = require('./routes/index')
const searchRouter = require('./routes/api/v1/search')

// Formatters
const success = require('./middlewares/response/success_parser')
const error   = require('./middlewares/response/error_parser')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/api/v1/search', searchRouter)

app.use(success)
app.use(error)

module.exports = app
