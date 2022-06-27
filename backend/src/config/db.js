module.exports = (mongoose) => {
  const urlDB = "mongodb://localhost:27017/cocinaDeAntano";

  mongoose
    .connect(urlDB)
    .then()
    .catch((error) => console.error(error));

  var productosSchema = mongoose.Schema(
    {
      nombreProducto: String,
      categoriaId: Number,
      id: Number,
    },
    { timestamps: true }
  );
};
