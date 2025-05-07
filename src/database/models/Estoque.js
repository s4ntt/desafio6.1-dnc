import mongoose from "mongoose";

const EstoqueSchema = new mongoose.Schema(
  // NÃO PRECISA DE ID PRIMÁRIO ELE É GERADO AUTOMATICAMENTE PELO MONGO!!!!!!!!!!!
  {
    produto_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Produto",
      required: true,
      unique: true,
    },
    quantidade_estoque: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Estoque = mongoose.model("Estoque", EstoqueSchema);
export default Estoque;
