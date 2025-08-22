const body = document.body;

const btnTheme = document.querySelector(".fa-moon");
const btnHamburger = document.querySelector(".fa-bars");

const addThemeClass = (bodyClass, btnClass) => {
  body.classList.add(bodyClass);
  btnTheme.classList.add(btnClass);
};

const getBodyTheme = localStorage.getItem("portfolio-theme");
const getBtnTheme = localStorage.getItem("portfolio-btn-theme");

addThemeClass(getBodyTheme, getBtnTheme);

const isDark = () => body.classList.contains("dark");

const setTheme = (bodyClass, btnClass) => {
  body.classList.remove(localStorage.getItem("portfolio-theme"));
  btnTheme.classList.remove(localStorage.getItem("portfolio-btn-theme"));

  addThemeClass(bodyClass, btnClass);

  localStorage.setItem("portfolio-theme", bodyClass);
  localStorage.setItem("portfolio-btn-theme", btnClass);
};

const toggleTheme = () =>
  isDark() ? setTheme("light", "fa-moon") : setTheme("dark", "fa-sun");

btnTheme.addEventListener("click", toggleTheme);

const displayList = () => {
  const navUl = document.querySelector(".nav__list");

  if (btnHamburger.classList.contains("fa-bars")) {
    btnHamburger.classList.remove("fa-bars");
    btnHamburger.classList.add("fa-times");
    navUl.classList.add("display-nav-list");
  } else {
    btnHamburger.classList.remove("fa-times");
    btnHamburger.classList.add("fa-bars");
    navUl.classList.remove("display-nav-list");
  }
};

btnHamburger.addEventListener("click", displayList);

const scrollUp = () => {
  const btnScrollTop = document.querySelector(".scroll-top");

  if (body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
    btnScrollTop.style.display = "block";
  } else {
    btnScrollTop.style.display = "none";
  }
};

document.addEventListener("scroll", scrollUp);

// Contact Form Functionality
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", handleContactSubmit);
}

function handleContactSubmit(e) {
  e.preventDefault();

  // Get form data
  const formData = new FormData(contactForm);
  const name = formData.get("name");
  const email = formData.get("email");
  const subject = formData.get("subject");
  const message = formData.get("message");

  // Basic validation
  if (!name || !email || !subject || !message) {
    showNotification("Please fill in all fields", "error");
    return;
  }

  if (!isValidEmail(email)) {
    showNotification("Please enter a valid email address", "error");
    return;
  }

  // Simulate form submission (in real implementation, this would send to a server)
  showNotification("Sending message...", "info");

  // Simulate API call delay
  setTimeout(() => {
    // For demo purposes, we'll just show a success message
    // In production, you'd send this data to your backend
    showNotification(
      "Message sent successfully! I'll get back to you soon.",
      "success"
    );

    // Reset form
    contactForm.reset();

    // Log the contact attempt (for demo purposes)
    console.log("Contact Form Submission:", {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
    });
  }, 2000);
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification--${type}`;
  notification.innerHTML = `
    <div class="notification__content">
      <i class="fas ${getNotificationIcon(type)}"></i>
      <span>${message}</span>
      <button class="notification__close" onclick="this.parentElement.parentElement.remove()">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `;

  // Add to page
  document.body.appendChild(notification);

  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 5000);
}

function getNotificationIcon(type) {
  switch (type) {
    case "success":
      return "fa-check-circle";
    case "error":
      return "fa-exclamation-circle";
    case "warning":
      return "fa-exclamation-triangle";
    default:
      return "fa-info-circle";
  }
}

// Add smooth scrolling for contact form focus
document.addEventListener("DOMContentLoaded", function () {
  const formInputs = document.querySelectorAll(
    ".contact__form input, .contact__form textarea"
  );

  formInputs.forEach((input) => {
    input.addEventListener("focus", function () {
      // Smooth scroll to form if it's not fully visible
      const rect = this.getBoundingClientRect();
      if (rect.bottom > window.innerHeight - 100) {
        this.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    });
  });
});

// Education modal: expand full details on demand
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("modalBody");
  const readMoreButtons = document.querySelectorAll(
    ".education__read-more, .experience__read-more, .about__read-more"
  );

  function openModal(html) {
    modalBody.innerHTML = html;
    modal.classList.add("modal--open");
    modal.setAttribute("aria-hidden", "false");
    modal.setAttribute("aria-modal", "true");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("modal--open");
    modal.setAttribute("aria-hidden", "true");
    modal.setAttribute("aria-modal", "false");
    document.body.style.overflow = "";
    modalBody.innerHTML = "";
  }

  modal.addEventListener("click", function (e) {
    if (e.target.closest("[data-modal-close]")) {
      closeModal();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("modal--open")) {
      closeModal();
    }
  });

  readMoreButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const container =
        this.closest(".education__item") ||
        this.closest(".experience__item") ||
        this.closest(".about__expertise");
      if (!container) return;
      const content =
        container.querySelector(
          ".education__content, .experience__content, .about__expertise-grid"
        ) || container;
      if (!content) return;
      openModal(content.innerHTML);
    });
  });
});
