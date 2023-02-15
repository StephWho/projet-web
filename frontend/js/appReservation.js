if (localStorage.getItem("idUser")) {
  const IdUser = localStorage.getItem("idUser");

  fetch(`http://localhost:3000/api/orders/userId/${IdUser}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const containerOrders = document.getElementById("list-order");
      data.forEach((order) => {
        containerOrders.innerHTML += `
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h2 class="card-title">ID Reservation : ${order.id_order}</h2>
              <p class="card-title">Date de début : ${order.schedule_start}</p>
              <p class="card-title">Date de fin : ${order.schedule_end}</p>
              <p class="card-title">Livraison : ${
                order.delivery == 0 ? "Non" : "Oui"
              }</p>
              <p class="card-title">Assurance : ${
                order.insurance == 0 ? "Non" : "Oui"
              }</p>
              <p class="card-title">Prix : ${order.price}</p>
              <p class="card-title">Payé : ${
                order.is_paid == 0 ? "Non" : "Oui"
              }</p>
              <p class="card-title">ID User : ${order.id_user}</p>
              <p class="card-title">ID Bike : ${order.id_bike}</p>
            </div>
          </div>
        </div>
        `;
      });
    });
} else {
  document.location.href = "signin.html";
}
