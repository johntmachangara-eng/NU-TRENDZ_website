// ====== SERVICE DATA ======
const servicesData = {
  "Featured": [
    { name: "Cornrows with Design", time: "1 hour", desc: "", price: "£30" },
    { name: "Wash Dry", time: "1 hour 30 mins", desc: "", price: "£20" },
    { name: "Dutch Braids", time: "1 hour", desc: "", price: "£30" },
    { name: "4 Cornrows Stitch", time: "1 hour", desc: "", price: "£25" },
    { name: "Box Braids / Twists with Extension", time: "3 hours", desc: "", price: "from £50" },
    { name: "Cornrows with Extension", time: "2 hours", desc: "", price: "from £30" }
  ],

  "Training": [
    { name: "Dread Locs Training", time: "12 hours", desc: "Learn different techniques of how to start locs and locs maintenance in 5 days. Includes comb twist, instant locs, retwist, interlocking, palm twist. Level 1 certificate included.", price: "£600" },
    { name: "Individual Hairstyle", time: "5 hours", desc: "1-day training for an individual hairstyle you choose: Knotless, goddess, twist, box braids, cornrows, weave. Level 1 certificate included.", price: "£150" },
    { name: "Level 1 – Sew-in Weave Extensions", time: "12 hours", desc: "2-day course (10:30–15:30). Learn cornrows, weave weft, closure, full-head weave. Level 1 certificate included.", price: "£200" },
    { name: "Level 1 – Afro Hair Maintenance", time: "12 hours", desc: "3-day course (10:30–15:30). Hair treatments, deep conditioning, hot-oil, trimming, detangling, curl definition, and product knowledge.", price: "£300" },
    { name: "Level 1 – Braiding Hair Extension", time: "12 hours", desc: "5-day training (10:30–15:30). Learn box braids, knotless, cornrows, twists. Level 1 certificate included.", price: "£500" }
  ],

  "Extras": [
    { name: "Pre-Stretch Hair Extensions", time: "35 mins", desc: "Pre-stretch the hair extensions before braiding.", price: "£10" },
    { name: "Beads", time: "35 mins", desc: "", price: "from £10" },
    { name: "Mixing Hair Colors (Extensions)", time: "35 mins", desc: "", price: "£10" },
    { name: "Detangling", time: "40 mins", desc: "", price: "from £10" }
  ],

  "Locs": [
    { name: "Wash Dry", time: "1 hour 30 mins", desc: "", price: "£20" },
    { name: "Detox", time: "2 hours", desc: "Deep-cleaning soak with clay and apple cider vinegar to remove buildup.", price: "£35" },
    { name: "Micro Loc", time: "10 hours", desc: "", price: "from £250" },
    { name: "Micro Loc Extension", time: "12 hours", desc: "", price: "from £300" },
    { name: "Instant Loc Extension", time: "7 hours", desc: "", price: "from £200" },
    { name: "Interlocking Sister Locs", time: "4 hours", desc: "", price: "from £90" },
    { name: "Interlocking", time: "3 hours", desc: "", price: "from £60" },
    { name: "Retwist", time: "2 hours", desc: "", price: "from £50" },
    { name: "Sister Locs", time: "6 hours", desc: "", price: "from £180" },
    { name: "Comb Coil", time: "2 hours", desc: "Sections twisted tightly with a comb to form coils.", price: "from £40" },
    { name: "Instant Locking", time: "5 hours", desc: "Crochet-tool technique to form mature-looking locs instantly.", price: "from £150" }
  ],

  "Kids": [
    { name: "Treatment", time: "1 hour", desc: "", price: "£30" },
    { name: "Comb Twist", time: "1 hour", desc: "", price: "£35" },
    { name: "Instant Loc", time: "4 hours", desc: "", price: "£80" },
    { name: "Interlocking", time: "1 hour", desc: "", price: "£45" },
    { name: "Retwist", time: "1 hour", desc: "", price: "£35" },
    { name: "Hair Cut", time: "1 hour", desc: "", price: "from £10" },
    { name: "Box Braids / Twists with Extension", time: "3 hours", desc: "", price: "from £50" },
    { name: "Cornrows with Extension", time: "2 hours", desc: "", price: "from £30" }
  ],

  "Natural Hair": [
    { name: "Barrel Cornrows", time: "2 h 45 m", desc: "", price: "£50" },
    { name: "Two Strand Twist", time: "2 h 30 m", desc: "", price: "£40" },
    { name: "Box Braids / Twists Undercut", time: "1 h 5 m", desc: "", price: "£35" },
    { name: "Braided Ponytail", time: "2 hours", desc: "Price depends on thickness.", price: "from £30" },
    { name: "4 Cornrows Stitch", time: "1 hour", desc: "", price: "£25" },
    { name: "Cornrows with Design", time: "1 hour", desc: "", price: "£30" },
    { name: "Twists", time: "2 hours", desc: "", price: "£40" },
    { name: "Box Braids", time: "1 hour", desc: "", price: "£40" }
  ],

  "Cornrows": [
    { name: "Braided Ponytail", time: "3 hours", desc: "", price: "from £50" },
    { name: "Cornrows Under Wig", time: "1 hour", desc: "", price: "£20" },
    { name: "Cornrows with Design", time: "3 hours", desc: "", price: "from £60" },
    { name: "Stitch Cornrows", time: "2 hours", desc: "", price: "from £50" },
    { name: "Dutch Braids", time: "1 hour", desc: "", price: "£30" }
  ],

  "Box Braids": [
    { name: "Pick & Drop", time: "5 hours", desc: "", price: "£75" },
    { name: "Kinky Twist", time: "5 hours", desc: "Twists with kinky hair extensions.", price: "from £80" },
    { name: "Coi Leray Type Braids", time: "3 hours", desc: "Box braids with curly crochet.", price: "from £55" },
    { name: "Island Twist", time: "5 hours", desc: "Twists with curly crochet.", price: "from £75" },
    { name: "Passion Twists", time: "3 hours", desc: "", price: "from £70" },
    { name: "Twist", time: "4 hours", desc: "Twists with extensions added.", price: "from £70" },
    { name: "Goddess Box Braids", time: "5 h 30 m", desc: "Curls fed into the braid.", price: "from £75" },
    { name: "Box Braids", time: "5 hours", desc: "Price depends on length & thickness.", price: "from £70" }
  ],

  "Knotless Braids": [
    { name: "Bum Length Knotless", time: "5 h 30 m", desc: "", price: "from £120" },
    { name: "Waist Length Knotless", time: "5 hours", desc: "", price: "from £105" },
    { name: "Mid Back Knotless", time: "4 hours", desc: "", price: "from £95" },
    { name: "French Curls", time: "5 hours", desc: "", price: "from £85" },
    { name: "Coi Leray Type Braids", time: "3 h 15 m", desc: "", price: "from £50" },
    { name: "Shoulder Knotless Braids Goddess", time: "5 hours", desc: "Curls added.", price: "from £90" },
    { name: "Knotless Braids", time: "4 hours", desc: "Price depends on thickness and length.", price: "from £85" }
  ],

  "Fulani Braids": [
    { name: "Flip Fulani", time: "5 hours", desc: "", price: "£85" },
    { name: "Fulani Crochet", time: "3 h 30 m", desc: "", price: "from £65" },
    { name: "Fulani Weave", time: "3 hours", desc: "Fulani with weave at the back.", price: "£60" },
    { name: "Fulani Goddess", time: "4 hours", desc: "Curls fed into the braid; price varies with style.", price: "from £75" },
    { name: "Fulani Knotless", time: "4 hours", desc: "Knotless braids at the back.", price: "from £70" },
    { name: "Fulani Box Braids", time: "3 hours", desc: "Normal box braids; price depends on length and thickness.", price: "from £65" }
  ],

  "Crochet": [
    { name: "Wrap Crochet", time: "4 h 30 m", desc: "Faux locs, butterfly locs.", price: "from £80" },
    { name: "Faux Locs Individual", time: "4 h 30 m", desc: "Single plaits into faux locs.", price: "from £75" },
    { name: "Micro Crochet", time: "3 h 30 m", desc: "Curly crochet.", price: "£70" },
    { name: "Crochet", time: "2 h 30 m", desc: "Box braids, twist, faux locs.", price: "£50" }
  ],

  "Wig": [
    { name: "Wig Styling / Cut / Straight / Wash", time: "1 hour", desc: "", price: "from £20" },
    { name: "Sew In Wig", time: "1 hour", desc: "", price: "£30" },
    { name: "Fit Wig (No Glue, Cornrows Included)", time: "1 hour", desc: "", price: "£25" },
    { name: "Glue On", time: "3 hours", desc: "Cornrows included.", price: "£60" }
  ],

  "Weave": [
    { name: "Flip Over Weave", time: "1 hour", desc: "", price: "£75" },
    { name: "Full Head Weave", time: "3 h 30 m", desc: "", price: "£80" },
    { name: "LA Weave / Invisible", time: "3 h 45 m", desc: "", price: "£80" },
    { name: "Rows", time: "1 h 30 m", desc: "", price: "£50" },
    { name: "Weave with Leave Out (Straight)", time: "3 hours", desc: "", price: "£70" },
    { name: "Weave with Leave Out (Curl)", time: "2 hours", desc: "", price: "£60" },
    { name: "Weave with Closure (Straight)", time: "3 hours", desc: "", price: "£75" },
    { name: "Weave with Closure (Curls)", time: "3 hours", desc: "", price: "£65" }
  ],

  "Hair & Styling": [
    { name: "Sleek Ponytail Weave", time: "3 hours", desc: "Sleek ponytail using weave in the ponytail.", price: "£50" },
    { name: "Sleek Ponytail (Type 1, 2, 3)", time: "1 hour", desc: "Natural hair or one braid ponytail.", price: "£40" },
    { name: "Sleek Ponytail (Type 4)", time: "2 h 45 m", desc: "Includes shampoo, conditioning, and silk press.", price: "£40" },
    { name: "Blow Dry / GHD Straightening", time: "1 h 30 m", desc: "Blow dry and flat iron.", price: "£30" },
    { name: "Silk Press", time: "3 hours", desc: "Non-chemical straightening for curly or coarse hair.", price: "from £60" },
    { name: "Relax and Style", time: "2 hours", desc: "Permanent straightening chemical process.", price: "£40" },
    { name: "Perm / Curls", time: "3 hours", desc: "Price depends on length.", price: "from £60" },
    { name: "Hot Oil Treatment", time: "30 mins", desc: "Stimulates scalp and hair growth through oil massage.", price: "£35" }
  ]
};

