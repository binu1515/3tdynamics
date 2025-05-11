// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');
  
  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileNav.classList.toggle('active');
    });
  }
  
  // Close mobile menu when clicking a link
  const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileNav.classList.remove('active');
    });
  });
  
  // Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  const toast = document.getElementById('toast');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = {
        name: contactForm.elements.name.value,
        email: contactForm.elements.email.value,
        phone: contactForm.elements.phone.value,
        message: contactForm.elements.message.value
      };
      
      // In a real application, you would send the data to a server
      console.log('Form submitted:', formData);
      
      // Show success toast
      showToast('Message Sent!', "We'll get back to you as soon as possible.");
      
      // Reset the form
      contactForm.reset();
    });
  }
  
  // Toast notification function
  function showToast(title, message) {
    if (toast) {
      // Set toast content
      const toastTitle = toast.querySelector('.toast-title');
      const toastDesc = toast.querySelector('.toast-desc');
      
      if (toastTitle) toastTitle.textContent = title;
      if (toastDesc) toastDesc.textContent = message;
      
      // Show toast
      toast.classList.add('active');
      
      // Hide toast after 3 seconds
      setTimeout(function() {
        toast.classList.remove('active');
      }, 3000);
    }
  }
  
  // Set current year in footer
  const currentYearElement = document.getElementById('currentYear');
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Calculate header height for offset
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Add scroll event to change header styling
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(13, 40, 66, 0.95)';
        header.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
      } else {
        header.style.backgroundColor = 'var(--dynamics-dark)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
      }
    });
  }
});
    document.getElementById("contactForm").addEventListener("submit", async function (e) {
      e.preventDefault();

      const form = e.target;
      const formData = new FormData(form);

      try {
        const response = await fetch("https://api.staticforms.xyz/submit", {
          method: "POST",
          body: formData
        });

        if (response.ok) {
          window.location.href = "thank-you.html";
        } else {
          alert("Submission failed. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("There was an error submitting the form.");
      }
    });
