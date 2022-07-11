import AdminPanel from "../../../components/layouts/adminPanel";
import { useState, useEffect } from "react";
import styles from "../../../styles/Admin.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import Router from "next/router";

export default function AdminNuevoProducto({ categorias }) {
  const [listaCategorias, setListaCategorias] = useState([]);
  const [message, setMessage] = useState("");
  const [nombreProducto, setNombreProducto] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState("");
  const [descripcionShort, setDescripcionShort] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const imageMimeType = /image\/(jpg|jpeg)/i;

  useEffect(() => {
    setListaCategorias(categorias);
  }, []);

  const handleSubmitNewProduct = (e) => {
    fetchNewProduct();
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
   * Upload Images
   */
  const fetchUploadImages = async (productoId) => {
    const formData = new FormData();
    formData.append("File", selectedImage);
    const requestOptions = {
      method: "POST",
      body: formData,
    };

    await fetch(`http://localhost:3000/image/product-${productoId}.jpg`, requestOptions)
      .then((res) => {
        if (res.ok) {
            console.log('ha hecho res ok')
            res.json();
        }
        else{
            console.log(res)
        }
      })
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  /**
   * Insert Product into DB
   */
  const fetchNewProduct = async () => {
    const requestOptions = {
      method: "POST",
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

    await fetch("http://localhost:8008/api/productos", requestOptions)
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
        if (
          result !== "undefined" &&
          result.product &&
          result.status == "200"
        ) {
          fetchUpdateImage(result.product.id);
          fetchUploadImages(result.product.id);
        } else {
          if (result.status == "401") {
            setMessage("Debe rellenar todos los campos");
          } else if (result.status == "500") {
            setMessage("Error interno del servidor");
          }
        }
      });
  };

  /**
   * Update url img into DB
   */
  const fetchUpdateImage = async (productId) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombreProducto,
        imagen: `product-${productId}.jpg`,
        categoriaId,
        precio,
        descripcionShort,
        descripcion,
      }),
    };

    await fetch(
      `http://localhost:8008/api/productos/${productId}`,
      requestOptions
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          if (res.status == "401") {
            setMessage("Debe rellenar todos los campos");
          } else if (res.status == "404") {
            setMessage("El producto no se encuentra en la base de datos");
          } else if (res.status == "500") {
            setMessage("Error interno del servidor");
          }

          return res;
        }
      })
      .then((result) => {
        if (
          result !== "undefined" &&
          result &&
          result.status == "200"
        ) {
          setNombreProducto("");
          setCategoriaId("");
          setPrecio("");
          setImagen("");
          setDescripcionShort("");
          setDescripcion("");
          setMessage("Producto creado correctamente");
          Router.push("/admin-panel/productos");
        } else {
          if (result.status == "401") {
            setMessage("Debe rellenar todos los campos");
          } else if (result.status == "404") {
            setMessage("El producto no se encuentra en la base de datos");
          } else if (result.status == "500") {
            setMessage("Error interno del servidor");
          }
        }
      });
  };

  return (
    <AdminPanel>
      <h1>Crear Nuevo Producto</h1>
      {message !== "" && <p className={styles.message}>{message}</p>}

      <section className={styles.nuevoProducto}>
        <div className={styles.row}>
          <form onSubmit={handleSubmitNewProduct}>
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
              >
                {listaCategorias && listaCategorias.length > 0 ? (
                  listaCategorias.map((categoria) => {
                    if (categoria.id === categoriaId) {
                      return (
                        <option
                          value={categoria.id}
                          key={categoria.id}
                          selected
                        ></option>
                      );
                    } else {
                      return (
                        <option value={categoria.id} key={categoria.id}>
                          {categoria.nombre}
                        </option>
                      );
                    }
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

            <input type="submit" value="Crear Producto" className={styles.btn} />
          </form>
        </div>
      </section>
    </AdminPanel>
  );
}

export async function getServerSideProps() {
  const [categoriasRes] = await Promise.all([
    fetch("http://localhost:8008/api/categorias"),
  ]);

  const [categorias] = await Promise.all([categoriasRes.json()]);

  return {
    props: {
      categorias,
    },
  };
}
