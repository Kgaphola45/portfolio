/* Portfolio interactive behaviors:
 * - Tactile Apple spring hover & press physics on #heroEmailBtn (independent X, Y, Scale springs)
 * - Interruptible Apple spring physics (damping: 1.0, response: 0.28s) for Evidence tabs
 * - URL state deep-linking (?proof=...) & full WAI-ARIA keyboard tab navigation
 * - Accessible inline form validation, unsaved-input guard, and polite toast feedback
 */
document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

    // Helper: Apple spring step (dampingRatio & response in seconds)
    function stepSpring(pos, vel, target, dt, dampingRatio = 1.0, response = 0.28) {
        const omega = (2 * Math.PI) / response;
        const damping = 2 * dampingRatio * omega;
        const stiffness = omega * omega;

        const displacement = pos - target;
        const accel = -stiffness * displacement - damping * vel;
        const nextVel = vel + accel * dt;
        const nextPos = pos + nextVel * dt;
        return [nextPos, nextVel];
    }

    // 1. Tactile Spring Hover & Pointer-Down on Hero Email Button (apple-design §1, §3, §4)
    const heroEmailBtn = document.getElementById('heroEmailBtn');
    if (heroEmailBtn) {
        const btnSpring = {
            x: 0, vx: 0, targetX: 0,
            y: 0, vy: 0, targetY: 0,
            scale: 1, vScale: 0, targetScale: 1,
            rafId: null,
            lastTime: 0
        };

        function tickHeroBtnSpring(now) {
            const dt = Math.min((now - btnSpring.lastTime) / 1000, 0.032);
            btnSpring.lastTime = now;

            // Slightly under-damped (0.82) for tactile springy feel on hover/release
            [btnSpring.x, btnSpring.vx] = stepSpring(btnSpring.x, btnSpring.vx, btnSpring.targetX, dt, 0.82, 0.26);
            [btnSpring.y, btnSpring.vy] = stepSpring(btnSpring.y, btnSpring.vy, btnSpring.targetY, dt, 0.82, 0.26);
            [btnSpring.scale, btnSpring.vScale] = stepSpring(btnSpring.scale, btnSpring.vScale, btnSpring.targetScale, dt, 0.82, 0.22);

            heroEmailBtn.style.transform = `translate3d(${btnSpring.x.toFixed(2)}px, ${btnSpring.y.toFixed(2)}px, 0) scale(${btnSpring.scale.toFixed(4)})`;

            const settled =
                Math.abs(btnSpring.targetX - btnSpring.x) < 0.08 &&
                Math.abs(btnSpring.vx) < 0.5 &&
                Math.abs(btnSpring.targetY - btnSpring.y) < 0.08 &&
                Math.abs(btnSpring.vy) < 0.5 &&
                Math.abs(btnSpring.targetScale - btnSpring.scale) < 0.001 &&
                Math.abs(btnSpring.vScale) < 0.01;

            if (!settled) {
                btnSpring.rafId = requestAnimationFrame(tickHeroBtnSpring);
            } else {
                btnSpring.x = btnSpring.targetX;
                btnSpring.y = btnSpring.targetY;
                btnSpring.scale = btnSpring.targetScale;
                btnSpring.vx = 0;
                btnSpring.vy = 0;
                btnSpring.vScale = 0;
                heroEmailBtn.style.transform =
                    btnSpring.x === 0 && btnSpring.y === 0 && btnSpring.scale === 1
                        ? ''
                        : `translate3d(${btnSpring.x}px, ${btnSpring.y}px, 0) scale(${btnSpring.scale})`;
                btnSpring.rafId = null;
            }
        }

        function triggerHeroBtnSpring() {
            if (prefersReducedMotion.matches) {
                heroEmailBtn.style.transform = '';
                return;
            }
            if (!btnSpring.rafId) {
                btnSpring.lastTime = performance.now();
                btnSpring.rafId = requestAnimationFrame(tickHeroBtnSpring);
            }
        }

        let cachedRect = null;

        heroEmailBtn.addEventListener('pointerenter', () => {
            if (!finePointer.matches || prefersReducedMotion.matches) return;
            cachedRect = heroEmailBtn.getBoundingClientRect();
            btnSpring.targetScale = 1.025;
            triggerHeroBtnSpring();
        });

        heroEmailBtn.addEventListener('pointermove', (e) => {
            if (!finePointer.matches || prefersReducedMotion.matches || !cachedRect) return;
            const offsetX = e.clientX - (cachedRect.left + cachedRect.width / 2);
            const offsetY = e.clientY - (cachedRect.top + cachedRect.height / 2);
            btnSpring.targetX = offsetX * 0.14;
            btnSpring.targetY = offsetY * 0.22 - 1.5;
            triggerHeroBtnSpring();
        });

        heroEmailBtn.addEventListener('pointerdown', () => {
            if (prefersReducedMotion.matches) return;
            // Instant response on pointer-down (apple-design §1)
            btnSpring.targetScale = 0.96;
            triggerHeroBtnSpring();
        });

        heroEmailBtn.addEventListener('pointerup', () => {
            if (prefersReducedMotion.matches) return;
            btnSpring.targetScale = finePointer.matches ? 1.025 : 1;
            triggerHeroBtnSpring();
        });

        heroEmailBtn.addEventListener('pointerleave', () => {
            btnSpring.targetX = 0;
            btnSpring.targetY = 0;
            btnSpring.targetScale = 1;
            triggerHeroBtnSpring();
        });
    }

    // 2. Mobile Navigation Drawer
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIconOpen = document.getElementById('menuIconOpen');
    const menuIconClose = document.getElementById('menuIconClose');

    function setMobileMenuOpen(isOpen) {
        if (!mobileMenuBtn || !mobileMenu) return;
        mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
        mobileMenu.classList.toggle('hidden', !isOpen);
        if (menuIconOpen && menuIconClose) {
            menuIconOpen.classList.toggle('hidden', isOpen);
            menuIconClose.classList.toggle('hidden', !isOpen);
        }
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            const expanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
            setMobileMenuOpen(!expanded);
        });
    }

    document.querySelectorAll('.mobile-nav-link').forEach((link) => {
        link.addEventListener('click', () => setMobileMenuOpen(false));
    });

    // 3. Polite Toast Notification
    const toast = document.getElementById('toastNotification');
    const toastMsg = document.getElementById('toastMsg');
    let toastTimer = null;

    function showToast(message) {
        if (!toast || !toastMsg) return;
        toastMsg.textContent = message;
        toast.classList.remove('opacity-0', 'translate-y-4');
        toast.classList.add('opacity-100', 'translate-y-0');
        if (toastTimer) clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
            toast.classList.remove('opacity-100', 'translate-y-0');
            toast.classList.add('opacity-0', 'translate-y-4');
        }, 4000);
    }

    // 4. Critically-Damped Spring Physics for Evidence Tabs (Apple WWDC Fluid Interfaces)
    const tabButtons = Array.from(document.querySelectorAll('.proof-tab'));
    const tabPanels = Array.from(document.querySelectorAll('.proof-panel'));
    const indicator = document.getElementById('proofTabIndicator');

    const springState = {
        x: 0,
        vx: 0,
        targetX: 0,
        w: 0,
        vw: 0,
        targetW: 0,
        initialized: false,
        rafId: null
    };

    let lastFrameTime = 0;

    function animateIndicator(now) {
        if (!indicator) return;
        const dt = Math.min((now - lastFrameTime) / 1000, 0.032);
        lastFrameTime = now;

        const [nextX, nextVx] = stepSpring(springState.x, springState.vx, springState.targetX, dt, 1.0, 0.28);
        const [nextW, nextVw] = stepSpring(springState.w, springState.vw, springState.targetW, dt, 1.0, 0.28);

        springState.x = nextX;
        springState.vx = nextVx;
        springState.w = nextW;
        springState.vw = nextVw;

        indicator.style.transform = `translate3d(${springState.x.toFixed(2)}px, 0, 0)`;
        indicator.style.width = `${springState.w.toFixed(2)}px`;

        const settled =
            Math.abs(springState.targetX - springState.x) < 0.25 &&
            Math.abs(springState.vx) < 1 &&
            Math.abs(springState.targetW - springState.w) < 0.25 &&
            Math.abs(springState.vw) < 1;

        if (!settled) {
            springState.rafId = requestAnimationFrame(animateIndicator);
        } else {
            springState.x = springState.targetX;
            springState.w = springState.targetW;
            springState.vx = 0;
            springState.vw = 0;
            indicator.style.transform = `translate3d(${springState.targetX}px, 0, 0)`;
            indicator.style.width = `${springState.targetW}px`;
            springState.rafId = null;
        }
    }

    function moveIndicatorToTab(activeBtn, immediate = false) {
        if (!indicator || !activeBtn) return;
        const targetX = activeBtn.offsetLeft;
        const targetW = activeBtn.offsetWidth;

        springState.targetX = targetX;
        springState.targetW = targetW;

        if (!springState.initialized || immediate || prefersReducedMotion.matches) {
            springState.x = targetX;
            springState.w = targetW;
            springState.vx = 0;
            springState.vw = 0;
            springState.initialized = true;
            indicator.style.transform = `translate3d(${targetX}px, 0, 0)`;
            indicator.style.width = `${targetW}px`;
            return;
        }

        if (!springState.rafId) {
            lastFrameTime = performance.now();
            springState.rafId = requestAnimationFrame(animateIndicator);
        }
    }

    function activateTab(tabKey, options = { updateUrl: true, focusTab: false, immediate: false }) {
        const activeBtn = tabButtons.find((b) => b.dataset.tab === tabKey) || tabButtons[0];
        if (!activeBtn) return;
        const resolvedKey = activeBtn.dataset.tab;

        tabButtons.forEach((btn) => {
            const isSelected = btn === activeBtn;
            btn.setAttribute('aria-selected', String(isSelected));
            btn.tabIndex = isSelected ? 0 : -1;
            btn.classList.toggle('text-zinc-50', isSelected);
            btn.classList.toggle('text-zinc-400', !isSelected);
        });

        tabPanels.forEach((panel) => {
            const isMatch = panel.dataset.panel === resolvedKey;
            panel.classList.toggle('hidden', !isMatch);
        });

        moveIndicatorToTab(activeBtn, options.immediate);

        if (options.focusTab) {
            activeBtn.focus();
        }

        if (options.updateUrl && window.history && window.history.replaceState) {
            const url = new URL(window.location.href);
            url.searchParams.set('proof', resolvedKey);
            window.history.replaceState(null, '', url.toString());
        }
    }

    tabButtons.forEach((btn, idx) => {
        btn.addEventListener('click', () => {
            activateTab(btn.dataset.tab, { updateUrl: true, focusTab: false, immediate: false });
        });

        btn.addEventListener('keydown', (e) => {
            let nextIdx = null;
            if (e.key === 'ArrowRight') nextIdx = (idx + 1) % tabButtons.length;
            if (e.key === 'ArrowLeft') nextIdx = (idx - 1 + tabButtons.length) % tabButtons.length;
            if (e.key === 'Home') nextIdx = 0;
            if (e.key === 'End') nextIdx = tabButtons.length - 1;

            if (nextIdx !== null) {
                e.preventDefault();
                const targetBtn = tabButtons[nextIdx];
                activateTab(targetBtn.dataset.tab, { updateUrl: true, focusTab: true, immediate: false });
            }
        });
    });

    // Initialize tab from URL query param (?proof=...)
    const initialParams = new URLSearchParams(window.location.search);
    const initialTab = initialParams.get('proof') || 'odoo';
    activateTab(initialTab, { updateUrl: false, focusTab: false, immediate: true });

    window.addEventListener('resize', () => {
        const currentBtn = tabButtons.find((b) => b.getAttribute('aria-selected') === 'true');
        if (currentBtn) moveIndicatorToTab(currentBtn, true);
    }, { passive: true });

    // 5. Copy Email & PowerShell Script Actions
    document.querySelectorAll('.copy-email-btn').forEach((btn) => {
        btn.addEventListener('click', async () => {
            const email = btn.getAttribute('data-copy-email') || 'emmanuelkgaphola@outlook.com';
            const labelEl = btn.querySelector('.copy-label');
            try {
                await navigator.clipboard.writeText(email);
                if (labelEl) labelEl.textContent = 'Copied Email.';
                showToast('Copied email address to clipboard.');
                setTimeout(() => {
                    if (labelEl) labelEl.textContent = 'Copy Email Address';
                }, 2200);
            } catch {
                showToast('Email: ' + email);
            }
        });
    });

    const copyScriptBtn = document.getElementById('copyScriptBtn');
    const copyScriptLabel = document.getElementById('copyScriptLabel');
    const psCodeBlock = document.getElementById('psCodeBlock');

    if (copyScriptBtn && psCodeBlock) {
        copyScriptBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(psCodeBlock.textContent || '');
                if (copyScriptLabel) copyScriptLabel.textContent = 'Copied.';
                showToast('PowerShell script copied to clipboard.');
                setTimeout(() => {
                    if (copyScriptLabel) copyScriptLabel.textContent = 'Copy Script';
                }, 2200);
            } catch {
                showToast('Could not copy script automatically.');
            }
        });
    }

    // 6. Accessible Contact Form with Inline Validation & Unsaved Changes Guard
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const submitBtnText = document.getElementById('submitBtnText');
    const formNote = document.getElementById('formNote');
    let formDirty = false;

    if (contactForm) {
        const fields = [
            {
                input: document.getElementById('contact-name'),
                error: document.getElementById('error-name'),
                validate: (val) => (val.trim().length >= 2 ? '' : 'Enter your name so I know who is reaching out.')
            },
            {
                input: document.getElementById('contact-email'),
                error: document.getElementById('error-email'),
                validate: (val) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()) ? '' : 'Enter a valid email address (for example, name@company.co.za).')
            },
            {
                input: document.getElementById('contact-subject'),
                error: document.getElementById('error-subject'),
                validate: (val) => (val.trim().length >= 3 ? '' : 'Include a short role or topic summary.')
            },
            {
                input: document.getElementById('contact-message'),
                error: document.getElementById('error-message'),
                validate: (val) => (val.trim().length >= 10 ? '' : 'Add a brief message (at least 10 characters) so I can reply with context.')
            }
        ];

        fields.forEach(({ input, error, validate }) => {
            if (!input || !error) return;
            input.addEventListener('input', () => {
                formDirty = true;
                if (!error.classList.contains('hidden')) {
                    const msg = validate(input.value);
                    error.textContent = msg;
                    error.classList.toggle('hidden', !msg);
                    input.setAttribute('aria-invalid', String(Boolean(msg)));
                }
            });
        });

        window.addEventListener('beforeunload', (e) => {
            if (formDirty) {
                e.preventDefault();
                e.returnValue = '';
            }
        });

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            let firstInvalid = null;
            fields.forEach(({ input, error, validate }) => {
                if (!input || !error) return;
                const msg = validate(input.value);
                error.textContent = msg;
                error.classList.toggle('hidden', !msg);
                input.setAttribute('aria-invalid', String(Boolean(msg)));
                if (msg && !firstInvalid) {
                    firstInvalid = input;
                }
            });

            if (firstInvalid) {
                firstInvalid.focus();
                return;
            }

            if (submitBtn && submitBtnText) {
                submitBtn.disabled = true;
                submitBtnText.textContent = 'Sending.';
            }

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: { Accept: 'application/json' }
                });

                if (response.ok) {
                    formDirty = false;
                    contactForm.reset();
                    showToast('Message sent. I will reply within one business day.');
                    if (formNote) {
                        formNote.textContent = 'Message received. Talk soon.';
                    }
                } else {
                    showToast('Submission failed. Email emmanuelkgaphola@outlook.com directly.');
                }
            } catch {
                showToast('Network error. Email emmanuelkgaphola@outlook.com directly.');
            } finally {
                if (submitBtn && submitBtnText) {
                    submitBtn.disabled = false;
                    submitBtnText.textContent = 'Send Direct Message';
                }
            }
        });
    }
});
