
$(function () {
  const $navbar = $(".beework-navbar");
  const menu = document.getElementById("beeworkMenu");

  // 1. Shrink navbar and add shadow while scrolling
  function updateNavbar() {
    $navbar.toggleClass("scrolled", $(window).scrollTop() > 30);
  }

  updateNavbar();

  $(window).on("scroll", updateNavbar);

  // 2. Close mobile menu after selecting a destination
  $("#beeworkMenu .nav-link:not(.dropdown-toggle), " +
    "#beeworkMenu .dropdown-item, " +
    ".beework-navbar .quote-btn"
  ).on("click", function () {
    if (
      menu &&
      menu.classList.contains("show") &&
      window.matchMedia("(max-width: 991.98px)").matches
    ) {
      bootstrap.Collapse
        .getOrCreateInstance(menu, { toggle: false })
        .hide();
    }
  });

  // 3. Update active link when a normal navigation link is clicked
  $("#beeworkMenu .nav-link:not(.dropdown-toggle)").on("click", function () {
    $("#beeworkMenu .nav-link").removeClass("active");
    $(this).addClass("active");
  });

  // 4. Highlight Services or Industries when a dropdown item is selected
  $("#beeworkMenu .dropdown-item").on("click", function () {
    const parentDropdown = $(this).closest(".dropdown");
    const dropdownToggle = parentDropdown.find(".dropdown-toggle");

    $("#beeworkMenu .nav-link").removeClass("active");
    dropdownToggle.addClass("active");
  });
});




$(function () {
    // Trigger Animate.css effects when elements enter the screen
    if (typeof WOW !== "undefined") {
        new WOW({
            boxClass: "wow",
            animateClass: "animate__animated",
            offset: 60,
            mobile: true,
            live: true
        }).init();
    }

    // Rotating headline words
    const words = [
        "Sparkle",
        "Shine",
        "Feel Fresh",
        "Look Perfect",
        "Stay Spotless"
    ];

    let index = 0;
    const wordElement = document.getElementById("bw-changing-word");

    if (wordElement) {
        wordElement.textContent = words[0];
        wordElement.classList.add("bw-word-enter");

        setInterval(function () {
            wordElement.classList.remove("bw-word-enter");
            wordElement.classList.add("bw-word-exit");

            setTimeout(function () {
                index = (index + 1) % words.length;
                wordElement.textContent = words[index];

                wordElement.classList.remove("bw-word-exit");
                void wordElement.offsetWidth;
                wordElement.classList.add("bw-word-enter");
            }, 350);
        }, 2200);
    }
});



$(function () {
  // Initialize WOW.js with Animate.css
  if (typeof WOW !== "undefined") {
    new WOW({
      boxClass: "wow",
      animateClass: "animate__animated",
      offset: 70,
      mobile: true,
      live: true
    }).init();
  }

  // Stagger testimonial star animations
  $(".bw-testimonial-card").each(function (cardIndex) {
    $(this)
      .find(".bw-testimonial-stars i")
      .each(function (starIndex) {
        $(this).css(
          "--star-delay",
          (cardIndex * 0.2 + starIndex * 0.12) + "s"
        );
      });
  });

  // Mouse-following spotlight
  $(".bw-testimonial-card").on("mousemove", function (event) {
    const rect = this.getBoundingClientRect();

    this.style.setProperty(
      "--mouse-x",
      event.clientX - rect.left + "px"
    );

    this.style.setProperty(
      "--mouse-y",
      event.clientY - rect.top + "px"
    );
  });

  // Remove spotlight coordinates when the pointer leaves
  $(".bw-testimonial-card").on("mouseleave", function () {
    this.style.setProperty("--mouse-x", "50%");
    this.style.setProperty("--mouse-y", "50%");
  });
});

/* ==========================================
   BEEWORKS CONTACT INTERACTIONS
========================================== */

