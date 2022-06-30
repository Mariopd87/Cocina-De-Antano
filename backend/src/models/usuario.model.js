module.exports = (mongoose) => {
    var usuariosSchema = mongoose.Schema(
      {
        id: Number,
        nombre: String,
        apellidos: String,
        email: String,
        password: String,
        genero: String,
        direccion: String,
        direccion2: String,
        codigoPostal: Number,
        telefono: String
      },
      { versionKey: false }
    );
  
    const Usuario = mongoose.model("users", usuariosSchema);
  
    return Usuario;
  };
  