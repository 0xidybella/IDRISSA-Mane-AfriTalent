document.addEventListener('DOMContentLoaded', () => {


/* GESTION DU DARK MODE PERSISTANT */
const body = document.body;
const themeToggle = document.getElementById('theme-toggle');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
    if (themeToggle) themeToggle.checked = true;
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
//* NAVBAR DYNAMIQUE AU SCROLL *//
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if(window.scrollY > 50) {
        //* si oon descend de plus de 50px, on ajoute une classe de scroll *//
        navbar.classList.add('navbar-scrolled');
    } else {
        // * Sinon, on remet la navbar a son etat initial *//
        navbar.classList.remove('navbar-scrolled');
    }
});
});

