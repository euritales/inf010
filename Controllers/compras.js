const conexao = require("../connection");

const listarCompras = async (req, res) => {
  const query = `select count(*) from compra_associacao where $1 = true`;

  try {
    const itens = [
      {
        nome: "leite",
        quantidade: 0,
      },
      { nome: "cafe", quantidade: 0 },
      { nome: "cerveja", quantidade: 0 },
      { nome: "pao", quantidade: 0 },
      {
        nome: "manteiga",
        quantidade: 0,
      },
      {
        nome: "arroz",
        quantidade: 0,
      },
      { nome: "feijao", quantidade: 0 },
    ];
    const conjuntos = [
      {
        nome: "leiteCafe",
        antecedente: "leite",
        consequente: "cafe",
        quantidade: 0,
        suporte: 0,
        confianca: 0,
      },
      {
        nome: "leiteCerveja",
        antecedente: "leite",
        consequente: "cerveja",
        quantidade: 0,
        suporte: 0,
        confianca: 0,
      },
      {
        nome: "leitePao",
        antecedente: "leite",
        consequente: "pao",
        quantidade: 0,
        suporte: 0,
        confianca: 0,
      },
      {
        nome: "leiteManteiga",
        antecedente: "leite",
        consequente: "manteiga",
        quantidade: 0,
        suporte: 0,
        confianca: 0,
      },
      {
        nome: "cafePao",
        antecedente: "cafe",
        consequente: "pao",
        quantidade: 0,
        suporte: 0,
        confianca: 0,
      },
      {
        nome: "cafeManteiga",
        antecedente: "cafe",
        consequente: "manteiga",
        quantidade: 0,
        suporte: 0,
        confianca: 0,
      },
      {
        nome: "cervejaPao",
        antecedente: "cerveja",
        consequente: "pao",
        quantidade: 0,
        suporte: 0,
        confianca: 0,
      },
      {
        nome: "paoManteiga",
        antecedente: "pao",
        consequente: "manteiga",
        quantidade: 0,
        suporte: 0,
        confianca: 0,
      },
    ];

    const { rows: compras } = await conexao.query(
      "select leite, cafe, cerveja, pao, manteiga, arroz, feijao from compra_associacao"
    );

    for (let i = 0; i < compras.length; i++) {
      //  Verificar Juncoes
      if (compras[i].leite) {
        itens[0].quantidade++;
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
        itens[1].quantidade++;
        if (compras[i].pao) {
          conjuntos[4].quantidade++;
        }
        if (compras[i].manteiga) {
          conjuntos[5].quantidade++;
        }
      }
      if (compras[i].cerveja) {
        itens[2].quantidade++;
      }
      if (compras[i].pao) {
        itens[3].quantidade++;
        if (compras[i].cerveja) {
          conjuntos[6].quantidade++;
        }
        if (compras[i].manteiga) {
          conjuntos[7].quantidade++;
        }
      }
      if (compras[i].manteiga) {
        itens[4].quantidade++;
      }
      if (compras[i].arroz) {
        itens[5].quantidade++;
      }
      if (compras[i].feijao) {
        itens[6].quantidade++;
      }
    }
    for (let conjunto of conjuntos) {
      conjunto.suporte = parseFloat(conjunto.quantidade / compras.length);
      for (const item of itens) {
        if (conjunto.antecedente == item.nome) {
          console.log("\n|- - - - - - - - - - - - - - - - - - - - -|");
          console.log("|  Antecedente: " + conjunto.antecedente);
          console.log("|  Consequente: " + conjunto.consequente);
          console.log("|  Suporte(%): " + conjunto.suporte * 100);
          console.log(
            "|  Confianca(%): " +
              parseFloat((conjunto.quantidade / item.quantidade) * 100).toFixed(
                2
              )
          );
        }
        if (conjunto.consequente == item.nome) {
          console.log("\n|- - - - - - - - - - - - - - - - - - - - -|");
          console.log("|  Antecedente: " + conjunto.consequente);
          console.log("|  Consequente: " + conjunto.antecedente);
          console.log("|  Suporte(%): " + conjunto.suporte * 100);
          console.log(
            "|  Confianca(%): " +
              parseFloat((conjunto.quantidade / item.quantidade) * 100).toFixed(
                2
              )
          );
        }
      }
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
