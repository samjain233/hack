import React from "react";
import Select from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const Userpassword = () => {
  return (
    <>
      <div className="bg-semilight ml-[-12px] my-4 w-full rounded-md p-2">
        <div className="m-2">
          <div className="mx-2 my-4">
            <p className="my-1 text-lg font-semibold text-dark">
              Select Website :
            </p>
            <Select options={options} />
          </div>
          <div className="mx-2 my-4">
            <p className="my-1 text-lg font-semibold text-dark">Password :</p>
            <input
              type="text"
              className="w-full p-2 rounded"
              placeholder="Enter Your Password"
            />
          </div>
          <div className="mx-2 my-4">
            <button className="w-full p-2 bg-mid hover:shadow-sm hover:bg-semidark">
              Get Password
            </button>
          </div>
          <div className="mx-2 mt-8">
            <input
              type="text"
              className="w-full p-2 rounded border border-dark"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Userpassword;