document.addEventListener("DOMContentLoaded", function () {
    const scene = document.querySelector(".bw-contact-form-scene");
    const card = document.querySelector("#bwContactCard");
    const form = document.querySelector("#bwContactForm");
    const feedback = document.querySelector("#bwFormFeedback");

    if (!scene || !card || !form || !feedback) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const finePointer = window.matchMedia(
        "(hover: hover) and (pointer: fine)"
    ).matches;

    // Subtle 3D tilt follows the cursor.
    if (!reducedMotion && finePointer) {
        scene.addEventListener("pointermove", function (event) {
            const rect = card.getBoundingClientRect();

            const x = (event.clientX - rect.left) / rect.width;
            const y = (event.clientY - rect.top) / rect.height;

            const rotateY = (x - 0.5) * 3;
            const rotateX = (0.5 - y) * 3;

            card.style.transform =
                `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        scene.addEventListener("pointerleave", function () {
            card.style.transform = "rotateX(0deg) rotateY(0deg)";
        });
    }

    // Input feedback.
    form.querySelectorAll("input, select, textarea").forEach(function (field) {
        field.addEventListener("input", function () {
            feedback.textContent = "";
        });

        field.addEventListener("change", function () {
            feedback.textContent = "";
        });
    });

    /*
      Demo-only form behavior.
      This does not send a message to BeeWorks.
      Connect a backend or form service to receive inquiries.
    */
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!form.reportValidity()) return;

        feedback.textContent =
            "Your form is valid. Connect a form backend to send your inquiry.";

        feedback.setAttribute("role", "status");
    });
});
  $(".bw-contact-info-card").on("mouseenter", function () {
        $(this).find(".bw-contact-info-icon").stop(true, true)
            .animate({ opacity: 0.85 }, 100)
            .animate({ opacity: 1 }, 180);
    });

    // Give form fields a small focus response.
    $(".bw-contact .bw-input-wrap input, " +
      ".bw-contact .bw-input-wrap select, " +
      ".bw-contact .bw-input-wrap textarea")
        .on("focus", function () {
            $(this).closest(".bw-input-wrap").addClass("is-focused");
        })
        .on("blur", function () {
            $(this).closest(".bw-input-wrap").removeClass("is-focused");
        });
        
/* BEEWORKS — CONTACT SECTION SCROLL REVEAL */
document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector(".bw-contact");

    if (!section) return;

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
        section.classList.add("bw-contact-visible");
        return;
    }

    const animatedElements = section.querySelectorAll(
        "h2, .bw-contact-subtitle, " +
        ".bw-contact-info-card, .bw-contact-card, " +
        ".bw-contact-item, .bw-contact-form-scene"
    );

    animatedElements.forEach((element) => {
        element.classList.add("bw-contact-reveal");
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("bw-contact-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -35px 0px"
        }
    );

    animatedElements.forEach((element) => observer.observe(element));
});

/* =====================================
   BEEWORKS FOOTER INTERACTIONS
===================================== */

document.addEventListener("DOMContentLoaded", () => {
    const footer = document.querySelector("#footer");

    if (!footer) return;

    // Automatically update the copyright year
    const year = footer.querySelector("#bwFooterYear");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // Floating gold particles
    const particleContainer = footer.querySelector(".bw-footer-particles");
    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (particleContainer && !reduceMotion) {
        const particleCount = window.innerWidth < 600 ? 12 : 24;
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement("span");

            particle.className = "bw-footer-particle";
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDuration =
                `${7 + Math.random() * 10}s`;
            particle.style.animationDelay =
                `${Math.random() * 12}s`;

            const size = 2 + Math.random() * 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;

            fragment.appendChild(particle);
        }

        particleContainer.appendChild(fragment);
    }

    // Newsletter demo — requires a backend to actually subscribe
    const newsletter = footer.querySelector("#bwFooterNewsletter");
    const email = footer.querySelector("#bwFooterEmail");
    const message = footer.querySelector(
        "#bwFooterNewsletterMessage"
    );

    if (newsletter && email && message) {
        newsletter.addEventListener("submit", (event) => {
            event.preventDefault();

            if (!email.checkValidity()) {
                email.reportValidity();
                return;
            }

            message.textContent =
                "Your email is valid. Connect a newsletter service to activate subscriptions.";
        });

        email.addEventListener("input", () => {
            message.textContent = "";
        });
    }

    // Smooth back-to-top link
    const backToTop = footer.querySelector(".bw-footer-backtop");

    if (backToTop) {
        backToTop.addEventListener("click", (event) => {
            const target = document.querySelector(
                backToTop.getAttribute("href")
            );

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: reduceMotion ? "auto" : "smooth",
                    block: "start"
                });
            }
        });
    }
});

/* =====================================================
   BEEWORKS GLOBAL MOTION ENGINE
   No additional libraries required
===================================================== */

(() => {
    "use strict";

    function initBeeWorksMotion() {
        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        /* 1. Scroll progress bar */
        let progress = document.getElementById("bwScrollProgress");

        if (!progress) {
            progress = document.createElement("div");
            progress.id = "bwScrollProgress";
            progress.setAttribute("aria-hidden", "true");
            document.body.appendChild(progress);
        }

        let scrollTicking = false;

        function updateScrollProgress() {
            const scrollable =
                document.documentElement.scrollHeight - window.innerHeight;

            const percentage = scrollable > 0
                ? (window.scrollY / scrollable) * 100
                : 0;

            progress.style.width = `${percentage}%`;
            scrollTicking = false;
        }

        window.addEventListener("scroll", () => {
            if (!scrollTicking) {
                window.requestAnimationFrame(updateScrollProgress);
                scrollTicking = true;
            }
        }, { passive: true });

        updateScrollProgress();

        /* 2. Scroll reveal */
        const revealSelectors = [
            ".bw-reveal",
            "section h2",
            "section .section-title",
            ".service-card",
            ".portfolio-item",
            ".testimonial-card"
        ];

        const revealElements = new Set();

        revealSelectors.forEach((selector) => {
            document.querySelectorAll(selector).forEach((element) => {
                if (element.closest(".bw-footer")) return;
                revealElements.add(element);
            });
        });

        /* Only auto-reveal elements that aren't already controlled
           by WOW.js or a custom animation system. */
        const revealList = [...revealElements].filter((element) => {
            return !element.classList.contains("wow") &&
                   !element.classList.contains("animated") &&
                   !element.classList.contains("bw-contact-reveal") &&
                   !element.classList.contains("bw-reveal");
        });

        if (reduceMotion || !("IntersectionObserver" in window)) {
            revealList.forEach((element) => {
                element.classList.add("bw-revealed");
            });
        } else {
            revealList.forEach((element) => {
                element.classList.add("bw-reveal");

                const observer = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add("bw-revealed");
                            observer.unobserve(entry.target);
                        }
                    });
                }, {
                    threshold: 0.12,
                    rootMargin: "0px 0px -30px 0px"
                });

                observer.observe(element);
            });
        }

        /* 3. 3D tilt and cursor lighting */
        if (!reduceMotion && window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        ).matches) {
            document.querySelectorAll(
                ".bw-motion-card, .service-card, .portfolio-item"
            ).forEach((card) => {
                /* Avoid applying two separate tilt systems. */
                if (card.dataset.bwMotionReady) return;
                card.dataset.bwMotionReady = "true";
                card.classList.add("bw-motion-card");

                let frame = null;
                let latestEvent = null;

                card.addEventListener("pointermove", (event) => {
                    latestEvent = event;

                    if (frame) return;

                    frame = requestAnimationFrame(() => {
                        frame = null;

                        const rect = card.getBoundingClientRect();
                        const x = latestEvent.clientX - rect.left;
                        const y = latestEvent.clientY - rect.top;

                        const rx = (0.5 - y / rect.height) * 5;
                        const ry = (x / rect.width - 0.5) * 5;

                        card.style.setProperty("--bw-light-x", `${x}px`);
                        card.style.setProperty("--bw-light-y", `${y}px`);
                        card.style.transform =
                            `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-3px)`;
                    });
                });

                card.addEventListener("pointerleave", () => {
                    if (frame) cancelAnimationFrame(frame);
                    frame = null;
                    card.style.transform = "";
                    card.style.removeProperty("--bw-light-x");
                    card.style.removeProperty("--bw-light-y");
                });
            });
        }

        /* 4. Enhance prominent buttons */
        document.querySelectorAll(
            ".btn-primary, .btn-gold, .cta-button, .bw-motion-button"
        ).forEach((button) => {
            button.classList.add("bw-motion-button");
        });

        /* 5. Enhance images without changing their layout */
        document.querySelectorAll(
            ".portfolio-item, .gallery-item"
        ).forEach((item) => {
            if (item.querySelector("img")) {
                item.classList.add("bw-motion-image");
            }
        });

        /* 6. Smooth scrolling for same-page links */
        document.querySelectorAll('a[href^="#"]').forEach((link) => {
            link.addEventListener("click", (event) => {
                const href = link.getAttribute("href");

                if (!href || href === "#") return;

                let target;

                try {
                    target = document.querySelector(href);
                } catch {
                    return;
                }

                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior: reduceMotion ? "auto" : "smooth",
                    block: "start"
                });
            });
        });

        /* 7. Animate headings only when explicitly requested */
        document.querySelectorAll(".bw-heading-shine").forEach((heading) => {
            heading.setAttribute("data-bw-shine", "true");
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initBeeWorksMotion,
            { once: true }
        );
    } else {
        initBeeWorksMotion();
    }
})();
