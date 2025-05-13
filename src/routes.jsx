import { Home } from "@/pages";
import AboutPage from "@/pages/AboutPage.jsx";
import Contact from "@/pages/Contact.jsx";
import Feature from "@/pages/Feature.jsx";
import AboutPackage from "@/pages/AboutPackage.jsx";
import PaymentPage from "@/pages/PaymentPage.jsx";
import AppDemo from "@/pages/AppDemo.jsx";
import SignUp from "@/pages/SignUp";
import SignIn from "@/pages/SignIn";

export const routes = [
  {
    name: "home",
    path: "/home",
    element: <Home />,
  },
  {
    name: "About",
    path: "/AboutPage",
    element: <AboutPage />,
  },
  {
    name: "Feature",
    path: "/Feature",
    element: <Feature />,
  },
  {
    name: "Packages",
    path: "/AboutPackage",
    element: <AboutPackage />,
  },
  {
    name: "",
    path: "/payment",
    element: <PaymentPage />,
  },
  {
    name: "",
    path: "/AppDemo",
    element: <AppDemo />,
  },
  {
    name: "",
    path: "/Contact",
    element: <Contact />,
  },
  {
    name: "",
    path: "/signup",
    element: <SignUp />,
  },
  {
    name: "",
    path: "/signin",
    element: <SignIn />,
  },
];

export default routes;
