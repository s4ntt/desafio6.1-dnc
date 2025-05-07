import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema(
  // NÃO PRECISA DE ID PRIMÁRIO ELE É GERADO AUTOMATICAMENTE PELO MONGO!!!!!!!!!!!
  {
    nome_usuario: { type: String, required: true },
    email_usuario: { type: String, required: true, unique: true },
    senha_usuario: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Usuario = mongoose.model("Usuario", UsuarioSchema);
export default Usuario;
