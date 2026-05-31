const navLinks = document.querySelectorAll('.nav-link');
const sections = Array.from(document.querySelectorAll('.page-section'));
const reservationForm = document.getElementById('reservation-form');
const reservationServiceInput = document.getElementById('service');
const header = document.getElementById('site-header');
const welcomeTitle = document.getElementById('welcome-title');
const serviceLinks = Array.from(document.querySelectorAll('.service-link'));

function smoothScrollTo(element) {
  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function setActiveNav(sectionId) {
  navLinks.forEach((link) => {
    if (link.getAttribute('href') === `#${sectionId}`) {
      link.classList.add('nav-link--active');
    } else {
      link.classList.remove('nav-link--active');
    }
  });
}

function updateActiveSection() {
  const currentSection = sections.find((section) => {
    const rect = section.getBoundingClientRect();
    return rect.top <= 120 && rect.bottom > 120;
  });
  if (currentSection) {
    setActiveNav(currentSection.id);
  }
}

function registerServiceCardInteractions() {
  serviceLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const card = link.closest('.service-card');
      const titleElement = card?.querySelector('.service-title');
      const serviceName = titleElement?.textContent.trim();

      if (serviceName && reservationServiceInput) {
        reservationServiceInput.value = serviceName;
      }

      const reservationSection = document.getElementById('reservation');
      if (reservationSection) {
        smoothScrollTo(reservationSection);
        reservationSection.classList.add('section-highlight');
        setTimeout(() => reservationSection.classList.remove('section-highlight'), 1200);
      }
    });
  });
}

function registerNavLinks() {
  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) {
        return;
      }
      event.preventDefault();
      const targetId = href.substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        smoothScrollTo(target);
        setActiveNav(targetId);
      }
    });
  });
}

function registerForms() {
  if (!reservationForm) return;
  reservationForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('nom')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const service = reservationServiceInput?.value.trim();

    if (!name || !email || !service) {
      alert('Merci de remplir le service, le nom et l\'email pour réserver.');
      return;
    }

    alert(`Merci ${name} ! Votre réservation pour « ${service} » a bien été envoyée.`);
    reservationForm.reset();
  });
}

function observeSections() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    },
    { threshold: 0.2 }
  );

  sections.forEach((section) => observer.observe(section));
}

window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('page-loaded');
  if (welcomeTitle) {
    welcomeTitle.classList.add('fade-in');
  }
  if (header) {
    header.classList.add('slide-down');
  }
  registerNavLinks();
  registerServiceCardInteractions();
  registerForms();
  observeSections();
  updateActiveSection();
});

window.addEventListener('scroll', updateActiveSection);
