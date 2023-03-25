import "./login.css";
import { useState } from "react";
// import { useLogin } from "../../Hooks/useLogin";
// import { useSignup } from "../../Hooks/useSignup";
import { toast } from "react-toastify";
import signup from "../../User/Register";
import login from "../../User/login";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [confirm, setConfirm] = useState("");
  // const { login, isLoading, error } = useLogin();
  // const { signup, isLoadingSignup, errorSignup } = useSignup();
  // const { logout } = useLogout();

  const toggleForm = async () => {
    let section = document.querySelector("section");
    let container = document.querySelector(".container");
    container.classList.toggle("active");
    section.classList.toggle("active");
    setPassword("");
    setEmail("");
    setName("");
    setPasswordAgain("");
    setMessage("");
    setConfirm("");
  };

  // const handleClickLogout = async (e) => {
  //   logout();
  // };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result) {
      window.location.href = "http://localhost:3000/dashboard";
    }
  };

  const handleSubmitSignup = async (e) => {
    e.preventDefault();

    const regExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (regExp.test(password)) {
      if (password === passwordAgain) {
        const result = await signup(name, email, password);
        if (result) {
          window.location.href = "http://localhost:3000/dashboard";
        }
      } else {
        toast.warn("Confirm Password is not matched with password");
      }
    } else if (!regExp.test(password)) {
      toast.warn(
        "Password must contain at least one numeric digit, one uppercase and one lowercase letter and length should be greater than 8 "
      );
    } else {
      setMessage("");
    }
  };

  // const googleAuth = async () => {
  //   window.location.replace("http://localhost:3000/auth/google");
  // };

  return (
    <>
      <section>
        <div className="container">
          <div className="user signinBx">
            <div className="imgBx"></div>

            <div className="formBx">
              {/* <div className="">
                <button onClick={handleClickLogout}>LOGOUT</button>
              </div> */}
              {/* <img href={logo} alt="Culrav-logo" /> */}
              <form onSubmit={handleSubmitLogin}>
                <h2>Sign In</h2>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  required="true"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  required="true"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {/* <input disabled={isLoading} type="submit" value="Login" /> */}
                <input type="submit" value="Login" />
                <p className="signup text-center">
                  don't have an account?
                  <a className="pl-2" href="#/" onClick={toggleForm}>
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </div>

          <div className="user signupBx">
            <div className="formBx">
              {/* <div className="">
                <button onClick={handleClickLogout}>LOGOUT</button>
              </div> */}
              <form onSubmit={handleSubmitSignup}>
                <h2>Create an account</h2>
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  required="true"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  required="true"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <input
                  type="password"
                  placeholder="Create Password"
                  name="password"
                  required="true"
                  minLength={8}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <div className="text-white">{message}</div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  required="true"
                  minLength={8}
                  onChange={(e) => setPasswordAgain(e.target.value)}
                  value={passwordAgain}
                />
                <div className="text-white">{confirm}</div>
                <div className="signup_btn">
                  {/* <input
                    className="signup_button"
                    type="submit"
                    value="Sign Up"
                    disabled={isLoadingSignup}
                  /> */}
                  <input
                    className="signup_button"
                    type="submit"
                    value="Sign Up"
                  />
                </div>
                <p className="signup text-center">
                  Already have an account?
                  <a className="pl-2" href="#/" onClick={toggleForm}>
                    Sign in
                  </a>
                </p>
              </form>
            </div>
            <div className="imgBx"></div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
