module.exports = (mongoose) => {
    var categoriasSchema = mongoose.Schema(
      {
        id: Number,
        nombre: String,
        imagen: String
      },
      { versionKey: false }
    );
  
    const Categoria = mongoose.model("categorias", categoriasSchema);
  
    return Categoria;
  };
  