document.addEventListener('DOMContentLoaded', () => {
    const toggleModeButton = document.getElementById('toggleMode');
    const reduceMotionButton = document.getElementById('reduceMotion');
    const form = document.getElementById('petitionForm');
    const signatureList = document.querySelector('#signatureList ul');
    const signatureCountDisplay = document.getElementById('signatureCount');
    const modal = document.getElementById('thankYouModal');
    const closeModal = document.getElementById('closeModal');
    const modalMessage = document.getElementById('modalMessage');
    const modalImage = document.getElementById('modalImage');
    let signatureCount = 0; // Initialize signature count
  
    // Toggle between light and dark mode
    toggleModeButton.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      document.body.classList.toggle('light');
    });
  
    // Reduce motion button
    reduceMotionButton.addEventListener('click', () => {
      document.body.classList.toggle('reduce-motion');
      reduceMotionButton.textContent = document.body.classList.contains('reduce-motion') ? 'Enable Motion' : 'Reduce Motion: OFF';
    });
  
    // Form submission handler
    form.addEventListener('submit', (event) => {
      event.preventDefault();
  
      // Get form values
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
  
      // Validate name and email
      if (name === '' || !validateEmail(email)) {
        highlightInvalidFields(name, email);
        return;
      }
  
      // Add valid signature to the list
      const li = document.createElement('li');
      li.textContent = `${name} - ${message}`;
      li.classList.add('text-gray-900');
      signatureList.appendChild(li);
  
      // Update signature count
      signatureCount++;
      signatureCountDisplay.textContent = `Total Signatures: ${signatureCount}`;
  
      // Show thank you modal with animation
      modalMessage.textContent = `Thank you, ${name}, for your support!`;
      modal.classList.remove('hidden');
      //Show thank you with personalized message
      modalMessage.textContent = `Thank you, ${name}, for your support!`;
      
      // Animate the modal image
      modalImage.classList.remove('hidden');
      modalImage.classList.add('animated');
  
      // Hide modal after 5 seconds
      setTimeout(() => {
        modal.classList.add('hidden');
        modalImage.classList.remove('animated');
      }, 5000);
  
      // Clear form fields and remove any highlights
      form.reset();
      removeHighlights();
    });
  
    // Close modal manually
    closeModal.addEventListener('click', () => {
      modal.classList.add('hidden');
      modalImage.classList.remove('animated');
    });
  
    // Validate email format
    function validateEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }
  
    // Highlight invalid fields in red
    function highlightInvalidFields(name, email) {
      if (name === '') {
        document.getElementById('name').classList.add('invalid-input');
      }
      if (!validateEmail(email)) {
        document.getElementById('email').classList.add('invalid-input');
      }
    }
  
    // Remove highlights from all fields
    function removeHighlights() {
      document.getElementById('name').classList.remove('invalid-input');
      document.getElementById('email').classList.remove('invalid-input');
    }
  
    // Scroll animations for sections
    const sections = document.querySelectorAll('[data-scroll]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    }, { threshold: 0.1 });
  
    sections.forEach((section) => observer.observe(section));
  
    // Footer contact form submission handler
    const footerForm = document.getElementById('footerContactForm');
    footerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const footerName = document.getElementById('footerName').value.trim();
      const footerEmail = document.getElementById('footerEmail').value.trim();
      const footerMessage = document.getElementById('footerMessage').value.trim();
  
      if (!footerName || !footerEmail || !footerMessage) {
        alert('Please fill in all fields.');
        return;
      }
  
      alert('Thank you for reaching out! We will get back to you soon.');
      footerForm.reset();
    });
  });
  