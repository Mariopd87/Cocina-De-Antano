import styles from "../../styles/Home.module.css";
import Image from "next/image";
import Heading from "../../components/layouts/heading";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { CartContext } from "../../context/cartContext";

function Productos({ categorias, productos }) {
  const router = useRouter();
  const { pathname, query } = router;
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("0");
  const [productList, setProductList] = useState([]);
  const { addItemToCart, setShowShoppingCart } = useContext(CartContext);

  useEffect(() => {
    setProductList(productos);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    let initialCatId = "0";

    if (query.cat !== undefined) {
      initialCatId = query.cat;
    }

    setSelectedCategory(initialCatId);
    getProductsByCategory(initialCatId);
  }, []);

  const getProductsByCategory = async (categoryId) => {
    if (!categoryId || categoryId === "0") {
      setProductList(productos);
      setIsLoaded(true);
    } else {
      await fetch(`http://localhost:8008/api/productos/cat/${categoryId}`)
        .then((data) => data.ok && data.json())
        .then((result) => {
          setProductList(result);
          setIsLoaded(true);
        });
    }
  };

  const handleCategoryClick = (e) => {
    setSelectedCategory(e.currentTarget.id);
    getProductsByCategory(e.currentTarget.id);
  };

  if (!isLoaded) {
    return (
      <>
        <Heading
          title={"Productos"}
          breadcrumb={"Inicio - Productos"}
        ></Heading>

        <section className={styles.category}>
          <h1 className={styles.title}>
            Filtrar por <span>categoría</span>
            <Link href="/categorias">
              <a>Todos los productos</a>
            </Link>
          </h1>

          <div className={styles.boxContainer}>
            {categorias.map((categoria) => (
              <a
                onClick={handleCategoryClick}
                id={categoria.id}
                className={styles.box}
                key={categoria.id}
              >
                <Image src={categoria.imagen} width={170} height={165}></Image>
                <h3>{categoria.nombre}</h3>
              </a>
            ))}
          </div>
        </section>
        <section className={styles.products}>
          <h1>Loading...</h1>
        </section>
      </>
    );
  } else {
    return (
      <>
        <Heading
          title={"Productos"}
          breadcrumb={"Inicio - Productos"}
        ></Heading>

        <section className={styles.category}>
          <h1 className={styles.title}>
            Filtrar por <span>categoría</span>
            <a onClick={handleCategoryClick} id="0">
              Todos los productos
            </a>
          </h1>

          <div className={styles.boxContainer}>
            {categorias.map((categoria) => {
              let categoryActive = "";

              if (selectedCategory == categoria.id) {
                categoryActive = styles.active;
              }

              return (
                <a
                  onClick={handleCategoryClick}
                  id={categoria.id}
                  className={`${styles.box} ${categoryActive}`}
                  key={categoria.id}
                >
                  <Image
                    src={categoria.imagen}
                    width={170}
                    height={165}
                  ></Image>
                  <h3>{categoria.nombre}</h3>
                </a>
              );
            })}
          </div>
        </section>
        <section className={styles.products}>
          <h1 className={styles.title}>
            Lista de <span>productos</span>
          </h1>

          <div className={styles.boxContainer}>
            {Array.isArray(productList) &&
              productList && productList.map((producto) => (
                <div className={styles.box} key={producto.id}>
                  <div className={styles.icons}>
                    <a
                      id={producto.id}
                      onClick={() => {
                        addItemToCart(producto);
                        setShowShoppingCart(styles.active);
                        setTimeout(() => {
                          setShowShoppingCart("");
                        }, 3000);
                      }}
                    >
                      <FontAwesomeIcon icon={faShoppingCart} />
                    </a>

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
                    <div className={styles.price}>{producto.precio}€</div>
                  </div>
                </div>
              ))}
          </div>
        </section>
      </>
    );
  }
}

export async function getServerSideProps() {
  const [categoriasRes, productsRes] = await Promise.all([
    fetch("http://localhost:8008/api/categorias"),
    fetch("http://localhost:8008/api/productos"),
  ]);

  const [categorias, productos] = await Promise.all([
    categoriasRes.json(),
    productsRes.json(),
  ]);

  return {
    props: {
      categorias,
      productos,
    },
  };
}

export default Productos;
