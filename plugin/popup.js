const loginbtn = document.getElementById("login");

loginbtn.addEventListener("click",async ()=>{
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const api = "http://localhost:5000/auth/login"

    const response = await fetch(api, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const json = await response.json();
      console.log(json);

      const returnMessage = document.getElementById("returnMessage");

      if(json.success)
      {
        localStorage.setItem("userHack", json.data.token);
        returnMessage.innerHTML=json.message;
      }
      else{
        returnMessage.innerHTML=json.message;
      }

});
