import AdminPanel from "../../components/layouts/adminPanel";
import styles from "../../styles/Admin.module.css";
import { useContext } from "react";
import { CartContext } from "../../context/cartContext";

export default function AdminProductos() {
  const { user } = useContext(CartContext);

  if (user && user.user && user.user.id) {
    return (
      <AdminPanel>
        <h1>Panel de administración de Cocina de Anaño</h1>
        <h3>
          Bienvenid@ {user.user.nombre} {user.user.apellidos}
        </h3>
      </AdminPanel>
    );
  } else {
    return (
      <AdminPanel>
        <h1>Debe estar autentificado para acceder a esta sección</h1>
      </AdminPanel>
    );
  }
}
