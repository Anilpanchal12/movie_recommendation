// ==========================
// Advanced 3D Cinematic Engine
// ==========================

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Search Box UX ---
    const searchInput = document.querySelector(".search-form input");
    if (searchInput) {
        searchInput.focus();
    }

    document.addEventListener("keydown", function (e) {
        if (e.key === "/" && document.activeElement.tagName !== "INPUT") {
            e.preventDefault();
            if (searchInput) searchInput.focus();
        }
        // Shortcut: H = Home
        if (e.key.toLowerCase() === "h" && document.activeElement.tagName !== "INPUT") {
            window.location.href = "/";
        }
    });

    const searchForm = document.querySelector(".search-form");
    if (searchForm) {
        searchForm.addEventListener("submit", function () {
            const button = this.querySelector("button");
            // button.innerHTML = "Searching...";
            button.disabled = true;
            // Add a slight 3D press effect
            button.style.transform = "translateZ(-10px) scale(0.95)";
        });
    }


    // --- 2. Poster Fade & Initialization ---
    const posters = document.querySelectorAll(".movie-card img");
    posters.forEach((poster) => {
        if (poster.complete) {
            poster.style.opacity = "1";
        } else {
            poster.style.opacity = "0";
            poster.onload = () => {
                poster.style.opacity = "1";
            };
            poster.onerror = () => {
                poster.style.opacity = "1";
            };
        }
    });


    // --- 3. Scroll-Triggered 3D Reveal ---
    // Extracting this from the inline scripts in the EJS files
    const cards = document.querySelectorAll('.movie-card');
    
    const observerOptions = {
        root: null,
        rootMargin: '50px 0px -50px 0px', // Trigger slightly before it comes fully in
        threshold: 0.1 
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-visible');
                entry.target.classList.remove('scroll-hidden');
            } else {
                // Re-hide when scrolling out for continuous effect
                const rect = entry.target.getBoundingClientRect();
                // Only hide if scrolling down past it or scrolling up above it
                if(rect.top > window.innerHeight || rect.bottom < 0) {
                    entry.target.classList.remove('scroll-visible');
                    entry.target.classList.add('scroll-hidden');
                }
            }
        });
    }, observerOptions);

    cards.forEach((card, index) => {
        card.classList.add('scroll-hidden');
        // Add a slight staggered transition delay based on index (modulo for rows)
        const delay = (index % 4) * 0.1;
        card.style.transitionDelay = `${delay}s, 0s`; // delay transform, no delay for box-shadow
        scrollObserver.observe(card);
    });


    // --- 4. Advanced 3D Mouse Hover & Glare Engine ---
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            // Remove delay during hover interaction for immediate response
            card.style.transitionDelay = '0s, 0s';
            
            const rect = card.getBoundingClientRect();
            
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;  
            
            const xPercent = (x / rect.width) * 100;
            const yPercent = (y / rect.height) * 100;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Premium cinematic tilt (higher angle for dramatic effect)
            const maxTilt = 22; 
            const rotateX = ((y - centerY) / centerY) * -maxTilt; 
            const rotateY = ((x - centerX) / centerX) * maxTilt;

            card.style.setProperty('--rot-x', `${rotateX}deg`);
            card.style.setProperty('--rot-y', `${rotateY}deg`);
            card.style.setProperty('--mouse-x', `${xPercent}%`);
            card.style.setProperty('--mouse-y', `${yPercent}%`);
            
            // Add scale up
            card.style.setProperty('--scale', `1.08`);
            card.style.setProperty('--z', `40px`);
        });

        card.addEventListener('mouseleave', () => {
            // Revert properties smoothly
            card.style.setProperty('--rot-x', `0deg`);
            card.style.setProperty('--rot-y', `0deg`);
            card.style.setProperty('--mouse-x', `50%`);
            card.style.setProperty('--mouse-y', `50%`);
            card.style.setProperty('--scale', `1`);
            card.style.setProperty('--z', `0px`);
        });
    });


    // --- 5. Parallax Header Effect ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if(window.scrollY > 50) {
            header.style.background = 'rgba(2, 2, 4, 0.85)';
            header.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.8)';
            header.style.transform = 'translateZ(20px)';
        } else {
            header.style.background = 'rgba(5, 5, 8, 0.65)';
            header.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.6)';
            header.style.transform = 'translateZ(0px)';
        }
    });

    // --- 6. Scroll To Top Button (Premium styling via JS or CSS class) ---
    const topBtn = document.createElement("button");
    topBtn.innerHTML = "↑";
    topBtn.id = "topBtn";
    // Style applied directly for convenience
    Object.assign(topBtn.style, {
        position: 'fixed',
        bottom: '40px',
        right: '40px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, var(--primary), var(--accent-dark))',
        color: '#fff',
        border: 'none',
        fontSize: '1.5rem',
        cursor: 'pointer',
        display: 'none',
        zIndex: '1000',
        boxShadow: '0 10px 30px rgba(255, 0, 51, 0.4)',
        transition: 'all 0.3s ease',
        transformStyle: 'preserve-3d'
    });

    topBtn.addEventListener('mouseenter', () => {
        topBtn.style.transform = 'translateY(-5px) translateZ(10px)';
        topBtn.style.boxShadow = '0 15px 40px rgba(255, 0, 51, 0.6)';
    });
    topBtn.addEventListener('mouseleave', () => {
        topBtn.style.transform = 'translateY(0) translateZ(0)';
        topBtn.style.boxShadow = '0 10px 30px rgba(255, 0, 51, 0.4)';
    });

    document.body.appendChild(topBtn);

    window.addEventListener("scroll", () => {
        if (window.scrollY > 500) {
            topBtn.style.display = "block";
            // slight fade in could be added here
        } else {
            topBtn.style.display = "none";
        }
    });

    topBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

});