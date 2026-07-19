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
        { index: true, element: <Home /> },
        { path: "about", element: <AboutPage /> },
        { path: "help", element: <HelpPage /> },
        { path: "news", element: <NewsPage /> },
        { path: "partners", element: <PartnersPage /> },
        { path: "documents", element: <DocumentsPage /> },
        { path: "reports", element: <ReportsPage /> },
        { path: "contacts", element: <ContactsPage /> },
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
