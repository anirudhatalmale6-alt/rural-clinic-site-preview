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
        'In the live site the request is handed to the practice system and the patient gets a confirmation and a reference.';
      f.appendChild(msg);
      msg.scrollIntoView({ block: 'center', behavior: 'smooth' });
    });
  });

  // Buttons that will point at the real booking / telehealth destination once nominated.
  document.querySelectorAll('a[href="#"], a[href$="-x"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var label = (a.textContent || '').trim() || 'This link';
      alert(label + ' — destination to be connected.\n\nIn the live site this opens the practice\'s booking / telehealth / request system. Nothing is guessed at in this mock-up.');
    });
  });

  var yr = document.querySelector('.yr');
  if (yr) yr.textContent = String(new Date().getFullYear());

  // Patient info: open-all toggle, and open the block a #hash points at.
  var expand = document.getElementById('expandall');
  if (expand) {
    expand.addEventListener('click', function () {
      var accs = document.querySelectorAll('.acc');
      var anyClosed = [].some.call(accs, function (a) { return !a.open; });
      [].forEach.call(accs, function (a) { a.open = anyClosed; });
      expand.textContent = anyClosed ? 'Close all' : 'Open all';
    });
  }
  function openFromHash() {
    if (!location.hash) return;
    var el = document.querySelector(location.hash);
    if (el && el.classList && el.classList.contains('acc')) {
      el.open = true;
      el.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }
  openFromHash();
  window.addEventListener('hashchange', openFromHash);

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
