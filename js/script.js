document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("nav ul");
  menuToggle.addEventListener("click", function () {
    nav.classList.toggle("active");
    menuToggle.classList.toggle("active");
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: "smooth",
        });
        if (nav.classList.contains("active")) {
          nav.classList.remove("active");
          menuToggle.classList.remove("active");
        }
      }
    });
  });
  const currentPage = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll("nav ul li a");

  navLinks.forEach((link) => {
    const linkHref = link.getAttribute("href");
    if (linkHref === currentPage) {
      link.classList.add("active");
    }
  });

  if (window.innerWidth < 768) {
    const newsContainer = document.querySelector(".news-container");
    let isDown = false;
    let startX;
    let scrollLeft;

    newsContainer.addEventListener("mousedown", (e) => {
      isDown = true;
      startX = e.pageX - newsContainer.offsetLeft;
      scrollLeft = newsContainer.scrollLeft;
    });

    newsContainer.addEventListener("mouseleave", () => {
      isDown = false;
    });

    newsContainer.addEventListener("mouseup", () => {
      isDown = false;
    });

    newsContainer.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - newsContainer.offsetLeft;
      const walk = (x - startX) * 2;
      newsContainer.scrollLeft = scrollLeft - walk;
    });
  }
});
document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            item.classList.toggle('active');
        });
    });
    
    const admissionsForm = document.getElementById('admissions-form');
    if (admissionsForm) {
        admissionsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your application! We will contact you shortly.');
            this.reset();
        });
    }
});
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.calendar-grid')) {
        const calendarGrid = document.querySelector('.calendar-grid');
        const currentMonthElement = document.getElementById('current-month');
        const prevMonthBtn = document.getElementById('prev-month');
        const nextMonthBtn = document.getElementById('next-month');
        
        let currentDate = new Date();
        let currentMonth = currentDate.getMonth();
        let currentYear = currentDate.getFullYear();
        
        const events = [
            { date: new Date(2025, 4, 15), title: "Science Fair" },
            { date: new Date(2025, 4, 20), title: "Parent-Teacher Conferences" },
            { date: new Date(2025, 4, 25), title: "Cultural Day" },
            { date: new Date(2025, 4, 10), title: "Sports Day" }
        ];
        
        function renderCalendar() {
            currentMonthElement.textContent = new Date(currentYear, currentMonth).toLocaleString('default', { 
                month: 'long', 
                year: 'numeric' 
            });
            
            calendarGrid.innerHTML = '';
            
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            days.forEach(day => {
                const dayElement = document.createElement('div');
                dayElement.classList.add('calendar-header');
                dayElement.textContent = day;
                calendarGrid.appendChild(dayElement);
            });
            
            const firstDay = new Date(currentYear, currentMonth, 1).getDay();
            const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
            
            const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
            
            for (let i = 0; i < firstDay; i++) {
                const emptyDay = document.createElement('div');
                emptyDay.classList.add('calendar-day', 'empty');
                calendarGrid.appendChild(emptyDay);
            }
            
            const today = new Date();
            for (let i = 1; i <= daysInMonth; i++) {
                const dayElement = document.createElement('div');
                dayElement.classList.add('calendar-day');
                
                if (i === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
                    dayElement.classList.add('today');
                }
                const dayNumber = document.createElement('div');
                dayNumber.classList.add('calendar-day-number');
                dayNumber.textContent = i;
                dayElement.appendChild(dayNumber);
                
                const dayEvents = events.filter(event => 
                    event.date.getDate() === i && 
                    event.date.getMonth() === currentMonth && 
                    event.date.getFullYear() === currentYear
                );
                
                if (dayEvents.length > 0) {
                    dayElement.classList.add('has-event');
                    const eventIndicator = document.createElement('div');
                    eventIndicator.classList.add('calendar-event-indicator');
                    eventIndicator.textContent = `${dayEvents.length} event${dayEvents.length > 1 ? 's' : ''}`;
                    dayElement.appendChild(eventIndicator);
                }
                
                calendarGrid.appendChild(dayElement);
            }
        }
        renderCalendar();
        
        prevMonthBtn.addEventListener('click', function() {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            renderCalendar();
        });
        
        nextMonthBtn.addEventListener('click', function() {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            renderCalendar();
        });
    }
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            alert(`Thank you for subscribing with ${emailInput.value}!`);
            emailInput.value = '';
        });
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('#name').value;
            const email = this.querySelector('#email').value;
            const subject = this.querySelector('#subject').value;
            alert(`Thank you, ${name}! Your message about ${subject} has been sent. We'll respond to ${email} shortly.`);
            this.reset();
        });
    }
});