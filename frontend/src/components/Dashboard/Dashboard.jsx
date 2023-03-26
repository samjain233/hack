import React, { useState, useEffect } from "react";
import DashboardNavbar from "./DashboardNavbar";
import Sessions from "./sessions";
import Userpassword from "./Userpassword";

function Dashboard(props) {
  const [username, setUsername] = useState("");
  const [sessions, setSessions] = useState([]);

  const getData = async () => {
    const token = localStorage.getItem("userHack");
    const server = process.env.REACT_APP_SERVERAPI;
    const authapi = server + "retrivesession";
    const response = await fetch(authapi, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    const data = await response.json();
    console.log(data);
    setUsername(data.username);
    // console.log(data.response);
    setSessions(data.response.sessions);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <DashboardNavbar func={props.func}/>
      <div className="md:flex mt-[30px] md:mt-[15px] md:flex-row flex flex-col mx-4 md:mx-10">
        {/* left dashboard  */}
        <div className="left m-4 w-full md:w-[50%]">
          <div className="flex flex-col flex-wrap w-full h-[70px]">
            {/* user infomation box  */}
            <div className="bg-semilight ml-[-12px] my-2 w-full rounded-md">
              <p className="text-2xl p-4 text-brown">
                Hello, <span className="text-dark font-bold">{username}</span>
              </p>
            </div>

            {/* user information box ends  */}
          </div>
          <Userpassword />
        </div>

        {/* sessions */}
        <div className="m-4 ml-0 w-full h-full ">
          <Sessions props={sessions} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
