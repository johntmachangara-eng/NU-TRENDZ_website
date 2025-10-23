// ==================== MAIN INITIALIZER ====================
document.addEventListener('DOMContentLoaded', () => {
  if (typeof db === 'undefined') {
    console.error("Firebase database not initialized. Please ensure Firebase is loaded before this script.");
    return;
  }

  initTestimonials();
  initContactForm();
  initBookingCalendar();
  initBookingModal();
  initFloatingButton();
});


 document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".portfolio-item");
    const modal = document.getElementById("portfolioModal");
    const modalImage = document.getElementById("modalImage");
    const modalTitle = document.getElementById("modalTitle");
    const modalDesc = document.getElementById("modalDesc");
    const modalList = document.getElementById("modalList");
    const closeModal = document.querySelector(".close-modal");

    const services = {
      braids: {
        title: "Box Braids",
        desc: "Intricately woven box braids that protect and style your natural hair beautifully.",
        image: "IMAGES/hair-1.jpeg",
        includes: ["Consultation", "Parting & Sectioning", "Protective Braiding", "Finishing & Care Advice"],
      },
      balayage: {
        title: "Balayage Blend",
        desc: "A seamless blend of soft highlights and natural tones that enhance your hair’s dimension.",
        image: "IMAGES/hair-2.jpeg",
        includes: ["Consultation", "Custom Color Application", "Toning", "Blow Dry & Style"],
      },
      curly: {
        title: "Curly Volume",
        desc: "Defined curls that add bounce, shine, and confidence — perfect for everyday or events.",
        image: "IMAGES/hair-3.jpeg",
        includes: ["Hydration Treatment", "Curl Defining", "Diffused Drying", "Frizz Control Finish"],
      },
      golden: {
        title: "Golden Curls",
        desc: "Rich golden tones and soft curls that glow with warmth and definition.",
        image: "IMAGES/hair-4.jpeg",
        includes: ["Wash & Treatment", "Curl Styling", "Shine Enhancer", "Finishing Touches"],
      },
      cornrows: {
        title: "Creative Cornrows",
        desc: "Custom braided cornrow styles designed for individuality and flair.",
        image: "IMAGES/hair-5.jpeg",
        includes: ["Consultation", "Scalp Prep", "Cornrow Design", "Finishing Oil & Care"],
      },
      straight: {
        title: "Sleek Straight",
        desc: "Smooth, glossy, straight hair with a healthy shine and long-lasting finish.",
        image: "IMAGES/hair-6.jpeg",
        includes: ["Wash & Blow Dry", "Heat Protectant", "Straightening", "Shine Serum Finish"],
      },
    };

    items.forEach(item => {
      item.addEventListener("click", () => {
        const key = item.dataset.service;
        const s = services[key];
        modalImage.src = s.image;
        modalTitle.textContent = s.title;
        modalDesc.textContent = s.desc;
        modalList.innerHTML = s.includes.map(i => `<li>${i}</li>`).join("");
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
      });
    });

    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    });

    modal.addEventListener("click", e => {
      if (e.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });
  });


// ==================== TESTIMONIALS ====================
function initTestimonials() {
  const form = document.getElementById('testimonialForm');
  const testimonialCards = document.getElementById('testimonialCards');
  const toggleBtn = document.getElementById('toggleReviews');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name')?.value.trim();
      const message = document.getElementById('message')?.value.trim();

      if (!name || !message) {
        alert("Please fill in both fields before submitting.");
        return;
      }

      db.ref('testimonials').push({ name, message })
        .then(() => {
          form.reset();
          form.insertAdjacentHTML('beforeend', '<p class="success-msg" aria-live="polite">✅ Thank you for your review!</p>');
          setTimeout(() => document.querySelector('.success-msg')?.remove(), 3000);
        })
        .catch(err => console.error("Error saving testimonial:", err));
    });
  }

  if (testimonialCards && db) {
    db.ref('testimonials').on('value', (snapshot) => {
      testimonialCards.innerHTML = '';
      snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.val();
        testimonialCards.innerHTML += `
          <div class="testimonial-card">
            <p class="testimonial-text">"${escapeHTML(data.message)}"</p>
            <h3 class="client-name">– ${escapeHTML(data.name)}</h3>
          </div>
        `;
      });
    });
  }

  if (toggleBtn && testimonialCards) {
    toggleBtn.addEventListener('click', () => {
      const isHidden = testimonialCards.classList.contains('hidden');
      testimonialCards.classList.toggle('hidden', !isHidden);
      testimonialCards.classList.toggle('show', isHidden);
      toggleBtn.textContent = isHidden ? "Hide Reviews" : "Show Reviews";
    });
  }
}

