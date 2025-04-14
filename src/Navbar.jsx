import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = function () {
    const location = useLocation();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [submenuOpen, setSubmenuOpen] = useState(false);

    // Function to handle opening the dropdown
    const openDropdown = () => {
        setDropdownOpen(true);
    };

    // Function to handle closing the dropdown
    const closeDropdown = () => {
        setDropdownOpen(false);
    };

    // Function to handle opening the submenu
    const openSubmenu = () => {
        setSubmenuOpen(true);
    };

    // Function to handle closing the submenu
    const closeSubmenu = () => {
        setSubmenuOpen(false);
    };

    return (
        <nav className="bg-emerald-500 w-full h-16 flex items-center px-6 shadow-md relative">
            <div className="container mx-auto flex items-center justify-center relative">
                <Link to="/" className="text-xl font-extrabold text-gray-800 absolute left-0">
                    CodeArena
                </Link>

                <ul className="flex space-x-10 relative">
                    <li>
                        <Link
                            to="/"
                            className={`text-gray-700 hover:text-gray-900 font-bold pb-1 ${
                                location.pathname === "/" ? "border-b-2 border-gray-900" : ""
                            }`}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/problems"
                            className={`text-gray-700 hover:text-gray-900 font-bold pb-1 ${
                                location.pathname === "/problems" ? "border-b-2 border-gray-900" : ""
                            }`}
                        >
                            Problems
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/contests"
                            className={`text-gray-700 hover:text-gray-900 font-bold pb-1 ${
                                location.pathname === "/contests" ? "border-b-2 border-gray-900" : ""
                            }`}
                        >
                            Contests
                        </Link>
                    </li>
                    
                    {/* Dropdown Menu */}
                    <li
                        className="relative"
                        onMouseEnter={openDropdown}
                        onMouseLeave={closeDropdown}
                    >
                        <button className="text-gray-700 hover:text-gray-900 font-bold pb-1 focus:outline-none">
                            More ▼
                        </button>
                        {dropdownOpen && (
                            <ul className="absolute left-0 mt-2 w-48 bg-gray-300 shadow-lg rounded-lg">
                                <li onClick={closeDropdown}>
                                    <Link
                                        to="/about"
                                        className="block px-4 py-2 text-gray-800 hover:bg-gray-400 rounded-t-lg"
                                    >
                                        About Us
                                    </Link>
                                </li>
                                <li
                                    className="relative"
                                    onMouseEnter={openSubmenu}
                                    onMouseLeave={closeSubmenu}
                                >
                                    <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-400 focus:outline-none">
                                        Resources ▶
                                    </button>
                                    {submenuOpen && (
                                        <ul className="absolute left-full top-0 mt-0 w-48 bg-gray-300 shadow-lg rounded-lg">
                                            <li onClick={closeDropdown}>
                                                <Link
                                                    to="/tutorials"
                                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-400 rounded-t-lg"
                                                >
                                                    Tutorials
                                                </Link>
                                            </li>
                                            <li onClick={closeDropdown}>
                                                <Link
                                                    to="/blog"
                                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-400 rounded-b-lg"
                                                >
                                                    Blog
                                                </Link>
                                            </li>
                                        </ul>
                                    )}
                                </li>
                                <li onClick={closeDropdown}>
                                    <Link
                                        to="/contact"
                                        className="block px-4 py-2 text-gray-800 hover:bg-gray-400 rounded-b-lg"
                                    >
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
