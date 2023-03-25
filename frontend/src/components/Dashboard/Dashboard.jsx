import DashboardNavbar from "./DashboardNavbar";
import Sessions from "./sessions";
import Userpassword from "./Userpassword";

function Dashboard() {
  // const { user } = User();

  return (
    <>
      <DashboardNavbar />
      <div className="md:flex mt-[30px] md:mt-[15px] md:flex-row flex flex-col mx-4 md:mx-10">
        {/* left dashboard  */}
        <div className="left m-4 w-full md:w-[50%]">
          <div className="flex flex-col flex-wrap w-full h-[70px]">
            {/* user infomation box  */}
            <div className="bg-semilight ml-[-12px] my-2 w-full rounded-md">
              <p className="text-2xl p-4 text-brown">
                Hello, <span className="text-dark font-bold">sambhav</span>
              </p>
            </div>

            {/* user information box ends  */}
          </div>
          <Userpassword />
        </div>

        {/* sessions */}
        <div className="m-4 ml-0 w-full h-full ">
          <Sessions />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
