/**
 * RESENHA OS // SENAC PALMAS
 * Sistema Operacional da Zueira & Fofoca - Aniversário Prof. João Pedro
 * Interface estilo macOS Sequoia / Sonoma
 */

document.addEventListener('DOMContentLoaded', () => {
  initWindowManager();
  initDockNavigation();
  initNotesFilters();
  initHypeButton();
  initCabecaoMeter();
  initMuralFeed();
  initMenuBarActions();
  initQuickLook();
  initMacConfettiEngine();
  updateLiveClock();
});

/* ==========================================================================
   1. GERENCIADOR DE JANELAS (macOS WINDOW MANAGER)
   ========================================================================== */
let topZIndex = 20;

function bringToFront(windowElement) {
  if (!windowElement) return;
  topZIndex++;
  windowElement.style.zIndex = topZIndex;

  // Atualiza classe de foco
  document.querySelectorAll('.macos-window').forEach(win => win.classList.remove('is-focused'));
  windowElement.classList.add('is-focused');
}

function initWindowManager() {
  const windows = document.querySelectorAll('.macos-window');

  // Trazer janela para frente ao clicar
  windows.forEach(win => {
    win.addEventListener('mousedown', () => bringToFront(win));
  });

  // Botões Semáforo (Traffic Lights)
  const trafficButtons = document.querySelectorAll('.traffic-btn');
  trafficButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetId = btn.getAttribute('data-target');
      const win = document.getElementById(targetId);
      if (!win) return;

      const appType = win.getAttribute('data-window');

      if (btn.classList.contains('close')) {
        // Fechar janela
        win.classList.add('is-minimized');
        updateDockState(appType, false);
      } else if (btn.classList.contains('minimize')) {
        // Minimizar janela
        win.classList.add('is-minimized');
        updateDockState(appType, false);
      } else if (btn.classList.contains('expand')) {
        // Expandir / Restaurar tamanho normal
        win.classList.toggle('is-expanded');
        bringToFront(win);
      }
    });
  });
}

