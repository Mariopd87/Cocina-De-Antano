import styles from "../../styles/Home.module.css";
import Heading from "../../components/layouts/heading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faHeart, faShare } from "@fortawesome/free-solid-svg-icons";

function SobreNosotros() {
  return (
    <>
      <Heading
        title={"Sobre Nosotros"}
        breadcrumb={"Inicio - Sobre Nosotros"}
      ></Heading>

      <section className={styles.about}>
        <div className={styles.image}>
          <img src="image/about-img.png" alt="" />
        </div>

        <div className={styles.content}>
          <span>Sobre Nosotros</span>
          <h3>Tripa vacía, corazón sin alegría</h3>
          <p>
            Esta idea surgió en el año 2016, haciendo platos que podéis ver en la web, de los cuales probaba toda la familia con ingredientes totalmente naturales.
          </p>
          <p>
            En este año 2022, por fin el sueño se ha podido hacer realidad y estos platos han podido salir a la luz, para que todos los malagueños puedan disfrutarlos y con el tiempo seguir creciendo para llegar a todos los rincones de España.
          </p>
        </div>
      </section>

      <section className={styles.gallery}>
        <h1 className={styles.title}>
          {" "}
          Nuestra <span>galería</span> {" "}
        </h1>

        <div className={styles.boxContainer}>
          <div className={styles.box}>
            <img src="image/about-img-1.jpg" alt="" />
            <div className={styles.icons}>
              <a>Cocina tradicional</a>
            </div>
          </div>

          <div className={styles.box}>
            <img src="image/about-img-2.jpg" alt="" />
            <div className={styles.icons}>
              <a>Modernas y seguras instalaciones</a>
            </div>
          </div>

          <div className={styles.box}>
            <img src="image/about-img-3.jpg" alt="" />
            <div className={styles.icons}>
              <a>Gran variedad de platos</a>
            </div>
          </div>

          <div className={styles.box}>
            <img src="image/about-img-4.jpg" alt="" />
            <div className={styles.icons}>
              <a>Los mejores profesionales</a>
            </div>
          </div>

          <div className={styles.box}>
            <img src="image/about-img-5.jpg" alt="" />
            <div className={styles.icons}>
              <a>Técnicas culinarias de vanguardia</a>
            </div>
          </div>

          <div className={styles.box}>
            <img src="image/about-img-6.jpg" alt="" />
            <div className={styles.icons}>
              <a>Ingredientes frescos y naturales</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SobreNosotros;
