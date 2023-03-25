import React, { useState } from "react";
import { motion } from "framer-motion";
import logo from "../../Assets/Home/Logo.png";
import { useLogout } from "../../Hooks/useLogout";

function Navbar() {
  const [toggle, setToggle] = useState(false);
  const { logout } = useLogout();

  const handleClickLogout = async (e) => {
    logout();
  };

  const HamOpen = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="black"
      className="w-10 h-10"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  );

  const HamClose = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="black"
      className="w-10 h-10"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );

  return (
    <nav className="w-full bg-[#CCAD8F] flex flex-row justify-between z-30 fixed transition duration-600 shadow-xl">
      <div className="logo md:px-0 flex justify-center items-center md:w-1/3 md:h-1/3 xlsm:px-3 xlsm:py-6 xs:px-6 xs:py-6 transition duration-600">
        <a href="/">
          <img
            className="cursor-pointer w-[80px] xs:w-[130px] sm:w-[120px] md:w-[80px] mt-[-10px] my-[-11px] mb-[-22px]"
            src={logo}
            alt="Culrav Logo"
          />
        </a>
      </div>

      <div className="container px-3 mr-[50px] flex justify-end xl:px-500px pt-[94px] 2xl:pt-[110px] xl:pt-[72px] lg:pt-[0px] lg:mt-[-16px] md:pt-[0px] md:mt-[-9px]">
        <ul className="flex flex-row items-center justify-end text-xs text-black mb-[-23px]">
          <a
            href="/"
            className="hidden lg:mt-[-7px] text-white md:block md:mt-[-15px] xl:mt-[-80px] 2xl:mt-[-120px] mx-2 px-1 lg:mx-3 lg:px-2 relative font-Mont before:content-[''] before:absolute before:bg-dark before:h-[3px] before:w-[0px] before:left-0 before:bottom-[-8px] before:transition-[0.3s] before:duration-300 hover:before:w-[66px] hover:text-dark"
          >
            <li
              className="text-sm mr-[15px] sm:text-[12px] cursor-pointer lg:text-[14px] 2xl:text-[15px]"
              key={`link-teampage`}
            >
              HOME
            </li>
          </a>
          <div className="hidden lg:mt-[-7px] text-white md:block md:mt-[-15px] xl:mt-[-80px] 2xl:mt-[-120px] mx-2 px-1 lg:mx-3 lg:px-2 relative font-Mont before:content-[''] before:absolute before:h-[3px] before:w-[0px] before:left-0 before:bottom-[-8px] before:transition-[0.3s] before:duration-300 hover:before:w-[66px]">
            <button onClick={handleClickLogout}>LOGOUT</button>
          </div>
          {/* <a
            href="/login"
            className="hidden md:block bg-light md:mt-[-15px] lg:mt-[-7px] xl:mt-[-80px] 2xl:mt-[-120px] md:ml-[10px] xl:ml-[20px] sm:px-4 sm:py-2 lg:px-6 lg:py-4 text-black font-bold hover:text-white hover:bg-dark transition ease-in-out duration-700"
          >
            <li
              className="text-sm  sm:text-[10px] cursor-pointer font-Mont lg:text-[14px] 2xl:text-[15px]"
              key={`link-confirmYourSeat`}
            >
              REGISTER NOW
            </li>
          </a> */}
        </ul>
      </div>

      <div className="md:hidden relative flex justify-center items-center pr-[50px] mt-[-50px]">
        <div
          className="flex cursor-pointer mb-[-53px]"
          onClick={() => setToggle(true)}
        >
          {HamOpen}
        </div>
        {toggle && (
          <div>
            <motion.div
              className="fixed top-0 left-0 right-0 z-50 flex flex-col items-end justify-end w-screen h-screen p-1 pb-4 shadow-lg md:hidden bg-warm"
              animate={{ y: [-500, 0] }}
              transition={{
                type: "spring",
                bounce: 0.25,
                damping: 9,
                mass: 0.5,
              }}
            >
              <div
                className="flex z-10 cursor-pointer mr-[30px] mt-[20px]"
                onClick={() => setToggle(false)}
              >
                {HamClose}
              </div>

              <div className="logo mt-[-30px] mb-[-10px] w-full z-0 flex justify-center items-center">
                <img className="w-[40%]" src={logo} alt="Renaissance Logo" />
              </div>

              <ul className="flex flex-col items-center justify-start sm:mt-[-20px] w-full h-full p-0 m-0 text-xs text-black">
                <a
                  href="/"
                  className="mt-[20px] text-base mx-2 px-1 lg:mx-4 lg:px-2 relative font-Mont before:content-[''] before:absolute before:bg-dark before:h-[3px] before:w-0 before:left-0 before:bottom-[-8px] before:transition-[0.3s] before:duration-300 hover:before:w-full hover:text-dark"
                >
                  <li key={`link-homepage`}>HOME</li>
                </a>
                <div className="px-6 mt-[20px] py-4 mx-4 text-lg font-bold transition duration-700 ease-in-out font-Mont text-black">
                  <button onClick={handleClickLogout}>LOGOUT</button>
                </div>
                {/* <a href="/login" className="">
                  <li className="px-6 mt-[20px] py-4 mx-4 text-lg font-bold transition duration-700 ease-in-out font-Mont text-black hover:text-grey hover:bg-dark">
                    REGISTER NOW
                  </li>
                </a> */}
              </ul>
            </motion.div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
