import AdminPanel from "../../../components/layouts/adminPanel";
import { useState, useEffect } from "react";
import styles from "../../../styles/Admin.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";

export default function AdminUpdateCategoria({categoria}) {
  const [message, setMessage] = useState("");
  const [nombre, setNombre] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const imageMimeType = /image\/(png)/i;

  useEffect (() => {
    setNombre(categoria.nombre)
  }, [])

  const handleSubmitUpdateCategory = (e) => {
    fetchUpdateCategory();
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
   * Insert Category into DB
   */
  const fetchUpdateCategory = async () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre,
        imagen: ""
      }),
    };

    await fetch(`http://localhost:8008/api/categorias/${categoria.id}`, requestOptions)
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
          result.status == "200"
        ) {
          setMessage("Categoría actualizada correctamente");
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
      <h1>Actualizar Categoría</h1>
      {message !== "" && <p className={styles.message}>{message}</p>}

      <section className={styles.nuevoProducto}>
        <div className={styles.row}>
          <form onSubmit={handleSubmitUpdateCategory}>
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

            <input type="submit" value="Actualizar Categoría" className={styles.btn} />
          </form>
        </div>
      </section>
    </AdminPanel>
  );
}

export async function getServerSideProps(context) {
    const { params, res } = context;
    const { categoriaId } = params;
  
    const [categoriasRes] = await Promise.all([
      fetch(`http://localhost:8008/api/categorias/${categoriaId}`)
    ]);
  
    const [categoria] = await Promise.all([
      categoriasRes.json(),
    ]);

    return {
      props: {
        categoria: categoria[0],
      },
    };
  }