$(function() {
    $(document).on('submit','.task_done',function(){
        // HTMLでの送信をキャンセル
        event.preventDefault();
        // 操作対象のフォーム要素を取得
        var $form = $(this);
        // 送信ボタンを取得
        // （後で使う: 二重送信を防止する。）
        var $button = $form.find('button');

        console.log($button);
        console.log($form.attr('action'));
        console.log($form.attr('method'));
        console.log($form.serialize());
        console.log($form.attr('id'));
        console.log($form);

        // 送信
        $.ajax({
            url: $form.attr('action'),
            type: $form.attr('method'),
            data: $form.serialize(),
            timeout: 10000,

            // 送信前
            beforeSend: function(xhr, settings) {
                // ボタンを無効化し、二重送信を防止
                $button.attr('disabled', true);
            },
            // 応答後
            complete: function(xhr, textStatus) {
                // ボタンを有効化し、再送信を許可
                $button.attr('disabled', false);
            },

            // 通信成功時の処理
            success: function(result, textStatus, xhr) {
                $('div#' + result.task.task_id).remove();
                $('td#' + result.task.user_id + '_' + result.task.date).append('<div id='+ result.task.task_id +' class="task_cade task_done_collor"><strong>' + result.task.task_name + '</strong><br>予:' +result.task.plan_time + 'h 実:' +result.task.result_time + 'h<br></div>');
            },

            // 通信失敗時の処理
            error: function(xhr, textStatus, error) {}
        });
    });
});