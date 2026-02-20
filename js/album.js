// ========================================
// album.js - アルバムページ共通スクリプト
// fes_live.html / with_meets.html で使用
// ========================================

document.addEventListener('DOMContentLoaded', function () {

    // タブパーツの読み込み
    // <div class="album-book" data-album="fes_live"> のように data-album を指定する
    const albumBook = document.querySelector('.album-book[data-album]');
    if (albumBook) {
        const albumName = albumBook.dataset.album;
        const periods = ['103', '104', '105'];

        periods.forEach(function (period) {
            const panel = document.getElementById('tab-' + period);
            if (!panel) return;

            fetch('./parts/' + albumName + '/tab-' + period + '.html')
                .then(function (res) { return res.text(); })
                .then(function (html) { panel.innerHTML = html; })
                .catch(function () {
                    panel.innerHTML = '<p class="tab-loading">画像を読み込めませんでした。</p>';
                });
        });
    }

    // タブ切り替え
    document.querySelectorAll('.tab-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const target = this.dataset.tab;

            document.querySelectorAll('.tab-btn').forEach(function (b) {
                b.classList.remove('active');
            });
            document.querySelectorAll('.tab-panel').forEach(function (p) {
                p.classList.remove('active');
            });

            this.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });

});

// ライトボックス（グローバルに公開）
function openLightbox(src) {
    document.getElementById('lightbox-img').src = src;
    document.getElementById('lightbox').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox(e) {
    if (e && e.target !== document.getElementById('lightbox') && !e.target.classList.contains('lightbox-close')) return;
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
});
