// Lógica del MVP Askly: formulario y modal de videollamada demo.
document.addEventListener("DOMContentLoaded", () => {
  const pilotForm = document.getElementById("pilot-form");
  const videoButtons = document.querySelectorAll(".video-btn");
  const videoModal = document.getElementById("video-modal");
  const videoModalTitle = document.getElementById("video-modal-title");
  const closeVideoModalButton = document.getElementById("close-video-modal");

  if (pilotForm) {
    pilotForm.addEventListener("submit", (event) => {
      event.preventDefault();
      alert("Gracias. Hemos recibido tu interés en Askly.");
      pilotForm.reset();
    });
  }

  const closeVideoModal = () => {
    if (!videoModal) return;
    videoModal.classList.remove("modal-open");
    videoModal.setAttribute("aria-hidden", "true");
  };

  const openVideoModal = (businessName) => {
    if (!videoModal || !videoModalTitle) return;
    videoModalTitle.textContent = `Videollamada con ${businessName}`;
    videoModal.classList.add("modal-open");
    videoModal.setAttribute("aria-hidden", "false");
  };

  videoButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const businessName = button.dataset.business || "negocio";
      openVideoModal(businessName);
    });
  });

  if (closeVideoModalButton) {
    closeVideoModalButton.addEventListener("click", closeVideoModal);
  }

  if (videoModal) {
    videoModal.addEventListener("click", (event) => {
      if (event.target instanceof HTMLElement && event.target.dataset.closeModal === "true") {
        closeVideoModal();
      }
    });
  }
});
