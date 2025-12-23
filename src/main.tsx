import './style.css'

// Configuration des étoiles
const STAR_COUNT = 150;
const spaceContainer = document.getElementById('space-background');

interface StarElement extends HTMLDivElement {
  speed: number;
}

function createStars() {
  // Si cette ligne s'arrête ici, c'est que l'ID "space-background" 
  // n'est pas présent dans ton index.html
  if (!spaceContainer) {
    console.error("Le conteneur #space-background est introuvable !");
    return;
  }

  for (let i = 0; i < STAR_COUNT; i++) {
    const star = document.createElement('div') as unknown as StarElement;
    star.classList.add('star');
    
    // Position aléatoire
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    
    // Taille aléatoire (effet de distance)
    const size = Math.random() * 2; 
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${x}%`;
    star.style.top = `${y}%`;
    
    // --- MODIFICATION ICI ---
    // Force l'étoile à être au premier plan du fond étoilé
    star.style.zIndex = "1"; 
    // ------------------------

    // Vitesse de parallaxe basée sur la taille
    star.speed = size * 0.2; 

    spaceContainer.appendChild(star);
  }
}

function handleScroll() {
  const scrollY = window.scrollY;
  const stars = document.querySelectorAll('.star');

  stars.forEach((s) => {
    const star = s as unknown as StarElement;
    // Utilisation de translate3d pour de meilleures performances (GPU)
    star.style.transform = `translate3d(0, ${scrollY * star.speed}px, 0)`;
  });
}

// Initialisation
createStars();
window.addEventListener('scroll', handleScroll);

console.log("Système spatial initialisé.");