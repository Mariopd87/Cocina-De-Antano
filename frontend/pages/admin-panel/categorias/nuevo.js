import AdminPanel from "../../../components/layouts/adminPanel";
import { useState, useEffect } from "react";
import styles from "../../../styles/Admin.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import Router from "next/router";

export default function AdminNuevaCategoria() {
  const [message, setMessage] = useState("");
  const [nombre, setNombre] = useState("");
  const [imagen, setImagen] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const imageMimeType = /image\/(png)/i;

  const handleSubmitNewCategory = (e) => {
    fetchNewCategory();
    e.preventDefault();
  };

  const handleChangeNombre = (e) => {
    setNombre(e.target.value);
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
  const fetchUploadImages = async (categoriaId) => {
    const formData = new FormData();
    formData.append("File", selectedImage);
    const requestOptions = {
      method: "POST",
      body: formData,
    };

    await fetch(`http://localhost:3000/image/cat-${categoriaId}.png`, requestOptions)
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
   * Insert Category into DB
   */
  const fetchNewCategory = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre,
        imagen: ""
      }),
    };

    await fetch("http://localhost:8008/api/categorias", requestOptions)
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
          result.category &&
          result.status == "200"
        ) {
          fetchUpdateImage(result.category.id);
          fetchUploadImages(result.category.id);
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
  const fetchUpdateImage = async (categoryId) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre,
        imagen: `/image/cat-${categoryId}.png`,
      }),
    };

    await fetch(
      `http://localhost:8008/api/categorias/${categoryId}`,
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
          setNombre("");
          setImagen("");
          setMessage("Categoría creada correctamente");
          Router.push("/admin-panel/categorias");
        } else {
          if (result.status == "401") {
            setMessage("Debe rellenar todos los campos");
          } else if (result.status == "404") {
            setMessage("La categoría no se encuentra en la base de datos");
          } else if (result.status == "500") {
            setMessage("Error interno del servidor");
          }
        }
      });
  };

  return (
    <AdminPanel>
      <h1>Crear Nueva Categoría</h1>
      {message !== "" && <p className={styles.message}>{message}</p>}

      <section className={styles.nuevoProducto}>
        <div className={styles.row}>
          <form onSubmit={handleSubmitNewCategory}>
            <div className={styles.inputBox}>
              <input
                type="text"
                placeholder="Nombre de la categoría"
                value={nombre}
                onChange={handleChangeNombre}
                className={`${styles.box} ${styles.fullWidth}`}
              />

              <input
                type="file"
                placeholder="Imagen"
                onChange={handleChangeImage}
                className={`${styles.box}`}
                accept="image/png"
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
            </div>

            <input type="submit" value="Crear Categoría" className={styles.btn} />
          </form>
        </div>
      </section>
    </AdminPanel>
  );
}