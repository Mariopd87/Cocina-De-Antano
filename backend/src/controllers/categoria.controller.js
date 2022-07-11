const mongoose = require("mongoose");
require("../config/db")(mongoose);
const CategoriaModel = require("../models/categoria.model")(mongoose);
const errorMsg404 = "Categoría no encontrada";
const errorMsg400 =
  "No se puede crear la categoría, ya que no contiene parámetros";
const errorMsg200Storage = "Categoría creada correctamente";
const errorMsg200Update = "Categoría actualizada correctamente";
const errorMsg200Delete = "Categoría borrada correctamente";
const errorMsg500 = "Error interno de servidor";

module.exports = {
  /**
   * Método para listar todas las categorías
   * Method: GET
   */
  index: async () => {
    // Me traigo toda la lista de categorías sin filtro
    return await CategoriaModel.find().sort({id: -1});
  },

  /**
   * Método para ver los detalles de una categoría
   * Method: GET
   * Params: categoriaId <number>
   */
  view: async (categoriaId) => {
    let result;

    // Hago una búsqueda del producto, y si no lo encuentra devuelvo un 404
    await CategoriaModel.find({ id: categoriaId }).then((data) => {
      if (data[0] !== undefined && data[0].id !== undefined) {
        result = data;
      } else {
        result = { message: errorMsg404, status: 404 };
      }
    });

    return result;
  },

  /**
   * Método para crear una nueva categoría
   * Method: POST
   * Body Params: nombre <string>
   */
  storage: async (categoryData) => {
    let result;
    let lastId;

    // Primero chequeo de que la petición contenga parámetros a insertar en la BD
    if (Object.entries(categoryData).length > 0) {
      // Obtengo el último Id insertado
      await CategoriaModel.find()
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
        const categoria = new CategoriaModel({
          id: lastId + 1,
          nombre: categoryData.nombre,
          imagen: categoryData.imagen
        });
  
        try {
          if (
            categoryData.nombre === "" ) {
            result = {
              message: "Debe rellenar todos los campos",
              status: 401,
            };
          } else {
            await categoria.save();
            result = {
              message: errorMsg200Storage,
              status: 200,
              category: categoria,
            };
          }
        } catch (error) {
          result = { message: error.message, status: 500 };
        }
    } else {
      result = { message: errorMsg400, status: 400 };
    }

    return result;
  },

  /**
   * Método para actualizar una categoría
   * Method: PUT
   * Params: categoriaId <number>
   * Body Params: nombre <string>
   */
  update: async (categoryData) => {
    let result;

    // Primero chequeo de que la petición contenga parámetros a actualizar en la BD
    if (Object.entries(categoryData).length > 0) {
      const categoriaId = categoryData.params.categoriaId;

      // Si la imagen viene vacía, le dejo la que tiene por defecto
      if(categoryData.body.imagen === '') {
        const categoryDbImage = await CategoriaModel.find({ id: categoriaId });
        imagen = categoryDbImage[0].imagen;
      }
      else {
        imagen = categoryData.body.imagen;
      }

      // Realizo el update del modelo buscando por la propiedad id
      await CategoriaModel.updateOne(
        { id: categoriaId },
        {
          nombre: categoryData.body.nombre,
          imagen: imagen
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
   * Método para borrar una categoría
   * Method: DELETE
   * Params: categoriaId <number>
   */
  delete: async (categoriaId) => {
    let result;

    await CategoriaModel.deleteOne({ id: categoriaId })
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
