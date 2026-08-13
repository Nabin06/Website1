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
    // default to dark
    html.classList.add('dark');
  }

  function updateThemeIcon(){
    if(html.classList.contains('dark')){
      themeIcon.innerHTML = '<path d="M10 2a.75.75 0 01.75.75V4a.75.75 0 01-1.5 0V2.75A.75.75 0 0110 2zM4.22 4.22a.75.75 0 011.06 0L6.5 5.44a.75.75 0 11-1.06 1.06L4.22 5.28a.75.75 0 010-1.06zM2 10a.75.75 0 01.75-.75H4a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm8 6a.75.75 0 01.75.75V18a.75.75 0 01-1.5 0v-1.25A.75.75 0 0110 16zM15.78 15.78a.75.75 0 011.06 1.06l-1.22 1.22a.75.75 0 11-1.06-1.06l1.22-1.22zM16 10a.75.75 0 01.75-.75H18a.75.75 0 010 1.5h-1.25A.75.75 0 0116 10zM6.5 14.56a.75.75 0 111.06-1.06l1.22 1.22a.75.75 0 11-1.06 1.06l-1.22-1.22z"/>';
    } else {
      themeIcon.innerHTML = '<path fill-rule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16z" clip-rule="evenodd"/>';
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
        link.forEach(l=>l.classList.add('text-indigo-300'));
      } else {
        link.forEach(l=>l.classList.remove('text-indigo-300'));
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
