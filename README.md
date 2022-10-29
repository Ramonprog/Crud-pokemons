# API Pokemons 

RESTful API para listagem de pokemons, desenvolvida em Node.js com JavaScript e Express.js,
usando Bcrypt para encriptar senhas e Jwt para autenticar usuario!

## Features

### Criação e login de usuários

#### Criando usuário

```http
  POST /usuario
```
Esse endpoint, é responsável pela criação de conta do treinador Pokemon.

#### Login

```http
  POST /login
```
Esse endpoint, é responsável pela autenticação, permitindo que apenas usuários logados consigam 
acessar endpoints. 

#### Adicionando um pokemon

```http
  POST /pokemon
```
Esse endpoint, é responsável por adicionar pokemons ao usuário caso esteja logado, proibindo pokemons duplicados. 

#### Alteração

```http
  POST /alterandoApelido
```
Esse endpoint, é responsável por alterar o apelido do Pokemon, que tal em vez de "Bulbasaur" chaamar "Bulba".

#### Listagem Pokemons

```http
  GET /pokemon
```
Esse endpoint, é responsável por listar todos os seu pokes.

#### Filtrando poke

```http
  GET /pokemon/:id
```
Esse endpoint, é responsável por filtrar a listagem de pokes pelo id, retornando apenas 1 Poke.

#### Deletando Poke

```http
  DELETE /pokemon/:id
```
Esse endpoint, é responsável deletar um determinado pokemon.



## 🔗 Links
[![Instagram](https://img.shields.io/badge/instagram-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://www.instagram.com/ramondev1/)
[![linkedin](https://img.shields.io/badge/linkedin-ff0000?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ramon-dev/)


## 🛠 Skills
Node.js, Express, PostgresSQL, API, JavaScript
