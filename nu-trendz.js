// nu-trendz.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('testimonialForm');
  const testimonialCards = document.getElementById('testimonialCards');

  if (!db) {
    console.error('Firebase database is not initialized.');
    return;
  }

  // Add sample reviews if database is empty
  db.ref('testimonials').once('value', (snapshot) => {
    if (!snapshot.exists()) {
      db.ref('testimonials').push({ name: "Alice", message: "Absolutely loved my haircut!" });
      db.ref('testimonials').push({ name: "Liam", message: "Staff were friendly and professional." });
      db.ref('testimonials').push({ name: "Mia", message: "Best salon experience in town!" });
    }
  });

  // Handle form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !message) {
      alert("Please fill out all fields.");
      return;
    }

    db.ref('testimonials').push({
      name,
      message,
      timestamp: Date.now()
    });

    alert("✅ Thank you for your review!");
    form.reset();
  });

  // Fetch and display testimonials
  db.ref('testimonials').on('value', (snapshot) => {
    testimonialCards.innerHTML = '';
    const reviews = [];

    snapshot.forEach((childSnapshot) => {
      reviews.push(childSnapshot.val());
    });

    reviews.reverse().forEach((data) => {
      testimonialCards.innerHTML += `
        <div class="testimonial-card">
          <p class="testimonial-text">"${data.message}"</p>
          <h3 class="client-name">– ${data.name}</h3>
        </div>
      `;
    });
  });
});

// Toggle show/hide reviews
const toggleBtn = document.getElementById('toggleReviews');
const testimonialCards = document.getElementById('testimonialCards');

toggleBtn.addEventListener('click', () => {
  const isHidden = testimonialCards.classList.contains('hidden');

  if (isHidden) {
    testimonialCards.classList.remove('hidden');
    testimonialCards.classList.add('show');
    toggleBtn.textContent = "Hide Reviews";
  } else {
    testimonialCards.classList.add('hidden');
    testimonialCards.classList.remove('show');
    toggleBtn.textContent = "Show Reviews";
  }
});
