import styles from "../styles/Home.module.css";
import Link from "next/link";
import Heading from "../components/layouts/heading";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

export default function Home({ categorias, latestProducts }) {
  return (
    <>
      <Heading title={"Cocina de Antaño"} breadcrumb={"Inicio"}></Heading>

      <section className={styles.infoContainer}>
        <h1>No es comida rápida, <b>es comer sin perder el tiempo.</b></h1>
        <h3>¿Qué harías con 5 horas extra a la semana?</h3>
        
        <div className={styles.info}>
          <img src="image/icono-inicio-1.png" alt="" />
          <div className={styles.content}>
            <h3>Olvídate de hacer las compras</h3>
            <p>No pierdas 1 hora y media a la semana (para que después gran parte de la compra termine en la basura)</p>
          </div>
        </div>

        <div className={styles.info}>
          <img src="image/icono-inicio-2.png" alt="" />
          <div className={styles.content}>
            <h3>Deja que nuestros chefs cocinen por ti</h3>
            <p>Te ahorrará tiempo (y créenos que saben como hacerlo)</p>
          </div>
        </div>

        <div className={styles.info}>
          <img src="image/icono-inicio-3.png" alt="" />
          <div className={styles.content}>
            <h3>De fregar platos y cacharros, paso...</h3>
            <p>Hacerlo de vez en cuando tampoco está mal. Pero vamos.... todos los días NO</p>
          </div>
        </div>
      </section>

      <section className={styles.category}>
        <h1 className={styles.title}>
          Nuestras <span>categorías</span>
          <Link href="/categorias">
            <a>Ver Todas >></a>
          </Link>
        </h1>

        <div className={styles.boxContainer}>
          {categorias.map((categoria) => (
            <Link href="#">
              <a className={styles.box}>
                <Image src={categoria.imagen} width={170} height={165}></Image>
                <h3>{categoria.nombre}</h3>
              </a>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.products}>
        <h1 className={styles.title}>
          Últimos <span>productos</span>
          <Link href="/productos">
            <a>Ver Todos >></a>
          </Link>
        </h1>

        <div className={styles.boxContainer}>
          {latestProducts.map((producto) => (
            <div className={styles.box} key={producto.id}>
              <div className={styles.icons}>
                <Link href="#" key={`cart-${producto.id}`}>
                  <a>
                    <FontAwesomeIcon icon={faShoppingCart} />
                  </a>
                </Link>

                <Link href={`/productos/${producto.id}`} key={producto.id}>
                  <a>
                    <FontAwesomeIcon icon={faEye} />
                  </a>
                </Link>
              </div>
              <div className={styles.image}>
                <img src={`image/${producto.imagen}`} />
              </div>
              <div className={styles.content}>
                <h3>{producto.nombreProducto}</h3>
                <p className={styles.description}>
                  {producto.descripcionShort.substring(0, 140)}...
                </p>
                <div className={styles.price}>18.99€</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export const getServerSideProps = async () => {
  const [categoriasRes, latestProductsRes] = await Promise.all([
    fetch("http://localhost:8008/api/categorias"),
    fetch("http://localhost:8008/api/productos/novedades"),
  ]);

  const [categorias, latestProducts] = await Promise.all([
    categoriasRes.json(),
    latestProductsRes.json(),
  ]);

  return {
    props: {
      categorias,
      latestProducts,
    },
  };
};
