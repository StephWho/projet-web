const connectButton = document.getElementById("signup-button");
connectButton.addEventListener("click", () => {
  const newUser = {
    lastname: document.getElementById("lastnameInput").value,
    firstname: document.getElementById("firstnameInput").value,
    birthdate: document.getElementById("birthdateInput").value,
    address: document.getElementById("passwordInput").value,
    email: document.getElementById("emailInput").value,
    passwordUser: document.getElementById("passwordInput").value,
  };

  fetch("http://localhost:3000/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (
        data.length == 0 ||
        newUser.lastname.length == 0 ||
        newUser.firstname.length == 0 ||
        newUser.birthdate.length == 0 ||
        newUser.address.length == 0 ||
        newUser.email.length == 0 ||
        newUser.passwordUser.length == 0
      ) {
        // Le user s'est trompé
        alert("Veuillez remplir tous les champs");
      } else {
        // Un user a été trouvé
        localStorage.setItem("idUser", data[0].id_user);
        document.location.href = "reservation.html";
      }
    });
});
