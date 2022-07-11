import styles from "../styles/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSignOut,
  faUserEdit,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Link from "next/link";

function UserMenu(props) {
  const { user } = props.user;
  const { handleClickLogout } = props;

  const [showUserMenu, setShowUserMenu] = useState("");

  const handleClickUserButton = () => {
    showUserMenu ? setShowUserMenu("") : setShowUserMenu(styles.active);
  };

  const handleClickOptionUser = () => {
    setShowUserMenu("");
  };

  return (
    <>
      <div className={styles.loggedUser}>
        <div className={styles.user} onClick={handleClickUserButton}>
          <a>
            <FontAwesomeIcon icon={faUser}></FontAwesomeIcon> Hola {user.nombre}
          </a>
        </div>
        <div className={`${styles.menuUser} ${showUserMenu}`}>
          <a
            className={styles.optionUser}
            onClick={(event) => {
              handleClickOptionUser();
              handleClickLogout();
            }}
          >
            <FontAwesomeIcon icon={faSignOut}></FontAwesomeIcon>
            Desconectar
          </a>

          <Link href={`/usuario/modificar-datos/${user.id}`} onClick={handleClickOptionUser}>
            <a className={styles.optionUser}>
              <FontAwesomeIcon icon={faUserEdit}></FontAwesomeIcon>
              Modificar Datos
            </a>
          </Link>
        </div>
      </div>
    </>
  );
}

export default UserMenu;
