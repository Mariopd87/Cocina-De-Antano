import AdminPanel from "../../../components/layouts/adminPanel";
import { useEffect, useState } from "react";
import styles from "../../../styles/Admin.module.css";
import Router from "next/router";
import { useContext } from "react";
import { CartContext } from "../../../context/cartContext";

export default function AdminNuevoUsuario({ usuarioId }) {
  const { user } = useContext(CartContext);
  const [message, setMessage] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [genero, setGenero] = useState("");
  const [direccion, setDireccion] = useState("");
  const [direccion2, setDireccion2] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [telefono, setTelefono] = useState("");

  useEffect(() => {
    fetchUserData().then((usuario) => {
      if (usuario[0]) {
        const userDB = usuario[0];
        setNombre(userDB.nombre);
        setApellidos(userDB.apellidos);
        setEmail(userDB.email);
        setGenero(userDB.genero);
        setTelefono(userDB.telefono);
        setCodigoPostal(userDB.codigoPostal);
        setDireccion(userDB.direccion);
        setDireccion2(userDB.direccion2);
        console.log(genero);
      }
    });
  }, []);

  const handleSubmitUpdateUser = (e) => {
    fetchUpdateUser();
    e.preventDefault();
  };

  const handleChangeNombre = (e) => {
    setNombre(e.target.value);
  };

  const handleChangeApellidos = (e) => {
    setApellidos(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeGenero = (e) => {
    setGenero(e.currentTarget.value);
  };

  const handleChangeDireccion = (e) => {
    setDireccion(e.target.value);
  };

  const handleChangeDireccion2 = (e) => {
    setDireccion2(e.target.value);
  };

  const handleChangeCodigoPostal = (e) => {
    setCodigoPostal(e.target.value);
  };

  const handleChangeTelefono = (e) => {
    setTelefono(e.target.value);
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
        fetch(
          `http://localhost:8008/api/usuarios/${usuarioId}`,
          requestOptions
        ),
      ]);

      const [usuario] = await Promise.all([usuariosRes.json()]);
      return usuario;
    } else {
      return [];
    }
  };

  /**
   * Update User into DB
   */
  const fetchUpdateUser = async () => {
    if (user && user !== "undefined") {
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": user.token,
        },
        body: JSON.stringify({
          nombre,
          apellidos,
          email,
          password,
          genero,
          direccion,
          direccion2,
          codigoPostal,
          telefono,
        }),
      };

      await fetch(
        `http://localhost:8008/api/usuarios/${usuarioId}`,
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
            setPassword("");
            setMessage("Usuario actualizado correctamente");
          } else {
            if (result.status == "401") {
              setMessage("Debe rellenar todos los campos");
            } else if (result.status == "500") {
              setMessage("Error interno del servidor");
            }
          }
        });
    } else {
      setMessage("Acceso Denegado");
    }
  };

  return (
    <AdminPanel>
      <h1>Actualizar Usuario</h1>
      {message !== "" && <p className={styles.message}>{message}</p>}

      <section className={styles.nuevoProducto}>
        <div className={styles.row}>
          <form onSubmit={handleSubmitUpdateUser}>
            <div className={styles.inputBox}>
              <input
                type="text"
                placeholder="Nombre completo"
                value={nombre}
                onChange={handleChangeNombre}
                className={`${styles.box}`}
              />

              <input
                type="text"
                placeholder="Apellidos"
                value={apellidos}
                onChange={handleChangeApellidos}
                className={`${styles.box}`}
              />

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleChangeEmail}
                className={`${styles.box} ${styles.fullWidth}`}
              />

              <input
                type="password"
                placeholder="Introduzca una contraseña"
                value={password}
                onChange={handleChangePassword}
                className={`${styles.box} ${styles.fullWidth}`}
              />

              <div className={`${styles.box} ${styles.small}`}>
                <input
                  name="genero"
                  type="radio"
                  onChange={handleChangeGenero}
                  value="Hombre"
                  checked={genero === "Hombre"}
                  className={`${styles.box}`}
                />
                <label htmlFor="genero">Hombre</label>

                <input
                  name="genero"
                  type="radio"
                  onChange={handleChangeGenero}
                  value="Mujer"
                  className={`${styles.box}`}
                  checked={genero === "Mujer"}
                />
                <label htmlFor="genero">Mujer</label>
              </div>

              <input
                type="text"
                placeholder="Teléfono"
                value={telefono}
                onChange={handleChangeTelefono}
                className={`${styles.box} ${styles.small}`}
              />

              <input
                type="number"
                placeholder="Código Postal"
                value={codigoPostal}
                onChange={handleChangeCodigoPostal}
                className={`${styles.box} ${styles.small}`}
              />

              <input
                type="text"
                placeholder="Dirección"
                value={direccion}
                onChange={handleChangeDireccion}
                className={`${styles.box} ${styles.fullWidth}`}
              />

              <input
                type="text"
                placeholder="Dirección Adicional"
                value={direccion2}
                onChange={handleChangeDireccion2}
                className={`${styles.box} ${styles.fullWidth}`}
              />
            </div>

            <input
              type="submit"
              value="Actualizar Usuario"
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
  const { usuarioId } = params;

  return {
    props: {
      usuarioId,
    },
  };
}
