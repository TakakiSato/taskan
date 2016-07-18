$(function(){
    // 「.js-modal-open」をクリック
    $('.js-modal-open').click(function(){
        // オーバーレイ用の要素を追加
        $('body').append('<div class="js-modal-overlay"></div>');
        // オーバーレイをフェードイン
        $('.js-modal-overlay').fadeIn('slow');

        // モーダルコンテンツのIDを取得
        var modal = '#' + $(this).attr('data-target');
        console.log($(this).attr('data-target'));
        console.log(modal);

        // モーダルコンテンツの表示位置を設定
        modalResize();
         // モーダルコンテンツフェードイン
        //$(modal).fadeIn('slow');
        $('.js-modal-content').fadeIn('slow');
        // 「.js-modal-overlay」あるいは「.js-modal-close」をクリック
        $('.js-modal-overlay, .js-modal-close').off().click(function(){
            // モーダルコンテンツとオーバーレイをフェードアウト
            $('.js-modal-content').fadeOut('slow');
            $('.js-modal-overlay').fadeOut('slow',function(){
                // オーバーレイを削除
                $('.js-modal-overlay').remove();
            });
        });

        // リサイズしたら表示位置を再取得
        $(window).on('resize', function(){
            modalResize();
        });

        // モーダルコンテンツの表示位置を設定する関数
        function modalResize(){
            // ウィンドウの横幅、高さを取得
            var w = $(window).width();
            var h = $(window).height();

            // モーダルコンテンツの表示位置を取得
            var x = (w - $(modal).outerWidth(true)) / 2;
            var y = (h - $(modal).outerHeight(true)) / 2;

            // モーダルコンテンツの表示位置を設定
            $(modal).css({'left': x + 'px','top': y + 'px'});
        }

    });
});