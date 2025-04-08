// Menú hamburguesa para dispositivos móviles
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('open');
        hamburger.classList.toggle('active');
    });
    
    // Cerrar menú al hacer clic en un enlace
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('open');
            hamburger.classList.remove('active');
        });
    });
    
    // Destacar la sección activa en el menú al hacer scroll
    const sections = document.querySelectorAll('.section');
    const navLinksArray = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if(pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksArray.forEach(link => {
            link.classList.remove('active');
            if(link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
        
        // Cambiar estilo del header al hacer scroll
        const header = document.querySelector('header');
        header.classList.toggle('scrolled', window.scrollY > 100);
        
        // Mostrar/ocultar botón volver arriba
        const backToTop = document.querySelector('.back-to-top');
        if (backToTop) {
            backToTop.classList.toggle('show', window.scrollY > 500);
        }
    });
    
    // Animación suave al hacer clic en los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Inicializar animaciones para elementos al hacer scroll
    animateOnScroll();
    
    // Agregar el botón volver arriba si no existe
    if (!document.querySelector('.back-to-top')) {
        const backToTopButton = document.createElement('div');
        backToTopButton.className = 'back-to-top';
        backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(backToTopButton);
        
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// Función para animar elementos al hacer scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.timeline-item, .education-item, .cert-item, .seminar-item, .info-card, .service-item, .skills-column, .soft-skill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Agregar estilos adicionales dinámicamente para la responsividad
const style = document.createElement('style');
style.innerHTML = `
    @media (max-width: 992px) {
        .profile {
            grid-template-columns: 1fr;
            text-align: center;
        }
        
        .profile-content p {
            margin: 0 auto 30px auto;
        }
        
        .social-links {
            justify-content: center;
        }
        
        .cta-buttons {
            justify-content: center;
        }
        
        .section {
            padding: 80px 0;
        }
    }
    
    @media (max-width: 768px) {
        .hamburger {
            display: block;
            z-index: 1001;
        }
        
        .nav-links {
            position: fixed;
            top: 0;
            right: -100%;
            width: 250px;
            height: 100vh;
            background-color: var(--light-color);
            flex-direction: column;
            align-items: center;
            justify-content: center;
            transition: 0.5s;
            box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            display: flex;
        }
        
        .nav-links.open {
            right: 0;
        }
        
        .nav-links li {
            margin: 15px 0;
        }
        
        .hamburger.active .line:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger.active .line:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active .line:nth-child(3) {
            transform: rotate(-45deg) translate(5px, -5px);
        }
        
        .service-item {
            width: 90%;
        }
    }
    
    /* Animaciones */
    .timeline-item, .education-item, .cert-item, .seminar-item, .info-card, .service-item, .skills-column, .soft-skill {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .timeline-item.animate, .education-item.animate, .cert-item.animate, .seminar-item.animate, .info-card.animate, .service-item.animate, .skills-column.animate, .soft-skill.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Botón volver arriba */
    .back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 40px;
        height: 40px;
        background-color: var(--primary-color);
        color: white;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: 0.3s;
        z-index: 999;
    }
    
    .back-to-top.show {
        opacity: 1;
        visibility: visible;
    }
    
    .back-to-top:hover {
        background-color: var(--secondary-color);
    }
    
    /* Estilo del header al hacer scroll */
    header.scrolled {
        background-color: white;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
`;

document.head.appendChild(style);