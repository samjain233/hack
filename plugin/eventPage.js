(async () => {
  chrome.runtime.onConnect.addListener(function (port) {
    console.assert(port.name === "hack36");
    port.onMessage.addListener(async function (msg) {
      console.log(msg);
      if (msg.pass.type == "login") {
        chrome.tabs.query(
          { active: true, currentWindow: true },
          async function (tabs) {
            const url = tabs[0].url;
            let flag = false;
            let end = url.length;
            for (let i = 0; i < url.length; i++) {
              if (url[i] == ".") {
                flag = true;
              }
              if (url[i] == "/" && flag) {
                end = i;
                break;
              }
            }
            const web = url.slice(0, end);
            console.log(web);
            const token = localStorage.getItem("userHack");
            console.log(token);
            console.log(msg.pass.pass);

            const response = await fetch("http://localhost:5000/getstring", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ token, web, pass: msg.pass.pass }),
            });
            const object = await response.json();
            console.log(object);
            if (object.success) {
              console.log("password sent");
              const a = {
                type : "login",
                password :object.password
              }
              port.postMessage({ password: a });
            }
          }
        );
      }
      if (msg.pass.type == "sign") {
        console.log("sign");
        const response1 = await fetch("http://localhost:5000/createstring");
        const string = await response1.json();
        console.log(string);

        const token = localStorage.getItem("userHack");

        chrome.tabs.query(
          { active: true, currentWindow: true },
          async function (tabs) {
            const url = tabs[0].url;
            let flag = false;
            let end = url.length;
            for (let i = 0; i < url.length; i++) {
              if (url[i] == ".") {
                flag = true;
              }
              if (url[i] == "/" && flag) {
                end = i;
                break;
              }
            }
            const web = url.slice(0, end);
            const response = await fetch("http://localhost:5000/savestring", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ string, token, web ,pass : msg.pass.pass}),
            });

            const result = await response.json();
            if(result.success)
            {
                const a = {
                    type : "sign",
                    password : result.password
                  }
                  port.postMessage({ password: a });
            }
          }
        );
      }
    });
  });
})();
