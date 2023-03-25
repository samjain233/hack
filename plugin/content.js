//for chekcking signup and login page
const check = document.querySelectorAll('[type="password"]');
const login = document.querySelector('[type="password"]');

if (check.length == 1) {
  //login
  if (login) {
    const btn = document.createElement("button");
    btn.innerHTML = "click";

    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      const debug = document.createElement("p");

      const pass = document.createElement("p");
      pass.innerHTML = login.value;

      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDFkZjliNDEwNDI0MjU1NDkyYzgxZTMiLCJpYXQiOjE2Nzk3NDA4MDksImV4cCI6MTY4OTc0MDgwOX0.Hd_6USaZMj5jleZvBwFRAfRO1n2zQsuAvwWNkZO4JbY";
      const web = "https://www.amazon.in/";

      const response = await fetch("http://localhost:5000/getstring", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, web, pass: login.value }),
      });

      const object = await response.json();
      if (object.success) {
        // const result = await password(object.str1, article.value, object.str2);
        pass.innerHTML = object.password;
        login.value = object.password;
      }
      debug.innerHTML = object.success;

      document.body.appendChild(pass);
      document.body.appendChild(debug);
    });

    login.insertAdjacentElement("afterend", btn);
  }
  if (check.length == 2) {
    //signup
  }
}
