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


    // --- 3. 3D Gallery Scroll Effect ---
    const cards = document.querySelectorAll('.movie-card');
    
    function update3DScroll() {
        const windowHeight = window.innerHeight;
        const windowCenter = windowHeight / 2;

        cards.forEach((card) => {
            const rect = card.getBoundingClientRect();
            const cardCenter = rect.top + (rect.height / 2);
            
            const distanceFromCenter = (cardCenter - windowCenter) / windowCenter;
            const clampedDistance = Math.max(-1.5, Math.min(1.5, distanceFromCenter));
            
            // 3D Gallery Math
            const rotateX = clampedDistance * -45; // Tilt
            const translateZ = Math.abs(clampedDistance) * -400; // Push back deeply
            const scale = 1 - (Math.abs(clampedDistance) * 0.15);
            
            card.style.setProperty('--scroll-rot-x', `${rotateX}deg`);
            card.style.setProperty('--scroll-z', `${translateZ}px`);
            card.style.setProperty('--scroll-scale', scale);
            
            if (Math.abs(clampedDistance) > 1.2) {
                card.style.opacity = 0;
            } else {
                card.style.opacity = 1 - (Math.abs(clampedDistance) * 0.3);
            }
        });
        
        requestAnimationFrame(update3DScroll);
    }
    
    update3DScroll();


    // --- 4. Advanced 3D Mouse Hover & Glare Engine ---
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            card.style.transitionDelay = '0s, 0s';
            
            const rect = card.getBoundingClientRect();
            
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;  
            
            const xPercent = (x / rect.width) * 100;
            const yPercent = (y / rect.height) * 100;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const maxTilt = 22; 
            const rotateX = ((y - centerY) / centerY) * -maxTilt; 
            const rotateY = ((x - centerX) / centerX) * maxTilt;

            card.style.setProperty('--hover-rot-x', `${rotateX}deg`);
            card.style.setProperty('--hover-rot-y', `${rotateY}deg`);
            card.style.setProperty('--mouse-x', `${xPercent}%`);
            card.style.setProperty('--mouse-y', `${yPercent}%`);
            
            card.style.setProperty('--hover-z', `40px`);
        });

        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--hover-rot-x', `0deg`);
            card.style.setProperty('--hover-rot-y', `0deg`);
            card.style.setProperty('--mouse-x', `50%`);
            card.style.setProperty('--mouse-y', `50%`);
            card.style.setProperty('--hover-z', `0px`);
        });
    });


    // --- 5. Parallax Header Effect ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if(window.scrollY > 50) {
            header.style.background = 'var(--bg-deep)';
            header.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.9)';
            header.style.transform = 'translateZ(20px)';
        } else {
            header.style.background = 'var(--bg-deep)';
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
        background: 'var(--primary)',
        color: '#fff',
        border: 'none',
        fontSize: '1.5rem',
        cursor: 'pointer',
        display: 'none',
        zIndex: '1000',
        boxShadow: '0 10px 30px rgba(228, 47, 69, 0.4)',
        transition: 'all 0.3s ease',
        transformStyle: 'preserve-3d'
    });

    topBtn.addEventListener('mouseenter', () => {
        topBtn.style.transform = 'translateY(-5px) translateZ(10px)';
        topBtn.style.boxShadow = '0 15px 40px rgba(228, 47, 69, 0.6)';
    });
    topBtn.addEventListener('mouseleave', () => {
        topBtn.style.transform = 'translateY(0) translateZ(0)';
        topBtn.style.boxShadow = '0 10px 30px rgba(228, 47, 69, 0.4)';
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

    // --- 7. Search Autocomplete ---
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        const searchInput = searchForm.querySelector('input[name="query"]');
        searchInput.setAttribute('autocomplete', 'off');

        // Create dropdown container
        const dropdown = document.createElement('div');
        dropdown.className = 'autocomplete-dropdown';
        searchForm.appendChild(dropdown);

        let debounceTimeout = null;

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            clearTimeout(debounceTimeout);

            if (query.length < 2) {
                dropdown.classList.remove('active');
                dropdown.innerHTML = '';
                return;
            }

            debounceTimeout = setTimeout(async () => {
                try {
                    const res = await fetch(`/api/autocomplete?q=${encodeURIComponent(query)}`);
                    const data = await res.json();

                    if (data.length > 0) {
                        dropdown.innerHTML = data.map(movie => `
                            <a href="/movie/${movie.id}" class="autocomplete-item">
                                <img src="${movie.poster_path ? `https://image.tmdb.org/t/p/w92${movie.poster_path}` : 'https://via.placeholder.com/92x138?text=No+Img'}" alt="${movie.title}">
                                <div class="autocomplete-item-info">
                                    <span class="autocomplete-item-title">${movie.title}</span>
                                    <span class="autocomplete-item-year">${movie.release_date}</span>
                                </div>
                            </a>
                        `).join('');
                        dropdown.classList.add('active');
                    } else {
                        dropdown.classList.remove('active');
                        dropdown.innerHTML = '';
                    }
                } catch (err) {
                    console.error("Autocomplete error:", err);
                }
            }, 300); // 300ms debounce
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchForm.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
        
        // Re-open if clicking back on input with value
        searchInput.addEventListener('focus', () => {
            if (dropdown.children.length > 0) {
                dropdown.classList.add('active');
            }
        });
    }

});