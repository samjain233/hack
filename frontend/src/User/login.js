import { toast } from "react-toastify";


const login = async (email, password) => {
  const server = process.env.REACT_APP_SERVERAPI;
  const authapi = server + "auth/login";
  const response = await fetch(authapi, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const json = await response.json();
  console.log(json);
  if (json.success === false) {
    toast.error(json.message);
    return (false);
  } else {
    localStorage.setItem("userHack", json.data.token);
    toast.success(json.message);
    return(true);
  }
};

export default login;
