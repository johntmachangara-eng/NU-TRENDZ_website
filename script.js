window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const floatingLogo = document.querySelector('.floating-logo');

    if (window.scrollY > 80) {
        navbar.classList.add('shrink');
        floatingLogo.classList.add('visible');
    } else {
        navbar.classList.remove('shrink');
        floatingLogo.classList.remove('visible');
    }
});
// Close mobile menu when a nav link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    const menuToggle = document.querySelector('#menu-toggle');
    if (menuToggle.checked) {
      menuToggle.checked = false;
    }
  });
});
// Smooth scrolling for anchor links