// ==================== CONTACT FORM ====================
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    if (!name || !email || !message) {
      alert("⚠️ Please fill out all fields before sending.");
      return;
    }

    db.ref('contactMessages').push({
      name, email, message,
      timestamp: new Date().toISOString()
    })
    .then(() => {
      alert("✅ Thank you! Your message has been sent successfully.");
      contactForm.reset();
    })
    .catch((error) => {
      console.error("Error saving message:", error);
      alert("❌ Sorry, something went wrong. Please try again later.");
    });
  });
}

// ==================== BOOKING CALENDAR ====================
function initBookingCalendar() {
  const calendar = document.getElementById('calendar');
  const selectedDateInput = document.getElementById('selectedDate');
  const bookingForm = document.getElementById('bookingForm');
  if (!calendar || !bookingForm) return;

  const today = new Date();
  const bookingsRef = db.ref('bookings');
  let bookedDates = new Set();
  let renderTimeout;

  bookingsRef.on('value', (snapshot) => {
    clearTimeout(renderTimeout);
    renderTimeout = setTimeout(() => {
      bookedDates = new Set(Object.values(snapshot.val() || {}).map(b => b.date));
      generateCalendar();
    }, 300);
  });

  function generateCalendar() {
    calendar.innerHTML = '<h3>Next 30 Days</h3><div class="calendar-grid"></div>';
    const grid = calendar.querySelector('.calendar-grid');

    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const formatted = date.toISOString().split('T')[0];

      const div = document.createElement('div');
      div.classList.add('day');
      div.tabIndex = 0;
      div.textContent = date.getDate();

      if (bookedDates.has(formatted)) {
        div.classList.add('unavailable');
      } else {
        div.classList.add('available');
        div.addEventListener('click', () => selectDate(formatted, div));
        div.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') selectDate(formatted, div);
        });
      }
      grid.appendChild(div);
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
      alert("⚠️ Please fill in all fields and select a date.");
      return;
    }

    if (bookedDates.has(date)) {
      alert("❌ Sorry, that date is already booked.");
      return;
    }

    bookingsRef.push({ name, email, phone, date, timestamp: new Date().toISOString() })
      .then(() => {
        alert("✅ Booking confirmed!");
        bookingForm.reset();
        selectedDateInput.value = '';
        generateCalendar();
      })
      .catch(err => {
        console.error("Error saving booking:", err);
        alert("❌ Something went wrong. Please try again later.");
      });
  });
}

// ==================== BOOKING MODAL POPUP ====================
function initBookingModal() {
  const floatingBtn = document.getElementById('floatingBookBtn');
  const overlay = document.getElementById('bookingOverlay');
  const closeBtn = document.getElementById('closeBooking');
  if (!floatingBtn || !overlay) return;

  floatingBtn.addEventListener('click', () => {
    overlay.classList.remove('hidden');
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  });

  closeBtn?.addEventListener('click', () => closeModal());
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });

  function closeModal() {
    overlay.classList.add('hidden');
    overlay.classList.remove('show');
    document.body.style.overflow = 'auto';
  }
}

// ==================== FLOATING BOOK NOW BUTTON ====================
function initFloatingButton() {
  window.addEventListener('scroll', () => {
    const floatingBtn = document.getElementById('floatingBookBtn');
    if (!floatingBtn) return;
    const show = window.scrollY > 300;
    floatingBtn.style.opacity = show ? '1' : '0';
    floatingBtn.style.visibility = show ? 'visible' : 'hidden';
  });
}

// ==================== HELPER: SANITIZE HTML ====================
function escapeHTML(str) {
  return str.replace(/[&<>"']/g, (m) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]
  ));
}
