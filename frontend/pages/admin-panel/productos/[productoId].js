import AdminPanel from "../../../components/layouts/adminPanel";
import { useState, useEffect } from "react";
import styles from "../../../styles/Admin.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";

export default function AdminUpdateProducto({ categorias, producto }) {
  const defaultImage = "product-1.jpg";
  const imageMimeType = /image\/(jpg|jpeg)/i;
  const [listaCategorias, setListaCategorias] = useState([]);
  const [message, setMessage] = useState("");
  const [nombreProducto, setNombreProducto] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState(defaultImage);
  const [descripcionShort, setDescripcionShort] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    setListaCategorias(categorias);
    setNombreProducto(producto.nombreProducto);
    setCategoriaId(producto.categoriaId);
    setPrecio(producto.precio);
    setImagen(producto.imagen);
    setDescripcionShort(producto.descripcionShort);
    setDescripcion(producto.descripcion);
  }, []);

  const handleSubmitUpdateProduct = (e) => {
    fetchUpdateProduct();
    e.preventDefault();
  };

  const handleChangeNombreProducto = (e) => {
    setNombreProducto(e.target.value);
  };

  const handleChangeCategoriaId = (e) => {
    setCategoriaId(e.target.value);
  };

  const handleChangePrecio = (e) => {
    setPrecio(e.target.value);
  };

  const handleChangeDescripcionShort = (e) => {
    setDescripcionShort(e.target.value);
  };

  const handleChangeDescripcion = (e) => {
    setDescripcion(e.target.value);
  };

  const handleChangeImage = (e) => {
    const inputImage = e.target.files[0];

    if (!inputImage.type.match(imageMimeType)) {
      console.log("imagen no valida");
      return;
    }
    setSelectedImage(inputImage);
  };

  /**
   * Update Product into DB
   */
  const fetchUpdateProduct = async () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombreProducto,
        imagen: "",
        categoriaId,
        precio,
        descripcionShort,
        descripcion,
      }),
    };

    await fetch(
      `http://localhost:8008/api/productos/${producto.id}`,
      requestOptions
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          if (res.status == "401") {
            setMessage("Debe rellenar todos los campos");
          } else if (res.status == "500") {
            setMessage("Error interno del servidor");
          }

          return res;
        }
      })
      .then((result) => {
        if (result !== "undefined" && result.status == "200") {
          setMessage("Producto actualizado correctamente");
        } else {
          if (result.status == "401") {
            setMessage("Debe rellenar todos los campos");
          } else if (result.status == "500") {
            setMessage("Error interno del servidor");
          }
        }
      });
  };

  return (
    <AdminPanel>
      <h1>Actualizar Producto</h1>
      {message !== "" && <p className={styles.message}>{message}</p>}

      <section className={styles.nuevoProducto}>
        <div className={styles.row}>
          <form onSubmit={handleSubmitUpdateProduct}>
            <div className={styles.inputBox}>
              <input
                type="text"
                placeholder="Nombre del producto"
                value={nombreProducto}
                onChange={handleChangeNombreProducto}
                className={`${styles.box} ${styles.fullWidth}`}
              />

              <select
                className={`${styles.box} ${styles.fullWidth}`}
                onChange={handleChangeCategoriaId}
                defaultValue={categoriaId}
              >
                {listaCategorias && listaCategorias.length > 0 ? (
                  listaCategorias.map((categoria) => {
                    return (
                      <option value={categoria.id} key={categoria.id}>
                        {categoria.nombre}
                      </option>
                    );
                  })
                ) : (
                  <option>No hay categorias</option>
                )}
              </select>

              <input
                type="number"
                placeholder="Precio"
                value={precio}
                onChange={handleChangePrecio}
                className={`${styles.box} ${styles.fullWidth}`}
              />

              <input
                type="file"
                placeholder="Imagen"
                onChange={handleChangeImage}
                className={`${styles.box}`}
                accept="image/jpeg"
              />

              <div className={styles.imageContainer}>
                {selectedImage !== null && (
                  <>
                    <a onClick={() => setSelectedImage(null)}>
                      <FontAwesomeIcon icon={faBan}></FontAwesomeIcon>
                      <img src={URL.createObjectURL(selectedImage)} />
                    </a>
                  </>
                )}
              </div>

              <textarea
                placeholder="Descripción corta"
                cols="30"
                rows="5"
                onChange={handleChangeDescripcionShort}
                value={descripcionShort}
                className={styles.corta}
              ></textarea>

              <textarea
                placeholder="Descripción"
                cols="30"
                rows="10"
                onChange={handleChangeDescripcion}
                value={descripcion}
              ></textarea>
            </div>

            <input
              type="submit"
              value="Actualizar Producto"
              className={styles.btn}
            />
          </form>
        </div>
      </section>
    </AdminPanel>
  );
}

export async function getServerSideProps(context) {
  const { params, res } = context;
  const { productoId } = params;

  const [categoriasRes, productoRes] = await Promise.all([
    fetch("http://localhost:8008/api/categorias"),
    fetch(`http://localhost:8008/api/productos/${productoId}`),
  ]);

  const [categorias, producto] = await Promise.all([
    categoriasRes.json(),
    productoRes.json(),
  ]);

  return {
    props: {
      categorias,
      producto,
    },
  };
}
