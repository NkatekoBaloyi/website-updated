'use strict';
document.addEventListener('DOMContentLoaded', () => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const make = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html) e.innerHTML = html; return e; };
  document.documentElement.classList.add('js');

  /* ---------- error helpers ---------- */
  const clearErr = el => { el.removeAttribute('aria-invalid'); const n = el.parentElement.querySelector(`.error[data-for="${el.id || el.name}"]`); if (n) n.remove(); };
  const showErr = (el, msg) => {
    clearErr(el);
    el.setAttribute('aria-invalid', 'true');
    const s = make('span', 'error', msg); s.dataset.for = el.id || el.name; s.setAttribute('role', 'alert');
    el.insertAdjacentElement('afterend', s);
  };
  document.addEventListener('input', e => { if (e.target.matches('[aria-invalid]')) clearErr(e.target); });
  const alertBox = (form, msg, bad) => {
    $$('.alert', form.parentElement).forEach(a => a.remove());
    const a = make('div', 'alert' + (bad ? ' bad' : ''), msg); a.setAttribute('role', bad ? 'alert' : 'status');
    form.insertAdjacentElement('beforebegin', a); a.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };
  const money = n => 'R' + Math.round(n).toLocaleString('en-US');

  /* ---------- broken images -> placeholder ---------- */
  const markBroken = i => i.classList.add('img-missing');
  $$('img').forEach(i => { if (i.complete && i.naturalWidth === 0) markBroken(i); i.addEventListener('error', () => markBroken(i)); });

  /* ---------- header: dropdown, mobile toggle, active link ---------- */
  const nav = $('header nav');
  if (nav) {
    const rooms = [['All Rooms', 'rooms.html'], ['The Lost Temple', 'room-detail.html'], ['Haunted Mansion', 'rooms.html'], ['Prison Break', 'rooms.html'], ['Space Station', 'rooms.html'], ['Pirate Cove', 'rooms.html'], ['Zombie Lab', 'rooms.html']];
    const link = $('a[href="rooms.html"]', nav);
    if (link) {
      const li = link.closest('li'); li.classList.add('has-dropdown');
      link.setAttribute('aria-haspopup', 'true');
      const ul = make('ul', 'dropdown', rooms.map(([t, h]) => `<li><a href="${h}">${t}</a></li>`).join(''));
      li.append(ul);
      link.addEventListener('click', e => { if (innerWidth <= 860) { e.preventDefault(); li.classList.toggle('open'); } });
    }
    const page = location.pathname.split('/').pop() || 'index.html';
    $$('a', nav).forEach(a => { const h = a.getAttribute('href'); if (h === page || (page === 'room-detail.html' && h === 'rooms.html' && !a.closest('.dropdown'))) a.setAttribute('aria-current', 'page'); });
    const t = make('button', 'nav-toggle', '&#9776;'); t.type = 'button'; t.setAttribute('aria-label', 'Toggle menu');
    nav.before(t); t.addEventListener('click', () => nav.classList.toggle('open'));
  }

  /* ---------- footer layout ---------- */
  const f = $('body > footer');
  if (f) {
    const kids = [...f.children], top = make('div', 'footer-top'), brand = make('div', 'footer-brand'), bottom = make('div', 'footer-bottom');
    brand.append(kids[0], kids[1]); top.append(brand);
    for (let i = 2; i < kids.length; i++) {
      const k = kids[i];
      if (k.tagName === 'H4') { const c = make('div', 'footer-col'); c.append(k, kids[i + 1]); i++; top.append(c); }
      else if (k.tagName === 'UL') { const c = make('div', 'footer-col'); c.append(k); top.append(c); }
      else bottom.append(k);
    }
    f.append(top, bottom);
  }

  /* ---------- card polish: stars + price row ---------- */
  $$('article > p').forEach(p => {
    const d = p.textContent.match(/^Difficulty: (\d) \/ 5$/);
    if (d) { p.className = 'row'; p.innerHTML = `<span>Difficulty</span><span class="stars" aria-label="${d[1]} out of 5">${'★'.repeat(d[1])}${'☆'.repeat(5 - d[1])}</span>`; return; }
    const m = p.textContent.match(/^(.+) \| (R\d+ \/ person)$/);
    if (m) { p.className = 'row'; p.innerHTML = `<span>${m[1]}</span><strong>${m[2]}</strong>`; }
  });

  /* ---------- home: CTA band + FAQ accordion ---------- */
  const hero = $('main > section:first-child > img');
  if (hero && $('main > section:last-child')) {
    const cta = make('section', 'cta', '<h2 style="text-align:center">Ready for the Challenge?</h2><a href="booking.html"><button type="button">Book Your Adventure</button></a>');
    $('main').append(cta);
  }
  $$('dt').forEach((dt, i) => {
    dt.tabIndex = 0; dt.setAttribute('role', 'button');
    const toggle = () => dt.classList.toggle('open');
    dt.addEventListener('click', toggle);
    dt.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
    if (i === 0) dt.classList.add('open');
  });

  /* ---------- rooms: category filter ---------- */
  const filterNav = $('main > nav[aria-label="Room categories"]');
  if (filterNav) {
    const cards = $$('main article');
    $$('a', filterNav).forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        $$('a', filterNav).forEach(x => x.classList.remove('active')); a.classList.add('active');
        const cat = a.textContent.trim().toLowerCase();
        cards.forEach(c => { const tag = $('small', c)?.textContent.trim().toLowerCase(); c.hidden = cat !== 'all' && tag !== cat; });
      });
    });
    $('a', filterNav).classList.add('active');
  }

  /* ---------- contact form ---------- */
  const contact = $('main > section > form');
  if (contact) {
    contact.noValidate = true;
    contact.addEventListener('submit', e => {
      e.preventDefault();
      try {
        const name = $('#name'), email = $('#email'), msg = $('#message'); let ok = true;
        [name, email, msg].forEach(clearErr);
        if (name.value.trim().length < 2) { showErr(name, 'Enter your full name.'); ok = false; }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) { showErr(email, 'Enter a valid email address, like name@example.com.'); ok = false; }
        if (msg.value.trim().length < 10) { showErr(msg, 'Write at least 10 characters so we can help.'); ok = false; }
        if (!ok) { alertBox(contact, 'Please fix the highlighted fields and send again.', true); $('[aria-invalid]', contact)?.focus(); return; }
        contact.reset(); alertBox(contact, `Thanks ${name.value.trim() || ''}, your message is on its way. We reply within one business day.`);
      } catch (err) { console.error(err); alertBox(contact, 'Something went wrong sending your message. Please try again.', true); }
    });
  }

  /* ---------- booking page ---------- */
  const form = $('main > form');
  const room = $('#room');
  if (form && room) {
    form.noValidate = true;
    const ROOMS = { 'The Lost Temple': [350, 2, 6], 'Haunted Mansion': [380, 4, 8], 'Prison Break': [320, 2, 5], 'Space Station': [390, 3, 6], 'Pirate Cove': [340, 4, 8], 'Zombie Lab': [329, 2, 6] };
    const CODES = { ESCAPE10: 0.10, TEAM15: 0.15 };
    const date = $('#date'), players = $('#players'), promo = $('#promo');
    const ps = $$('aside p', form), applyBtn = $('aside p:has(#promo) button', form);
    let discount = 0;
    const msg = make('p', 'msg'); ps[6].after(msg);

    // calendar
    const cal = $('table', form); cal.classList.add('cal');
    $$('td', cal).forEach(td => { if (td.textContent.trim()) { td.tabIndex = 0; td.setAttribute('role', 'button'); } });
    const pick = td => { date.value = `2026-03-${td.textContent.trim().padStart(2, '0')}`; render(); };
    cal.addEventListener('click', e => { if (e.target.matches('td') && e.target.textContent.trim()) pick(e.target); });
    cal.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('td')) { e.preventDefault(); pick(e.target); } });

    // players stepper
    const stepper = make('div', 'stepper'); stepper.id = 'players-box'; const minus = make('button', '', '−'), plus = make('button', '', '+');
    minus.type = plus.type = 'button'; minus.setAttribute('aria-label', 'Fewer players'); plus.setAttribute('aria-label', 'More players');
    players.before(stepper); stepper.append(minus, players, plus);
    minus.onclick = () => { players.value = (+players.value || 0) - 1; render(true); };
    plus.onclick = () => { players.value = (+players.value || 0) + 1; render(true); };
    players.addEventListener('change', () => render(true));
    room.addEventListener('change', () => render(true));
    date.addEventListener('change', () => render());
    form.addEventListener('change', e => { if (e.target.name === 'time') { $$('.error[data-for=time]').forEach(x => x.remove()); render(); } });

    function render(check) {
      const [price, min, max] = ROOMS[room.value] || [350, 2, 6];
      players.min = min; players.max = max;
      let n = parseInt(players.value, 10);
      if (check && (isNaN(n) || n < min || n > max)) {
        const fixed = Math.min(max, Math.max(min, isNaN(n) ? min : n));
        players.value = fixed; n = fixed;
        showErr(players.closest('.stepper'), `${room.value} takes ${min} to ${max} players. We adjusted your group size.`);
      } else if (check) { $$('.error[data-for=players-box]').forEach(x => x.remove()); stepper.removeAttribute('aria-invalid'); }
      n = parseInt(players.value, 10) || min;
      const total = n * price * (1 - discount);
      // highlight calendar
      $$('td', cal).forEach(td => td.classList.toggle('sel', date.value === `2026-03-${td.textContent.trim().padStart(2, '0')}` && !!td.textContent.trim()));
      const d = date.value ? new Date(date.value + 'T00:00:00') : null;
      const t = $('input[name=time]:checked', form);
      const dateTxt = d && !isNaN(d) ? d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) : 'Choose a date';
      ps[1].innerHTML = `<strong>${room.value}</strong>`;
      ps[2].textContent = `${dateTxt} • ${t ? $(`label[for=${t.id}]`).textContent : 'Choose a time'}`;
      ps[4].textContent = `${money(price)} per player × ${n} — ${money(n * price)}`;
      ps[7].innerHTML = `<strong>Total Price: ${money(total)}</strong>`;
    }

    applyBtn.addEventListener('click', () => {
      const code = promo.value.trim().toUpperCase();
      msg.className = 'msg'; discount = 0;
      if (!code) msg.textContent = 'Enter a promo code first.';
      else if (CODES[code]) { discount = CODES[code]; msg.className = 'msg ok'; msg.textContent = `${code} applied: ${discount * 100}% off.`; }
      else msg.textContent = 'That code isn’t valid. Check the spelling and try again.';
      if (!discount && code) msg.style.color = 'var(--err)'; else msg.style.color = '';
      render();
    });

    form.addEventListener('submit', e => {
      e.preventDefault();
      try {
        const errs = []; $$('.error', form).forEach(x => x.remove());
        if (!date.value || isNaN(new Date(date.value))) { showErr(date, 'Pick a date from the calendar.'); errs.push(date); }
        if (!$('input[name=time]:checked', form)) {
          const fs = $('fieldset:has([name=time])', form); const s = make('span', 'error', 'Select a time slot.'); s.dataset.for = 'time'; s.setAttribute('role', 'alert'); fs.append(s); errs.push(fs);
        }
        render(true);
        if (errs.length) { alertBox(form, 'Complete the highlighted steps to confirm your booking.', true); errs[0].scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
        const n = players.value, total = ps[7].textContent.replace('Total Price: ', '');
        alertBox(form, `Booking confirmed! ${room.value}, ${ps[2].textContent}, ${n} players. Total ${total}. Arrive 15 minutes early.`);
      } catch (err) { console.error(err); alertBox(form, 'We couldn’t complete your booking. Please try again.', true); }
    });
    render(true);
  }
});
