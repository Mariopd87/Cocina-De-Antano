import styles from "../../styles/Home.module.css";
import Heading from "../../components/layouts/heading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faMapMarker,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Contacto() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [numeroPedido, setNumeroPedido] = useState("");
  const [asunto, setAsunto] = useState("");
  const [emailMensaje, setEmailMensaje] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmitSendEmail = (e) => {
    setNombre("");
    setEmail("");
    setNumeroPedido("");
    setAsunto("");
    setEmailMensaje("");
    setMessage(
      "Mensaje enviado correctamente, nos pondremos en contacto a la mayor brevedad posible"
    );
    setTimeout(() => {
      setMessage("");
    }, 3000);
    e.preventDefault();
  };

  const handleChangeNombre = (e) => {
    setNombre(e.currentTarget.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.currentTarget.value);
  };

  const handleChangeNumeroPedido = (e) => {
    setNumeroPedido(e.currentTarget.value);
  };

  const handleChangeAsunto = (e) => {
    setAsunto(e.currentTarget.value);
  };

  const handleChangeEmailMensaje = (e) => {
    setEmailMensaje(e.currentTarget.value);
  };

  return (
    <>
      <Heading title={"Contacto"} breadcrumb={"Inicio - Contacto"}></Heading>

      <section className={styles.contact}>
        <div className={styles.iconsContainer}>
          <div className={styles.icons}>
            <span>
              <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>
            </span>
            <h3>Teléfono</h3>
            <p>952 123 456</p>
            <p>666 123 456</p>
          </div>

          <div className={styles.icons}>
            <span>
              <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
            </span>
            <h3>Email</h3>
            <p>info@cocinadeantano.com</p>
            <p>pedidos@cocinadeantano.com</p>
          </div>

          <div className={styles.icons}>
            <span>
              <FontAwesomeIcon icon={faMapMarker}></FontAwesomeIcon>
            </span>
            <h3>Dirección</h3>
            <p>Calle Marqués de Larios, 5</p>
            <p>29015 - Málaga</p>
          </div>
        </div>

        <div className={styles.row}>
          <form onSubmit={handleSubmitSendEmail}>
            <h3>Contáctanos</h3>
            {message !== "" && <p className={styles.emailMessage}>{message}</p>}
            <div className={styles.inputBox}>
              <input
                type="text"
                placeholder="Nombre"
                className={styles.box}
                value={nombre}
                onChange={handleChangeNombre}
              />
              <input
                type="email"
                placeholder="Email"
                className={styles.box}
                value={email}
                onChange={handleChangeEmail}
              />
            </div>

            <div className={styles.inputBox}>
              <p>
                Si su pregunta está relacionada con un pedido, por favor
                introduzca el número de pedido
              </p>
              <input
                type="number"
                placeholder="Número de pedido"
                className={styles.box}
                value={numeroPedido}
                onChange={handleChangeNumeroPedido}
              />
            </div>

            <div className={styles.inputBox}>
              <input
                type="text"
                placeholder="Asunto"
                className={`${styles.box} ${styles.fullWidth}`}
                value={asunto}
                onChange={handleChangeAsunto}
              />
            </div>
            <textarea
              placeholder="Mensaje"
              cols="30"
              rows="10"
              value={emailMensaje}
              onChange={handleChangeEmailMensaje}
            ></textarea>
            <input type="submit" value="Enviar" className={styles.btn} />
          </form>

          <iframe
            className={styles.map}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5150.532205640239!2d-4.425203302513003!3d36.719816966135056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd72f795a535c539%3A0x8169c62213e2a26f!2sC.%20Marqu%C3%A9s%20de%20Larios%2C%205%2C%2029015%20M%C3%A1laga!5e0!3m2!1ses!2ses!4v1657178845028!5m2!1ses!2ses"
            allowfullscreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </>
  );
}

export default Contacto;
