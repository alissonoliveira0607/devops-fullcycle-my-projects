# Node Stack - Full Cycle.

Este repositório contém uma aplicação simples em __*`Node.js`*__  que imprime "__*Full Cycle Rocks*__!!" e lista os dados no DB baseado no desafio proposto pela Full Cycle, desafio "__Nginx com Node.js__". A aplicação é construída e executada utilizando **Docker** e o processo de build e execução foi abstraído usando um __`Makefile`__.

## Estrutura do Projeto

- **`Dockerfile.prod`**: Define as etapas de build da aplicação construida em Node e execução da aplicação
- **`Dockerfile.nginx.prod`**: Define as etapas de build do nginx
- **`Makefile`**: Abstrai os comandos Docker para facilitar o build e a execução da aplicação.
- **`index.js`**: O código em Node.js da aplicação, que simplesmente imprime uma mensagem no console e lista os dados DB conforme o desafio proposto.
- **`nginx.conf`**: Arquivo de configuração responsavel pelo papel de proxy reverso.
- **`docker-compose.yaml`**: Realiza o deploy da stack

## Pré-requisitos

Certifique-se de ter os seguintes itens instalados em seu sistema:

- [Docker](https://www.docker.com/get-started)
- [Make](https://www.gnu.org/software/make/)

## Como Usar

### Build da Aplicação

O processo de build / deploy da stack é realizado utilizando Docker, a partir de um `docker-compose.yaml`.
- ###### *Mostra as opções do Make*
```bash
make help
```

- ###### *Sobe a stack*
```bash
make build
```

- ###### *Destroi a stack*
```bash
make destroy
```

### Caso não queira utilizar o Make se baseie no conteúdo / comandos dentro dele para buildar e executar a aplicação.


### Para acessar a aplicação acesse via browser o endereço:
```bash
docker http://localhost:8080
```
### *OBS:*

#### Lembre-se a aplicação demora alguns minutos até provisionar todos os recursos então vale a pensa esperar alguns instantes para acessa-la.