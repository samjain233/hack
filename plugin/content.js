//for chekcking signup and login page
const check = document.querySelectorAll('[type="password"]');
const login = document.querySelector('[type="password"]');

if (check.length == 1) {
  //login
  if (login) {
    let url = "blank";
    chrome.runtime.onMessage.addListener((obj,sender,response)=>{
        url = obj.url;
    });
    const btn = document.createElement("button");
    btn.innerHTML = "click";

    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      const debug = document.createElement("p");

      const pass = document.createElement("p");
      pass.innerHTML = login.value;

      const token = localStorage.getItem("userHack");
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
      debug.innerHTML = token;

      document.body.appendChild(pass);
      document.body.appendChild(debug);
    });

    login.insertAdjacentElement("afterend", btn);
  }
  if (check.length == 2) {
    //signup
  }
}
