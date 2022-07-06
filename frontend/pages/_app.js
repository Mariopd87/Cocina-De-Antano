import "../styles/globals.css";
import { useState, useEffect } from "react";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
import AppLayout from "../components/layouts";
config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      
      setUser(user);
    }
  }, []);
  return (
    <AppLayout user={user}>
      <Component {...pageProps} />
    </AppLayout>
  );
}

export default MyApp;
