import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav class="bg-white border-white-200 sm:px-20 py-2.5 rounded dark:bg-gray-900 ">
      <div class="container flex justify-center items-center mx-auto">
        <Link to="/markets" class="flex items-center mr-80">
          <img
            src="https://crypto.com/static/crypto-com-logo-97d76b3f915718114e9259313d3da5fc.png"
            alt="logo"
            className="mr-3 h-6 sm:h-9"
          />
          <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Coin Details
          </span>
        </Link>
        <ul class="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-10 md:mt-0 md:text-base md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
            <Link
              to="/markets"
              className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
            >
              Markets
            </Link>
          </li>

          <li>
            <Link
              to="/about"
              className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
            >
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
