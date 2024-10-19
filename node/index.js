const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'devops',
    password: 'devops',
    database: 'devops'
}

const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sql = `INSERT INTO people(name) values('Teste')`
connection.query(sql)
connection.end()

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})