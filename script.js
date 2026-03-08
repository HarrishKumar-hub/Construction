document.addEventListener('DOMContentLoaded', () => {
    // ---- Mobile Navigation Toggle ----
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('nav ul');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
            const isExpanded = navMenu.classList.contains('show');
            menuToggle.innerHTML = isExpanded ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }

    // ---- Set active link based on current page ----
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // ---- Sticky Quote Bar (appears after scroll 300px) ----
    const stickyBar = document.getElementById('stickyQuoteBar');
    if (stickyBar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                stickyBar.style.transform = 'translateY(0)';
            } else {
                stickyBar.style.transform = 'translateY(100%)';
            }
        });
    }

    // ---- Lazy Image Observer (fade-in on load) ----
    const lazyImgs = document.querySelectorAll('img[loading="lazy"]');
    lazyImgs.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => img.classList.add('loaded'));
        }
    });

    // ---- Scroll Reveal Animation ----
    const revealEls = document.querySelectorAll('.service-card, .project-card, .why-item, .timeline-item, .testimonial-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealEls.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ---- Animated Stats Counter ----
    const counters = document.querySelectorAll('.stat-number');
    if (counters.length > 0) {
        const countObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.dataset.target);
                    const duration = 1800;
                    const step = target / (duration / 16);
                    let current = 0;
                    const timer = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            el.textContent = target;
                            clearInterval(timer);
                        } else {
                            el.textContent = Math.floor(current);
                        }
                    }, 16);
                    countObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(c => countObserver.observe(c));
    }
});

