// Theme toggle, mobile menu, smooth active link, contact form handler
(function(){
  // DOM references
  const html = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const mobileButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const yearEl = document.getElementById('year');

  // Set year
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Theme initialization
  const stored = localStorage.getItem('theme');
  if(stored) {
    if(stored === 'dark') html.classList.add('dark'); else html.classList.remove('dark');
  } else {
    // default to light (no 'dark' class)
    html.classList.remove('dark');
  }

  function updateThemeIcon(){
    if(html.classList.contains('dark')){
      // show moon icon for dark
      themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>';
    } else {
      // show sun icon for light
      themeIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3v2M12 19v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 7a5 5 0 100 10 5 5 0 000-10z"/>';
    }
  }
  updateThemeIcon();

  themeToggle && themeToggle.addEventListener('click', ()=>{
    html.classList.toggle('dark');
    localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
    updateThemeIcon();
  });

  // Mobile Menu
  mobileButton && mobileButton.addEventListener('click', ()=>{
    mobileMenu.classList.toggle('hidden');
  });

  // Close mobile menu on link click
  document.querySelectorAll('#mobile-menu a').forEach(a=>a.addEventListener('click', ()=> mobileMenu.classList.add('hidden')));

  // Active nav highlighting via IntersectionObserver
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('nav a, #mobile-menu a');
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      const id = e.target.id;
      const link = document.querySelectorAll(`a[href="#${id}"]`);
      if(e.isIntersecting){
        link.forEach(l=>l.classList.add('text-teal-800'));
      } else {
        link.forEach(l=>l.classList.remove('text-teal-800'));
      }
    });
  }, {root:null, threshold:0.45});
  sections.forEach(s=>obs.observe(s));

  // Contact form handler: opens mailto with prefilled content as fallback
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');
  form && form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get('name')||'No name';
    const email = data.get('email')||'noemail@example.com';
    const subject = data.get('subject')||'Message from portfolio';
    const message = data.get('message')||'';

    const body = encodeURIComponent(`From: ${name} <${email}>\n\n${message}`);
    const mailto = `mailto:youremail@example.com?subject=${encodeURIComponent(subject)}&body=${body}`;

    // Try to open mail client
    window.location.href = mailto;

    // Show temporary feedback
    if(feedback){
      feedback.textContent = 'Mail client opened — or copy the text and send manually.';
      feedback.classList.remove('hidden');
      setTimeout(()=> feedback.classList.add('hidden'), 5000);
    }
    form.reset();
  });

})();
