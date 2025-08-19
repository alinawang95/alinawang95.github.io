function setupSinglePlay(videoEl){
  let playedOnce = false;

  const clickToPlay = () => {
    if (playedOnce) return;
    videoEl.controls = false;
    videoEl.play().catch(err => console.warn('Play failed:', err));
  };

  const onEnded = () => {
    playedOnce = true;
    videoEl.pause();
    videoEl.currentTime = videoEl.duration;
    videoEl.classList.add('played');
    const hint = videoEl.parentElement.querySelector('.tap-to-play');
    if (hint) {
      hint.textContent = 'Played';
      hint.style.opacity = .6;
    }
    videoEl.removeEventListener('click', clickToPlay);
    videoEl.removeEventListener('ended', onEnded);
  };

  videoEl.addEventListener('click', clickToPlay);
  videoEl.addEventListener('ended', onEnded);
}

function setupScrollFocus(){
  const stage = document.getElementById('stage');
  const root = document.documentElement;

  const onScroll = () => {
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    const viewportH = window.innerHeight || document.documentElement.clientHeight;
    const trigger = rect.bottom < viewportH * 0.65;
    if (trigger){
      root.classList.add('focus-alex');
    }else{
      root.classList.remove('focus-alex');
    }
  };

  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
}

document.addEventListener('DOMContentLoaded', () => {
  const abby = document.getElementById('vidAbby');
  const alex = document.getElementById('vidAlex');
  if (abby) setupSinglePlay(abby);
  if (alex) setupSinglePlay(alex);
  setupScrollFocus();

  const charBack = document.getElementById('charBack');      
  const popup    = document.getElementById('libraryPopup');  
  const audio    = document.getElementById('libraryAudio');  
  const bg       = document.getElementById('libraryBg');     

  if (charBack && popup) {
    charBack.addEventListener('click', (e) => {
      e.stopPropagation(); 
      popup.style.display = 'block';
    });
  }

  if (bg && audio) {
    let bgAudioStarted = false;
    bg.addEventListener('click', () => {
      if (bgAudioStarted) return;
      audio.currentTime = 0;
      audio.play()
        .then(() => { bgAudioStarted = true; })
        .catch(err => console.warn('Audio play failed:', err));
    }, { once:false });
  }
});

function closeLibraryPopup() {
  const el = document.getElementById('libraryPopup');
  if (el) el.style.display = 'none';
}

document.getElementById('usbHotspot').addEventListener('click', function(){
  document.getElementById('usbPopup').style.display = 'block';
});

function closeUsbPopup(){
  document.getElementById('usbPopup').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
  const btnJoin   = document.getElementById('btnJoin');
  const btnStay   = document.getElementById('btnStay');
  const modalJoin = document.getElementById('modalJoin');
  const modalStay = document.getElementById('modalStay');
  const beep      = document.getElementById('choiceBeep');
  const toast     = document.getElementById('toast');
  const badge     = document.getElementById('finalBadge');

  const policyAgree = document.getElementById('policyAgree');
  const confirmJoin = document.getElementById('confirmJoin');
  const confirmStay = document.getElementById('confirmStay');

  const saved = localStorage.getItem('virtue_final_choice');
  if (saved) renderBadge(saved);

  btnJoin?.addEventListener('click', () => openModal(modalJoin));
  btnStay?.addEventListener('click', () => openModal(modalStay));

  policyAgree?.addEventListener('change', () => {
    confirmStay.disabled = !policyAgree.checked;
  });

  confirmJoin?.addEventListener('click', () => {
    const alias  = (document.getElementById('aliasInput')?.value || '').trim();
    const reason = (document.getElementById('reasonInput')?.value || '').trim();
    localStorage.setItem('virtue_final_choice', 'reform');
    if (alias)  localStorage.setItem('virtue_alias', alias);
    if (reason) localStorage.setItem('virtue_reason', reason);
    closeModal(modalJoin);
    renderBadge('reform');
    ping('Joined the Reform (saved locally)');
  });

  confirmStay?.addEventListener('click', () => {
    localStorage.setItem('virtue_final_choice', 'system');
    closeModal(modalStay);
    renderBadge('system');
    ping('Staying with the System (saved locally)');
  });

  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-close');
      const target = id ? document.getElementById(id) : e.currentTarget.closest('.modal');
      closeModal(target);
    });
  });

  [modalJoin, modalStay].forEach(m => {
    m?.addEventListener('click', (e) => {
      if (e.target === m) closeModal(m);
    });
  });

  function openModal(m){
    if (!m) return;
    if (beep){ try{ beep.currentTime = 0; beep.play(); }catch(_){} }
    m.setAttribute('aria-hidden','false');
    m.style.display = 'block';
  }
  function closeModal(m){
    if (!m) return;
    m.setAttribute('aria-hidden','true');
    m.style.display = 'none';
  }
  function ping(text){
    if (!toast) return;
    toast.textContent = text;
    toast.classList.add('show');
    setTimeout(()=> toast.classList.remove('show'), 1700);
  }
  function renderBadge(choice){
    if (!badge) return;
    if (choice === 'reform'){
      const alias = localStorage.getItem('virtue_alias') || 'Anonymous';
    }else if (choice === 'system'){
      badge.innerHTML = `🔒 You chose to stay with the system. Priority remains score-aligned.`;
    }else{
      badge.innerHTML = '';
    }
  }
});
