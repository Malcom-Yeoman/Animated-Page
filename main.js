// Initialisation de Barba.js
barba.init({
    debug: true, // Activation du mode de débogage pour voir les messages dans la console

    // Définition des transitions
    transitions: [{
        name: 'slide-transition', // Nom de la transition

        // Fonction qui détermine comment la page actuelle doit "quitter"
        leave(data) {
            let done = this.async(); // Permet d'indiquer à Barba quand l'animation est terminée

            // Création d'une chronologie d'animation avec GSAP
            let tl = gsap.timeline({
                onComplete: done // Une fois l'animation terminée, appeler la fonction "done"
            });
            
            // Animation de l'image pour qu'elle se déplace vers le haut
            tl.to(data.current.container.querySelector('img'), {
                duration: 1.2,
                y: '-100%',
                ease: "power2.inOut"
            })
            // Animation du contenu textuel pour qu'il se déplace vers le bas. Elle se déclenche en même temps que l'animation de l'image (d'où le ", 0")
            .to(data.current.container.querySelector('.text-content'), {
                duration: 1.2,
                y: '100%',
                ease: "power2.inOut"
            }, 0);
        },

        // Fonction qui détermine comment la nouvelle page doit "entrer"
        enter(data) {
            // Position de départ pour les éléments de la nouvelle page (hors de l'écran)
            gsap.set(data.next.container.querySelector('img'), { y: '100%' });
            gsap.set(data.next.container.querySelector('.text-content'), { y: '-100%' });

            // Animation de l'image pour qu'elle revienne à sa position initiale depuis le bas
            gsap.to(data.next.container.querySelector('img'), {
                duration: 1.2,
                y: '0%',
                ease: "power2.inOut",
                delay: 0.5 // Délai pour attendre que la page actuelle soit totalement sortie
            });

            // Animation du contenu textuel pour qu'il revienne à sa position initiale depuis le haut
            gsap.to(data.next.container.querySelector('.text-content'), {
                duration: 1.2,
                y: '0%',
                ease: "power2.inOut",
                delay: 0.5
            });
        },

        // Fonction déclenchée la première fois que la page est chargée
        once(data) {
            // Animer les éléments pour qu'ils arrivent depuis leurs positions hors écran
            gsap.from(data.next.container.querySelector('img'), {
                duration: 1.2,
                y: '100%',
                ease: "power2.inOut"
            });

            gsap.from(data.next.container.querySelector('.text-content'), {
                duration: 1.2,
                y: '-100%',
                ease: "power2.inOut"
            });
        }
    }]
});