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

            // Cria a tabela se não existir
            const createTableSQL = `
                CREATE TABLE IF NOT EXISTS people (
                    id INT NOT NULL AUTO_INCREMENT,
                    name VARCHAR(255),
                    PRIMARY KEY (id)
                );
            `;
            connection.query(createTableSQL, (error) => {
                if (error) {
                    console.error('Erro ao criar a tabela:', error);
                } else {
                    console.log('Tabela "people" criada ou já existe.');
                }
            });

            // Executa a query de inserção após a criação da tabela
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

app.get('/', async (req, res) => {
    const connection = mysql.createConnection(config);
    connection.query('SELECT * FROM people', (error, results) => {
        if (error) {
            return res.status(500).send('Erro ao acessar o banco de dados');
        }
        res.send(`<h1>Full Cycle Rocks!</h1><ul>${results.map(person => `<li>${person.name}</li>`).join('')}</ul>`);
        connection.end(); // fecha a conexão após a consulta
    });
});

app.listen(port, () => {
    console.log('Rodando na porta ' + port);
});
