import React, { useState, useEffect, useReducer } from "react";
import axios, * as others from "axios";
import Select from "react-select";
import { User } from "../../User/User";

const options = [
  { value: 6, label: "Anunaad" },
  { value: 2, label: "Rangsaazi" },
  { value: 5, label: "Dark Room" },
  { value: 7, label: "Litmuse" },
  { value: 3, label: "Razzmatazz" },
  { value: 4, label: "Spandan" },
  { value: 1, label: "Rangmanch" },
];

function CreateTeam() {
  const [subevent, setSubevent] = useState([]);
  const [selectedsubEvent, setselectedsubEvent] = useState(null);
  const [teamName, setTeamName] = useState("");
  // const [update, forceUpdate] = useReducer((x) => x + 1, 0);
  const { user } = User();

  const onEventchange = async (event) => {
    const id = event.value;
    setselectedsubEvent(null);
    const response = await axios.get(
      `${process.env.REACT_APP_COMMITEE}?commitee_id=${id}`
    );
    const subeventoptions = [];
    await response.data.data.forEach((element) => {
      const object = {
        value: element.event_id,
        label: element.name,
      };
      subeventoptions.push(object);
    });
    setSubevent(subeventoptions);
  };

  const onSubEventchange = async (event) => {
    console.log("subevent selected");
    console.log(event.value);
    setselectedsubEvent(event.value);
  };

  const onchangeTeamname = async (event) => {
    setTeamName(event.target.value);
  };

  const handleCick = async () => {
    if (selectedsubEvent != null) {
      // const response = await axios.post(`${process.env.REACT_APP_CREATETEAM}`, {
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${user.data.token}`,
      //   },
      //   body: {
      //     event_id: selectedsubEvent,
      //     team_name: teamName,
      //   },
      // });

      const response = await fetch(process.env.REACT_APP_CREATETEAM, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.data.token}`,
        },
        body: JSON.stringify({
          event_id: selectedsubEvent,
          team_name: teamName,
        }),
      });
      const json = await response.json();

      if (response.ok) {
        console.log("Successful Fetch");
        console.log(json);
      }

      // forceUpdate();
    } else {
      console.log("select a sub event");
    }
  };
  // useEffect(() => {}, [update]);

  return (
    <>
      <div className="bg-light my-2 w-full rounded-md mx-1 box-border p-4">
        <div>
          <p className="text-2xl font-medium">Create Team</p>
        </div>
        <div className="mt-4">
          <label
            htmlFor="selectCommitee"
            className="block mb-2 font-medium text-black"
          >
            Select Commitee
          </label>
          <Select
            options={options}
            id="selectCommitee"
            className="w-full"
            onChange={onEventchange}
            required
          />
        </div>
        <div className="mt-4">
          <label
            htmlFor="selectEvents"
            className="block mb-2 font-medium text-black"
          >
            Select Event
          </label>
          <Select
            options={subevent}
            id="selectEvents"
            className="w-full"
            onChange={onSubEventchange}
            required
          />
        </div>
        <div className="mt-4">
          <label
            htmlFor="teamName"
            className="block mb-2 font-medium text-black"
          >
            Team Name
          </label>
          <input
            type="text"
            onChange={onchangeTeamname}
            value={teamName}
            id="teamName"
            className="w-full  rounded-lg p-2 focus:ring-red focus:border-red"
            required
          />
        </div>
        <div className="mt-4">
          <button
            className="hover:shadow-md hover:bg-dark"
            onClick={handleCick}
          >
            Create Team
          </button>
        </div>
      </div>
    </>
  );
}

export default CreateTeam;
