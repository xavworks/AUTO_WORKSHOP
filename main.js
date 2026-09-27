/* =========================================
   VOLT AUTOWORKS
   MAIN JAVASCRIPT
========================================= */


/* =========================================
   COLOUR CONFIGURATOR
========================================= */

const colourOptions = document.querySelectorAll(".colour-option");
const carBody = document.querySelector(".car-body");
const carRoof = document.querySelector(".car-roof");

const colourName = document.getElementById("colourName");
const hexDisplay = document.getElementById("hexDisplay");

const customColour = document.getElementById("customColour");
const hexValue = document.getElementById("hexValue");

const selectionResult = document.getElementById("selectionResult");

const finishOptions = document.querySelectorAll(".finish-option");

let selectedColour = "#111111";
let selectedColourName = "Obsidian Black";
let selectedFinish = "Gloss";


/* =========================================
   UPDATE CAR
========================================= */

function updateCarColour(colour, name = "Custom Colour") {

    selectedColour = colour;
    selectedColourName = name;

    carBody.style.background = colour;
    carRoof.style.background = colour;

    colourName.textContent = name;
    hexDisplay.textContent = colour.toUpperCase();

    hexValue.value = colour.toUpperCase();

    updateSelection();

}


/* =========================================
   UPDATE SELECTION TEXT
========================================= */

function updateSelection() {

    selectionResult.textContent =
        `${selectedColourName} · ${selectedFinish}`;

}


/* =========================================
   POPULAR COLOURS
========================================= */

colourOptions.forEach(option => {

    option.addEventListener("click", () => {

        colourOptions.forEach(item => {
            item.classList.remove("active");
        });

        option.classList.add("active");

        const colour = option.dataset.colour;
        const name = option.dataset.name;

        updateCarColour(colour, name);

    });

});


/* =========================================
   CUSTOM COLOUR PICKER
========================================= */

customColour.addEventListener("input", () => {

    const colour = customColour.value;

    colourOptions.forEach(item => {
        item.classList.remove("active");
    });

    updateCarColour(colour, "Custom Colour");

});


/* =========================================
   HEX INPUT
========================================= */

hexValue.addEventListener("input", () => {

    let value = hexValue.value.trim();

    if (!value.startsWith("#")) {
        value = "#" + value;
    }

    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {

        customColour.value = value;

        colourOptions.forEach(item => {
            item.classList.remove("active");
        });

        updateCarColour(value, "Custom Colour");

    }

});


/* =========================================
   FINISH SELECTOR
========================================= */

finishOptions.forEach(option => {

    option.addEventListener("click", () => {

        finishOptions.forEach(item => {
            item.classList.remove("active");
        });

        option.classList.add("active");

        selectedFinish = option.dataset.finish;

        applyFinish(selectedFinish);

        updateSelection();

    });

});


/* =========================================
   PAINT FINISH EFFECT
========================================= */

function applyFinish(finish) {

    if (finish === "Gloss") {

        carBody.style.background =
            `linear-gradient(
                135deg,
                ${selectedColour},
                #ffffff22,
                ${selectedColour}
            )`;

        carRoof.style.background =
            `linear-gradient(
                135deg,
                ${selectedColour},
                #ffffff22,
                ${selectedColour}
            )`;

        carBody.style.boxShadow =
            "inset 0 10px 20px rgba(255,255,255,0.15)";

    }


    if (finish === "Metallic") {

        carBody.style.background =
            `linear-gradient(
                135deg,
                ${selectedColour},
                #ffffff33,
                ${selectedColour},
                #ffffff22
            )`;

        carRoof.style.background =
            `linear-gradient(
                135deg,
                ${selectedColour},
                #ffffff33,
                ${selectedColour}
            )`;

        carBody.style.boxShadow =
            "inset 0 0 25px rgba(255,255,255,0.12)";

    }


    if (finish === "Pearl") {

        carBody.style.background =
            `linear-gradient(
                120deg,
                #ffffff55,
                ${selectedColour},
                #ffffff33,
                ${selectedColour}
            )`;

        carRoof.style.background =
            `linear-gradient(
                120deg,
                #ffffff55,
                ${selectedColour},
                #ffffff33
            )`;

        carBody.style.boxShadow =
            "inset 0 0 30px rgba(255,255,255,0.2)";

    }


    if (finish === "Matte") {

        carBody.style.background = selectedColour;
        carRoof.style.background = selectedColour;

        carBody.style.boxShadow =
            "none";

    }

}


/* =========================================
   MOBILE MENU
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("mobile-open");

});


/* =========================================
   CLOSE MOBILE MENU
========================================= */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("mobile-open");

    });

});


/* =========================================
   WHATSAPP QUOTE FORM
========================================= */

const quoteForm = document.getElementById("quoteForm");

quoteForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const customerName =
        document.getElementById("customerName").value.trim();

    const carModel =
        document.getElementById("carModel").value.trim();

    const serviceType =
        document.getElementById("serviceType").value;

    const customerMessage =
        document.getElementById("customerMessage").value.trim();


    const whatsappNumber = "60123456789";


    const whatsappMessage = `
Hi VOLT AUTOWORKS 👋

I would like to ask for a quotation.

Name: ${customerName}

Car: ${carModel}

Service: ${serviceType}

Colour: ${selectedColourName}

Colour Code: ${selectedColour}

Finish: ${selectedFinish}

Message:
${customerMessage || "No additional message."}
    `.trim();


    const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;


    window.open(whatsappURL, "_blank");

});


/* =========================================
   INITIAL CAR STATE
========================================= */

updateCarColour(
    "#111111",
    "Obsidian Black"
);

applyFinish("Gloss");


/* =========================================
   SIMPLE SCROLL REVEAL
========================================= */

const revealElements = document.querySelectorAll(
    ".service-card, .transformation-card, .gallery-item, .contact-card"
);

const revealObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach(element => {

    revealObserver.observe(element);

});
/* =========================================
   BEFORE / AFTER SLIDER
========================================= */

const beforeAfter = document.querySelector(".before-after");
const afterImage = document.querySelector(".ba-after");
const sliderLine = document.getElementById("baSlider");
const sliderHandle = document.getElementById("baHandle");

let isDragging = false;


function moveSlider(clientX) {

    const rect = beforeAfter.getBoundingClientRect();

    let position =
        ((clientX - rect.left) / rect.width) * 100;

    position = Math.max(5, Math.min(95, position));

    afterImage.style.clipPath =
        `inset(0 0 0 ${position}%)`;

    sliderLine.style.left =
        `${position}%`;

    sliderHandle.style.left =
        `${position}%`;
}


beforeAfter.addEventListener("pointerdown", (event) => {

    isDragging = true;

    beforeAfter.setPointerCapture(event.pointerId);

    moveSlider(event.clientX);

});


beforeAfter.addEventListener("pointermove", (event) => {

    if (!isDragging) return;

    moveSlider(event.clientX);

});


beforeAfter.addEventListener("pointerup", () => {

    isDragging = false;

});


beforeAfter.addEventListener("pointercancel", () => {

    isDragging = false;

});