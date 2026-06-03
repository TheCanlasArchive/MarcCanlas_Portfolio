/* =========================================
   GLOBAL SETTINGS
========================================= */
if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

window.addEventListener("load", () => {
    // If the URL has a hash, scroll to that section instead of the top
    if (window.location.hash) {
        const target = document.getElementById(window.location.hash.slice(1));
        if (target) {
            setTimeout(() => {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
            return;
        }
    }
    window.scrollTo(0, 0);
});

// Initialize Lucide icons
if (window.lucide) {
    lucide.createIcons();
}


/* =========================================
   DOM READY
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    pageFadeIn();
    navbarSwitch();
    mobileMenu();
    modalControl();
    typingEffect();
    projectSlider();
    scrollParallax();
    initTestimonials();
    setupForms();

});


/* =========================================
   UI EFFECTS
========================================= */

function pageFadeIn() {
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 1s ease-in";
    setTimeout(() => {
        document.body.style.opacity = "1";
    }, 100);
}

function navbarSwitch() {
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach(item => {
        item.addEventListener("click", function () {
            navItems.forEach(nav => nav.classList.remove("active"));
            this.classList.add("active");
        });
    });
}

function mobileMenu() {
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");
    const overlay = document.getElementById("mobile-overlay");

    if (!hamburger || !navLinks || !overlay) return;

    const toggleMenu = () => {
        hamburger.classList.toggle("active");
        navLinks.classList.toggle("active");
        overlay.classList.toggle("active");
    };

    hamburger.addEventListener("click", toggleMenu);
    overlay.addEventListener("click", toggleMenu);
}

function modalControl() {
    const modal = document.getElementById("modal");
    const openBtn = document.getElementById("openModal");
    const closeBtn = document.getElementById("closeModal");

    if (!modal || !openBtn || !closeBtn) return;

    const closeModal = () => modal.classList.remove("active");

    openBtn.addEventListener("click", () => modal.classList.add("active"));
    closeBtn.addEventListener("click", closeModal);

    window.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal();
    });
}



/* =========================================
   Smooth Animation Through Section
========================================= */
document.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        // Only intercept pure hash links that point to an element on THIS page
        // e.g. "#portfolio" — not "index.html#portfolio", not "#" alone
        if (!href || !href.startsWith('#') || href === '#') return;

        const targetID = href.slice(1);
        const targetSection = document.getElementById(targetID);

        // If the element doesn't exist on this page, let the browser navigate normally
        if (!targetSection) return;

        e.preventDefault();

        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

        const mobileOverlay = document.getElementById('mobile-overlay');
        const hamburger = document.getElementById('hamburger');
        if (mobileOverlay && mobileOverlay.classList.contains('active')) {
            mobileOverlay.classList.remove('active');
            if (hamburger) hamburger.classList.remove('open');
        }
    });
});


/* =========================================
   Footer Scroll Up Animation
========================================= */
const scrollTopBtn = document.getElementById('scrollTopBtn');

if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const scrollDuration = 600; 
        const start = window.scrollY;
        const startTime = performance.now();

        function scrollStep(currentTime) {
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / scrollDuration, 1);

            const ease = progress < 0.5 
                ? 2 * progress * progress 
                : -1 + (4 - 2 * progress) * progress;

            window.scrollTo(0, start * (1 - ease));

            if (progress < 1) {
                requestAnimationFrame(scrollStep);
            }
        }

        requestAnimationFrame(scrollStep);
    });
}


/* =========================================
   FORMS (Reusable)
========================================= */

function setupForms() {
    handleForm(
        "contactFormMain",
        "formStatus",
        "https://formspree.io/f/xjgejvbk"
    );

    handleForm(
        "internshipForm",
        "modalStatus",
        "https://formspree.io/f/mvzbdozl"
    );
}

function handleForm(formId, statusId, endpoint) {
    const form = document.getElementById(formId);
    const status = document.getElementById(statusId);

    if (!form || !status) return;

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const data = new FormData(form);
        status.style.color = "white";
        status.textContent = "Sending...";

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                body: data,
                headers: { Accept: "application/json" }
            });

            if (response.ok) {
                status.style.color = "limegreen";
                status.textContent = "✅ Message sent successfully!";
                form.reset();
            } else {
                throw new Error();
            }
        } catch {
            status.style.color = "red";
            status.textContent = "❌ Something went wrong. Please try again.";
        }
    });
}

/* =========================================
   COPY EMAIL
========================================= */

function copyEmail() {
    const email = "m4canlas@gmail.com";

    navigator.clipboard.writeText(email).then(() => {
        alert("Email copied to clipboard!");
    }).catch(() => {
        alert("Failed to copy email.");
    });
}


/* =========================================
   HERO EFFECTS
========================================= */

function scrollParallax() {
    const hero = document.querySelector("#home");
    if (!hero) return;

    window.addEventListener("scroll", () => {
        const progress = Math.min(1, window.scrollY / hero.offsetHeight);

        document.documentElement.style.setProperty(
            "--orange-strong",
            0.40 * (1 - progress)
        );

        document.documentElement.style.setProperty(
            "--orange-soft",
            0.30 * (1 - progress)
        );
    });
}

function typingEffect() {
    const typingElement = document.getElementById("typing-text");
    if (!typingElement) return;

    const words = [
        "Junior Frontend Developer",
        "UI/UX Designer",
        "Creative Web Designer",
        "Interface Developer"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];

        if (!isDeleting) {
            typingElement.textContent = currentWord.slice(0, ++charIndex);
            if (charIndex === currentWord.length) {
                setTimeout(() => (isDeleting = true), 1500);
            }
        } else {
            typingElement.textContent = currentWord.slice(0, --charIndex);
            if (charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }
        }

        setTimeout(type, isDeleting ? 50 : 80);
    }

    type();
}


