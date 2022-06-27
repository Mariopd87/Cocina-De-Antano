module.exports = (mongoose) => {
  const urlDB = "mongodb://localhost:27017/cocinaDeAntano";

  mongoose
    .connect(urlDB)
    .then(() => {
      console.log("CONECTADO A MONGO DB");
      console.log("Escuchando en el puerto 8000");
    })
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
