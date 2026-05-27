// Manejo del formulario del piloto y del modal de videollamada (MVP sin backend).
document.addEventListener("DOMContentLoaded", () => {
  const pilotForm = document.querySelector("#formulario-piloto form, form#formulario-piloto, #pilot-form");
  const pilotFormStatus = document.getElementById("pilot-form-status");
  const pilotFormWhatsappFallback = document.getElementById("pilot-form-whatsapp-fallback");
  const videoButtons = document.querySelectorAll(".video-call-btn");
  const videoModal = document.getElementById("video-modal");
  const closeVideoModalButton = document.getElementById("close-video-modal");
  const videoModalTitle = document.getElementById("video-modal-title");
  const videoModalDescription = document.getElementById("video-modal-description");
  const mapPins = document.querySelectorAll(".map-pin");
  const mapBusinessName = document.getElementById("map-business-name");
  const mapBusinessCategory = document.getElementById("map-business-category");
  const mapBusinessDistrict = document.getElementById("map-business-district");
  const mapBusinessAddress = document.getElementById("map-business-address");
  const mapBusinessHours = document.getElementById("map-business-hours");
  const mapBusinessStatus = document.getElementById("map-business-status");
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
      if (pilotFormWhatsappFallback) {
        pilotFormWhatsappFallback.classList.add("hidden");
      }

      const formData = new FormData(pilotForm);

      try {
        const response = await fetch(pilotForm.action, {
          method: "POST",
          body: formData,
          headers: {
            "Accept": "application/json"
          }
        });

        if (response.ok) {
          if (pilotFormStatus) {
            pilotFormStatus.textContent = "Gracias. Hemos recibido tu inscripción al piloto de Askly. Te contactaremos pronto.";
            pilotFormStatus.classList.add("success");
          }
          pilotForm.reset();
        } else {
          if (pilotFormStatus) {
            pilotFormStatus.textContent = "No se pudo enviar la inscripción. Inténtalo nuevamente o contáctanos por WhatsApp.";
            pilotFormStatus.classList.add("error");
          }
          if (pilotFormWhatsappFallback) {
            pilotFormWhatsappFallback.classList.remove("hidden");
          }
        }
      } catch (error) {
        if (pilotFormStatus) {
          pilotFormStatus.textContent = "No se pudo enviar la inscripción. Inténtalo nuevamente o contáctanos por WhatsApp.";
          pilotFormStatus.classList.add("error");
        }
        if (pilotFormWhatsappFallback) {
          pilotFormWhatsappFallback.classList.remove("hidden");
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
      district: "San Miguel",
      address: "Av. La Marina 1234, San Miguel",
      hours: "Lunes a sábado, 8:00 a. m. a 9:00 p. m.",
      status: "Disponible ahora",
      description: "Consulta si tienen el medicamento que necesitas antes de salir de casa.",
      cardHref: "#card-farmacia-san-miguel"
    },
    "ferreteria-la-esquina": {
      name: "Ferretería La Esquina",
      category: "Ferretería",
      district: "San Martín de Porres",
      address: "Av. Perú 2250, San Martín de Porres",
      hours: "Lunes a sábado, 8:30 a. m. a 7:00 p. m.",
      status: "Disponible ahora",
      description: "Pregunta por herramientas, pintura o repuestos antes de ir al local.",
      cardHref: "#card-ferreteria-la-esquina"
    },
    "veterinaria-patitas": {
      name: "Veterinaria Patitas",
      category: "Veterinaria",
      district: "Jesús María",
      address: "Av. Salaverry 980, Jesús María",
      hours: "Lunes a domingo, 9:00 a. m. a 8:00 p. m.",
      status: "Disponible ahora",
      description: "Confirma atención disponible para tu mascota antes de desplazarte.",
      cardHref: "#card-veterinaria-patitas"
    },
    "english-horizon-hub": {
      name: "English Horizon Hub",
      category: "Academia",
      district: "Miraflores",
      address: "Av. Benavides 1450, Miraflores",
      hours: "Lunes a sábado, 9:00 a. m. a 8:30 p. m.",
      status: "Disponible ahora",
      description: "Consulta horarios, modalidad y disponibilidad de clases antes de inscribirte.",
      cardHref: "#card-english-horizon-hub"
    },
    "colegio-privado-la-molina": {
      name: "Colegio privado en La Molina",
      category: "Educación / Colegio bilingüe",
      district: "La Molina",
      address: "La Molina, Lima",
      hours: "Lunes a viernes, 7:30 a. m. a 4:00 p. m.",
      status: "Disponible en horario de atención",
      description: "Institución educativa privada y bilingüe en La Molina para información general, admisiones, horarios, programas académicos, visitas guiadas y orientación inicial para familias.",
      cardHref: "#card-colegio-privado-la-molina"
    }
  };

  const updateMapPanel = (businessKey) => {
    if (!mapBusinessName || !mapBusinessCategory || !mapBusinessDistrict || !mapBusinessAddress || !mapBusinessHours || !mapBusinessStatus || !mapBusinessDescription || !mapConnectLiveButton || !mapViewCardButton) return;

    const business = mapBusinesses[businessKey];
    if (!business) return;

    mapBusinessName.textContent = business.name;
    mapBusinessCategory.textContent = business.category;
    mapBusinessDistrict.textContent = business.district;
    mapBusinessAddress.textContent = business.address;
    mapBusinessHours.textContent = business.hours;
    mapBusinessStatus.textContent = business.status;
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
