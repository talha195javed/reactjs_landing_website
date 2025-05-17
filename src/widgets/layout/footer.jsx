import PropTypes from "prop-types";
import { Typography, IconButton } from "@material-tailwind/react";
import { motion } from "framer-motion";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";

const year = new Date().getFullYear();

export function Footer({ title, description, socials, menus, copyright }) {
  return (
      <footer className="relative bg-gradient-to-b from-gray-50 to-white pt-20 pb-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
            >
              <Typography variant="h4" className="font-bold text-gray-900">
                <span className="text-blue-600">Smart</span>Visitor Management System
              </Typography>
              <Typography className="text-gray-600">
                Revolutionizing visitor management through innovation, security, and exceptional user experiences.
              </Typography>

              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <EnvelopeIcon className="h-5 w-5 text-blue-600 mt-1" />
                  <Typography className="text-gray-600">support@smartvisitor.com</Typography>
                </div>
                <div className="flex items-start space-x-3">
                  <PhoneIcon className="h-5 w-5 text-blue-600 mt-1" />
                  <Typography className="text-gray-600">+971-123-4567</Typography>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPinIcon className="h-5 w-5 text-blue-600 mt-1" />
                  <Typography className="text-gray-600">Dubai, United Arab Emirates</Typography>
                </div>
              </div>

              <div className="flex space-x-4">
                {socials.map(({ color, name, path }, index) => (
                    <motion.a
                        key={name}
                        href={path}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <IconButton
                          variant="gradient"
                          color={color}
                          className="rounded-full shadow-lg hover:shadow-xl"
                      >
                        <i className={`fa-brands fa-${name} text-white`} />
                      </IconButton>
                    </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Footer Menus */}
            {menus.map(({ name, items }, menuIndex) => (
                <motion.div
                    key={name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: menuIndex * 0.1 }}
                    className="space-y-4"
                >
                  <Typography variant="h5" className="font-semibold text-gray-900">
                    {name}
                  </Typography>
                  <ul className="space-y-3">
                    {items.map((item, itemIndex) => (
                        <motion.li
                            key={item.name}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: itemIndex * 0.05 + menuIndex * 0.1 }}
                        >
                          <Typography
                              as="a"
                              href={item.path}
                              className="flex items-center text-gray-600 hover:text-blue-600 transition-colors group"
                          >
                            <ArrowRightIcon className="h-4 w-4 mr-2 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                            {item.name}
                          </Typography>
                        </motion.li>
                    ))}
                  </ul>
                </motion.div>
            ))}

            {/* Newsletter */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="space-y-4"
            >
              <Typography variant="h5" className="font-semibold text-gray-900">
                Newsletter
              </Typography>
              <Typography className="text-gray-600">
                Subscribe to get updates on new features and products.
              </Typography>
              <div className="flex space-x-2">
                <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:shadow-md transition-all"
                >
                  Subscribe
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Copyright */}
          <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-16 pt-6 border-t border-gray-200 text-center"
          >
            <Typography className="text-gray-600">
              © {year} SmartVisitor Management System. All rights reserved.
            </Typography>
            <div className="flex justify-center space-x-6 mt-4">
              <Typography as="a" href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                Privacy Policy
              </Typography>
              <Typography as="a" href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                Terms of Service
              </Typography>
              <Typography as="a" href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                Cookie Policy
              </Typography>
            </div>
          </motion.div>
        </div>
      </footer>
  );
}

Footer.defaultProps = {
  title: "SmartVisitor Management System",
  description: "Modern visitor management reimagined.",
  socials: [
    {
      color: "blue",
      name: "twitter",
      path: "https://twitter.com/smartvisitor",
    },
    {
      color: "blue",
      name: "linkedin",
      path: "https://linkedin.com/company/smartvisitor",
    },
    {
      color: "blue",
      name: "facebook",
      path: "https://facebook.com/smartvisitor",
    },
    {
      color: "blue",
      name: "instagram",
      path: "https://instagram.com/smartvisitor",
    },
  ],
  menus: [
    {
      name: "Product",
      items: [
        { name: "About Us", path: "/RecordPage" },
        { name: "Feature", path: "/Feature" },
        { name: "About Packages", path: "/AboutPackage" },
        { name: "Request Demo", path: "/AppDemo" },
        { name: "Contact", path: "/Contact" },
      ],
    },
    {
      name: "Pages",
      items: [
        { name: "About Us", path: "/RecordPage" },
        { name: "Feature", path: "/Feature" },
        { name: "About Packages", path: "/AboutPackage" },
        { name: "Request Demo", path: "/AppDemo" },
        { name: "Contact", path: "/Contact" },
      ],
    },
  ],
  copyright: `© ${new Date().getFullYear()} SmartVisitor Management System. All rights reserved.`,
};

Footer.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  socials: PropTypes.arrayOf(PropTypes.object),
  menus: PropTypes.arrayOf(PropTypes.object),
  copyright: PropTypes.node,
};

export default Footer;
