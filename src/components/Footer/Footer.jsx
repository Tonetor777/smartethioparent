import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#0052B4] text-white py-8 w-full absolute bottom-0">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-x-4 gap-y-2 md:gap-y-0 justify-center items-center mt-4 md:mt-0 text-center">
          {[
            { name: "About", link: "/about" },
            "Contact",
            "Support Center",
            "Community",
            "Privacy Policy",
            "Terms of Service",
          ].map((item, index) => (
            <span key={index} className="mb-2">
              {typeof item === "string" ? (
                <a href="#" className="hover:text-gray-400">
                  {item}
                </a>
              ) : (
                <Link to={item.link} className="hover:text-gray-400">
                  {item.name}
                </Link>
              )}
            </span>
          ))}
        </div>
        <div className="flex justify-center items-center mt-8">
          <div className="flex ml-8">
            {[
              { icon: FaFacebook, link: "#" },
              { icon: FaInstagram, link: "#" },
              { icon: FaTiktok, link: "#" },
              { icon: FaTwitter, link: "#" },
              { icon: FaYoutube, link: "#" },
            ].map((social, index) => (
              <a key={index} href={social.link} className="mr-6">
                <social.icon className="hover:text-gray-400" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-2 text-center">
        <span>&copy;</span> 2024 SmartEthioParent. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
