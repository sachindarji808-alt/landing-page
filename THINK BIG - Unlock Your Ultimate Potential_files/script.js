document.addEventListener('DOMContentLoaded', () => {
  // Set dynamic copyright year
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 1. Sticky Header Transition on Scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 2. Intersection Observer for Scroll Fade-in Animations
  const faders = document.querySelectorAll('.fade-in, .feature-card');
  const appearOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('appear');
      observer.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach(fader => {
    fader.classList.add('fade-in');
    appearOnScroll.observe(fader);
  });

  // 3. Pricing Toggle Logic (Monthly vs Yearly)
  const pricingToggle = document.getElementById('pricingToggle');
  const priceElements = document.querySelectorAll('.price');

  if (pricingToggle) {
    pricingToggle.addEventListener('change', () => {
      const isYearly = pricingToggle.checked;
      
      priceElements.forEach(elem => {
        const targetPrice = isYearly 
          ? elem.getAttribute('data-yearly') 
          : elem.getAttribute('data-monthly');

        // Smooth transition effect for numbers
        elem.style.opacity = '0';
        setTimeout(() => {
          elem.textContent = targetPrice;
          elem.style.opacity = '1';
        }, 150);
      });
    });
  }

  // 4. Interactive FAQ Accordion
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const content = header.nextElementSibling;
      const isOpen = item.classList.contains('active');

      // Close all active accordions for cleaner UX
      document.querySelectorAll('.accordion-item').forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.accordion-content').style.maxHeight = null;
      });

      // Toggle current
      if (!isOpen) {
        item.classList.add('active');
        content.style.maxHeight = `${content.scrollHeight + 20}px`;
      }
    });
  });

  // 5. Hero Form Submission Handling
  const leadForm = document.getElementById('leadForm');
  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = leadForm.querySelector('input[type="email"]');
      const submitBtn = leadForm.querySelector('button');

      if (emailInput && emailInput.value) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Setting up account...';

        setTimeout(() => {
          submitBtn.textContent = 'Access Granted! ✓';
          submitBtn.style.background = '#10b981';
          emailInput.value = '';
          emailInput.disabled = true;
        }, 1000);
      }
    });
  }
});