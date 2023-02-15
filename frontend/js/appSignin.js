const connectButton = document.getElementById("signin-button");
connectButton.addEventListener("click", () => {
  const data = {
    email: document.getElementById("emailInput").value,
    passwordUser: document.getElementById("passwordInput").value,
  };

  fetch("http://localhost:3000/api/users/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.length == 0) {
        // Le user s'est trompé
        alert("L'utilisateur n'existe pas ou le mot de passe est incorrect");
      } else {
        // Un user a été trouvé
        localStorage.setItem("idUser", data[0].id_user);
        document.location.href = "reservation.html";
      }
    });
});
