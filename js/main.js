// Formulář: demo režim neodesílá nic, ostrý režim posílá na endpoint ze site.json (data-endpoint).
(function () {
  document.querySelectorAll('form.formular').forEach(function (f) {
    var stav = f.querySelector('.formular-stav');
    f.addEventListener('submit', function (e) {
      var endpoint = f.getAttribute('data-endpoint');
      var demo = f.getAttribute('data-demo') === '1';
      if (f.querySelector('.past input').value) { e.preventDefault(); return; }   // robot
      if (demo || !endpoint) {
        e.preventDefault();
        stav.textContent = 'Ukážka formulára: nič sa neodosiela. Po spustení webu príde správa na e-mail firmy.';
        return;
      }
      e.preventDefault();
      stav.textContent = 'Odosielam…';
      fetch(endpoint, { method: 'POST', body: new FormData(f), headers: { Accept: 'application/json' } })
        .then(function (r) { if (!r.ok) throw new Error(r.status); f.reset(); stav.textContent = 'Ďakujeme, správa bola odoslaná.'; })
        .catch(function () { stav.textContent = 'Odoslanie sa nepodarilo. Napíšte nám prosím e-mailom.'; });
    });
  });
})();

// Záložky kolekcií
(function () {
  var tabs = document.querySelectorAll('.kol-nav [role=tab]');
  if (!tabs.length) return;
  document.documentElement.classList.add('js');
  function otvor(t) {
    tabs.forEach(function (x) {
      var on = x === t;
      x.setAttribute('aria-selected', on ? 'true' : 'false');
      var p = document.getElementById(x.getAttribute('aria-controls'));
      p.hidden = !on;
    });
  }
  tabs.forEach(function (t) { t.addEventListener('click', function () { otvor(t); }); });
  otvor(tabs[0]);
})();

// Menu na mobilu
(function () {
  var b = document.querySelector('.menu-tl'); if (!b) return;
  var h = b.closest('.hlavicka');
  b.addEventListener('click', function () { var o = h.classList.toggle('otvorene'); b.setAttribute('aria-expanded', o ? 'true' : 'false'); });
  h.querySelectorAll('nav a').forEach(function (a) { a.addEventListener('click', function () { h.classList.remove('otvorene'); b.setAttribute('aria-expanded', 'false'); }); });
})();
