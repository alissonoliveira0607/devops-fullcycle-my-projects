const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

const config = {
    host: 'db',
    user: 'devops',
    password: 'devops',
    database: 'devops'
};

const maxRetries = 5; // Número máximo de tentativas
let currentAttempt = 0; // Tentativas atuais

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

const connectWithRetry = async () => {
    while (currentAttempt < maxRetries) {
        try {
            await sleep(20000); // Espera 20 segundos antes de cada tentativa
            
            // Cria a conexão após o sleep
            const connection = mysql.createConnection(config);

            // Tenta conectar
            await new Promise((resolve, reject) => {
                connection.connect(err => {
                    if (err) {
                        return reject(err);
                    }
                    resolve();
                });
            });

            console.log('Conectado ao MySQL com sucesso.');

            // Executa a query após uma conexão bem-sucedida
            const sql = `INSERT INTO people(name) values('teste')`;
            connection.query(sql, (error, results) => {
                if (error) {
                    console.error('Erro ao executar a query:', error);
                } else {
                    console.log('Inserção bem-sucedida:', results);
                }
                connection.end(); // fecha a conexão após a consulta
            });

            break; // Sai do loop se a conexão for bem-sucedida

        } catch (err) {
            currentAttempt++;
            console.error(`Erro ao conectar ao MySQL: ${err}. Tentativa ${currentAttempt} de ${maxRetries}`);
            if (currentAttempt >= maxRetries) {
                console.error('Número máximo de tentativas alcançado. Encerrando a aplicação.');
                process.exit(1); // Encerra a aplicação após falhas de conexão
            }
        }
    }
};

// Inicia a tentativa de conexão
connectWithRetry();

app.get('/', (req, res) => {
    res.send('<h1>Full Cycle</h1>');
});

app.listen(port, () => {
    console.log('Rodando na porta ' + port);
});
