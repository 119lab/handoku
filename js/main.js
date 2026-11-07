// 共通メニュー（全ページ）
const menuButton = document.querySelector('.btn-menu');
const menu = document.querySelector('#main-menu');
if (menuButton && menu) {
  menuButton.addEventListener('click', () => {
    menu.hidden = !menu.hidden;
    menuButton.setAttribute('aria-expanded', String(!menu.hidden));
    menuButton.textContent = menu.hidden ? 'Menu' : 'Close';
  });
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.site-nav')) {
      menu.hidden = true;
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.textContent = 'Menu';
    }
  });
}

// FAQの開閉
for (const button of document.querySelectorAll('.accordion-question')) {
  button.addEventListener('click', () => {
    const answer = document.getElementById(button.getAttribute('aria-controls'));
    const isOpen = answer.hidden;
    answer.hidden = !isOpen;
    answer.classList.toggle('is-open', isOpen);
    button.classList.toggle('is-open', isOpen);
    button.setAttribute('aria-expanded', String(isOpen));
  });
}

// キャラクター画像の拡大
for (const image of document.querySelectorAll('.character-grid img')) {
  image.addEventListener('click', () => {
    image.closest('li').classList.toggle('is-enlarged');
  });
}

// BGMの試聴（同時に一曲だけ再生）
for (const button of document.querySelectorAll('.bgm-play')) {
  const audio = document.getElementById(button.dataset.track);
  if (!audio) continue;
  button.addEventListener('click', async () => {
    const playing = !audio.paused;
    for (const other of document.querySelectorAll('.bgm-play')) {
      const track = document.getElementById(other.dataset.track);
      if (track) track.pause();
      other.textContent = '視聴';
    }
    const status = document.querySelector('.bgm-status');
    if (!playing) {
      try {
        await audio.play();
        button.textContent = '停止';
        if (status) status.textContent = '再生中です。「停止」ボタンで再生を停止できます。';
      } catch (error) {
        if (status) status.textContent = '音源を再生できませんでした。';
      }
    } else if (status) {
      status.textContent = '「視聴」を押すとBGMを再生します。';
    }
  });
  audio.addEventListener('ended', () => { button.textContent = '視聴'; });
}

// 架空サイトのためお問い合わせは送信しません
const demoButton = document.querySelector('#contact-demo-submit');
if (demoButton) {
  demoButton.addEventListener('click', () => {
    const status = document.querySelector('#contact-demo-status');
    if (status) status.textContent = '入力内容や添付ファイルは送信していません。';
  });
}
