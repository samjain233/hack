import React, { useState, useEffect, useReducer } from "react";
import axios, * as others from "axios";
import { User } from "../../User/User";

function Sessions() {
  const [sessions, setSessions] = useState([]);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDFkZjliNDEwNDI0MjU1NDkyYzgxZTMiLCJpYXQiOjE2Nzk3NDA4MDksImV4cCI6MTY4OTc0MDgwOX0.Hd_6USaZMj5jleZvBwFRAfRO1n2zQsuAvwWNkZO4JbY";

  const getSessionData = async () => {
    const server = process.env.REACT_APP_SERVERAPI;
    const authapi = server + "retrivesession";
    const response = await fetch(authapi, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    const data = await response.json();
    console.log(data);
    setSessions(data);
  };

  useEffect(() => {
    getSessionData();
  }, []);

  return (
    <>
      <div className="bg-semilight my-2 w-full h-[550px] overflow-auto rounded-md mx-1 box-border p-4">
        <div>
          <p className="text-3xl font-medium">Your Sessions</p>
          <div className="mt-4">
            {sessions.map((element) => {
              return (
                <div
                  key={element.time}
                  className="teams px-4 py-2 bg-light rounded-md my-2 hover:shadow-lg hover:bg-[#3a7fb1] cursor-pointer transition-all duration-300"
                >
                  <p className="font-medium text-2xl my-1">{element.web}</p>
                  <div className="flex flex-row my-1">
                    <p className="text-md ">
                      {new Date(element.time).toDateString()}{" "}
                    </p>
                    <p className="ml-2">{new Date(element.time).toLocaleTimeString()}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Sessions;
