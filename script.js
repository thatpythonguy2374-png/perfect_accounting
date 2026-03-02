/* ================================
   DOM READY
================================ */

document.addEventListener("DOMContentLoaded", () => {
    initNavbar();
    initSmoothScroll();
    initQueryForm();
});


/* ================================
   NAVBAR SCROLL EFFECT
================================ */

function initNavbar() {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;

    window.addEventListener("scroll", () => {
        navbar.classList.toggle("scrolled", window.scrollY > 50);
    });
}


/* ================================
   SMOOTH SCROLL
================================ */

function initSmoothScroll() {
    document.querySelectorAll("a[href^='#']").forEach(link => {
        link.addEventListener("click", e => {
            const target = document.querySelector(link.getAttribute("href"));
            if (!target) return;

            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
        });
    });
}


/* ================================
   CONTACT MODAL
================================ */

function openContact() {
    document.getElementById("contactModal").style.display = "flex";
}

function closeContact() {
    document.getElementById("contactModal").style.display = "none";
}


/* ================================
   SERVICE MODAL
================================ */

function openService(title, description) {
    document.getElementById("serviceTitle").textContent = title;
    document.getElementById("serviceDesc").textContent = description;
    document.getElementById("serviceModal").style.display = "flex";
}

function closeService() {
    document.getElementById("serviceModal").style.display = "none";
}


/* ================================
   CLOSE MODALS WHEN CLICK OUTSIDE
================================ */

window.addEventListener("click", (e) => {
    const contactModal = document.getElementById("contactModal");
    const serviceModal = document.getElementById("serviceModal");

    if (e.target === contactModal) contactModal.style.display = "none";
    if (e.target === serviceModal) serviceModal.style.display = "none";

    // close dropdown if clicked outside
    const menu = document.getElementById("servicesMenu");
    if (menu && !e.target.closest(".dropdown")) {
        menu.classList.remove("show");
    }
});


/* ================================
   SERVICES DROPDOWN (CLICK BASED)
================================ */

// Toggle dropdown
function toggleDropdown(e) {
    e.stopPropagation();

    const dropdown = e.target.closest(".dropdown");

    // If already open → close it
    if (dropdown.classList.contains("show")) {
        dropdown.classList.remove("show");
    } else {
        // Close any other open dropdown
        document.querySelectorAll(".dropdown").forEach(d => {
            d.classList.remove("show");
        });

        dropdown.classList.add("show");
    }
}

// Close when clicking anywhere else
document.addEventListener("click", function () {
    document.querySelectorAll(".dropdown").forEach(d => {
        d.classList.remove("show");
    });
});


/* ================================
   EMAILJS QUERY FORM
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


function toggleDropdown(e){
    e.preventDefault();
    e.stopPropagation();

    const menu = document.getElementById("servicesMenu");
    menu.classList.toggle("show");
}

function toggleMenu(){
    const nav = document.querySelector(".nav-center");
    nav.classList.toggle("open");

    document.body.classList.toggle("menu-open");
}

/* close menu when clicking any menu link */
document.querySelectorAll(".nav-center a").forEach(link=>{
    link.addEventListener("click", ()=>{
        document.querySelector(".nav-center").classList.remove("open");
    });
});