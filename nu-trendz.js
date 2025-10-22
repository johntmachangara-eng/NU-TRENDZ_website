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
  const floatingBookBtn = document.getElementById('floatingBookNow'); // Floating button
  const overlay = document.getElementById('bookingOverlay');
  const closeBtn = document.getElementById('closeBooking');
  const calendar = document.getElementById('calendar');
  const selectedDateInput = document.getElementById('selectedDate');
  const bookingForm = document.getElementById('bookingForm');
  const bookingsRef = db.ref('bookings');
  const today = new Date();
  let bookedDates = new Set();

  // ===== SHOW POPUP =====
  function openBookingPopup() {
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // prevent background scroll
  }

  // Main banner button opens popup
  if (bookNowBtn) {
    bookNowBtn.addEventListener('click', openBookingPopup);
  }

  // Floating button also opens popup
  if (floatingBookBtn) {
    floatingBookBtn.addEventListener('click', openBookingPopup);
  }

  // ===== CLOSE POPUP =====
  function closeBooking() {
    overlay.style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeBooking);
  }

  // Close when clicking outside modal
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeBooking();
  });

  // ===== FETCH EXISTING BOOKINGS =====
  bookingsRef.on('value', (snapshot) => {
    bookedDates.clear();
    snapshot.forEach((child) => {
      bookedDates.add(child.val().date);
    });
    generateCalendar();
  });

  // ===== GENERATE CALENDAR (next 30 days) =====
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

  // ===== SELECT DATE =====
  function selectDate(date, element) {
    document.querySelectorAll('.day').forEach(d => d.classList.remove('selected'));
    element.classList.add('selected');
    selectedDateInput.value = date;
  }

  // ===== SUBMIT BOOKING =====
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

    bookingsRef.push({
      name,
      email,
      phone,
      date,
      timestamp: new Date().toISOString()
    })
    .then(() => {
      alert("✅ Booking confirmed!");
      bookingForm.reset();
      selectedDateInput.value = '';
      closeBooking();
    })
    .catch((err) => console.error("Error saving booking:", err));
  });
});




// ==================== PORTFOLIO FLOATING SUBPAGE ====================
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".portfolio-item");
  const modal = document.getElementById("portfolioModal");
  const modalImage = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const modalList = document.getElementById("modalList");
  const closeBtn = document.querySelector(".close-modal");

  // === Service Information ===
  const services = {
    braids: {
      title: "Box Braids",
      desc: "Intricately woven box braids that protect and style your natural hair beautifully.",
      image: "IMAGES/hair-1.jpeg",
      includes: [
        "Consultation",
        "Parting & Sectioning",
        "Protective Braiding",
        "Finishing & Care Advice",
      ],
    },
    balayage: {
      title: "Balayage Blend",
      desc: "A seamless blend of soft highlights and natural tones that enhance your hair’s dimension.",
      image: "IMAGES/hair-2.jpeg",
      includes: [
        "Consultation",
        "Custom Color Application",
        "Toning",
        "Blow Dry & Style",
      ],
    },
    curly: {
      title: "Curly Volume",
      desc: "Defined curls that add bounce, shine, and confidence — perfect for everyday or events.",
      image: "IMAGES/hair-3.jpeg",
      includes: [
        "Hydration Treatment",
        "Curl Defining",
        "Diffused Drying",
        "Frizz Control Finish",
      ],
    },
    golden: {
      title: "Golden Curls",
      desc: "Rich golden tones and soft curls that glow with warmth and definition.",
      image: "IMAGES/hair-4.jpeg",
      includes: [
        "Wash & Treatment",
        "Curl Styling",
        "Shine Enhancer",
        "Finishing Touches",
      ],
    },
    cornrows: {
      title: "Creative Cornrows",
      desc: "Custom braided cornrow styles designed for individuality and flair.",
      image: "IMAGES/hair-5.jpeg",
      includes: [
        "Consultation",
        "Scalp Prep",
        "Cornrow Design",
        "Finishing Oil & Care",
      ],
    },
    straight: {
      title: "Sleek Straight",
      desc: "Smooth, glossy, straight hair with a healthy shine and long-lasting finish.",
      image: "IMAGES/hair-6.jpeg",
      includes: [
        "Wash & Blow Dry",
        "Heat Protectant",
        "Straightening",
        "Shine Serum Finish",
      ],
    },
  };

  // === Open Modal ===
  items.forEach((item) => {
    item.addEventListener("click", () => {
      const key = item.getAttribute("data-service");
      const s = services[key];
      if (!s) return;

      // Inject data
      modalImage.src = s.image;
      modalTitle.textContent = s.title;
      modalDesc.textContent = s.desc;
      modalList.innerHTML = s.includes.map((i) => `<li>${i}</li>`).join("");

      // Show modal
      modal.style.display = "flex";
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  // === Close Modal ===
  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  function closeModal() {
    modal.classList.remove("active");
    setTimeout(() => {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }, 300);
  }
});
