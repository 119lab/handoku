// トップページ：サンプル動画をダイアログで再生
const videoPreview = document.querySelector('#video-preview');
if (videoPreview) {
  const player = videoPreview.querySelector('video');
  const title = videoPreview.querySelector('#video-preview-title');

  document.querySelectorAll('.video-enlarge[data-video-src]').forEach((button) => {
    button.addEventListener('click', () => {
      title.textContent = button.dataset.videoTitle;
      videoPreview.showModal();
      player.src = button.dataset.videoSrc;
      player.play().catch(() => {
        // 自動再生が制限されても、プレーヤーの再生ボタンを使える。
      });
    });
  });

  videoPreview.addEventListener('close', () => {
    player.pause();
    player.removeAttribute('src');
    player.load();
  });
}
