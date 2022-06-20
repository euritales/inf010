const express = require("express"); // Cria servidores HTTP
const rotas = require("./routes");
const app = express();

app.use(express.json());
app.use(rotas);

app.listen(3000);
