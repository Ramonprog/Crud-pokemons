const express = require("express");
const routes = express();


const { 
    creatingANewUser, 
    login 
} = require("./controllers/users");

const verificarUsuarioLogado = require("./middleware/autenticacao");

const {
    criandoPoke,
    atualizandoApelidoDoPokemon,
    todospokes,
    selecionandoPoke,
    deletandopoke,
} = require("./controllers/poke");

routes.post("/usuario", creatingANewUser);
routes.post("/login", login);

routes.use(verificarUsuarioLogado);

routes.post("/pokemon", criandoPoke);
routes.post("/alterandoApelido", atualizandoApelidoDoPokemon);
routes.get("/pokemon", todospokes)
routes.get("/pokemon/:id", selecionandoPoke)
routes.delete('/pokemon/:id', deletandopoke)

module.exports = routes;
