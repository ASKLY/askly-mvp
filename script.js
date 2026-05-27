// Manejo del formulario del piloto y del modal de videollamada (MVP sin backend).
document.addEventListener("DOMContentLoaded", () => {
  const pilotForm = document.getElementById("formulario-piloto") || document.getElementById("pilot-form");
  const pilotFormStatus = document.getElementById("pilot-form-status");
  const videoButtons = document.querySelectorAll(".video-call-btn");
  const videoModal = document.getElementById("video-modal");
  const closeVideoModalButton = document.getElementById("close-video-modal");
  const videoModalTitle = document.getElementById("video-modal-title");
  const videoModalDescription = document.getElementById("video-modal-description");
  const mapPins = document.querySelectorAll(".map-pin");
  const mapBusinessName = document.getElementById("map-business-name");
  const mapBusinessCategory = document.getElementById("map-business-category");
  const mapBusinessDistance = document.getElementById("map-business-distance");
  const mapBusinessDescription = document.getElementById("map-business-description");
  const mapConnectLiveButton = document.getElementById("map-connect-live-btn");
  const mapViewCardButton = document.getElementById("map-view-card-btn");

  if (pilotForm) {
    pilotForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (pilotFormStatus) {
        pilotFormStatus.textContent = "Enviando inscripción...";
        pilotFormStatus.classList.remove("success", "error");
      }

      try {
        const response = await fetch(pilotForm.action, {
          method: pilotForm.method || "POST",
          body: new FormData(pilotForm),
          headers: {
            Accept: "application/json"
          }
        });

        if (response.ok) {
          pilotForm.reset();
          if (pilotFormStatus) {
            pilotFormStatus.textContent = "Gracias. Hemos recibido tu inscripción al piloto de Askly. Te contactaremos pronto.";
            pilotFormStatus.classList.add("success");
          }
        } else {
          throw new Error("Formspree respondió con error");
        }
      } catch (error) {
        if (pilotFormStatus) {
          pilotFormStatus.textContent = "No se pudo enviar la inscripción. Inténtalo nuevamente o contáctanos por WhatsApp.";
          pilotFormStatus.classList.add("error");
        }
      }
    });
  }

  if (!videoModal || !closeVideoModalButton || !videoModalTitle || !videoModalDescription) return;

  const openVideoModal = (businessName) => {
    videoModalTitle.textContent = `Conectar en vivo con ${businessName}`;
    videoModalDescription.textContent =
      "Askly te permite solicitar atención rápida por videollamada sin compartir tu número personal ni conocer el teléfono del negocio. En esta versión demo, la sala se abre mediante Google Meet.";
    videoModal.classList.add("modal-open");
    videoModal.setAttribute("aria-hidden", "false");
  };

  const closeVideoModal = () => {
    videoModal.classList.remove("modal-open");
    videoModal.setAttribute("aria-hidden", "true");
  };

  videoButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const businessName = button.dataset.businessName || "el negocio";
      openVideoModal(businessName);
    });
  });

  const mapBusinesses = {
    "farmacia-san-miguel": {
      name: "Farmacia San Miguel",
      category: "Farmacia",
      distance: "1.2 km",
      description: "Consulta si tienen el medicamento que necesitas antes de salir de casa.",
      cardHref: "#card-farmacia-san-miguel"
    },
    "ferreteria-la-esquina": {
      name: "Ferretería La Esquina",
      category: "Ferretería",
      distance: "2.8 km",
      description: "Pregunta por herramientas, pintura o repuestos antes de ir al local.",
      cardHref: "#card-ferreteria-la-esquina"
    },
    "veterinaria-patitas": {
      name: "Veterinaria Patitas",
      category: "Veterinaria",
      distance: "3.4 km",
      description: "Confirma atención disponible para tu mascota antes de desplazarte.",
      cardHref: "#card-veterinaria-patitas"
    },
    "english-horizon-hub": {
      name: "English Horizon Hub",
      category: "Academia",
      distance: "4.1 km",
      description: "Consulta horarios, modalidad y disponibilidad de clases antes de inscribirte.",
      cardHref: "#card-english-horizon-hub"
    }
  };

  const updateMapPanel = (businessKey) => {
    if (!mapBusinessName || !mapBusinessCategory || !mapBusinessDistance || !mapBusinessDescription || !mapConnectLiveButton || !mapViewCardButton) return;

    const business = mapBusinesses[businessKey];
    if (!business) return;

    mapBusinessName.textContent = business.name;
    mapBusinessCategory.textContent = business.category;
    mapBusinessDistance.textContent = business.distance;
    mapBusinessDescription.textContent = business.description;
    mapConnectLiveButton.dataset.businessName = business.name;
    mapViewCardButton.setAttribute("href", business.cardHref);
  };

  if (mapPins.length > 0) {
    mapPins.forEach((pin) => pin.setAttribute("aria-pressed", "false"));

    mapPins.forEach((pin) => {
      pin.addEventListener("click", () => {
        const businessKey = pin.dataset.mapBusiness;
        mapPins.forEach((item) => {
          item.classList.remove("active");
          item.setAttribute("aria-pressed", "false");
        });
        pin.classList.add("active");
        pin.setAttribute("aria-pressed", "true");
        if (businessKey) {
          updateMapPanel(businessKey);
        }
      });
    });

    mapPins[0].classList.add("active");
    mapPins[0].setAttribute("aria-pressed", "true");
    updateMapPanel(mapPins[0].dataset.mapBusiness);
  }

  if (mapConnectLiveButton) {
    mapConnectLiveButton.addEventListener("click", () => {
      const businessName = mapConnectLiveButton.dataset.businessName || "el negocio";
      openVideoModal(businessName);
    });
  }

  closeVideoModalButton.addEventListener("click", closeVideoModal);

  videoModal.addEventListener("click", (event) => {
    if (event.target === videoModal) {
      closeVideoModal();
    }
  });
});
