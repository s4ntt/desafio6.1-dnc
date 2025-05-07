import mongoose from "mongoose";

const VendaSchema = new mongoose.Schema(
  {
    // NÃO PRECISA DE ID PRIMÁRIO ELE É GERADO AUTOMATICAMENTE PELO MONGO!!!!!!!!!!!
    pedido_id: {
      type: mongoose.Types.ObjectId,
      ref: "Pedido",
      required: true,
      unique: true,
    },
    usuario_id: {
      type: mongoose.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    valor_total: {
      type: mongoose.Schema.Types.Decimal128,
    },
    resumo_produtos: {
      type: Map,
      of: Number,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const Venda = mongoose.model("Venda", VendaSchema);

export default Venda;
