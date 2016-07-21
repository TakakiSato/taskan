$(function() {
    //タスクカードがクリックされたとき
    $(document).on('click','.task_doing',function(){
        console.log($(this).attr('id'));
        $('div#'+$(this).attr('id')).css( 'display', 'none');
        console.log('#upd_task_' + $(this).attr('id'));
        $('#upd_task_' + $(this).attr('id'))
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
        console.log("aaaaaaaaaaaa");
        console.log($(this).parent().attr('id'));
        //タスクカード非表示
        $('div#'+$(this).parent().attr('id')).css( 'display', 'none');
        //タスク更新フォーム非表示
        $('#upd_task_' + $(this).attr('id')).css( 'display', 'none');
        $('#task-done-form' + $(this).parent().attr('id'))
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