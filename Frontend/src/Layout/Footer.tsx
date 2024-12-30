import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="z-10 py-6 text-white bg-gray-800">
      <div className="container px-4 mx-auto">
        <div className="flex flex-wrap items-center justify-between">
          <div className="w-full mb-4 text-center md:w-1/3 md:text-left md:mb-0">
            <h2 className="text-xl font-bold">CodeMingle</h2>
            <p className="text-sm">Connecting developers around the world.</p>
          </div>
          <div className="w-full mb-4 text-center md:w-1/3 md:mb-0">
            <ul className="list-none">
              <li className="inline-block mx-2">
                <a href="#" className="text-white hover:text-gray-400">
                  Home
                </a>
              </li>
              <li className="inline-block mx-2">
                <a href="#" className="text-white hover:text-gray-400">
                  About
                </a>
              </li>
              <li className="inline-block mx-2">
                <a href="#" className="text-white hover:text-gray-400">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full text-center md:w-1/3 md:text-right">
            <p className="text-sm">
              &copy; 2023 CodeMingle. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
