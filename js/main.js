/**
 * LAND CONTABILIDADE - MAIN JAVASCRIPT
 * Gestão de Interações, WhatsApp Tracking, Modal de Proposta e FAQ
 */

// Central Configuration - Fácil de customizar
const COMPANY_CONFIG = {
  name: "Land Contabilidade Consultiva & Digital",
  phoneDisplay: "(71) 3215-2955",
  phoneRaw: "557132152955", // DDI 55 + DDD 71 + 32152955
  email: "contato@landcontabilidade.com.br",
  address: "Av. Paulista, 1000 - Bela Vista, São Paulo - SP",
  openingHours: "Segunda a Sexta: 08:30 às 18:00",
  social: {
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    facebook: "https://facebook.com"
  }
};

/**
 * Utilitário para gerar links de WhatsApp com mensagens pré-formatadas
 */
function createWhatsAppUrl(customMessage) {
  const text = encodeURIComponent(customMessage || "Olá! Gostaria de falar com um especialista da Land Contabilidade.");
  return `https://wa.me/${COMPANY_CONFIG.phoneRaw}?text=${text}`;
}

document.addEventListener("DOMContentLoaded", () => {
  // 1. Inicializar e atualizar links do WhatsApp dinamicamente
  document.querySelectorAll("[data-wa-action]").forEach(element => {
    const action = element.getAttribute("data-wa-action");
    let msg = "Olá! Gostaria de falar com um especialista da Land Contabilidade.";

    switch(action) {
      case "header":
        msg = "Olá! Vim pelo site e gostaria de tirar dúvidas com um especialista contábil.";
        break;
      case "hero":
        msg = "Olá! Vi a proposta da Land Contabilidade e quero saber como ter menos burocracia e mais lucro para minha empresa.";
        break;
      case "fiscal":
        msg = "Olá! Tenho interesse na Gestão Fiscal & Contábil Completa para minha empresa.";
        break;
      case "estrategica":
        msg = "Olá! Gostaria de agendar um Diagnóstico Tributário e Assessoria Empresarial Estratégica.";
        break;
      case "dp":
        msg = "Olá! Gostaria de saber mais sobre a gestão de Departamento Pessoal e eSocial.";
        break;
      case "mei":
        msg = "Olá! Gostaria de suporte para MEI / Migração para Microempresa (ME).";
        break;
      case "floating":
        msg = "Olá! Estou navegando no site da Land Contabilidade e gostaria de um atendimento imediato.";
        break;
      case "final":
        msg = "Olá! Quero uma contabilidade que jogue no meu time. Como podemos iniciar o diagnóstico?";
        break;
      default:
        msg = element.getAttribute("data-wa-custom") || msg;
    }

    element.href = createWhatsAppUrl(msg);
  });

  // 2. Navbar Scroll Effect
  const navbar = document.getElementById("main-nav");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.classList.add("shadow-lg", "bg-opacity-95");
    } else {
      navbar.classList.remove("shadow-lg");
    }
  });

  // 3. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIconOpen = document.getElementById("menu-icon-open");
  const menuIconClose = document.getElementById("menu-icon-close");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      const isOpen = !mobileMenu.classList.contains("hidden");
      if (isOpen) {
        mobileMenu.classList.add("hidden");
        menuIconOpen.classList.remove("hidden");
        menuIconClose.classList.add("hidden");
      } else {
        mobileMenu.classList.remove("hidden");
        menuIconOpen.classList.add("hidden");
        menuIconClose.classList.remove("hidden");
      }
    });

    // Close mobile menu when clicking a link
    mobileMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        menuIconOpen.classList.remove("hidden");
        menuIconClose.classList.add("hidden");
      });
    });
  }

  // 4. Accordion FAQ
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    const header = item.querySelector(".faq-header");
    header.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Fecha outros itens para efeito clean de sanfona
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
          const icon = otherItem.querySelector(".faq-icon");
          if (icon) icon.style.transform = "rotate(0deg)";
        }
      });

      // Alterna o atual
      if (isActive) {
        item.classList.remove("active");
        const icon = item.querySelector(".faq-icon");
        if (icon) icon.style.transform = "rotate(0deg)";
      } else {
        item.classList.add("active");
        const icon = item.querySelector(".faq-icon");
        if (icon) icon.style.transform = "rotate(180deg)";
      }
    });
  });

  // 5. Modal de Solicitação de Contato / Diagnóstico
  const contactModal = document.getElementById("contact-modal");
  const openModalBtns = document.querySelectorAll("[data-open-modal]");
  const closeModalBtns = document.querySelectorAll("[data-close-modal]");
  const leadForm = document.getElementById("lead-form");

  function openModal() {
    if (contactModal) {
      contactModal.classList.add("open");
      document.body.style.overflow = "hidden";
    }
  }

  function closeModal() {
    if (contactModal) {
      contactModal.classList.remove("open");
      document.body.style.overflow = "";
    }
  }

  openModalBtns.forEach(btn => btn.addEventListener("click", (e) => {
    e.preventDefault();
    openModal();
  }));

  closeModalBtns.forEach(btn => btn.addEventListener("click", closeModal));

  if (contactModal) {
    contactModal.addEventListener("click", (e) => {
      if (e.target === contactModal) {
        closeModal();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && contactModal.classList.contains("open")) {
        closeModal();
      }
    });
  }

  // 6. Formulário de Lead integrado ao WhatsApp
  if (leadForm) {
    leadForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("lead-name").value.trim();
      const phone = document.getElementById("lead-phone").value.trim();
      const email = document.getElementById("lead-email").value.trim();
      const segment = document.getElementById("lead-segment").value;
      const message = document.getElementById("lead-msg").value.trim();

      const formattedMsg = 
`*Solicitação de Diagnóstico Contábil - Site Land*
👤 *Nome:* ${name}
📱 *WhatsApp:* ${phone}
✉️ *E-mail:* ${email}
🏢 *Segmento:* ${segment || "Não informado"}
💬 *Observação:* ${message || "Gostaria de agendar um diagnóstico contábil."}`;

      const waUrl = createWhatsAppUrl(formattedMsg);
      closeModal();
      window.open(waUrl, "_blank");
    });
  }

  // 7. Atualizar ano no footer
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
