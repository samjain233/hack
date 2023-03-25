import { useState } from "react";
import { User } from "../../User/User";

const AddTeamMembers = () => {
  const [teamID, setTeamID] = useState(null);
  const [teamName, setTeamName] = useState(null);
  const { user } = User();

  const handleClick = async () => {
    const response = await fetch(process.env.REACT_APP_ADDMEMBERTOTEAM, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.data.token}`,
      },
      body: JSON.stringify({ team_id: teamID }),
    });
    const json = await response.json();

    if (response.ok) {
      console.log("Successful");
      console.log(JSON.stringify(json));
    }
  };

  return (
    <div className="bg-light my-2 w-full rounded-md mx-1 box-border p-4">
      <div>
        <p className="text-2xl font-medium">Join Team</p>
      </div>
      <div className="mt-4">
        <label htmlFor="teamName" className="block mb-2 font-medium text-black">
          Team Name
        </label>
        <input
          type="text"
          onChange={(e) => setTeamName(e.target.value)}
          value={teamName}
          id="teamName"
          className="w-full rounded-lg p-2 focus:ring-red focus:border-red"
          required
        />
      </div>
      <div className="mt-4">
        <label
          htmlFor="selectCommitee"
          className="block mb-2 font-medium text-black"
        >
          Enter Team ID
        </label>
        <input
          type="number"
          onChange={(e) => setTeamID(e.target.value)}
          value={teamID}
          id="teamName"
          className="w-full  rounded-lg p-2 focus:ring-red focus:border-red"
          required
        />
      </div>

      <button
        onClick={handleClick}
        className="mt-6 hover:shadow-md hover:bg-dark"
      >
        Join
      </button>
    </div>
  );
};

export default AddTeamMembers;
