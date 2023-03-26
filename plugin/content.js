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

        let port = chrome.runtime.connect({name: "hack36"});
        const object = {
          type : "login",
          pass : login.value
        }
        port.postMessage({pass: object});

        port.onMessage.addListener(function(msg) {
          if(msg.password.type=="login")
          login.value = msg.password.password;
        });
        
      });
    }
  }
  if (check.length == 2) {
    //signup
    const signup = document.querySelector('[type="password"]');
    const signup2 = document.querySelectorAll('[type="password"]');

    const btn = document.createElement("button");
    btn.innerHTML = "usePassChill";
    signup.insertAdjacentElement("afterend",btn);

    btn.addEventListener("click", async (e) => {
      e.preventDefault();

      let port = chrome.runtime.connect({name: "hack36"});
      const object = {
        type : "sign",
        pass : signup.value
      }
      port.postMessage({pass : object});

      port.onMessage.addListener(function(msg) {
        if(msg.password.type=="sign")
          signup.value = msg.password.password;
          signup2[1].value=msg.password.password;
      });
      
    });
  }
})();
