const conexao = require("../connection");
const fs = require("fs");

const listarCompras = async (req, res) => {
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
        const detalhe = {
          antecedente: "",
          consequente: "",
          suporte: 0,
          confianca: 0,
        };
        if (conjunto.antecedente == item.nome) {
          detalhe.antecedente = conjunto.antecedente;
          detalhe.consequente = conjunto.consequente;
          detalhe.suporte = (conjunto.suporte * 100).toFixed(2);
          detalhe.confianca = parseFloat(
            (conjunto.quantidade / item.quantidade) * 100
          ).toFixed(2);
          relatorio(detalhe);
        }
        if (conjunto.consequente == item.nome) {
          detalhe.antecedente = conjunto.consequente;
          detalhe.consequente = conjunto.antecedente;
          detalhe.suporte = (conjunto.suporte * 100).toFixed(2);
          detalhe.confianca = parseFloat(
            (conjunto.quantidade / item.quantidade) * 100
          ).toFixed(2);
          relatorio(detalhe);
        }
      }
    }

    return res.status(200).json(compras);
  } catch (error) {
    return res.status().json(error.message);
  }
};

module.exports = {
  listarCompras,
};

function relatorio(props) {
  fs.writeFile(
    `./conjuntos/${props.antecedente}-${props.consequente}.txt`,
    `Antecedente:${props.antecedente} \nConsequente: ${props.consequente} \nSuporte(%): ${props.suporte} \nConfian??a(%): ${props.confianca}`,
    () => {
      return "Cadastrado!";
    }
  );
}