function openOrRestoreWindow(windowId, appType) {
  const win = document.getElementById(windowId);
  if (!win) return;

  win.classList.remove('is-minimized');
  bringToFront(win);
  updateDockState(appType, true);

  // Rolagem suave até a janela se necessário
  win.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function updateDockState(appType, isActive) {
  const dockItem = document.querySelector(`.dock-item[data-app="${appType}"]`);
  if (dockItem) {
    if (isActive) {
      dockItem.classList.add('active');
    } else {
      dockItem.classList.remove('active');
    }
  }
}

/* ==========================================================================
   2. DOCK INFERIOR (macOS DOCK INTERACTIVITY)
   ========================================================================== */
function initDockNavigation() {
  const dockItems = document.querySelectorAll('.dock-item');

  dockItems.forEach(item => {
    item.addEventListener('click', () => {
      const app = item.getAttribute('data-app');

      if (app === 'safari') {
        openOrRestoreWindow('window-safari', 'safari');
      } else if (app === 'notes') {
        openOrRestoreWindow('window-notes', 'notes');
      } else if (app === 'terminal') {
        const termWin = document.getElementById('window-terminal');
        if (termWin.classList.contains('is-minimized')) {
          openOrRestoreWindow('window-terminal', 'terminal');
          if (window.fireMacConfetti) {
            window.fireMacConfetti({ particleCount: 30, spread: 50 });
          }
        } else {
          termWin.classList.add('is-minimized');
          updateDockState('terminal', false);
        }
      } else if (app === 'mural') {
        const muralWidget = document.getElementById('widget-mural');
        if (muralWidget) {
          muralWidget.scrollIntoView({ behavior: 'smooth', block: 'center' });
          muralWidget.style.transform = 'scale(1.04)';
          setTimeout(() => { muralWidget.style.transform = 'none'; }, 300);
        }
      } else if (app === 'trash') {
        alert('🗑️ Lixeira do Resenha OS:\n\n0 bugs encontrados! Todos os erros de sintaxe foram aniquilados pela didática do Professor João Pedro.');
      }
    });
  });
}

/* ==========================================================================
   3. NOTAS & FOFOCAS: SPLIT VIEW E FILTROS DE TAGS
   ========================================================================== */
function initNotesFilters() {
  const filterBtns = document.querySelectorAll('.tag-filter-btn');
  const noteCards = document.querySelectorAll('.note-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const selectedTag = btn.getAttribute('data-tag');

      noteCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (selectedTag === 'Todas' || cardCategory === selectedTag) {
          card.style.display = 'block';
          card.style.animation = 'fadeInMsg 0.3s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Reações rápidas nas notas
window.reactNote = function(button) {
  const countSpan = button.querySelector('.rx-count');
  if (countSpan) {
    let current = parseInt(countSpan.textContent, 10) || 0;
    countSpan.textContent = current + 1;

    button.style.transform = 'scale(1.2)';
    setTimeout(() => { button.style.transform = 'none'; }, 180);

    if (window.fireMacConfetti) {
      window.fireMacConfetti({ particleCount: 20, spread: 45 });
    }
  }
};

/* ==========================================================================
   4. MANDAR HYPE 🔥 (SAFARI WINDOW)
   ========================================================================== */
function initHypeButton() {
  const hypeBtn = document.getElementById('send-hype-btn');
  const hypeCounter = document.getElementById('hype-counter');

  if (hypeBtn && hypeCounter) {
    hypeBtn.addEventListener('click', () => {
      let currentHype = parseInt(hypeCounter.textContent, 10) || 842;
      hypeCounter.textContent = currentHype + 1;

      hypeBtn.style.transform = 'scale(1.1) translateY(-2px)';
      setTimeout(() => { hypeBtn.style.transform = 'none'; }, 150);

      if (window.fireMacConfetti) {
        window.fireMacConfetti({ particleCount: 60, spread: 75 });
      }
    });
  }
}

/* ==========================================================================
   5. WIDGET "PALAVRA DO ANO" & MEDIDOR DE CABEÇÃO 🧠
   ========================================================================== */
function initCabecaoMeter() {
  const measureBtn = document.getElementById('measure-cabecao-btn');
  const resultBox = document.getElementById('cabecao-result');
  const scoreBadge = document.getElementById('cabecao-score');
  const diagnosisText = document.getElementById('cabecao-text');

  const diagnósticos = [
    { score: '97%', text: 'Esqueceu o ponto e vírgula e culpou o sistema operacional!' },
    { score: '88%', text: 'Deu git commit -m "ajustes" em plena sexta-feira às 21h!' },
    { score: '99%', text: 'Perguntou "vai ter aula?" no WhatsApp 2 segundos após o trovão em Palmas!' },
    { score: '84%', text: 'Tentou debugar o código olhando fixamente pra tela sem rodar o console.log!' },
    { score: '92%', text: 'Deixou a pizza esfriar porque o código não compilava de primeira!' },
    { score: '100%', text: 'Proferiu "cabeção" com carinho e admiração pelo Professor João Pedro!' }
  ];

  if (measureBtn && resultBox) {
    measureBtn.addEventListener('click', () => {
      const randomIndex = Math.floor(Math.random() * diagnósticos.length);
      const chosen = diagnósticos[randomIndex];

      scoreBadge.textContent = chosen.score;
      diagnosisText.textContent = `Diagnóstico: ${chosen.text}`;

      resultBox.classList.remove('is-hidden');

      if (window.fireMacConfetti) {
        window.fireMacConfetti({ particleCount: 40, spread: 60 });
      }
    });
  }
}

/* ==========================================================================
   6. WIDGET MURAL AO VIVO (ENVIO DINÂMICO DE RECADOS)
   ========================================================================== */
function initMuralFeed() {
  const muralForm = document.getElementById('mural-form');
  const nameInput = document.getElementById('mural-name-input');
  const textInput = document.getElementById('mural-text-input');
  const messagesScroll = document.getElementById('mural-messages');

  if (muralForm && nameInput && textInput && messagesScroll) {
    muralForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = nameInput.value.trim();
      const text = textInput.value.trim();

      if (!name || !text) return;

      const newMsg = document.createElement('div');
      newMsg.className = 'mural-msg';
      newMsg.innerHTML = `
        <span class="msg-author">${escapeHtml(name)}:</span>
        <span class="msg-text">${escapeHtml(text)}</span>
      `;

      messagesScroll.appendChild(newMsg);
      messagesScroll.scrollTop = messagesScroll.scrollHeight;

      nameInput.value = '';
      textInput.value = '';

      if (window.fireMacConfetti) {
        window.fireMacConfetti({ particleCount: 35, spread: 55 });
      }
    });
  }

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, m => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    })[m]);
  }
}

/* ==========================================================================
   7. AÇÕES DA MENU BAR SUPERIOR
   ========================================================================== */
