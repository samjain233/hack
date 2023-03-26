(async () => {
  //for chekcking signup and login page
  const check = document.querySelectorAll('[type="password"]');
  const login = document.querySelector('[type="password"]');

  if (check.length == 1) {
    //login
    if (login) {
      const btn = document.createElement("button");
      btn.innerHTML = "click";
      login.insertAdjacentElement("afterend", btn);

      btn.addEventListener("click", async (e) => {
        e.preventDefault();

        login.value = "sambhav";

        let port = chrome.runtime.connect({name: "hack36"});


        const password = await chrome.runtime.sendMessage({
          type: "givePass",
          options: {
            pass: login.value,
          },
        });

        login.value = password.password;
        
        
      });
    }
    if (check.length == 2) {
      //signup
    }
  }
})();
