# Agenda Telefônica

Este projeto é uma aplicação de agenda telefônica utilizando Fastify, onde é possível gerenciar contatos e seus respectivos telefones.

## Tecnologias Utilizadas

- Node.js
- Fastify
- TypeScript
- Prisma
- Postgres
- Docker
- Zod
- Dotenv
- Nodemon
- Jest
- Supertest

## Funcionalidades

- Criar, buscar, atualizar e deletar contatos.
- Adicionar, buscar, atualizar e deletar telefones de um contato.

## Requisitos

- Node.js
- npm
- Docker

## Instalação

1. Clone o repositório:

    ```bash
    git clone https://github.com/Pedro-Cecilio/agenda-telefonica-backend.git
    ```

2. Navegue até o diretório do projeto:

    ```bash
    cd sua-agenda-telefonica
    ```

3. Instale as dependências:

    ```bash
    npm install
    ```

## Preparando o Ambiente

1. **Garanta que o Docker esteja em execução**
    - Certifique-se de que o Docker está instalado e rodando na sua máquina.

2. **Execute o Docker Compose**
    - Para executar o `docker-compose.yml`, use o seguinte comando:
        ```bash
        npm run docker:up
        ```

3. **Rode as Migrations no Banco de Dados de Desenvolvimento**
    - Após a execução do Docker Compose, execute o seguinte comando para rodar as migrations:
        ```bash
        npm run migrate:dev
        ```

4. **Execute o Servidor**
    - Após a execução de todos os passos anteriores, inicie o servidor da aplicação:
        ```bash
        npm start
        ```

## Execução dos Testes

1. **Rodando Todos os Testes**
    - Para executar todos os testes da aplicação, utilize o seguinte comando:
        ```bash
        npm run test
        ```
    Esse comando será responsável por preparar todo o ambiente para execução dos testes e garantir que os testes de integração utilizem um banco isolado para testes.
