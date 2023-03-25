import CreateTeam from "./CreateTeam";
import DashboardNavbar from "./DashboardNavbar";
import Myteams from "./Myteams";
import AddTeamMembers from "./AddTeamMembers";
import { User } from "../../User/User";

function Dashboard() {
  // const { user } = User();

  return (
    <>
      <DashboardNavbar />
      <div className="md:flex mt-[30px] md:mt-[15px] md:flex-row flex flex-col mx-10">
        {/* left dashboard  */}
        <div className="left m-4 w-[70%]">
          <div className="flex flex-col flex-wrap w-full h-[70px]">
            {/* user infomation box  */}
            <div className="bg-pink-400 ml-[-12px] my-2 w-full rounded-md">
              <p className="text-2xl p-4 text-brown">
                Hello, <span className="text-red-600">sambhav</span>
              </p>
            </div>
            {/* user information box ends  */}
          </div>
        </div>

        {/* center dashboard  */}
        <div className="center m-4 ml-0 w-full">
          <div className="flex flex-col w-full ">
            {/* create a team section  */}
            {/* <CreateTeam /> */}
            {/* add team members to team  */}
            {/* <AddTeamMembers /> */}
            {/* <div className="bg-light my-2 w-full h-[100px] rounded-md mx-1 box-border"></div> */}
          </div>
        </div>

        {/* right dashboard */}
        <div className="m-4 ml-0 w-full h-full ">
          {/* <Myteams /> */}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
