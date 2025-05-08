# ENJUUEI - Compra e venda de produtos usados

Este projeto contempla a aplicação front-end (enjuuei-front), back-end (enjuuei-api) e o banco de dados (enjuuei_db) rodando em containers Docker.

## Desenvolvido por:
- ANA PAULA GOULART ARAUJO 
- DANIEL HENRIQUE GOMES MANTOVANI
- ISMAEL DOS SANTOS CARDOSO 
- MARIA CECILIA BENTO GONCALVES 
- RENAN PRIMO
- SERGIO LEONARDO SOUZA TAVARES 
- [VINÍCIUS GIUSEPPE G. L. DE OLIVEIRA](https://github.com/vinigiu)

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

## Contrato da API
- Login: `POST /user/login`
    - Request:
    ```` 
    {
        email: "email@email.com",
        password: "password"
    }
    ````
    - Response 200:
    ```` 
        {
            success: true,
        }
    ````
    - Response Cookie:
    ```` 
        access_token: {token}
    ````
- Criação de usuário: `POST /user/register`
    - Request:
    ```` 
        {
            name: "João",
            lastName: "das Neves",
            email: "email@email.com",
            phone: "11987654321",
            document: "12345678900"
        }
    ````
    - Response 200:
    ```` 
        {
            success: true
        }
    ````
- Alteração de usuário: `PATCH /user`
    - Request Header: `Authorization: Bearer {token}`
    - Request:
    ```` 
        {
            name: "João",
            lastName: "das Neves",
            email: "email@email.com",
            phone: "11987654321",
            document: "12345678900"
        }
    ````
    - Response 200:
    ```` 
        {
            success: true
        }
    ````
- Listagem de Produtos: `GET /product`
    - Response 200:
    ```` 
        {
            products: [
                {
                    id: "uuid",
                    title: "Produto 1",
                    description: "Descrição do produto 1",
                    price: 120.31,
                    images: [
                        {
                            id: "uuid",
                            source: "path/to/image"
                        }
                    ],
                    ownerUser: {
                        name: "João",
                        lastName: "das Neves",
                    },
                    category: {
                        title: "Categoria A",
                    }
                }
            ]
        }
    ````
- Listagem de Categories: `GET /product/category`
    - Request Header: `Authorization: Bearer {token}`
    - Response 200:
    ```` 
        {
            categories: [
                {
                    id: "uuid",
                    title: "Produto 1",
                    description: "Descrição do produto 1",
                }
            ]
        }
    ````
- Registro de Produto: `POST /product`
    - Request Header: `Authorization: Bearer {token}`
    - Request:
    ```` 
        {
            title: "Produto 2",
            description: "Descrição do produto 2",
            price: 120.31,
            images: [],
            categoryId: "uuid de Category",
        }
    ````
    - Response 200:
    ```` 
        {
            success: true
        }
    ````
- Edição de Produto: `PATCH /product/:id`
    - Request Header: `Authorization: Bearer {token}`
    - Request:
    ```` 
        {
            title: "Produto 2",
            description: "Descrição do produto 2",
            price: 120.31,
            images: [],
            categoryId: "uuid de Category",
        }
    ````
    - Response 200:
    ```` 
        {
            success: true
        }
    ````
- Exclusão de Produto: `DELETE /product/:id`
    - Request Header: `Authorization: Bearer {token}`
    - Response 200:
    ```` 
        {
            success: true
        }
    ````
- Detalhe de Produto: `GET /product/:id`
    - Response 200:
    ```` 
        {
            id: "uuid",
            title: "Produto 1",
            description: "Descrição do produto 1",
            price: 120.31,
            images: [
                {
                    id: "uuid",
                    source: "path/to/image"
                }
            ],
            ownerUser: {
                name: "João",
                lastName: "das Neves",
            },
            category: {
                title: "Categoria A",
            }
        }
    ````
- Listagem do Carrinho: `GET /user/chart`
    - Request Header: `Authorization: Bearer {token}`
    - Response 200:
    ```` 
        {
            products: [
                {
                    id: "uuid",
                    title: "Produto 1",
                    description: "Descrição do produto 1",
                    price: 120.31,
                    images: [
                        {
                            id: "uuid",
                            source: "path/to/image"
                        }
                    ],
                    ownerUser: {
                        name: "João",
                        lastName: "das Neves",
                    },
                    category: {
                        title: "Categoria A",
                    }
                }
            ]
        }
    ````
- Criação de Pedidos: `POST /order`
    - Request Header: `Authorization: Bearer {token}` 
    - Request:
    ```` 
        {
            products: ["uuid produto 1", "uuid produto 2"]
        }
    ````
    - Response 200:
    ```` 
        {
            success: true
        }
    ````
- Listagem de Pedidos do Usuário: `GET /order`
    - Request Header: `Authorization: Bearer {token}` 
    - Response 200:
    ```` 
        {
            orders: [
                {
                    id: "uuid de order",
                    products: [
                        {
                            id: "uuid",
                            title: "Produto 1",
                            description: "Descrição do produto 1",
                            price: 120.31,
                            images: [
                                {
                                    id: "uuid",
                                    source: "path/to/image"
                                }
                            ],
                            ownerUser: {
                                name: "João",
                                lastName: "das Neves",
                            },
                            category: {
                                title: "Categoria A",
                            }
                        }
                    ],
                    status: "PENDING"
                }
            ]
        }
    ````