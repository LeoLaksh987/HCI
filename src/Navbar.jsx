import { Link } from "react-router-dom";

const Navbar = function () {
    return (
        <nav className="bg-stone-300 w-full h-16 flex items-center px-6 shadow-md relative">
            <div className="container mx-auto flex items-center justify-center relative">

                <Link to="/" className="text-xl font-bold text-gray-800 absolute left-0">
                    CodeArena
                </Link>

                <ul className="flex space-x-10">
                    <li><Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link></li>
                    <li><Link to="/problems" className="text-gray-700 hover:text-gray-900">Problems</Link></li>
                    <li><Link to="/contests" className="text-gray-700 hover:text-gray-900">Contests</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
