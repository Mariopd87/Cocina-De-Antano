import styles from '../../styles/Home.module.css'
import Link from 'next/link'

function NavBar() {
    return (
        <nav className={styles.navbar}>
            <Link href="/">
                <a>Inicio</a>
            </Link>

            <Link href="/productos">
                <a>Productos</a>
            </Link>

            <Link href="/productos">
                <a>Sobre Nosotros</a>
            </Link>

            <Link href="/productos">
                <a>Contacto</a>
            </Link>
        </nav>
    );
}

export default NavBar;