// ====== ELEMENTS ======
const container = document.getElementById("service-container");
const categoryBtns = document.querySelectorAll(".category");
const searchInput = document.getElementById("serviceSearch");
const scrollContainer = document.querySelector(".categories");
const leftArrow = document.getElementById("scrollLeft");
const rightArrow = document.getElementById("scrollRight");

// ====== ANIMATION ======
function fadeContainer() {
  container.style.opacity = 0;
  setTimeout(() => {
    container.style.opacity = 1;
  }, 150);
}

// ====== LOAD SERVICES ======
function loadServices(category) {
  fadeContainer();
  container.innerHTML = "";

  const list = servicesData[category] || [];
  if (!list.length) {
    container.innerHTML = `<p class="no-services">No services available for ${category}.</p>`;
    return;
  }

  list.forEach(s => {
    const card = document.createElement("div");
    card.className = "service-card";
    card.innerHTML = `
      <h3>${s.name}</h3>
      <p class="service-time">${s.time}</p>
      ${s.desc ? `<p class="service-desc">${s.desc}</p>` : ""}
      <p class="service-price">${s.price}</p>
      <a href="booking.html"><button class="book-btn">Book Now</button></a>
    `;
    container.appendChild(card);
  });
}

// ====== CATEGORY SWITCH ======
categoryBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const active = document.querySelector(".category.active");
    if (active) active.classList.remove("active");
    btn.classList.add("active");
    searchInput.value = "";
    loadServices(btn.dataset.category);
    btn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  });
});

