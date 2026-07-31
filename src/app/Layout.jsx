import { Outlet, ScrollRestoration, useMatches } from "react-router";
import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/globals.css";

export default function Layout() {
  const matches = useMatches();
  const currentMatch = matches[matches.length - 1];
  const pageTitle = currentMatch?.handle?.title ?? "Дария нуру";

  useEffect(() => {
    document.title = pageTitle ? `${pageTitle} — Дария нуру` : "Дария нуру";
  }, [pageTitle]);

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
