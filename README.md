# ENJUUEI - Compra e venda de produtos usados

Este projeto contempla a aplicação front-end (enjuuei-front), back-end (enjuuei-api) e o banco de dados (enjuuei_db) rodando em containers Docker.

## Requisitos
- Docker
- Docker Compose

## Inicialização do projeto completo
- Inicializando a aplicação: `docker compose up -d`
- A API estará exposta localmente na porta 3000
- O Front-end estará exposto localmente na porta 8080

## Inicialização da API para Dev
- Requisito: Node e NPM instalados na máquina local
- `cd enjuuei-api`
- `npm install`
- `npm run start:dev`
- A aplicação estará disponível na porta 3000

## Inicialização do Front para Dev
- 