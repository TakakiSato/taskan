$(function() {
    $(document).on('submit','.task_update',function(){
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
                if (result.task.complete_flag==1){
                    //タスク完了の場合
                    $('td#' + result.task.user_id + '_' + result.task.date).append('<div id='+ result.task.task_id +' class="task_cade task_done_collor"><strong>' + result.task.task_name + '</strong><br>予:' +result.task.plan_time + 'h 実:' +result.task.result_time + 'h<br></div>');
                }else{
                    //タスク更新の場合
                    var date=result.task.date
                    console.log(result.task.date)
                    if (result.task.date=="notset" || (!result.task.date) ){
                        date = "notset";
                    }
                    console.log(date);
                    console.log($('td#' + result.task.user_id + '_' + date))
                    if (date!="notset" ){
                        $('td#' + result.task.user_id + '_' + date).append('\
                            <div id="task-done-form' +result.task.task_id+'" style="display:none;">\
                            <form action="/tasks/'+result.task.task_id+'.json" method="patch" class="task_update" >\
                            <input name="task_id" type="hidden" value="' + result.task.task_id + '">\
                            <input name="complete_flag" type="hidden" value=1><br>作業時間実績:<br>\
                            <div class="btn-group" data-toggle="buttons" name="result_time"><label class="btn btn-default">\
                            <input type="radio" autocomplete="off" value="0.5" name="result_time">0.5</label><label class="btn btn-default">\
                            <input type="radio" autocomplete="off" value=1 name="result_time">1</label><label class="btn btn-default">\
                            <input type="radio" autocomplete="off" value=2 name="result_time">2</label><label class="btn btn-default">\
                            <input type="radio" autocomplete="off" value=3 name="result_time">3</label><label class="btn btn-default">\
                            <input type="radio" autocomplete="off" value=4 name="result_time">4</label>\
                            </div>\
                            <input class="btn btn-primary add-task-child" name="commit" type="submit" value="送信">\
                            </form>\
                            </div>\
                            <div id="upd_task_'+result.task.task_id+'"style="display:none;">\
                            <form action="/tasks/'+result.task.task_id+'.json" method="patch" class="task_update" >\
                            タスク名:<br><input id="upd_task_name_'+result.task.task_id+'" name="task_name" type="text" value="' + result.task.task_name + '">\
                            <input name="user_id" type="hidden" value="' + $('#user_id').val() + '">\
                            <input name="date" type="hidden" value="' + date + '"><br>予定作業時間:<br><div class="btn-group" data-toggle="buttons" name="plan_time">\
                            <label class="btn btn-default">\
                            <input type="radio" autocomplete="off" value="0.5" name="plan_time">0.5</label><label class="btn btn-default">\
                            <input type="radio" autocomplete="off" value=1 name="plan_time">1</label><label class="btn btn-default">\
                            <input type="radio" autocomplete="off" value=2 name="plan_time">2</label><label class="btn btn-default">\
                            <input type="radio" autocomplete="off" value=3 name="plan_time">3</label><label class="btn btn-default">\
                            <input type="radio" autocomplete="off" value=4 name="plan_time">4</label></div>\
                            <input class="btn btn-primary add-task-child" name="commit" type="submit" value="送信">\
                            </form>\
                            </div>\
                            <div id='+ result.task.task_id +' class="task_cade task_doing task_doing_collor" draggable="true" ondragstart="onDragStart( event );">\
                            <strong id=task_name_'+result.task.task_id+'>' + result.task.task_name + '</strong>\
                            <br>予定:' +result.task.plan_time + 'h 実績:<br>\
                            <a class="task-done-start btn btn-default" >完了</a>\
                            </div>')
                    }else{
                                //未スケジュールの場合完了ボタンを表示しない。
                                $('td#' + result.task.user_id + '_' + date).append('\
                                    <div id="upd_task_'+result.task.task_id+'"style="display:none;">\
                                    <form action="/tasks/'+result.task.task_id+'.json" method="patch" class="task_update" >\
                                    タスク名:<br><input id="upd_task_name_'+result.task.task_id+'" name="task_name" type="text" value="' + result.task.task_name + '">\
                                    <input name="user_id" type="hidden" value="' + $('#user_id').val() + '">\
                                    <input name="date" type="hidden" value="' + date + '"><br>予定作業時間:<br><div class="btn-group" data-toggle="buttons" name="plan_time">\
                                    <label class="btn btn-default">\
                                    <input type="radio" autocomplete="off" value="0.5" name="plan_time">0.5</label><label class="btn btn-default">\
                                    <input type="radio" autocomplete="off" value=1 name="plan_time">1</label><label class="btn btn-default">\
                                    <input type="radio" autocomplete="off" value=2 name="plan_time">2</label><label class="btn btn-default">\
                                    <input type="radio" autocomplete="off" value=3 name="plan_time">3</label><label class="btn btn-default">\
                                    <input type="radio" autocomplete="off" value=4 name="plan_time">4</label></div>\
                                    <input class="btn btn-primary add-task-child" name="commit" type="submit" value="送信">\
                                    </form>\
                                    </div>\
                                    <div id='+ result.task.task_id +' class="task_cade task_doing task_doing_collor" draggable="true" ondragstart="onDragStart( event );">\
                                    <strong id=task_name_'+result.task.task_id+'>' + result.task.task_name + '</strong>\
                                    <br>予定:' +result.task.plan_time + 'h 実績:<br>\
                                    </div>')
                            }
                        }
                    },





            // 通信失敗時の処理
            error: function(xhr, textStatus, error) {}
        });
});
});