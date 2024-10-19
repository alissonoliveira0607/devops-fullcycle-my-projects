const mysql = require('mysql2');
const express = require('express');
const app = express();
const port = 3001;

const config = {
    host: 'db',
    user: 'devops',
    password: 'devops',
    database: 'devops'
};

function connectWithRetry() {
    const connection = mysql.createConnection(config);
    
    connection.connect(err => {
        if (err) {
            console.error('Erro ao conectar ao MySQL, tentando novamente em 5 segundos:', err);
            setTimeout(connectWithRetry, 5000); // Tenta novamente em 5 segundos
        } else {
            console.log('Conectado ao MySQL!');
            const sql = `INSERT INTO people(name) values('Devops')`;
            connection.query(sql, (err, results) => {
                if (err) console.error('Erro ao executar a query:', err);
                else console.log('Query executada com sucesso:', results);
            });
            connection.end();
        }
    });
}

connectWithRetry();

app.get('/', (req, res) => {
    res.send('<h1>Full Cycle</h1>');
});

app.listen(port, () => {
    console.log('Rodando na porta ' + port);
});
