import { Link, useLocation, useNavigate } from "react-router-dom"; // Add useNavigate
import { useState } from "react";
import { useAuth } from "./auth/AuthContext";
import AuthModal from "./auth/AuthModal";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Add navigate hook
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState("login");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { user, logout } = useAuth();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Problems", path: "/problems" },
    { name: "Contests", path: "/contests" },
    ...(user ? [{ name: "Profile", path: "/profile" }] : []), // Add Profile link when logged in
  ];
  

  const handleLogout = () => {
    logout(); // Clear user data
    navigate("/"); // Redirect to problems page
    setMobileMenuOpen(false); // Close mobile menu if open
  };

  return (
    <>
      <nav className="bg-emerald-500 w-full shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center relative">
          {/* Left - Logo */}
          <Link to="/" className="text-2xl font-extrabold text-gray-800">
            CodeArena
          </Link>

          {/* Center Nav (Desktop only) */}
          <ul className="hidden md:flex space-x-10 absolute left-1/2 transform -translate-x-1/2">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`text-gray-700 hover:text-white font-bold pb-1 ${
                    location.pathname === item.path
                      ? "border-b-2 border-white"
                      : ""
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}

            {/* Dropdown - More */}
            <li
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => {
                setDropdownOpen(false);
                setSubmenuOpen(false);
              }}
            >
              <button
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
                className="text-gray-700 hover:text-white font-bold pb-1 focus:outline-none"
              >
                More ▼
              </button>
              {dropdownOpen && (
                <ul className="absolute left-0 mt-2 w-48 bg-emerald-400 shadow-lg rounded-lg transition-all duration-200 ease-in-out">
                  <li>
                    <Link
                      to="/about"
                      className="block px-4 py-2 text-white hover:bg-emerald-500 rounded-t-lg"
                    >
                      About Us
                    </Link>
                  </li>
                  <li
                    className="relative"
                    onMouseEnter={() => setSubmenuOpen(true)}
                    onMouseLeave={() => setSubmenuOpen(false)}
                  >
                    <button
                      aria-haspopup="true"
                      aria-expanded={submenuOpen}
                      className="block w-full text-left px-4 py-2 text-white hover:bg-emerald-500"
                    >
                      Resources ▶
                    </button>
                    {submenuOpen && (
                      <ul className="absolute left-full top-0 mt-0 w-48 bg-emerald-400 shadow-lg rounded-lg transition-all duration-200 ease-in-out">
                        <li>
                          <Link
                            to="/tutorials"
                            className="block px-4 py-2 text-white hover:bg-emerald-500"
                          >
                            Tutorials
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/blog"
                            className="block px-4 py-2 text-white hover:bg-emerald-500"
                          >
                            Blog
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className="block px-4 py-2 text-white hover:bg-emerald-500 rounded-b-lg"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>

          {/* Right - Auth buttons (Desktop) */}
          <div className="hidden md:flex space-x-4">
            {user ? (
              <button
                onClick={handleLogout} // Use handleLogout
                className="bg-white text-emerald-700 font-semibold px-4 py-1.5 rounded-md shadow hover:bg-gray-100"
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    setAuthTab("login");
                    setAuthModalOpen(true);
                  }}
                  className="bg-white text-emerald-700 font-semibold px-4 py-1.5 rounded-md shadow hover:bg-gray-100"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setAuthTab("register");
                    setAuthModalOpen(true);
                  }}
                  className="bg-white text-emerald-700 font-semibold px-4 py-1.5 rounded-md shadow hover:bg-gray-100"
                >
                  Register
                </button>
              </>
            )}
          </div>

          {/* Hamburger Menu - Mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pb-4 space-y-2 bg-emerald-600 transition-all duration-300 ease-in-out">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-white py-2 font-semibold ${
                  location.pathname === item.path ? "underline" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-white py-2 font-semibold"
            >
              About Us
            </Link>
            <Link
              to="/tutorials"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-white py-2 font-semibold"
            >
              Tutorials
            </Link>
            <Link
              to="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-white py-2 font-semibold"
            >
              Blog
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-white py-2 font-semibold"
            >
              Contact
            </Link>

            {/* Auth (Mobile) */}
            {user ? (
              <button
                onClick={handleLogout} // Use handleLogout
                className="w-full text-left text-white font-semibold py-2"
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    setAuthTab("login");
                    setAuthModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left text-white font-semibold py-2"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setAuthTab("register");
                    setAuthModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left text-white font-semibold py-2"
                >
                  Register
                </button>
              </>
            )}
          </div>
        )}
      </nav>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialTab={authTab}
      />
    </>
  );
};

export default Navbar;