// Main JavaScript for Gigatech Informática Landing Page

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Set current year in footer
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Theme Management (Dark Mode & Clean Mode)
  const htmlEl = document.documentElement;
  const themeToggles = document.querySelectorAll('.theme-toggle-btn');
  
  function updateThemeUI(theme) {
    themeToggles.forEach(btn => {
      const iconSun = btn.querySelector('.theme-icon-sun');
      const iconMoon = btn.querySelector('.theme-icon-moon');
      const label = btn.querySelector('.theme-label');

      if (theme === 'clean') {
        if (iconSun) iconSun.classList.add('hidden');
        if (iconMoon) iconMoon.classList.remove('hidden');
        if (label) label.textContent = 'Modo Dark';
        btn.setAttribute('title', 'Alternar para Modo Dark');
      } else {
        if (iconSun) iconSun.classList.remove('hidden');
        if (iconMoon) iconMoon.classList.add('hidden');
        if (label) label.textContent = 'Modo Clean';
        btn.setAttribute('title', 'Alternar para Modo Clean');
      }
    });

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function setTheme(theme) {
    if (theme === 'clean') {
      htmlEl.classList.remove('dark');
      localStorage.setItem('gigatech-theme', 'clean');
      updateThemeUI('clean');
    } else {
      htmlEl.classList.add('dark');
      localStorage.setItem('gigatech-theme', 'dark');
      updateThemeUI('dark');
    }
  }

  // Initialize theme from localStorage (default: dark)
  const savedTheme = localStorage.getItem('gigatech-theme') || 'dark';
  setTheme(savedTheme);

  // Bind click handlers to theme toggle buttons
  themeToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const isCurrentlyDark = htmlEl.classList.contains('dark');
      setTheme(isCurrentlyDark ? 'clean' : 'dark');
    });
  });

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('hidden');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // FAQ Accordion functionality
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    if (questionBtn && answer) {
      questionBtn.addEventListener('click', () => {
        const isOpen = !answer.classList.contains('hidden');

        // Close all other open answers
        faqItems.forEach(otherItem => {
          const otherAnswer = otherItem.querySelector('.faq-answer');
          const otherIcon = otherItem.querySelector('.faq-icon');
          if (otherAnswer && otherAnswer !== answer) {
            otherAnswer.classList.add('hidden');
            if (otherIcon) {
              otherIcon.classList.remove('rotate-180');
            }
          }
        });

        // Toggle current
        if (isOpen) {
          answer.classList.add('hidden');
          if (icon) icon.classList.remove('rotate-180');
        } else {
          answer.classList.remove('hidden');
          if (icon) icon.classList.add('rotate-180');
        }
      });
    }
  });

  // Phone Mask for WhatsApp input
  const phoneInput = document.getElementById('lead-phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 11) value = value.slice(0, 11);

      if (value.length > 10) {
        // (XX) XXXXX-XXXX
        value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
      } else if (value.length > 6) {
        // (XX) XXXX-XXXX
        value = value.replace(/^(\d{2})(\d{4,5})(\d{0,4})$/, '($1) $2-$3');
      } else if (value.length > 2) {
        value = value.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
      } else if (value.length > 0) {
        value = value.replace(/^(\d{0,2})$/, '($1');
      }
      e.target.value = value;
    });
  }

  // Lead Form WhatsApp Submission
  const leadForm = document.getElementById('lead-form');
  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('lead-name')?.value.trim() || '';
      const phone = document.getElementById('lead-phone')?.value.trim() || '';
      const city = document.getElementById('lead-city')?.value || 'Salvador / Lauro de Freitas';
      const need = document.getElementById('lead-need')?.value || 'Não informado';

      if (!name || !phone) {
        alert('Por favor, preencha seu nome e telefone para contato.');
        return;
      }

      // Build personalized WhatsApp text
      const message = `*Olá, equipe da Gigatech Informática!*\n` +
        `Gostaria de solicitar atendimento através da página web:\n\n` +
        `👤 *Nome:* ${name}\n` +
        `📱 *Telefone/WhatsApp:* ${phone}\n` +
        `📍 *Cidade:* ${city}\n` +
        `🔧 *Necessidade:* ${need}\n\n` +
        `_Aguardo retorno de um especialista. Obrigado!_`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/5571987564072?text=${encodedMessage}`;

      // Open WhatsApp in a new tab
      window.open(whatsappUrl, '_blank');
    });
  }
});
