chrome.runtime.onConnect.addListener(function(port) {
console.assert(port.name === "knockknock");

});




chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  if (request.type == "givePass") {
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
        console.log(request.options);
        
        const response = await fetch("http://localhost:5000/getstring", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, web, pass: request.options.pass }),
        });
        const object = await response.json();
        console.log(object);
        sendResponse(object);
      }
    );
  }
});
