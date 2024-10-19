const express = require('express')
const app = express()
const port = 3001
const config = {
    host: 'db',
    user: 'devops',
    password: 'devops',
    database: 'devops'
};
const mysql = require('mysql2') // Alterado para mysql2
const connection = mysql.createConnection(config)

const sql = `INSERT INTO people(name) values('Devops')`
connection.query(sql, (err, results) => {
    if (err) {
        console.error('Erro ao executar a query:', err)
    } else {
        console.log('Query executada com sucesso:', results)
    }
})
connection.end()

app.get('/', (req, res) => {
    res.send('<h1>Full Cycle</h1>')
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})
