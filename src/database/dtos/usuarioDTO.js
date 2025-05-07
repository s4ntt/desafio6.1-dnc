import z from "zod";

const usuarioDTO = z.object({
  nome_usuario: z.string({
    required_error: "nome_usuario é obrigatório",
    invalid_type_error: "nome_usuario deve ser uma string",
  }),
  email_usuario: z
    .string({
      required_error: "email_usuario é obrigatório",
      invalid_type_error: "email_usuario deve ser uma string",
    })
    .email("Este nao e um email valido!"),
  senha_usuario: z.string({
    required_error: "senha_usuario é obrigatório",
    invalid_type_error: "senha_usuario deve ser uma string",
  }),
});

export default usuarioDTO;