function initMenuBarActions() {
  const menuButtons = document.querySelectorAll('.menubar-items .menu-item');
  const celebrateBtn = document.getElementById('quick-celebrate-btn');
  const spotlightBtn = document.getElementById('spotlight-btn');

  menuButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.getAttribute('data-action');
      if (action === 'focus-safari') {
        openOrRestoreWindow('window-safari', 'safari');
      } else if (action === 'focus-notes' || action === 'focus-fofocas') {
        openOrRestoreWindow('window-notes', 'notes');
      } else if (action === 'focus-terminal') {
        openOrRestoreWindow('window-terminal', 'terminal');
      }
    });
  });

  if (celebrateBtn) {
    celebrateBtn.addEventListener('click', () => {
      if (window.fireMacConfetti) {
        window.fireMacConfetti({ particleCount: 100, spread: 100 });
      }
    });
  }

  if (spotlightBtn) {
    spotlightBtn.addEventListener('click', () => {
      const term = prompt('🔍 Busca Spotlight no Resenha OS:\nDigite o que deseja procurar (ex: "pizza", "camisetas", "cabeção"):');
      if (term) {
        alert(`✨ Spotlight encontrou: 100% de carinho da turma pelo Professor João Pedro com o termo "${term}"!`);
      }
    });
  }
}

function updateLiveClock() {
  const clockElement = document.getElementById('clock-display');
  if (!clockElement) return;

  function update() {
    const now = new Date();
    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

    const dayName = days[now.getDay()];
    const dayNum = now.getDate();
    const monthName = months[now.getMonth()];
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    clockElement.textContent = `${dayName} ${dayNum} ${monthName} ${hours}:${minutes}`;
  }

  update();
  setInterval(update, 30000);
}

/* ==========================================================================
   8. macOS QUICK LOOK (PREVIEW DA FOTO)
   ========================================================================== */
function initQuickLook() {
  const trigger = document.getElementById('photo-preview-trigger');
  const modal = document.getElementById('quicklook-modal');
  const closeBtn = document.getElementById('quicklook-close-btn');
  const backdrop = document.getElementById('quicklook-backdrop');

  if (!trigger || !modal) return;

  function openQuickLook() {
    modal.classList.remove('is-hidden');
    if (window.fireMacConfetti) {
      window.fireMacConfetti({ particleCount: 40, spread: 60 });
    }
  }

  function closeQuickLook() {
    modal.classList.add('is-hidden');
  }

  trigger.addEventListener('click', openQuickLook);

  if (closeBtn) closeBtn.addEventListener('click', closeQuickLook);
  if (backdrop) backdrop.addEventListener('click', closeQuickLook);

  // Teclado: Fechar com Escape ou abrir/fechar com Barra de Espaço
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('is-hidden')) {
      closeQuickLook();
    } else if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
      // macOS Finder behavior: Spacebar toggles Quick Look
      e.preventDefault();
      if (modal.classList.contains('is-hidden')) {
        openQuickLook();
      } else {
        closeQuickLook();
      }
    }
  });
}

/* ==========================================================================
   9. MOTOR DE CONFETES EM CANVAS (macOS Edition)
   ========================================================================== */
function initMacConfettiEngine() {
  const canvas = document.getElementById('macos-confetti-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const palette = ['#0071e3', '#ff2d55', '#af52de', '#34c759', '#ff9500', '#ffcc00', '#ffffff'];

  function Particle(x, y, speed, angle, size, color) {
    this.x = x;
    this.y = y;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.gravity = 0.25;
    this.drag = 0.96;
    this.size = size;
    this.color = color;
    this.rotation = Math.random() * 360;
    this.rotSpeed = (Math.random() - 0.5) * 10;
    this.alpha = 1;
    this.decay = Math.random() * 0.015 + 0.01;
  }

  Particle.prototype.update = function() {
    this.vx *= this.drag;
    this.vy *= this.drag;
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;
    this.rotation += this.rotSpeed;
    this.alpha -= this.decay;
  };

  Particle.prototype.draw = function(c) {
    c.save();
    c.translate(this.x, this.y);
    c.rotate((this.rotation * Math.PI) / 180);
    c.globalAlpha = Math.max(0, this.alpha);
    c.fillStyle = this.color;
    c.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.65);
    c.restore();
  };

  let animationId = null;

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.update();
      p.draw(ctx);

      if (p.alpha <= 0 || p.y > height + 20) {
        particles.splice(i, 1);
      }
    }

    if (particles.length > 0) {
      animationId = requestAnimationFrame(render);
    } else {
      animationId = null;
    }
  }

  window.fireMacConfetti = function(options = {}) {
    const count = options.particleCount || 40;
    const spread = (options.spread || 60) * (Math.PI / 180);
    const startX = width / 2;
    const startY = height * 0.7;

    for (let i = 0; i < count; i++) {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * spread;
      const speed = Math.random() * 12 + 6;
      const size = Math.random() * 8 + 5;
      const color = palette[Math.floor(Math.random() * palette.length)];

      particles.push(new Particle(startX, startY, speed, angle, size, color));
    }

    if (!animationId) {
      animationId = requestAnimationFrame(render);
    }
  };
}
