import { Outlet, ScrollRestoration } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/globals.css";

export default function Layout() {
  return (
    <>
      <Header />
      <main className="site-main">
        <ScrollRestoration />
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
