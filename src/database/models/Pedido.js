import mongoose from "mongoose";

const PedidoSchema = new mongoose.Schema(
  // NÃO PRECISA DE ID PRIMÁRIO ELE É GERADO AUTOMATICAMENTE PELO MONGO!!!!!!!!!!!
  {
    usuario_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    data_pedido: {
      type: Date,
      default: Date.now,
    },
    status_pedido: {
      type: String,
      default: "criado",
      // criado - em transição - pago - entregue - erro
    },
    valor_total_pedido: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
    },
    produtos_ids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Produto",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Pedido = mongoose.model("Pedido", PedidoSchema);
export default Pedido;
