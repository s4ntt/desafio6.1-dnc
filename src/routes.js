import express from "express";
import Usuario from "./database/models/Usuario.js";
import Produto from "./database/models/Produto.js";
import Pedido from "./database/models/Pedido.js";
import Estoque from "./database/models/Estoque.js";
import Venda from "./database/models/Venda.js";

import vendaDTO from "./database/dtos/vendaDTO.js";
import usuarioDTO from "./database/dtos/usuarioDTO.js";
import estoqueDTO from "./database/dtos/estoqueDTO.js";
import produtoDTO from "./database/dtos/produtoDTO.js";
import pedidoDTO from "./database/dtos/pedidoDTO.js";

const router = express.Router();

router.get("/usuarios", async (req, res) => {
  try {
    const data = await Usuario.find();

    if (data?.length === 0) {
      return res.status(404).send({ message: "Usuarios nao encontrados" });
    }

    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post("/usuarios", async (req, res) => {
  try {
    const checkData = usuarioDTO.safeParse(req?.body);

    if (!checkData.success) {
      return res.status(400).send({ errors: checkData.error.flatten() });
    }

    const data = await Usuario.create(req.body);
    return res.status(201).send(data);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .send({ message: "Já existe um usuario com este valor único." });
    }

    return res.status(500).send(error);
  }
});

// PRODUTOS

router.get("/produtos", async (req, res) => {
  try {
    const data = await Produto.find();
    if (data?.length === 0) {
      return res.status(404).send({ message: "Produtos nao encontrados" });
    }

    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get("/produtos/:id", async (req, res) => {
  try {
    if (!req?.params?.id) {
      return res.status(400).send({ message: "Voce deve enviar um id" });
    }

    const data = await Produto.findById({ _id: req.params.id });

    if (data?.length === 0) {
      return res.status(404).send({ message: "Produto nao encontrado" });
    }

    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post("/produtos", async (req, res) => {
  try {
    const checkData = produtoDTO.safeParse(req?.body);

    if (!checkData.success) {
      return res.status(400).send({ errors: checkData.error.flatten() });
    }

    const data = await Produto.create(req.body);
    return res.status(201).send(data);
  } catch (error) {
    return res.status(500).send(error);
  }
});

// ESTOQUES

router.get("/estoque", async (req, res) => {
  try {
    const data = await Estoque.find();

    if (data?.length === 0) {
      return res.status(404).send({ message: "Estoque nao encontrado" });
    }
    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post("/estoque", async (req, res) => {
  try {
    const produto = await Produto.findOne({ _id: req.body.produto_id });
    console.log("PRODT", produto);
    if (!produto) {
      return res.status(404).send({ message: "Produto nao encontrado" });
    }

    const checkData = estoqueDTO.safeParse(req?.body);

    if (!checkData.success) {
      return res.status(400).send({ errors: checkData.error.flatten() });
    }

    const dbResponse = await Estoque.create(req.body);
    return res.status(201).send(dbResponse);
  } catch (error) {
    console.log("err", error);

    return res.status(500).send(error);
  }
});

// PEDIDOS

router.get("/pedido", async (req, res) => {
  try {
    const data = await Pedido.find();

    if (data?.length === 0) {
      return res.status(404).send({ message: "Pedidos nao encontrados" });
    }

    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post("/pedido", async (req, res) => {
  try {
    const checkData = pedidoDTO.safeParse(req?.body);

    if (!checkData.success) {
      return res.status(400).send({ errors: checkData.error.flatten() });
    }

    const dataToDb = req.body;

    const produtos = await Produto.find({
      _id: { $in: req.body.produtos_ids },
    });

    if (!produtos) {
      return res.status(404).send("Pedido não encontrado.");
    }

    console.log(produtos);

    let valor_total = 0;

    for (let i = 0; i < produtos.length; i++) {
      valor_total += Number(produtos[i].preco_produto);
    }

    req.body.valor_total_pedido = valor_total;

    const data = await Pedido.create(req.body);
    return res.status(201).send(data);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get("/vendas", async (req, res) => {
  try {
    const data = await Venda.find();

    if (data?.length === 0) {
      return res.status(404).send({ message: "Vendas nao encontradas" });
    }

    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post("/vendas", async (req, res) => {
  try {
    const checkData = vendaDTO.safeParse(req?.body);

    if (!checkData.success) {
      return res.status(400).send({ errors: checkData.error.flatten() });
    }
    const { pedido_id, usuario_id } = req.body;

    const pedido = await Pedido.findById(pedido_id).populate("produtos_ids");

    if (!pedido) {
      return res.status(404).send("Pedido não encontrado.");
    }

    const valor_total = pedido.valor_total_pedido;

    const resumo_produtos = {};
    pedido.produtos_ids.forEach((produto) => {
      const id = produto._id.toString();
      resumo_produtos[id] = 1;
    });

    console.log({
      pedido_id,
      usuario_id,
      valor_total,
      resumo_produtos,
    });

    const data = await Venda.create({
      pedido_id,
      usuario_id,
      valor_total,
      resumo_produtos,
    });

    return res.status(201).send(data);
  } catch (error) {
    return res.status(500).send(error);
  }
});

export default router;
