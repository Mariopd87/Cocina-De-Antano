import { useState, useEffect } from "react";
import styles from "../../styles/Home.module.css";
import Image from "next/image";
import NavBar from "../../components/layouts/navbar";
import LoginButton from "../login-button";
import UserMenu from "../user-menu";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faSearch,
  faShoppingCart,
  faUser,
  faShoppingBasket,
} from "@fortawesome/free-solid-svg-icons";

const Header = (props) => {
  // Messages
  const [message, setMessage] = useState("");
  // Visible CSS classes Properties
  const [showSearch, setShowSearch] = useState("");
  const [showShoppingCart, setShowShoppingCart] = useState("");
  const [showLoginForm, setShowLoginForm] = useState("");
  const [showRegisterForm, setShowRegisterForm] = useState("");
  // Login Properties
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  // Register Properties
  const [registerName, setRegisterName] = useState("");
  const [registerLastName, setRegisterLastName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  // User logged info
  const [user, setUser] = useState(props.user);

  useEffect(() => {
    setUser(props.user)
  }, []);

  /**
   * Show Search Form
   */
  const handleShowSearch = () => {
    showSearch ? setShowSearch("") : setShowSearch(styles.active);
    setShowShoppingCart("");
    setShowLoginForm("");
    setShowRegisterForm("");
  };

  /**
   * Show Shopping Cart
   */
  const handleShowShoppingCart = () => {
    showShoppingCart
      ? setShowShoppingCart("")
      : setShowShoppingCart(styles.active);
    setShowSearch("");
    setShowLoginForm("");
    setShowRegisterForm("");
  };

  /**
   * Show Login Form
   */
  const handleShowLoginForm = () => {
    showLoginForm ? setShowLoginForm("") : setShowLoginForm(styles.active);
    setShowSearch("");
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
   * Show Register Form
   */
  const handleShowRegisterForm = () => {
    showRegisterForm
      ? setShowRegisterForm("")
      : setShowRegisterForm(styles.active);
    setShowSearch("");
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
   * Get user data after login
   */
  const fetchLogin = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: loginEmail, password: loginPassword }),
    };

    await fetch("http://localhost:8008/api/login", requestOptions)
      .then((res) => res.ok && res.json())
      .then((result) => {
        if (result.status == "200") {
          const userResult = {
            token: result.token,
            user: {
              nombre: result.user.nombre,
              id: result.user.id,
              email: result.user.email,
            },
          };
          window.localStorage.setItem(
            'loggedUser', JSON.stringify(userResult)
          )
          setUser(userResult);
          setMessage(result.message);
          setShowLoginForm("");
        } else {
          setMessage(result.message);
        }
      });
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
      .then((res) => res.ok && res.json())
      .then((result) => {
        if (result.status == "200") {
          setRegisterName("");
          setRegisterLastName("");
          setRegisterEmail("");
          setRegisterPassword("");
          setMessage(result.message);

          setShowRegisterForm("");
          setShowLoginForm(styles.active);
        } else {
          setMessage(result.message);
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

  const handleIfYouCan = async () => {
    if (user && user !== "undefined") {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${user.token}`,
        },
      };

      await fetch("http://localhost:8008/api/usuarios", requestOptions)
        .then((res) => res.ok && res.json())
        .then((result) => {
          console.log(result);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };

  return (
    <header className={styles.header}>
      <Link href="/">
        <a className={styles.logo}>
          <img src="image/logo.png" alt="Cocina de Antaño" />
        </a>
      </Link>

      <NavBar></NavBar>

      <div className={styles.icons}>
        <div className={styles.menuBtn}>
          <FontAwesomeIcon icon={faBars} />
        </div>
        <div onClick={handleShowSearch}>
          <FontAwesomeIcon icon={faSearch} />
        </div>
        <div onClick={handleShowShoppingCart}>
          <FontAwesomeIcon icon={faShoppingCart} />
        </div>
        {user && user.user && user.user.id ? (
          <UserMenu user={user}></UserMenu>
        ) : (
          <LoginButton handleShowLoginForm={handleShowLoginForm}></LoginButton>
        )}
      </div>
      <form action="" className={`${styles.searchForm} ${showSearch}`}>
        <input type="search" placeholder="Escribe aquí para buscar" />
        <label className="fas fa-search"></label>
      </form>

      <div className={`${styles.shoppingCart} ${showShoppingCart}`}>
        <div className={styles.box}>
          <i className="fas fa-times"></i>
          <Image src="/image/cart-1.jpg" width={112} height={124}></Image>
          <div className="content">
            <h3>organic food</h3>
            <span className="quantity">1</span>
            <span className="multiply">x</span>
            <span className="price">$18.99</span>
          </div>
        </div>
        <div className={styles.box}>
          <i className="fas fa-times"></i>
          <Image src="/image/cart-2.jpg" width={112} height={124}></Image>
          <div className="content">
            <h3>organic food</h3>
            <span className="quantity">1</span>
            <span className="multiply">x</span>
            <span className="price">$18.99</span>
          </div>
        </div>
        <div className={styles.box}>
          <i className="fas fa-times"></i>
          <Image src="/image/cart-3.jpg" width={112} height={124}></Image>
          <div className="content">
            <h3>organic food</h3>
            <span className="quantity">1</span>
            <span className="multiply">x</span>
            <span className="price">$18.99</span>
          </div>
        </div>
        <h3 className={styles.total}>
          {" "}
          total : <span>56.97</span>{" "}
        </h3>
        <a href="#" className={styles.btn}>
          checkout cart
        </a>
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
  );
};

export default Header;
