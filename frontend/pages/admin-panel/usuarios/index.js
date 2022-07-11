import AdminPanel from "../../../components/layouts/adminPanel";
import { useState, useEffect, useContext } from "react";
import styles from "../../../styles/Admin.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { confirmAlert } from "react-confirm-alert";
import { CartContext } from "../../../context/cartContext";

export default function AdminUsuarios() {
  const {user} = useContext(CartContext);
  const [usuariosList, setUsuariosList] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchUserData().then((usuarios) => setUsuariosList(usuarios));
  }, []);

  const handleRemoveUser = (e) => {
    const usuarioId = e.currentTarget.id;
    confirmAlert({
      title: "Borrar Usuario",
      message: "¿Estás seguro? Esta opción no se puede deshacer",
      buttons: [
        {
          label: "Sí",
          onClick: () => {
            setUsuariosList(
              usuariosList.filter((el) => el.id !== parseInt(usuarioId))
            );
            fetchDelete(usuarioId);
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
   * Fetch User Data
   */
  const fetchUserData = async () => {
    if (user && user !== "undefined") {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": user.token,
        },
      };
      const [usuariosRes] = await Promise.all([
        fetch("http://localhost:8008/api/usuarios", requestOptions),
      ]);

      const [usuarios] = await Promise.all([usuariosRes.json()]);
      return usuarios;
    }
    else{
      return []
    }
  };

  /**
   * Delete User
   */
  const fetchDelete = async (usuarioId) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": `${user.token}`,
      },
    };

    await fetch(
      `http://localhost:8008/api/usuarios/${usuarioId}`,
      requestOptions
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          if (result.status == "200") {
            setMessage("Usuario eliminado correctamente");
          } else if (res.status == "404") {
            setMessage("Usuario no encontrado");
          } else if (res.status == "500") {
            setMessage("Error interno del servidor");
          }

          return res;
        }
      })
      .then((result) => {
        if (result !== "undefined" && result.status == "200") {
          setMessage("Usuario eliminado correctamente");
        } else {
          if (res.status == "404") {
            setMessage("Usuario no encontrado");
          } else if (res.status == "500") {
            setMessage("Error interno del servidor");
          }
        }
      });
  };

  return (
    <AdminPanel>
      <h1>Usuarios</h1>
      {message !== "" && <p className={styles.message}>{message}</p>}
      <Link href="/admin-panel/usuarios/nuevo">
        <a>
          <button className={styles.btn}>
            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon> Nuevo Usuario
          </button>
        </a>
      </Link>
      <table cellSpacing="0">
        <tbody>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Email</th>
            <th>Genero</th>
            <th>Dirección</th>
            <th>Dirección 2</th>
            <th>Código Postal</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
          {usuariosList && usuariosList.length > 0 ? (
            usuariosList.map((usuario) => {
              return (
                <tr key={usuario.id}>
                  <td className={styles.contentCenter}>{usuario.id}</td>
                  <td>
                    <a>{usuario.nombre}</a>
                  </td>
                  <td>
                    <a>{usuario.apellidos}</a>
                  </td>
                  <td>{usuario.email}</td>
                  <td>{usuario.genero}</td>
                  <td>{usuario.direccion}</td>
                  <td>{usuario.direccion2}</td>
                  <td>{usuario.codigoPostal}</td>
                  <td>{usuario.telefono}</td>
                  <td className={`${styles.actions} ${styles.contentCenter}`}>
                    <Link href={`/admin-panel/usuarios/${usuario.id}`}>
                      <a>
                        <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                      </a>
                    </Link>
                    <a id={usuario.id} onClick={handleRemoveUser}>
                      <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                    </a>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="10">No hay usuarios</td>
            </tr>
          )}
        </tbody>
      </table>
    </AdminPanel>
  );
}
