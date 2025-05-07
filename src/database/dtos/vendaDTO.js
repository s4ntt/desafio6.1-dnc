import z from "zod";

const vendaDTO = z.object({
  pedido_id: z.string({
    required_error: "pedido_id é obrigatório",
    invalid_type_error: "pedido_id deve ser uma string",
  }),
  usuario_id: z.string({
    required_error: "usuario_id é obrigatório",
    invalid_type_error: "usuario_id deve ser uma string",
  }),
});

export default vendaDTO;
