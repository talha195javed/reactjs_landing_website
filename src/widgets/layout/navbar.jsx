import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
    Navbar as MTNavbar,
    Collapse,
    Typography,
    Button,
    IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export function Navbar({ brandName, routes, action }) {
    const [openNav, setOpenNav] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            window.innerWidth >= 960 && setOpenNav(false);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const navList = (
        <ul className="mb-4 mt-2 flex flex-col gap-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-8">
            {routes.map(({ name, path, icon, href, target }) => (
                <Typography
                    key={name}
                    as="li"
                    variant="small"
                    className="font-medium capitalize text-gray-900 hover:text-blue-600 transition-colors"
                >
                    {href ? (
                        <a
                            href={href}
                            target={target}
                            className="flex items-center gap-1 p-1 font-normal"
                            rel={target === "_blank" ? "noopener noreferrer" : undefined}
                        >
                            {icon &&
                                React.createElement(icon, {
                                    className: "w-5 h-5 opacity-80 mr-1",
                                })}
                            {name}
                        </a>
                    ) : (
                        <Link
                            to={path}
                            target={target}
                            className="flex items-center gap-1 p-1 font-normal"
                        >
                            {icon &&
                                React.createElement(icon, {
                                    className: "w-5 h-5 opacity-80 mr-1",
                                })}
                            {name}
                        </Link>
                    )}
                </Typography>
            ))}
        </ul>
    );

    return (
        <div className="fixed top-0 left-0 right-0 z-50 w-full bg-white shadow-sm rounded-lg">
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <MTNavbar
                    fullWidth
                    blurred={false}
                    className="border-0 py-3 bg-white shadow-none rounded-lg"
                >
                    <div className="flex items-center justify-between h-full w-full">
                        <Link to="/">
                            <Typography
                                variant="h4"
                                className="mr-4 cursor-pointer font-bold text-gray-900 font-montserrat tracking-tight"
                            >
                                <span className="text-blue-600">Smart</span>
                                <span className="text-gray-900">Visitor</span>
                                <span className="text-blue-500 text-xs ml-2 align-super">Management System</span>
                            </Typography>
                        </Link>

                        <div className="hidden lg:flex items-center gap-8 h-full">
                            <div className="hidden lg:block h-full flex items-center">{navList}</div>
                            <div className="hidden lg:flex h-full items-center">
                                {React.cloneElement(action, {
                                    className: "bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-md h-10 flex items-center rounded-lg",
                                })}
                            </div>
                        </div>

                        <IconButton
                            variant="text"
                            size="lg"
                            className="ml-auto lg:hidden text-gray-900 hover:bg-gray-100 rounded-lg"
                            onClick={() => setOpenNav(!openNav)}
                        >
                            {openNav ? (
                                <XMarkIcon className="h-7 w-7" strokeWidth={2} />
                            ) : (
                                <Bars3Icon className="h-7 w-7" strokeWidth={2} />
                            )}
                        </IconButton>
                    </div>
                </MTNavbar>

                <Collapse open={openNav} className="overflow-hidden bg-white rounded-b-lg border border-gray-100">
                    <div className="pb-4 pt-2">
                        {navList}
                        <div className="flex flex-col gap-2 px-4">
                            {React.cloneElement(action, {
                                className: "w-full h-12 flex items-center justify-center bg-blue-600 text-white rounded-lg",
                            })}
                            <Button
                                variant="outlined"
                                size="sm"
                                fullWidth
                                className="border-gray-900 text-gray-900 h-12 flex items-center justify-center rounded-lg"
                            >
                                Contact Sales
                            </Button>
                        </div>
                    </div>
                </Collapse>
            </div>
        </div>
    );
}

Navbar.defaultProps = {
    brandName: "SmartVisitor.io",
    action: (
        <Button size="md" className="lg:w-auto px-6 rounded-lg" onClick={() => (window.location.href = "/Contact")}>
            Contact Us
        </Button>
    ),
    action: (
        <Button size="md" className="lg:w-auto px-6 rounded-lg" onClick={() => (window.location.href = "/Contact")}>
            Contact Us
        </Button>
    ),
};

Navbar.propTypes = {
    brandName: PropTypes.string,
    routes: PropTypes.arrayOf(PropTypes.object).isRequired,
    action: PropTypes.node,
};

export default Navbar;
