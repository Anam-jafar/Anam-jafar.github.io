document.addEventListener("DOMContentLoaded", () => {
  // ====== THEME TOGGLE ======
  const html = document.documentElement;
  const themeBtn = document.getElementById("theme-toggle");
  const stored = localStorage.getItem("theme");

  // Respect saved preference or system preference
  if (stored) {
    html.setAttribute("data-theme", stored);
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    html.setAttribute("data-theme", "dark");
  }

  themeBtn.addEventListener("click", () => {
    const current = html.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });

  // ====== NAV SCROLL ======
  const nav = document.getElementById("nav");
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 30);
  });

  // ====== MOBILE MENU ======
  const hamburger = document.getElementById("nav-hamburger");
  const mobileNav = document.getElementById("mobile-nav");

  hamburger.addEventListener("click", () => {
    mobileNav.classList.toggle("open");
  });

  // ====== SMOOTH SCROLL ======
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth" });
      mobileNav.classList.remove("open");
    });
  });

  // ====== ACTIVE NAV ======
  const sections = document.querySelectorAll("section");
  const menuLinks = document.querySelectorAll(".nav-menu a");

  function setActiveNav() {
    let current = "";
    sections.forEach((s) => {
      if (window.scrollY >= s.offsetTop - 140) current = s.id;
    });
    menuLinks.forEach((a) => {
      a.classList.toggle("active", a.getAttribute("href") === `#${current}`);
    });
  }

  let raf = false;
  window.addEventListener("scroll", () => {
    if (!raf) {
      requestAnimationFrame(() => {
        setActiveNav();
        raf = false;
      });
      raf = true;
    }
  });
  setActiveNav();

  // ====== SCROLL REVEAL ======
  const revealObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          revealObs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".reveal").forEach((el) => revealObs.observe(el));

  // ====== CONTACT FORM ======
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const name = fd.get("name");
      const email = fd.get("email");
      const message = fd.get("message");

      if (!name || !email || !message) {
        alert("Please fill in all fields.");
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      const btn = form.querySelector(".form-btn");
      const orig = btn.textContent;
      btn.textContent = "Sending...";
      btn.disabled = true;

      setTimeout(() => {
        alert("Thanks for reaching out! I'll get back to you soon.");
        form.reset();
        btn.textContent = orig;
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
        "This application manages all mosques within Selangor, Malaysia. It features multiple dashboards providing comprehensive system insights. Administrators can assign officers, oversee financial reports, and access a wide range of administrative tools and functionalities.",
      features: [
        "User authentication and role management",
        "Multi-dashboard mosque management",
        "Financial reporting and analytics",
        "Officer assignment and tracking",
        "Responsive design for all devices",
        "Comprehensive logging and auditing",
        "Interactive data visualization with charts",
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
        "A comprehensive single-vendor e-commerce platform designed to empower small businesses with a robust online presence. Features an intuitive admin panel and seamless client interface for entrepreneurs looking to expand their digital reach.",
      features: [
        "User authentication and authorization",
        "Product catalog with search and filtering",
        "Shopping cart and wishlist",
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
        "A complete inventory management system for tracking inventory, employees, customers, expenses, and orders. Includes a comprehensive business dashboard with analytical features for informed decision-making.",
      features: [
        "Inventory tracking and management",
        "Employee management system",
        "Expense tracking and reporting",
        "Order management system",
        "Real-time analytics dashboard",
        "Interactive charts and visualization",
        "Business reporting features",
        "Fully responsive design",
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
    eboss: {
      title: "eBoss - Enterprise Platform",
      images: [
        "assets/images/Project/Eboss/1.png",
        "assets/images/Project/Eboss/2.png",
        "assets/images/Project/Eboss/3.png",
      ],
      description:
        "An enterprise-grade platform for managing organizations with multi-level user access and role-based control. Built on a microservices architecture, each core module — HR, Finance, and CMS — operates as an independent service, ensuring modularity, seamless scalability, and isolated deployments. Designed to grow with your business, new modules can be added without disrupting existing functionality.",
      features: [
        "Multi-level user access and role-based control",
        "Microservices architecture with independent modules",
        "HR, Finance, and CMS as separate services",
        "Seamless scalability and isolated deployments",
        "Modular design for adding new modules",
      ],
      technologies: [
        "FastAPI",
        "AWS Fargate",
        "Amazon ECS",
        "Python",
        "Unit Testing",
      ],
      github: "#",
      live: "#",
    },
    mais_sispem: {
      title: "SISPEM Dashboard",
      images: [
        "assets/images/Project/Mais/1.png",
        "assets/images/Project/Mais/2.png",
        "assets/images/Project/Mais/3.png",
      ],
      description:
        "Currently serving 2,000+ institutes, this platform enables organizations to centrally manage institute status, financial records, and subscription fees through a unified dashboard. A multi-level role-based access system ensures each user operates within permissions tailored to their responsibility. Built with Laravel and Blade for reliability and performance, with encryption applied across all critical touchpoints to safeguard sensitive data.",
      features: [
        "Centralized institute status management",
        "Financial records and subscription tracking",
        "Multi-level role-based access control",
        "Unified dashboard for 2,000+ institutes",
        "Encryption across all critical touchpoints",
      ],
      technologies: [
        "Laravel",
        "Docker",
        "Tailwind CSS",
        "MySQL",
      ],
      github: "#",
      live: "#",
    },
  };

  const modal = document.getElementById("project-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalVideo = document.getElementById("modal-video");
  const modalFeatures = document.getElementById("modal-features");
  const modalTech = document.getElementById("modal-technologies");
  const modalDesc = document.getElementById("modal-description");
  const modalGithub = document.getElementById("modal-github");
  const modalLive = document.getElementById("modal-live");
  const closeBtn = document.getElementById("close-modal");

  const modalVid = document.getElementById("modal-vid");
  const modalGallery = document.getElementById("modal-gallery");
  const galleryImg = document.getElementById("gallery-img");
  const galleryDots = document.getElementById("gallery-dots");
  const galleryPrev = document.getElementById("gallery-prev");
  const galleryNext = document.getElementById("gallery-next");
  let galleryImages = [];
  let galleryIndex = 0;

  function updateGallery() {
    galleryImg.src = galleryImages[galleryIndex];
    galleryDots.querySelectorAll(".gallery-dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === galleryIndex);
    });
  }

  galleryPrev.addEventListener("click", () => {
    galleryIndex = (galleryIndex - 1 + galleryImages.length) % galleryImages.length;
    updateGallery();
  });

  galleryNext.addEventListener("click", () => {
    galleryIndex = (galleryIndex + 1) % galleryImages.length;
    updateGallery();
  });

  function openModal(proj) {
    modalTitle.textContent = proj.title;
    modalDesc.textContent = proj.description;

    if (proj.images) {
      modalVid.style.display = "none";
      modalGallery.style.display = "block";
      galleryImages = proj.images;
      galleryIndex = 0;
      galleryDots.innerHTML = "";
      proj.images.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.className = "gallery-dot" + (i === 0 ? " active" : "");
        dot.addEventListener("click", () => { galleryIndex = i; updateGallery(); });
        galleryDots.appendChild(dot);
      });
      updateGallery();
    } else {
      modalGallery.style.display = "none";
      modalVid.style.display = "block";
      modalVideo.src = `https://www.youtube.com/embed/${proj.videoId}?autoplay=1&rel=0`;
    }

    modalFeatures.innerHTML = "";
    proj.features.forEach((f) => {
      const li = document.createElement("li");
      li.textContent = f;
      modalFeatures.appendChild(li);
    });

    modalTech.innerHTML = "";
    proj.technologies.forEach((t) => {
      const span = document.createElement("span");
      span.className = "tag";
      span.textContent = t;
      modalTech.appendChild(span);
    });

    modalGithub.href = proj.github;
    modalLive.href = proj.live;

    modal.classList.add("open");
    document.body.classList.add("no-scroll");
  }

  function closeModal() {
    modal.classList.remove("open");
    document.body.classList.remove("no-scroll");
    modalVideo.src = "";
    galleryImg.src = "";
  }

  document.querySelectorAll("[data-project]").forEach((card) => {
    card.addEventListener("click", () => {
      const proj = projectData[card.dataset.project];
      if (proj) openModal(proj);
    });
  });

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
  });
});
