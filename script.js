const navbar = document.getElementById('navbar');
const progress = document.getElementById('progress');
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
const links = [...menu.querySelectorAll('a')];

// scrolled state + progress bar
const onScroll = () => {
  navbar.classList.toggle('scrolled', scrollY > 50);
  const max = document.body.scrollHeight - innerHeight;
  progress.style.width = (max > 0 ? scrollY / max * 100 : 0) + '%';
};
addEventListener('scroll', onScroll, { passive: true });
onScroll();

// highlight the link for the section in view
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(a => a.classList.toggle('active', a.hash === '#' + e.target.id));
    }
  });
}, { rootMargin: '-45% 0px -45% 0px' });
document.querySelectorAll('section').forEach(s => observer.observe(s));

// mobile menu
const toggle = force => {
  const open = menu.classList.toggle('open', force);
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
  burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
};
burger.addEventListener('click', () => toggle());
links.forEach(a => a.addEventListener('click', () => toggle(false)));
