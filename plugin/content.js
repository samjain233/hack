//for chekcking signup and login page
const check = document.querySelectorAll('[type="password"]');
const pass = document.querySelector('[type="password"]');

if (check.length == 1) {
  //login
  if (pass) {
    const btn = document.createElement("button");
    btn.classList.add("color-secondary-text");
    btn.innerHTML = "click";

    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      const debug = document.createElement("p");

      const pass = document.createElement("p");
      pass.innerHTML = article.value;

      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDFkZjliNDEwNDI0MjU1NDkyYzgxZTMiLCJpYXQiOjE2Nzk3NDA4MDksImV4cCI6MTY4OTc0MDgwOX0.Hd_6USaZMj5jleZvBwFRAfRO1n2zQsuAvwWNkZO4JbY";
      const web = "https://www.amazon.in/";

      const response = await fetch("http://localhost:5000/getstring", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, web, pass: article.value }),
      });

      const object = await response.json();
      if (object.success) {
        // const result = await password(object.str1, article.value, object.str2);
        pass.innerHTML = object.password;
        article.value = object.password;
      }
      debug.innerHTML = object.success;

      document.body.appendChild(pass);
      document.body.appendChild(debug);
    });

    article.insertAdjacentElement("afterend", btn);
  }
  if (check.length == 2) {
    //signup
  }
}
