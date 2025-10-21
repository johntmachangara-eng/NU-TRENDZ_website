const services = document.querySelectorAll('.single-service');

services.forEach(service => {
service.addEventListener('click', () => {
const overlay = service.querySelector('.overlay');
const desc = service.querySelector('.portfolio-desc');
overlay.style.opacity = overlay.style.opacity === '1' ? '0' : '1';
desc.style.opacity = desc.style.opacity === '1' ? '0' : '1';
});
});

