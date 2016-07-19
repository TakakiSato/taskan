$(function() {
    $(document).on('submit','.make-task',function(){
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
                $('td#' + result.task.user_id + '_' + result.task.date).append('<div class="add-task js-form"><form action="/tasks/'+result.task.task_id+'.json" method="patch" class="task_done none" id=add-task-form"><input name="task_id" type="hidden" value="' + result.task.task_id + '"><input name="complete_flag" type="hidden" value=1><br>作業時間実績:<br><div class="btn-group" data-toggle="buttons" name="result_time"><label class="btn btn-default"><input type="radio" autocomplete="off" value="0.5" name="result_time">0.5</label><label class="btn btn-default"><input type="radio" autocomplete="off" value=1 name="result_time">1</label><label class="btn btn-default"><input type="radio" autocomplete="off" value=2 name="result_time">2</label><label class="btn btn-default"><input type="radio" autocomplete="off" value=3 name="result_time">3</label><label class="btn btn-default"><input type="radio" autocomplete="off" value=4 name="result_time">4</label></div><input class="btn btn-primary add-task-child" name="commit" type="submit" value="送信"></form><div id='+ result.task.task_id +' class="task_cade task_doing_collor" draggable="true" ondragstart="onDragStart( event );"><strong>' + result.task.task_name + '</strong><br>予定:' +result.task.plan_time + 'h 実績:<br><a class="add-task-child btn btn-default"" >完了</a></div>');
                console.log($form.children('#task-input'));
                    $form.find('#task-input').val('');
            },

            // 通信失敗時の処理
            error: function(xhr, textStatus, error) {}
        });
    });
});