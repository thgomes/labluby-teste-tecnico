const express = require('express')

const app = express()

require('./app/database')

const routes = require('./routes')

app.use(express.json())

app.use(express.urlencoded({
    extended: false
}));

app.use(routes)


app.listen(3333)
