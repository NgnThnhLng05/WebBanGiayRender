document.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.hero');
  const prevBtn = document.querySelector('.hero__nav button[aria-label="Previous"]');
  const nextBtn = document.querySelector('.hero__nav button[aria-label="Next"]');
  const indicator = document.querySelector('.hero__indicator');

  if (!hero) {
    console.warn('Hero element not found. Slideshow will not run.');
    return;
  }

  const images = [
    'assets/images/hero.png',
    'assets/images/hero3.png',
    'assets/images/hero4.png'
  ];
  let currentIndex = 0;
  let slideshowInterval;

  const updateIndicator = () => {
    if (!indicator) return;
    indicator.textContent = `${currentIndex + 1} / ${images.length}`;
  };

  const setBackground = (index) => {
    hero.style.transition = 'background-image 0.6s ease';
    hero.style.background =
      `radial-gradient(circle at 20% 45%, rgba(1, 67, 102, 0.4), transparent 55%), url('${images[index]}') center/cover no-repeat`;
    updateIndicator();
  };

  const changeBackground = () => {
    currentIndex = (currentIndex + 1) % images.length;
    setBackground(currentIndex);
  };

  const resetSlideshow = () => {
    clearInterval(slideshowInterval);
    slideshowInterval = setInterval(changeBackground, 3000);
  };

  setBackground(currentIndex);
  slideshowInterval = setInterval(changeBackground, 3000);

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      setBackground(currentIndex);
      resetSlideshow();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % images.length;
      setBackground(currentIndex);
      resetSlideshow();
    });
  }

  // Mobile menu toggle only (desktop menu always visible)
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const logoBtn = document.querySelector('.logo-btn');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const isMobile = window.matchMedia('(max-width: 900px)').matches;
      if (isMobile) {
        mobileMenu.classList.toggle('active');
      }
    });
  }

  if (logoBtn) {
    logoBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});