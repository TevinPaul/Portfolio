document.addEventListener("DOMContentLoaded", () => {
  const menu = document.getElementById("mobile-menu");
  const menuIcon = document.querySelector(".menu-icon");
  const backArrow = document.querySelector(".back-arrow");
  const navlinks = document.querySelectorAll("#mobile-menu a");
  const sections = document.querySelectorAll("section");

  function toggleMenu() {
    menu.classList.toggle("active");
  }

  menuIcon.addEventListener("click", toggleMenu);
  backArrow.addEventListener("click", toggleMenu);

  navlinks.forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
    });
  });

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 60) {
        current = section.getAttribute("id");
      }
    });

    navlinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  });
});

document.querySelectorAll("img").forEach(img => {
  img.addEventListener("contextmenu", e => e.preventDefault());

  img.addEventListener("dragstart", e => e.preventDefault());
});


document.addEventListener("keydown", function (e) {
  if (e.ctrlKey && (e.key === "s" || e.key === "u")) {
    e.preventDefault();
  }
  if (e.ctrlKey && e.shiftKey && e.key === "I") {
    e.preventDefault();
  }
});

// skills blur

document.addEventListener('DOMContentLoaded', () => {
    const skills = document.querySelectorAll('.skills-container');
  
    skills.forEach(skill => {
      skill.addEventListener('mouseenter', () => {
        skills.forEach(s => {
          if (s !== skill) {
            s.classList.add('blurred');
          }
        });
      });
  
      skill.addEventListener('mouseleave', () => {
        skills.forEach(s => {
          s.classList.remove('blurred');
        });
      });
    });
  });

// home image blur

  document.addEventListener('DOMContentLoaded', () => {
    const homeImg = document.querySelector('.home-img');
    const bgLayer = document.querySelector('.bg-layer');
    const image = homeImg.querySelector('img');
  
    image.addEventListener('mouseenter', () => {
      bgLayer.classList.add('blurred');
    });
  
    image.addEventListener('mouseleave', () => {
      bgLayer.classList.remove('blurred');
    });
  });

