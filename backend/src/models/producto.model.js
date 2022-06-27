module.exports = (mongoose) => {
  var productosSchema = mongoose.Schema(
    {
      id: Number,
      nombreProducto: String,
      categoriaId: Number,
      imagen: String,
      descripcionShort: String,
      descripcion: String
    },
    { versionKey: false }
  );

  const Producto = mongoose.model("productos", productosSchema);

  return Producto;
};
