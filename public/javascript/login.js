// // sign-up
// async function signupFormHandler(event) {
//   event.preventDefault();

//   const username = document.querySelector("#username-signup").value.trim();
//   const email = document.querySelector("#email-signup").value.trim();
//   const password = document.querySelector("#password-signup").value.trim();

//   if (username && email && password) {
//     const response = await fetch("/api/users", {
//       method: "post",
//       body: JSON.stringify({
//         username,
//         email,
//         password,
//       }),
//       headers: { "Content-Type": "application/json" },
//     });

//     // check the response status
//     if (response.ok) {
//       // possible ideas: css hide/show or model to alert the sign-up was successful
//       console.log("success");
//       alert(response.statusText);
//       document.location.replace("/dashboard");
//     } else {
//       alert(response.statusText);
//     }
//   }
// }

// document
//   .querySelector(".signup-form")
//   .addEventListener("submit", signupFormHandler);

//   login
async function loginFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "post",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      console.log("successful log in", response);
      document.location.replace("/dashboard");
    } else {
      console.log("response failed login", response);
      alert(response.statusText);
    }
  }
}

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);
