import z from "zod";

const produtoDTO = z.object({
  nome_produto: z.string({
    required_error: "nome_produto é obrigatório",
    invalid_type_error: "nome_produto deve ser uma string",
  }),
  preco_produto: z.string({
    required_error: "preco_produto é obrigatório",
    invalid_type_error: "preco_produto deve ser uma string",
  }),
  descricao_produto: z
    .string({
      invalid_type_error: "descricao_produto deve ser uma string",
    })
    .optional(),
});

export default produtoDTO;
