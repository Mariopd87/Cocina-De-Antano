import AdminPanel from "../../../components/layouts/adminPanel";
import { useState, useEffect } from "react";
import styles from "../../../styles/Admin.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { confirmAlert } from "react-confirm-alert";

export default function AdminCategorias({ categorias }) {
  const [categoriesList, setCategoriesList] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setCategoriesList(categorias);
  }, []);

  const handleRemoveCategory = (e) => {
    const categoryId = e.currentTarget.id;
    confirmAlert({
      title: "Borrar Categoria",
      message: "¿Estás seguro? Esta opción no se puede deshacer",
      buttons: [
        {
          label: "Sí",
          onClick: () => {
            setCategoriesList(
              categoriesList.filter((el) => el.id !== parseInt(categoryId))
            );
            fetchDelete(categoryId);
          },
        },
        {
          label: "No",
          onClick: () => {
            return false;
          },
        },
      ],
    });
  };

  /**
   * Delete Producto
   */
  const fetchDelete = async (categoryId) => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };

    await fetch(
      `http://localhost:8008/api/categorias/${categoryId}`,
      requestOptions
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          if (result.status == "200") {
            setMessage("Categoria eliminada correctamente");
          } else if (res.status == "404") {
            setMessage("Categoría no encontrada");
          } else if (res.status == "500") {
            setMessage("Error interno del servidor");
          }

          return res;
        }
      })
      .then((result) => {
        if (result !== "undefined" && result.status == "200") {
          setMessage("Categoria eliminada correctamente");
        } else {
          if (res.status == "404") {
            setMessage("Categoría no encontrada");
          } else if (res.status == "500") {
            setMessage("Error interno del servidor");
          }
        }
      });
  };

  return (
    <AdminPanel>
      <h1>Categorías</h1>
      {message !== "" && <p className={styles.message}>{message}</p>}
      <Link href="/admin-panel/categorias/nuevo">
        <a>
          <button className={styles.btn}>
            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon> Nueva Categoría
          </button>
        </a>
      </Link>
      <table cellSpacing="0">
        <tbody>
          <tr>
            <th>ID</th>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
          {categoriesList.length > 0 ? (
            categoriesList.map((categoria) => {
              return (
                <tr key={categoria.id}>
                  <td className={styles.contentCenter}>{categoria.id}</td>
                  <td>
                    <img src={`..${categoria.imagen}`} />
                  </td>
                  <td>
                    <a>{categoria.nombre}</a>
                  </td>
                  <td className={`${styles.actions} ${styles.contentCenter}`}>
                    <Link href={`/admin-panel/categorias/${categoria.id}`}>
                      <a>
                        <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                      </a>
                    </Link>
                    <a id={categoria.id} onClick={handleRemoveCategory}>
                      <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                    </a>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="4">No hay categorías</td>
            </tr>
          )}
        </tbody>
      </table>
    </AdminPanel>
  );
}

export async function getServerSideProps() {
  const [categoriesRes] = await Promise.all([
    fetch("http://localhost:8008/api/categorias"),
  ]);

  const [categorias] = await Promise.all([categoriesRes.json()]);

  return {
    props: {
      categorias,
    },
  };
}
