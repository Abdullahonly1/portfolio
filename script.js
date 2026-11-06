(function () {
  var root = document.documentElement;
  try { var t = localStorage.getItem('theme'); if (t) root.setAttribute('data-theme', t); } catch (e) {}
  document.getElementById('theme').addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  var burger = document.getElementById('burger'), menu = document.getElementById('menu');
  burger.addEventListener('click', function () { burger.setAttribute('aria-expanded', menu.classList.toggle('open')); });
  menu.addEventListener('click', function () { menu.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); });

  // Scroll spy: highlight the nav link of the section in view
  var links = {}, ids = [];
  document.querySelectorAll('#menu a').forEach(function (a) { links[a.dataset.s] = a; ids.push(a.dataset.s); });
  function spy() {
    var y = window.scrollY + window.innerHeight * 0.35, cur = ids[0];
    ids.forEach(function (id) { var el = document.getElementById(id); if (el && el.offsetTop <= y) cur = id; });
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) cur = ids[ids.length - 1];
    ids.forEach(function (k) {
      links[k].classList.toggle('active', k === cur);
      if (k === cur) links[k].setAttribute('aria-current', 'true'); else links[k].removeAttribute('aria-current');
    });
  }
  var tick = false;
  window.addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(function () { spy(); tick = false; }); } }, { passive: true });
  window.addEventListener('resize', spy); spy();

  // Reveal on scroll
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else items.forEach(function (el) { el.classList.add('in'); });

  // Cursor spotlight on cards
  document.querySelectorAll('.spot').forEach(function (el) {
    el.addEventListener('mousemove', function (e) {
      var r = el.getBoundingClientRect();
      el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      el.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  // Typing effect
  var words = ['machine learning', 'full-stack web development', 'data analysis', 'fraud detection'], wi = 0, ci = 0, del = false, el = document.getElementById('typed');
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { el.textContent = words[0]; }
  else (function type() {
    var w = words[wi];
    ci += del ? -1 : 1;
    el.textContent = w.slice(0, ci);
    var d = del ? 35 : 75;
    if (!del && ci === w.length) { del = true; d = 1400; }
    else if (del && ci === 0) { del = false; wi = (wi + 1) % words.length; d = 300; }
    setTimeout(type, d);
  })();

  // Tech marquee
  var tech = ['Python', 'Java', 'JavaScript', 'SQL', 'PHP', 'React.js', 'Spring Boot', 'Scikit-learn', 'XGBoost', 'LightGBM', 'Pandas', 'NumPy', 'MySQL', 'Power BI', 'Git/GitHub', 'Figma'];
  var track = document.getElementById('track');
  track.innerHTML = tech.concat(tech).map(function (x) { return '<span>' + x + '</span>'; }).join('');

  // Project filter
  document.querySelector('.filters').addEventListener('click', function (e) {
    var b = e.target.closest('.chip'); if (!b) return;
    document.querySelectorAll('.chip').forEach(function (c) { c.classList.toggle('on', c === b); });
    document.querySelectorAll('.card').forEach(function (c) { c.hidden = b.dataset.f !== 'all' && c.dataset.c !== b.dataset.f; });
  });

  // Photo placeholder until photo.jpg exists
  var pic = document.getElementById('pic'), frame = document.getElementById('frame');
  pic.addEventListener('error', function () { frame.classList.add('empty'); });
  if (pic.complete && pic.naturalWidth === 0) frame.classList.add('empty');

  document.getElementById('yr').textContent = new Date().getFullYear();
})();
