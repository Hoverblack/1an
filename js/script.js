
const CONFIG = {
    heartCount: 25,
    fallSpeed: 350,
    colors: ['#ff4d6d', '#ff758c', '#ff8fab', '#ffb3c6'],
    messages: ["Je t'aime", "Pour toi", "Mon cœur", "Ma chérie"]
};


document.addEventListener('DOMContentLoaded', function() {

    createLightbox();
    

    initHearts();
    initImages();
    animateSections();
});



function createLightbox() {

    if (!document.getElementById('lightbox')) {
        const lightboxHTML = `
        <div id="lightbox" class="lightbox hidden">
            <span class="close-lightbox">&times;</span>
            <img id="lightbox-img" class="lightbox-content">
            <div id="lightbox-caption" class="lightbox-caption"></div>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
        

        document.getElementById('lightbox').addEventListener('click', function(e) {
            if (e.target === this || e.target.classList.contains('close-lightbox')) {
                closeLightbox();
            }
        });
    }
}

function openLightbox(imgSrc, caption) {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    const cap = document.getElementById('lightbox-caption');
    
    img.src = imgSrc;
    cap.textContent = caption;
    lightbox.classList.remove('hidden');
    

    img.onclick = function(e) {
        e.stopPropagation();
    };
}

function closeLightbox() {
    document.getElementById('lightbox').classList.add('hidden');
}



function initImages() {

    document.querySelectorAll('.photo-frame, .polaroid').forEach(frame => {
        const img = frame.querySelector('img');
        const caption = frame.querySelector('.caption, p')?.textContent || '';
        
        frame.style.cursor = 'pointer';
        frame.addEventListener('click', function(e) {

            if (e.target === this || e.target === img) {
                openLightbox(img.src, caption);
            }
        });
    });
}



function initHearts() {
    createFloatingHearts();
    startFallingHearts();
}

function createFloatingHearts() {
    const container = document.querySelector('.floating-hearts');
    
    for (let i = 0; i < CONFIG.heartCount; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤️';
        
 
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.top = `${Math.random() * 100}%`;
        heart.style.fontSize = `${Math.random() * 20 + 20}px`;
        heart.style.color = getRandomColor();
        heart.style.animation = `float ${Math.random() * 8 + 4}s ease-in-out ${Math.random() * 3}s infinite`;

        heart.addEventListener('click', function(e) {
            showLoveMessage(e.clientX, e.clientY);
            animateHeart(heart);
            e.stopPropagation();
        });
        
        container.appendChild(heart);
    }
}

function startFallingHearts() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'falling-heart';
        heart.innerHTML = '❤️';
        
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.fontSize = `${Math.random() * 15 + 15}px`;
        heart.style.color = getRandomColor();
        heart.style.animation = `falling ${Math.random() * 3 + 2}s linear forwards`;
        
        document.body.appendChild(heart);
        
        setTimeout(() => heart.remove(), (Math.random() * 3 + 2) * 1000);
    }, CONFIG.fallSpeed);
}

function showLoveMessage(x, y) {
    const message = document.createElement('div');
    message.className = 'love-message';
    message.textContent = getRandomMessage();
    message.style.left = `${x}px`;
    message.style.top = `${y}px`;
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.classList.add('show');
        setTimeout(() => {
            message.classList.remove('show');
            setTimeout(() => message.remove(), 300);
        }, 1500);
    }, 10);
}

function animateHeart(heart) {
    heart.style.transform = 'scale(1.5)';
    setTimeout(() => heart.style.transform = '', 300);
}



function animateSections() {
    document.querySelectorAll('.fade-in').forEach((section, index) => {
        section.style.animationDelay = `${index * 0.2}s`;
    });
}



function getRandomColor() {
    return CONFIG.colors[Math.floor(Math.random() * CONFIG.colors.length)];
}

function getRandomMessage() {
    return CONFIG.messages[Math.floor(Math.random() * CONFIG.messages.length)];
}



const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    /* Cœurs flottants */
    .heart {
        position: absolute;
        pointer-events: auto;
        cursor: pointer;
        z-index: 100;
        user-select: none;
        transition: transform 0.3s;
    }
    
    @keyframes float {
        0% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(5deg); }
        100% { transform: translateY(0) rotate(0deg); }
    }
    
    /* Cœurs tombants */
    .falling-heart {
        position: fixed;
        top: -50px;
        pointer-events: none;
        z-index: 50;
    }
    
    @keyframes falling {
        0% { transform: translateY(-50px) rotate(0deg); opacity: 1; }
        100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
    }
    
    /* Messages d'amour */
    .love-message {
        position: fixed;
        transform: translate(-50%, -50%);
        background: rgba(255, 77, 109, 0.9);
        color: white;
        padding: 10px 20px;
        border-radius: 50px;
        font-size: 1.2rem;
        font-family: 'Dancing Script', cursive;
        z-index: 1000;
        opacity: 0;
        transition: all 0.3s;
        pointer-events: none;
    }
    
    .love-message.show {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1.1);
    }
    
    /* Lightbox */
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s;
    }
    
    .lightbox:not(.hidden) {
        opacity: 1;
        pointer-events: auto;
    }
    
    .lightbox-content {
        max-width: 90%;
        max-height: 80vh;
        object-fit: contain;
    }
    
    .lightbox-caption {
        position: absolute;
        bottom: 20px;
        color: white;
        font-size: 1.2rem;
        text-align: center;
    }
    
    .close-lightbox {
        position: absolute;
        top: 20px;
        right: 30px;
        color: white;
        font-size: 30px;
        cursor: pointer;
    }
    
    /* Permet la sélection de texte */
    body {
        user-select: text;
    }
    
    /* Cadres images */
    .photo-frame, .polaroid {
        cursor: pointer;
        transition: transform 0.3s;
    }
    
    .photo-frame:hover, .polaroid:hover {
        transform: scale(1.02);
    }
`;
document.head.appendChild(dynamicStyles);