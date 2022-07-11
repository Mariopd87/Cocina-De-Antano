const mongoose = require("mongoose");
require("../config/db")(mongoose);
const UsuarioModel = require("../models/usuario.model")(mongoose);
const errorMsg404 = "Usuario no encontrado";
const errorMsg400 =
  "No se puede crear el usuario, ya que no contiene parámetros";
const errorMsg200Storage = "Usuario creado correctamente";
const errorMsg200Update = "Usuario actualizado correctamente";
const errorMsg200Delete = "Usuario borrado correctamente";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  /**
   * Método para listar todos los usuarios
   * Method: GET
   */
  index: async () => {
    // Me traigo toda la lista de usuarios sin filtro
    return await UsuarioModel.find({}, { password: 0 }).sort({ id: -1 });
  },

  /**
   * Método para ver los detalles de un usuario
   * Method: GET
   * Params: usuarioId <number>
   */
  view: async (usuarioId) => {
    let result;

    // Hago una búsqueda del producto, y si no lo encuentra devuelvo un 404
    await UsuarioModel.find({ id: usuarioId }, { password: 0 }).then((data) => {
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
   *              password <string>
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
      // Compruebo de que el email ya exista en la base de datos
      const isEmailExits = await UsuarioModel.findOne({
        email: usuarioData.email,
      });
      if (isEmailExits) {
        return {
          message: "El email ya existe en la base de datos",
          status: 400,
        };
      }

      // Compruebo de que todos los campos obligatorios vengan rellenos
      if (
        usuarioData.nombre === "" ||
        usuarioData.apellidos === "" ||
        usuarioData.email === "" ||
        usuarioData.password === ""
      ) {
        return {
          message: "Debe rellenar todos los campos",
          status: 401,
        };
      }

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

      // Encripto la contraseña
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(usuarioData.password, salt);

      // Hago la inserción en la BD capturando los parámetros pasados por POST
      const user = new UsuarioModel({
        id: lastId + 1,
        nombre: usuarioData.nombre,
        apellidos: usuarioData.apellidos,
        email: usuarioData.email,
        password: password,
        genero: usuarioData.genero,
        direccion: usuarioData.direccion,
        direccion2: usuarioData.direccion2,
        codigoPostal: usuarioData.codigoPostal,
        telefono: usuarioData.telefono,
      });

      try {
        await user.save();
        result = { message: errorMsg200Storage, status: 200 };
      } catch (error) {
        result = { message: error.message, status: 500 };
      }
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
   *              password <string>
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
      let password;

      // Compruebo de que todos los campos obligatorios vengan rellenos
      if (
        userData.body.nombre === "" ||
        userData.body.apellidos === "" ||
        userData.body.email === ""
      ) {
        return {
          message: "Debe rellenar todos los campos",
          status: 401,
        };
      }

      // Si el usuario escribe un password lo encripto si no, dejo la misma que tiene actualmente
      if (
        typeof userData.body.password === "undefined" ||
        userData.body.password === ""
      ) {
        const userDbPassword = await UsuarioModel.find({ id: usuarioId });
        password = userDbPassword[0].password;
      } else {
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(userData.body.password, salt);
      }

      // Realizo el update del modelo buscando por la propiedad id
      await UsuarioModel.updateOne(
        { id: usuarioId },
        {
          nombre: userData.body.nombre,
          apellidos: userData.body.apellidos,
          email: userData.body.email,
          password: password,
          genero: userData.body.genero,
          direccion: userData.body.direccion,
          direccion2: userData.body.direccion2,
          codigoPostal: userData.body.codigoPostal,
          telefono: userData.body.telefono,
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

  login: async (userData) => {
    let result;

    // Compruebo si el usuario y la contraseña son correctas, sino devuelvo error 400
    const user = await UsuarioModel.findOne({ email: userData.email });
    if (!user) result = { message: "Usuario no encontrado", status: 400 };
    else {
      const validPassword = await bcrypt.compare(
        userData.password,
        user.password
      );
      if (!validPassword)
        result = { message: "Contraseña no válida", status: 401 };
      else {
        // Creo el Token
        const token = jwt.sign(
          {
            name: user.name,
            id: user._id,
          },
          process.env.TOKEN_SECRET
        );

        result = {
          message: `Usuario Identificado correctamente. Bienvenid@ ${user.nombre} ${user.apellidos}`,
          status: 200,
          user: user,
          token: token,
        };
      }
    }

    return result;
  },
};
