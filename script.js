
document.addEventListener("DOMContentLoaded", () => {
    initNavbar();
    initScrollEffects();
    initSmoothScroll();
});



function initNavbar() {
    const navbar = document.querySelector(".navbar");

    if (!navbar) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });
}



function initScrollEffects() {
    const elements = document.querySelectorAll(
        ".feature, .service, .blog-card, .about-right, .stat"
    );

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    elements.forEach(el => observer.observe(el));
}



function initSmoothScroll() {
    const links = document.querySelectorAll("a[href^='#']");

    links.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
}



function toggleMenu() {
    const nav = document.querySelector(".nav-center");
    nav.classList.toggle("open");
}



function animateCounter(el, start, end, duration) {
    let startTime = null;

    function animate(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        el.textContent = Math.floor(progress * (end - start) + start);

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}

// open popup
function openContact() {
    document.getElementById("contactModal").style.display = "flex";
}

// close popup
function closeContact() {
    document.getElementById("contactModal").style.display = "none";
}

// close when clicking outside
window.addEventListener("click", function(e) {
    const modal = document.getElementById("contactModal");
    if (e.target === modal) {
        modal.style.display = "none";
    }
});


// open service popup
function openService(title, description) {
    document.getElementById("serviceTitle").textContent = title;
    document.getElementById("serviceDesc").textContent = description;
    document.getElementById("serviceModal").style.display = "flex";
}

// close popup
function closeService() {
    document.getElementById("serviceModal").style.display = "none";
}

// close when clicking outside
window.addEventListener("click", function(e) {
    const modal = document.getElementById("serviceModal");
    if (e.target === modal) {
        modal.style.display = "none";
    }
});




/* ================================
   EMAILJS QUERY SUBMIT
================================ */

(function(){
    emailjs.init("YDzW24WiYNn2zN4ub");
})();

const form = document.getElementById("queryForm");
const successBox = document.getElementById("successMessage");

if(form){
form.addEventListener("submit", function(e){
    e.preventDefault();

    emailjs.sendForm(
        "service_j21oc1m",
        "template_ks6b51k",
        this
    ).then(
        () => {
            form.reset();

            /* show success message */
            successBox.style.display = "block";

            /* optional: hide form */
            form.style.display = "none";
        },
        (error) => {
            alert("Failed to send query. Try again.");
            console.log(error);
        }
    );
});
}