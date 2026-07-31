import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./Page";
import AboutPage from "./app/about/Page";
import HelpPage from "./app/help/Page";
import NewsPage from "./app/news/Page";
import PartnersPage from "./app/partners/Page";
import DocumentsPage from "./app/documents/Page";
import ReportsPage from "./app/reports/Page";
import ContactsPage from "./app/contacts/Page";
import Layout from "./app/Layout";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home />, handle: { title: "Главная" } },
        { path: "about", element: <AboutPage />, handle: { title: "О фонде" } },
        {
          path: "help",
          element: <HelpPage />,
          handle: { title: "Помочь фонду" },
        },
        { path: "news", element: <NewsPage />, handle: { title: "Новости" } },
        {
          path: "partners",
          element: <PartnersPage />,
          handle: { title: "Партнёры" },
        },
        {
          path: "documents",
          element: <DocumentsPage />,
          handle: { title: "Документы" },
        },
        {
          path: "reports",
          element: <ReportsPage />,
          handle: { title: "Отчёты" },
        },
        {
          path: "contacts",
          element: <ContactsPage />,
          handle: { title: "Контакты" },
        },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
);

export default function App() {
  return <RouterProvider router={router} />;
}