/* =========================================
   PROJECT SLIDER
========================================= */

function projectSlider() {
    const imageElement = document.getElementById("project-preview");
    const titleElement = document.getElementById("project-title");
    const linkElement = document.getElementById("project-link");

    if (!imageElement || !titleElement || !linkElement) return;

    const projects = [
        {
            image: "img/aurumelle_img/aurumelle_pastries.png",
            title: "Aurumelle Pastries",
            link: "https://aurumelle-pastries.infinityfreeapp.com/login.php"
        },
        {
            image: "img/singku_img/singku_inspired_website.png",
            title: "Singku Inspired Website",
            link: "https://marc-wd.github.io/MidtermProj_Major-Pages/#home"
        },
        {
            image: "img/bossrich_img/bossrich.png",
            title: "Bossrich",
            link: "https://bossrichphoto.pro/"
        },
        {
            image: "img/panlasa_trip/panlasatrip_website.png",
            title: "Panlasa Trip",
            link: "https://panlasatrip.wordpress.com/"
        },
        {
            image: "img/payastreet_img/payastreet.png",
            title: "PayaStreet",
            link: "https://paya-street-website.netlify.app/"
        }
    ];

    let currentIndex = 0;

    function switchProject() {
        imageElement.style.opacity = "0";
        imageElement.style.transform = "scale(0.97)";

        setTimeout(() => {
            currentIndex = (currentIndex + 1) % projects.length;
            const project = projects[currentIndex];

            imageElement.src = project.image;
            titleElement.textContent = project.title;
            linkElement.href = project.link;

            imageElement.style.opacity = "1";
            imageElement.style.transform = "scale(1)";
        }, 400);
    }

    imageElement.src = projects[0].image;
    titleElement.textContent = projects[0].title;
    linkElement.href = projects[0].link;

    setInterval(switchProject, 5000);
}


/* =========================================
   MARQUEE
========================================= */

function initTestimonials() {
    const tracks = document.querySelectorAll(".marquee-track");

    tracks.forEach(track => {
        if (!track.classList.contains("cloned")) {
            track.insertAdjacentHTML("beforeend", track.innerHTML);
            track.classList.add("cloned");
        }
    });
}

document.addEventListener("DOMContentLoaded", initTestimonials);


/* =========================================
   GLOBAL FUNCTIONS
========================================= */

function toggleBento(element) {
    element.classList.toggle("active");
}


/* =========================================
   HOVER SCREEN (PROJECT SECTION)
========================================= */
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const targetId = card.getAttribute('data-img');
        
        document.querySelectorAll('.bg-img').forEach(img => {
            img.classList.remove('active');
        });
        const targetImg = document.getElementById(targetId);
        if (targetImg) targetImg.classList.add('active');
        
        document.querySelectorAll('.project-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
    });
});


/* =========================================
   PREV & NEXT BUTTON 
========================================= */
document.addEventListener('DOMContentLoaded', () => {
    const batches = document.querySelectorAll('.project-batch');
    const nextBtn = document.getElementById('nextProj');
    const prevBtn = document.getElementById('prevProj');
    const allCards = document.querySelectorAll('.project-card');
    const allImages = document.querySelectorAll('.bg-img');

    let currentBatchIndex = 0;

    function updateBatchDisplay(index) {

        if (index >= batches.length) currentBatchIndex = 0;
        else if (index < 0) currentBatchIndex = batches.length - 1;
        else currentBatchIndex = index;

        batches.forEach((batch, i) => {
            batch.classList.toggle('active', i === currentBatchIndex);
        });

        const firstCardInBatch = batches[currentBatchIndex].querySelector('.project-card');
        if (firstCardInBatch) {
            triggerProjectChange(firstCardInBatch);
        }
    }

    function triggerProjectChange(card) {

        allCards.forEach(c => c.classList.remove('active'));
        allImages.forEach(img => img.classList.remove('active'));

        card.classList.add('active');

        const imgId = card.getAttribute('data-img');
        const targetImg = document.getElementById(imgId);
        if (targetImg) targetImg.classList.add('active');
    }

    // Button Listeners
    if (nextBtn) nextBtn.addEventListener('click', () => updateBatchDisplay(currentBatchIndex + 1));
    if (prevBtn) prevBtn.addEventListener('click', () => updateBatchDisplay(currentBatchIndex - 1));

    // Card Listeners 
    allCards.forEach(card => {
        card.addEventListener('click', () => triggerProjectChange(card));
    });
});


/* =========================================
   CURSOR INTERACTION
========================================= */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('follower');

if (cursor && follower) {
    window.addEventListener('mousemove', e => {
        const {clientX:x, clientY:y} = e;
        cursor.style.left = x+'px';
        cursor.style.top = y+'px';
        follower.style.transform = `translate(${x-20}px, ${y-20}px)`;
        const xPct = (x/window.innerWidth)*100;
        const yPct = (y/window.innerHeight)*100;
        document.documentElement.style.setProperty('--mouse-x', xPct+'%');
        document.documentElement.style.setProperty('--mouse-y', yPct+'%');
    });

    // HOVER SCALE
    document.querySelectorAll('.btn, .back-btn, .btn-cv, .btn-projects, .stat-arrow, .nav-item, #openModal, .btn-modern, .editorial-btn, .manifest-anchor, .m-ctrl-btn, .p-titles, .nav-btn, .footer-socials, .footer-nav').forEach(el=>{
        el.addEventListener('mouseenter', ()=>{ cursor.style.transform='scale(4)'; cursor.style.opacity='0.2'; });
        el.addEventListener('mouseleave', ()=>{ cursor.style.transform='scale(1)'; cursor.style.opacity='1'; });
    });
}