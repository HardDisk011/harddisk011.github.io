document.addEventListener("DOMContentLoaded", () => {
  
  // 1. ANIMAZIONE FLUIDA AL COINVOLGIMENTO DELLO SCROLL (SCROLL REVEAL)
  const revealElements = document.querySelectorAll(".scroll-reveal");

  const revealOnScroll = () => {
    const triggerBottom = (window.innerHeight / 5) * 4;

    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;

      if (elementTop < triggerBottom) {
        element.classList.add("active");
      }
    });
  };

  // Eseguiamo subito al caricamento della pagina per mostrare gli elementi già visibili
  revealOnScroll();
  // Agganciamo l'evento allo scroll della finestra
  window.addEventListener("scroll", revealOnScroll);


  // 2. FUNZIONAMENTO FISARMONICA (ACCORDION) DELLE DOMANDE FREQUENTI
  const faqToggles = document.querySelectorAll(".faq-toggle");

  faqToggles.forEach((toggle) => {
    toggle.addEventListener("click", function () {
      const parent = this.parentElement;
      const content = this.nextElementSibling;

      // Se l'elemento è già aperto, lo chiudiamo
      if (parent.classList.contains("open")) {
        content.style.maxHeight = null;
        parent.classList.remove("open");
      } else {
        // Altrimenti, prima chiudiamo tutte le altre FAQ aperte per ordine visivo...
        document.querySelectorAll(".faq-item").forEach((item) => {
          item.classList.remove("open");
          item.querySelector(".faq-content").style.maxHeight = null;
        });

        // ...e poi apriamo quella cliccata calcolandone l'altezza dinamica
        parent.classList.add("open");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
});
