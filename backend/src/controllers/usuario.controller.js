const mongoose = require("mongoose");
require("../config/db")(mongoose);
const UsuarioModel = require("../models/usuario.model")(mongoose);
const errorMsg404 = "Usuario no encontrado";
const errorMsg400 =
  "No se puede crear el usuario, ya que no contiene parámetros";
const errorMsg200Storage = "Usuario creado correctamente";
const errorMsg200Update = "Usuario actualizado correctamente";
const errorMsg200Delete = "Usuario borrado correctamente";
const errorMsg500 = "Error interno de servidor";

module.exports = {
  /**
   * Método para listar todos los usuarios
   * Method: GET
   */
  index: async () => {
    // Me traigo toda la lista de usuarios sin filtro
    return await UsuarioModel.find();
  },

  /**
   * Método para ver los detalles de un usuario
   * Method: GET
   * Params: usuarioId <number>
   */
  view: async (usuarioId) => {
    let result;

    // Hago una búsqueda del producto, y si no lo encuentra devuelvo un 404
    await UsuarioModel.find({ id: usuarioId }).then((data) => {
      if (data[0] !== undefined && data[0].id !== undefined) {
        result = data;
      } else {
        result = { message: errorMsg404, status: 404 };
      }
    });

    return result;
  },

  /**
   * Método para crear un nuevo usuario
   * Method: POST
   * Body Params: nombre <string>
   *              apellidos <string>
   *              email <string>
   *              genero <string>
   *              direccion <string>
   *              direccion2 <string>
   *              codigoPostal <number>
   *              telefono <string>
   */
  storage: async (usuarioData) => {
    let result;
    let lastId;

    // Primero chequeo de que la petición contenga parámetros a insertar en la BD
    if (Object.entries(usuarioData).length > 0) {
      // Obtengo el último Id insertado
      await UsuarioModel.find()
        .sort({ id: -1 })
        .limit(1)
        .then((data) => {
          if (data[0] !== undefined) lastId = data[0].id;
          else lastId = 1;
        })
        .catch((error) => {
          console.error(error);
        });

      // Hago la inserción en la BD capturando los parámetros pasados por POST
      await UsuarioModel.create({
        id: lastId + 1,
        nombre: usuarioData.nombre,
        apellidos: usuarioData.apellidos,
        email: usuarioData.email,
        genero: usuarioData.genero,
        direccion: usuarioData.direccion,
        direccion2: usuarioData.direccion2,
        codigoPostal: usuarioData.codigoPostal,
        telefono: usuarioData.telefono
      })
        .then((result = { message: errorMsg200Storage, status: 200 }))
        .catch((error) => {
          result = { message: error.message, status: 500 };
        });
    } else {
      result = { message: errorMsg400, status: 400 };
    }

    return result;
  },

  /**
   * Método para actualizar un usuario
   * Method: PUT
   * Params: usuarioId <number>
   * Body Params: nombre <string>
   *              apellidos <string>
   *              email <string>
   *              genero <string>
   *              direccion <string>
   *              direccion2 <string>
   *              codigoPostal <number>
   *              telefono <string>
   */
  update: async (userData) => {
    let result;

    // Primero chequeo de que la petición contenga parámetros a actualizar en la BD
    if (Object.entries(userData).length > 0) {
      const usuarioId = userData.params.usuarioId;

      // Realizo el update del modelo buscando por la propiedad id
      await UsuarioModel.updateOne(
        { id: usuarioId },
        {
          nombre: userData.body.nombre,
          apellidos: userData.body.apellidos,
          email: userData.body.email,
          genero: userData.body.genero,
          direccion: userData.body.direccion,
          direccion2: userData.body.direccion2,
          codigoPostal: userData.body.codigoPostal,
          telefono: userData.body.telefono
        }
      )
        .then((data) => {
          // Si el documento existe devuelvo código 200 en caso contrario 404
          if (data.matchedCount > 0) {
            result = { message: errorMsg200Update, status: 200 };
          } else {
            result = { message: errorMsg404, status: 404 };
          }
        })
        .catch((error) => {
          result = { message: error.message, status: 500 };
        });
    } else {
      result = { message: errorMsg400, status: 400 };
    }

    return result;
  },

  /**
   * Método para borrar un usuario
   * Method: DELETE
   * Params: usuarioId <number>
   */
  delete: async (usuarioId) => {
    let result;

    await UsuarioModel.deleteOne({ id: usuarioId })
      .then((data) => {
        // Si ha conseguido borrar el documento devuelvo código 200 en caso contrario 404
        if (data.deletedCount > 0) {
          result = { message: errorMsg200Delete, status: 200 };
        } else {
          result = { message: errorMsg404, status: 404 };
        }
      })
      .catch((error) => {
        result = { message: error.message, status: 500 };
      });

    return result;
  },
};
