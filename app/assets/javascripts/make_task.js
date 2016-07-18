$(function() {
    $(document).on('submit','.js-submit',function(){
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
                console.log(result);
                $form.parent().append('<div id='+ result.task_id +' class=task_cade draggable="true" ondragstart="onDragStart( event );><strong>' + result.task.task_name + '</strong><br>予:' +result.plan_time + '実:<br></div>');
            },

            // 通信失敗時の処理
            error: function(xhr, textStatus, error) {}
        });
    });
});