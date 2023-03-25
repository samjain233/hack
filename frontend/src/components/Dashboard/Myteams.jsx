import React, { useState, useEffect, useReducer } from "react";
import axios, * as others from "axios";
import { User } from "../../User/User";

function Myteams() {
  const [myteams, setMyteams] = useState([]);
  const { user } = User();
  const [update, forceUpdate] = useReducer((x) => x + 1, 0);

  const getTeamsData = async () => {
    const response = await axios.get(process.env.REACT_APP_GETUSERTTEAM, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.data.token}`,
      },
    });
    console.log(response.data.data);
    setMyteams(response.data.data);
    forceUpdate();
  };

  useEffect(() => {
    getTeamsData();
  }, [update]);

  return (
    <>
      <div className="bg-light my-2 w-full rounded-md mx-1 box-border p-4">
        <div>
          <p className="text-2xl font-medium">My Teams</p>
          <div className="mt-4">
            {myteams.map((element) => {
              return (
                <div
                  key={element.team_id}
                  className="teams px-4 py-2 bg-warm rounded-md my-2 hover:shadow-lg hover:bg-[rgb(210,152,141)] cursor-pointer transition-all duration-300"
                >
                  <p className="font-semibold text-2xl">{element.team_name}</p>
                  <p className="text-md">{element.event_name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Myteams;
