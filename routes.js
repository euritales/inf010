const express = require("express");
const compras = require("./Controllers/compras");

const rotas = express();

rotas.get("/compras", compras.listarCompras);

module.exports = rotas;
