/**
 * Cosmic Lashes And Nails (CLAN) - Master Interactive Script
 * Vanilla JavaScript (ES6+) - 0 External Library Dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Preloader Animation
  const preloader = document.getElementById('preloader');
  const progressBar = document.getElementById('preloader-bar');
  const counterText = document.getElementById('preloader-counter');

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 15) + 5;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        preloader.classList.add('fade-out');
        document.body.style.overflow = 'auto';
      }, 500);
    }
    if (progressBar) progressBar.style.width = `${progress}%`;
    if (counterText) counterText.textContent = `${progress}%`;
  }, 60);

  // 2. Custom Luxury Cursor
  const cursorDot = document.querySelector('.custom-cursor');
  const cursorFollower = document.querySelector('.custom-cursor-follower');

  if (cursorDot && cursorFollower) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    function animateCursor() {
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;

      cursorFollower.style.left = `${followerX}px`;
      cursorFollower.style.top = `${followerY}px`;

      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    const hoverables = document.querySelectorAll('a, button, .service-card, .gallery-card, .why-card, .filter-tab');
    hoverables.forEach(item => {
      item.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      item.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  // 3. Header Scroll Glass Effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // 4. Mobile Menu Navigation
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('active');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
      });
    });
  }

  // 5. Service Category Filter Tabs
  const serviceTabs = document.querySelectorAll('.service-filter-tab');
  const serviceCards = document.querySelectorAll('.service-card');

  serviceTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      serviceTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 6. Featured Nail Designs Gallery Filter Tabs & Lightbox
  const galleryTabs = document.querySelectorAll('.gallery-filter-tab');
  const galleryCards = document.querySelectorAll('.gallery-card');

  galleryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      galleryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      galleryCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Lightbox Modal Logic
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxCat = document.getElementById('lightbox-cat');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  const lightboxBookBtn = document.getElementById('lightbox-book-btn');

  let currentGalleryIndex = 0;
  const visibleGalleryItems = () => Array.from(galleryCards).filter(c => c.style.display !== 'none');

  function openLightbox(index) {
    const items = visibleGalleryItems();
    if (!items[index]) return;
    currentGalleryIndex = index;

    const item = items[index];
    const imgSrc = item.querySelector('.gallery-img')?.src;
    const title = item.querySelector('.gallery-title')?.textContent || 'Luxury Nail Art';
    const cat = item.querySelector('.gallery-cat')?.textContent || 'Nail Design';

    if (lightboxImg) lightboxImg.src = imgSrc;
    if (lightboxTitle) lightboxTitle.textContent = title;
    if (lightboxCat) lightboxCat.textContent = cat;

    lightbox?.classList.add('active');
  }

  galleryCards.forEach((card, i) => {
    card.addEventListener('click', () => {
      const items = visibleGalleryItems();
      const realIndex = items.indexOf(card);
      openLightbox(realIndex !== -1 ? realIndex : 0);
    });
  });

  lightboxClose?.addEventListener('click', () => lightbox?.classList.remove('active'));

  lightboxPrev?.addEventListener('click', () => {
    const items = visibleGalleryItems();
    currentGalleryIndex = (currentGalleryIndex - 1 + items.length) % items.length;
    openLightbox(currentGalleryIndex);
  });

  lightboxNext?.addEventListener('click', () => {
    const items = visibleGalleryItems();
    currentGalleryIndex = (currentGalleryIndex + 1) % items.length;
    openLightbox(currentGalleryIndex);
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox?.classList.contains('active')) return;
    if (e.key === 'Escape') lightbox.classList.remove('active');
    if (e.key === 'ArrowLeft') lightboxPrev?.click();
    if (e.key === 'ArrowRight') lightboxNext?.click();
  });

  lightboxBookBtn?.addEventListener('click', () => {
    const designTitle = lightboxTitle?.textContent || 'Nail Design';
    lightbox?.classList.remove('active');
    openBookingModal(`Custom Design: ${designTitle}`);
  });

  // 7. Interactive Before & After Slider
  const baWrapper = document.getElementById('ba-slider');
  const baAfterContainer = document.getElementById('ba-after-container');
  const baHandle = document.getElementById('ba-handle');

  if (baWrapper && baAfterContainer && baHandle) {
    let isDragging = false;
    const afterImg = baAfterContainer.querySelector('img');

    const setSliderPosition = (x) => {
      const rect = baWrapper.getBoundingClientRect();
      let offsetX = x - rect.left;
      if (offsetX < 0) offsetX = 0;
      if (offsetX > rect.width) offsetX = rect.width;

      const percentage = (offsetX / rect.width) * 100;
      baAfterContainer.style.width = `${percentage}%`;
      baHandle.style.left = `${percentage}%`;
      if (afterImg) afterImg.style.width = `${rect.width}px`;
    };

    window.addEventListener('resize', () => {
      if (baWrapper) {
        const rect = baWrapper.getBoundingClientRect();
        if (afterImg) afterImg.style.width = `${rect.width}px`;
      }
    });
    
    // Initial sync
    setTimeout(() => {
      const rect = baWrapper.getBoundingClientRect();
      if (afterImg) afterImg.style.width = `${rect.width}px`;
    }, 200);

    baWrapper.addEventListener('mousedown', (e) => {
      isDragging = true;
      setSliderPosition(e.clientX);
    });

    window.addEventListener('mouseup', () => isDragging = false);

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      setSliderPosition(e.clientX);
    });

    // Touch Support
    baWrapper.addEventListener('touchstart', (e) => {
      isDragging = true;
      setSliderPosition(e.touches[0].clientX);
    });

    window.addEventListener('touchend', () => isDragging = false);

    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      setSliderPosition(e.touches[0].clientX);
    });
  }

  // 8. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    header?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });

  // 9. Booking Modal & Form Processing
  const bookingModal = document.getElementById('booking-modal');
  const bookingClose = document.getElementById('booking-close');
  const bookingForm = document.getElementById('booking-form');
  const serviceSelect = document.getElementById('booking-service');

  window.openBookingModal = function(serviceName = '') {
    if (bookingModal) {
      if (serviceName && serviceSelect) {
        let matchedOption = Array.from(serviceSelect.options).find(opt => opt.value.toLowerCase().includes(serviceName.toLowerCase()));
        if (matchedOption) serviceSelect.value = matchedOption.value;
      }
      bookingModal.classList.add('active');
    }
  };

  bookingClose?.addEventListener('click', () => bookingModal?.classList.remove('active'));

  bookingForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('booking-name')?.value;
    const phone = document.getElementById('booking-phone')?.value;
    const service = document.getElementById('booking-service')?.value;
    const date = document.getElementById('booking-date')?.value;
    const time = document.getElementById('booking-time')?.value;
    const notes = document.getElementById('booking-notes')?.value;

    const message = `Hello Cosmic Lashes And Nails! 🌟\n\nI would like to book an appointment:\n- *Name*: ${name}\n- *Phone*: ${phone}\n- *Service*: ${service}\n- *Date*: ${date}\n- *Time Slot*: ${time}\n- *Notes*: ${notes || 'N/A'}\n\nPlease confirm availability. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919606927373?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
    bookingModal?.classList.remove('active');
  });

  // 10. Scroll Reveal Animations (IntersectionObserver)
  const revealElements = document.querySelectorAll('.glass-card, .service-card, .gallery-card, .why-card, .stat-card, .package-card, .review-card');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    revealObserver.observe(el);
  });
});
