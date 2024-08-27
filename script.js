document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const backToTopButton = document.querySelector('.back-to-top');

    // Mobile menu toggle
    mobileMenuToggle?.addEventListener('click', () => {
        navLinks.classList.toggle('show');
        mobileMenuToggle.classList.toggle('open');
    });

    // Sticky header and Back to Top button
    const handleScroll = () => {
        if (window.scrollY > header.offsetHeight) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    };

    window.addEventListener('scroll', handleScroll);

    backToTopButton?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Animated counter for statistics
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'), 10);
        const duration = 2000;
        let startTime = null;

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const value = Math.round(progress * target);
            counter.textContent = value;
            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        };

        requestAnimationFrame(animation);
    };

    // Intersection Observer for counter animation
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.percentage').forEach(counter => {
        counterObserver.observe(counter);
    });

    // Form submission
    const contactForm = document.querySelector('#contact-form form');
    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thank you for your message. We will get back to you soon!');
        contactForm.reset();
    });

    // Supporters carousel
    const supportersCarousel = document.querySelector('.supporters-carousel');
    if (supportersCarousel) {
        const supporters = Array.from(supportersCarousel.children);
        let currentIndex = 0;

        const showNextSupporter = () => {
            supporters[currentIndex].style.display = 'none';
            currentIndex = (currentIndex + 1) % supporters.length;
            supporters[currentIndex].style.display = 'block';
        };

        supporters.slice(1).forEach(supporter => supporter.style.display = 'none');
        setInterval(showNextSupporter, 5000);
    }

    // Animate circular progress bars
    const animateCircle = (circle) => {
        const percentageElement = circle.parentNode.querySelector('.percentage');
        const percent = percentageElement.getAttribute('data-target');
        
        circle.style.strokeDasharray = `${percent}, 100`;
        let currentPercent = 0;
        const duration = 2000;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            currentPercent = Math.min(percent * (elapsed / duration), percent);
            circle.style.strokeDasharray = `${currentPercent}, 100`;
            percentageElement.textContent = Math.round(currentPercent);

            if (elapsed < duration) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    };

    document.querySelectorAll('.circular-chart .circle').forEach(animateCircle);

    // Accessibility: Add keyboard navigation for card elements
    document.querySelectorAll('.info-item, .news-item, .supporter-item').forEach(card => {
        card.setAttribute('tabindex', '0');
        card.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                card.click();
            }
        });
    });

    // Lazy load images
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // Animate elements on scroll
    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => elementObserver.observe(el));
});

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.objective-card');
    const indicator = document.querySelector('.carousel-indicator');
    let currentIndex = 0;
  
    // Create indicator dots
    cards.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('indicator-dot');
      if (index === 0) dot.classList.add('active');
      indicator.appendChild(dot);
    });
  
    const indicatorDots = document.querySelectorAll('.indicator-dot');
  
    function updateCarousel() {
      cards.forEach((card, index) => {
        card.classList.toggle('active', index === currentIndex);
      });
      
      indicatorDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    }
  
    function nextSlide() {
      currentIndex = (currentIndex + 1) % cards.length;
      updateCarousel();
    }
  
    // Auto-slide every 5 seconds
    let intervalId = setInterval(nextSlide, 5000);
  
    // Optional: Pause on hover
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => clearInterval(intervalId));
      card.addEventListener('mouseleave', () => intervalId = setInterval(nextSlide, 5000));
    });
  
    // Optional: Click on dots to navigate
    indicatorDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
        clearInterval(intervalId);
        intervalId = setInterval(nextSlide, 5000);
      });
    });
  
    // Initial setup
    updateCarousel();
  });

    // Animated counter for statistics
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'), 10);
        const duration = 2000;
        let startTime = null;
    
        const animation = (currentTime) => {
          if (startTime === null) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const progress = Math.min(timeElapsed / duration, 1);
          const value = Math.round(progress * target);
          counter.textContent = value;
          if (progress < 1) {
            requestAnimationFrame(animation);
          }
        };
    
        requestAnimationFrame(animation);
      };
    
      // Intersection Observer for counter animation
      const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
    
      document.querySelectorAll('.percentage').forEach(counter => {
        counterObserver.observe(counter);
      });