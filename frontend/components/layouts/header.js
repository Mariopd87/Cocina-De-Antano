import { useState } from "react";
import styles from "../../styles/Home.module.css";
import NavBar from "./navbar";
import LoginButton from "../login-button";
import UserMenu from "../user-menu";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faShoppingCart,
  faTimes,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../../context/cartContext";
import { useContext } from "react";
import Image from "next/image";
import Router from "next/router";

const Header = () => {
  const {
    shoppingCart,
    setShoppingCart,
    removeItemToCart,
    lowQtyItemCart,
    highQtyItemCart,
    showShoppingCart,
    setShowShoppingCart,
    user,
    setUser,
  } = useContext(CartContext);
  // Messages
  const [message, setMessage] = useState("");
  // Visible CSS classes Properties
  const [showLoginForm, setShowLoginForm] = useState("");
  // User logged info
  const [showRegisterForm, setShowRegisterForm] = useState("");
  // Login Properties
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  // Register Properties
  const [registerName, setRegisterName] = useState("");
  const [registerLastName, setRegisterLastName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  /**
   * Show Login Form
   */
  const handleShowLoginForm = () => {
    showLoginForm ? setShowLoginForm("") : setShowLoginForm(styles.active);
    setShowShoppingCart("");
    setShowRegisterForm("");
  };

  /**
   * Submit Login Form
   */
  const handleSubmitLoginForm = (e) => {
    fetchLogin();
    e.preventDefault();
  };

  /**
   * Show Shopping Cart
   */
  const handleShowShoppingCart = () => {
    showShoppingCart
      ? setShowShoppingCart("")
      : setShowShoppingCart(styles.active);
    setShowLoginForm("");
    setShowRegisterForm("");
  };

  /**
   * Show Register Form
   */
  const handleShowRegisterForm = () => {
    showRegisterForm
      ? setShowRegisterForm("")
      : setShowRegisterForm(styles.active);
    setShowShoppingCart("");
    setShowLoginForm("");
  };

  /**
   * Submit Register Form
   */
  const handleSubmitRegisterForm = (e) => {
    fetchRegister();
    e.preventDefault();
  };

  /**
   * Action login
   */
  const fetchLogin = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: loginEmail, password: loginPassword }),
    };

    await fetch("http://localhost:8008/api/login", requestOptions)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          if (res.status == "400") {
            setMessage("Usuario no encontrado en la Base de Datos");
          } else if (res.status == "401") {
            setMessage("La contraseña no es correcta");
          } else if (res.status == "500") {
            setMessage("Error interno del servidor");
          }

          return res;
        }
      })
      .then((result) => {
        if (result !== "undefined" && result.status == "200") {
          const userResult = {
            token: result.token,
            user: {
              nombre: result.user.nombre,
              apellidos: result.user.apellidos,
              id: result.user.id,
              email: result.user.email,
              rol: result.user.rol
            },
          };
          window.localStorage.setItem("loggedUser", JSON.stringify(userResult));
          setUser(userResult);
          setMessage("");
          setLoginEmail("");
          setLoginPassword("");
          setShowLoginForm("");
        } else {
          if (result.status == "400") {
            setMessage("Usuario no encontrado en la Base de Datos");
          } else if (result.status == "401") {
            setMessage("La contraseña no es correcta");
          } else if (result.status == "500") {
            setMessage("Error interno del servidor");
          }
        }
      });
  };

  /**
   * Action logout
   */
  const handleClickLogout = async () => {
    setUser(undefined);
    window.localStorage.removeItem("loggedUser");
    Router.push("/");
  };

  /**
   * Register data into DB
   */
  const fetchRegister = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: registerName,
        apellidos: registerLastName,
        email: registerEmail,
        password: registerPassword,
        genero: null,
        direccion: null,
        direccion2: null,
        codigoPostal: null,
        telefono: null,
      }),
    };

    await fetch("http://localhost:8008/api/registro", requestOptions)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          if (res.status == "400") {
            setMessage("El email ya está registrado en la base de datos");
          } else if (res.status == "401") {
            setMessage("Por favor, debe rellenar todos los campos");
          } else if (res.status == "500") {
            setMessage("Error interno del servidor");
          }

          return res;
        }
      })
      .then((result) => {
        if (result !== "undefined" && result.status == "200") {
          setRegisterName("");
          setRegisterLastName("");
          setRegisterEmail("");
          setRegisterPassword("");
          setMessage("");

          setShowRegisterForm("");
          setShowLoginForm(styles.active);
        } else {
          if (result.status == "400") {
            setMessage("El email ya existe en la Base de Datos");
          } else if (result.status == "401") {
            setMessage("Debe rellenar todos los campos");
          } else if (result.status == "500") {
            setMessage("Error interno del servidor");
          }
        }
      });
  };

  /**
   * Properties Login
   */
  // Email
  const handleChangeLoginEmail = (e) => {
    setLoginEmail(e.target.value);
  };

  // Password
  const handleChangeLoginPassword = (e) => {
    setLoginPassword(e.target.value);
  };

  /**
   * Properties Register
   */
  // Nombre
  const handleChangeRegisterName = (e) => {
    setRegisterName(e.target.value);
  };

  // Apellidos
  const handleChangeRegisterLastName = (e) => {
    setRegisterLastName(e.target.value);
  };

  // Email
  const handleChangeRegisterEmail = (e) => {
    setRegisterEmail(e.target.value);
  };

  // Password
  const handleChangeRegisterPassword = (e) => {
    setRegisterPassword(e.target.value);
  };

  /**
   * Hader Pedido
   */

  const handleClickHacerPedido = () => {
    setShoppingCart([]);
    setMessage("Pedido enviado correctamente, gracias!");
    setTimeout(() => {
      setMessage("");
    }, 3000)
    
  };

  let shoppingCartTotal = 0;

  return (
    <>
      <header className={styles.header}>
        <Link href="/">
          <a className={styles.logo}>
            <Image
              src="/image/logo.png"
              alt="Cocina de Antaño"
              width={215}
              height={100}
            ></Image>
          </a>
        </Link>

        <NavBar></NavBar>

        <div className={styles.icons}>
          <div className={styles.menuBtn}>
            <FontAwesomeIcon icon={faBars} />
          </div>
          <div onClick={handleShowShoppingCart}>
            <FontAwesomeIcon icon={faShoppingCart} />
          </div>

          {user && user.user && user.user.id ? (
            <UserMenu
              user={user}
              handleClickLogout={handleClickLogout}
            ></UserMenu>
          ) : (
            <LoginButton
              handleShowLoginForm={handleShowLoginForm}
            ></LoginButton>
          )}
        </div>
        <div className={`${styles.shoppingCart} ${showShoppingCart}`}>
          <h3 className={styles.title}>Carro de la compra</h3>
          <p className={styles.message}>{message}</p>
          {shoppingCart !== "undefined" &&
          Array.isArray(shoppingCart) &&
          shoppingCart &&
          shoppingCart.length > 0 ? (
            shoppingCart.map((cartItem) => {
              shoppingCartTotal =
                shoppingCartTotal + cartItem.precio * cartItem.qty;
              if (cartItem !== "undefined" && typeof cartItem !== "undefined") {
                return (
                  <div className={styles.box} key={`cart-${cartItem.id}`}>
                    <a
                      id={cartItem.id}
                      onClick={() => removeItemToCart(cartItem.id)}
                    >
                      <FontAwesomeIcon
                        className={styles.faTimes}
                        icon={faTimes}
                      ></FontAwesomeIcon>
                    </a>
                    <img src={`/image/${cartItem.imagen}`} />
                    <div className={styles.content}>
                      <h3>
                        <Link href={`/productos/${cartItem.id}`}>
                          <a>{cartItem.nombreProducto.substring(0, 22)}</a>
                        </Link>
                      </h3>
                      <div className={styles.qtyShoppingCart}>
                        <button
                          type="button"
                          className={`${styles.btnQtyShoppingCart} ${styles.buttonLeft}`}
                          onClick={() => lowQtyItemCart(cartItem.id)}
                          id={`${cartItem.id}`}
                        >
                          <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
                        </button>
                        <span>{cartItem.qty}</span>
                        <button
                          type="button"
                          className={`${styles.btnQtyShoppingCart} ${styles.buttonRight}`}
                          onClick={() => highQtyItemCart(cartItem.id)}
                          id={`${cartItem.id}`}
                        >
                          <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                        </button>
                      </div>
                      <span className={styles.price}>{cartItem.precio}€</span>
                    </div>
                  </div>
                );
              }
            })
          ) : (
            <p>No hay productos en el carro</p>
          )}
          {shoppingCart &&
            shoppingCart !== "undefined" &&
            Array.isArray(shoppingCart) &&
            shoppingCart.length > 0 && (
              <>
                <h3 className={styles.total}>
                  {" "}
                  total :{" "}
                  <span>
                    {Math.round((shoppingCartTotal + Number.EPSILON) * 100) /
                      100}
                    €
                  </span>{" "}
                </h3>
                <a className={styles.btn} onClick={handleClickHacerPedido}>
                  Hacer Pedido
                </a>
              </>
            )}
        </div>
        <form
          onSubmit={handleSubmitLoginForm}
          className={`${styles.loginForm} ${showLoginForm}`}
        >
          <h3>Identifícate</h3>
          <p className={styles.message}>{message}</p>
          <input
            value={loginEmail}
            onChange={handleChangeLoginEmail}
            type="email"
            placeholder="Introduce el email"
            className={styles.box}
          />
          <input
            value={loginPassword}
            onChange={handleChangeLoginPassword}
            type="password"
            placeholder="Introduce la contraseña"
            className={styles.box}
          />
          <input type="submit" value="Identifícate" className={styles.btn} />
          <a onClick={handleShowRegisterForm}>¿Aun no tienes cuenta?</a>
        </form>

        <form
          onSubmit={handleSubmitRegisterForm}
          className={`${styles.loginForm} ${showRegisterForm}`}
        >
          <h3>Registo de nuevo usuario</h3>
          <p className={styles.message}>{message}</p>
          <input
            value={registerName}
            onChange={handleChangeRegisterName}
            type="text"
            placeholder="Nombre"
            className={styles.box}
          />
          <input
            value={registerLastName}
            onChange={handleChangeRegisterLastName}
            type="text"
            placeholder="Apellidos"
            className={styles.box}
          />
          <input
            value={registerEmail}
            onChange={handleChangeRegisterEmail}
            type="email"
            placeholder="Email"
            className={styles.box}
          />
          <input
            value={registerPassword}
            onChange={handleChangeRegisterPassword}
            type="password"
            placeholder="Contraseña"
            className={styles.box}
          />
          <input type="submit" value="Regístrate" className={styles.btn} />
        </form>
      </header>
    </>
  );
};

export default Header;
