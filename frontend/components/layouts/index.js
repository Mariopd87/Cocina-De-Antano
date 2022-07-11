import Head from "next/head";
import Header from "./header";
import Footer from "./footer";

export default function AppLayout(props) {
  const { children } = props;

  return (
    <>
      <Head>
        <title>Cocina de Antaño</title>
        <meta name="description" content="Proyecto final Bootcamp CodeSpace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header></Header>

      {children}

      <Footer></Footer>
    </>
  );
}
