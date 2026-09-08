// Mock-up behaviour only. No form on this site sends, stores or transmits anything.
(function () {
  var burger = document.querySelector('.burger');
  var mob = document.querySelector('.mobnav');
  if (burger && mob) {
    burger.addEventListener('click', function () {
      var open = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!open));
      mob.hidden = open;
      mob.style.display = open ? 'none' : 'flex';
    });
  }

  // Every form is deliberately inert: no action, no field names, nothing leaves the page.
  document.querySelectorAll('form').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var existing = f.querySelector('.formmsg');
      if (existing) existing.remove();
      var msg = document.createElement('p');
      msg.className = 'formmsg';
      msg.setAttribute('role', 'status');
      msg.innerHTML =
        '<strong>Demo only.</strong> Nothing was sent, received or stored — this mock-up has no server behind it. ' +
        'In the live build, this is where the request is delivered securely to the practice and the patient sees a confirmation with a reference number.';
      f.appendChild(msg);
      msg.scrollIntoView({ block: 'center', behavior: 'smooth' });
    });
  });

  // Buttons that will point at the real booking / telehealth platform once nominated.
  document.querySelectorAll('a[href="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var label = (a.textContent || '').trim() || 'This link';
      alert(label + ' — destination to be connected.\n\nIn the live site this goes straight to the booking / telehealth platform or social page you nominate. Nothing is guessed at in this mock-up.');
    });
  });

  var yr = document.querySelector('.yr');
  if (yr) yr.textContent = String(new Date().getFullYear());

  // Tab state on the scripts/referrals page follows the hash.
  function syncTabs() {
    var h = location.hash || '#scripts';
    document.querySelectorAll('.tab').forEach(function (t) {
      t.classList.toggle('on', t.getAttribute('href') === h);
    });
  }
  if (document.querySelector('.tab')) {
    syncTabs();
    window.addEventListener('hashchange', syncTabs);
  }
})();
