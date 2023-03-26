import React, { useState, useEffect, useReducer } from "react";

function Sessions(props) {
  console.log(props);
  return (
    <>
      <div className="bg-semilight my-2 w-full h-[550px] overflow-auto rounded-md mx-1 box-border p-4">
        <div>
          <p className="text-3xl font-medium">Your Sessions</p>
          <div className="mt-4">
            {props.props.reverse().map((element) => {
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
