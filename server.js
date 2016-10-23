const path = require('path')
const express = require('express')
const app = express()
const indexPath = path.join(__dirname, '/src/public/index.html')
const publicPath = express.static(path.join(__dirname, '/dist'))
app.use('/dist', publicPath)
app.get('/', function (_, res) { res.sendFile(indexPath) })

app.listen(process.env.PORT || 8080);

