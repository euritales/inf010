const express = require("express");
const compras = require("./Controllers/compras");

const rotas = express();

rotas.get("/compras", compras.listarCompras);

// --- --- CRUD --- ---
// rotas.get("/compras/:id", compras.obterCompra);
// rotas.post("/compras", compras.cadastrarCompra);
// rotas.put("/compras/:id", compras.atualizarCompra);
// rotas.delete("/compras/:id", compras.deletarCompra);

module.exports = rotas;
