import "../styles/globals.css";
import { useState, useEffect } from "react";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
import AppLayout from "../components/layouts";
import { CartProvider } from "../context/cartContext";
config.autoAddCss = false;
import "../styles/ConfirmModal.css";

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </CartProvider>
  );
}

export default MyApp;
