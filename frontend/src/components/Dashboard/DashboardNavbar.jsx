import React from "react";
import logo from "./logo.png";

function DashboardNavbar(props) {
  console.log(props.func);
  const handleclick = () => {
    localStorage.removeItem("userHack");
    window.location.href = 'http://localhost:3000/';
  };
  return (
    <>
      <div className="bg-off w-full h-[80px] shadow-md flex flex-row">
        <img src={logo} className="h-full p-2" />
        <div className="flex w-full h-full justify-end items-center">
          <button
            className="w-[100px] h-1/2 bg-semidark hover:bg-dark hover:shadow-sm"
            onClick={handleclick}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default DashboardNavbar;
