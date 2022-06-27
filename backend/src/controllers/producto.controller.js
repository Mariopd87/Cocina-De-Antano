const mongoose = require("mongoose");
require("../config/db")(mongoose);
const ProductoModel = require("../models/producto.model")(mongoose);
const errorMsg404 = "Producto no encontrado";
const errorMsg400 = "No se puede crear el producto, ya que no contiene parámetros";
const errorMsg200Storage = "Producto creado correctamente";
const errorMsg200Update = "Producto actualizado correctamente";
const errorMsg200Delete = "Producto borrado correctamente";
const errorMsg500 = "Error interno de servidor";

module.exports = {
  /**
   * Método para listar todos los productos
   * Method: GET
   */
  index: async () => {
    // Me traigo toda la lista de productos sin filtro
    return await ProductoModel.find();
  },

  /**
   * Método para ver los detalles de un producto
   * Method: GET
   * Params: productoId <number>
   */
  view: async (productoId) => {
    let result;

    // Hago una búsqueda del producto, y si no lo encuentra devuelvo un 404
    await ProductoModel.find({ id: productoId }).then((data) => {
      if (data[0] !== undefined && data[0].id !== undefined) {
        result = data;
      } else {
        result = { message: errorMsg404, status: 404 };
      }
    });

    return result;
  },

  /**
   * Método para crear un nuevo producto
   * Method: POST
   * Body Params: categoriaId <number>
   *              descripcion <string>
   *              descripcionShort <string>
   *              imagen <string>
   *              nombreProducto <string>
   */
  storage: async (productData) => {
    let result;
    let lastId;

    // Primero chequeo de que la petición contenga parámetros a insertar en la BD
    if (Object.entries(productData).length > 0) {
      // Obtengo el último Id insertado
      await ProductoModel.find()
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
      await ProductoModel.create({
        id: lastId + 1,
        categoriaId: productData.categoriaId,
        descripcion: productData.descripcion,
        descripcionShort: productData.descripcionShort,
        imagen: productData.imagen,
        nombreProducto: productData.nombreProducto,
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
   * Método para actualizar un producto
   * Method: PUT
   * Params: productoId <number>
   * Body Params: categoriaId <number>
   *              descripcion: <string>
   *              descripcionShort: <string>
   *              imagen: <string>
   *              nombreProducto: <string>
   */
  update: async (productData) => {
    let result;

    // Primero chequeo de que la petición contenga parámetros a actualizar en la BD
    if (Object.entries(productData).length > 0) {
      const productoId = productData.params.productoId;

      // Realizo el update del modelo buscando por la propiedad id
      await ProductoModel.updateOne(
        { id: productoId },
        {
          categoriaId: productData.body.categoriaId,
          descripcion: productData.body.descripcion,
          descripcionShort: productData.body.descripcionShort,
          imagen: productData.body.imagen,
          nombreProducto: productData.body.nombreProducto,
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
   * Método para borrar un producto
   * Method: DELETE
   * Params: productoId <number>
   */
  delete: async (productoId) => {
    let result;

    await ProductoModel.deleteOne({ id: productoId })
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
