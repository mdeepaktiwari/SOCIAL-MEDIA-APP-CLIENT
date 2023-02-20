import { UserProvider } from "../context";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "../components/Nav";
import Head from "next/head";
// toastify for toast notification
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// to provide context wrap whole application with UserProvider
function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Head>
        <link rel="stylesheet" href="/css/styles.css" />
      </Head>
      <Nav />
      <ToastContainer position="top-left" />
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
// import "antd";
