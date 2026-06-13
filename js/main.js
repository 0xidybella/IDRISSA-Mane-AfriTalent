document.addEventListener('DOMContentLoaded', () => {


/* GESTION DU DARK MODE PERSISTANT */
const body = document.body;
const themeToggle = document.getElementById('theme-toggle');
/*recuperer le theme sauvegarde */
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
}
//* ecouter le clic sur le bouton de bascule *//
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');

        //* sauvegarder le choix dans le localstorage *//
        if (body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
         } else {
             localStorage.setItem('theme', 'light');
         }
    } );
}
//* NAVBAR DYNAMIQUE et boutton AU SCROLL *//
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    //* LOGIQUE NAVBAR *//
if (navbar){ 
    if(window.scrollY > 50) {
        //* si on descend de plus de 50px, on ajoute une classe de scroll *//
        navbar.classList.add('navbar-scrolled');
    } else {
        // * Sinon, on remet la navbar a son etat initial *//
        navbar.classList.remove('navbar-scrolled');
    }
 }
});

});

    document.addEventListener('DOMContentLoaded', () => {

    // ======================================================================
    // LOGIQUE COMMIT 6 : DARK MODE & NAVBAR AU SCROLL
    // ======================================================================
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            if (body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }

    const navbar = document.querySelector('.navbar');
    const backToTopBtn = document.getElementById('back-to-top');

    // Flag pour bloquer la répétition de l'animation des chiffres
    let countersAnimated = false;

    // ÉCOUTEUR UNIQUE DU SCROLL GLOBAL
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        const windowHeight = window.innerHeight;

        // A. Gestion Navbar (Commit 6)
        if (navbar) { 
            if (currentScroll > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        }

        // B. Gestion Apparition Bouton Top (Commit 7)
        if (backToTopBtn) { 
            if (currentScroll > 300) {
                backToTopBtn.classList.remove('d-none');
            } else {
                backToTopBtn.classList.add('d-none');
            }
        }

        // C. Gestion Fade-in des Sections (Commit 7)
        const fadeSections = document.querySelectorAll('.fade-in-section');
        fadeSections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (currentScroll + (windowHeight * 0.8) > sectionTop) {
                section.classList.add('is-visible');
            }
        });

        // D. Déclenchement des Compteurs (Commit 7)
        const statsSection = document.getElementById('statistiques');
        if (statsSection && !countersAnimated) {
            const statsTop = statsSection.offsetTop;
            if (currentScroll + (windowHeight * 0.8) > statsTop) {
                countersAnimated = true; // Bloque le re-déclenchement
                
                const counters = document.querySelectorAll('.counter');
                counters.forEach(counter => {
                    animateL1Counter(counter);
                });
            }
        }
    });

    // Action au clic sur le bouton retour en haut
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ALGORITHME DE CALCUL DES COMPTEURS COMPATIBLE L1CS (setInterval)
    function animateL1Counter(counter) {
        const target = parseInt(counter.getAttribute('data-target'), 10);
        let current = 0;
        const step = Math.ceil(target / 40); // Vitesse globale ajustable

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                counter.innerText = target + (target > 100 ? '+' : '');
                clearInterval(timer); // Arrête le timer proprement
            } else {
                counter.innerText = current + (target > 100 ? '+' : '');
            }
        }, 30);
    }

});
