/* ==========================================================================
   FRANKIE ZHU — SELF INTRO WEB APP INTERACTIVE LOGIC
   Soccer Pitch, Snooker Break Builder, ADV Touring Map, Cmd+K, 10-Min Timer
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
     1. TECH TABS SWITCHER
     ------------------------------------------------------------------------ */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      document.getElementById(targetTab)?.classList.add('active');
    });
  });

  /* ------------------------------------------------------------------------
     2. SOCCER TACTICAL PITCH WIDGET
     ------------------------------------------------------------------------ */
  const pitchPlayersLayer = document.getElementById('pitch-players-layer');
  const playerTooltip = document.getElementById('player-tooltip');
  const formationBtns = document.querySelectorAll('.formation-btn');

  const formations = {
    '433': [
      { id: 1, name: 'GK (Goalie)', pos: { x: 50, y: 90 }, role: 'Risk Control & 99% SLA Stability' },
      { id: 2, name: 'RB (Right Back)', pos: { x: 80, y: 72 }, role: 'Omni-channel Digital Support' },
      { id: 3, name: 'CB (Center Back)', pos: { x: 62, y: 78 }, role: 'GenAI Dev-Sec-Ops Governance' },
      { id: 4, name: 'CB (Center Back)', pos: { x: 38, y: 78 }, role: 'Responsible AI & Security Audit' },
      { id: 5, name: 'LB (Left Back)', pos: { x: 20, y: 72 }, role: 'HappySignal XLA & CSAT 4.9/5' },
      { id: 6, name: 'CDM (Anchor)', pos: { x: 50, y: 55 }, role: 'ITIL Master & PMP Architecture' },
      { id: 7, name: 'CM (Playmaker)', pos: { x: 70, y: 40 }, role: 'Strategic Delivery Head (Frankie)' },
      { id: 8, name: 'CM (Engine)', pos: { x: 30, y: 40 }, role: '0% ➔ 80% Digital Adoption' },
      { id: 9, name: 'RW (Wing Forward)', pos: { x: 82, y: 20 }, role: 'Productivity & AI Chatbot' },
      { id: 10, name: 'ST (Striker)', pos: { x: 50, y: 15 }, role: '2x Global GLM Award Winner' },
      { id: 11, name: 'LW (Wing Forward)', pos: { x: 18, y: 20 }, role: 'Agentic AI Workflows' }
    ],
    '4231': [
      { id: 1, name: 'GK', pos: { x: 50, y: 90 }, role: 'Enterprise Risk Shield' },
      { id: 2, name: 'RB', pos: { x: 82, y: 75 }, role: 'Mars & HP China Track Record' },
      { id: 3, name: 'CB', pos: { x: 63, y: 80 }, role: 'GenAI Platform 96% Availability' },
      { id: 4, name: 'CB', pos: { x: 37, y: 80 }, role: 'SAP & ServiceNow Ecosystem' },
      { id: 5, name: 'LB', pos: { x: 18, y: 75 }, role: 'Customer Experience Transformation' },
      { id: 6, name: 'CDM', pos: { x: 62, y: 60 }, role: 'Regional Team Lead (50 Squad)' },
      { id: 7, name: 'CDM', pos: { x: 38, y: 60 }, role: 'Global IT Operations Governance' },
      { id: 8, name: 'RAM', pos: { x: 78, y: 35 }, role: 'Automation Utilization (+200% T1)' },
      { id: 9, name: 'CAM', pos: { x: 50, y: 32 }, role: 'Frankie (Yifan) Zhu — Delivery Head' },
      { id: 10, name: 'LAM', pos: { x: 22, y: 35 }, role: 'Gallup Top 5 Team Engagement' },
      { id: 11, name: 'ST', pos: { x: 50, y: 14 }, role: '20+ Yrs Business Value Delivery' }
    ],
    '352': [
      { id: 1, name: 'GK', pos: { x: 50, y: 90 }, role: 'Operational Excellence' },
      { id: 2, name: 'CB', pos: { x: 75, y: 78 }, role: 'GenAI Dev-Sec-Ops' },
      { id: 3, name: 'CB', pos: { x: 50, y: 80 }, role: 'Enterprise Core Anchor' },
      { id: 4, name: 'CB', pos: { x: 25, y: 78 }, role: 'Compliance & Audit Assurance' },
      { id: 5, name: 'RWB', pos: { x: 88, y: 48 }, role: 'Omni-channel Support' },
      { id: 6, name: 'CM', pos: { x: 65, y: 52 }, role: 'ITIL Master Framework' },
      { id: 7, name: 'CM', pos: { x: 50, y: 45 }, role: 'Frankie Zhu (Strategic Leader)' },
      { id: 8, name: 'CM', pos: { x: 35, y: 52 }, role: 'PMP Programme Director' },
      { id: 9, name: 'LWB', pos: { x: 12, y: 48 }, role: 'HappySignal XLA Metrics' },
      { id: 10, name: 'ST', pos: { x: 62, y: 18 }, role: '2x GLM Leadership Award' },
      { id: 11, name: 'ST', pos: { x: 38, y: 18 }, role: '4.9/5 User CSAT Score' }
    ]
  };

  function renderFormation(formationKey) {
    if (!pitchPlayersLayer) return;
    pitchPlayersLayer.innerHTML = '';
    const currentFormation = formations[formationKey] || formations['433'];

    currentFormation.forEach(player => {
      const node = document.createElement('div');
      node.className = 'player-node';
      node.style.left = `${player.pos.x}%`;
      node.style.top = `${player.pos.y}%`;
      node.textContent = player.id;
      node.setAttribute('title', `${player.name} - ${player.role}`);

      node.addEventListener('click', () => {
        if (playerTooltip) {
          playerTooltip.innerHTML = `<i class="fa-solid fa-futbol text-emerald"></i> <strong>#${player.id} ${player.name}:</strong> ${player.role}`;
          playerTooltip.style.borderColor = 'var(--accent-emerald)';
        }
      });

      pitchPlayersLayer.appendChild(node);
    });
  }

  formationBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      formationBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const formKey = btn.getAttribute('data-formation');
      renderFormation(formKey);
    });
  });

  renderFormation('433');

  /* ------------------------------------------------------------------------
     3. SNOOKER BREAK BUILDER WIDGET
     ------------------------------------------------------------------------ */
  let snookerBreak = 0;
  let ballsPotted = 0;
  let nextBallMustBeRed = true;

  const breakScoreEl = document.getElementById('snooker-break-score');
  const ballsCountEl = document.getElementById('snooker-balls-count');
  const potRedBtn = document.getElementById('pot-red-btn');
  const potBlackBtn = document.getElementById('pot-black-btn');
  const resetSnookerBtn = document.getElementById('reset-snooker-btn');
  const snookerInsightEl = document.getElementById('snooker-feedback');
  const cueBall = document.getElementById('snooker-cue-ball');
  const targetBall = document.getElementById('snooker-target-ball');

  function updateSnookerUI() {
    if (breakScoreEl) breakScoreEl.textContent = snookerBreak;
    if (ballsCountEl) ballsCountEl.textContent = ballsPotted;

    if (potRedBtn) potRedBtn.disabled = !nextBallMustBeRed;
    if (potBlackBtn) potBlackBtn.disabled = nextBallMustBeRed;
  }

  function triggerBallAnimation(isRed) {
    if (cueBall && targetBall) {
      cueBall.style.transform = 'translate(15px, 0)';
      targetBall.style.transform = 'translate(60px, -20px) scale(0.5)';
      targetBall.style.opacity = '0.3';

      setTimeout(() => {
        cueBall.style.transform = 'translate(0, 0)';
        targetBall.style.transform = 'translate(0, 0)';
        targetBall.style.opacity = '1';
        if (isRed && targetBall) targetBall.className = 'ball ball-black';
        else if (targetBall) targetBall.className = 'ball ball-red';
      }, 400);
    }
  }

  if (potRedBtn) {
    potRedBtn.addEventListener('click', () => {
      if (!nextBallMustBeRed) return;
      snookerBreak += 1;
      ballsPotted += 1;
      nextBallMustBeRed = false;
      triggerBallAnimation(true);
      updateSnookerUI();

      if (snookerInsightEl) {
        snookerInsightEl.innerHTML = `<i class="fa-solid fa-circle-check text-emerald"></i> <strong>Potted Red (+1)!</strong> Excellent cue ball position for the Black. Now pot the Black ball!`;
      }
    });
  }

  if (potBlackBtn) {
    potBlackBtn.addEventListener('click', () => {
      if (nextBallMustBeRed) return;
      snookerBreak += 7;
      ballsPotted += 1;
      nextBallMustBeRed = true;
      triggerBallAnimation(false);
      updateSnookerUI();

      if (snookerInsightEl) {
        snookerInsightEl.innerHTML = `<i class="fa-solid fa-star text-amber"></i> <strong>Potted Black (+7)!</strong> Break building in progress (${snookerBreak} pts)! Leadership lesson: High performance comes from repeated precision.`;
      }
    });
  }

  if (resetSnookerBtn) {
    resetSnookerBtn.addEventListener('click', () => {
      snookerBreak = 0;
      ballsPotted = 0;
      nextBallMustBeRed = true;
      if (targetBall) targetBall.className = 'ball ball-red';
      updateSnookerUI();

      if (snookerInsightEl) {
        snookerInsightEl.innerHTML = `<i class="fa-solid fa-lightbulb text-amber"></i> <strong>Leadership Insight:</strong> Potting a red is execution; positioning the cue ball for the black is strategic foresight.`;
      }
    });
  }

  /* ------------------------------------------------------------------------
     4. ADV MOTORBIKE TOURING WIDGET
     ------------------------------------------------------------------------ */
  const routeTabs = document.querySelectorAll('.route-tab');
  const routeDetailsEl = document.getElementById('adv-route-details');
  const routeMapTitleEl = document.getElementById('route-map-title');
  const elevationGraphicEl = document.getElementById('elevation-graphic');

  const routeData = {
    'route-318': {
      title: 'Sichuan-Tibet Highway (Route 318)',
      dist: '2,140 km',
      elevation: '5,130 m',
      terrain: 'High Altitude Mountain Passes',
      bike: '1200cc Adventure Touring',
      desc: 'One of the most challenging and iconic ADV routes in the world. Crossing 14 mountain passes above 4,000 meters elevation, demanding extreme weather resilience, navigation, and physical endurance.',
      bars: [
        { height: 40, pass: 'Chengdu (500m)' },
        { height: 65, pass: 'Zheduo Pass (4,298m)' },
        { height: 80, pass: 'Jianziwan Pass (4,659m)' },
        { height: 95, pass: 'Dongda Pass (5,130m)' },
        { height: 85, pass: 'Sejila Pass (4,728m)' },
        { height: 50, pass: 'Lhasa (3,650m)' }
      ]
    },
    'route-alps': {
      title: 'Alpine Pass Challenge (Stelvio & Grossglockner)',
      dist: '1,450 km',
      elevation: '2,757 m',
      terrain: '48 Hairpin Switchbacks & Alpine Glaciers',
      bike: '1200cc Dual-Sport ADV',
      desc: 'Navigating European mountain passes with tight hairpins, rapid weather shifts, and technical braking. Parallels complex enterprise delivery: precision control around tight curves.',
      bars: [
        { height: 35, pass: 'Innsbruck' },
        { height: 85, pass: 'Grossglockner (2,504m)' },
        { height: 100, pass: 'Stelvio Pass (2,757m)' },
        { height: 75, pass: 'Furka Pass (2,429m)' },
        { height: 45, pass: 'Zurich' }
      ]
    },
    'route-coastal': {
      title: 'Ocean Coastal Highway & Forest Loop',
      dist: '1,800 km',
      elevation: '1,200 m',
      terrain: 'Coastal Twisties & Mountain Trails',
      bike: 'Adventure Touring Spec',
      desc: 'Long-distance coastal endurance tour combining high-speed highway cruising with unexpected gravel trail detours. Emphasizes adaptability and long-range planning.',
      bars: [
        { height: 20, pass: 'Coastal Start' },
        { height: 45, pass: 'Mountain Ridge' },
        { height: 30, pass: 'Cliffside Route' },
        { height: 60, pass: 'High Forest Trail' },
        { height: 25, pass: 'Coastline Finish' }
      ]
    }
  };

  function renderRoute(routeKey) {
    const data = routeData[routeKey] || routeData['route-318'];

    if (routeDetailsEl) {
      routeDetailsEl.innerHTML = `
        <h4><i class="fa-solid fa-route text-indigo"></i> ${data.title}</h4>
        <p class="passion-desc">${data.desc}</p>
        <div class="adv-stats-row">
          <div class="adv-stat"><span class="val">${data.dist}</span><span class="lbl">Total Distance</span></div>
          <div class="adv-stat"><span class="val">${data.elevation}</span><span class="lbl">Max Elevation</span></div>
          <div class="adv-stat"><span class="val">${data.bike}</span><span class="lbl">Bike Setup</span></div>
        </div>
      `;
    }

    if (routeMapTitleEl) routeMapTitleEl.textContent = `${data.title} — Profile`;

    if (elevationGraphicEl) {
      elevationGraphicEl.innerHTML = '';
      data.bars.forEach(b => {
        const bar = document.createElement('div');
        bar.className = 'elev-bar';
        bar.style.height = `${b.height}%`;
        bar.setAttribute('data-pass', b.pass);
        elevationGraphicEl.appendChild(bar);
      });
    }
  }

  routeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      routeTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const rKey = tab.getAttribute('data-route');
      renderRoute(rKey);
    });
  });

  renderRoute('route-318');

  /* ------------------------------------------------------------------------
     5. 10-MINUTE PRESENTATION TIMER & OVERLAY
     ------------------------------------------------------------------------ */
  const presentationOverlay = document.getElementById('presentation-overlay');
  const startPresentationBtn = document.getElementById('start-presentation-btn');
  const timerDisplay = document.getElementById('timer-display');
  const timerToggleBtn = document.getElementById('timer-toggle-btn');
  const timerResetBtn = document.getElementById('timer-reset-btn');
  const timerCloseBtn = document.getElementById('timer-close-btn');

  let timerSeconds = 600; // 10 minutes
  let timerInterval = null;
  let isTimerRunning = false;

  function formatTime(secs) {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  function updateTimerDisplay() {
    if (timerDisplay) timerDisplay.textContent = formatTime(timerSeconds);
  }

  function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    isTimerRunning = true;
    if (timerToggleBtn) timerToggleBtn.innerHTML = `<i class="fa-solid fa-pause"></i> Pause`;

    timerInterval = setInterval(() => {
      if (timerSeconds > 0) {
        timerSeconds--;
        updateTimerDisplay();
      } else {
        clearInterval(timerInterval);
        isTimerRunning = false;
        if (timerToggleBtn) timerToggleBtn.innerHTML = `<i class="fa-solid fa-check"></i> Done`;
      }
    }, 1000);
  }

  function pauseTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
    if (timerToggleBtn) timerToggleBtn.innerHTML = `<i class="fa-solid fa-play"></i> Resume`;
  }

  if (startPresentationBtn) {
    startPresentationBtn.addEventListener('click', () => {
      presentationOverlay?.classList.remove('hidden');
      timerSeconds = 600;
      updateTimerDisplay();
      startTimer();
    });
  }

  if (timerToggleBtn) {
    timerToggleBtn.addEventListener('click', () => {
      if (isTimerRunning) pauseTimer();
      else startTimer();
    });
  }

  if (timerResetBtn) {
    timerResetBtn.addEventListener('click', () => {
      pauseTimer();
      timerSeconds = 600;
      updateTimerDisplay();
    });
  }

  if (timerCloseBtn) {
    timerCloseBtn.addEventListener('click', () => {
      pauseTimer();
      presentationOverlay?.classList.add('hidden');
    });
  }

  /* ------------------------------------------------------------------------
     6. COMMAND PALETTE (CMD+K)
     ------------------------------------------------------------------------ */
  const cmdKBtn = document.getElementById('cmd-k-btn');
  const footerCmdBtn = document.getElementById('footer-cmd-btn');
  const cmdKModal = document.getElementById('cmd-k-modal');
  const cmdKInput = document.getElementById('cmd-k-input');
  const cmdKResults = document.getElementById('cmd-k-results');

  const commands = [
    { title: 'Hero & Summary', subtitle: 'Frankie (Yifan) Zhu - 20+ Yrs IT & GenAI Leader', target: '#hero', icon: 'fa-user' },
    { title: 'How I Think and Lead', subtitle: 'Clear direction, easier execution and stronger teams', target: '#principles', icon: 'fa-compass' },
    { title: '20+ Yrs Career Experience', subtitle: 'Mars (15+ Yrs) & HP China track record', target: '#experience', icon: 'fa-briefcase' },
    { title: 'GenAI & Tech Capability', subtitle: 'GenAI Dev-Sec-Ops, ITIL Master & PMP Certifications', target: '#tech-capability', icon: 'fa-code' },
    { title: 'Soccer ⚽ Tactical Pitch', subtitle: 'Interactive formation switcher & team tactics', target: '#passions', icon: 'fa-futbol' },
    { title: 'Snooker 🎱 Break Builder', subtitle: 'Interactive 147 break potting simulator', target: '#passions', icon: 'fa-circle-dot' },
    { title: 'ADV Motorbike 🏍️ Routes', subtitle: 'Route 318 & mountain pass tour profiles', target: '#passions', icon: 'fa-motorcycle' },
    { title: '10-Minute Presentation Agenda', subtitle: 'Timeline breakdown for today\'s meeting', target: '#agenda', icon: 'fa-stopwatch' },
    { title: 'Start 10-Min Intro Timer Mode', subtitle: 'Activate presentation overlay & timer', action: 'TIMER_MODE', icon: 'fa-play' },
    { title: 'Share Mobile QR Code', subtitle: 'Display QR code for phone scanning', action: 'QR_MODE', icon: 'fa-qrcode' }
  ];

  function openCmdK() {
    cmdKModal?.classList.remove('hidden');
    cmdKInput?.focus();
    renderCmdResults('');
  }

  function closeCmdK() {
    cmdKModal?.classList.add('hidden');
    if (cmdKInput) cmdKInput.value = '';
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
      return;
    }

    filtered.forEach((cmd, idx) => {
      const item = document.createElement('div');
      item.className = `cmd-item ${idx === 0 ? 'active' : ''}`;
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
        closeCmdK();
        if (cmd.target) {
          document.querySelector(cmd.target)?.scrollIntoView({ behavior: 'smooth' });
        } else if (cmd.action === 'TIMER_MODE') {
          presentationOverlay?.classList.remove('hidden');
          startTimer();
        } else if (cmd.action === 'QR_MODE') {
          document.getElementById('qr-modal')?.classList.remove('hidden');
        }
      });

      cmdKResults.appendChild(item);
    });
  }

  cmdKBtn?.addEventListener('click', openCmdK);
  footerCmdBtn?.addEventListener('click', openCmdK);

  cmdKInput?.addEventListener('input', (e) => {
    renderCmdResults(e.target.value);
  });

  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (cmdKModal?.classList.contains('hidden')) openCmdK();
      else closeCmdK();
    } else if (e.key === 'Escape') {
      closeCmdK();
      document.getElementById('qr-modal')?.classList.add('hidden');
    }
  });

  cmdKModal?.addEventListener('click', (e) => {
    if (e.target === cmdKModal) closeCmdK();
  });

  /* ------------------------------------------------------------------------
     7. QR CODE MODAL
     ------------------------------------------------------------------------ */
  const qrModal = document.getElementById('qr-modal');
  const qrCloseBtn = document.getElementById('qr-close-btn');
  const heroQrBtn = document.getElementById('hero-qr-btn');
  const footerQrBtn = document.getElementById('footer-qr-btn');

  function openQR() {
    qrModal?.classList.remove('hidden');
  }

  heroQrBtn?.addEventListener('click', openQR);
  footerQrBtn?.addEventListener('click', openQR);
  qrCloseBtn?.addEventListener('click', () => qrModal?.classList.add('hidden'));
  qrModal?.addEventListener('click', (e) => {
    if (e.target === qrModal) qrModal?.classList.add('hidden');
  });

});
