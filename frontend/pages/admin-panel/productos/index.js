import AdminPanel from "../../../components/layouts/adminPanel";
import { useState, useEffect } from "react";
import styles from "../../../styles/Admin.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { confirmAlert } from "react-confirm-alert";

export default function AdminProductos({ productos }) {
  const [productList, setProductList] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setProductList(productos);
  }, []);

  const handleRemoveProduct = (e) => {
    const productId = e.currentTarget.id;
    confirmAlert({
      title: "Borrar Producto",
      message: "¿Estás seguro? Esta opción no se puede deshacer",
      buttons: [
        {
          label: "Sí",
          onClick: () => {
            setProductList(
              productList.filter((el) => el.id !== parseInt(productId))
            );
            fetchDelete(productId);
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
  const fetchDelete = async (productId) => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };

    await fetch(
      `http://localhost:8008/api/productos/${productId}`,
      requestOptions
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          if (result.status == "200") {
            setMessage("Producto eliminado correctamente");
          } else if (res.status == "404") {
            setMessage("Producto no encontrado");
          } else if (res.status == "500") {
            setMessage("Error interno del servidor");
          }

          return res;
        }
      })
      .then((result) => {
        if (result !== "undefined" && result.status == "200") {
          setMessage("Producto eliminado correctamente");
        } else {
          if (res.status == "404") {
            setMessage("Producto no encontrado");
          } else if (res.status == "500") {
            setMessage("Error interno del servidor");
          }
        }
      });
  };

  return (
    <AdminPanel>
      <h1>Productos</h1>
      {message !== "" && <p className={styles.message}>{message}</p>}
      <Link href="/admin-panel/productos/nuevo">
        <a>
          <button className={styles.btn}>
            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon> Nuevo Producto
          </button>
        </a>
      </Link>
      <table cellSpacing="0">
        <tbody>
          <tr>
            <th>ID</th>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Descripción Corta</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
          {productList.length > 0 ? (
            productList.map((producto) => {
              return (
                <tr key={producto.id}>
                  <td className={styles.contentCenter}>{producto.id}</td>
                  <td>
                    <img src={`../image/${producto.imagen}`} />
                  </td>
                  <td>
                    <Link href={`/productos/${producto.id}`}>
                      <a>{producto.nombreProducto}</a>
                    </Link>
                  </td>
                  <td>{producto.categoria && typeof producto.categoria[0] !== 'undefined' ? producto.categoria[0].nombre : ''}</td>
                  <td className={styles.precio}>{producto.precio}€</td>
                  <td>{producto.descripcionShort.substr(0, 20)}...</td>
                  <td>{producto.descripcion.substr(0, 80)}...</td>
                  <td className={`${styles.actions} ${styles.contentCenter}`}>
                    <Link href={`/admin-panel/productos/${producto.id}`}>
                      <a>
                        <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                      </a>
                    </Link>
                    <a id={producto.id} onClick={handleRemoveProduct}>
                      <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                    </a>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="8">No hay productos</td>
            </tr>
          )}
        </tbody>
      </table>
    </AdminPanel>
  );
}

export async function getServerSideProps() {
  const [productsRes] = await Promise.all([
    fetch("http://localhost:8008/api/productos"),
  ]);

  const [productos] = await Promise.all([productsRes.json()]);

  return {
    props: {
      productos,
    },
  };
}
