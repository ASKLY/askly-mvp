// Manejo del formulario del piloto y del modal de videollamada (MVP sin backend).
document.addEventListener("DOMContentLoaded", () => {
  const pilotForm = document.getElementById("pilot-form");
  const videoButtons = document.querySelectorAll(".video-call-btn");
  const videoModal = document.getElementById("video-modal");
  const closeVideoModalButton = document.getElementById("close-video-modal");
  const videoModalTitle = document.getElementById("video-modal-title");

  if (pilotForm) {
    pilotForm.addEventListener("submit", (event) => {
      event.preventDefault();
      alert("Gracias. Hemos recibido tu interés en Askly.");
      pilotForm.reset();
    });
  }

  if (!videoModal || !closeVideoModalButton || !videoModalTitle) return;

  const openVideoModal = (businessName) => {
    videoModalTitle.textContent = `Videollamada con ${businessName}`;
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

  closeVideoModalButton.addEventListener("click", closeVideoModal);

  videoModal.addEventListener("click", (event) => {
    if (event.target === videoModal) {
      closeVideoModal();
    }
  });
});
