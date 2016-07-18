$(function() {
    $('.js-accordion').accordion({
        animate : {//アニメーションの設定
            duration : 200,
            easing : 'swing',
        },
        active : false,
        collapsible : true,
        heightStyle : 'content'
    });
});
