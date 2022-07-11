import styles from "../../styles/Home.module.css";
import Heading from "../../components/layouts/heading";
import { CartContext } from "../../context/cartContext";
import { useContext } from "react";

const ProductosDetalle = (props) => {
  const producto = props.producto;
  const { addItemToCart, setShowShoppingCart } = useContext(CartContext);
  return (
    <>
      <Heading
        title={"Detalles del producto"}
        breadcrumb={"Inicio - Productos - Detalle"}
      ></Heading>

      <section className={styles.about}>
        {producto && producto.id ? (
          <>
            <div className={styles.image}>
              <img
                src={`/image/grande-${producto.imagen}`}
                alt={producto.nombreProducto}
              />
            </div>

            <div className={styles.content}>
              <span>{producto.categoria[0].nombre}</span>
              <h3>{producto.nombreProducto}</h3>
              <p>{producto.descripcion}</p>
              <p className={styles.price}>{producto.precio}€</p>
              <a
                onClick={() => {
                  addItemToCart(producto);
                  setShowShoppingCart(styles.active);
                  setTimeout(() => {
                    setShowShoppingCart("");
                  }, 3000);
                }}
                id={producto.id}
                className={styles.btn}
              >
                Añadir a la cesta
              </a>
            </div>
          </>
        ) : (
          <>
            <div className={styles.notFound}>
              <h3>Producto no encontrado</h3>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { params, res } = context;
  const { productoId } = params;

  const producto = await fetch(
    `http://localhost:8008/api/productos/${productoId}`
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return res;
      }
    })
    .then((result) => {
      return result;
    });
  
  return {
    props: {
      producto,
    },
  };
};

export default ProductosDetalle;
