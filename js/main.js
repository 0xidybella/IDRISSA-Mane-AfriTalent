
document.addEventListener('DOMContentLoaded', () => {
    // 1. COMMITS 6 & 7 : GESTION DU DARK MODE PERSISTANT & SÉCURISÉ
    const body = document.body;
    
    // Récupérer le thème sauvegardé en mémoire
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
    }

    // Écouteur global pour le bouton (Garantit le fonctionnement sur 100% des clics)
    document.addEventListener('click', (event) => {
        if (event.target && event.target.id === 'theme-toggle') {
            body.classList.toggle('dark-theme');

            // Sauvegarder le choix dans le localStorage
            if (body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        }
    });

    // 2. COMMITS 6 & 7 : NAVBAR DYNAMIQUE, ANIMATIONS FADE-IN & RETOUR EN HAUT
    const navbar = document.querySelector('.navbar');
    const backToTopBtn = document.getElementById('back-to-top');

    // Flag pour bloquer la répétition de l'animation des chiffres
    let countersAnimated = false;

    // Écouteur unique du défilement (Scroll)
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        const windowHeight = window.innerHeight;

        // A. Gestion de la Navbar (Commit 6)
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

        // D. Déclenchement des Compteurs Numériques (Commit 7)
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

    // Action au clic sur le bouton retour en haut (Commit 7)
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Algorithme de calcul des compteurs (Intervalle temporel)
    function animateL1Counter(counter) {
        const target = parseInt(counter.getAttribute('data-target'), 10);
        let current = 0;
        const step = Math.ceil(target / 40);

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                counter.innerText = target + (target > 100 ? '+' : '');
                clearInterval(timer);
            } else {
                counter.innerText = current + (target > 100 ? '+' : '');
            }
        }, 30);
    }

    // 3. COMMIT 8 : FILTRAGE DYNAMIQUE DU CATALOGUE
    const allCards = document.querySelectorAll('main .row .col-md-4');
    const catalogueTitle = document.querySelector('main h1.text-center');
    
    if (catalogueTitle && allCards.length > 0) {
        const filterContainer = document.createElement('div');
        filterContainer.className = 'text-center mb-5';
        filterContainer.innerHTML = `
            <button class="btn btn-primary js-filter mx-1" data-type="all">Tous</button>
            <button class="btn btn-outline-primary js-filter mx-1" data-type="Full Stack">Développement</button>
            <button class="btn btn-outline-primary js-filter mx-1" data-type="Designer">Design</button>
            <button class="btn btn-outline-primary js-filter mx-1" data-type="marketing">Marketing</button>
        `;
        catalogueTitle.after(filterContainer);

        const filterButtons = document.querySelectorAll('.js-filter');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetType = button.getAttribute('data-type');

                allCards.forEach(card => {
                    const cardText = card.innerText.toLowerCase();
                    if (targetType === 'all' || cardText.includes(targetType.toLowerCase())) {
                        card.style.style.display = 'block';
                    } else {
                        card.style.style.display = 'none';
                    }
                });

                filterButtons.forEach(btn => btn.className = 'btn btn-outline-primary js-filter mx-1');
                button.className = 'btn btn-primary js-filter mx-1';
            });
        });
    }

    // 4. VALIDATION SÉCURISÉE DU FORMULAIRE DE CONTACT
    const formElement = document.querySelector('main form');
    
    if (formElement) {
        const emailField = formElement.querySelector('input[type="email"]');
        const textField = formElement.querySelector('textarea');
        
        const alertBox = document.createElement('div');
        alertBox.className = 'mt-3 mb-3';
        formElement.appendChild(alertBox);

        formElement.addEventListener('submit', (event) => {
            event.preventDefault(); // Bloque le rechargement natif de la page
            
            let errorList = [];
            alertBox.innerHTML = '';

            // Algorithme de vérification d'email (Regex standard)
            const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailField && !reg.test(emailField.value.trim())) {
                errorList.push("Veuillez saisir une adresse email valide.");
            }

            // Validation de la longueur du message (Critère obligatoire de 20 caractères)
            if (textField && textField.value.trim().length < 20) {
                errorList.push("Votre message doit contenir au moins 20 caractères.");
            }

            // RECONSTITUTION DES BLOCS MANQUANTS DU CODE PRÉCÉDENT
            if (errorList.length > 0) {
                alertBox.innerHTML = `<div class="alert alert-danger">${errorList.join('<br>')}</div>`;
            } else {
                alertBox.innerHTML = '<div class="alert alert-success">Message validé et transmis avec succès !</div>';
                formElement.reset(); // Réinitialise les champs en cas de succès
            }
        });
    }

});
