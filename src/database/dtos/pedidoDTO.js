import z from "zod";

const pedidoDTO = z.object({
  usuario_id: z.string({
    required_error: "usuario_id é obrigatório",
    invalid_type_error: "usuario_id deve ser uma string",
  }),
  produtos_ids: z.array(
    z.string({
      required_error: "Cada produto_id deve ser uma string",
      invalid_type_error: "Cada produto_id deve ser uma string",
    }),
    {
      required_error: "produtos_ids é obrigatório",
      invalid_type_error: "produtos_ids deve ser um array de strings",
    }
  ),
});

export default pedidoDTO;
