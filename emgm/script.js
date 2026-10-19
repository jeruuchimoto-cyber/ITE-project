
const nav = document.getElementById('nav'), menuBtn = document.getElementById('menuBtn');
menuBtn.addEventListener('click', () => { const o = nav.classList.toggle('open'); menuBtn.setAttribute('aria-expanded', o) });


const root = document.documentElement, themeBtn = document.getElementById('themeBtn');
try { if (localStorage.getItem('theme') === 'dark') root.dataset.theme = 'dark' } catch (e) { }
themeBtn.addEventListener('click', () => {
  const d = root.dataset.theme === 'dark';
  if (d) delete root.dataset.theme; else root.dataset.theme = 'dark';
  try { localStorage.setItem('theme', d ? 'light' : 'dark') } catch (e) { }
});


const modal = document.getElementById('modal');
if (modal) {
  document.querySelectorAll('[data-product]').forEach(b => b.addEventListener('click', () => {
    document.getElementById('mTitle').textContent = b.dataset.product;
    document.getElementById('mImg').src = b.dataset.img;
    document.getElementById('mInfo').textContent = b.dataset.info;
    document.getElementById('mIng').textContent = b.dataset.ing;
    modal.classList.add('show');
  }));
  const close = () => modal.classList.remove('show');
  modal.addEventListener('click', e => { if (e.target === modal || e.target.classList.contains('x')) close() });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close() });
}


document.querySelectorAll('.faq button').forEach(b => b.addEventListener('click', () => {
  const a = b.nextElementSibling, open = a.classList.toggle('open');
  b.setAttribute('aria-expanded', open); b.lastElementChild.textContent = open ? '−' : '+';
}));


const form = document.getElementById('contactForm');
if (form) {
  const rules = {
    name: v => v.trim().length >= 2 || 'Enter your name (at least 2 characters).',
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Enter a valid email, like name@email.com.',
    message: v => v.trim().length >= 10 || 'Message must be at least 10 characters.'
  };
  form.addEventListener('submit', e => {
    e.preventDefault(); let ok = true;
    for (const k in rules) {
      const f = form.elements[k], r = rules[k](f.value);
      f.classList.toggle('bad', r !== true);
      document.getElementById(k + 'Err').textContent = r === true ? '' : r;
      if (r !== true) ok = false;
    }
    if (ok) { document.getElementById('okMsg').style.display = 'block'; form.reset() }
  });
}
