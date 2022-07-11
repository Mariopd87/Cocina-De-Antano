import styles from "../../styles/Admin.module.css";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../../context/cartContext";

export default function AdminPanel({ children }) {
  const { user } = useContext(CartContext);

  if (user && user.user && user.user.id) {
    return (
      <div className={styles.adminPanel}>
        <section className={styles.lateralSection}>
          <Link href="/admin-panel/productos">
            <a>Gestión de Productos</a>
          </Link>
          <Link href="/admin-panel/categorias">
            <a>Gestión de Categorías</a>
          </Link>
          <Link href="/admin-panel/usuarios">
            <a>Gestión de Usuarios</a>
          </Link>
        </section>

        <section className={styles.mainSection}>{children}</section>
      </div>
    );
  } else {
    return (
      <div className={styles.adminPanel}>
        <h1>Debe estar autentificado para acceder a esta sección</h1>
      </div>
    );
  }
}
