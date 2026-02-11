// ハンバーガーメニューの動作
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // ナビゲーションリンクをクリックしたらメニューを閉じる
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// フリップブックの初期化
$(document).ready(function() {
    // アスペクト比の設定（1.536）
    const aspectRatio = 1.536;
    let flipbookWidth, flipbookHeight;

    function calculateDimensions() {
        const viewportWidth = $(window).width();

        // レスポンシブなサイズ計算
        if (viewportWidth <= 768) {
            flipbookWidth = viewportWidth * 0.9;
        } else {
            flipbookWidth = viewportWidth * 0.7;
        }

        // 最大幅を制限
        if (flipbookWidth > 1000) {
            flipbookWidth = 1000;
        }

        // 高さを計算
        flipbookHeight = flipbookWidth / aspectRatio;
    }

    function initFlipbook() {
        calculateDimensions();

        $('#flipbook').turn({
            width: flipbookWidth,
            height: flipbookHeight,
            autoCenter: true,
            elevation: 50,
            gradients: true,
            acceleration: true,
            duration: 1000
        });

        // ページ数を表示
        const totalPages = $('#flipbook').turn('pages');
        $('#total-pages').text(`/ ${totalPages}ページ`);
    }

    // フリップブックの初期化
    initFlipbook();

    // ウィンドウリサイズ時の処理
    $(window).resize(function() {
        calculateDimensions();
        $('#flipbook').turn('size', flipbookWidth, flipbookHeight);
    });

    // 前へボタン
    $('#prev-btn').click(function() {
        $('#flipbook').turn('previous');
    });

    // 次へボタン
    $('#next-btn').click(function() {
        $('#flipbook').turn('next');
    });

    // ページ入力
    $('#page-input').on('keypress change', function(e) {
        if (e.type === 'keypress' && e.which !== 13) {
            return;
        }

        const pageNum = parseInt($(this).val());
        const totalPages = $('#flipbook').turn('pages');

        if (pageNum >= 1 && pageNum <= totalPages) {
            $('#flipbook').turn('page', pageNum);
        } else {
            alert(`1から${totalPages}の間のページ番号を入力してください`);
        }
    });

    // ページが変わったときの処理
    $('#flipbook').bind('turned', function(event, page, view) {
        // 現在のページを入力欄に表示
        $('#page-input').val(page);

        // 前へ・次へボタンの有効/無効
        const totalPages = $('#flipbook').turn('pages');
        $('#prev-btn').prop('disabled', page === 1);
        $('#next-btn').prop('disabled', page === totalPages);
    });

    // 初期状態のボタン設定
    $('#prev-btn').prop('disabled', true);
});
