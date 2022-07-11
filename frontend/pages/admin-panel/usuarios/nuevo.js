import AdminPanel from "../../../components/layouts/adminPanel";
import { useState } from "react";
import styles from "../../../styles/Admin.module.css";
import Router from "next/router";

export default function AdminNuevoUsuario() {
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

  const handleSubmitNewUser = (e) => {
    fetchNewUser();
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
    setGenero(e.target.value);
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
   * Insert User into DB
   */
  const fetchNewUser = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
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

    await fetch("http://localhost:8008/api/registro", requestOptions)
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
          setNombre("");
          setApellidos("");
          setEmail("");
          setPassword("");
          setGenero("");
          setDireccion("");
          setDireccion2("");
          setCodigoPostal("");
          setTelefono("");
          setMessage("Usuario creado correctamente");
          Router.push("/admin-panel/usuarios");
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
      <h1>Crear Nuevo Usuario</h1>
      {message !== "" && <p className={styles.message}>{message}</p>}

      <section className={styles.nuevoProducto}>
        <div className={styles.row}>
          <form onSubmit={handleSubmitNewUser}>
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
                  placeholder="Nombre del usuario"
                  onChange={handleChangeGenero}
                  value="Mujer"
                  className={`${styles.box}`}
                  {...(genero === "Hombre" && "selected")}
                />
                <label htmlFor="genero">Hombre</label>

                <input
                  name="genero"
                  type="radio"
                  placeholder="Nombre del usuario"
                  onChange={handleChangeGenero}
                  value="Mujer"
                  className={`${styles.box}`}
                  {...(genero === "Mujer" && "selected")}
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

            <input type="submit" value="Crear Usuario" className={styles.btn} />
          </form>
        </div>
      </section>
    </AdminPanel>
  );
}
