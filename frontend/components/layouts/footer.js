import styles from "../../styles/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <section className={styles.footer}>
        <div className={styles.boxContainer}>
          <div className={styles.box}>
            <h3>Enlaces Rápidos</h3>
            <Link href="/">
                <a>
                    <FontAwesomeIcon icon={faArrowRight} /> Inicio
                </a>
            </Link>

            <Link href="/productos">
                <a>
                    <FontAwesomeIcon icon={faArrowRight} /> Productos
                </a>
            </Link>

            <Link href="/sobre-nosotros">
                <a>
                    <FontAwesomeIcon icon={faArrowRight} /> Sobre Nosotros
                </a>
            </Link>

            <Link href="/contacto">
                <a>
                    <FontAwesomeIcon icon={faArrowRight} /> Contacto
                </a>
            </Link>
          </div>

          <div className={styles.box}>
            <h3>Sígueme</h3>

            <a target="_blank" href="https://github.com/Mariopd87">
                <FontAwesomeIcon icon={faArrowRight} /> Github
            </a>

            <a target="_blank" href="https://www.linkedin.com/in/mario-p%C3%A9rez-dols/">
            <FontAwesomeIcon icon={faArrowRight} /> Linkedin
            </a>
          </div>
        </div>
      </section>

      <section className={styles.credit}>
        creado por{" "}
        <a> Mario Pérez Dols </a> | Todos los derechos reservados
      </section>
    </>
  );
};

export default Footer;
