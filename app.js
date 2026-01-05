/* --- 1. NAVBAR & SIDEBAR LOGIC --- */
const nav = document.querySelector('.navbar');
const sidebar = document.getElementById('sidebarOverlay');
const openBtn = document.getElementById('myMenu'); 
const closeBtnMobile = document.getElementById('menuClose');

window.addEventListener('scroll', () => {
    if (nav) {
        window.scrollY > 50 ? nav.classList.add('shrunk') : nav.classList.remove('shrunk');
    }
});

if (openBtn && sidebar) {
    openBtn.addEventListener('click', () => {
        sidebar.classList.add('active');
    });
}

const handleSidebarClose = () => {
    if (sidebar) sidebar.classList.remove('active');
};

if (closeBtnMobile) closeBtnMobile.addEventListener('click', handleSidebarClose);

/* --- 2. ORDER MODAL LOGIC (FIXED CLOSE BUTTON) --- */
const orderModal = document.getElementById('modalOverlay');
const orderCloseBtn = document.getElementById('closeBtn'); // FIX: Targets ID instead of Class
const allOrderButtons = document.querySelectorAll('.explore-btn');

if (orderModal) {
    allOrderButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            orderModal.classList.add('active');
            document.body.style.overflow = 'hidden'; 
        });
    });
}

const closeOrderModal = () => {
    if (orderModal) {
        orderModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
};



if (orderCloseBtn) orderCloseBtn.addEventListener('click', closeOrderModal);

/* --- 3. AUTH (LOGIN/SIGNUP) MODAL LOGIC --- */
const authOverlay = document.getElementById('authOverlay');
const authClose = document.getElementById('authClose');
const authTrigger = document.getElementById('authTrigger');
const authTriggerMobile = document.getElementById('authTriggerMobile');
const loginTab = document.getElementById('tab-login');
const signupTab = document.getElementById('tab-signup');
const loginForm = document.getElementById('form-login');
const signupForm = document.getElementById('form-signup');

const openAuth = () => {
    authOverlay.classList.add('is-visible');
    handleSidebarClose(); // Close sidebar if it's open
    document.body.style.overflow = 'hidden';
};

const closeAuth = () => {
    authOverlay.classList.remove('is-visible');
    document.body.style.overflow = 'auto';
};

if (authTrigger) authTrigger.addEventListener('click', openAuth);
if (authTriggerMobile) authTriggerMobile.addEventListener('click', openAuth);
if (authClose) authClose.addEventListener('click', closeAuth);

// Tab Switching
loginTab.addEventListener('click', () => {
    loginTab.classList.add('active');
    signupTab.classList.remove('active');
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
});

signupTab.addEventListener('click', () => {
    signupTab.classList.add('active');
    loginTab.classList.remove('active');
    signupForm.style.display = 'block';
    loginForm.style.display = 'none';
});

/* --- 4. SEARCH & COUNTER LOGIC --- */
const searchInput = document.querySelector('.search-input');
const featuredSection = document.getElementById('featured');
const cards = document.querySelectorAll('.card');

if (searchInput) {
    searchInput.addEventListener('focus', () => {
        featuredSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    searchInput.addEventListener('input', (e) => {
        const value = e.target.value.toLowerCase();
        cards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const container = card.closest('.card-container');
            container.style.display = title.includes(value) ? "block" : "none";
        });
    });
}

// Global click-to-close for overlays
window.addEventListener('click', (e) => {
    if (e.target === orderModal) closeOrderModal();
    if (e.target === authOverlay) closeAuth();
    if (e.target === sidebar) handleSidebarClose();
});

/* --- COUNTER ANIMATION --- */
// Using unique names to avoid "already been identified" errors
const mangaCounterEl = document.querySelector('.count');
const animationSpeed = 200; 

const startCounting = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const updateNumbers = () => {
                const targetValue = +mangaCounterEl.getAttribute('data-target');
                const currentValue = +mangaCounterEl.innerText.replace(/,/g, ''); 
                const incrementValue = targetValue / animationSpeed;

                if (currentValue < targetValue) {
                    mangaCounterEl.innerText = Math.ceil(currentValue + incrementValue).toLocaleString();
                    setTimeout(updateNumbers, 15);
                } else {
                    mangaCounterEl.innerText = targetValue.toLocaleString();
                }
            };
            updateNumbers();
            observer.unobserve(entry.target);
        }
    });
};

// Lower threshold to 0.5 so it triggers more reliably on mobile
const mangaObserver = new IntersectionObserver(startCounting, { threshold: 0.5 });

if (mangaCounterEl) {
    mangaObserver.observe(mangaCounterEl);
}

/* --- HERO BUTTON SCROLL LOGIC --- */
const heroBtn = document.getElementById('hero-button');
const featuredSect = document.getElementById('featured');

if (heroBtn && featuredSect) {
    heroBtn.addEventListener('click', () => {
        featuredSect.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    });
}