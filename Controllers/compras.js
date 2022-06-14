const conexao = require("../connection");

const listarCompras = async (req, res) => {
  const query = `select count(*) from compra_associacao where $1 = true`;

  try {
    const itens = [
      {
        nome: "leite",
        qtd: 0,
      },
      { nome: "cafe", qtd: 0 },
      { nome: "cerveja", qtd: 0 },
      { nome: "pao", qtd: 0 },
      {
        nome: "manteiga",
        qtd: 0,
      },
      {
        nome: "arroz",
        qtd: 0,
      },
      { nome: "feijao", qtd: 0 },
    ];
    const conjunto = [
      {
        leiteCafe: 0,
      },
      {
        leiteCerveja: 0,
      },
      { leitePao: 0 },
      {
        leiteManteiga: 0,
      },
      {
        cafePao: 0,
      },
      { cafeManteiga: 0 },
      {
        cervejaPao: 0,
      },
      { paoManteiga: 0 },
      { leiteArroz: 0 },
    ];

    const { rows: compras } = await conexao.query(
      "select leite, cafe, cerveja, pao, manteiga, arroz, feijao from compra_associacao"
    );

    for (let i = 0; i < compras.length; i++) {
      let produtos = Object.getOwnPropertyNames(compras[i]);
      // for(let produto of produtos)

      console.log("+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+");
      let verificador = compras[i].leite
        ? itens[0].qtd++
        : (itens[0].qtd = itens[0].qtd);
      verificador = compras[i].cafe
        ? itens[1].qtd++
        : (itens[1].qtd = itens[1].qtd);
      verificador = compras[i].cerveja
        ? itens[2].qtd++
        : (itens[2].qtd = itens[2].qtd);
      verificador = compras[i].pao
        ? itens[3].qtd++
        : (itens[3].qtd = itens[3].qtd);
      verificador = compras[i].manteiga
        ? itens[4].qtd++
        : (itens[4].qtd = itens[4].qtd);
      verificador = compras[i].arroz
        ? itens[5].qtd++
        : (itens[5].qtd = itens[5].qtd);
      verificador = compras[i].feijao
        ? itens[6].qtd++
        : (itens[6].qtd = itens[6].qtd);
      // for (let j = 0; j < itens.length; j++) {}
      // if (produtos[j] == itens[j].nome) {
      //   // console.log("Que isso, meu fio. Calma!");
      // }
    }
    console.log(produtos);
    console.log(itens[0].qtd);
    console.log(itens[1].qtd);
    console.log(itens[2].qtd);
    console.log(itens[3].qtd);
    console.log(itens[4].qtd);
    console.log(itens[5].qtd);
    console.log(itens[6].qtd);
    return res.status(200).json(compras);
  } catch (error) {
    return res.status().json(error.message);
  }
};

// --- --- CRUD --- ---

// const obterCompra = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const { rows: compra } = await conexao.query(
//       "select count() $1 from compra_associacao where arroz = true ",
//       [id]
//     );

//     return res.status(200).json(compra);
//   } catch (error) {
//     return res.status().json(error.message);
//   }
// };
// const cadastrarCompra = async (req, res) => {};
// const atualizarCompra = async (req, res) => {};
// const deletarCompra = async (req, res) => {};

module.exports = {
  listarCompras,
  //   obterCompra,
  //   cadastrarCompra,
  //   atualizarCompra,
  //   deletarCompra,
};