// ====== SEARCH FUNCTION ======
searchInput.addEventListener("input", e => {
  const term = e.target.value.toLowerCase();
  document.querySelectorAll(".service-card").forEach(card => {
    const title = card.querySelector("h3").textContent.toLowerCase();
    const desc = card.querySelector(".service-desc")?.textContent.toLowerCase() || "";
    card.style.display = title.includes(term) || desc.includes(term) ? "flex" : "none";
  });
});

// ====== SCROLL ARROWS ======
function updateArrows() {
  const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
  leftArrow.classList.toggle("hidden", scrollContainer.scrollLeft <= 0);
  rightArrow.classList.toggle("hidden", scrollContainer.scrollLeft >= maxScroll - 5);
}

scrollContainer.addEventListener("scroll", updateArrows);
window.addEventListener("resize", updateArrows);

// ====== NEXT & PREVIOUS ONE-BY-ONE ======
function scrollCategory(direction) {
  const categories = Array.from(scrollContainer.querySelectorAll(".category"));
  const active = document.querySelector(".category.active") || categories[0];
  const currentIndex = categories.indexOf(active);

  // Calculate next index
  let newIndex = currentIndex + direction;
  if (newIndex < 0) newIndex = 0;
  if (newIndex >= categories.length) newIndex = categories.length - 1;

  // Set active class
  if (active) active.classList.remove("active");
  const nextBtn = categories[newIndex];
  nextBtn.classList.add("active");

  // Center the next category smoothly
  nextBtn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });

  // Load its services
  loadServices(nextBtn.dataset.category);
}

leftArrow.onclick = () => scrollCategory(-1);  // previous
rightArrow.onclick = () => scrollCategory(1);  // next


// ====== INITIALIZE ======
loadServices("Featured"); // matches the exact key in your data
updateArrows();