// cybersecurity skills 

  document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".tab-btn");
  const sections = document.querySelectorAll(".whole-skills");

  buttons.forEach(button => {
    button.addEventListener("click", (event) => {
      const type = event.target.dataset.type;

      sections.forEach(sec => sec.classList.add("hidden"));

      document.getElementById(type).classList.remove("hidden");

      buttons.forEach(btn => btn.classList.remove("active"));

      event.target.classList.add("active");
    });
  });
});


  
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const answer = faqItem.querySelector('.faq-answer');

        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== faqItem) {
                item.classList.remove('active');
                item.querySelector('.faq-answer').style.maxHeight = null;
                item.querySelector('.faq-icon').style.transform = 'rotate(0deg)';
            }
        });

        const isActive = faqItem.classList.contains('active');
        if (isActive) {
            faqItem.classList.remove('active');
            answer.style.maxHeight = null;
            question.querySelector('.faq-icon').style.transform = 'rotate(0deg)';
        } else {
            faqItem.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + 'px';
            question.querySelector('.faq-icon').style.transform = 'rotate(180deg)';
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
  
    form.addEventListener("submit", function (e) {
      e.preventDefault(); 
  
      if (!form.checkValidity()) {
      
        form.reportValidity();
        return;
      }
  
      sendMail();
    });
  });
  
  function sendMail() {
    const templateParams = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    };
  
    emailjs.send("service_a4o56l4", "template_rywyx3e", templateParams)
      .then(function (response) {
    
        const successDiv = document.getElementById("successMessage");
          successDiv.style.display = "flex";
          successDiv.style.alignItems = "center";
          successDiv.style.justifyContent = "center";
          successDiv.style.gap = "10px";
          successDiv.style.padding = "15px";
  
        document.getElementById("contactForm").reset();
  
        setTimeout(() => {
          successDiv.style.display = "none";
        }, 20000);
      })
      .catch(function (error) {
        console.error("Email sending failed:", error);
      });
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelector('.view-cv').addEventListener('click', function (e) {
        flickerButton(this);
        window.open('resume.pdf', '_blank');
    });

    document.querySelector('.download-cv').addEventListener('click', function (e) {
        flickerButton(this);
        const link = document.createElement('a');
        link.href = 'resume.pdf';
        link.download = 'resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});
  

function flickerButton(button) {
    button.classList.remove('flicker');
    void button.offsetWidth;
    button.classList.add('flicker');
}  


function setupGallery(galleryId) {
    const gallery = document.getElementById(galleryId);
    const mainImage = gallery.querySelector(".main-image img");
    const thumbnails = gallery.querySelectorAll(".thumb");
    const counter = gallery.querySelector(".image-counter");
    const prevBtn = gallery.querySelector(".nav-arrow.left");
    const nextBtn = gallery.querySelector(".nav-arrow.right");
  
    let currentIndex = 0;
    let autoplayInterval;
    const FADE_MS = 200;
  
    function updateMainImage(index) {
      if (index === currentIndex) return;
      mainImage.classList.add("fade-out");
  
      setTimeout(() => {
        mainImage.src = thumbnails[index].src;
        counter.textContent = `${index + 1} / ${thumbnails.length}`;
        thumbnails.forEach((thumb, i) => {
          thumb.classList.toggle("active", i === index);
        });
        currentIndex = index;
        mainImage.classList.remove("fade-out");
      }, FADE_MS);
    }
  
    thumbnails.forEach((thumb, index) => {
      thumb.addEventListener("click", () => updateMainImage(index));
    });
  
    prevBtn.addEventListener("click", () => {
      const newIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
      updateMainImage(newIndex);
    });
  
    nextBtn.addEventListener("click", () => {
      const newIndex = (currentIndex + 1) % thumbnails.length;
      updateMainImage(newIndex);
    });
  
    function startAutoplay() {
      autoplayInterval = setInterval(() => {
        const next = (currentIndex + 1) % thumbnails.length;
        updateMainImage(next);
      }, 3000);
    }
  
    function stopAutoplay() {
      clearInterval(autoplayInterval);
    }
  
    gallery.addEventListener("mouseenter", stopAutoplay);
    gallery.addEventListener("mouseleave", startAutoplay);
  
    let touchStartX = 0;
    let touchEndX = 0;
  
    mainImage.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });
  
    mainImage.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const threshold = 50;
      if (touchEndX < touchStartX - threshold) {
        const next = (currentIndex + 1) % thumbnails.length;
        updateMainImage(next);
      } else if (touchEndX > touchStartX + threshold) {
        const prev = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
        updateMainImage(prev);
      }
    });
  
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = lightbox.querySelector(".lightbox-content");
    const closeBtn = lightbox.querySelector(".close-lightbox");
  
    mainImage.addEventListener("click", () => {
      lightbox.style.display = "flex";
      lightboxImage.src = mainImage.src;
    });
  
    closeBtn.addEventListener("click", () => {
      lightbox.style.display = "none";
    });
  
  
    updateMainImage(0);
    startAutoplay();
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    setupGallery("myGallery");
  });
  
document.addEventListener('DOMContentLoaded', () => {
  const containers = document.querySelectorAll('.cyber-container');

  containers.forEach(container => {
    const info = container.querySelector('.cyber-info');

    info.style.maxHeight = '0px';
    info.style.opacity = '0';

    function openInfo() {
      document.querySelectorAll('.cyber-container.active').forEach(other => {
        if (other !== container) {
          other.classList.remove('active');
          const otherInfo = other.querySelector('.cyber-info');
          if (otherInfo) {
           
            if (otherInfo.style.maxHeight === 'none') {
              otherInfo.style.maxHeight = otherInfo.scrollHeight + 'px';
            }
            
            otherInfo.offsetHeight;
            otherInfo.style.maxHeight = '0px';
            otherInfo.style.opacity = '0';
          }
        }
      });

      container.classList.add('active');
      info.style.maxHeight = info.scrollHeight + 'px';
      info.style.opacity = '1';

      const onEnd = (e) => {
        if (e.propertyName === 'max-height') {
          if (container.classList.contains('active')) {
            info.style.maxHeight = 'none';
          }
          info.removeEventListener('transitionend', onEnd);
        }
      };
      info.addEventListener('transitionend', onEnd);
    }

    function closeInfo() {
      container.classList.remove('active');

      if (info.style.maxHeight === 'none') {
        info.style.maxHeight = info.scrollHeight + 'px';
      }

      info.offsetHeight;
      info.style.maxHeight = '0px';
      info.style.opacity = '0';
    }

    container.addEventListener('click', (ev) => {
      if (ev.target.closest('a, button')) return;

      if (container.classList.contains('active')) {
        closeInfo();
      } else {
        openInfo();
      }
    });

    container.addEventListener('mouseenter', () => {
      if (!container.classList.contains('active')) {
        info.style.maxHeight = info.scrollHeight + 'px';
        info.style.opacity = '1';
      }
    });

    container.addEventListener('mouseleave', () => {
      if (!container.classList.contains('active')) {
        info.style.maxHeight = '0px';
        info.style.opacity = '0';
      }
    });
  });
});

