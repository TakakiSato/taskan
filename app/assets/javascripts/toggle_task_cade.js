$(function() {
    //タスクカードがクリックされたとき
    $(document).on('click','.task_cade_info',function(){
        //タスク名隠す
        console.log($('div#'+$(this).attr('id')));
        $('div#'+$(this).attr('id')).css( 'display', 'none');
        $('#upd_' + $(this).attr('id'))
        .css( 'display', '')
        .focus();
        //タスク名コピー
        console.log($( '#task_name_' + $(this).attr('id')).text());
        $('#upd_task_name_' + $(this).attr('id'))
        .val( $( '#task_name_' + $(this).attr('id')).text())
    });
    $('.upd_task_data').blur(function() {
        $('.upd_task_data').css( 'display', 'none');
        $('task_doing')
        .css( 'display', '');
    });
    //タスクカードの完了ボタンがクリックされたとき
    $(document).on('click','a.task-done-start',function(){
        console.log($(this).parent().attr('id'));
        //タスクカード非表示
        $('div#'+$(this).parent().attr('id')).css( 'display', 'none');
        //タスク更新フォーム非表示
        $('#upd_' + $(this).attr('id')).css( 'display', 'none');
        $('#task_done_' + $(this).parent().attr('id'))
        .css( 'display', '')
        .focus();
        console.log($(this));
        return false;
    });
    $('.upd_task_data').blur(function() {
        $('.upd_task_data').css( 'display', 'none');
        $('task_doing')
        .css( 'display', '');
    });
});