import mongoose from "mongoose";

const ProdutoSchema = new mongoose.Schema(
  // NÃO PRECISA DE ID PRIMÁRIO ELE É GERADO AUTOMATICAMENTE PELO MONGO!!!!!!!!!!!
  {
    nome_produto: { type: String, required: true },
    descricao_produto: { type: String },
    preco_produto: { type: mongoose.Types.Decimal128, required: true },
  },
  {
    timestamps: true,
  }
);

const Produto = mongoose.model("Produto", ProdutoSchema);
export default Produto;
