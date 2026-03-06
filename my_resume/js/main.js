document.addEventListener("DOMContentLoaded", () => {
  // ====== NAV SCROLL EFFECT ======
  const nav = document.getElementById("site-nav");
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 20);
  });

  // ====== MOBILE MENU ======
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
  });

  // ====== SMOOTH SCROLL ======
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
      mobileMenu.classList.remove("open");
    });
  });

  // ====== ACTIVE NAV HIGHLIGHTING ======
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  function updateActiveNav() {
    let current = "";
    sections.forEach((section) => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        current = section.id;
      }
    });
    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${current}`
      );
    });
  }

  let scrollTick = false;
  window.addEventListener("scroll", () => {
    if (!scrollTick) {
      requestAnimationFrame(() => {
        updateActiveNav();
        scrollTick = false;
      });
      scrollTick = true;
    }
  });
  updateActiveNav();

  // ====== SCROLL REVEAL ======
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  // ====== CONTACT FORM ======
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const name = formData.get("name");
      const email = formData.get("email");
      const message = formData.get("message");

      if (!name || !email || !message) {
        alert("Please fill in all fields.");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      const btn = contactForm.querySelector(".form-submit");
      const originalText = btn.textContent;
      btn.textContent = "Sending...";
      btn.disabled = true;

      setTimeout(() => {
        alert("Thank you for your message! I'll get back to you soon.");
        contactForm.reset();
        btn.textContent = originalText;
        btn.disabled = false;
      }, 2000);
    });
  }

  // ====== PROJECT MODAL ======
  const projectData = {
    mais_dashboard: {
      title: "Institute Management System",
      videoId: "dQw4w9WgXcQ",
      description:
        "This application is designed to efficiently manage all mosques within the state of Selangor, Malaysia. It features multiple dashboards that provide comprehensive system insights. Through the platform, administrators can assign officers in charge of each mosque, oversee and manage financial reports, and access a wide range of additional administrative tools and functionalities.",
      features: [
        "User authentication and role management",
        "Dashboard for mosque management",
        "Financial reporting and analytics",
        "Officer assignment and management",
        "Responsive design for all devices",
        "Logging and auditing features",
        "Data visualization with interactive charts",
      ],
      technologies: [
        "Laravel",
        "MySQL",
        "MongoDB",
        "Blade",
        "Tailwind CSS",
        "Eloquent ORM",
        "Livewire",
        "Chart.js",
        "Docker",
        "Redis",
        "AWS S3",
        "AWS ECS",
      ],
      github: "#",
      live: "#",
    },
    single_vendor_ecommerce: {
      title: "E-Commerce Platform",
      videoId: "yW7DUw1Sc10",
      description:
        "Single Vendor E-commerce Site is a comprehensive platform designed to empower small businesses with a robust online presence. With an intuitive admin panel and a seamless client interface, this project offers the perfect solution for entrepreneurs looking to expand their reach in the digital marketplace.",
      features: [
        "User authentication and authorization",
        "Product catalog with search and filtering",
        "Shopping cart and wishlist functionality",
        "Admin dashboard for inventory management",
        "Responsive design for all devices",
      ],
      technologies: [
        "Laravel",
        "MySQL",
        "Blade",
        "Tailwind CSS",
        "Eloquent ORM",
        "Livewire",
      ],
      github: "https://github.com/Anam-jafar/ecommerce_single_vendor",
      live: "",
    },
    inventory_management: {
      title: "Inventory Management System",
      videoId: "PkdFf9av9ho",
      description:
        "This application is designed to help manage your inventory, employees, customers, expenses, and orders efficiently. The system also provides a comprehensive business dashboard and various analytical features to help you make informed business decisions.",
      features: [
        "Inventory tracking and management",
        "Employee management system",
        "Expense tracking and reporting",
        "Order management system",
        "Real-time analytics dashboard",
        "Interactive charts and data visualization",
        "Reporting features for business insights",
        "Responsive design for all devices",
      ],
      technologies: [
        "Laravel",
        "MySQL",
        "Blade",
        "Bootstrap",
        "Chart.js",
        "Livewire",
        "Eloquent ORM",
      ],
      github: "https://github.com/Anam-jafar/inventory_management_software",
      live: "#",
    },
  };

  const modal = document.getElementById("project-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalVideo = document.getElementById("modal-video");
  const modalFeatures = document.getElementById("modal-features");
  const modalTechnologies = document.getElementById("modal-technologies");
  const modalDescription = document.getElementById("modal-description");
  const modalGithub = document.getElementById("modal-github");
  const modalLive = document.getElementById("modal-live");
  const closeModalBtn = document.getElementById("close-modal");

  function openModal(project) {
    modalTitle.textContent = project.title;
    modalVideo.src = `https://www.youtube.com/embed/${project.videoId}?autoplay=1&rel=0`;
    modalDescription.textContent = project.description;

    modalFeatures.innerHTML = "";
    project.features.forEach((f) => {
      const li = document.createElement("li");
      li.textContent = f;
      modalFeatures.appendChild(li);
    });

    modalTechnologies.innerHTML = "";
    project.technologies.forEach((t) => {
      const span = document.createElement("span");
      span.className = "tech-tag";
      span.textContent = t;
      modalTechnologies.appendChild(span);
    });

    modalGithub.href = project.github;
    modalLive.href = project.live;

    modal.classList.add("open");
    document.body.classList.add("modal-open");
  }

  function closeModal() {
    modal.classList.remove("open");
    document.body.classList.remove("modal-open");
    modalVideo.src = "";
  }

  document.querySelectorAll("[data-project]").forEach((card) => {
    card.addEventListener("click", () => {
      const project = projectData[card.dataset.project];
      if (project) openModal(project);
    });
  });

  closeModalBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
  });
});