GitHubCalendar("#github-graph", "TevinPaul", {
    responsive: true,
    summary_text: "Contributions in the last year"
});


setTimeout(() => {
  const days = document.querySelectorAll("#github-graph .ContributionCalendar-day");
  let total = 0;
  days.forEach(day => {
    const count = parseInt(day.getAttribute("data-level")) || 0;
    total += count;
  });

  const contribSpan = document.querySelector("#github-graph .contrib-number");
  if (contribSpan) contribSpan.textContent = `${total} total`;
}, 1000); 



setTimeout(() => {
  const days = document.querySelectorAll("#github-graph .ContributionCalendar-day");

  let total = 0;
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  days.forEach(day => {
    const level = parseInt(day.getAttribute("data-level")) || 0;
  
    total += level;

   
    if (level > 0) {
      tempStreak += 1;
      if (tempStreak > longestStreak) longestStreak = tempStreak;
    } else {
      tempStreak = 0;
    }
  });


  tempStreak = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    const level = parseInt(days[i].getAttribute("data-level")) || 0;
    if (level > 0) {
      tempStreak += 1;
    } else {
      break;
    }
  }
  currentStreak = tempStreak;

  const contribSpan = document.querySelector("#github-graph .contrib-number");
  if (contribSpan) contribSpan.textContent = `${total} total`;

  const longestSpan = document.querySelectorAll("#github-graph .contrib-column")[1].querySelector(".contrib-number");
  if (longestSpan) longestSpan.textContent = `${longestStreak} days`;

  const currentSpan = document.querySelectorAll("#github-graph .contrib-column")[2].querySelector(".contrib-number");
  if (currentSpan) currentSpan.textContent = `${currentStreak} days`;

}, 1000);


const wrapper = document.querySelector(".testimony-cont");
const items = document.querySelectorAll(".testimony");
const step = 360 / items.length;

let angle = 0;
let isPaused = false;
let speed = 0.4; 

function animate() {
  if (!isPaused) {
    angle -= speed;
    wrapper.style.transform = `rotateY(${angle}deg)`;
  }
  requestAnimationFrame(animate);
}

animate();

items.forEach(item => {
  item.addEventListener("mouseenter", () => { 
    isPaused = true; 
    wrapper.style.transform += " translateZ(0)";
  });

  item.addEventListener("mouseleave", () => { 
    isPaused = false; 
  });

  item.addEventListener("click", () => { 
    togglePause();
  });

  item.addEventListener("touchstart", (e) => { 
    e.preventDefault();
    togglePause();
  });
});

function togglePause() {
  if (isPaused) {
    isPaused = false; 
  } else {
    isPaused = true;
    wrapper.style.transform += " translateZ(0)";
  }
}


function animate() {
  if (!isPaused) {
    angle -= speed;
    wrapper.style.transform = `rotateY(${angle}deg)`;

    items.forEach((item, i) => {
      const itemAngle = (angle + i * step) % 360;
      const rad = itemAngle * Math.PI / 180;

      const depth = Math.cos(rad); 

      const blur = depth < 0 ? Math.abs(depth) * 4 : 0;

      const opacity = depth < 0 ? 0.5 : 1;

      item.style.transform = `rotateY(${i * step}deg) translateZ(400px)`;
      item.style.filter = `blur(${blur}px)`;
      item.style.opacity = opacity;
    });
  }
  requestAnimationFrame(animate);
}
