/* Help desk & Tier 2 notes: nav, reveal, honest form handling. No invented anything. */
document.addEventListener('DOMContentLoaded', () => {
    const toTop = document.getElementById('scrollTopBtn');
    const links = [...document.querySelectorAll('.nav__link')];
    const secs = ['for-you', 'how', 'shift', 'tools', 'back'].map(id => document.getElementById(id)).filter(Boolean);
    function onScroll() {
        const y = window.scrollY; toTop.classList.toggle('show', y > 500);
        let cur = ''; secs.forEach(s => { if (y >= s.offsetTop - 140) cur = s.id });
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + cur));
    }
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    const toggle = document.getElementById('navToggle'), nav = document.getElementById('navList');
    toggle.addEventListener('click', () => {
        nav.classList.toggle('open');
        const i = toggle.querySelector('i'); i.classList.toggle('fa-bars'); i.classList.toggle('fa-times');
    });
    links.forEach(l => l.addEventListener('click', () => {
        nav.classList.remove('open');
        const i = toggle.querySelector('i'); i.classList.add('fa-bars'); i.classList.remove('fa-times');
    }));
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .1 });
    document.querySelectorAll('.fit,.rules li,.t-row,.tool-list li,.card,.photo,.margin-note,.cform').forEach(el => { el.classList.add('reveal'); io.observe(el); });
    const form = document.getElementById('contactForm'), toast = document.getElementById('toastNotification'), msg = document.getElementById('toastMsg'), note = document.getElementById('formNote');
    function say(t) { msg.textContent = t; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 5000); }
    form.addEventListener('submit', async e => {
        e.preventDefault();
        const btn = form.querySelector('button[type=submit]'), old = btn.innerHTML;
        btn.disabled = true; btn.textContent = 'Sending...';
        try {
            const r = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
            if (r.ok) { say('Sent. I reply within a day  usually faster.'); form.reset(); note.textContent = 'sent  talk soon'; }
            else say('That didn\u2019t send. Email me directly instead.');
        }
        catch { say('Network hiccup  email me directly instead.'); }
        btn.disabled = false; btn.innerHTML = old;
    });
});
