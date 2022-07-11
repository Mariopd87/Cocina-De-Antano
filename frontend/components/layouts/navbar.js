import styles from '../../styles/Home.module.css'
import Link from 'next/link'
import { CartContext } from '../../context/cartContext';
import { useContext } from 'react';

function NavBar() {
    const { user } = useContext(CartContext);
    return (
        <nav className={styles.navbar}>
            <Link href="/">
                <a>Inicio</a>
            </Link>

            <Link href="/productos">
                <a>Productos</a>
            </Link>

            <Link href="/sobre-nosotros">
                <a>Sobre Nosotros</a>
            </Link>

            <Link href="/contacto">
                <a>Contacto</a>
            </Link>

            {
                user && user.user && user.user.id && user.user.rol === 'admin' &&
                <Link href="/admin-panel" className={styles.btnAdmin}>
                    <a>Panel de Administración</a>
                </Link>
            }
        </nav>
    );
}

export default NavBar;
