import styles from "../../styles/ProductosDetalle.module.css";
import Heading from "../../components/layouts/heading";

const ProductosDetalle = (props) => {
  const producto = props.producto;

  return (
    <>
      <Heading
        title={"Detalles del producto"}
        breadcrumb={"Inicio - Productos - Detalle"}
      ></Heading>

      <section className={styles.about}>
        <div className={styles.image}>
          <img src={`/image/grande-${producto.imagen}`} alt={producto.nombreProducto} />
        </div>

        <div className={styles.content}>
          <span>Nombre de la Categoría</span>
          <h3>{producto.nombreProducto}</h3>
          <p>{producto.descripcion}</p>

          <a href="#" className={styles.btn}>
            Añadir a la cesta
          </a>
        </div>
      </section>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { params, res } = context;
  const { productoId } = params;

  const productoRes = await fetch(
    `http://localhost:8008/api/productos/${productoId}`
  );

  if (productoRes.ok) {
    let producto = await productoRes.json();

    if (!producto.status) producto = producto[0];
    else res.writeHead(404, { Location: "/" }).end();

    return {
      props: {
        producto: producto,
      },
    };
  } else {
    res.writeHead(404, { Location: "/" }).end();
  }
};

export default ProductosDetalle;
