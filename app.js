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

window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 500);
    }, 1000); // Shows logo for 1 second
});



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

/* --- SCROLL REVEAL LOGIC --- */
const scrollReveal = () => {
    // This finds every element with the 'reveal' class
    const revealElements = document.querySelectorAll('.reveal');
    
    revealElements.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 150; // How many pixels until it triggers

        if (elementTop < windowHeight - elementVisible) {
            el.classList.add('active');
        }
    });
};

// Listen for scrolling
window.addEventListener('scroll', scrollReveal);

// Run once on load in case cards are already in view
window.addEventListener('load', scrollReveal);

const backToTopBtn = document.getElementById('backToTop');

// Only run this if the button actually exists on the page
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* --- ORDER FORM SUBMISSION --- */
const orderForm = document.querySelector('.modal-content form');

if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevents the page from refreshing

        // 1. Change button text to show progress
        const submitBtn = orderForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerText;
        submitBtn.innerText = "Processing...";
        submitBtn.disabled = true;

        // 2. Simulate a "Save" delay
        setTimeout(() => {
            alert("Order Confirmed! Thank you for your purchase.");
            
            // 3. Reset and Close
            orderForm.reset();
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
            
            const modal = document.getElementById('modalOverlay');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }, 1500); 
    });
}

/* --- AUTH FORMS SUBMISSION --- */
// We don't use 'const' here because they were already declared at the top of the file
// Just use the IDs directly to be safe
const currentLoginForm = document.getElementById('form-login');
const currentSignupForm = document.getElementById('form-signup');

if (currentLoginForm) {
    currentLoginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert("Login Successful!");
        document.getElementById('authOverlay').classList.remove('is-visible');
    });
}

if (currentSignupForm) {
    currentSignupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert("Account Created!");
    });
}
/* --- AUTH FORM SUBMISSION HANDLERS --- */

// Handle Login Button Click
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Stop page refresh
        
        alert("Login Successful! Scrolling restored.");

        // 1. Hide the modal
        authOverlay.classList.remove('is-visible');

        // 2. FIX SCROLLING: Bring the scrollbar back
        document.body.style.overflow = 'auto';
        
        loginForm.reset();
    });
}

// Handle Register Button Click
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Stop page refresh
        
        alert("Account Created! Now you can log in.");

        // Switch to the Login Tab automatically
        loginTab.click(); 
        
        // Safety: ensure scrolling works if you decide to close it here
        // document.body.style.overflow = 'auto';
    });
}
