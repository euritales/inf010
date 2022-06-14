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
    const conjuntos = [
      {
        nome: "leiteCafe",
        quantidade: 0,
        suporte: 0,
        resistencia: 0,
      },
      {
        nome: "leiteCerveja",
        quantidade: 0,
        suporte: 0,
        resistencia: 0,
      },
      { nome: "leitePao", quantidade: 0, suporte: 0, resistencia: 0 },
      {
        nome: "leiteManteiga",
        quantidade: 0,
        suporte: 0,
        resistencia: 0,
      },
      {
        nome: "cafePao",
        quantidade: 0,
        suporte: 0,
        resistencia: 0,
      },
      { nome: "cafeManteiga", quantidade: 0, suporte: 0, resistencia: 0 },
      {
        nome: "cervejaPao",
        quantidade: 0,
        suporte: 0,
        resistencia: 0,
      },
      { nome: "paoManteiga", quantidade: 0, suporte: 0, resistencia: 0 },
    ];

    const { rows: compras } = await conexao.query(
      "select leite, cafe, cerveja, pao, manteiga, arroz, feijao from compra_associacao"
    );

    for (let i = 0; i < compras.length; i++) {
      //  Verificar Juncoes
      if (compras[i].leite) {
        itens[0].qtd++;
        if (compras[i].cafe) {
          conjuntos[0].quantidade++;
        }
        if (compras[i].cerveja) {
          conjuntos[1].quantidade++;
        }
        if (compras[i].pao) {
          conjuntos[2].quantidade++;
        }
        if (compras[i].manteiga) {
          conjuntos[3].quantidade++;
        }
      }
      if (compras[i].cafe) {
        itens[1].qtd++;
        if (compras[i].pao) {
          conjuntos[4].quantidade++;
        }
        if (compras[i].manteiga) {
          conjuntos[5].quantidade++;
        }
      }
      if (compras[i].cerveja) {
        itens[2].qtd++;
      }
      if (compras[i].pao) {
        itens[3].qtd++;
        if (compras[i].cerveja) {
          conjuntos[6].quantidade++;
        }
        if (compras[i].manteiga) {
          conjuntos[7].quantidade++;
        }
      }
      if (compras[i].manteiga) {
        itens[4].qtd++;
      }
      if (compras[i].arroz) {
        itens[5].qtd++;
      }
      if (compras[i].feijao) {
        itens[6].qtd++;
      }
    }
    for (let conjunto of conjuntos) {
      conjunto.suporte = parseFloat(conjunto.quantidade / compras.length);
      console.log(conjunto);
    }
    console.log("--- Quantidade Produtos ---");
    for (const item of itens) {
      console.log(item.nome + ": " + item.qtd);
    }

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
