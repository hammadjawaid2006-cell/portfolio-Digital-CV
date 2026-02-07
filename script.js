// ===================================
// PREMIUM PORTFOLIO JAVASCRIPT
// Smooth animations and interactions
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // NAVIGATION FUNCTIONALITY
    // ===================================
    
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-link');
    
    // Sticky navigation with background change on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Animate hamburger to X
        const spans = navToggle.querySelectorAll('span');
        if (navLinks.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(10px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Close mobile menu when clicking a link
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
    
    // Active link highlighting based on scroll position
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('.section, .hero');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinkItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    
    // ===================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ===================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    
    // ===================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ===================================
    
    // Create intersection observer for scroll-triggered animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate skill progress bars
                if (entry.target.classList.contains('skill-card')) {
                    const progressBar = entry.target.querySelector('.skill-progress-bar');
                    const progress = progressBar.getAttribute('data-progress');
                    progressBar.style.setProperty('--progress-width', progress + '%');
                }
            }
        });
    }, observerOptions);
    
    // Observe all elements with data-animate attribute
    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach(element => observer.observe(element));
    
    
    // ===================================
    // SKILL CARD ANIMATIONS
    // ===================================
    
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
    
    
    // ===================================
    // TIMELINE ANIMATIONS
    // ===================================
    
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(item);
    });
    
    
    // ===================================
    // CONTACT CARDS ANIMATIONS
    // ===================================
    
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(card);
    });
    
    
    // ===================================
    // BUTTON HOVER EFFECTS
    // ===================================
    
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        // Create ripple effect on click
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                left: ${x}px;
                top: ${y}px;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add ripple animation to stylesheet dynamically
    if (!document.querySelector('#ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    
    // ===================================
    // CURSOR EFFECTS (DESKTOP ONLY)
    // ===================================
    
    if (window.innerWidth > 768) {
        const cursor = document.createElement('div');
        cursor.classList.add('custom-cursor');
        document.body.appendChild(cursor);
        
        const cursorFollower = document.createElement('div');
        cursorFollower.classList.add('custom-cursor-follower');
        document.body.appendChild(cursorFollower);
        
        // Add cursor styles
        const cursorStyle = document.createElement('style');
        cursorStyle.textContent = `
            .custom-cursor,
            .custom-cursor-follower {
                position: fixed;
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                transition: transform 0.2s ease, opacity 0.3s ease;
            }
            
            .custom-cursor {
                width: 10px;
                height: 10px;
                background: var(--color-gold);
                transform: translate(-50%, -50%);
                box-shadow: 0 0 20px rgba(212, 175, 55, 0.5);
            }
            
            .custom-cursor-follower {
                width: 40px;
                height: 40px;
                border: 2px solid var(--color-gold);
                transform: translate(-50%, -50%) scale(1);
                transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                opacity: 0.5;
            }
            
            .custom-cursor.expand,
            .custom-cursor-follower.expand {
                transform: translate(-50%, -50%) scale(1.5);
                opacity: 0.8;
            }
        `;
        document.head.appendChild(cursorStyle);
        
        // Track cursor position
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let followerX = 0, followerY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        // Smooth cursor animation
        function animateCursor() {
            // Cursor position (immediate)
            cursorX += (mouseX - cursorX) * 0.9;
            cursorY += (mouseY - cursorY) * 0.9;
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            
            // Follower position (delayed)
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';
            
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
        
        // Expand cursor on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn, .skill-card, .contact-card');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('expand');
                cursorFollower.classList.add('expand');
            });
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('expand');
                cursorFollower.classList.remove('expand');
            });
        });
    }
    
    
    // ===================================
    // PARALLAX EFFECT ON SCROLL
    // ===================================
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.8;
        }
    });
    
    
    // ===================================
    // HIGHLIGHT CARD HOVER EFFECTS
    // ===================================
    
    const highlightCards = document.querySelectorAll('.highlight-card');
    highlightCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
    
    // Add glow effect style
    const glowStyle = document.createElement('style');
    glowStyle.textContent = `
        .highlight-card::before {
            content: '';
            position: absolute;
            top: var(--mouse-y, 50%);
            left: var(--mouse-x, 50%);
            width: 200px;
            height: 200px;
            background: radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%);
            transform: translate(-50%, -50%);
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        }
        
        .highlight-card:hover::before {
            opacity: 1;
        }
    `;
    document.head.appendChild(glowStyle);
    
    
    // ===================================
    // PERFORMANCE OPTIMIZATIONS
    // ===================================
    
    // Debounce function for scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Throttle function for frequent events
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    
    // ===================================
    // LAZY LOADING FOR IMAGES
    // ===================================
    
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    
    // ===================================
    // EXPERIENCE CARD ANIMATION
    // ===================================
    
    const experienceCard = document.querySelector('.experience-card');
    if (experienceCard) {
        observer.observe(experienceCard);
    }
    
    
    // ===================================
    // TYPING EFFECT FOR HERO SUBTITLE (OPTIONAL)
    // ===================================
    
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.textContent = '';
        element.style.opacity = '1';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Uncomment to enable typing effect
    // const heroSubtitle = document.querySelector('.hero-subtitle');
    // if (heroSubtitle) {
    //     const originalText = heroSubtitle.textContent;
    //     setTimeout(() => typeWriter(heroSubtitle, originalText, 40), 1000);
    // }
    
    
    // ===================================
    // SCROLL PROGRESS INDICATOR
    // ===================================
    
    const scrollProgress = document.createElement('div');
    scrollProgress.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--color-gold), var(--color-electric-blue));
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(scrollProgress);
    
    window.addEventListener('scroll', throttle(() => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + '%';
    }, 10));
    
    
    // ===================================
    // CONSOLE MESSAGE (EASTER EGG)
    // ===================================
    
    console.log('%c👋 Hello There!', 'color: #d4af37; font-size: 24px; font-weight: bold;');
    console.log('%cLooking for talent? Let\'s connect!', 'color: #00d4ff; font-size: 16px;');
    console.log('%cEmail: your.email@example.com', 'color: #f8f8f8; font-size: 14px;');
    
    
    // ===================================
    // INITIALIZE ALL ANIMATIONS ON LOAD
    // ===================================
    
    console.log('✨ Premium Portfolio Initialized');
    
});


// ===================================
// ADDITIONAL UTILITY FUNCTIONS
// ===================================

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Get scroll percentage
function getScrollPercentage() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    return (winScroll / height) * 100;
}

// Smooth scroll to element
function smoothScrollTo(element, duration = 1000) {
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - 80;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}
