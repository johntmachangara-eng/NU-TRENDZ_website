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










// ================= CONTACT FORM BACKEND =================
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const message = document.getElementById('contactMessage').value.trim();

      if (!name || !email || !message) {
        alert("Please fill out all fields before sending.");
        return;
      }

      // ✅ Store data in Firebase Realtime Database
      db.ref('contactMessages').push({
        name,
        email,
        message,
        timestamp: new Date().toISOString()
      })
      .then(() => {
        alert("✅ Thank you! Your message has been recorded successfully.");
        contactForm.reset();
      })
      .catch((error) => {
        console.error("Error saving message:", error);
        alert("❌ Sorry, something went wrong. Please try again later.");
      });
    });
  }
});









// ==================== BOOK NOW POPUP ====================
document.addEventListener('DOMContentLoaded', () => {
  const bookNowBtn = document.querySelector('.fp_content button');
  const overlay = document.getElementById('bookingOverlay');
  const closeBtn = document.getElementById('closeBooking');
  const calendar = document.getElementById('calendar');
  const selectedDateInput = document.getElementById('selectedDate');
  const bookingForm = document.getElementById('bookingForm');
  const bookingsRef = db.ref('bookings');
  const today = new Date();
  let bookedDates = new Set();

  // Show popup
  bookNowBtn.addEventListener('click', () => {
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // prevent background scroll
  });

  // Close popup
  closeBtn.addEventListener('click', closeBooking);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeBooking();
  });

  function closeBooking() {
    overlay.style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  // Fetch booked dates
  bookingsRef.on('value', (snapshot) => {
    bookedDates.clear();
    snapshot.forEach((child) => {
      bookedDates.add(child.val().date);
    });
    generateCalendar();
  });

  // Create calendar for next 30 days
  function generateCalendar() {
    calendar.innerHTML = '';
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const formatted = date.toISOString().split('T')[0];
      const div = document.createElement('div');
      div.classList.add('day');

      if (bookedDates.has(formatted)) {
        div.classList.add('unavailable');
      } else {
        div.classList.add('available');
        div.addEventListener('click', () => selectDate(formatted, div));
      }

      div.textContent = date.getDate();
      calendar.appendChild(div);
    }
  }

  function selectDate(date, element) {
    document.querySelectorAll('.day').forEach(d => d.classList.remove('selected'));
    element.classList.add('selected');
    selectedDateInput.value = date;
  }

  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('bookName').value.trim();
    const email = document.getElementById('bookEmail').value.trim();
    const phone = document.getElementById('bookPhone').value.trim();
    const date = selectedDateInput.value.trim();

    if (!name || !email || !phone || !date) {
      alert("Please fill in all fields and select a date.");
      return;
    }

    if (bookedDates.has(date)) {
      alert("Sorry, that date is already booked.");
      return;
    }

    bookingsRef.push({ name, email, phone, date, timestamp: new Date().toISOString() })
      .then(() => {
        alert("✅ Booking confirmed!");
        bookingForm.reset();
        selectedDateInput.value = '';
        closeBooking();
      })
      .catch((err) => console.error("Error saving booking:", err));
  });
});
