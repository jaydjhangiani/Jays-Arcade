const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault(); //get info
  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;
  auth
    .signInWithEmailAndPassword(email, password)
    .then((cred) => {
      //console.log(cred.user)
      const modal = document.querySelector("#modal-login");
      M.Modal.getInstance(modal).close();
      regform.reset();
    })
    .catch((err) => {
      alert(err);
    });
});

//register
const regform = document.querySelector("#reg-form");
regform.addEventListener("submit", (e) => {
  e.preventDefault();
  const uname = regform["rusername"].value;
  const email = regform["remail"].value;
  const password = regform["rpassword"].value;

  function sendMail(params) {
    var tempParams = {
      from_name: uname,
      from_email: email,
    };

    emailjs
      .send("service_udflnvu", "template_5dvnapr", tempParams)
      .then(function (res) {
        console.log("success", res.status);
      });
  }

  auth
    .createUserWithEmailAndPassword(email, password)
    .then((cred) => {
      return db.collection("users").doc(cred.user.uid).set({
        username: uname,
        email: email,
        score: 0,
      });
    })
    .then(() => {
      sendMail();
      //console.log(cred.user)
      const modal = document.querySelector("#modal-signup");
      M.Modal.getInstance(modal).close();
      regform.reset();
    })
    .catch((err) => {
      alert(err);
    });
});
