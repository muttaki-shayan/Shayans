document.addEventListener("DOMContentLoaded", () => {
  const mobileBtn = document.getElementById("mobileMenuBtn");
  const navLinks = document.querySelector(".nav-links");
  const navbar = document.getElementById("mainNavbar");
  const scrollBox = document.querySelector(".portfolio-card");
  const helloBtn = document.getElementById("sayHelloBtn");
  const contactForm = document.getElementById("contactForm");

  // Mobile menu toggle
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // Smooth scroll and close mobile menu
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const targetId = link.getAttribute("href");
      if (targetId && targetId !== "#") {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }

      if (navLinks) {
        navLinks.classList.remove("active");
      }
    });
  });

  // Navbar fade on scroll
  if (navbar && scrollBox) {
    scrollBox.addEventListener("scroll", () => {
      navbar.classList.toggle("navbar-fade", scrollBox.scrollTop > 100);
    });
  }

  // Say Hello button
  if (helloBtn) {
    helloBtn.addEventListener("click", () => {
      window.open(
        "https://mail.google.com/mail/?view=cm&fs=1&to=muttakisayon@gmail.com&su=Hello",
        "_blank"
      );
    });
  }

  // Contact form submit
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you for your message! I will get back to you soon.");
      contactForm.reset();
    });
  }
});
