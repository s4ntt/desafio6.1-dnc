import z from "zod";

const estoqueDTO = z.object({
  produto_id: z.string({
    required_error: "produto_id é obrigatório",
    invalid_type_error: "produto_id deve ser uma string",
  }),
  quantidade_estoque: z.number({
    required_error: "quantidade_estoque é obrigatório",
    invalid_type_error: "quantidade_estoque deve ser um número",
  }),
});

export default estoqueDTO;
