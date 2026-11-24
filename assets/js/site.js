/* Eskander v2 — wspólny skrypt. Treść strony działa bez JS. */
const CONFIG = {
  email: "eskanderwet@gmail.com",           // TODO: potwierdzić skrzynkę na zapytania
  phone: "536 041 341",
  // godziny otwarcia (czas w Warszawie); 0 = niedziela, brak wpisu = zamknięte
  hours: {1:[10,18],2:[10,18],3:[10,18],4:[10,18],5:[10,18],6:[10,15]}
};
/* TODO: kwoty od przychodni; null = „—” */
const PRICES = { wizyta:null, szczepienie:null, chip:null, paszport:null, kastracja_kot:null, sterylizacja_kotka:null, usg:null, krew:null, noc:null };

(function(){
  const root = document.documentElement;

  /* ---- tryb dzień / noc (alarmowy) ---- */
  function warsawNow(){
    const p = new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Warsaw',weekday:'short',hour:'2-digit',minute:'2-digit',hour12:false}).formatToParts(new Date());
    const g = t => p.find(x => x.type === t).value;
    return { d:{Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6}[g('weekday')], h:+g('hour') + (+g('minute'))/60 };
  }
  let userMode = null;
  try { userMode = sessionStorage.getItem('esk-mode'); } catch(e){}
  const st = document.getElementById('status'), stt = document.getElementById('status-t'), modeBtn = document.getElementById('mode');
  function apply(){
    const {d,h} = warsawNow(), o = CONFIG.hours[d];
    const open = !!o && h >= o[0] && h < o[1];
    if (st){ st.classList.toggle('is-night', !open); stt.textContent = open ? 'Otwarte do ' + o[1] + ':00' : 'Teraz: dyżur nocny'; }
    const night = userMode ? userMode === 'night' : !open;
    if (night) root.dataset.theme = 'night'; else root.dataset.theme = 'day';
    if (modeBtn){ modeBtn.setAttribute('aria-pressed', String(night)); modeBtn.querySelector('.t').textContent = night ? 'Tryb nocny' : 'Tryb dzienny'; }
  }
  apply(); setInterval(apply, 60000);
  modeBtn && modeBtn.addEventListener('click', () => {
    userMode = root.dataset.theme === 'night' ? 'day' : 'night';
    try { sessionStorage.setItem('esk-mode', userMode); } catch(e){}
    apply();
    if (document.body.classList.contains('page-home')) window.scrollTo({top:0, behavior:'smooth'});
  });

  /* ---- navbar ---- */
  const nav = document.getElementById('nav'), callbar = document.getElementById('callbar');
  const onScroll = () => { const y = scrollY; nav.classList.toggle('is-scrolled', y > 8); callbar && callbar.classList.toggle('show', y > 420); };
  addEventListener('scroll', onScroll, {passive:true}); onScroll();
  const burger = nav.querySelector('.burger');
  const closeAll = () => nav.querySelectorAll('li.open').forEach(li => { li.classList.remove('open'); li.querySelector('button').setAttribute('aria-expanded','false'); });
  burger.addEventListener('click', () => { const o = nav.dataset.open !== 'true'; nav.dataset.open = o; burger.setAttribute('aria-expanded', o); if (!o) closeAll(); });
  nav.querySelectorAll('li.has-drop > button').forEach(b => b.addEventListener('click', e => {
    e.stopPropagation(); const li = b.parentElement, o = !li.classList.contains('open');
    closeAll(); li.classList.toggle('open', o); b.setAttribute('aria-expanded', o);
  }));
  document.addEventListener('click', e => { if (!nav.contains(e.target)) closeAll(); });
  addEventListener('keydown', e => { if (e.key === 'Escape'){ closeAll(); if (nav.dataset.open === 'true'){ nav.dataset.open='false'; burger.setAttribute('aria-expanded','false'); burger.focus(); } } });
  nav.querySelectorAll('.menu a').forEach(a => a.addEventListener('click', () => { nav.dataset.open='false'; burger.setAttribute('aria-expanded','false'); closeAll(); }));

  /* ---- ceny ---- */
  document.querySelectorAll('[data-price]').forEach(el => { const v = PRICES[el.dataset.price]; if (v != null) el.textContent = 'od ' + v + ' zł'; });

  /* ---- indeks usług: aktywna pozycja ---- */
  const idx = document.querySelector('.svc-index');
  if (idx && 'IntersectionObserver' in window){
    const links = [...idx.querySelectorAll('a')];
    const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting){ links.forEach(a => a.classList.toggle('active', a.hash === '#' + en.target.id)); } }), {rootMargin:'-40% 0px -55% 0px'});
    document.querySelectorAll('.svc-item').forEach(s => io.observe(s));
  }

  /* ---- kopiowanie ---- */
  document.querySelectorAll('[data-copy]').forEach(b => b.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(b.dataset.copy); b.textContent = 'Skopiowano'; } catch(e){ b.textContent = 'Zaznacz i skopiuj'; }
    setTimeout(() => b.textContent = 'Kopiuj', 2000);
  }));

  /* ---- zapytanie → mailto ---- */
  const f = document.getElementById('inquiry');
  if (f){
    const c = f.querySelector('#q-contact'), q = f.querySelector('#q-msg');
    const check = (el, ok) => { el.closest('.field').classList.toggle('invalid', !ok); ok ? el.removeAttribute('aria-invalid') : el.setAttribute('aria-invalid','true'); return ok; };
    c.addEventListener('input', () => c.value.trim().length >= 5 && check(c, true));
    q.addEventListener('input', () => q.value.trim().length >= 3 && check(q, true));
    f.addEventListener('submit', e => {
      e.preventDefault();
      const ok1 = check(c, c.value.trim().length >= 5), ok2 = check(q, q.value.trim().length >= 3);
      if (!ok1){ c.focus(); return; } if (!ok2){ q.focus(); return; }
      const name = f.querySelector('#q-name').value.trim();
      const body = ['Zapytanie ze strony eskander.pl', '', 'Imię: ' + (name || '-'), 'Kontakt: ' + c.value.trim(), '', q.value.trim()].join('\n');
      location.href = 'mailto:' + CONFIG.email + '?subject=' + encodeURIComponent('Zapytanie ze strony') + '&body=' + encodeURIComponent(body);
      const ok = document.getElementById('inquiry-ok'); ok.style.display = 'block';
      ok.textContent = 'Otwieramy Twój program pocztowy z gotową wiadomością. Jeśli się nie otworzył, napisz na ' + CONFIG.email + '.';
    });
  }

  const y = document.getElementById('y'); if (y) y.textContent = new Date().getFullYear();
})();
