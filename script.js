// Manejo básico del formulario del piloto (MVP sin backend).
document.addEventListener("DOMContentLoaded", () => {
  const pilotForm = document.getElementById("pilot-form");

  if (!pilotForm) return;

  pilotForm.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Gracias. Hemos recibido tu interés en Askly.");
    pilotForm.reset();
  });
});
