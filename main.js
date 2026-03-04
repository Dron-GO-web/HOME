async function loadContent() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        
        renderServices(data.services);
        renderFeatures(data.features);
        renderPortfolio(data.portfolio);
        renderTestimonials(data.testimonials);
        
        lucide.createIcons();
        initAnimations();
    } catch (error) {
        console.error("Error loading content:", error);
    }
}

function renderServices(services) {
    const container = document.getElementById('services-grid');
    container.innerHTML = services.map(s => `
        <div class="service-card bg-slate-900 border border-slate-800 p-8 rounded-2xl">
            <div class="w-12 h-12 rounded-xl bg-brand-900/50 flex items-center justify-center text-brand-500 mb-6">
                <i data-lucide="${s.icon}" class="w-6 h-6"></i>
            </div>
            <h4 class="text-xl font-semibold text-white mb-3">${s.title}</h4>
            <p class="text-slate-400 text-sm leading-relaxed">${s.desc}</p>
        </div>
    `).join('');
}

function renderFeatures(features) {
    const container = document.getElementById('features-grid');
    container.innerHTML = features.map(f => `
        <div class="flex items-start gap-4">
            <div class="text-brand-500 flex-shrink-0 mt-1">
                <i data-lucide="${f.icon}" class="w-6 h-6"></i>
            </div>
            <div>
                <h4 class="text-white font-medium mb-1">${f.title}</h4>
                <p class="text-slate-400 text-sm">${f.desc}</p>
            </div>
        </div>
    `).join('');
}

function renderPortfolio(items) {
    const container = document.getElementById('portfolio-grid');
    container.innerHTML = items.map(item => `
        <div class="portfolio-item group relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 cursor-pointer" 
             onclick="openModal('${item.video || ''}')">
            <img src="${item.img}" alt="${item.title}" class="w-full h-full object-cover">
            <div class="overlay absolute inset-0 flex flex-col justify-end p-6">
                <div class="w-12 h-12 rounded-full bg-brand-500 text-white flex items-center justify-center mb-4 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                    <i data-lucide="play" class="w-5 h-5 ml-1"></i>
                </div>
                <h4 class="text-white font-semibold text-xl mb-1">${item.title}</h4>
                <p class="text-brand-400 text-sm font-medium">${item.category}</p>
            </div>
        </div>
    `).join('');
    
    lucide.createIcons();
}

    document.querySelectorAll('.portfolio-item').forEach(el => {
        el.addEventListener('click', openModal);
    });
}

function renderTestimonials(testimonials) {
    const container = document.getElementById('testimonials-grid');
    container.innerHTML = testimonials.map(t => `
        <div class="bg-slate-900 border border-slate-800 p-8 rounded-2xl relative">
            <i data-lucide="quote" class="absolute top-8 right-8 w-8 h-8 text-slate-800"></i>
            <div class="flex text-yellow-400 mb-6">
                <i data-lucide="star" class="w-4 h-4 fill-current"></i>
                <i data-lucide="star" class="w-4 h-4 fill-current"></i>
                <i data-lucide="star" class="w-4 h-4 fill-current"></i>
                <i data-lucide="star" class="w-4 h-4 fill-current"></i>
                <i data-lucide="star" class="w-4 h-4 fill-current"></i>
            </div>
            <p class="text-slate-300 italic mb-6">"${t.text}"</p>
            <div>
                <h4 class="text-white font-medium">${t.name}</h4>
                <p class="text-slate-500 text-sm">${t.role}</p>
            </div>
        </div>
    `).join('');
}

function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.utils.toArray('.gs-reveal').forEach(function(elem) {
        gsap.fromTo(elem, 
            { y: 50, opacity: 0 }, 
            { 
                y: 0, 
                opacity: 1, 
                duration: 1, 
                ease: "power3.out",
                scrollTrigger: {
                    trigger: elem,
                    start: "top 85%",
                }
            }
        );
    });
}

function initNavbar() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-lg');
            navbar.style.background = 'rgba(2, 6, 23, 0.85)';
        } else {
            navbar.classList.remove('shadow-lg');
            navbar.style.background = 'rgba(2, 6, 23, 0.6)';
        }
    });
}

const modal = document.getElementById('video-modal');
const closeBtn = document.getElementById('close-modal');

function openModal() {
    modal.classList.remove('opacity-0', 'pointer-events-none');
    document.body.style.overflow = 'hidden';
}

function openModal(videoId) {
    const modal = document.getElementById('video-modal');
    // Seleccionamos el contenedor donde están las letras que quieres quitar
    const container = modal.querySelector('.aspect-video div'); 
    
    if (videoId && container) {
        // Esto borra las letras y mete el vídeo directamente
        container.innerHTML = `
            <iframe 
                class="w-full h-full rounded-xl" 
                src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>`;
    }

    modal.classList.remove('opacity-0', 'pointer-events-none');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('video-modal');
    modal.classList.add('opacity-0', 'pointer-events-none');
    document.body.style.overflow = '';
    
    // IMPORTANTE: Limpiamos el vídeo al cerrar para que no siga sonando
    const container = modal.querySelector('.aspect-video div');
    if (container) container.innerHTML = '<p class="text-slate-500">Cargando...</p>';
}

// Configurar los botones de cierre
document.getElementById('close-modal')?.addEventListener('click', closeModal);
document.getElementById('video-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'video-modal') closeModal();
});

document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();

    // Referencia al botón para efectos visuales
    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    
    // Capturar datos del formulario
    const nombre = document.getElementById('nombre').value;
    const tlf = document.getElementById('telefono').value;
    const email = document.getElementById('email').value;
    const proyecto = document.getElementById('proyecto').value;
    const mensaje = document.getElementById('mensaje').value;

    // Tu número de teléfono
    const miTelefono = "620611249";

    // Construir el mensaje para WhatsApp
    const texto = `Hola Dron-GO! 🚁%0A%0A*Nueva Solicitud de Presupuesto*%0A%0A` +
                  `👤 *Nombre:* ${nombre}%0A` +
                  `📞 *Teléfono:* ${tlf}%0A` +
                  `📧 *Email:* ${email}%0A` +
                  `🛠️ *Proyecto:* ${proyecto}%0A` +
                  `💬 *Mensaje:* ${mensaje}`;

    // Efecto visual en el botón
    btn.innerHTML = 'Enviando...';
    btn.disabled = true;

    setTimeout(() => {
        // Abrir WhatsApp en una nueva pestaña
        window.open(`https://wa.me/${miTelefono}?text=${texto}`, '_blank');
        
        // Restaurar botón y limpiar formulario
        btn.innerHTML = '¡Solicitud Abierta!';
        btn.classList.add('bg-green-500', 'text-white');
        e.target.reset();

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
            btn.classList.remove('bg-green-500', 'text-white');
        }, 3000);
    }, 1000);
});

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initNavbar();
    loadContent();
});
