// Main JavaScript functionality
document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // Smooth scrolling for navigation links with proper offset
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // Calculate offset accounting for fixed header
        const headerHeight = 80;
        const offsetTop = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }

      // Close mobile menu if open
      if (mobileMenu) {
        mobileMenu.classList.add("hidden");
      }
    });
  });

  // Active navigation highlighting
  function updateActiveNav() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("text-mono-900", "font-semibold");
      link.classList.add("text-mono-600");

      if (link.getAttribute("href") === `#${current}`) {
        link.classList.remove("text-mono-600");
        link.classList.add("text-mono-900", "font-semibold");
      }
    });
  }

  // Scroll event listener for active nav (debounced for performance)
  let scrollTimeout;
  window.addEventListener("scroll", () => {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(updateActiveNav, 10);
  });

  // Contact form handling
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Get form data
      const formData = new FormData(contactForm);
      const name = formData.get("name");
      const email = formData.get("email");
      const message = formData.get("message");

      // Simple validation
      if (!name || !email || !message) {
        alert("Please fill in all fields.");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      // Simulate form submission
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      // Simulate API call
      setTimeout(() => {
        alert("Thank you for your message! I'll get back to you soon.");
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 2000);
    });
  }

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".skill-item, .experience-item, .project-card"
  );
  animateElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

  // Initialize active nav on page load
  updateActiveNav();

  // Project Modal Functionality
  const projectData = {
    mais_dashboard: {
      title: "Institute Management System",
      videoId: "dQw4w9WgXcQ", // Replace with actual YouTube video ID
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
      videoId: "yW7DUw1Sc10", // Replace with actual YouTube video ID
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
      videoId: "PkdFf9av9ho", // Replace with actual YouTube video ID
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

  // Modal elements
  const modal = document.getElementById("project-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalVideo = document.getElementById("modal-video");
  const modalFeatures = document.getElementById("modal-features");
  const modalTechnologies = document.getElementById("modal-technologies");
  const modalDescription = document.getElementById("modal-description");
  const modalGithub = document.getElementById("modal-github");
  const modalLive = document.getElementById("modal-live");
  const closeModalBtn = document.getElementById("close-modal");

  // Project card click handlers
  const projectCards = document.querySelectorAll("[data-project]");
  projectCards.forEach((card) => {
    card.addEventListener("click", (e) => {
      const projectKey = card.getAttribute("data-project");
      const project = projectData[projectKey];

      if (project) {
        openProjectModal(project);
      }
    });
  });

  // Open modal function
  function openProjectModal(project) {
    // Set modal content
    modalTitle.textContent = project.title;
    modalVideo.src = `https://www.youtube.com/embed/${project.videoId}?autoplay=1&rel=0`;
    modalDescription.textContent = project.description;

    // Clear and populate features
    modalFeatures.innerHTML = "";
    project.features.forEach((feature) => {
      const li = document.createElement("li");
      li.textContent = feature;
      modalFeatures.appendChild(li);
    });

    // Clear and populate technologies
    modalTechnologies.innerHTML = "";
    project.technologies.forEach((tech) => {
      const span = document.createElement("span");
      span.className = "tech-tag";
      span.textContent = tech;
      modalTechnologies.appendChild(span);
    });

    // Set links
    modalGithub.href = project.github;
    modalLive.href = project.live;

    // Show modal
    modal.classList.remove("hidden");
    document.body.classList.add("modal-open");

    // Focus trap for accessibility
    modal.focus();
  }

  // Close modal function
  function closeProjectModal() {
    modal.classList.add("hidden");
    document.body.classList.remove("modal-open");

    // Stop video playback
    modalVideo.src = "";
  }

  // Close modal event listeners
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeProjectModal);
  }

  // Close modal when clicking outside
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeProjectModal();
      }
    });
  }

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && !modal.classList.contains("hidden")) {
      closeProjectModal();
    }
  });

  // Prevent modal from closing when clicking inside the modal content
  if (modal) {
    const modalContent = modal.querySelector(".bg-white");
    if (modalContent) {
      modalContent.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    }
  }
});

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});
