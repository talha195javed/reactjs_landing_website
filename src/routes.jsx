import { Home, SignIn, SignUp } from "@/pages";
import AboutPage from "@/pages/AboutPage.jsx";
import Contact from "@/pages/Contact.jsx";
import Feature from "@/pages/Feature.jsx";
import AboutPackage from "@/pages/AboutPackage.jsx";
import AppDemo from "@/pages/AppDemo.jsx";

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
    path: "/AppDemo",
    element: <AppDemo />,
  },
  {
    name: "",
    path: "/Contact",
    element: <Contact />,
  },
];

export default routes;
