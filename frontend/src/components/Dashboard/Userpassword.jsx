import React, { useState, useEffect } from "react";
import Select from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const Userpassword = () => {
  const [options, setoptions] = useState([]);
  const [pass, setpass] = useState("");
  const [web , setWeb] = useState(null); 
  const [password , setpassword] = useState("");

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDFkZjliNDEwNDI0MjU1NDkyYzgxZTMiLCJpYXQiOjE2Nzk3NDA4MDksImV4cCI6MTY4OTc0MDgwOX0.Hd_6USaZMj5jleZvBwFRAfRO1n2zQsuAvwWNkZO4JbY";

  const fetchaccounts = async () => {
    const server = process.env.REACT_APP_SERVERAPI;
    const authapi = server + "accounts";
    const response = await fetch(authapi, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    const data = await response.json();
    console.log(data);

    let saveAccounts = [];

    await data.forEach((element) => {
      const object = {
        value: element.web,
        label: element.web,
      };
      saveAccounts.push(object);
    });

    console.log(saveAccounts);

    setoptions(saveAccounts);
    console.log(data);
  };

  const handleclick = async () => {
    const server = process.env.REACT_APP_SERVERAPI;
    const authapi = server + "getstring";
    const response = await fetch(authapi, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({token ,web , pass}),
    });
    const data = await response.json();
    console.log(data);
    setpassword(data.password);
  };

  useEffect(() => {
    fetchaccounts();
  }, []);
  return (
    <>
      <div className="bg-semilight ml-[-12px] my-4 w-full rounded-md p-2">
        <div className="m-2">
          <div className="mx-2 my-4">
            <p className="my-1 text-lg font-semibold text-dark">
              Select Website :
            </p>
            <Select options={options} onChange={(e)=>setWeb(e.value)}/>
          </div>
          <div className="mx-2 my-4">
            <p className="my-1 text-lg font-semibold text-dark">Password :</p>
            <input
              type="text"
              className="w-full p-2 rounded"
              placeholder="Enter Your Password"
              onChange={(e)=>setpass(e.target.value)}
              value={pass}
            />
          </div>
          <div className="mx-2 my-4">
            <button
              className="w-full p-2 bg-mid hover:shadow-sm hover:bg-semidark"
              onClick={handleclick}
            >
              Get Password
            </button>
          </div>
          <div className="mx-2 mt-8">
            <input
              type="text"
              className="w-full p-2 rounded border border-dark"
              disabled={true}
              value={password}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Userpassword;
