// ハンバーガーメニューの動作
// ヘッダーは fetch で非同期に読み込まれるため、document 全体にイベントを委譲する
document.addEventListener('click', function (e) {
    // ハンバーガーボタンをクリック
    const hamburger = e.target.closest('#hamburger');
    if (hamburger) {
        const nav = document.getElementById('nav');
        if (nav) {
            nav.classList.toggle('active');
            hamburger.classList.toggle('active');
        }
        return;
    }

    // ナビリンクをクリックしたらメニューを閉じる
    if (e.target.closest('.nav a')) {
        const nav = document.getElementById('nav');
        const ham = document.getElementById('hamburger');
        if (nav) nav.classList.remove('active');
        if (ham) ham.classList.remove('active');
    }
});

// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
