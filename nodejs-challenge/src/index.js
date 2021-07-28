const express = require('express')
require('dotenv').config()

const app = express()

require('./app/database')

const routes = require('./routes')

app.use(express.json())

app.use(express.urlencoded({
    extended: false
}));

app.use(routes)


app.listen(process.env.PORT || 3333)
