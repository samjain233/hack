import { toast } from "react-toastify";

const signup = async (name, email, password) => {
  const server = process.env.REACT_APP_SERVERAPI;
  const authapi = server + "auth/register";
    // console.log(authapi);
  const response = await fetch(authapi, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username:name ,email, password }),
  });
  const json = await response.json();
  if(json.success===false)
  {
    toast.error(json.message);
  }
  else{
    localStorage.setItem("user", json.data.token);
    toast.success(json.message);
  }

};

export default signup;
