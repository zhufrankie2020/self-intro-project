/* ==========================================================================
   FRANKIE ZHU — SELF INTRO WEB APP INTERACTIVE LOGIC
   Soccer Pitch, ADV Touring Map, Cmd+K and QR Sharing
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  const hideDecorativeIcons = (root = document) => {
    root.querySelectorAll('i').forEach(icon => icon.setAttribute('aria-hidden', 'true'));
  };

  /* ------------------------------------------------------------------------
     1. CAPABILITY TABS SWITCHER
     ------------------------------------------------------------------------ */
  const capabilitiesSection = document.getElementById('capabilities');
  const capabilityTabBtns = capabilitiesSection?.querySelectorAll('[data-capability-tab]') ?? [];
  const capabilityTabPanes = capabilitiesSection?.querySelectorAll('.tab-pane') ?? [];

  function activateCapabilityTab(btn, moveFocus = false) {
      const targetTab = btn.getAttribute('data-capability-tab');

      capabilityTabBtns.forEach(tabBtn => {
        tabBtn.classList.remove('active');
        tabBtn.setAttribute('aria-selected', 'false');
        tabBtn.tabIndex = -1;
      });
      capabilityTabPanes.forEach(pane => pane.classList.remove('active'));

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      btn.tabIndex = 0;
      document.getElementById(targetTab)?.classList.add('active');
      if (moveFocus) btn.focus();
  }

  capabilityTabBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => activateCapabilityTab(btn));
    btn.addEventListener('keydown', event => {
      const lastIndex = capabilityTabBtns.length - 1;
      let targetIndex;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') targetIndex = index === lastIndex ? 0 : index + 1;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') targetIndex = index === 0 ? lastIndex : index - 1;
      if (event.key === 'Home') targetIndex = 0;
      if (event.key === 'End') targetIndex = lastIndex;
      if (targetIndex === undefined) return;
      event.preventDefault();
      activateCapabilityTab(capabilityTabBtns[targetIndex], true);
    });
  });

  /* ------------------------------------------------------------------------
     2. SOCCER TACTICAL PITCH WIDGET
     ------------------------------------------------------------------------ */
  const pitchPlayersLayer = document.getElementById('pitch-players-layer');
  const playerTooltip = document.getElementById('player-tooltip');
  const formationBtns = document.querySelectorAll('.formation-btn');

  const roleInsights = {
    GK: 'Organises the defence, reads danger early and protects the goal.',
    RB: 'Defends the right side and overlaps to support attacks.',
    CB: 'Marks central attackers, wins challenges and starts play from the back.',
    LB: 'Defends the left side and provides width when the team moves forward.',
    CDM: 'Screens the defence, regains possession and keeps the ball moving.',
    CM: 'Connects defence and attack, offering passing options across midfield.',
    RAM: 'Creates chances from the right half-space and supports the striker.',
    CAM: 'Finds space between the lines and supplies the final pass.',
    LAM: 'Creates chances from the left half-space and links with wide players.',
    RWB: 'Covers the full right flank, balancing recovery runs with forward width.',
    LWB: 'Covers the full left flank, balancing recovery runs with forward width.',
    RW: 'Stretches the right side, carries the ball forward and creates chances.',
    LW: 'Stretches the left side, carries the ball forward and creates chances.',
    ST: 'Leads the attack, occupies defenders and finishes chances.'
  };

  const formations = {
    '433': [
      { id: 1, name: 'GK (Goalkeeper)', pos: { x: 50, y: 90 } },
      { id: 2, name: 'RB (Right Back)', pos: { x: 80, y: 72 } },
      { id: 3, name: 'CB (Centre Back)', pos: { x: 62, y: 78 } },
      { id: 4, name: 'CB (Centre Back)', pos: { x: 38, y: 78 } },
      { id: 5, name: 'LB (Left Back)', pos: { x: 20, y: 72 } },
      { id: 6, name: 'CDM (Defensive Midfielder)', pos: { x: 50, y: 55 } },
      { id: 7, name: 'CM (Central Midfielder)', pos: { x: 70, y: 40 } },
      { id: 8, name: 'CM (Central Midfielder)', pos: { x: 30, y: 40 } },
      { id: 9, name: 'RW (Right Winger)', pos: { x: 82, y: 20 } },
      { id: 10, name: 'ST (Striker)', pos: { x: 50, y: 15 } },
      { id: 11, name: 'LW (Left Winger)', pos: { x: 18, y: 20 } }
    ],
    '4231': [
      { id: 1, name: 'GK', pos: { x: 50, y: 90 } },
      { id: 2, name: 'RB', pos: { x: 82, y: 75 } },
      { id: 3, name: 'CB', pos: { x: 63, y: 80 } },
      { id: 4, name: 'CB', pos: { x: 37, y: 80 } },
      { id: 5, name: 'LB', pos: { x: 18, y: 75 } },
      { id: 6, name: 'CDM', pos: { x: 62, y: 60 } },
      { id: 7, name: 'CDM', pos: { x: 38, y: 60 } },
      { id: 8, name: 'RAM', pos: { x: 78, y: 35 } },
      { id: 9, name: 'CAM', pos: { x: 50, y: 32 } },
      { id: 10, name: 'LAM', pos: { x: 22, y: 35 } },
      { id: 11, name: 'ST', pos: { x: 50, y: 14 } }
    ],
    '352': [
      { id: 1, name: 'GK', pos: { x: 50, y: 90 } },
      { id: 2, name: 'CB', pos: { x: 75, y: 78 } },
      { id: 3, name: 'CB', pos: { x: 50, y: 80 } },
      { id: 4, name: 'CB', pos: { x: 25, y: 78 } },
      { id: 5, name: 'RWB', pos: { x: 88, y: 48 } },
      { id: 6, name: 'CM', pos: { x: 65, y: 52 } },
      { id: 7, name: 'CM', pos: { x: 50, y: 45 } },
      { id: 8, name: 'CM', pos: { x: 35, y: 52 } },
      { id: 9, name: 'LWB', pos: { x: 12, y: 48 } },
      { id: 10, name: 'ST', pos: { x: 62, y: 18 } },
      { id: 11, name: 'ST', pos: { x: 38, y: 18 } }
    ]
  };

  function renderFormation(formationKey) {
    if (!pitchPlayersLayer) return;
    pitchPlayersLayer.innerHTML = '';
    const currentFormation = formations[formationKey] || formations['433'];

    currentFormation.forEach(player => {
      const positionCode = player.name.split(' ')[0];
      const positionInsight = roleInsights[positionCode];
      const node = document.createElement('button');
      node.className = 'player-node';
      node.type = 'button';
      node.style.left = `${player.pos.x}%`;
      node.style.top = `${player.pos.y}%`;
      node.textContent = player.id;
      node.setAttribute('title', `${player.name} — ${positionInsight}`);
      node.setAttribute('aria-label', `Player ${player.id}: ${player.name}. ${positionInsight}`);

      node.addEventListener('click', () => {
        if (playerTooltip) {
          playerTooltip.innerHTML = `<i class="fa-solid fa-futbol text-emerald"></i> <strong>#${player.id} ${player.name}:</strong> ${positionInsight}`;
          playerTooltip.style.borderColor = 'var(--accent-emerald)';
          hideDecorativeIcons(playerTooltip);
        }
      });

      pitchPlayersLayer.appendChild(node);
    });
  }

  formationBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      formationBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      const formKey = btn.getAttribute('data-formation');
      renderFormation(formKey);
    });
  });

  renderFormation('433');

  /* ------------------------------------------------------------------------
     3. ADV MOTORBIKE TOURING WIDGET
     ------------------------------------------------------------------------ */
  const routeTabs = document.querySelectorAll('.route-tab');
  const routeDetailsEl = document.getElementById('adv-route-details');

  const routeData = {
    'tibet-2023': {
      title: 'Tibet and Lhasa',
      dateLabel: '2023 — Completed',
      statusLabel: 'Completed',
      statusClass: 'completed-status',
      desc: 'My first major post-COVID journey: solo snow riding, repeated falls, lifting the bike and continuing until I reached Lhasa.',
      points: ['Solo snow riding', 'Fell, lifted the bike and reset', 'Continued to Lhasa'],
      media: [
        { type: 'photo', src: 'assets/travel/tibet-photo-1.jpg', alt: 'Tibet plateau landscape on the road to Lhasa' },
        { type: 'photo', src: 'assets/travel/tibet-photo-2.jpg', alt: 'Tibet journey — mountain pass scenery' },
        { type: 'video', src: 'assets/travel/tibet-video.mp4', poster: 'assets/travel/tibet-video-poster.jpg', alt: 'Tibet journey video highlights' }
      ]
    },
    'sichuan-2025': {
      title: 'Western Sichuan',
      dateLabel: '2025 — Completed',
      statusLabel: 'Completed',
      statusClass: 'completed-status',
      desc: 'A completed journey through Western Sichuan, where the landscapes and road conditions kept changing rather than offering only plateau scenery.',
      points: ['Diverse landscapes', 'Changing road conditions', 'Travel and discoveries along the road'],
      media: [
        { type: 'photo', src: 'assets/travel/sichuan-photo.jpg', alt: 'Western Sichuan journey — changing landscapes' },
        { type: 'video', src: 'assets/travel/sichuan-video-1.mp4', poster: 'assets/travel/sichuan-video-1-poster.jpg', alt: 'Western Sichuan journey video — part 1' },
        { type: 'video', src: 'assets/travel/sichuan-video-2.mp4', poster: 'assets/travel/sichuan-video-2-poster.jpg', alt: 'Western Sichuan journey video — part 2' }
      ]
    },
    'hulunbuir-2026': {
      title: 'Hulunbuir Grasslands and the Greater Khingan Range',
      dateLabel: 'September 2026 — Planned',
      statusLabel: 'Planned',
      statusClass: 'planned-status',
      desc: 'A planned September 2026 journey to the Hulunbuir Grasslands and the Greater Khingan Range.',
      points: ['Hulunbuir Grasslands', 'Greater Khingan Range', 'Journey planned for September 2026'],
      media: [
        { type: 'pdf', src: 'assets/travel/hulunbuir-logbook.pdf', alt: 'Hulunbuir Wilderness Moto Logbook' }
      ]
    }
  };

  function renderRoute(routeKey) {
    const data = routeData[routeKey] || routeData['tibet-2023'];

    if (routeDetailsEl) {
      routeDetailsEl.innerHTML = `
        <h4><i class="fa-solid fa-route text-indigo"></i> ${data.title}</h4>
        <span class="${data.statusClass}">${data.dateLabel}</span>
        <p class="journey-description">${data.desc}</p>
      `;
    }

    const galleryEl = document.getElementById('travel-gallery');
    if (galleryEl) {
      galleryEl.innerHTML = '';
      (data.media || []).forEach(item => {
        if (item.type === 'photo') {
          const figure = document.createElement('figure');
          figure.className = 'gallery-item gallery-photo';
          figure.innerHTML = `<img src="${item.src}" alt="${item.alt}" loading="lazy">`;
          galleryEl.appendChild(figure);
        } else if (item.type === 'video') {
          const figure = document.createElement('figure');
          figure.className = 'gallery-item gallery-video';
          figure.innerHTML = `<video controls preload="none" poster="${item.poster}" aria-label="${item.alt}"><source src="${item.src}" type="video/mp4"></video>`;
          galleryEl.appendChild(figure);
        } else if (item.type === 'pdf') {
          const link = document.createElement('a');
          link.className = 'gallery-item gallery-pdf';
          link.href = item.src;
          link.target = '_blank';
          link.rel = 'noopener';
          link.innerHTML = `<i class="fa-solid fa-file-pdf"></i><span>${item.alt}</span><i class="fa-solid fa-arrow-up-right-from-square"></i>`;
          galleryEl.appendChild(link);
        }
      });
      hideDecorativeIcons(galleryEl);
    }

    hideDecorativeIcons();
  }

  routeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      routeTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-pressed', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-pressed', 'true');
      const rKey = tab.getAttribute('data-route');
      renderRoute(rKey);
    });
  });

  renderRoute('tibet-2023');

  /* ------------------------------------------------------------------------
     5. COMMAND PALETTE (CMD+K)
     ------------------------------------------------------------------------ */
  const cmdKBtn = document.getElementById('cmd-k-btn');
  const footerCmdBtn = document.getElementById('footer-cmd-btn');
  const cmdKModal = document.getElementById('cmd-k-modal');
  const cmdKInput = document.getElementById('cmd-k-input');
  const cmdKResults = document.getElementById('cmd-k-results');
  let cmdKTrigger = null;
  let activeCommandIndex = -1;

  const commands = [
    { title: 'Profile Summary', subtitle: 'Frankie (Yifan) Zhu - global transformation and technology leader', target: '#hero', icon: 'fa-user' },
    { title: 'How I Think and Lead', subtitle: 'Clear direction, easier execution and stronger teams', target: '#principles', icon: 'fa-compass' },
    { title: 'Career Experience', subtitle: 'Transformation, customer experience and technology operations', target: '#experience', icon: 'fa-briefcase' },
    { title: 'From Strategy to Results', subtitle: 'Strategy, people, delivery, tools and technology', target: '#capabilities', icon: 'fa-chart-line' },
    { title: 'Manchester United ⚽ Formation', subtitle: 'Interactive formation switcher and team tactics', target: '#hobbies', icon: 'fa-futbol' },
    { title: 'Snooker 🎱', subtitle: 'Standard 22-ball table with point values', target: '#hobbies', icon: 'fa-circle-dot' },
    { title: 'ADV Motorbike 🏍️ Journeys', subtitle: 'Completed journeys and the September 2026 plan', target: '#hobbies', icon: 'fa-motorcycle' },
    { title: 'Education', subtitle: 'Academic foundation in e-business management and economics', target: '#education', icon: 'fa-graduation-cap' },
    { title: 'Connect', subtitle: 'LinkedIn and email', target: '#connect', icon: 'fa-paper-plane' },
    { title: 'Share Profile QR Code', subtitle: 'Display a QR code for sharing this public profile', action: 'QR_MODE', icon: 'fa-qrcode' }
  ];

  function openCmdK(trigger = document.activeElement) {
    cmdKTrigger = trigger;
    cmdKModal?.classList.remove('hidden');
    cmdKModal?.setAttribute('aria-hidden', 'false');
    renderCmdResults('');
    cmdKInput?.focus();
  }

  function closeCmdK({ returnFocus = true } = {}) {
    cmdKModal?.classList.add('hidden');
    cmdKModal?.setAttribute('aria-hidden', 'true');
    if (cmdKInput) cmdKInput.value = '';
    if (returnFocus) window.modalFocus?.restoreFocus(cmdKTrigger);
  }

  function getCommandItems() {
    return Array.from(cmdKResults?.querySelectorAll('[data-command-index]') ?? []);
  }

  function updateActiveCommand(index, scrollIntoView = false) {
    const items = getCommandItems();
    activeCommandIndex = items.length === 0 ? -1 : Math.max(0, Math.min(index, items.length - 1));

    items.forEach((item, itemIndex) => {
      const isActive = itemIndex === activeCommandIndex;
      item.classList.toggle('active', isActive);
      item.setAttribute('aria-selected', String(isActive));
      if (isActive && scrollIntoView) item.scrollIntoView({ block: 'nearest' });
    });

    const activeItem = items[activeCommandIndex];
    if (activeItem) cmdKInput?.setAttribute('aria-activedescendant', activeItem.id);
    else cmdKInput?.removeAttribute('aria-activedescendant');
  }

  function activateCommand(cmd) {
    if (cmd.target) {
      const destination = document.querySelector(cmd.target);
      closeCmdK({ returnFocus: false });
      if (!window.modalFocus?.focusSectionHeading(destination)) {
        window.modalFocus?.restoreFocus(cmdKTrigger);
      }
    } else if (cmd.action === 'QR_MODE') {
      closeCmdK({ returnFocus: false });
      openQR(cmdKTrigger);
    }
  }

  function renderCmdResults(filterText) {
    if (!cmdKResults) return;
    cmdKResults.innerHTML = '';
    const query = filterText.toLowerCase().trim();

    const filtered = commands.filter(c => 
      c.title.toLowerCase().includes(query) || c.subtitle.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
      cmdKResults.innerHTML = `<div class="cmd-item"><span style="color:var(--text-muted)">No matching commands found...</span></div>`;
      updateActiveCommand(-1);
      return;
    }

    filtered.forEach((cmd, idx) => {
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'cmd-item';
      item.id = `cmd-result-${idx}`;
      item.dataset.commandIndex = String(idx);
      item.setAttribute('aria-selected', 'false');
      item.innerHTML = `
        <div style="display:flex; align-items:center; gap:0.8rem">
          <i class="fa-solid ${cmd.icon} text-indigo"></i>
          <div>
            <div style="font-weight:600">${cmd.title}</div>
            <div style="font-size:0.75rem; color:var(--text-muted)">${cmd.subtitle}</div>
          </div>
        </div>
        <i class="fa-solid fa-arrow-right" style="font-size:0.8rem; opacity:0.5"></i>
      `;

      item.addEventListener('click', () => {
        activateCommand(cmd);
      });

      cmdKResults.appendChild(item);
    });

    updateActiveCommand(0);
    hideDecorativeIcons(cmdKResults);
  }

  cmdKBtn?.addEventListener('click', () => openCmdK(cmdKBtn));
  footerCmdBtn?.addEventListener('click', () => openCmdK(footerCmdBtn));

  cmdKInput?.addEventListener('input', (e) => {
    renderCmdResults(e.target.value);
  });

  cmdKInput?.addEventListener('keydown', (event) => {
    const items = getCommandItems();
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const nextIndex = window.modalFocus?.getNextCommandIndex(
        activeCommandIndex,
        event.key,
        items.length,
      ) ?? activeCommandIndex;
      updateActiveCommand(nextIndex, true);
    } else if (event.key === 'Enter' && activeCommandIndex >= 0) {
      event.preventDefault();
      items[activeCommandIndex]?.click();
    }
  });

  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (cmdKModal?.classList.contains('hidden')) openCmdK();
      else closeCmdK();
    } else if (e.key === 'Escape') {
      if (!qrModal?.classList.contains('hidden')) closeQR();
      else if (!cmdKModal?.classList.contains('hidden')) closeCmdK();
    }
  });

  cmdKModal?.addEventListener('click', (e) => {
    if (e.target === cmdKModal) closeCmdK();
  });
  cmdKModal?.addEventListener('keydown', (e) => {
    window.modalFocus?.trapTabFocus(e, cmdKModal);
  });

  /* ------------------------------------------------------------------------
     6. QR CODE MODAL
     ------------------------------------------------------------------------ */
  const qrModal = document.getElementById('qr-modal');
  const qrCloseBtn = document.getElementById('qr-close-btn');
  const footerQrBtn = document.getElementById('footer-qr-btn');
  let qrTrigger = null;

  function openQR(trigger = document.activeElement) {
    qrTrigger = trigger;
    qrModal?.classList.remove('hidden');
    qrModal?.setAttribute('aria-hidden', 'false');
    qrCloseBtn?.focus();
  }

  function closeQR() {
    qrModal?.classList.add('hidden');
    qrModal?.setAttribute('aria-hidden', 'true');
    window.modalFocus?.restoreFocus(qrTrigger);
  }

  footerQrBtn?.addEventListener('click', () => openQR(footerQrBtn));
  qrCloseBtn?.addEventListener('click', closeQR);
  qrModal?.addEventListener('click', (e) => {
    if (e.target === qrModal) closeQR();
  });
  qrModal?.addEventListener('keydown', (e) => {
    window.modalFocus?.trapTabFocus(e, qrModal);
  });

  hideDecorativeIcons();
});
