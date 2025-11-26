const words = ["Designer", "Developer"];
let current = 0;
let isDeleting = false;
let text = "";
const typingSpeed = 150;
const deletingSpeed = 100;
const pause = 1000;
const typingElement = document.getElementById("typing");

function type() {
    const fullText = words[current];
    
    if (!isDeleting) {
        text = fullText.substring(0, text.length + 1);
    } else {
        text = fullText.substring(0, text.length - 1);
    }

    typingElement.textContent = text;

    let delay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && text === fullText) {
        delay = pause;
        isDeleting = true;
    } else if (isDeleting && text === "") {
        isDeleting = false;
        current = (current + 1) % words.length;
        delay = 500;
    }

    setTimeout(type, delay);
}


type();

// COUNTERS
const counters = document.querySelectorAll('.details h3');
let countersStarted = false;
function startCounters() {
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const increment = target / 200;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        requestAnimationFrame(updateCount);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
}

window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section, header');  
  const navLinks = document.querySelectorAll('.nav-link');
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150; 
    const sectionHeight = section.offsetHeight;
    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });

  const statsSection = document.querySelector('.details'); 
  if (statsSection) {
    const sectionTop = statsSection.offsetTop - window.innerHeight + 100;
    if (pageYOffset > sectionTop && !countersStarted) {
      startCounters();
      countersStarted = true;
    }
  }
});
